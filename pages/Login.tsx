import React, { useState } from 'react';
import { useStore } from '../store';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Lock, Mail, Hammer, AlertCircle, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { User } from '../types';

type LoginView = 'login' | 'forgot-password' | 'reset-success';

export const LoginPage: React.FC = () => {
  const { login, t } = useStore();
  const navigate = useNavigate();
  const [view, setView] = useState<LoginView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === 'admin@toolstore.pro' && password === 'admin123') {
      const adminUser: User = {
        id: 'admin-1',
        name: 'Администратор',
        email: email,
        role: 'admin'
      };
      login(adminUser);
      navigate('/admin');
      return;
    }

    if (email && password) {
      const user: User = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        role: 'user'
      };
      login(user);
      navigate('/');
    } else {
        setError(t('auth.noAccount'));
        setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Enter email");
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setView('reset-success');
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950 font-sans">
      {/* Left Side - Image & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-16 w-full text-white">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center">
               <Hammer className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight">TOOL<span className="text-brand-500">STORE</span></span>
          </div>

          <div className="space-y-6">
            <h2 className="text-5xl font-bold leading-tight">
              {t('hero.title')}
            </h2>
            <p className="text-xl text-slate-300 max-w-lg">
              {t('hero.desc')}
            </p>
          </div>

          <div className="text-sm text-slate-500">
            {t('footer.copyright')}
          </div>
        </div>
      </div>

      {/* Right Side - Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 bg-white dark:bg-slate-950">
        <div className="max-w-md w-full space-y-8 animate-in fade-in duration-500">
          
          {view === 'login' && (
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('auth.loginTitle')}</h1>
                <p className="mt-2 text-slate-600 dark:text-slate-400">{t('auth.loginDesc')}</p>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-red-600 p-4 rounded-xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" /> 
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900 dark:text-white">Email</label>
                  <div className="relative">
                    <Mail className="w-5 h-5 absolute left-3 top-3.5 text-slate-400" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-brand-500 outline-none transition-all font-medium text-slate-900 dark:text-white"
                      placeholder={t('auth.emailPlaceholder')}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-slate-900 dark:text-white">Пароль</label>
                    <button 
                      type="button"
                      onClick={() => setView('forgot-password')}
                      className="text-sm text-brand-600 hover:text-brand-500 font-medium transition-colors"
                    >
                      {t('auth.forgotPass')}
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-5 h-5 absolute left-3 top-3.5 text-slate-400" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-brand-500 outline-none transition-all font-medium text-slate-900 dark:text-white"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-4 text-lg" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      {t('auth.loginBtn')} <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                 <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{t('auth.demoAccess')}</p>
                   <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 font-mono">
                     <span>admin@toolstore.pro</span>
                     <span>admin123</span>
                   </div>
                 </div>
              </div>

              <p className="text-center text-slate-600 dark:text-slate-400">
                {t('auth.noAccount')}{' '}
                <Link to="/register" className="text-brand-600 font-bold hover:text-brand-500">
                  {t('nav.register')}
                </Link>
              </p>
            </div>
          )}

          {view === 'forgot-password' && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              <button 
                onClick={() => { setView('login'); setError(''); }}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand-500 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> {t('common.back')}
              </button>

              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('auth.resetTitle')}</h1>
                <p className="mt-2 text-slate-600 dark:text-slate-400">{t('auth.resetDesc')}</p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900 dark:text-white">Email</label>
                  <div className="relative">
                    <Mail className="w-5 h-5 absolute left-3 top-3.5 text-slate-400" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-brand-500 outline-none transition-all font-medium text-slate-900 dark:text-white"
                      placeholder={t('auth.emailPlaceholder')}
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-4" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                  ) : (
                    t('common.send')
                  )}
                </Button>
              </form>
            </div>
          )}

          {view === 'reset-success' && (
            <div className="text-center space-y-8 py-8 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('auth.resetSuccess')}</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {t('auth.resetSuccessDesc')}
                </p>
              </div>

              <div className="pt-8">
                <Button 
                  onClick={() => { setView('login'); setError(''); }} 
                  variant="outline"
                  className="w-full py-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> {t('common.back')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};