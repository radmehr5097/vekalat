import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Clock, MessageCircle, FileDown, ShieldCheck, Upload, Check, Video, Calendar, Bell } from 'lucide-react';

interface ContactFormProps {
  theme: 'dark' | 'light';
}

export default function ContactForm({ theme }: ContactFormProps) {
  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'ملکی',
    consultType: 'telephone', // telephone | video | in-person
    message: '',
    agreeGdpr: false
  });
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // File Upload Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.agreeGdpr) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitSuccess(true);
    }, 1500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterSuccess(false);
      setNewsletterEmail('');
    }, 3000);
  };

  return (
    <section className={`py-16 md:py-24 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#0A1628] text-white' 
        : 'bg-[#F5F5F0]/75 text-[#0A1628]'
    }`} id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-wider text-[#C9A227] uppercase bg-[#C9A227]/10 px-3 py-1 rounded-full">
            ارتباط مستقیم و نوبت‌دهی فوری
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-3 mb-4">
            درخواست مشاوره رایگان و بررسی پرونده
          </h2>
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
            شما می‌توانید مدارک مرتبط با پرونده خود را بارگذاری نموده و نوع مشاوره دلخواه (تلفنی، حضوری یا ویدیویی زنده) را انتخاب نمایید تا هماهنگی دقیق انجام پذیرد.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Right Column: Contact & Booking Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className={`p-6 md:p-8 rounded-3xl border-2 transition-all duration-300 text-right ${
              theme === 'dark' ? 'bg-[#1E3A5F]/20 border-slate-800' : 'bg-white border-slate-100 shadow-md'
            }`}>
              
              {!isSubmitSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-lg font-bold text-[#C9A227] border-r-4 border-[#C9A227] pr-3 mb-6">
                    فرم رزرو مشاوره حقوقی تخصصی
                  </h3>

                  {/* Name & Phone Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold mb-1.5 text-slate-400">نام و نام خانوادگی:</label>
                      <input 
                        type="text" 
                        required
                        placeholder="مثال: علی رضایی"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl text-xs bg-[#0A1628]/10 border border-slate-500/20 focus:border-[#C9A227] outline-none text-right transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1.5 text-slate-400">تلفن همراه (موبایل):</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="مثال: 09123456789"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl text-xs bg-[#0A1628]/10 border border-slate-500/20 focus:border-[#C9A227] outline-none text-right transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email & Subject Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold mb-1.5 text-slate-400">آدرس ایمیل (اختیاری):</label>
                      <input 
                        type="email" 
                        placeholder="مثال: example@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl text-xs bg-[#0A1628]/10 border border-slate-500/20 focus:border-[#C9A227] outline-none text-right transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1.5 text-slate-400">موضوع دعاوی / پرونده:</label>
                      <select 
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl text-xs bg-[#0A1628]/10 border border-slate-500/20 focus:border-[#C9A227] outline-none text-right text-slate-300 transition-colors"
                      >
                        <option value="ملکی" className="bg-[#0A1628] text-white">دعاوی ملکی و ثبتی</option>
                        <option value="خانواده" className="bg-[#0A1628] text-white">دعاوی خانواده و انحصار وراثت</option>
                        <option value="کیفری" className="bg-[#0A1628] text-white">امور کیفری و جرائم مالی</option>
                        <option value="شرکت" className="bg-[#0A1628] text-white">ثبت شرکت، برند و لوگو</option>
                        <option value="قرارداد" className="bg-[#0A1628] text-white">تنظیم قرارداد تجاری</option>
                      </select>
                    </div>
                  </div>

                  {/* Consultation Type Radio buttons */}
                  <div>
                    <label className="block text-xs font-bold mb-2 text-slate-400">شیوه برگزاری مشاوره دلخواه:</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'telephone', label: 'تلفنی فوری', icon: <Phone size={14} /> },
                        { id: 'video', label: 'ویدیویی زنده', icon: <Video size={14} /> },
                        { id: 'in-person', label: 'مراجعه حضوری', icon: <Calendar size={14} /> }
                      ].map(type => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({...formData, consultType: type.id})}
                          className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3.5 px-2.5 rounded-xl border-2 text-xs font-bold transition-all duration-200 ${
                            formData.consultType === type.id
                              ? 'bg-[#C9A227]/10 border-[#C9A227] text-[#C9A227]'
                              : 'border-slate-500/10 hover:border-slate-500/30'
                          }`}
                        >
                          {type.icon}
                          <span>{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold mb-1.5 text-slate-400">خلاصه شرح پرونده و سوال شما:</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="لطفاً شرح مختصری از ادعا، توافقات یا پرونده مطرح‌شده خود را بنویسید..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl text-xs bg-[#0A1628]/10 border border-slate-500/20 focus:border-[#C9A227] outline-none text-right transition-colors resize-none"
                    />
                  </div>

                  {/* Document Upload Zone */}
                  <div>
                    <label className="block text-xs font-bold mb-1.5 text-slate-400">بارگذاری مدارک و مستندات مرتبط (اختیاری):</label>
                    <div 
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed border-slate-500/30 rounded-2xl p-6 text-center cursor-pointer hover:border-[#C9A227] transition-colors relative`}
                    >
                      <input 
                        type="file" 
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                      />
                      
                      <div className="flex flex-col items-center gap-2">
                        <div className="p-3 bg-[#C9A227]/10 text-[#C9A227] rounded-full">
                          <Upload size={22} />
                        </div>
                        <p className="text-xs font-bold">برای بارگذاری، فایل را اینجا بکشید یا کلیک کنید</p>
                        <p className="text-[10px] text-slate-400">فرمت‌های مجاز: PDF, JPG, PNG (حداکثر ۱۰ مگابایت)</p>
                      </div>

                      {uploadedFile && (
                        <div className="mt-4 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between px-4">
                          <span className="text-xs text-emerald-400 font-bold line-clamp-1">{uploadedFile.name}</span>
                          <span className="text-[10px] text-slate-400">({(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* GDPR Notice */}
                  <div className="flex items-start gap-2.5 pt-2">
                    <input 
                      type="checkbox" 
                      required
                      id="gdpr-agree"
                      checked={formData.agreeGdpr}
                      onChange={(e) => setFormData({...formData, agreeGdpr: e.target.checked})}
                      className="w-4 h-4 rounded border-slate-500/30 text-[#C9A227] focus:ring-[#C9A227] mt-0.5 accent-[#C9A227]"
                    />
                    <label htmlFor="gdpr-agree" className="text-[10px] leading-relaxed text-slate-400 cursor-pointer">
                      <strong className="text-[#C9A227]">اطلاعیه رعایت حریم خصوصی (GDPR):</strong> با ارسال این فرم موافقت می‌کنم که اطلاعات هویتی و اسناد ارسالی من صرفاً جهت بررسی حقوقی این پرونده به صورت فوق‌محرمانه در دپارتمان دادآرا آرشیو گردد و هرگز به اشخاص ثالث ارائه نخواهد شد.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#B28F1F] text-[#0A1628] font-black py-4 rounded-xl shadow-lg transition-colors duration-200"
                    id="contact-submit-btn"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-[#0A1628] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <ShieldCheck size={18} />
                        <span>ارسال نهایی درخواست و رزرو نوبت</span>
                      </>
                    )}
                  </button>

                </form>
              ) : (
                <div className="text-center py-12 space-y-6 animate-fade-in">
                  <div className="mx-auto w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30 flex items-center justify-center">
                    <Check size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-100 dark:text-[#C9A227]">درخواست شما با موفقیت ثبت گردید</h3>
                  <p className="text-sm text-slate-300 leading-relaxed px-6">
                    کارفرمای گرامی، از اعتماد شما کمال قدردانی را داریم. اطلاعات پرونده حقوقی شما با موفقیت در دپارتمان {formData.subject} ثبت شد. کارشناسان پذیرش و وکلای پایه یک مربوطه، مدارک بارگذاری‌شده را بررسی نموده و حداکثر تا ۲ ساعت کاری جهت هماهنگی جلسه با شما تماس خواهند گرفت.
                  </p>
                  <button 
                    onClick={() => {
                      setIsSubmitSuccess(false);
                      setUploadedFile(null);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'ملکی',
                        consultType: 'telephone',
                        message: '',
                        agreeGdpr: false
                      });
                    }}
                    className="bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-xl text-xs font-bold border border-white/10"
                  >
                    ثبت درخواست مشاوره جدید
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* Left Column: Office Details, Guides, and Newsletter (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 text-right">
            
            {/* Quick Contacts Box */}
            <div className={`p-6 rounded-3xl border transition-all duration-300 ${
              theme === 'dark' ? 'bg-[#1E3A5F]/15 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <h3 className="text-lg font-bold text-[#C9A227] border-r-4 border-[#C9A227] pr-3 mb-6">
                اطلاعات دفتر مرکزی دادآرا
              </h3>
              
              <div className="space-y-5">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#C9A227]/10 text-[#C9A227] rounded-xl flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold">تلفن‌های تماس مستقیم:</span>
                    <a href="tel:09138665345" className="text-sm font-bold tracking-wider hover:text-[#C9A227]">09138665345</a>
                    <span className="block text-[11px] text-slate-500 font-medium mt-0.5">پذیرش و هماهنگی مراجعین: روزهای کاری ۹ صبح تا ۶ عصر</span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#C9A227]/10 text-[#C9A227] rounded-xl flex-shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold">ساعات پذیرش حضوری:</span>
                    <span className="text-sm font-bold">شنبه تا پنجشنبه ۹ صبح تا ۶ عصر</span>
                    <span className="block text-[11px] text-slate-500 font-medium mt-0.5">پنجشنبه‌ها دفتر مرکزی تا ساعت ۲ بعد از ظهر دایر می‌باشد.</span>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#C9A227]/10 text-[#C9A227] rounded-xl flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold">نشانی دفتر مرکزی:</span>
                    <span className="text-xs font-bold leading-relaxed">تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج نگار، طبقه ۱۵، واحد ۴</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp business link */}
              <div className="border-t border-slate-500/10 pt-6 mt-6">
                <a 
                  href="https://wa.me/989138665345"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors shadow-md"
                  id="whatsapp-direct-btn"
                >
                  <MessageCircle size={18} />
                  <span>💬 ارتباط آنلاین در واتساپ پشتیبانی</span>
                </a>
              </div>
            </div>

            {/* Free PDF Guide Download Box */}
            <div className={`p-6 rounded-3xl border-2 border-dashed border-[#C9A227]/40 transition-all duration-300 ${
              theme === 'dark' ? 'bg-[#1E3A5F]/10' : 'bg-white shadow-xs'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#C9A227]/15 text-[#C9A227] rounded-xl">
                  <FileDown size={20} />
                </div>
                <h4 className="font-bold text-sm">دانلود رایگان راهنماهای حقوقی</h4>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                دفتر وکالت دادآرا اقدام به تالیف کتابچه‌های راهنمای کاربردی برای مراجعین در حوزه قوانین خرید ملک و مطالبه مهریه نموده است.
              </p>
              
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); alert('دانلود کتابچه راهنمای حقوق ملکی به زودی فعال خواهد شد.'); }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-500/5 hover:bg-slate-500/10 text-xs font-bold transition-colors"
              >
                <span className="text-slate-200 dark:text-slate-100">کتابچه راهنمای پیشگیری از جرائم ملکی</span>
                <span className="text-[#C9A227] flex items-center gap-1">
                  <span>دانلود PDF</span>
                  <FileDown size={14} />
                </span>
              </a>
            </div>

            {/* Newsletter sign-up: "اخبار حقوقی" */}
            <div className={`p-6 rounded-3xl border transition-all duration-300 ${
              theme === 'dark' ? 'bg-[#1E3A5F]/15 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#C9A227]/15 text-[#C9A227] rounded-xl">
                  <Bell size={18} />
                </div>
                <h4 className="font-bold text-sm text-[#C9A227]">خبرنامه حقوقی و قوانین مصوب</h4>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                با عضویت در خبرنامه تخصصی دادآرا، آخرین بخشنامه‌ها و تغییرات قوانین خانواده، چک و مالیات را مستقیماً در ایمیل خود دریافت کنید.
              </p>

              {!newsletterSuccess ? (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input 
                    type="email" 
                    required
                    placeholder="آدرس ایمیل شما"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-[#0A1628]/10 border border-slate-500/20 focus:border-[#C9A227] outline-none text-right transition-colors"
                  />
                  <button 
                    type="submit"
                    className="bg-[#C9A227] hover:bg-[#B28F1F] text-[#0A1628] font-bold px-4 py-2 rounded-xl text-xs flex-shrink-0 transition-colors"
                  >
                    عضویت
                  </button>
                </form>
              ) : (
                <div className="text-xs font-bold text-emerald-500 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 text-center animate-fade-in">
                  ✓ عضویت شما با موفقیت ثبت شد! سپاسگزاریم.
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
