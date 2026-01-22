
import React, { useState } from 'react';
import { useStore } from '../store';
import { Button } from '../components/Button';
import { User, Settings as SettingsIcon, Globe, Moon, Sun, CheckCircle2, Palette, ShoppingBag, Package, Calendar, Tag, ArrowRight } from 'lucide-react';

const COLORS = [
  { name: 'Classic Industrial', value: '249 115 22' }, // Orange
  { name: 'Cyber Purple', value: '168 85 247' },    // Purple
  { name: 'Neon Green', value: '34 197 94' },      // Green
  { name: 'Electric Blue', value: '59 130 246' },   // Blue
  { name: 'Toxic Pink', value: '236 72 153' },     // Pink
  { name: 'Midnight Emerald', value: '16 185 129' }, // Emerald
];

export const SettingsPage: React.FC = () => {
  const { t, user, login, isDarkMode, toggleTheme, language, setLanguage, brandColor, setBrandColor, orders } = useStore();
  const [name, setName] = useState(user?.name || '');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      login({ ...user, name });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white flex items-center gap-4">
          <div className="p-3 bg-brand-500 rounded-2xl text-white shadow-2xl shadow-brand-500/40">
            <SettingsIcon className="w-8 h-8" />
          </div>
          {t('settings.title')}
        </h1>
        <div className="text-sm font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700">
          ID: {user?.id}
        </div>
      </div>

      {showSuccess && (
        <div className="mb-8 bg-green-500 text-white p-5 rounded-2xl flex items-center gap-3 shadow-xl shadow-green-500/20 animate-in zoom-in-95">
          <CheckCircle2 className="w-6 h-6" />
          <span className="font-bold">{t('settings.saveSuccess')}</span>
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form & Preferences */}
        <div className="lg:col-span-7 space-y-8">
          {/* Profile Section */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-brand-500/10 transition-colors"></div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
              <User className="w-6 h-6 text-brand-500" />
              {t('settings.profile')}
            </h2>
            <form onSubmit={handleSave} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    {t('settings.displayName')}
                  </label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    {t('settings.email')}
                  </label>
                  <input 
                    type="email" 
                    value={user?.email || ''} 
                    disabled 
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-not-allowed opacity-50 font-medium"
                  />
                </div>
              </div>
              <Button type="submit" size="lg" className="px-12 rounded-2xl shadow-xl hover:scale-105 transition-transform">
                {t('common.save')}
              </Button>
            </form>
          </section>

          {/* Style Section */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
              <Palette className="w-6 h-6 text-brand-500" />
              {t('settings.brandStyle')}
            </h2>
            
            <div className="space-y-10">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setBrandColor(color.value)}
                    className={`group relative flex flex-col items-center gap-3 p-4 rounded-3xl border-2 transition-all ${brandColor === color.value ? 'border-brand-500 bg-brand-500/5' : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600'}`}
                  >
                    <div className="w-12 h-12 rounded-full shadow-lg transform group-hover:scale-110 transition-transform" style={{ backgroundColor: `rgb(${color.value})` }}></div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest text-center ${brandColor === color.value ? 'text-brand-500' : 'text-slate-500'}`}>
                      {color.name}
                    </span>
                    {brandColor === color.value && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-500" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-10 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-lg">{t('settings.language')}</p>
                  <p className="text-sm text-slate-500">Interface language selection</p>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl shadow-inner">
                  {(['ru', 'en', 'uz'] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLanguage(l)}
                      className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all uppercase ${language === l ? 'bg-white dark:bg-slate-700 text-brand-500 shadow-md scale-105' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Order History */}
        <div className="lg:col-span-5">
           <section className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl h-full flex flex-col overflow-hidden">
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-brand-500" />
                  {t('settings.orderHistory')}
                </h2>
                <div className="flex items-center gap-2 bg-brand-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  <Tag className="w-3 h-3" />
                  {orders.length}
                </div>
              </div>
              
              <div className="flex-1 p-6 space-y-5 overflow-y-auto max-h-[750px] custom-scrollbar">
                {orders.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-24 space-y-4">
                    <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-full">
                      <Package className="w-16 h-16 text-slate-400" />
                    </div>
                    <p className="font-bold text-lg">{t('settings.noOrders')}</p>
                  </div>
                ) : (
                  orders.map(order => (
                    <div key={order.id} className="bg-white dark:bg-slate-800 p-6 rounded-[1.5rem] border border-slate-100 dark:border-slate-700 hover:shadow-lg hover:border-brand-500/30 transition-all cursor-default group">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] mb-1">
                            {t('settings.orderId')} #{order.id}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                             <Calendar className="w-3.5 h-3.5" />
                             {new Date(order.date).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-green-200 dark:border-green-800">
                            {t('admin.table.paid')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        {order.items.map((item, i) => (
                           <div key={i} className="flex items-center gap-4 p-2 rounded-xl bg-slate-50 dark:bg-slate-950/40">
                             <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 flex-shrink-0 border border-slate-100 dark:border-slate-700 overflow-hidden">
                                <img src={item.image} className="w-full h-full object-cover" alt="" />
                             </div>
                             <div className="flex-1 min-w-0">
                               <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{item.name}</p>
                               <p className="text-[10px] text-slate-500">{item.brand}</p>
                             </div>
                             <div className="text-xs font-black text-slate-900 dark:text-white">
                               x{item.quantity}
                             </div>
                           </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-5 border-t border-slate-100 dark:border-slate-700">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('settings.total')}</span>
                        <div className="text-right">
                          <span className="text-xl font-black text-slate-900 dark:text-white">
                            {order.total.toLocaleString()} ₽
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
           </section>
        </div>

      </div>
    </div>
  );
};
