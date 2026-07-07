import React from 'react';
import { motion } from 'motion/react';
import { Shield, ArrowLeft, CheckCircle2, FileText, UserCheck, Star } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeroProps {
  theme: 'dark' | 'light';
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Hero({ theme, setActiveTab }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className={`relative overflow-hidden pt-10 pb-16 md:py-24 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#0A1628] text-white' 
        : 'bg-[#F5F5F0] text-[#0A1628]'
    }`} id="hero-section">
      
      {/* Decorative Courthouse Columns Background Concept */}
      <div className="absolute inset-0 opacity-15 pointer-events-none select-none overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-[350px] flex justify-around items-end px-10">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className={`w-14 md:w-20 rounded-t-lg transition-colors duration-300 ${
                theme === 'dark' ? 'bg-[#1E3A5F]/40' : 'bg-[#0A1628]/10'
              }`} 
              style={{ height: `${120 + i * 25}px` }}
            />
          ))}
        </div>
        {/* Abstract Gold Glow Grid */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#C9A227]/10 blur-[100px]" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-[#1E3A5F]/20 blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Right Column: Hero Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-right"
          >
            {/* Tagline Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#C9A227]/10 text-[#C9A227] border border-[#C9A227]/30">
              <Shield size={14} />
              <span>مورد اعتمادترین دفتر وکالت پایتخت</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={itemVariants} 
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-right"
            >
              <span className="block text-[#C9A227] font-serif italic mb-1">Justice & Honor</span>
              حقوق شما، <span className="underline decoration-[#C9A227] decoration-wavy underline-offset-8">تخصص ماست</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={itemVariants} 
              className={`text-base sm:text-lg max-w-xl leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              بیش از ۱۵ سال تجربه مستمر در دفاع از حقوق اشخاص حقیقی و حقوقی در مراجع قضایی. ما در دپارتمان تخصصی دادآرا، آرامش فکری و عدالت را برای شما به ارمغان می‌آوریم.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2 justify-start">
              <button
                onClick={() => {
                  setActiveTab('contact');
                  window.scrollTo({ top: document.getElementById('contact-section')?.offsetTop, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 bg-[#C9A227] hover:bg-[#B28F1F] text-[#0A1628] font-bold px-7 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>مشاوره رایگان</span>
                <ArrowLeft size={16} />
              </button>
              
              <button
                onClick={() => {
                  setActiveTab('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 px-6 py-4 rounded-xl font-bold border transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
                  theme === 'dark'
                    ? 'border-slate-700 bg-slate-900/35 hover:bg-slate-800 hover:border-slate-500 text-white'
                    : 'border-slate-300 bg-white hover:bg-slate-50 hover:border-[#0A1628] text-[#0A1628]'
                }`}
              >
                <span>بررسی خدمات و پرونده‌ها</span>
              </button>
            </motion.div>

            {/* Core Badges */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-slate-500/15"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <CheckCircle2 size={16} className="text-[#C9A227]" />
                <span>پشتیبانی و پاسخگویی منظم</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <CheckCircle2 size={16} className="text-[#C9A227]" />
                <span>تعرفه منصفانه با امکان پرداخت اقساط</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <CheckCircle2 size={16} className="text-[#C9A227]" />
                <span>رعایت مطلق اصل محرمانگی اسرار</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Left Column: Visual and Stats Card Layout */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Main Visual Frame */}
            <div className={`relative rounded-3xl overflow-hidden shadow-2xl border-2 transition-colors duration-300 ${
              theme === 'dark' ? 'border-[#1E3A5F]' : 'border-white'
            }`}>
              {/* Overlay with subtle law aesthetics */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/30 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800&h=1000" 
                alt="دفتر وکالت دادآرا" 
                className="w-full h-[400px] md:h-[500px] object-cover object-center transform scale-105 hover:scale-100 transition-transform duration-1000"
              />
              
              {/* Content overlay bottom */}
              <div className="absolute bottom-6 right-6 left-6 z-20 text-right text-white">
                <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                  <span className="text-xs font-bold text-white mr-1">۴.۹ / ۵</span>
                </div>
                <h4 className="text-lg font-bold">مؤسسه حقوقی بین‌المللی دادآرا</h4>
                <p className="text-xs text-slate-300">خدمات یکپارچه حقوقی، ثبتی و کیفری با استانداردهای نوین کشور</p>
              </div>
            </div>

            {/* Stats Overlay Cards */}
            {/* Card 1: Years */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="absolute -top-6 -right-6 bg-gradient-to-tr from-[#0A1628] to-[#1E3A5F] border border-[#C9A227]/40 text-white rounded-2xl p-4 shadow-xl z-25 text-center w-28 md:w-32"
            >
              <div className="text-2xl md:text-3xl font-black text-[#C9A227]">۱۵+</div>
              <div className="text-[10px] md:text-xs text-slate-300 font-medium mt-1">سال سابقه درخشان</div>
            </motion.div>

            {/* Card 2: Success Rate */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white text-[#0A1628] border border-slate-200 rounded-2xl p-4 shadow-xl z-25 text-center w-28 md:w-32"
            >
              <div className="text-2xl md:text-3xl font-black text-[#0A1628]">۹۸٪</div>
              <div className="text-[10px] md:text-xs text-emerald-600 font-bold mt-1">رضایت و موفقیت</div>
            </motion.div>

            {/* Card 3: Total Cases */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="absolute -bottom-6 -left-4 bg-gradient-to-tr from-[#C9A227] to-[#B28F1F] text-[#0A1628] rounded-2xl p-4 shadow-xl z-25 text-center w-32 md:w-36"
            >
              <div className="text-2xl md:text-3xl font-black">+۲۰۰۰</div>
              <div className="text-[10px] md:text-xs font-bold mt-1">پرونده حقوقی موفق</div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}
