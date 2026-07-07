import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Award, ShieldCheck, Mail, Calendar, Check, X, Phone } from 'lucide-react';
import { Lawyer } from '../types';
import { lawyersData } from '../data';

interface LawyersListProps {
  theme: 'dark' | 'light';
  isFullPage?: boolean;
}

export default function LawyersList({ theme, isFullPage = false }: LawyersListProps) {
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSelectLawyer = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    setBookingSuccess(false);
    setPhoneNumber('');
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setBookingSuccess(true);
  };

  return (
    <section className={`py-16 md:py-24 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#0A1628] text-white' 
        : 'bg-[#FFFFFF] text-[#0A1628]'
    }`} id="lawyers-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-wider text-[#C9A227] uppercase bg-[#C9A227]/10 px-3 py-1 rounded-full">
            شخصیت‌های علمی و کادر وکالت
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-3 mb-4">
            معرفی وکلای پایه یک و ارشد دادآرا
          </h2>
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
            وکلای ما علاوه بر سوابق درخشان عملی در دفاع از پرونده‌های کلان، از اساتید صاحب اثر و پژوهشگران تراز اول دانشگاه‌های برتر تهران در رشته‌های حقوق هستند.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {lawyersData.map((lawyer, index) => (
            <motion.div
              key={lawyer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative rounded-3xl overflow-hidden border-2 flex flex-col justify-between transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-[#1E3A5F]/20 border-slate-800'
                  : 'bg-slate-50/50 border-slate-200 shadow-sm'
              }`}
            >
              
              {/* Photo and Hover Overlay Container */}
              <div className="relative overflow-hidden aspect-square">
                <img 
                  src={lawyer.imageUrl} 
                  alt={lawyer.name} 
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Gold Overlay on Hover */}
                <div className="absolute inset-0 bg-[#0A1628]/95 p-6 opacity-0 group-hover:opacity-100 flex flex-col justify-between transition-all duration-300 text-right text-white z-10">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#C9A227] tracking-widest block mb-1">
                      درباره وکیل
                    </span>
                    <h4 className="text-lg font-black text-[#C9A227] mb-2">{lawyer.name}</h4>
                    <p className="text-xs text-slate-200 line-clamp-6 leading-relaxed">
                      {lawyer.bio}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1 text-amber-400 self-start text-xs font-bold">
                    <Star size={14} fill="currentColor" />
                    <span>{lawyer.rating}</span>
                    <span className="text-slate-400 font-medium mr-1">({lawyer.reviewsCount} نظر)</span>
                  </div>
                </div>

                {/* Rating Badge at Corner */}
                <div className="absolute top-3 right-3 bg-[#0A1628]/80 text-white border border-[#C9A227]/30 px-2.5 py-1 rounded-xl flex items-center gap-1 text-xs font-bold z-5">
                  <Star size={12} className="text-amber-400" fill="currentColor" />
                  <span>{lawyer.rating}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 text-right flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold group-hover:text-[#C9A227] transition-colors">{lawyer.name}</h3>
                  <p className="text-xs font-medium text-[#C9A227] mt-1 mb-2">{lawyer.title}</p>
                  <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-500/10 text-slate-400">
                    {lawyer.specialty}
                  </span>
                </div>

                <div className="border-t border-slate-500/10 pt-4 mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-400">سابقه وکالت:</span>
                  <span className="text-xs font-black text-[#C9A227]">{lawyer.experienceYears} سال سابقه</span>
                </div>
              </div>

              {/* Full Roster Details (Only shown in full page mode) */}
              {isFullPage && (
                <div className={`p-5 pt-0 border-t border-slate-500/10 text-right ${theme === 'dark' ? 'bg-[#0A1628]' : 'bg-slate-50'}`}>
                  {/* Academic Credentials list */}
                  <div className="space-y-1.5 py-4">
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">تحصیلات و افتخارات علمی:</span>
                    {lawyer.education.map((edu, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <Check size={14} className="text-[#C9A227] mt-0.5 flex-shrink-0" />
                        <span className="text-slate-400 line-clamp-1">{edu}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleSelectLawyer(lawyer)}
                    className="w-full bg-[#C9A227] hover:bg-[#B28F1F] text-[#0A1628] font-bold py-2.5 rounded-xl text-xs transition-colors duration-200 shadow"
                    id={`select-lawyer-${lawyer.id}`}
                  >
                    انتخاب وکیل و رزرو نوبت
                  </button>
                </div>
              )}

            </motion.div>
          ))}
        </div>

        {/* Interactive Booking Modal */}
        <AnimatePresence>
          {selectedLawyer && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="booking-modal">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedLawyer(null)}
                className="fixed inset-0 bg-[#0A1628]/80 backdrop-blur-sm"
              />

              {/* Modal Body */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className={`relative w-full max-w-md border-2 border-[#C9A227] rounded-3xl p-6 text-white z-10 overflow-hidden bg-gradient-to-br from-[#0A1628] to-[#1E3A5F]`}
              >
                {/* Close */}
                <button 
                  onClick={() => setSelectedLawyer(null)}
                  className="absolute top-4 left-4 p-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>

                {!bookingSuccess ? (
                  <form onSubmit={handleConfirmBooking} className="space-y-4 text-right">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-2">
                      <img src={selectedLawyer.imageUrl} alt={selectedLawyer.name} className="w-12 h-12 rounded-full object-cover border border-[#C9A227]" />
                      <div className="text-right">
                        <h4 className="font-bold text-[#C9A227]">{selectedLawyer.name}</h4>
                        <p className="text-xs text-slate-300">{selectedLawyer.title}</p>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-center text-slate-100">درخواست نوبت مشاوره فوری</h3>
                    <p className="text-xs text-slate-300 text-center leading-relaxed">
                      لطفاً شماره تماس خود را وارد نمایید. پس از ثبت نوبت، دستیار اختصاصی {selectedLawyer.name} تا حداکثر ۲ ساعت کاری جهت هماهنگی با شما تماس خواهد گرفت.
                    </p>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">شماره تلفن همراه:</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="مثال: 09123456789"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0A1628] border border-white/10 focus:border-[#C9A227] text-white text-center text-sm font-semibold tracking-wider outline-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#C9A227] hover:bg-[#B28F1F] text-[#0A1628] font-bold py-3 rounded-xl text-sm shadow transition-colors"
                    >
                      تایید و ثبت نوبت مشاوره
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-6 space-y-4">
                    <div className="mx-auto w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30 flex items-center justify-center">
                      <Check size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-100">درخواست شما با موفقیت ثبت شد</h3>
                    <p className="text-xs text-slate-300 leading-relaxed px-4">
                      از اعتماد شما سپاسگزاریم. نوبت اولیه مشاوره با <strong>{selectedLawyer.name}</strong> رزرو شد. هماهنگی نهایی ظرف ۲ ساعت کاری آینده از طریق شماره {phoneNumber} صورت می‌گیرد.
                    </p>
                    <button 
                      onClick={() => setSelectedLawyer(null)}
                      className="bg-white/10 hover:bg-white/15 text-white px-5 py-2 rounded-xl text-xs font-bold border border-white/10"
                    >
                      بستن پنجره
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
