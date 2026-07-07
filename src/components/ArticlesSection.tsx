import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, ArrowLeft, Share2, Facebook, MessageSquare, Check, Phone } from 'lucide-react';
import { Article } from '../types';
import { articlesData } from '../data';

interface ArticlesSectionProps {
  theme: 'dark' | 'light';
  isFullPage?: boolean;
}

export default function ArticlesSection({ theme, isFullPage = false }: ArticlesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  const categories = [
    { id: 'all', label: 'همه مقالات' },
    { id: 'melki', label: 'حقوق ملکی' },
    { id: 'khanevade', label: 'حقوق خانواده' },
    { id: 'keyfari', label: 'حقوق کیفری' },
    { id: 'sabt', label: 'ثبت شرکت و برند' }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articlesData 
    : articlesData.filter(art => art.category === selectedCategory);

  // Latest 3 articles for home page preview
  const previewArticles = articlesData.slice(0, 3);

  const handleArticleClick = (article: Article) => {
    setActiveArticle(article);
    setShareSuccess(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    // Copy fake link to clipboard
    navigator.clipboard.writeText(window.location.href);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2000);
  };

  // 1. Reading view of an individual article
  if (activeArticle) {
    return (
      <section className={`py-16 md:py-24 transition-colors duration-300 text-right ${
        theme === 'dark' ? 'bg-[#0A1628] text-white' : 'bg-[#FFFFFF] text-[#0A1628]'
      }`} id="article-detail-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Back Button */}
          <button 
            onClick={() => setActiveArticle(null)}
            className={`flex items-center gap-2 mb-8 font-bold text-xs px-4 py-2 border rounded-xl transition-colors ${
              theme === 'dark' 
                ? 'border-slate-800 hover:bg-slate-800 text-slate-300' 
                : 'border-slate-200 hover:bg-slate-100 text-slate-700'
            }`}
            id="article-back-btn"
          >
            <Icons.ChevronRight size={16} />
            <span>بازگشت به مقالات حقوقی</span>
          </button>

          {/* Featured Image */}
          <div className="w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-lg border border-slate-500/10 mb-8 relative">
            <img src={activeArticle.imageUrl} alt={activeArticle.title} className="w-full h-full object-cover object-center" />
            <div className="absolute top-4 right-4 bg-[#C9A227] text-[#0A1628] text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
              {activeArticle.categoryLabel}
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-5 text-xs text-slate-400 mb-4 border-b border-slate-500/10 pb-4">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#C9A227]" />
              <span>{activeArticle.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#C9A227]" />
              <span>مدت زمان مطالعه: {activeArticle.readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-black mb-6 leading-snug">{activeArticle.title}</h1>

          {/* Article Body */}
          <div className={`prose max-w-none text-sm md:text-base leading-relaxed space-y-6 ${
            theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
          }`}>
            {activeArticle.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Bottom Share Widget */}
          <div className="border-t border-slate-500/10 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-right">
              <h5 className="text-sm font-bold">مؤلف: گروه پژوهشی دفتر وکالت دادآرا</h5>
              <span className="text-xs text-slate-400">تولید محتوای آموزشی مستند و علمی جهت آگاهی‌بخشی به هم‌وطنان</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-bold">اشتراک‌گذاری مقاله:</span>
              <button 
                onClick={handleShare}
                className="flex items-center gap-1.5 bg-[#C9A227]/10 text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0A1628] border border-[#C9A227]/20 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200"
                id="share-btn"
              >
                {shareSuccess ? <Check size={14} /> : <Share2 size={14} />}
                <span>{shareSuccess ? 'لینک کپی شد' : 'کپی لینک'}</span>
              </button>
            </div>
          </div>

        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 md:py-24 transition-colors duration-300 text-right ${
      theme === 'dark' 
        ? 'bg-[#0A1628] text-white' 
        : 'bg-[#FFFFFF] text-[#0A1628]'
    }`} id="articles-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-wider text-[#C9A227] uppercase bg-[#C9A227]/10 px-3 py-1 rounded-full">
            مستندات و مقالات علمی حقوقی
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-3 mb-4">
            آخرین دستاوردها و مقالات حقوقی کشور
          </h2>
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
            افزایش دانش حقوقی، از بروز بخش عمده‌ای از دعاوی و کلاهبرداری‌ها جلوگیری می‌کند. ما مقالاتی کاربردی و مستند به مواد قانون مدنی و مجازات را برای شما فراهم کرده‌ایم.
          </p>
        </div>

        {/* Categories Tab (Only visible in Full Page mode) */}
        {isFullPage && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4.5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-[#C9A227] text-[#0A1628] shadow-md'
                    : theme === 'dark'
                      ? 'bg-[#1E3A5F]/40 hover:bg-[#1E3A5F]/75 text-slate-300'
                      : 'bg-slate-100 hover:bg-slate-200 text-[#0A1628]/85'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(isFullPage ? filteredArticles : previewArticles).map((art, index) => (
            <motion.article
              key={art.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className={`group flex flex-col justify-between rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-[#1E3A5F]/15 border-slate-800'
                  : 'bg-slate-50/40 border-slate-200 shadow-xs'
              }`}
            >
              
              {/* Photo */}
              <div className="relative h-48 overflow-hidden">
                <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover object-center transform group-hover:scale-103 transition-transform duration-500" />
                <span className="absolute top-4 right-4 bg-[#C9A227] text-[#0A1628] text-[10px] font-bold px-2.5 py-1 rounded">
                  {art.categoryLabel}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-grow flex flex-col justify-between text-right">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-4 text-[10px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="text-[#C9A227]" />
                      <span>{art.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-[#C9A227]" />
                      <span>{art.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-extrabold line-clamp-2 leading-snug group-hover:text-[#C9A227] transition-colors">
                    {art.title}
                  </h3>
                  
                  <p className={`text-xs line-clamp-3 leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    {art.summary}
                  </p>
                </div>

                <button
                  onClick={() => handleArticleClick(art)}
                  className="mt-5 w-full flex items-center justify-center gap-1 text-xs font-bold bg-[#C9A227]/10 group-hover:bg-[#C9A227] text-[#C9A227] group-hover:text-[#0A1628] py-2.5 rounded-xl transition-all duration-300"
                >
                  <span>مطالعه کامل مقاله علمی</span>
                  <Icons.ArrowLeft size={14} className="transform group-hover:-translate-x-1 transition-transform" />
                </button>
              </div>

            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}

// Inline scale mapping as icons resolve in React bundle
const Icons = {
  ChevronRight: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || "24"} height={props.size || "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  ),
  ArrowLeft: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || "24"} height={props.size || "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
    </svg>
  )
};
