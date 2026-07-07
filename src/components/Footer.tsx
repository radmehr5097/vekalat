import React from 'react';
import { Scale, Phone, Send, Info, Globe, Shield, MessageCircle } from 'lucide-react';

interface FooterProps {
  theme: 'dark' | 'light';
  setActiveTab: (tab: any) => void;
}

export default function Footer({ theme, setActiveTab }: FooterProps) {
  return (
    <footer className={`pt-16 pb-24 md:pb-12 border-t text-right transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#0A1628] border-slate-800 text-slate-300' 
        : 'bg-[#0A1628] border-slate-800 text-slate-300' // Keep dark footer as standard premium European legal layout
    }`} id="footer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-slate-800 pb-12 mb-12">
          
          {/* 1. Office Info (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#C9A227]/10 text-[#C9A227] rounded-xl border border-[#C9A227]/20">
                <Scale size={24} />
              </div>
              <span className="text-lg font-bold text-white">مؤسسه حقوقی بین‌المللی دادآرا</span>
            </div>
            
            <p className="text-xs leading-relaxed text-slate-400">
              مجموعه حقوقی دادآرا با بهره‌گیری از مجرب‌ترین وکلای کانون وکلای مرکز و اساتید طراز اول دانشگاهی، ارائه‌دهنده خدمات تخصصی وکالت در دعاوی ملکی، ثبتی، خانوادگی، کیفری و ثبت شرکت‌ها است. آرامش حقوقی شما ماموریت ماست.
            </p>

            {/* Quick trust links */}
            <div className="flex items-center gap-4 text-xs font-semibold pt-2 text-slate-400">
              <span className="flex items-center gap-1">
                <Shield size={14} className="text-[#C9A227]" />
                <span>رعایت مطلق اصل محرمانگی</span>
              </span>
              <span className="flex items-center gap-1">
                <Shield size={14} className="text-[#C9A227]" />
                <span>بررسی سریع پرونده زنده</span>
              </span>
            </div>
          </div>

          {/* 2. Services List (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-white border-r-3 border-[#C9A227] pr-2.5">دپارتمان‌های وکالت</h4>
            <div className="flex flex-col gap-2 text-xs">
              <button onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-right hover:text-[#C9A227] transition-colors">دعاوی ملکی و اسناد ثبتی</button>
              <button onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-right hover:text-[#C9A227] transition-colors">دعاوی خانواده و مهریه</button>
              <button onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-right hover:text-[#C9A227] transition-colors">جرائم کیفری و کلاهبرداری</button>
              <button onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-right hover:text-[#C9A227] transition-colors">ثبت شرکت‌ها و علائم تجاری</button>
              <button onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-right hover:text-[#C9A227] transition-colors">تنظیم قراردادهای بین‌المللی</button>
            </div>
          </div>

          {/* 3. Developer & Design Team Info (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-bold text-sm text-white border-r-3 border-[#C9A227] pr-2.5">سفارش و طراحی سایت</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              این وب‌سایت یک دمو با بالاترین استانداردهای بصری و پورتال‌های تعاملی برای وکلا است. جهت سفارش طراحی پلتفرم‌های مشابه با ما ارتباط برقرار کنید.
            </p>

            <div className="space-y-2 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">تیم طراحی:</span>
                <span className="text-white">Professional Freelance Team</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">تلفن سفارش:</span>
                <a href="tel:09138665345" className="text-[#C9A227] hover:underline">09138665345</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">کانال‌های ارتباطی:</span>
                <div className="flex items-center gap-1.5 text-white">
                  <a href="https://t.me/assreai" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A227] underline">@assreai</a>
                  <span>|</span>
                  <a href="https://t.me/tasviretoo" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A227] underline">@tasviretoo</a>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-slate-400">خدمات ما:</span>
                <span className="text-xs font-medium text-[#C9A227]">Web Design | App Design | Legal Tech | SEO</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2024 تمامی حقوق محفوظ است. طراحی و توسعه توسط تصویرتو</p>
          <div className="flex items-center gap-4">
            <a href="#" onClick={(e) => { e.preventDefault(); alert('قوانین و مقررات این دمو حقوقی فرضی است.'); }} className="hover:text-slate-400">سیاست حریم خصوصی</a>
            <span>•</span>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('این یک سایت دمو برای نمونه کار طراحی فرانت‌اند است.'); }} className="hover:text-slate-400">سلب مسئولیت دمو</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
