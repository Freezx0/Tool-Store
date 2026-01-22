
import React, { useState } from 'react';
import { useStore } from '../store';
import { Button } from '../components/Button';
import { CreditCard, Truck, CheckCircle, Lock, Download, Printer, ShoppingBag, Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const { cartItems, clearCart, addOrder, t, language } = useStore();
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

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.2;
  const shipping = subtotal > 5000 ? 0 : 500;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      date: new Date().toISOString(),
      total: total,
      status: 'paid',
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        address: `${formData.city}, ${formData.address}, ${formData.zip}`
      },
      items: [...cartItems]
    };

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
    const estDelivery = new Date();
    estDelivery.setDate(estDelivery.getDate() + 3);

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 flex items-center justify-center font-sans">
        <div className="w-full max-w-2xl animate-in fade-in zoom-in-95 duration-500">
          
          {/* Main Receipt Card */}
          <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 relative">
            
            {/* Success Header */}
            <div className="bg-brand-500 p-10 text-center text-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12 blur-2xl"></div>
              
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full mb-6 ring-8 ring-white/10">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-black mb-2 uppercase tracking-tight">{t('checkout.success.title')}</h2>
              <p className="text-brand-100 text-sm max-w-xs mx-auto font-medium">{t('checkout.success.thanks')}</p>
            </div>

            <div className="p-8 md:p-12">
              
              {/* Receipt Top Section */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-8 border-b border-dashed border-slate-200 dark:border-slate-700">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em]">{t('checkout.success.receipt')}</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">#{completedOrder.id}</p>
                </div>
                <div className="flex flex-col md:items-end gap-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(completedOrder.date).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <CreditCard className="w-4 h-4" />
                    Visa •••• 4242
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4 mb-10">
                {completedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center gap-4 text-sm">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex-shrink-0 border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <img src={item.image} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="truncate">
                        <p className="font-bold text-slate-900 dark:text-white truncate">{item.name}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.brand} × {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-black text-slate-900 dark:text-white shrink-0">
                      {(item.price * item.quantity).toLocaleString()} ₽
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Breakdown */}
              <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800 mb-10">
                <div className="flex justify-between text-sm text-slate-500 font-bold">
                  <span>{t('checkout.subtotal')}</span>
                  <span>{subtotal.toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500 font-bold">
                  <span>{t('checkout.tax')}</span>
                  <span>{tax.toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500 font-bold">
                  <span>{t('checkout.shipping')}</span>
                  <span className={shipping === 0 ? "text-green-500" : ""}>{shipping === 0 ? "FREE" : `${shipping} ₽`}</span>
                </div>
                <div className="flex justify-between items-center pt-4 mt-2 border-t border-slate-900 dark:border-slate-100">
                  <span className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest">{t('cart.total')}</span>
                  <span className="text-3xl font-black text-brand-500">{completedOrder.total.toLocaleString()} ₽</span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="grid md:grid-cols-2 gap-6 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700 mb-10">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-black text-brand-500 uppercase tracking-widest">
                    <MapPin className="w-3.5 h-3.5" />
                    {t('checkout.shippingTo')}
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-relaxed">
                    {completedOrder.customer.address}
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-black text-brand-500 uppercase tracking-widest">
                    <Truck className="w-3.5 h-3.5" />
                    {t('checkout.estDelivery')}
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {estDelivery.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'long' })}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button className="flex items-center justify-center gap-2 py-4 px-6 rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                  <Printer className="w-4 h-4" /> {t('checkout.print')}
                </button>
                <button className="flex items-center justify-center gap-2 py-4 px-6 rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                  <Download className="w-4 h-4" /> {t('checkout.download')}
                </button>
              </div>

              <Button onClick={() => navigate('/')} className="w-full py-5 rounded-2xl text-lg shadow-xl shadow-brand-500/30 hover:scale-[1.02] transition-transform" size="lg">
                {t('checkout.success.backBtn')}
              </Button>
            </div>
          </div>
          
          <p className="text-center mt-8 text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">
            ToolStore Pro Industrial Systems
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-brand-500 rounded-2xl text-white shadow-xl shadow-brand-500/20">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{t('checkout.title')}</h1>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Form Column */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white uppercase tracking-wide">
              <Truck className="text-brand-500 w-6 h-6" /> 
              {t('checkout.shippingTitle')}
            </h2>
            <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('checkout.firstName')}</label>
                <input required name="firstName" onChange={handleInputChange} className="w-full p-4 rounded-2xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('checkout.lastName')}</label>
                <input required name="lastName" onChange={handleInputChange} className="w-full p-4 rounded-2xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-bold" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email</label>
                <input required type="email" name="email" onChange={handleInputChange} className="w-full p-4 rounded-2xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-bold" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('checkout.address')}</label>
                <input required name="address" onChange={handleInputChange} className="w-full p-4 rounded-2xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">City</label>
                <input required name="city" onChange={handleInputChange} className="w-full p-4 rounded-2xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">ZIP</label>
                <input required name="zip" onChange={handleInputChange} className="w-full p-4 rounded-2xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-bold" />
              </div>
            </form>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl">
             <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white uppercase tracking-wide">
              <CreditCard className="text-brand-500 w-6 h-6" /> 
              {t('checkout.paymentMethod')}
            </h2>
            <div className="space-y-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Card Number</label>
                 <div className="relative">
                   <CreditCard className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                   <input required name="cardNumber" onChange={handleInputChange} placeholder="0000 0000 0000 0000" className="w-full p-4 pl-12 rounded-2xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-bold" />
                 </div>
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Expiry</label>
                    <input required name="expiry" placeholder="MM/YY" onChange={handleInputChange} className="w-full p-4 rounded-2xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">CVC</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                      <input required name="cvc" placeholder="000" onChange={handleInputChange} className="w-full p-4 pl-12 rounded-2xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-bold" />
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Summary Column */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl sticky top-24">
            <h3 className="text-xl font-black mb-8 text-slate-900 dark:text-white uppercase tracking-tight">{t('checkout.orderSummary')}</h3>
            
            <div className="space-y-6 mb-8 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{item.name}</p>
                      <p className="text-[10px] text-slate-500">x{item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-slate-900 dark:text-white">{(item.price * item.quantity).toLocaleString()} ₽</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6 mb-8">
               <div className="flex justify-between text-sm font-bold text-slate-500">
                  <span>{t('checkout.subtotal')}</span>
                  <span>{subtotal.toLocaleString()} ₽</span>
               </div>
               <div className="flex justify-between text-sm font-bold text-slate-500">
                  <span>{t('checkout.shipping')}</span>
                  <span className={shipping === 0 ? "text-green-500" : ""}>{shipping === 0 ? "FREE" : `${shipping} ₽`}</span>
               </div>
               <div className="flex justify-between items-center pt-4 border-t border-slate-900 dark:border-slate-100">
                  <span className="text-lg font-black text-slate-900 dark:text-white">{t('cart.total')}</span>
                  <span className="text-2xl font-black text-brand-500">{total.toLocaleString()} ₽</span>
               </div>
            </div>

            <Button type="submit" form="checkout-form" className="w-full py-5 rounded-2xl shadow-xl shadow-brand-500/20 transition-all hover:scale-[1.02]" size="lg" disabled={isProcessing}>
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t('checkout.processing')}
                </div>
              ) : t('checkout.payBtn')}
            </Button>
            
            <p className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <Lock className="w-3 h-3" /> Secure SSL Encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
