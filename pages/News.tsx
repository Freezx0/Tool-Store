import React, { useEffect, useState } from 'react';
import { fetchNews } from '../services/mockData';
import { NewsArticle } from '../types';
import { Calendar, Tag, ArrowRight, Rss, X, Loader } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export const NewsPage: React.FC = () => {
  const [allNews, setAllNews] = useState<NewsArticle[]>([]);
  const [displayedNews, setDisplayedNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    fetchNews().then(data => {
      setAllNews(data);
      setDisplayedNews(data.slice(0, visibleCount));
      setIsLoading(false);
    });
  }, []);

  const handleLoadMore = () => {
    const nextCount = visibleCount + 2;
    setVisibleCount(nextCount);
    setDisplayedNews(allNews.slice(0, nextCount));
  };

  const hasMore = visibleCount < allNews.length;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Новости Индустрии</h1>
          <p className="text-slate-500 dark:text-slate-400">Последние обновления от ведущих производителей</p>
        </div>
        <div className="bg-brand-100 dark:bg-brand-900/20 p-3 rounded-full hidden sm:block">
          <Rss className="w-6 h-6 text-brand-600 dark:text-brand-500" />
        </div>
      </div>

      {isLoading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {[1, 2, 3, 4].map(i => (
             <div key={i} className="h-96 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
           ))}
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedNews.map((article) => (
            <article 
              key={article.id} 
              className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium uppercase tracking-wide">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </div>
                  <div className="flex items-center gap-1 text-brand-600 dark:text-brand-400">
                    <Tag className="w-3 h-3" />
                    {article.brand}
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-brand-500 transition-colors">
                  {article.title}
                </h2>
                
                <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="mt-auto">
                   <button 
                     onClick={() => setSelectedArticle(article)}
                     className="inline-flex items-center text-brand-600 dark:text-brand-400 font-bold hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                   >
                     Читать полностью <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {hasMore && !isLoading && (
        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" onClick={handleLoadMore}>
            Загрузить еще новости
          </Button>
        </div>
      )}

      {/* Full Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="h-64 sm:h-80 md:h-96 relative">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <span className="bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                  {selectedArticle.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-2">{selectedArticle.title}</h2>
                <div className="flex gap-4 text-sm opacity-80">
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.brand}</span>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 text-lg text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
              <p className="font-bold text-xl text-slate-900 dark:text-white">
                {selectedArticle.excerpt}
              </p>
              
              {selectedArticle.content.split('\n').map((paragraph, index) => (
                <p key={index} className={paragraph ? "mb-4" : "mb-0"}>
                  {paragraph}
                </p>
              ))}

              <blockquote className="border-l-4 border-brand-500 pl-4 italic text-slate-500 dark:text-slate-400 my-8">
                "Инновации - это то, что отличает лидера от догоняющего." - Представитель {selectedArticle.brand}
              </blockquote>
            </div>

            <div className="p-8 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <Button onClick={() => setSelectedArticle(null)}>Закрыть</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};