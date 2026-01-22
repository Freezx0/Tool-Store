import React, { useState } from 'react';
import { Search, ShoppingCart, User as UserIcon, Menu, X, Hammer, Moon, Sun, Settings, LogOut, MapPin, Newspaper } from 'lucide-react';
import { useStore } from '../store';
import { Link, useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { cartItems, setIsCartOpen, isDarkMode, toggleTheme, setFilters, user, logout } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, search: searchQuery }));
    navigate('/catalog');
  };

  const resetFilters = () => {
    setFilters({
      category: 'Все',
      minPrice: 0,
      maxPrice: 100000,
      search: '',
      brand: 'Все'
    });
    setSearchQuery('');
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" onClick={resetFilters} className="flex items-center gap-2 cursor-pointer select-none shrink-0">
            <div className="w-10 h-10 bg-brand-500 text-white flex items-center justify-center rounded-lg shadow-lg shadow-brand-500/20">
              <Hammer className="w-6 h-6" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white leading-none tracking-tight">TOOL<span className="text-brand-500">STORE</span></h1>
              <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">Профессиональный инструмент</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/catalog" onClick={resetFilters} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">Каталог</Link>
            <Link to="/brands" onClick={resetFilters} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">Бренды</Link>
            <Link to="/news" onClick={resetFilters} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">Новости</Link>
            <Link to="/contacts" onClick={resetFilters} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">Контакты</Link>
            <Link to="/promotions" onClick={resetFilters} className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">Акции</Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-xs xl:max-w-md relative mx-4">
            <input 
              type="text" 
              placeholder="Поиск..." 
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-full py-2.5 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-2.5 text-slate-400 hover:text-brand-500">
              <Search className="w-5 h-5" />
            </button>
          </form>

          {/* Icons */}
          <div className="flex items-center gap-1 sm:gap-3">
            <button onClick={toggleTheme} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 transition-colors">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {/* User Dropdown */}
            <div className="relative">
              {user ? (
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-brand-500 transition-colors hidden sm:block font-bold"
                >
                  <UserIcon className="w-5 h-5" />
                </button>
              ) : (
                <Link to="/login" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 transition-colors hidden sm:block">
                  <UserIcon className="w-5 h-5" />
                </Link>
              )}

              {/* User Menu Popup */}
              {isUserMenuOpen && user && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                  
                  {user.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      <Settings className="w-4 h-4" /> Админ панель
                    </Link>
                  )}
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="w-4 h-4" /> Выйти
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 transition-colors relative group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:text-brand-500 transition-colors" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                  {cartItemsCount}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 absolute w-full shadow-xl animate-in slide-in-from-top-2 h-screen">
          <div className="px-4 py-4 space-y-4">
            <form onSubmit={handleSearchSubmit} className="relative">
               <input 
                type="text" 
                placeholder="Поиск..." 
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-4 top-3.5 w-5 h-5 text-slate-400" />
            </form>
            <nav className="flex flex-col space-y-2">
              <Link to="/catalog" onClick={resetFilters} className="px-4 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-800 font-medium">Каталог</Link>
              <Link to="/brands" onClick={resetFilters} className="px-4 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-800 font-medium">Бренды</Link>
              <Link to="/news" onClick={resetFilters} className="px-4 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-800 font-medium">Новости</Link>
              <Link to="/contacts" onClick={resetFilters} className="px-4 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-800 font-medium">Контакты</Link>
              <Link to="/promotions" onClick={resetFilters} className="px-4 py-3 rounded-lg text-red-500 hover:bg-brand-50 dark:hover:bg-slate-800 font-medium">Акции</Link>
              
              {user ? (
                <>
                  <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 mt-2">
                    <p className="font-bold text-brand-500">{user.name}</p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-800 font-medium flex items-center gap-2">
                      <Settings className="w-4 h-4" /> Админ панель
                    </Link>
                  )}
                  <button onClick={handleLogout} className="text-left w-full px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Выйти
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-center rounded-lg bg-slate-100 dark:bg-slate-800 font-medium">Войти</Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-center rounded-lg bg-brand-500 text-white font-medium">Регистрация</Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};