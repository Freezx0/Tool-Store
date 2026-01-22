import React from 'react';
import { Hero } from '../components/Hero';
import { CATEGORIES } from '../constants';
import { useStore } from '../store';
import { Truck, ShieldCheck, CheckCircle, Clock } from 'lucide-react';
import { CategoryType } from '../types';
import { Link, useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const { setFilters } = useStore();
  const navigate = useNavigate();

  const handleCategoryClick = (cat: string) => {
    setFilters(prev => ({ ...prev, category: cat as CategoryType }));
    navigate('/catalog');
  };

  return (
    <div>
      <Hero />
      
      {/* Categories Section */}
      <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">Популярные категории</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className="p-6 rounded-xl border transition-all duration-300 flex flex-col items-center gap-4 group bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-brand-500 hover:shadow-md hover:-translate-y-1"
              >
                <div className="text-brand-500 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <span className="font-semibold text-center">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-brand-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Бесплатная доставка", desc: "При заказе от 5000 ₽" },
              { icon: ShieldCheck, title: "Гарантия качества", desc: "2 года от производителя" },
              { icon: CheckCircle, title: "100% Оригинал", desc: "Сертифицированные товары" },
              { icon: Clock, title: "Поддержка 24/7", desc: "Консультации экспертов" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-brand-100 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};