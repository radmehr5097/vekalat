import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { Service, ActiveTab } from '../types';
import { servicesData } from '../data';

interface ServicesGridProps {
  theme: 'dark' | 'light';
  isFullPage?: boolean;
  setActiveTab: (tab: ActiveTab) => void;
  setSelectedServiceId?: string;
}

export default function ServicesGrid({ theme, isFullPage = false, setActiveTab }: ServicesGridProps) {
  const [selectedService, setSelectedService] = useState<Service>(servicesData[0]);

  // Helper to dynamically get Lucide icons
  const getIcon = (name: string) => {
    const IconComponent = (Icons as any)[name];
    return IconComponent ? <IconComponent size={28} /> : <Icons.Scale size={28} />;
  };

  const handleCardClick = (service: Service) => {
    setSelectedService(service);
    if (!isFullPage) {
      // If we are on home page, switch to services tab and select it
      setActiveTab('services');
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className={`py-16 md:py-24 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#0A1628] text-white' 
        : 'bg-[#FFFFFF] text-[#0A1628]'
    }`} id="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-wider text-[#C9A227] uppercase bg-[#C9A227]/10 px-3 py-1 rounded-full">
            خدمات و دپارتمان‌های حقوقی
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-3 mb-4">
            خدمات حقوقی با استانداردهای بین‌المللی
          </h2>
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
            ما خدمات خود را در قالب دپارتمان‌های کاملاً مجزا و تخصصی تحت نظارت مستقیم وکلای تراز اول پایه یک دادگستری ارائه می‌دهیم. برای دیدن جزئیات کار و هزینه‌ها روی هر خدمت کلیک کنید.
          </p>
        </div>

        {/* 1. If we are on HOME PAGE (Grid representation) */}
        {!isFullPage ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6, boxShadow: '0 10px 30px -10px rgba(201, 162, 39, 0.2)' }}
                onClick={() => handleCardClick(service)}
                className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 text-right flex flex-col justify-between h-64 ${
                  theme === 'dark' 
                    ? 'bg-[#1E3A5F]/40 border-slate-800 hover:border-[#C9A227]/60 text-white' 
                    : 'bg-[#F5F5F0]/60 border-slate-200 hover:border-[#1E3A5F]/60 text-[#0A1628]'
                }`}
              >
                <div>
                  {/* Icon */}
                  <div className="p-3 bg-[#C9A227]/10 text-[#C9A227] rounded-xl inline-block mb-4 transition-colors group-hover:bg-[#C9A227] group-hover:text-[#0A1628]">
                    {getIcon(service.iconName)}
                  </div>
                  {/* Title */}
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[#C9A227] transition-colors">{service.title}</h3>
                  {/* Brief description */}
                  <p className={`text-xs line-clamp-3 leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    {service.description}
                  </p>
                </div>
                {/* Arrow */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#C9A227] mt-4 self-start">
                  <span>مشاهده جزئیات کار</span>
                  <Icons.ArrowLeft size={14} className="transform group-hover:-translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          
          /* 2. If we are on FULL SERVICES PAGE (Advanced Dual-Pane layout) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Right Side: Services Tab-bar Buttons (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-2 bg-slate-500/5 p-3 rounded-2xl border border-slate-500/10">
              {servicesData.map((service) => {
                const isSelected = selectedService.id === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`w-full text-right flex items-center justify-between p-4 rounded-xl font-bold text-sm transition-all duration-300 border ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#1E3A5F] to-[#0A1628] border-[#C9A227] text-[#C9A227] shadow-md'
                        : theme === 'dark'
                          ? 'bg-[#1E3A5F]/15 border-transparent text-slate-300 hover:bg-[#1E3A5F]/35'
                          : 'bg-white border-slate-200 text-[#0A1628] hover:bg-[#F5F5F0]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${isSelected ? 'text-[#C9A227]' : 'text-slate-400'}`}>
                        {getIcon(service.iconName)}
                      </div>
                      <span>{service.title}</span>
                    </div>
                    <Icons.ChevronLeft size={16} className={`transform transition-transform ${isSelected ? 'translate-x-0' : 'opacity-40'}`} />
                  </button>
                );
              })}
            </div>

            {/* Left Side: Selected Service Detail (8 Cols) */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedService.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`border-2 rounded-3xl p-6 md:p-8 shadow-xl text-right ${
                    theme === 'dark' ? 'bg-[#1E3A5F]/20 border-slate-800' : 'bg-white border-slate-100'
                  }`}
                >
                  {/* Header Title with Big Icon */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-500/10 pb-6 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-[#C9A227]/10 text-[#C9A227] rounded-2xl border border-[#C9A227]/25">
                        {getIcon(selectedService.iconName)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-extrabold text-[#C9A227]">{selectedService.title}</h3>
                        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                          دپارتمان تخصصی حقوقی دفتر وکالت دادآرا
                        </p>
                      </div>
                    </div>
                    {/* Floating consultation badge */}
                    <button
                      onClick={() => {
                        setActiveTab('contact');
                        window.scrollTo({ top: document.getElementById('contact-section')?.offsetTop, behavior: 'smooth' });
                      }}
                      className="text-xs font-bold bg-[#C9A227] hover:bg-[#B28F1F] text-[#0A1628] px-4 py-2 rounded-xl transition-all duration-200"
                    >
                      درخواست مشاوره این خدمت
                    </button>
                  </div>

                  {/* Descriptions */}
                  <p className={`text-sm leading-relaxed mb-6 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                    {selectedService.detailedDescription}
                  </p>

                  {/* Metadata: Cost & Duration Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className={`p-4 rounded-xl border flex items-center gap-3.5 ${
                      theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-[#F5F5F0]/60 border-slate-200'
                    }`}>
                      <Icons.Clock className="text-[#C9A227]" size={20} />
                      <div className="text-right">
                        <span className="block text-[10px] text-slate-400">مدت زمان تقریبی پیگیری</span>
                        <span className="text-xs font-bold">{selectedService.duration}</span>
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-xl border flex items-center gap-3.5 ${
                      theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-[#F5F5F0]/60 border-slate-200'
                    }`}>
                      <Icons.Percent className="text-[#C9A227]" size={20} />
                      <div className="text-right">
                        <span className="block text-[10px] text-slate-400">برآورد هزینه و حق‌الوکاله</span>
                        <span className="text-xs font-bold">{selectedService.estimatedCost}</span>
                      </div>
                    </div>
                  </div>

                  {/* Steps Progress Checklist */}
                  <div className="space-y-4">
                    <h4 className="text-base font-extrabold text-[#C9A227] border-r-4 border-[#C9A227] pr-3 mb-4">
                      مراحل گام به گام کار تا موفقیت پرونده
                    </h4>
                    <div className="relative pr-6 border-r border-slate-300 dark:border-slate-800 space-y-6">
                      {selectedService.steps.map((step, idx) => (
                        <div key={idx} className="relative">
                          {/* Circle indicator */}
                          <span className="absolute -right-[31px] top-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-[#0A1628] border border-[#C9A227] text-[#C9A227] text-[10px] font-bold">
                            {idx + 1}
                          </span>
                          <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
