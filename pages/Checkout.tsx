import React, { useState } from 'react';
import { useStore } from '../store';
import { Button } from '../components/Button';
import { CreditCard, Truck, CheckCircle, Lock, Download, Printer, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const { cartItems, clearCart, addOrder } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Create new order
    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(),
      total: total,
      status: 'paid',
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        address: `${formData.city}, ${formData.address}`
      },
      items: [...cartItems]
    };

    // Process payment (Simulated)
    setTimeout(() => {
      addOrder(newOrder);
      setCompletedOrder(newOrder);
      clearCart();
      setStep('success');
      setIsProcessing(false);
      window.scrollTo(0, 0);
    }, 2000);
  };

  if (step === 'success' && completedOrder) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-12 px-4 flex items-center justify-center">
        <div className="bg-white dark:bg-slate-900 w-full max-w-lg shadow-2xl rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-300">
          
          {/* Header */}
          <div className="bg-brand-500 p-8 text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-1">Оплата прошла успешно!</h2>
            <p className="text-brand-100 text-sm">Спасибо за ваш заказ</p>
          </div>

          {/* Receipt Body */}
          <div className="p-8">
            <div className="text-center mb-8">
              <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold mb-1">Электронный чек</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{completedOrder.total.toLocaleString()} ₽</h3>
              <p className="text-sm text-slate-500 mt-2">{new Date(completedOrder.date).toLocaleDateString('ru-RU')} • {new Date(completedOrder.date).toLocaleTimeString('ru-RU')}</p>
            </div>

            <div className="space-y-4 mb-8 border-t border-b border-dashed border-slate-300 dark:border-slate-700 py-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Номер заказа</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">#{completedOrder.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Статус</span>
                <span className="font-bold text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded text-xs uppercase">Оплачено</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Карта</span>
                <span className="font-mono text-slate-900 dark:text-white">**** **** **** {formData.cardNumber.slice(-4) || '4242'}</span>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3 mb-8">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Состав заказа</p>
              {completedOrder.items.map(item => (
                <div key={item.id} className="flex justify-between items-start text-sm">
                  <div className="flex gap-2">
                    <span className="text-slate-500 w-4">{item.quantity}x</span>
                    <span className="text-slate-900 dark:text-white max-w-[200px] truncate">{item.name}</span>
                  </div>
                  <span className="font-medium text-slate-900 dark:text-white">{(item.price * item.quantity).toLocaleString()} ₽</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Скачать
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Printer className="w-4 h-4" /> Печать
              </Button>
            </div>

            <Button onClick={() => navigate('/')} className="w-full" size="lg">
              Вернуться в магазин
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
           <ShoppingBag className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Корзина пуста</h2>
        <p className="text-slate-500 mb-8">Добавьте товары, чтобы оформить заказ</p>
        <Button onClick={() => navigate('/catalog')}>Перейти к покупкам</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Оформление заказа</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Forms */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Shipping Info */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
              <Truck className="w-5 h-5 text-brand-500" />
              <h2 className="text-xl font-bold">Адрес доставки</h2>
            </div>
            
            <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Имя</label>
                <input required name="firstName" onChange={handleInputChange} className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Иван" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Фамилия</label>
                <input required name="lastName" onChange={handleInputChange} className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Иванов" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                <input required type="email" name="email" onChange={handleInputChange} className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="ivan@example.com" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Адрес</label>
                <input required name="address" onChange={handleInputChange} className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Улица, дом, квартира" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Город</label>
                <input required name="city" onChange={handleInputChange} className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Индекс</label>
                <input required name="zip" onChange={handleInputChange} className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 outline-none" />
              </div>
            </form>
          </div>

          {/* Payment Info */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
              <CreditCard className="w-5 h-5 text-brand-500" />
              <h2 className="text-xl font-bold">Оплата картой</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Номер карты</label>
                <div className="relative">
                  <input required name="cardNumber" placeholder="0000 0000 0000 0000" onChange={handleInputChange} className="w-full p-2.5 pl-10 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 outline-none" />
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Срок действия</label>
                <input required name="expiry" placeholder="MM/YY" onChange={handleInputChange} className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">CVC</label>
                <input required name="cvc" placeholder="123" onChange={handleInputChange} className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 outline-none" />
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
               <Lock className="w-3 h-3" />
               <span>Данные защищены шифрованием SSL. Это демо-режим, деньги не списываются.</span>
            </div>
          </div>

        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Ваш заказ</h3>
            
            <div className="space-y-4 mb-6 max-h-80 overflow-auto pr-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-3 text-sm">
                  <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden shrink-0">
                     <img src={item.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 dark:text-white line-clamp-2">{item.name}</p>
                    <p className="text-slate-500">{item.quantity} шт x {item.price.toLocaleString()} ₽</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-sm">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Товары ({cartItems.length})</span>
                <span>{total.toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Доставка</span>
                <span className="text-green-500 font-medium">Бесплатно</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-slate-900 dark:text-white pt-2">
                <span>Итого</span>
                <span>{total.toLocaleString()} ₽</span>
              </div>
            </div>

            <Button 
              type="submit" 
              form="checkout-form"
              className="w-full mt-6" 
              size="lg"
              disabled={isProcessing}
            >
              {isProcessing ? 'Обработка...' : 'Оплатить заказ'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};