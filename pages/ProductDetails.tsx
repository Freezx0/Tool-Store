
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store';
import { Button } from '../components/Button';
import { Star, ShoppingCart, ArrowLeft, Shield, Truck, User, Send, StarHalf } from 'lucide-react';
import { Review } from '../types';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, addReview, isLoading, t, user, language } = useStore();
  
  const product = products.find(p => p.id === Number(id));

  const [reviewName, setReviewName] = useState(user?.name || '');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isHoveredRating, setIsHoveredRating] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="inline-block w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500">{t('common.loading')}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('catalog.noFound')}</h2>
        <Link to="/catalog">
          <Button variant="primary">{t('product.back')}</Button>
        </Link>
      </div>
    );
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      userName: reviewName,
      rating: reviewRating,
      comment: reviewComment,
      date: new Date().toISOString()
    };

    addReview(product.id, newReview);
    setReviewComment('');
    if (!user) setReviewName('');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/catalog" className="inline-flex items-center text-slate-500 hover:text-brand-500 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t('product.back')}
      </Link>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden mb-12">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          
          {/* Image */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden aspect-square flex items-center justify-center relative">
             {product.isNew && (
                <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                  {t('common.new')}
                </span>
              )}
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
               <span className="text-sm font-bold text-brand-500 uppercase tracking-wider">{product.category}</span>
               <div className="flex items-center gap-1 text-yellow-500">
                 <Star className="w-5 h-5 fill-current" />
                 <span className="font-bold text-slate-900 dark:text-white">{product.rating}</span>
               </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">{product.name}</h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-6 font-medium">{product.brand}</p>
            
            <div className="prose dark:prose-invert mb-8 text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>{product.description || t('product.noDesc')}</p>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-black text-brand-500">{product.price.toLocaleString()} ₽</span>
                {product.oldPrice && (
                  <span className="text-xl text-slate-400 line-through decoration-red-500/50">{product.oldPrice.toLocaleString()} ₽</span>
                )}
              </div>

              <div className="flex gap-4 mb-8">
                <Button size="lg" className="w-full md:w-auto px-12 py-5 rounded-2xl shadow-xl shadow-brand-500/20" onClick={() => addToCart(product)}>
                  <ShoppingCart className="w-5 h-5 mr-3" />
                  {t('product.addToCart')}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-500/10 rounded-lg">
                    <Shield className="w-5 h-5 text-brand-500" />
                  </div>
                  <span className="font-bold">{t('product.guarantee')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-500/10 rounded-lg">
                    <Truck className="w-5 h-5 text-brand-500" />
                  </div>
                  <span className="font-bold">{t('product.fastShipping')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Review List */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
              {t('product.reviews')}
              <span className="text-sm bg-slate-100 dark:bg-slate-800 text-slate-500 px-3 py-1 rounded-full">{product.reviews?.length || 0}</span>
            </h3>
          </div>

          {!product.reviews || product.reviews.length === 0 ? (
            <div className="p-12 text-center bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
              <p className="text-slate-500 font-medium">{t('product.noReviews')}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-500 text-white flex items-center justify-center rounded-xl font-bold uppercase shadow-lg shadow-brand-500/20">
                        {review.userName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white leading-none">{review.userName}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                          {new Date(review.date).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US')}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 text-yellow-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`w-4 h-4 ${s <= review.rating ? 'fill-current' : 'text-slate-200 dark:text-slate-700'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Write Review Form */}
        <div className="lg:col-span-5">
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl sticky top-24">
              <h3 className="text-xl font-black mb-8 text-slate-900 dark:text-white uppercase tracking-tight">{t('product.writeReview')}</h3>
              
              <form onSubmit={handleReviewSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('product.reviewerName')}</label>
                  <div className="relative">
                    <User className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                    <input 
                      required 
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder={t('auth.namePlaceholder')}
                      className="w-full p-4 pl-12 rounded-2xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-bold" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('product.reviewRating')}</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        onMouseEnter={() => setIsHoveredRating(star)}
                        onMouseLeave={() => setIsHoveredRating(null)}
                        className="p-1 transition-transform hover:scale-110 active:scale-95"
                      >
                        <Star 
                          className={`w-8 h-8 ${
                            (isHoveredRating !== null ? star <= isHoveredRating : star <= reviewRating) 
                              ? 'text-yellow-500 fill-current' 
                              : 'text-slate-200 dark:text-slate-700'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('product.reviewText')}</label>
                  <textarea 
                    required 
                    rows={4}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full p-4 rounded-2xl border bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-bold resize-none" 
                  />
                </div>

                <Button type="submit" className="w-full py-5 rounded-2xl text-lg shadow-xl shadow-brand-500/20 transition-all hover:scale-[1.02]">
                  <Send className="w-5 h-5 mr-3" />
                  {t('product.submitReview')}
                </Button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};
