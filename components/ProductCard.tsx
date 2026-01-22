import React from 'react';
import { Star, ShoppingCart, Info } from 'lucide-react';
import { Product } from '../types';
import { Button } from './Button';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 flex flex-col h-full overflow-hidden">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm">
            Новинка
          </span>
        )}
        {product.oldPrice && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm">
            Скидка
          </span>
        )}
      </div>

      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-900 cursor-pointer block">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">{product.category}</p>
          <div className="flex items-center text-yellow-400 text-xs">
            <Star className="w-3 h-3 fill-current" />
            <span className="ml-1 text-slate-600 dark:text-slate-300 font-semibold">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 
            className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 cursor-pointer hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
          >
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{product.brand}</p>

        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">{product.price.toLocaleString()} ₽</span>
            {product.oldPrice && (
              <span className="text-sm text-slate-400 line-through decoration-red-500">{product.oldPrice.toLocaleString()} ₽</span>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-2">
             <Link to={`/product/${product.id}`} className="w-full">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="w-full"
                >
                  <Info className="w-4 h-4 mr-2" />
                  Детали
                </Button>
             </Link>
             <Button 
               variant="primary" 
               size="sm" 
               onClick={() => onAddToCart(product)}
               className="w-full"
             >
               <ShoppingCart className="w-4 h-4 mr-2" />
               Купить
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
};