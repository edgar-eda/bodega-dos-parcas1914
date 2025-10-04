import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Product, CartItem, Coupon } from '../types';
import { supabase } from '@/src/integrations/supabase/client';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  appliedCoupon: Coupon | null;
  discount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart items from localStorage", error);
      return [];
    }
  });
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Recalculate discount if cart changes
    if (appliedCoupon) {
      calculateDiscount(appliedCoupon);
    }
  }, [cartItems]);

  const calculateDiscount = (coupon: Coupon) => {
    const subtotal = cartItems.reduce((total, item) => total + (item.promoPrice || item.price) * item.quantity, 0);
    if (coupon.discount_type === 'percentage') {
      const discountAmount = subtotal * (coupon.discount_value / 100);
      setDiscount(discountAmount);
    } else {
      setDiscount(0);
    }
  };

  const applyCoupon = async (code: string): Promise<{ success: boolean; message: string }> => {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .single();

    if (error || !data) {
      return { success: false, message: 'Cupom inválido ou não encontrado.' };
    }

    const coupon = data as Coupon;
    const isExpired = coupon.expires_at && new Date(coupon.expires_at) < new Date();

    if (!coupon.is_active || isExpired) {
      return { success: false, message: 'Este cupom não é mais válido.' };
    }

    setAppliedCoupon(coupon);
    calculateDiscount(coupon);
    return { success: true, message: 'Cupom aplicado com sucesso!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
  };

  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
    removeCoupon();
  };

  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    const deliveryFee = 5.00;
    const subtotal = cartItems.reduce((total, item) => total + (item.promoPrice || item.price) * item.quantity, 0);
    const total = subtotal + deliveryFee - discount;
    return total > deliveryFee ? total : deliveryFee; // Ensure total doesn't go below delivery fee
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getItemCount, getTotalPrice, applyCoupon, removeCoupon, appliedCoupon, discount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};