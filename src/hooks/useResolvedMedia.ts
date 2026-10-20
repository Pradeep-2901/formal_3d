import { useState, useEffect } from 'react';
import { resolveMediaUrl } from '../data/mediaStorage';

/**
 * Hook to resolve any media URL (indexeddb:// or standard URL) into a browser-playable URL.
 */
export const useResolvedMedia = (rawUrl?: string): { url: string; isLoading: boolean } => {
  const [url, setUrl] = useState<string>(() => {
    if (!rawUrl) return '';
    if (!rawUrl.startsWith('indexeddb://')) return rawUrl;
    return '';
  });
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    return Boolean(rawUrl && rawUrl.startsWith('indexeddb://'));
  });

  useEffect(() => {
    let isMounted = true;

    if (!rawUrl || !rawUrl.trim()) {
      setUrl('');
      setIsLoading(false);
      return;
    }

    if (!rawUrl.startsWith('indexeddb://')) {
      setUrl(rawUrl);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    resolveMediaUrl(rawUrl)
      .then((resolved) => {
        if (isMounted) {
          setUrl(resolved);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setUrl('');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [rawUrl]);

  return { url, isLoading };
};
