import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useStore } from '../store';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity } = useStore();
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col h-full">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 z-10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-brand-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Корзина</h2>
            <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold px-2 py-1 rounded-full">
              {cartItems.length}
            </span>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)} 
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <ShoppingBag className="w-16 h-16 text-slate-300 dark:text-slate-600" />
              <p className="text-lg font-medium text-slate-900 dark:text-white">Ваша корзина пуста</p>
              <p className="text-sm text-slate-500">Похоже, вы еще ничего не добавили.</p>
              <Button variant="outline" onClick={() => setIsCartOpen(false)}>Перейти к покупкам</Button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                <div className="w-20 h-20 flex-shrink-0 bg-white dark:bg-slate-800 rounded-md overflow-hidden border border-slate-200 dark:border-slate-700">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-brand-600 dark:text-brand-400 font-medium">{item.price.toLocaleString()} ₽</p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 p-0.5">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:text-brand-500 disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                      <button 
                         onClick={() => updateQuantity(item.id, 1)}
                         className="p-1 hover:text-brand-500"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      {(item.price * item.quantity).toLocaleString()} ₽
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-500 dark:text-slate-400">Итого:</span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{total.toLocaleString()} ₽</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 text-center">Доставка и налоги рассчитываются при оформлении</p>
            <Button variant="primary" size="lg" className="w-full uppercase tracking-widest" onClick={handleCheckout}>
              Оформить заказ
            </Button>
          </div>
        )}
      </div>
    </>
  );
};