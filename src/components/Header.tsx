import React, { useState } from 'react';
import { Scale, Sun, Moon, Menu, X, PhoneCall } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export default function Header({ activeTab, setActiveTab, theme, toggleTheme }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'خانه' },
    { id: 'services', label: 'خدمات حقوقی' },
    { id: 'lawyers', label: 'وکلای ما' },
    { id: 'articles', label: 'مقالات علمی' },
    { id: 'contact', label: 'تماس با ما' }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId as ActiveTab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-[#0A1628]/85 text-slate-100 border-b border-slate-800' 
        : 'bg-white/85 text-[#0A1628] border-b border-slate-200'
    } backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Right Section: Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')} id="header-logo-brand">
            <div className="p-2.5 bg-[#C9A227]/10 text-[#C9A227] rounded-xl border border-[#C9A227]/30">
              <Scale size={26} />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-lg font-bold tracking-tight">دفتر وکالت دادآرا</span>
              <span className="text-[10px] text-[#C9A227] font-medium tracking-wider">مؤسسه حقوقی بین‌المللی</span>
            </div>
          </div>

          {/* Middle Section: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative ${
                    isActive 
                      ? 'text-[#C9A227]' 
                      : theme === 'dark' 
                        ? 'text-slate-300 hover:text-white hover:bg-white/5' 
                        : 'text-[#0A1628]/85 hover:text-[#0A1628] hover:bg-[#0A1628]/5'
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#C9A227] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Left Section: Theme switch, Consultation, and Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition-all duration-300 ${
                theme === 'dark' 
                  ? 'border-slate-800 hover:bg-slate-800 text-amber-400' 
                  : 'border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
              title={theme === 'dark' ? 'حالت روز' : 'حالت شب'}
              id="theme-toggle-btn"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Consultation Button (Desktop only) */}
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden lg:flex items-center gap-2 bg-[#C9A227] hover:bg-[#B28F1F] text-[#0A1628] px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all duration-200 transform active:scale-95"
              id="header-consult-btn"
            >
              <PhoneCall size={16} />
              <span>مشاوره رایگان</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-xl border transition-colors ${
                theme === 'dark' 
                  ? 'border-slate-800 text-slate-300' 
                  : 'border-slate-200 text-[#0A1628]'
              }`}
              title="منو"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden animate-fade-in border-t ${
          theme === 'dark' ? 'bg-[#0A1628] border-slate-800' : 'bg-white border-slate-200'
        }`} id="mobile-drawer">
          <div className="px-4 pt-2 pb-6 space-y-1.5 shadow-xl">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-right px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-[#C9A227]/10 text-[#C9A227] font-bold' 
                      : theme === 'dark'
                        ? 'text-slate-300 hover:bg-slate-850 hover:text-white'
                        : 'text-[#0A1628]/85 hover:bg-slate-100 hover:text-[#0A1628]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full mt-4 flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#B28F1F] text-[#0A1628] py-3.5 rounded-xl text-sm font-bold shadow-md"
            >
              <PhoneCall size={16} />
              <span>درخواست مشاوره رایگان</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
