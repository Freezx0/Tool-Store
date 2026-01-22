import React from 'react';
import { Hammer, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-500 text-white flex items-center justify-center rounded-lg">
                <Hammer className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white">TOOL<span className="text-brand-500">STORE</span></span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Ваш надежный партнер в мире профессионального инструмента. 
              Работаем для строителей, механиков и мастеров с 2010 года.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-slate-800 rounded-full hover:bg-brand-500 hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Навигация</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/catalog" className="hover:text-brand-500 transition-colors">Каталог</Link></li>
              <li><Link to="/brands" className="hover:text-brand-500 transition-colors">Бренды</Link></li>
              <li><Link to="/promotions" className="hover:text-brand-500 transition-colors">Акции</Link></li>
              <li><Link to="/news" className="hover:text-brand-500 transition-colors">Новости</Link></li>
              <li><Link to="/contacts" className="hover:text-brand-500 transition-colors">Контакты</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-bold mb-6">Покупателям</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/contacts" className="hover:text-brand-500 transition-colors">Магазины</Link></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Доставка и оплата</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Возврат</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Гарантия</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6">Контакты</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-500 shrink-0" />
                <span>Москва, ул. Индустриальная, д. 42</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                <span>+7 (999) 123-45-67</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-500 shrink-0" />
                <span>zakaz@toolstore.pro</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 text-center text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2026 ToolStore Pro. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white">Публичная оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
};