import React from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, Send, MessageSquare } from 'lucide-react';
import { Button } from '../components/Button';

export const ContactsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header Section */}
      <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Наши Контакты</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Посетите наш флагманский магазин в Москве. Профессиональные консультанты, тест-драйв инструмента и сертифицированный сервисный центр.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 -mt-16 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
          <div className="grid lg:grid-cols-2">
            
            {/* Info Column */}
            <div className="p-8 md:p-12 lg:p-16 space-y-10">
              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
                    <MapPin className="w-6 h-6" />
                  </div>
                  Офлайн Магазин
                </h3>
                <div className="pl-4 border-l-2 border-brand-500">
                  <p className="text-xl text-slate-800 dark:text-slate-200 font-bold mb-1">
                    Москва, Пресненская наб., 12
                  </p>
                  <p className="text-slate-500">ММДЦ «Москва-Сити», Башня Федерация</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-900 dark:text-white font-semibold">
                    <Clock className="w-5 h-5 text-brand-500" /> Режим работы
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <p className="flex justify-between"><span>Пн-Пт:</span> <span>09:00 - 21:00</span></p>
                    <p className="flex justify-between"><span>Сб-Вс:</span> <span>10:00 - 20:00</span></p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-900 dark:text-white font-semibold">
                    <Phone className="w-5 h-5 text-brand-500" /> Контакты
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <p className="font-mono text-base">+7 (999) 123-45-67</p>
                    <p>zakaz@toolstore.pro</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                 <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-brand-500" /> Напишите нам
                 </h4>
                 <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                       <input type="text" placeholder="Имя" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none" />
                       <input type="email" placeholder="Email" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none" />
                    </div>
                    <textarea placeholder="Ваше сообщение..." rows={3} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none"></textarea>
                    <Button className="w-full">
                       <Send className="w-4 h-4 mr-2" /> Отправить
                    </Button>
                 </form>
              </div>
            </div>

            {/* Map Column */}
            <div className="relative h-[500px] lg:h-auto bg-slate-200 dark:bg-slate-800">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.584980068564!2d37.53658257723708!3d55.74836699233634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54bdc2069e893%3A0x63102170364f9f4!2z0JzQvtGB0LrQstCwLdCh0LjRgtC4!5e0!3m2!1sru!2sru!4v1710335432000!5m2!1sru!2sru" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen={true} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
               ></iframe>
               
               {/* Overlay Info Card */}
               <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                  <div className="bg-brand-500/10 p-3 rounded-lg text-brand-600">
                    <Navigation className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Как добраться?</p>
                    <p className="text-xs text-slate-500">Метро "Выставочная", выход 4</p>
                  </div>
                  <Button size="sm" variant="outline" className="shrink-0" onClick={() => window.open('https://yandex.ru/maps/-/CDRiy-1S', '_blank')}>
                    Маршрут
                  </Button>
               </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
           <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Парковка</h4>
              <p className="text-slate-500 text-sm">Бесплатная парковка для клиентов магазина в течение 2-х часов.</p>
           </div>
           <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Сервис</h4>
              <p className="text-slate-500 text-sm">Принимаем инструмент на диагностику и ремонт любой сложности.</p>
           </div>
           <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Оплата</h4>
              <p className="text-slate-500 text-sm">Принимаем карты, наличные и безналичный расчет для юр. лиц.</p>
           </div>
        </div>
      </div>
    </div>
  );
};