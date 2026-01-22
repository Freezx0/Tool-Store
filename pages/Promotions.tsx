import React from 'react';
import { useStore } from '../store';
import { ProductCard } from '../components/ProductCard';
import { Percent, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export const PromotionsPage: React.FC = () => {
  const { products, addToCart, isLoading } = useStore();
  
  // Filter products that have an oldPrice (indicating a discount)
  const discountedProducts = products.filter(p => !!p.oldPrice);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 md:p-12 mb-12 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm w-fit px-3 py-1 rounded-full mb-4">
            <Percent className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wide">Горячие предложения</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Сезонная распродажа инструмента</h1>
          <p className="text-red-100 text-lg mb-8 max-w-lg">
            Успейте обновить свой арсенал с выгодой до 40%. Количество товаров ограничено.
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 transform translate-x-12"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-500 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Товары со скидкой</h2>
        <span className="text-slate-500">{discountedProducts.length} предложений</span>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-xl h-96 animate-pulse" />
          ))}
        </div>
      ) : discountedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {discountedProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-slate-500 mb-4">В данный момент активных акций нет.</p>
          <Link to="/catalog">
            <Button>Перейти в каталог</Button>
          </Link>
        </div>
      )}
    </div>
  );
};