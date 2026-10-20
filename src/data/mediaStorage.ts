/**
 * FORMEL 3D — Persistent Client-Side Media Storage
 * Uses IndexedDB to store high-resolution videos and binary assets safely without
 * hitting the 5MB browser localStorage quota.
 */

const DB_NAME = 'formel3d_media_db_v1';
const DB_VERSION = 1;
const STORE_NAME = 'media_blobs';

export interface StoredMediaRecord {
  id: string; // e.g., "media_video_1728738291_a1b2c3"
  name: string;
  mimeType: string;
  size: number;
  blob: Blob;
  createdAt: string;
}

// In-memory cache for resolved Object URLs: id -> blobUrl
const blobUrlCache = new Map<string, string>();

let dbPromise: Promise<IDBDatabase> | null = null;

export const getMediaDB = (): Promise<IDBDatabase> => {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this browser environment.'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error || new Error('Failed to open IndexedDB.'));
    };
  });

  return dbPromise;
};

/**
 * Validates whether a file is a supported web video format.
 */
export const isSupportedVideoType = (mimeType: string, filename = ''): boolean => {
  const supportedMimeTypes = [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/quicktime', // .mov
  ];

  if (supportedMimeTypes.includes(mimeType.toLowerCase())) {
    return true;
  }

  // Fallback extension check for browsers that omit video MIME
  const lowerName = filename.toLowerCase();
  return lowerName.endsWith('.mp4') || 
         lowerName.endsWith('.webm') || 
         lowerName.endsWith('.ogg') || 
         lowerName.endsWith('.mov');
};

/**
 * Maximum video file size allowed (50MB).
 */
export const MAX_VIDEO_SIZE_BYTES = 50 * 1024 * 1024; // 50MB

/**
 * Save a video or binary media file to IndexedDB.
 * Returns an internal URI: 'indexeddb://' + id and a ready-to-play Object URL.
 */
export const saveMediaFile = async (
  file: File | Blob, 
  customName?: string
): Promise<{ mediaId: string; mediaUri: string; blobUrl: string }> => {
  const db = await getMediaDB();
  const id = `media_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const record: StoredMediaRecord = {
    id,
    name: customName || (file instanceof File ? file.name : 'media_upload'),
    mimeType: file.type || 'application/octet-stream',
    size: file.size,
    blob: file,
    createdAt: new Date().toISOString()
  };

  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(record);

      req.onsuccess = () => {
        const blobUrl = URL.createObjectURL(file);
        blobUrlCache.set(id, blobUrl);
        resolve({
          mediaId: id,
          mediaUri: `indexeddb://${id}`,
          blobUrl
        });
      };

      req.onerror = () => {
        reject(req.error || new Error('Failed to write media record to IndexedDB.'));
      };
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Retrieve a media blob from IndexedDB by id
 */
export const getMediaRecord = async (mediaId: string): Promise<StoredMediaRecord | null> => {
  const db = await getMediaDB();
  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(mediaId);

      req.onsuccess = () => {
        resolve(req.result || null);
      };

      req.onerror = () => {
        reject(req.error || new Error(`Failed to read media record ${mediaId}.`));
      };
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Resolves a media URI (indexeddb://... or http/https/static) to a playable/displayable URL.
 */
export const resolveMediaUrl = async (rawUri?: string): Promise<string> => {
  if (!rawUri || !rawUri.trim()) return '';
  const uri = rawUri.trim();

  // If standard URL (HTTP, HTTPS, relative path /images/..., or data:...)
  if (!uri.startsWith('indexeddb://')) {
    return uri;
  }

  const mediaId = uri.replace('indexeddb://', '');
  if (blobUrlCache.has(mediaId)) {
    return blobUrlCache.get(mediaId)!;
  }

  try {
    const record = await getMediaRecord(mediaId);
    if (record && record.blob) {
      const blobUrl = URL.createObjectURL(record.blob);
      blobUrlCache.set(mediaId, blobUrl);
      return blobUrl;
    }
  } catch (err) {
    console.error(`Failed to resolve media URI ${rawUri}:`, err);
  }

  return '';
};

/**
 * Checks if a URI is an IndexedDB internal URI.
 */
export const isIndexedDbUri = (uri?: string): boolean => {
  return Boolean(uri && uri.startsWith('indexeddb://'));
};

/**
 * Delete a media item from IndexedDB.
 */
export const deleteMedia = async (rawUri: string): Promise<void> => {
  if (!isIndexedDbUri(rawUri)) return;
  const mediaId = rawUri.replace('indexeddb://', '');
  const db = await getMediaDB();

  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(mediaId);

      req.onsuccess = () => {
        if (blobUrlCache.has(mediaId)) {
          URL.revokeObjectURL(blobUrlCache.get(mediaId)!);
          blobUrlCache.delete(mediaId);
        }
        resolve();
      };

      req.onerror = () => {
        reject(req.error || new Error(`Failed to delete media ${mediaId}`));
      };
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Compresses an image file (JPEG, PNG, WebP) to a lightweight Data URL
 * suitable for localStorage and high-performance web display.
 * Avoids browser localStorage 5MB quota errors.
 */
export const compressImageFile = async (
  file: File,
  maxDimension = 1200,
  quality = 0.82
): Promise<string> => {
  if (file.type === 'image/svg+xml') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => resolve(e.target?.result as string);
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

