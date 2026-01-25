import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, Send, MessageSquare, ExternalLink, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';
import { useStore } from '../store';

export const ContactsPage: React.FC = () => {
  const { t } = useStore();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const mapUrl = 'https://yandex.ru/maps/-/CDRiy-1S';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    // Имитация отправки данных
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header Section */}
      <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight animate-in slide-in-from-top-4 duration-500">
            {t('contacts.title')}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed animate-in fade-in duration-700 delay-100">
            {t('contacts.desc')}
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
                  {t('contacts.store')}
                </h3>
                <div className="pl-4 border-l-2 border-brand-500">
                  <p className="text-xl text-slate-800 dark:text-slate-200 font-bold mb-1">
                    {t('contacts.address')}
                  </p>
                  <p className="text-slate-500">{t('contacts.addressSub')}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-900 dark:text-white font-semibold">
                    <Clock className="w-5 h-5 text-brand-500" /> {t('contacts.hours')}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <p className="flex justify-between"><span>{t('contacts.weekdays')}:</span> <span>09:00 - 21:00</span></p>
                    <p className="flex justify-between"><span>{t('contacts.weekends')}:</span> <span>10:00 - 20:00</span></p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-900 dark:text-white font-semibold">
                    <Phone className="w-5 h-5 text-brand-500" /> {t('footer.contactsTitle')}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <p className="font-mono text-base">+7 (999) 123-45-67</p>
                    <p>zakaz@toolstore.pro</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                 <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-brand-500" /> {t('contacts.formTitle')}
                 </h4>
                 
                 {isSubmitted ? (
                   <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/50 p-8 rounded-2xl text-center animate-in zoom-in duration-300">
                     <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                     <h5 className="text-green-800 dark:text-green-400 font-bold text-lg mb-2">Отправлено!</h5>
                     <p className="text-green-700 dark:text-green-500 text-sm">
                       {t('contacts.formSuccess')}
                     </p>
                   </div>
                 ) : (
                   <form className="space-y-4" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-2 gap-4">
                         <input 
                           required
                           type="text" 
                           placeholder={t('contacts.formName')} 
                           className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all" 
                         />
                         <input 
                           required
                           type="email" 
                           placeholder="Email" 
                           className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all" 
                         />
                      </div>
                      <textarea 
                        required
                        placeholder={t('contacts.formMessage')} 
                        rows={3} 
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                      ></textarea>
                      <Button className="w-full" disabled={isSending}>
                         {isSending ? (
                           <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                         ) : (
                           <Send className="w-4 h-4 mr-2" />
                         )}
                         {t('contacts.formSend')}
                      </Button>
                   </form>
                 )}
              </div>
            </div>

            {/* Map Column (Static Image) */}
            <div className="relative h-[500px] lg:h-auto bg-slate-200 dark:bg-slate-800 overflow-hidden group">
               {/* Static Map Image to prevent Iframe SecurityError */}
               <img 
                 src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" 
                 alt="Map Location" 
                 className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
               />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
               
               {/* Overlay Info Card */}
               <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                  <div className="bg-brand-500/10 p-3 rounded-lg text-brand-600">
                    <Navigation className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{t('contacts.howToGet')}</p>
                    <p className="text-xs text-slate-500">{t('contacts.metro')}</p>
                  </div>
                  <a 
                    href={mapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="shrink-0"
                  >
                    <Button size="sm" variant="primary" className="gap-2">
                      {t('contacts.openMap')} <ExternalLink className="w-3 h-3" />
                    </Button>
                  </a>
               </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
           <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 transition-colors duration-300">
              <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{t('contacts.parking')}</h4>
              <p className="text-slate-500 text-sm">{t('contacts.parkingDesc')}</p>
           </div>
           <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 transition-colors duration-300">
              <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{t('contacts.service')}</h4>
              <p className="text-slate-500 text-sm">{t('contacts.serviceDesc')}</p>
           </div>
           <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 transition-colors duration-300">
              <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{t('contacts.payment')}</h4>
              <p className="text-slate-500 text-sm">{t('contacts.paymentDesc')}</p>
           </div>
        </div>
      </div>
    </div>
  );
};