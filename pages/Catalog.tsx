import React, { useMemo } from 'react';
import { useStore } from '../store';
import { ProductCard } from '../components/ProductCard';
import { BRANDS, CategoryType } from '../types';
import { CATEGORIES } from '../constants';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '../components/Button';

export const CatalogPage: React.FC = () => {
  const { products, filters, setFilters, addToCart, isLoading } = useStore();

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchCategory = filters.category === 'Все' || product.category === filters.category;
      const matchSearch = product.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
      const matchBrand = filters.brand === 'Все' || product.brand === filters.brand;
      return matchCategory && matchSearch && matchPrice && matchBrand;
    });
  }, [products, filters]);

  return (
    <section className="py-16 container mx-auto px-4 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-6 text-slate-900 dark:text-white">
              <Filter className="w-5 h-5" />
              <h3 className="font-bold text-lg">Фильтры</h3>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Категория</h4>
              <select 
                value={filters.category} 
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value as CategoryType }))}
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg p-2 text-sm text-slate-900 dark:text-white"
              >
                <option value="Все">Все категории</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Бренд</h4>
              <div className="space-y-2">
                {BRANDS.map(brand => (
                  <label key={brand} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer hover:text-brand-500">
                    <input 
                      type="radio" 
                      name="brand" 
                      checked={filters.brand === brand}
                      onChange={() => setFilters(prev => ({ ...prev, brand }))}
                      className="text-brand-500 focus:ring-brand-500"
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Цена до</h4>
                <span className="text-xs text-brand-500 font-bold">{filters.maxPrice} ₽</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="50000" 
                step="1000"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>0 ₽</span>
                <span>50000+ ₽</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => setFilters({ category: 'Все', minPrice: 0, maxPrice: 100000, search: '', brand: 'Все' })}
            >
              Сбросить
            </Button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
             <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
               Найдено <span className="text-slate-900 dark:text-white font-bold">{filteredProducts.length}</span> товаров
             </p>
             <div className="flex items-center gap-3">
               <span className="text-sm text-slate-500 dark:text-slate-400">Сортировка:</span>
               <div className="flex items-center gap-1 text-sm font-medium text-slate-900 dark:text-white cursor-pointer hover:text-brand-500">
                 По популярности <ArrowUpDown className="w-4 h-4" />
               </div>
             </div>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-xl h-96 animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
              <SlidersHorizontal className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Товары не найдены</h3>
              <p className="text-slate-500">Попробуйте изменить параметры фильтрации.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};