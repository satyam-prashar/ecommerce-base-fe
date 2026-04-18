import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { Product, ProductFilters, Section } from '../types';
import { mockProducts, mockSections, getProductsWithUpdatedPrices } from '../mock-data';

interface ProductContextType {
  // Products
  products: Product[];
  filteredProducts: Product[];
  
  // Filters
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
  clearFilters: () => void;
  
  // View preference
  viewMode: 'cards' | 'tiles';
  setViewMode: (mode: 'cards' | 'tiles') => void;
  
  // Sections
  sections: Section[];
  
  // Gold price (affects product prices)
  goldPricePerGram: number;
  setGoldPricePerGram: (price: number) => void;
  
  // Product management
  addProduct: (product: Product) => void;
  updateProduct: (productId: string, product: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  
  // Search and filter helpers
  searchProducts: (term: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    // Initialize with mock products
    return getProductsWithUpdatedPrices(mockProducts, 6500);
  });

  const [filters, setFiltersState] = useState<ProductFilters>({});
  const [viewMode, setViewMode] = useState<'cards' | 'tiles'>('cards');
  const [goldPricePerGram, setGoldPricPerGramState] = useState(6500);
  const [sections] = useState<Section[]>(mockSections);

  // Update products when gold price changes
  const setGoldPricePerGram = useCallback((price: number) => {
    setGoldPricPerGramState(price);
    setProducts((prevProducts) =>
      getProductsWithUpdatedPrices(prevProducts, price)
    );
  }, []);

  const setFilters = useCallback((newFilters: ProductFilters) => {
    setFiltersState(newFilters);
  }, []);

  const clearFilters = useCallback(() => {
    setFiltersState({});
  }, []);

  // Filter and search products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Filter by section
      if (filters.sectionId && product.sectionId !== filters.sectionId) {
        return false;
      }

      // Filter by subsection
      if (filters.subsectionId && product.subsectionId !== filters.subsectionId) {
        return false;
      }

      // Filter by price range
      if (filters.minPrice && product.currentPrice < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && product.currentPrice > filters.maxPrice) {
        return false;
      }

      // Filter by gold weight
      if (filters.minGoldWeight && product.goldWeight < filters.minGoldWeight) {
        return false;
      }
      if (filters.maxGoldWeight && product.goldWeight > filters.maxGoldWeight) {
        return false;
      }

      // Search by term
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(term) ||
          product.description?.toLowerCase().includes(term);
        if (!matchesSearch) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      // Sort products
      switch (filters.sortBy) {
        case 'price-asc':
          return a.currentPrice - b.currentPrice;
        case 'price-desc':
          return b.currentPrice - a.currentPrice;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });
  }, [products, filters]);

  const addProduct = useCallback((product: Product) => {
    const updatedProduct = {
      ...product,
      currentPrice: getProductsWithUpdatedPrices([product], goldPricePerGram)[0]
        .currentPrice,
    };
    setProducts((prev) => [...prev, updatedProduct]);
  }, [goldPricePerGram]);

  const updateProduct = useCallback(
    (productId: string, updates: Partial<Product>) => {
      setProducts((prev) =>
        prev.map((product) => {
          if (product.id === productId) {
            const updated = { ...product, ...updates };
            return {
              ...updated,
              currentPrice: getProductsWithUpdatedPrices(
                [updated],
                goldPricePerGram
              )[0].currentPrice,
            };
          }
          return product;
        })
      );
    },
    [goldPricePerGram]
  );

  const deleteProduct = useCallback((productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const searchProducts = useCallback((term: string) => {
    setFilters({ ...filters, searchTerm: term });
  }, [filters]);

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        filters,
        setFilters,
        clearFilters,
        viewMode,
        setViewMode,
        sections,
        goldPricePerGram,
        setGoldPricePerGram,
        addProduct,
        updateProduct,
        deleteProduct,
        searchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};
