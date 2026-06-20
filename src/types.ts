export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  images: string[];
  category: string;
  shape: 'Almond' | 'Square' | 'Coffin' | 'Stiletto' | 'Round' | 'Oval';
  length: 'Short' | 'Medium' | 'Long' | 'Extra Long';
  color: string[];
  occasion: string[];
  rating: number;
  reviewsCount: number;
  badges?: ('Best Seller' | 'Trending' | 'New' | 'Limited Edition' | 'Sale')[];
  sizes?: string[]; // e.g. ["XS", "S", "M", "L", "Custom"]
  isAvailable: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedShape?: string; // Users can customize shape too
  selectedLength?: string; // Users can customize length too
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl?: string;
  productName?: string;
  verified: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'sizing' | 'application' | 'shipping' | 'general';
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend?: number;
  description: string;
}

export interface OfferBanner {
  id: string;
  text: string;
  linkText?: string;
  linkUrl?: string;
}

export interface SiteConfig {
  brandName: string;
  instagramUsername: string;
  instagramUrl: string;
  whatsappNumber: string;
  whatsappUrlPrefix: string;
  location: string;
  email: string;
  aboutText: string;
  mission: string;
  vision: string;
  handmadeProcess: string[];
  shippingPolicy: string;
  returnPolicy: string;
  deliveryEstimate: string;
  currencySymbol: string;
  prepKitIncludes: string[];
}
