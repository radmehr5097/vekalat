import React from 'react';
import { motion } from 'motion/react';
import { Award, Eye, ShieldCheck, TrendingUp, Landmark, ShieldAlert, Sparkles, Check } from 'lucide-react';

interface WhyUsProps {
  theme: 'dark' | 'light';
}

export default function WhyUs({ theme }: WhyUsProps) {
  const cards = [
    {
      id: 'expertise',
      title: 'تخصص علمی و تجربی',
      description: 'همکاری منحصربه‌فرد با رتبه‌های برتر آزمون وکالت کشور، اساتید طراز اول دانشگاه تهران و وکلای فوق‌تخصص در حوزه‌های ملکی و کیفری.',
      icon: <Award className="text-[#C9A227]" size={32} />
    },
    {
      id: 'transparency',
      title: 'شفافیت مطلق مالی و کاری',
      description: 'اطلاع‌رسانی مستمر پیامکی و سیستمی به موکل در تمامی گام‌های رسیدگی پرونده به همراه شفافیت کامل در قراردادهای مالی و حق‌الوکاله.',
      icon: <Eye className="text-[#C9A227]" size={32} />
    },
    {
      id: 'commitment',
      title: 'تعهد کاری و وجدان حرفه‌ای',
      description: 'دفاع همه‌جانبه و پیگیری سرسختانه حقوق قانونی مراجعین با تعهد اخلاقی کامل به صیانت از آبرو، اسرار مکتوب و منافع اقتصادی موکل.',
      icon: <ShieldCheck className="text-[#C9A227]" size={32} />
    },
    {
      id: 'result',
      title: 'نتیجه‌گرایی و آمار درخشان',
      description: 'نرخ موفقیت شگفت‌انگیز ۹۸ درصدی در حل و فصل دعاوی پیچیده و مختومه کردن پرونده‌های راکد قدیمی با تکیه بر راه‌کارهای خلاقانه ثبتی.',
      icon: <TrendingUp className="text-[#C9A227]" size={32} />
    }
  ];

  return (
    <section className={`py-16 md:py-24 transition-colors duration-300 border-t ${
      theme === 'dark' 
        ? 'bg-[#1E3A5F]/20 border-slate-800 text-white' 
        : 'bg-[#F5F5F0]/70 border-slate-200 text-[#0A1628]'
    }`} id="why-us-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Right Column: Title and details (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-right">
            <span className="text-xs font-bold tracking-wider text-[#C9A227] uppercase bg-[#C9A227]/10 px-3 py-1 rounded-full">
              چرا دفتر وکالت دادآرا؟
            </span>
            <h2 className="text-3xl md:text-4xl font-black leading-tight">
              تفاوت ما در دانش تخصصی، صداقت و نتایج ملموس است
            </h2>
            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              انتخاب یک وکیل متعهد می‌تواند مسیر سرنوشت مالی و شخصی شما را تغییر دهد. ما در دادآرا تلاش کرده‌ایم فضایی مملو از اطمینان و ساختاری مدرن و به دور از پیچیدگی‌های رایج دادگاه‌ها فراهم کنیم.
            </p>

            {/* Quick checkmarks list */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="p-1 bg-[#C9A227]/20 text-[#C9A227] rounded-full">
                  <Check size={14} />
                </div>
                <span className="text-xs font-bold">بیش از ۱۵ سال سابقه مستمر در دادگاه‌های کیفری و حقوقی</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1 bg-[#C9A227]/20 text-[#C9A227] rounded-full">
                  <Check size={14} />
                </div>
                <span className="text-xs font-bold">بزرگ‌ترین مرجع تخصصی حل اختلافات ثبتی و ملکی</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1 bg-[#C9A227]/20 text-[#C9A227] rounded-full">
                  <Check size={14} />
                </div>
                <span className="text-xs font-bold">حضور فعال برترین دکتری‌های حقوق خصوصی کشور در هسته علمی</span>
              </div>
            </div>
          </div>

          {/* Left Column: 4-Cards Grid (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cards.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl text-right border transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-[#0A1628]/80 border-slate-800 hover:border-[#C9A227]/40'
                    : 'bg-white border-slate-200 hover:border-[#1E3A5F]/40 shadow-sm'
                }`}
              >
                <div className="p-3 bg-[#C9A227]/10 text-[#C9A227] rounded-xl inline-block mb-4">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-[#C9A227]">{card.title}</h3>
                <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
