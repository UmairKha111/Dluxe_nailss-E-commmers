import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItem, Product, Coupon } from '../types';
import { activeCoupons } from '../data/offers';
 
interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  quickViewProduct: Product | null;
  activeCoupon: Coupon | null;
  shippingCharge: number;
  subtotal: number;
  discountAmount: number;
  total: number;
  addToCart: (product: Product, quantity: number, size: string, customShape?: string, customLength?: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  addToRecentlyViewed: (productId: string) => void;
  setQuickViewProduct: (product: Product | null) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}
 
const CartContext = createContext<CartContextType | undefined>(undefined);
 
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
 
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('dluxe_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
 
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const savedWishlist = localStorage.getItem('dluxe_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
 
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const savedRV = localStorage.getItem('dluxe_rv');
    return savedRV ? JSON.parse(savedRV) : [];
  });
 
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(() => {
    const savedCoupon = localStorage.getItem('dluxe_coupon');
    return savedCoupon ? JSON.parse(savedCoupon) : null;
  });
 
  // Keep localStorage updated
  useEffect(() => {
    localStorage.setItem('dluxe_cart', JSON.stringify(cart));
  }, [cart]);
 
  useEffect(() => {
    localStorage.setItem('dluxe_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
 
  useEffect(() => {
    localStorage.setItem('dluxe_rv', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);
 
  useEffect(() => {
    if (activeCoupon) {
      localStorage.setItem('dluxe_coupon', JSON.stringify(activeCoupon));
    } else {
      localStorage.removeItem('dluxe_coupon');
    }
  }, [activeCoupon]);
 
  // ✅ FIX: useCallback so function reference stays stable across re-renders
  const addToCart = useCallback((
    product: Product,
    quantity: number,
    size: string,
    customShape?: string,
    customLength?: string
  ) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          (!customShape || item.selectedShape === customShape) &&
          (!customLength || item.selectedLength === customLength)
      );
 
      if (existingIdx > -1) {
        const newCart = [...prevCart];
        newCart[existingIdx] = {
          ...newCart[existingIdx],
          quantity: newCart[existingIdx].quantity + quantity,
        };
        return newCart;
      }
 
      return [
        ...prevCart,
        {
          product,
          quantity,
          selectedSize: size,
          selectedShape: customShape || product.shape,
          selectedLength: customLength || product.length,
        },
      ];
    });
  }, []);
 
  // ✅ FIX: useCallback so function reference stays stable across re-renders
  const removeFromCart = useCallback((productId: string, size: string) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.product.id === productId && item.selectedSize === size)));
  }, []);
 
  // ✅ FIX: useCallback so function reference stays stable across re-renders
  const updateQuantity = useCallback((productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.selectedSize === size ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);
 
  const clearCart = useCallback(() => {
    setCart([]);
    setActiveCoupon(null);
  }, []);
 
  // ✅ FIX: useCallback with empty deps — stable reference, no re-renders triggered
  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);
 
  // ✅ KEY FIX: This was the root cause — new reference on every render triggered
  // useEffect in ProductDetails, which reset product state mid-navigation
  const addToRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 5);
    });
  }, []);
 
  const applyCoupon = useCallback((code: string) => {
    const coupon = activeCoupons.find((c) => c.code.toUpperCase() === code.toUpperCase());
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code.' };
    }
    const currentSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    if (coupon.minSpend && currentSubtotal < coupon.minSpend) {
      return {
        success: false,
        message: `Min spend of ₹${coupon.minSpend} required for this coupon.`,
      };
    }
    setActiveCoupon(coupon);
    return { success: true, message: `Coupon "${coupon.code}" applied successfully!` };
  }, [cart]);
 
  const removeCoupon = useCallback(() => {
    setActiveCoupon(null);
  }, []);
 
  // Derive pricing values
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCharge = subtotal >= 1499 || subtotal === 0 ? 0 : 80;
 
  let discountAmount = 0;
  if (activeCoupon) {
    if (activeCoupon.discountType === 'percentage') {
      discountAmount = Math.round((subtotal * activeCoupon.discountValue) / 100);
    } else if (activeCoupon.discountType === 'fixed') {
      discountAmount = activeCoupon.discountValue;
    }
    if (discountAmount > subtotal) {
      discountAmount = subtotal;
    }
  }
 
  const total = subtotal - discountAmount + shippingCharge;
 
  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        recentlyViewed,
        quickViewProduct,
        activeCoupon,
        shippingCharge,
        subtotal,
        discountAmount,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        addToRecentlyViewed,
        setQuickViewProduct,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};