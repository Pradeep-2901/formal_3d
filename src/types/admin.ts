export interface AdminProduct {
  id: string;
  name: string;
  subtitle?: string;
  category: string;
  description: string;
  images: string[];
  videoUrl?: string;
  isCustomizable: boolean; // Customization availability!
  status: 'published' | 'draft'; // Published or draft
  specs?: {
    material: string;
    layerHeight: string;
    printTime: string;
    dimensions: string;
    colors: string[];
    infill?: string;
  };
  features?: string[];
  badge?: string;
  isFeatured?: boolean;
  createdAt: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  videoUrl?: string;
  accentColor: string;
  tag?: string;
  itemCount: number;
}

export interface CustomizationEnquiry {
  id: string;
  productId: string;
  productName: string;
  printedName: string;
  nameLength: number;
  isLongNameReview: boolean;
  deliveryAddress: string;
  phoneNumber: string;
  pincode: string;
  themeType: 'simple' | 'custom' | 'other';
  themeDescription: string;
  penholder: 'yes' | 'no';
  additionalRequirements?: string;
  createdAt: string;
}
