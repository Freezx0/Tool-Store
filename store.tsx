import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, FilterState, Order, User } from './types';
import { fetchProducts } from './services/mockData';

interface StoreContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  isLoading: boolean;
  addProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    category: 'Все',
    minPrice: 0,
    maxPrice: 100000,
    search: '',
    brand: 'Все'
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data);
      setIsLoading(false);
    });
  }, []);

  // Persistence
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('toolstore-cart');
      if (savedCart) setCartItems(JSON.parse(savedCart));

      const savedOrders = localStorage.getItem('toolstore-orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedUser = localStorage.getItem('toolstore-user');
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch (error) {
      console.warn('LocalStorage access blocked:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('toolstore-cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('toolstore-orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const clearCart = () => setCartItems([]);

  const addProduct = (product: Product) => setProducts(prev => [product, ...prev]);

  const deleteProduct = (id: number) => setProducts(prev => prev.filter(p => p.id !== id));

  const addOrder = (order: Order) => setOrders(prev => [order, ...prev]);

  const login = (userData: User) => {
    setUser(userData);
    try {
      localStorage.setItem('toolstore-user', JSON.stringify(userData));
    } catch (e) {}
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('toolstore-user');
    } catch (e) {}
  };

  return (
    <StoreContext.Provider value={{
      isDarkMode,
      toggleTheme: () => setIsDarkMode(!isDarkMode),
      isCartOpen,
      setIsCartOpen,
      products,
      setProducts,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      filters,
      setFilters,
      isLoading,
      addProduct,
      deleteProduct,
      orders,
      addOrder,
      user,
      login,
      logout
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within a StoreProvider");
  return context;
};