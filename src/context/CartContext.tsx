import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { CartItem, Product } from '../types';

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  getCartItem: (productId: string) => CartItem | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  const saveCart = useCallback((cartItems: CartItem[]) => {
    setItems(cartItems);
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, []);

  const addToCart = useCallback(
    (product: Product, quantity: number) => {
      setItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.productId === product.id);
        let updatedItems: CartItem[];

        if (existingItem) {
          updatedItems = prevItems.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          updatedItems = [
            ...prevItems,
            { productId: product.id, quantity, product },
          ];
        }

        saveCart(updatedItems);
        return updatedItems;
      });
    },
    [saveCart]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      const updatedItems = items.filter((item) => item.productId !== productId);
      saveCart(updatedItems);
    },
    [items, saveCart]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      const updatedItems = items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
      saveCart(updatedItems);
    },
    [items, removeFromCart, saveCart]
  );

  const clearCart = useCallback(() => {
    saveCart([]);
  }, [saveCart]);

  const getCartItem = useCallback(
    (productId: string) => {
      return items.find((item) => item.productId === productId);
    },
    [items]
  );

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => {
      const product = item.product;
      return sum + (product?.currentPrice || 0) * item.quantity;
    }, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
