
import React, { useState } from 'react';
import { useStore } from '../store';
import { Product } from '../types';
import { Button } from '../components/Button';
import { Trash2, Plus, Package, ShoppingBag, CreditCard } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { BRANDS } from '../types';

export const AdminPage: React.FC = () => {
  // Fix: Added language to the destructuring of useStore() to resolve the compilation error on line 222
  const { products, addProduct, deleteProduct, orders, t, language } = useStore();
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'Электроинструмент',
    brand: 'Makita',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    stock: 10,
    rating: 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const productToAdd: Product = {
      id: Date.now(),
      name: newProduct.name,
      price: Number(newProduct.price),
      category: newProduct.category || 'Прочее',
      brand: newProduct.brand || 'No Brand',
      image: newProduct.image || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      stock: newProduct.stock || 0,
      rating: 5,
      isNew: true
    };

    addProduct(productToAdd);
    setNewProduct({
      name: '',
      price: 0,
      category: 'Электроинструмент',
      brand: 'Makita',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      stock: 10,
      rating: 5,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('admin.title')}</h1>
        
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'products' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
          >
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" /> {t('admin.tabs.products')}
            </div>
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'orders' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
          >
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> {t('admin.tabs.orders')} ({orders.length})
            </div>
          </button>
        </div>
      </div>

      {activeTab === 'products' ? (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add Product Form */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('admin.addForm.title')}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('admin.addForm.name')}</label>
                  <input 
                    type="text" 
                    value={newProduct.name}
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-brand-500 outline-none"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('admin.addForm.price')}</label>
                    <input 
                      type="number" 
                      value={newProduct.price}
                      onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                      className="w-full p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-brand-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('admin.addForm.stock')}</label>
                    <input 
                      type="number" 
                      value={newProduct.stock}
                      onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                      className="w-full p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-brand-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('admin.addForm.category')}</label>
                  <select 
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-brand-500 outline-none"
                  >
                    {CATEGORIES.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('admin.addForm.brand')}</label>
                  <select 
                    value={newProduct.brand}
                    onChange={e => setNewProduct({...newProduct, brand: e.target.value})}
                    className="w-full p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-brand-500 outline-none"
                  >
                    {BRANDS.filter(b => b !== 'Все').map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('admin.addForm.imageUrl')}</label>
                  <input 
                    type="text" 
                    value={newProduct.image}
                    onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                    className="w-full p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Plus className="w-5 h-5 mr-2" /> {t('admin.addForm.addBtn')}
                </Button>
              </form>
            </div>
          </div>

          {/* Product List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm uppercase">
                    <tr>
                      <th className="p-4">{t('admin.table.product')}</th>
                      <th className="p-4">{t('admin.table.category')}</th>
                      <th className="p-4">{t('admin.table.price')}</th>
                      <th className="p-4 text-right">{t('admin.table.actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {products.map(product => (
                      <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt="" className="w-10 h-10 rounded-md object-cover bg-slate-200" />
                            <div>
                              <div className="font-medium text-slate-900 dark:text-white text-sm">{product.name}</div>
                              <div className="text-[10px] text-slate-500">{product.brand}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-xs text-slate-600 dark:text-slate-300">{product.category}</td>
                        <td className="p-4 font-bold text-slate-900 dark:text-white text-sm">{product.price.toLocaleString()} ₽</td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => deleteProduct(product.id)}
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            {orders.length === 0 ? (
               <div className="p-10 text-center text-slate-500">
                 <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-30" />
                 <p>{t('admin.table.noOrders')}</p>
               </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm uppercase">
                  <tr>
                    <th className="p-4">{t('admin.table.orderId')}</th>
                    <th className="p-4">{t('admin.table.date')}</th>
                    <th className="p-4">{t('admin.table.customer')}</th>
                    <th className="p-4">{t('admin.table.items')}</th>
                    <th className="p-4">{t('admin.table.price')}</th>
                    <th className="p-4">{t('admin.table.status')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-4 font-mono text-xs font-bold">#{order.id}</td>
                      <td className="p-4 text-xs text-slate-500">
                        {new Date(order.date).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US')}
                      </td>
                      <td className="p-4">
                        <div className="text-xs font-medium text-slate-900 dark:text-white">{order.customer.name}</div>
                        <div className="text-[10px] text-slate-500">{order.customer.email}</div>
                      </td>
                      <td className="p-4 text-xs">
                        {order.items.length} {t('cart.itemsCount')}
                      </td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white text-sm">{order.total.toLocaleString()} ₽</td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          {t('admin.table.paid')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
