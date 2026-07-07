import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageSquare, X, Award, ShieldCheck } from 'lucide-react';

export default function DemoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isDismissed = sessionStorage.getItem('demo_popup_dismissed');
      if (!isDismissed) {
        setIsOpen(true);
      }
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    sessionStorage.setItem('demo_popup_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="demo-popup">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="fixed inset-0 bg-[#0A1628]/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] border-2 border-[#C9A227] rounded-2xl shadow-2xl overflow-hidden p-6 text-white z-10"
          >
            {/* Top Pattern Decoration */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C9A227]" />
            
            {/* Close Button */}
            <button 
              onClick={closePopup}
              className="absolute top-4 left-4 p-1.5 hover:bg-white/10 rounded-full text-slate-300 hover:text-white transition-colors duration-200"
              title="بستن"
              id="popup-close-btn"
            >
              <X size={20} />
            </button>

            {/* Icon Banner */}
            <div className="flex justify-center mb-4 mt-2">
              <div className="p-3 bg-[#C9A227]/15 rounded-full border border-[#C9A227]/30 text-[#C9A227]">
                <Award size={36} />
              </div>
            </div>

            {/* Header */}
            <h3 className="text-xl font-bold text-center text-[#C9A227] tracking-tight mb-2">
              «این یک نمونه طراحی است»
            </h3>
            
            {/* Body Text */}
            <p className="text-sm text-slate-200 leading-relaxed text-center mb-6 px-2">
              این وب‌سایت نمونهای کامل از قابلیت‌های طراحی حرفه‌ای، تکنولوژی پیشرفته فرانت‌اند و معماری مدرن تیم ما است. برای سفارش و راه‌اندازی سایت یا اپلیکیشن اختصاصی در حوزه وکالت و خدمات حقوقی با ما تماس بگیرید.
            </p>

            {/* Special Highlights inside Popup */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 mb-6 flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck size={16} className="text-[#C9A227] flex-shrink-0" />
                <span>طراحی ۱۰۰٪ واکنش‌گرا و متناسب با دستگاه‌های موبایل و دسکتاپ</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck size={16} className="text-[#C9A227] flex-shrink-0" />
                <span>دارای مشاور هوشمند حقوقی متصل به هوش مصنوعی زنده</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row-reverse items-center gap-3">
              <a 
                href="tel:09138665345"
                className="w-full flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#B28F1F] text-[#0A1628] font-bold py-3 px-4 rounded-xl shadow-lg transition-all duration-200"
                id="popup-phone-btn"
              >
                <Phone size={16} />
                <span>📞 تماس تلفنی: 09138665345</span>
              </a>
              <a 
                href="https://t.me/assreai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold py-3 px-4 rounded-xl transition-all duration-200"
                id="popup-telegram-btn"
              >
                <MessageSquare size={16} className="text-sky-400" />
                <span>💬 گفتگو در تلگرام</span>
              </a>
            </div>

            {/* Decorative Footnote */}
            <p className="text-[10px] text-slate-400 text-center mt-4">
              طراحی و توسعه با بالاترین استانداردهای روز اروپا توسط تصویرتو
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
