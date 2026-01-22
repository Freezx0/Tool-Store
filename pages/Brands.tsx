import React from 'react';
import { BRAND_DETAILS } from '../constants';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Star } from 'lucide-react';

export const BrandsPage: React.FC = () => {
  const { setFilters, t } = useStore();
  const navigate = useNavigate();

  const handleBrandClick = (brandName: string) => {
    setFilters(prev => ({ ...prev, brand: brandName }));
    navigate('/catalog');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">{t('brands.title')}</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          {t('brands.desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {BRAND_DETAILS.map((brand, index) => (
          <div 
            key={brand.name}
            onClick={() => handleBrandClick(brand.name)}
            className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <img 
              src={brand.image} 
              alt={brand.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h2 className="text-3xl font-black uppercase mb-2 tracking-wide">{brand.name}</h2>
                <p className="text-brand-400 font-bold text-xs mb-3 uppercase tracking-widest">{brand.slogan}</p>
                <p className="text-slate-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 leading-relaxed line-clamp-2">
                  {brand.description}
                </p>
                
                <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-brand-400 transition-colors uppercase tracking-widest">
                  <span>{t('brands.goToCatalog')}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2">
               <BadgeCheck className="w-5 h-5 text-white" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center"></div>
         <div className="relative z-10">
            <Star className="w-16 h-16 text-brand-500 mx-auto mb-6 fill-current animate-pulse" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('brands.guarantee')}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-8 text-sm md:text-base">
              {t('brands.guaranteeDesc')}
            </p>
            <button 
              onClick={() => navigate('/catalog')}
              className="inline-flex items-center justify-center px-10 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-lg transition-all shadow-xl shadow-brand-500/20 uppercase tracking-widest text-xs"
            >
              {t('brands.viewCerts')}
            </button>
         </div>
      </div>
    </div>
  );
};