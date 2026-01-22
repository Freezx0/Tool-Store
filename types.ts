export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  isNew?: boolean;
  stock: number;
  brand: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type CategoryType = 'Все' | 'Электроинструмент' | 'Ручной инструмент' | 'Наборы' | 'Строительство' | 'Запчасти';

export interface FilterState {
  category: CategoryType;
  minPrice: number;
  maxPrice: number;
  search: string;
  brand: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'paid' | 'processing' | 'shipped';
  customer: {
    name: string;
    email: string;
    address: string;
  };
  items: CartItem[];
}

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  brand: string;
  category: string;
  content: string;
}

export const BRANDS = ['Все', 'Makita', 'Bosch', 'DeWalt', 'Milwaukee', 'Stanley', 'Hilti', 'Metabo', 'Festool'];