// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Section and Subsection Types
export interface Subsection {
  id: string;
  name: string;
  description?: string;
  image?: string;
  sectionId: string;
}

export interface Section {
  id: string;
  name: string;
  description?: string;
  image?: string;
  subsections: Subsection[];
}

// Product Pricing Types
export type PricingModel = 'fixed' | 'percentage';

export interface MakingCharge {
  type: PricingModel;
  value: number; // Fixed amount or percentage
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  images: string[];
  sectionId: string;
  subsectionId: string;
  goldWeight: number; // in grams
  makingCharge: MakingCharge;
  basePrice: number; // Price excluding gold
  currentPrice: number; // Calculated based on gold price
  quantity: number;
  rating?: number;
  reviews?: number;
  highlights?: string[];
  material?: string;
  purity?: string;
  collection?: string;
  occasion?: string;
  specifications?: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

// Gold Price Configuration
export interface GoldPrice {
  id: string;
  pricePerGram: number; // Price per gram in currency
  lastUpdated: Date;
  updatedBy: string; // User ID who updated it
}

// Promo and Discount Types
export type DiscountType = 'percentage' | 'fixed';

export interface PromoCode {
  id: string;
  code: string;
  description?: string;
  discountType: DiscountType;
  discountValue: number;
  minPurchase?: number;
  maxUsage?: number;
  usedCount: number;
  expiryDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Admin Configuration Types
export interface AdminSettings {
  currentGoldPrice: GoldPrice;
  promoCodes: PromoCode[];
  sections: Section[];
  viewPreference: 'cards' | 'tiles';
}

// Cart Types
export interface CartItem {
  productId: string;
  quantity: number;
  product?: Product;
}

// Filter Types
export interface ProductFilters {
  sectionId?: string;
  subsectionId?: string;
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
  minGoldWeight?: number;
  maxGoldWeight?: number;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'rating';
}

// API Response Types (for future API integration)
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
