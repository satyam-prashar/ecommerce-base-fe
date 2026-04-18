import type { ApiResponse, Product, Section, PromoCode, GoldPrice } from '../types';
import {
  mockProducts,
  mockSections,
  mockGoldPrice,
  mockPromoCodes,
  getProductsWithUpdatedPrices,
} from '../mock-data';

// Base URL for API (to be configured based on environment)
const _API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
// Suppress unused variable warning for future API implementation
void _API_BASE_URL;

// Simulate API delay
const simulateDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Products API
 * In production, replace these mock calls with actual fetch/axios calls
 */
export const productsAPI = {
  // Get all products
  getAll: async (goldPrice?: number): Promise<ApiResponse<Product[]>> => {
    await simulateDelay();
    const price = goldPrice || 6500;
    const products = getProductsWithUpdatedPrices(mockProducts, price);
    return {
      success: true,
      data: products,
      message: 'Products fetched successfully',
    };
    // Production: return await fetch(`${API_BASE_URL}/products`).then(r => r.json());
  },

  // Get product by ID
  getById: async (id: string, goldPrice?: number): Promise<ApiResponse<Product>> => {
    await simulateDelay();
    const price = goldPrice || 6500;
    const product = mockProducts.find((p) => p.id === id);
    if (!product) {
      return {
        success: false,
        data: {} as Product,
        error: 'Product not found',
      };
    }
    const updatedProduct = getProductsWithUpdatedPrices([product], price)[0];
    return {
      success: true,
      data: updatedProduct,
      message: 'Product fetched successfully',
    };
  },

  // Create product (Admin)
  create: async (product: Product): Promise<ApiResponse<Product>> => {
    await simulateDelay();
    // In production: POST to API
    return {
      success: true,
      data: product,
      message: 'Product created successfully',
    };
  },

  // Update product (Admin)
  update: async (id: string, updates: Partial<Product>): Promise<ApiResponse<Product>> => {
    await simulateDelay();
    const product = mockProducts.find((p) => p.id === id);
    if (!product) {
      return {
        success: false,
        data: {} as Product,
        error: 'Product not found',
      };
    }
    const updated = { ...product, ...updates };
    // In production: PUT to API
    return {
      success: true,
      data: updated,
      message: 'Product updated successfully',
    };
  },

  // Delete product (Admin)
  delete: async (_id: string): Promise<ApiResponse<null>> => {
    await simulateDelay();
    // In production: DELETE to API
    return {
      success: true,
      data: null,
      message: 'Product deleted successfully',
    };
  },
};

/**
 * Sections API
 */
export const sectionsAPI = {
  // Get all sections
  getAll: async (): Promise<ApiResponse<Section[]>> => {
    await simulateDelay();
    return {
      success: true,
      data: mockSections,
      message: 'Sections fetched successfully',
    };
  },

  // Get section by ID
  getById: async (id: string): Promise<ApiResponse<Section>> => {
    await simulateDelay();
    const section = mockSections.find((s) => s.id === id);
    if (!section) {
      return {
        success: false,
        data: {} as Section,
        error: 'Section not found',
      };
    }
    return {
      success: true,
      data: section,
      message: 'Section fetched successfully',
    };
  },

  // Create section (Admin)
  create: async (section: Section): Promise<ApiResponse<Section>> => {
    await simulateDelay();
    return {
      success: true,
      data: section,
      message: 'Section created successfully',
    };
  },

  // Update section (Admin)
  update: async (id: string, updates: Partial<Section>): Promise<ApiResponse<Section>> => {
    await simulateDelay();
    const section = mockSections.find((s) => s.id === id);
    if (!section) {
      return {
        success: false,
        data: {} as Section,
        error: 'Section not found',
      };
    }
    return {
      success: true,
      data: { ...section, ...updates },
      message: 'Section updated successfully',
    };
  },

  // Delete section (Admin)
  delete: async (_id: string): Promise<ApiResponse<null>> => {
    await simulateDelay();
    return {
      success: true,
      data: null,
      message: 'Section deleted successfully',
    };
  },
};

/**
 * Gold Price API
 */
export const goldPriceAPI = {
  // Get current gold price
  getCurrent: async (): Promise<ApiResponse<GoldPrice>> => {
    await simulateDelay();
    return {
      success: true,
      data: mockGoldPrice,
      message: 'Gold price fetched successfully',
    };
  },

  // Update gold price (Admin)
  update: async (pricePerGram: number): Promise<ApiResponse<GoldPrice>> => {
    await simulateDelay();
    const updated: GoldPrice = {
      ...mockGoldPrice,
      pricePerGram,
      lastUpdated: new Date(),
    };
    return {
      success: true,
      data: updated,
      message: 'Gold price updated successfully',
    };
  },
};

/**
 * Promo Codes API
 */
export const promoCCodesAPI = {
  // Get all promo codes (Admin)
  getAll: async (): Promise<ApiResponse<PromoCode[]>> => {
    await simulateDelay();
    return {
      success: true,
      data: mockPromoCodes,
      message: 'Promo codes fetched successfully',
    };
  },

  // Validate promo code
  validate: async (code: string): Promise<ApiResponse<PromoCode | null>> => {
    await simulateDelay();
    const promoCode = mockPromoCodes.find(
      (p) =>
        p.code.toUpperCase() === code.toUpperCase() &&
        p.isActive &&
        (!p.expiryDate || new Date(p.expiryDate) > new Date())
    );

    if (!promoCode) {
      return {
        success: false,
        data: null,
        error: 'Invalid or expired promo code',
      };
    }

    return {
      success: true,
      data: promoCode,
      message: 'Promo code is valid',
    };
  },

  // Create promo code (Admin)
  create: async (promoCode: PromoCode): Promise<ApiResponse<PromoCode>> => {
    await simulateDelay();
    return {
      success: true,
      data: promoCode,
      message: 'Promo code created successfully',
    };
  },

  // Update promo code (Admin)
  update: async (id: string, updates: Partial<PromoCode>): Promise<ApiResponse<PromoCode>> => {
    await simulateDelay();
    const promoCode = mockPromoCodes.find((p) => p.id === id);
    if (!promoCode) {
      return {
        success: false,
        data: {} as PromoCode,
        error: 'Promo code not found',
      };
    }
    return {
      success: true,
      data: { ...promoCode, ...updates },
      message: 'Promo code updated successfully',
    };
  },

  // Delete promo code (Admin)
  delete: async (_id: string): Promise<ApiResponse<null>> => {
    await simulateDelay();
    return {
      success: true,
      data: null,
      message: 'Promo code deleted successfully',
    };
  },
};

/**
 * Authentication API
 */
export const authAPI = {
  login: async (_email: string, _password: string): Promise<ApiResponse<{ token: string }>> => {
    await simulateDelay();
    // In production: POST to API with credentials
    return {
      success: true,
      data: { token: 'mock-jwt-token' },
      message: 'Login successful',
    };
  },

  signup: async (
    _email: string,
    _password: string,
    _name: string,
    _role: 'user' | 'admin'
  ): Promise<ApiResponse<{ token: string }>> => {
    await simulateDelay();
    // In production: POST to API with user data
    return {
      success: true,
      data: { token: 'mock-jwt-token' },
      message: 'Signup successful',
    };
  },
};
