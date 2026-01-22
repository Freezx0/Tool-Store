import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store';
import { Button } from '../components/Button';
import { Star, ShoppingCart, ArrowLeft, Shield, Truck } from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, isLoading } = useStore();
  
  const product = products.find(p => p.id === Number(id));

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="inline-block w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500">Загрузка товара...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Товар не найден</h2>
        <Link to="/catalog">
          <Button variant="primary">Вернуться в каталог</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/catalog" className="inline-flex items-center text-slate-500 hover:text-brand-500 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Назад в каталог
      </Link>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          
          {/* Image */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden aspect-square flex items-center justify-center">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
               <span className="text-sm font-bold text-brand-500 uppercase tracking-wider">{product.category}</span>
               <div className="flex items-center gap-1 text-yellow-500">
                 <Star className="w-5 h-5 fill-current" />
                 <span className="font-bold text-slate-900 dark:text-white">{product.rating}</span>
               </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">{product.name}</h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-6">{product.brand}</p>
            
            <div className="prose dark:prose-invert mb-8 text-slate-600 dark:text-slate-300">
              <p>{product.description || "Описание товара временно отсутствует. Это высококачественный инструмент, соответствующий профессиональным стандартам."}</p>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-brand-600 dark:text-brand-400">{product.price.toLocaleString()} ₽</span>
                {product.oldPrice && (
                  <span className="text-xl text-slate-400 line-through decoration-red-500">{product.oldPrice.toLocaleString()} ₽</span>
                )}
              </div>

              <div className="flex gap-4 mb-8">
                <Button size="lg" className="w-full md:w-auto px-12" onClick={() => addToCart(product)}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Добавить в корзину
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-brand-500" />
                  <span>2 года гарантии</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-brand-500" />
                  <span>Быстрая доставка</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};