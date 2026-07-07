import React, { useState } from 'react';
import { Phone, MessageSquare, X } from 'lucide-react';

export default function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div id="demo-banner" className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] border-b border-[#C9A227]/30 text-white py-3 px-4 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-right">
        
        {/* Texts */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-[#C9A227] text-[#0A1628] rounded">نمونه طراحی دمو</span>
          <p className="text-sm font-medium text-white">
            «این یک نمونه طراحی دمو سایت و اپلیکیشن وکالت و خدمات حقوقی است»
          </p>
          <span className="hidden md:inline text-white/50">|</span>
          <p className="text-xs text-slate-300">
            «برای سفارش این سبک سایت و اپلیکیشن با ما تماس بگیرید»
          </p>
        </div>

        {/* Buttons and Close */}
        <div className="flex items-center gap-3">
          <a 
            href="tel:09138665345" 
            className="flex items-center gap-1 text-xs font-semibold bg-[#C9A227] hover:bg-[#B28F1F] text-[#0A1628] px-3.5 py-1.5 rounded transition-all duration-200"
            id="banner-phone-btn"
          >
            <Phone size={14} />
            <span>تماس: 09138665345</span>
          </a>
          <a 
            href="https://t.me/assreai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded border border-white/20 transition-all duration-200"
            id="banner-telegram-btn"
          >
            <MessageSquare size={14} className="text-sky-400" />
            <span>تلگرام: @assreai</span>
          </a>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-white/10 rounded-full text-slate-300 hover:text-white transition-colors duration-200 mr-2"
            title="بستن"
            id="banner-close-btn"
          >
            <X size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
