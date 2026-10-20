export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'name-stands' | 'puzzles-toys' | 'collectibles' | 'custom-prints';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  image: string;
  secondaryImage?: string;
  description: string;
  badge?: string;
  specs: {
    material: string;
    layerHeight: string;
    dimensions: string;
    printTime: string;
    colors: string[];
  };
  features: string[];
  isBestseller?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  customization?: {
    name?: string;
    theme?: string;
    primaryColor?: string;
    secondaryColor?: string;
  };
}

export interface CustomizerState {
  name: string;
  theme: 'executive' | 'couple' | 'dino' | 'cyber';
  font: 'modern' | 'serif' | 'cyber' | 'playful';
  primaryColor: string;
  secondaryColor: string;
  hasGiftBox: boolean;
  baseStyle: 'minimal' | 'beveled' | 'floating';
}
