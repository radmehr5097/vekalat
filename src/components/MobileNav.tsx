import React, { useState } from 'react';
import { Home, Briefcase, Users, Phone, User, X, Shield, Calendar, CreditCard, Clock, FileCheck } from 'lucide-react';
import { ActiveTab } from '../types';

interface MobileNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  theme: 'dark' | 'light';
}

export default function MobileNav({ activeTab, setActiveTab, theme }: MobileNavProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'خانه', icon: <Home size={20} /> },
    { id: 'services', label: 'خدمات', icon: <Briefcase size={20} /> },
    { id: 'lawyers', label: 'وکلای ما', icon: <Users size={20} /> },
    { id: 'contact', label: 'تماس', icon: <Phone size={20} /> },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId as ActiveTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Mobile Bottom Bar (Visible only on mobile devices) */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t flex items-center justify-around py-2 px-2 shadow-2xl ${
        theme === 'dark' 
          ? 'bg-[#0A1628]/95 border-slate-800 text-slate-100' 
          : 'bg-white/95 border-slate-200 text-[#0A1628]'
      } backdrop-blur-md`}>
        
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-colors ${
                isActive 
                  ? 'text-[#C9A227] font-bold' 
                  : theme === 'dark'
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {item.icon}
              <span className="text-[9px]">{item.label}</span>
            </button>
          );
        })}

        {/* Profile Button */}
        <button
          onClick={() => setIsProfileOpen(true)}
          className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-colors ${
            isProfileOpen 
              ? 'text-[#C9A227] font-bold' 
              : theme === 'dark'
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <User size={20} />
          <span className="text-[9px]">پروفایل دمو</span>
        </button>

      </div>

      {/* 2. Professional Client Portal Dashboard Modal (پروفایل کاربری موکل) */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 text-right" id="client-dashboard-modal">
          {/* Backdrop */}
          <div 
            onClick={() => setIsProfileOpen(false)}
            className="fixed inset-0 bg-[#0A1628]/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <div className="relative w-full max-w-lg bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] border-2 border-[#C9A227] rounded-3xl p-6 text-white z-10 shadow-2xl overflow-y-auto max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#C9A227]/10 text-[#C9A227] rounded-xl border border-[#C9A227]/25">
                  <Shield size={22} />
                </div>
                <div className="text-right">
                  <h4 className="text-sm font-bold text-white">پورتال موکلین دادآرا</h4>
                  <span className="text-[10px] text-slate-400">سامانه متمرکز رهگیری آنلاین پرونده‌ها</span>
                </div>
              </div>
              <button 
                onClick={() => setIsProfileOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-full text-slate-300 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* User welcome */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5 flex items-center justify-between">
              <div className="text-right">
                <span className="block text-[10px] text-slate-400">خوش آمدید جناب آقای:</span>
                <span className="text-sm font-extrabold text-[#C9A227]">کامران رستمی (موکل نمونه)</span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                پروانه فعال
              </span>
            </div>

            {/* Active Case Section */}
            <h5 className="text-xs font-bold text-slate-300 mb-3 border-r-3 border-[#C9A227] pr-2">پرونده فعال شما</h5>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5 space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#C9A227]">الزام به تنظیم سند رسمی ملک نیاوران</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/15 border border-amber-500/30 text-amber-400">
                  در حال رسیدگی در دادگاه تجدیدنظر
                </span>
              </div>

              {/* Grid metadata */}
              <div className="grid grid-cols-2 gap-4 text-[11px] pt-2 border-t border-white/10">
                <div>
                  <span className="block text-slate-400">وکیل اصلی پرونده:</span>
                  <span className="font-bold text-white">دکتر علیرضا هاشمی</span>
                </div>
                <div>
                  <span className="block text-slate-400">شماره کلاسه پرونده:</span>
                  <span className="font-mono text-white">۱۴۰۴۹۸۰۲۴۱۸</span>
                </div>
              </div>

              {/* Next trial details */}
              <div className="p-3 bg-[#C9A227]/10 border border-[#C9A227]/25 rounded-xl flex items-center gap-3">
                <Calendar size={18} className="text-[#C9A227] flex-shrink-0" />
                <div className="text-right">
                  <span className="block text-[9px] text-slate-300">جلسه دادرسی آینده:</span>
                  <span className="text-xs font-black text-white">۱۸ مرداد ۱۴۰۵ - ساعت ۱۰:۳۰ صبح</span>
                  <span className="block text-[9px] text-[#C9A227] mt-0.5">شعبه ۱۲ دادگاه تجدیدنظر استان تهران</span>
                </div>
              </div>

              {/* Status workflow */}
              <div className="space-y-3 pt-2">
                <span className="block text-[10px] text-slate-400 font-bold">مراحل پیموده شده:</span>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <FileCheck size={14} className="text-emerald-500" />
                    <span className="line-through text-slate-500 font-medium">نگارش دادخواست و ثبت اولیه در دفتر خدمات قضایی</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <FileCheck size={14} className="text-emerald-500" />
                    <span className="line-through text-slate-500 font-medium">اخذ نظریه کارشناس رسمی دادگستری و برآورد خسارت</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Clock size={14} className="text-[#C9A227] animate-spin" />
                    <span className="font-bold">ارائه لایحه تکمیلی و دفاعیه در جلسه شعبه ۱۲ تجدیدنظر</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <h5 className="text-xs font-bold text-slate-300 mb-3 border-r-3 border-[#C9A227] pr-2">خلاصه وضعیت مالی</h5>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CreditCard size={16} className="text-[#C9A227]" />
                <span>کل حق‌الوکاله توافقی:</span>
              </div>
              <span className="font-bold text-white">پرداخت اقساط مرحله اول (تسویه شده)</span>
            </div>

            <p className="text-[10px] text-center text-slate-400 mt-5">
              این پورتال تظاهرکننده (دمو) جهت به تصویر کشیدن امکانات پنل‌های موکلین در وب‌سایت‌های طراحی شده توسط ما است.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
