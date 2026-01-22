import React, { useState } from 'react';
import { useStore } from '../store';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Lock, Mail, Hammer, AlertCircle, ArrowRight } from 'lucide-react';
import { User } from '../types';

export const LoginPage: React.FC = () => {
  const { login } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Hardcoded Admin Logic
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

    // Mock Regular User Logic
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
        setError("Пожалуйста, заполните все поля");
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950">
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
              Профессиональный инструмент для <span className="text-brand-500">настоящих мастеров</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-lg">
              Доступ к более чем 10,000 позиций. Специальные цены для профессионалов. Официальная гарантия.
            </p>
          </div>

          <div className="text-sm text-slate-500">
            © 2026 ToolStore Pro. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">С возвращением</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Войдите в свой аккаунт для доступа к магазину</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
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
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all font-medium text-slate-900 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-900 dark:text-white">Пароль</label>
                <a href="#" className="text-sm text-brand-600 hover:text-brand-500 font-medium">Забыли пароль?</a>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-3.5 text-slate-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all font-medium text-slate-900 dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-4 text-lg shadow-xl shadow-brand-500/20 hover:shadow-brand-500/30 transition-all duration-300" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Войти <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
             <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
               <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Демо доступ (Админ):</p>
               <div className="flex justify-between text-sm text-slate-700 dark:text-slate-300 font-mono">
                 <span>admin@toolstore.pro</span>
                 <span>admin123</span>
               </div>
             </div>
          </div>

          <p className="text-center text-slate-600 dark:text-slate-400">
            Нет аккаунта?{' '}
            <Link to="/register" className="text-brand-600 font-bold hover:text-brand-500 hover:underline">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};