import type { ICartItem, IProduct } from '@/types';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Load cart from localStorage
const loadCartFromStorage = (): ICartItem[] => {
  try {
    const savedCart = localStorage.getItem('shopping-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};

// Save cart to localStorage
const saveCartToStorage = (cart: ICartItem[]) => {
  try {
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

interface AppContextType {
  userName: string;
  setUserName: (name: string) => void;
  cart: ICartItem[];
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
  addToCart: (id: number, product?: IProduct) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getProductById: (id: number) => IProduct | undefined;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [cart, setCart] = useState<ICartItem[]>(loadCartFromStorage());
  const [products, setProducts] = useState<IProduct[]>([]);

  // Update localStorage when userName changes
  useEffect(() => {
    if (userName) {
      localStorage.setItem('userName', userName);
    }
  }, [userName]);

  // Update localStorage when cart changes
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const addToCart = (id: number, product?: IProduct) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { id, quantity: 1, product }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('shopping-cart');
  };

  const getProductById = (id: number): IProduct | undefined => {
    return products.find(product => product.id === id);
  };

  const getCartTotal = (): number => {
    return cart.reduce((total, item) => {
      const product = getProductById(item.id) || item.product;
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const getCartItemCount = (): number => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Enhance cart items with product data when products are loaded
  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const enhancedCart = cart.map(item => ({
        ...item,
        product: item.product || getProductById(item.id),
      }));
      
      // Only update if there are changes to avoid infinite loop
      const hasChanges = enhancedCart.some((item, index) => 
        item.product !== cart[index]?.product
      );
      
      if (hasChanges) {
        setCart(enhancedCart);
      }
    }
  }, [products]);

  return (
    <AppContext.Provider value={{
      userName,
      setUserName,
      cart,
      products,
      setProducts,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getProductById,
      getCartTotal,
      getCartItemCount,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};