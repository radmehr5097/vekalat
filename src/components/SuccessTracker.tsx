import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Shield, Quote, ChevronLeft, ChevronRight, Award, Trophy, Users } from 'lucide-react';
import { trustBadges } from '../data';

interface SuccessTrackerProps {
  theme: 'dark' | 'light';
}

export default function SuccessTracker({ theme }: SuccessTrackerProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const stats = [
    { label: 'پرونده‌های ملکی موفق', value: '۹۹.۲٪', detail: 'بالاترین تخصص خلع ید و الزام به سند' },
    { label: 'دعاوی تجاری پیروز شده', value: '۹۸.۴٪', detail: 'حفظ دارایی شرکت‌ها و اشخاص حقوقی' },
    { label: 'پرونده‌های کیفری مختومه', value: '۹۶٪', detail: 'تبرئه و دفاع مستند در دادسراها' },
    { label: 'آزادی مبالغ مالی معلق', value: '۱,۴۰۰+', detail: 'میلیارد ریال توقیف موفق اموال بدهکاران' }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'مهندس کامران رستمی',
      role: 'مدیرعامل هلدینگ ساختمانی آریا',
      comment: 'در پرونده الزام به تنظیم سند رسمی و خلع ید پروژه تجاری نیاوران که ارزش میلیاردی داشت و به دلیل کلاهبرداری سازنده قبلی سال‌ها راکد مانده بود، تخصص دکتر هاشمی و تیم دادآرا بی‌نظیر بود. در کمتر از ۸ ماه رای قطعی دادگاه را گرفتیم. کمال تشکر را دارم.',
      rating: 5,
      service: 'دعاوی ملکی و اراضی'
    },
    {
      id: 2,
      name: 'سرکار خانم فریبا علیزاده',
      role: 'کارآفرین و صادرکننده مواد غذایی',
      comment: 'ثبت لوگوی تجاری و ثبت شرکت ما در آلمان کار آسانی نبود. همکاران بخش بین‌الملل دادآرا با پیگیری‌های بی‌وقفه و دانش فوق‌العاده‌شان برند ما را ثبت کردند. شفافیت مالی آن‌ها و پاسخگویی منظم‌شان واقعاً در ایران بی‌سابقه است.',
      rating: 5,
      service: 'ثبت شرکت و علائم تجاری'
    },
    {
      id: 3,
      name: 'دکتر بهمن قادری',
      role: 'پزشک متخصص قلب',
      comment: 'برای یک اختلاف خانوادگی بسیار پیچیده مالی و انحصار وراثت به مریم دادخواه مراجعه کردم. ایشان با سعه صدر، متانت و رویکردی کاملاً انسانی ابتدا تلاش برای سازش کردند و در نهایت از منافع قانونی خانواده من با صلابت تمام دفاع نمودند.',
      rating: 5,
      service: 'حقوق و دعاوی خانواده'
    }
  ];

  const handleNext = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className={`py-16 md:py-24 transition-colors duration-300 border-b ${
      theme === 'dark' 
        ? 'bg-[#1E3A5F]/10 border-slate-800 text-white' 
        : 'bg-[#F5F5F0]/50 border-slate-200 text-[#0A1628]'
    }`} id="success-tracker-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-wider text-[#C9A227] uppercase bg-[#C9A227]/10 px-3 py-1 rounded-full">
            کارنامه موفقیت و رضایت مراجعین
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-3 mb-4">
            آمارهای مستند موفقیت پرونده‌ها و گواهی مراجعین
          </h2>
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
            بزرگ‌ترین دارایی دفتر وکالت ما، اعتمادی است که مراجعین در سخت‌ترین شرایط زندگی خود به ما سپرده‌اند. ما این اعتماد را با پشتکار علمی پاسخ می‌دهیم.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Right Side: Stats Tracker Grid (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`p-6 rounded-2xl border text-right flex flex-col justify-between ${
                  theme === 'dark'
                    ? 'bg-[#0A1628]/85 border-slate-800'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div>
                  <span className="text-xs font-semibold text-slate-400 block mb-1">{stat.label}</span>
                  <div className="text-3xl md:text-4xl font-black text-[#C9A227] tracking-tight">{stat.value}</div>
                </div>
                <p className="text-[11px] text-slate-400 font-medium border-t border-slate-500/10 pt-3 mt-4">
                  {stat.detail}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Left Side: Client Testimonial Card Slider (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className={`p-8 rounded-3xl border-2 h-full flex flex-col justify-between relative ${
              theme === 'dark' ? 'bg-[#1E3A5F]/20 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
            }`}>
              
              {/* Quote Icon Background */}
              <div className="absolute top-6 left-6 text-[#C9A227]/10 pointer-events-none">
                <Quote size={80} fill="currentColor" />
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <span className="inline-block px-2.5 py-1 text-[10px] font-bold bg-[#C9A227]/15 text-[#C9A227] rounded-lg">
                      موضوع پرونده: {testimonials[activeTestimonial].service}
                    </span>
                    <p className={`text-xs md:text-sm leading-relaxed ${
                      theme === 'dark' ? 'text-slate-200' : 'text-slate-600'
                    }`}>
                      {testimonials[activeTestimonial].comment}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slider Controller */}
              <div className="flex items-center justify-between border-t border-slate-500/10 pt-6 mt-6">
                <div>
                  <h4 className="text-sm font-bold">{testimonials[activeTestimonial].name}</h4>
                  <span className="text-[10px] text-slate-400 block">{testimonials[activeTestimonial].role}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePrev}
                    className="p-1.5 rounded-lg border border-[#C9A227]/30 hover:bg-[#C9A227] hover:text-[#0A1628] text-[#C9A227] transition-all duration-200"
                    title="قبلی"
                    id="testimonial-prev-btn"
                  >
                    <ChevronRight size={16} />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="p-1.5 rounded-lg border border-[#C9A227]/30 hover:bg-[#C9A227] hover:text-[#0A1628] text-[#C9A227] transition-all duration-200"
                    title="بعدی"
                    id="testimonial-next-btn"
                  >
                    <ChevronLeft size={16} />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Section: Trust Badges & Seals Grid */}
        <div className="border-t border-slate-500/15 pt-12">
          <h4 className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-8">
            گواهی‌ها، نمادها و مجوزهای قانونی معتبر
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {trustBadges.map((badge, idx) => (
              <div 
                key={badge.id}
                className={`p-5 rounded-2xl border flex flex-col items-center justify-center gap-2.5 transition-colors duration-200 ${
                  theme === 'dark' ? 'bg-[#0A1628]/45 border-slate-800' : 'bg-white border-slate-100 shadow-xs'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#C9A227]/10 text-[#C9A227] flex items-center justify-center">
                  <Award size={20} />
                </div>
                <div className="text-xs font-bold text-slate-200 dark:text-slate-100">{badge.label}</div>
                <div className="text-[10px] text-slate-400 font-medium">{badge.value}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
