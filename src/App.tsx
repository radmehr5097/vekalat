import React, { useState, useEffect } from 'react';
import DemoBanner from './components/DemoBanner';
import DemoPopup from './components/DemoPopup';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import WhyUs from './components/WhyUs';
import LawyersList from './components/LawyersList';
import SuccessTracker from './components/SuccessTracker';
import ArticlesSection from './components/ArticlesSection';
import ContactForm from './components/ContactForm';
import LegalAssistant from './components/LegalAssistant';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import { ActiveTab } from './types';

export default function App() {
  // Theme State (Default to Dark Mode per Justice Horizon aesthetic)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('dadara_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  // Navigation state manager
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // Sync theme with HTML DOM classes and background style
  useEffect(() => {
    const htmlElement = window.document.documentElement;
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      htmlElement.style.backgroundColor = '#0A1628';
    } else {
      htmlElement.classList.remove('dark');
      htmlElement.style.backgroundColor = '#F5F5F0';
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('dadara_theme', nextTheme);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-500 overflow-x-hidden ${
      theme === 'dark' 
        ? 'bg-[#0A1628] text-slate-100' 
        : 'bg-[#F5F5F0] text-[#0A1628]'
    }`}>
      
      {/* 1. Sticky Demo Banner */}
      <DemoBanner />

      {/* 2. Top Glassmorphism Navigation Bar */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />

      {/* 3. Main Content Wrapper */}
      <main className="flex-grow">
        
        {/* Render Tab Views */}
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            {/* Landing Hero */}
            <Hero theme={theme} setActiveTab={setActiveTab} />
            
            {/* Quick trust columns */}
            <WhyUs theme={theme} />

            {/* Quick grid of legal expertise cards */}
            <ServicesGrid theme={theme} isFullPage={false} setActiveTab={setActiveTab} />
            
            {/* Success rates and testimonial slides */}
            <SuccessTracker theme={theme} />
            
            {/* Our lawyers lineup overview */}
            <LawyersList theme={theme} isFullPage={false} />
            
            {/* Editorial resources and guides preview */}
            <ArticlesSection theme={theme} isFullPage={false} />
            
            {/* Interactive bookings & uploads form */}
            <ContactForm theme={theme} />
          </div>
        )}

        {activeTab === 'services' && (
          <div className="animate-fade-in">
            {/* Full interactive Service Catalog Page */}
            <ServicesGrid theme={theme} isFullPage={true} setActiveTab={setActiveTab} />
          </div>
        )}

        {activeTab === 'lawyers' && (
          <div className="animate-fade-in">
            {/* Full Lawyers Bio & Bookings Page */}
            <LawyersList theme={theme} isFullPage={true} />
          </div>
        )}

        {activeTab === 'articles' && (
          <div className="animate-fade-in">
            {/* Knowledge base research library */}
            <ArticlesSection theme={theme} isFullPage={true} />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="animate-fade-in">
            {/* Main communication and consultation form */}
            <ContactForm theme={theme} />
          </div>
        )}

      </main>

      {/* 4. Common Solid Footer */}
      <Footer theme={theme} setActiveTab={setActiveTab} />

      {/* 5. Mobile Persistant Menu & Client Portal Panel */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} />

      {/* 6. AI Smart Legal Floating Assistant */}
      <LegalAssistant theme={theme} />

      {/* 7. Auto-triggered Marketing Popup (10 Seconds) */}
      <DemoPopup />

    </div>
  );
}
