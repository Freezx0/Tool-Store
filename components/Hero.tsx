import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from './Button';
import { HERO_IMAGE } from '../constants';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-slate-900 py-20 lg:py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={HERO_IMAGE} alt="Workshop Background" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-1.5 mb-6">
            <Zap className="w-4 h-4 text-brand-500" />
            <span className="text-brand-500 font-bold text-sm tracking-wide uppercase">Новая серия PRO</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Стройте лучше с <br />
            <span className="text-brand-500">Premium Инструментом</span>
          </h1>
          
          <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
            Оборудуйте свою мастерскую высококлассным оборудованием и ручным инструментом, созданным для точности, долговечности и производительности. 
            Выбор профессионалов.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/catalog">
              <Button variant="primary" size="lg" className="group w-full sm:w-auto">
                В каталог
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-slate-500 text-slate-300 hover:bg-slate-800 hover:text-white w-full sm:w-auto">
              Смотреть акции
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-8 text-slate-400 text-sm font-medium">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500"></div>
               <span>В наличии</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-brand-500"></div>
               <span>Официальная гарантия</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};