import React, { useState } from 'react';
import { Search, ShoppingCart, User as UserIcon, Menu, X, Hammer, Moon, Sun, Settings, LogOut, Globe } from 'lucide-react';
import { useStore, Language } from '../store';
import { Link, useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { cartItems, setIsCartOpen, isDarkMode, toggleTheme, setFilters, user, logout, language, setLanguage, t } = useStore();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLangChange = (lang: Language) => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/login');
  };

  const closeMenus = () => {
    setIsUserMenuOpen(false);
    setIsLangMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          
          <Link to="/" className="flex items-center gap-2 cursor-pointer select-none shrink-0" onClick={closeMenus}>
            <div className="w-10 h-10 bg-brand-500 text-white flex items-center justify-center rounded-lg shadow-lg shadow-brand-500/20">
              <Hammer className="w-6 h-6" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white leading-none tracking-tight">TOOL<span className="text-brand-500">STORE</span></h1>
              <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">Professional Tools</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/catalog" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-500 transition-colors">{t('nav.catalog')}</Link>
            <Link to="/brands" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-500 transition-colors">{t('nav.brands')}</Link>
            <Link to="/news" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-500 transition-colors">{t('nav.news')}</Link>
            <Link to="/contacts" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-500 transition-colors">{t('nav.contacts')}</Link>
            <Link to="/promotions" className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">{t('nav.promotions')}</Link>
          </nav>

          <div className="flex items-center gap-1 sm:gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => { setIsLangMenuOpen(!isLangMenuOpen); setIsUserMenuOpen(false); }}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 transition-colors flex items-center gap-1"
              >
                <Globe className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase">{language}</span>
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-28 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {(['ru', 'en', 'uz'] as Language[]).map(lang => (
                    <button
                      key={lang}
                      onClick={() => handleLangChange(lang)}
                      className={`w-full text-left px-4 py-2 text-xs font-bold uppercase hover:bg-slate-50 dark:hover:bg-slate-700 ${language === lang ? 'text-brand-500' : 'text-slate-600 dark:text-slate-300'}`}
                    >
                      {lang === 'ru' ? 'RU 🇷🇺' : lang === 'en' ? 'EN 🇺🇸' : 'UZ 🇺🇿'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={toggleTheme} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 transition-colors">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button onClick={() => { setIsCartOpen(true); closeMenus(); }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 transition-colors relative group">
              <ShoppingCart className="w-5 h-5 group-hover:text-brand-500 transition-colors" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <div className="relative">
              {user ? (
                <>
                  <button 
                    onClick={() => { setIsUserMenuOpen(!isUserMenuOpen); setIsLangMenuOpen(false); }} 
                    className={`p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors ${isUserMenuOpen ? 'text-brand-500' : 'text-slate-600 dark:text-slate-300'}`}
                  >
                    <UserIcon className="w-5 h-5" />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700 mb-1">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                      </div>
                      {user.role === 'admin' && (
                        <Link to="/admin" onClick={closeMenus} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
                          <Hammer className="w-4 h-4" /> {t('nav.admin')}
                        </Link>
                      )}
                      <Link to="/settings" onClick={closeMenus} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
                        <Settings className="w-4 h-4" /> {t('nav.settings')}
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
                      >
                        <LogOut className="w-4 h-4" /> {t('nav.logout')}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 transition-colors" onClick={closeMenus}>
                  <UserIcon className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};