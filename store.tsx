
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, FilterState, Order, User } from './types';
import { fetchProducts } from './services/mockData';
import { translations } from './translations';

export type Language = 'ru' | 'en' | 'uz';

interface StoreContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  brandColor: string;
  setBrandColor: (color: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => any;
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

class SafeStorage {
  private memory = new Map<string, string>();
  getItem(key: string): string | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) return window.localStorage.getItem(key);
    } catch (e) {}
    return this.memory.get(key) || null;
  }
  setItem(key: string, value: string): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch (e) {}
    this.memory.set(key, value);
  }
  removeItem(key: string): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
        return;
      }
    } catch (e) {}
    this.memory.delete(key);
  }
}

const storage = new SafeStorage();

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [brandColor, setBrandColorState] = useState('249 115 22'); // Default Orange
  const [language, setLanguageState] = useState<Language>('ru');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    category: 'Все', minPrice: 0, maxPrice: 100000, search: '', brand: 'Все'
  });

  const t = (path: string) => {
    const keys = path.split('.');
    let result: any = translations[language];
    for (const key of keys) {
      if (!result || result[key] === undefined) return path;
      result = result[key];
    }
    return result;
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    storage.setItem('toolstore-lang', lang);
  };

  const setBrandColor = (color: string) => {
    setBrandColorState(color);
    storage.setItem('toolstore-color', color);
    document.documentElement.style.setProperty('--brand-color', color);
  };

  useEffect(() => {
    try {
      if (isDarkMode) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    } catch (e) {}
  }, [isDarkMode]);

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data);
      setIsLoading(false);
    });

    try {
      const savedLang = storage.getItem('toolstore-lang') as Language;
      if (savedLang) setLanguageState(savedLang);
      
      const savedColor = storage.getItem('toolstore-color');
      if (savedColor) {
        setBrandColorState(savedColor);
        document.documentElement.style.setProperty('--brand-color', savedColor);
      }

      const savedCart = storage.getItem('toolstore-cart');
      if (savedCart) setCartItems(JSON.parse(savedCart));

      const savedOrders = storage.getItem('toolstore-orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedUser = storage.getItem('toolstore-user');
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (!isLoading) storage.setItem('toolstore-cart', JSON.stringify(cartItems));
  }, [cartItems, isLoading]);

  useEffect(() => {
    if (!isLoading) storage.setItem('toolstore-orders', JSON.stringify(orders));
  }, [orders, isLoading]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => setCartItems(prev => prev.filter(item => item.id !== id));
  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };
  const clearCart = () => setCartItems([]);
  const addProduct = (product: Product) => setProducts(prev => [product, ...prev]);
  const deleteProduct = (id: number) => setProducts(prev => prev.filter(p => p.id !== id));
  const addOrder = (order: Order) => setOrders(prev => [order, ...prev]);
  const login = (userData: User) => {
    setUser(userData);
    storage.setItem('toolstore-user', JSON.stringify(userData));
  };
  const logout = () => {
    setUser(null);
    storage.removeItem('toolstore-user');
  };

  return (
    <StoreContext.Provider value={{
      isDarkMode, toggleTheme: () => setIsDarkMode(!isDarkMode),
      brandColor, setBrandColor,
      language, setLanguage, t,
      isCartOpen, setIsCartOpen,
      products, setProducts, cartItems, addToCart, removeFromCart, updateQuantity, clearCart,
      filters, setFilters, isLoading, addProduct, deleteProduct, orders, addOrder,
      user, login, logout
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
