import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, Send, MessageSquare, X, Upload, CheckCircle2, User, Sparkles } from 'lucide-react';
import { Message } from '../types';

interface LegalAssistantProps {
  theme: 'dark' | 'light';
}

export default function LegalAssistant({ theme }: LegalAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial messages setup
  useEffect(() => {
    setMessages([
      {
        id: 'msg-welcome-1',
        sender: 'assistant',
        text: 'سلام! هم‌وطن گرامی، من مشاور حقوقی هوشمند دفتر وکالت دادآرا هستم. ⚖️',
        timestamp: new Date()
      },
      {
        id: 'msg-welcome-2',
        sender: 'assistant',
        text: 'در چه زمینه‌ای نیاز به راهنمایی حقوقی دارید؟ لطفاً یکی از موضوعات زیر را انتخاب نمایید یا سوال خود را در کادر پایین بنویسید.',
        timestamp: new Date()
      }
    ]);

    // Hide notification badge after 8s
    const badgeTimer = setTimeout(() => {
      setShowNotification(false);
    }, 8000);

    return () => clearTimeout(badgeTimer);
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickReplies = [
    { id: 'qr-melki', label: '🏢 دعاوی ملکی', query: 'دعاوی ملکی' },
    { id: 'qr-khanevade', label: '👥 حقوق خانواده و مهریه', query: 'حقوق خانواده و مهریه' },
    { id: 'qr-keyfari', label: '🛡️ کلاهبرداری و امور کیفری', query: 'کلاهبرداری و امور کیفری' },
    { id: 'qr-sabt', label: '🏢 ثبت شرکت و برند', query: 'ثبت شرکت و برند' },
    { id: 'qr-price', label: '💳 تعرفه و هزینه‌ها', query: 'هزینه' }
  ];

  // Send message helper
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Call server side endpoint
      const response = await fetch('/api/legal-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        id: `msg-asst-${Date.now()}`,
        sender: 'assistant',
        text: data.text,
        timestamp: new Date()
      }]);

    } catch (err) {
      console.error('API Error, using client side backup parser:', err);
      // Client-side fallback responses
      let fallbackText = '';
      const query = text.toLowerCase();
      
      if (query.includes('ملک') || query.includes('سند') || query.includes('اجاره') || query.includes('مشاع')) {
        fallbackText = 'در زمینه دعاوی ملکی و ثبتی، رعایت مواد قانونی ثبت املاک ضروری است. برای مثال، فروش سهم مشاع قانونی است اما تصرف مادی نیاز به اذن شرکا دارد. لطفاً شماره تماس خود را مرقوم بفرمایید تا وکیل ملکی دادآرا با شما تماس بگیرند.';
      } else if (query.includes('طلاق') || query.includes('مهریه') || query.includes('خانواده') || query.includes('نفقه') || query.includes('حضانت')) {
        fallbackText = 'در دعاوی خانواده، مطالبه مهریه ابتدا از اجرای ثبت اسناد آغاز می‌شود تا سرعت بالاتری در توقیف اموال داشته باشد. لطفاً شماره تلفن خود را بنویسید تا سرکار خانم مریم دادخواه با شما تماس بگیرند.';
      } else if (query.includes('کلاهبرداری') || query.includes('دزدی') || query.includes('جعل') || query.includes('کیفری')) {
        fallbackText = 'دعاوی کیفری بسیار حساس بوده و حضور وکیل کیفری در کلانتری و دادسرا حیاتی است. لطفاً برای بررسی مدارک و سوابق اتهامات، شماره تماس خود را بگذارید تا وکیل کیفری ما تا حداکثر ۲۴ ساعت آینده با شما تماس بگیرند.';
      } else if (query.includes('ثبت') || query.includes('شرکت') || query.includes('برند') || query.includes('لوگو')) {
        fallbackText = 'ثبت برند و علامت تجاری نیاز به استعلام اولیه دارد تا از مشابهت و رد اظهارنامه جلوگیری شود. دپارتمان ثبتی دادآرا برند شما را ظرف ۲۰ روز ثبت می‌کند. شماره خود را مرقوم فرمایید تا با شما تماس بگیریم.';
      } else {
        fallbackText = 'سلام و سپاس از پیام شما. کارشناسان حقوقی و وکلای پایه یک ما تا حداکثر ۲۴ ساعت آینده با شما تماس خواهند گرفت. برای بررسی دقیق‌تر، خواهشمند است شماره تماس خود را در چت بگذارید.';
      }

      setMessages(prev => [...prev, {
        id: `msg-asst-fallback-${Date.now()}`,
        sender: 'assistant',
        text: fallbackText,
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickReplyClick = (query: string) => {
    sendMessage(query);
  };

  const handleFakeUpload = () => {
    sendMessage('من تمایل به بارگذاری اسناد پرونده جهت بررسی وکیل دارم.');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 text-right" id="legal-assistant-chat">
      <AnimatePresence>
        
        {/* 1. Chat Widget Panel */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={`w-[360px] md:w-[400px] h-[550px] rounded-3xl overflow-hidden shadow-2xl border-2 flex flex-col justify-between mb-4 z-50 ${
              theme === 'dark' 
                ? 'bg-gradient-to-b from-[#0A1628] to-[#1E3A5F] border-[#C9A227]/40 text-white' 
                : 'bg-white border-slate-200 text-[#0A1628]'
            }`}
          >
            {/* Header section with Lawyer avatar */}
            <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] border-b border-[#C9A227]/30 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150" 
                    alt="مشاور" 
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#C9A227]"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0A1628]" />
                </div>
                {/* Brand text */}
                <div className="text-right">
                  <h4 className="text-xs font-bold text-[#C9A227] flex items-center gap-1">
                    <Sparkles size={12} />
                    <span>مشاور حقوقی هوشمند</span>
                  </h4>
                  <span className="text-[10px] text-slate-300">سلام! من دستیار حقوقی شما هستم</span>
                </div>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-full text-slate-300 hover:text-white transition-colors"
                title="بستن چت"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className={`flex-grow p-4 overflow-y-auto space-y-4 text-xs ${
              theme === 'dark' ? 'bg-[#0A1628]/45' : 'bg-slate-50'
            }`}>
              
              {messages.map((msg) => {
                const isAsst = msg.sender === 'assistant';
                return (
                  <div 
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${!isAsst ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Tiny Avatar */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border ${
                      isAsst 
                        ? 'bg-[#C9A227]/10 text-[#C9A227] border-[#C9A227]/30' 
                        : 'bg-white text-[#0A1628] border-slate-200'
                    }`}>
                      {isAsst ? <Scale size={14} /> : <User size={14} />}
                    </div>

                    {/* Speech Bubble */}
                    <div className={`max-w-[75%] p-3.5 rounded-2xl leading-relaxed font-medium ${
                      isAsst
                        ? theme === 'dark'
                          ? 'bg-[#1E3A5F] text-slate-100 rounded-tr-none'
                          : 'bg-white text-slate-800 rounded-tr-none shadow-xs border border-slate-100'
                        : 'bg-[#C9A227] text-[#0A1628] font-bold rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {/* Typing Animation */}
              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#C9A227]/10 text-[#C9A227] border border-[#C9A227]/30 flex items-center justify-center flex-shrink-0">
                    <Scale size={14} />
                  </div>
                  <div className={`p-3.5 rounded-2xl rounded-tr-none bg-slate-500/10 flex items-center gap-1.5`}>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies slider */}
            {messages.length <= 4 && (
              <div className={`p-2 overflow-x-auto whitespace-nowrap flex gap-1.5 border-t border-slate-500/10 ${
                theme === 'dark' ? 'bg-[#1E3A5F]/20' : 'bg-slate-100'
              }`}>
                {quickReplies.map(reply => (
                  <button
                    key={reply.id}
                    onClick={() => handleQuickReplyClick(reply.query)}
                    className="inline-block px-3 py-1.5 rounded-full text-[10px] font-bold bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0A1628] transition-colors"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form footer */}
            <div className={`p-3 border-t border-slate-500/10 flex items-center gap-2 ${
              theme === 'dark' ? 'bg-[#0A1628]' : 'bg-white'
            }`}>
              
              {/* Optional File Upload button */}
              <button 
                onClick={handleFakeUpload}
                className="p-2 bg-[#C9A227]/10 text-[#C9A227] hover:bg-[#C9A227]/20 rounded-xl transition-colors"
                title="بارگذاری مدرک پرونده"
                id="chat-upload-doc"
              >
                <Upload size={16} />
              </button>

              <form onSubmit={handleFormSubmit} className="flex-grow flex items-center gap-1.5">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="سوال حقوقی خود را بپرسید..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-500/15 focus:border-[#C9A227] outline-none text-right"
                  id="chat-input"
                />
                
                <button 
                  type="submit"
                  className="p-2.5 bg-[#C9A227] hover:bg-[#B28F1F] text-[#0A1628] rounded-xl transition-colors shadow"
                  id="chat-submit"
                >
                  <Send size={15} className="transform rotate-180" />
                </button>
              </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating Action Button Orb */}
      <div className="relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-[#0A1628] hover:bg-[#1E3A5F] text-white p-4.5 rounded-full shadow-2xl border-2 border-[#C9A227] z-50 cursor-pointer"
          id="chat-floating-trigger"
        >
          <div className="p-1 bg-[#C9A227]/10 rounded text-[#C9A227]">
            <Scale size={24} />
          </div>
          <span className="hidden sm:inline text-xs font-bold text-[#C9A227] ml-1">مشاور حقوقی هوشمند</span>
        </motion.button>

        {/* Notification badge */}
        {showNotification && !isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-3 -left-3 bg-red-600 text-white font-bold text-[9px] rounded-full px-2 py-0.5 border border-white flex items-center justify-center animate-bounce shadow-md"
          >
            ۱ پیام زنده
          </motion.div>
        )}
      </div>

    </div>
  );
}
