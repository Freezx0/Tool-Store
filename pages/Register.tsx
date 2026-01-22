import React, { useState } from 'react';
import { useStore } from '../store';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Lock, Mail, User, Hammer, ArrowRight } from 'lucide-react';
import { User as UserType } from '../types';

export const RegisterPage: React.FC = () => {
  const { login } = useStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const newUser: UserType = {
      id: `user-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      role: 'user'
    };
    login(newUser);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950">
      {/* Left Side - Image & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-40"></div>
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
              Создайте аккаунт и <span className="text-brand-500">начните работу</span>
            </h2>
            <ul className="space-y-4 text-lg text-slate-300">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-500" /> Отслеживание заказов
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-500" /> История покупок
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-500" /> Персональные скидки
              </li>
            </ul>
          </div>

          <div className="text-sm text-slate-500">
            © 2026 ToolStore Pro. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 overflow-y-auto">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Регистрация</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Заполните форму для создания нового аккаунта</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 dark:text-white">Имя</label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3 top-3.5 text-slate-400" />
                <input 
                  name="name"
                  type="text" 
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all font-medium text-slate-900 dark:text-white"
                  placeholder="Иван Иванов"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 dark:text-white">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-3.5 text-slate-400" />
                <input 
                  name="email"
                  type="email" 
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all font-medium text-slate-900 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 dark:text-white">Пароль</label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3 top-3.5 text-slate-400" />
                  <input 
                    name="password"
                    type="password" 
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all font-medium text-slate-900 dark:text-white"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 dark:text-white">Подтверждение</label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3 top-3.5 text-slate-400" />
                  <input 
                    name="confirmPassword"
                    type="password" 
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all font-medium text-slate-900 dark:text-white"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-4 text-lg shadow-xl shadow-brand-500/20 hover:shadow-brand-500/30 transition-all duration-300 mt-4" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Создать аккаунт <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>
          </form>

          <p className="text-center text-slate-600 dark:text-slate-400 mt-8">
            Уже есть аккаунт?{' '}
            <Link to="/login" className="text-brand-600 font-bold hover:text-brand-500 hover:underline">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};