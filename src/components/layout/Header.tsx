'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, Globe, Train, Sparkles, ChevronDown, Music } from 'lucide-react';
import { soundFx } from '@/lib/audio';
import { Button } from '@/components/ui/Button';
import { Language, TRANSLATIONS } from '@/lib/translations';
import { Currency } from '@/lib/utils';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  currentCurrency,
  onCurrencyChange,
  onOpenBooking,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const t = TRANSLATIONS[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen to music state changes
  useEffect(() => {
    const unsubscribe = soundFx.subscribeMusicState((playing) => {
      setIsMusicPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  // Start travel background music on first interaction (if permitted)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!soundFx.getMusicPlaying()) {
        soundFx.startTravelMusic();
      }
      window.removeEventListener('click', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction, { once: true });
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, []);

  const toggleMusic = () => {
    soundFx.toggleMusic();
  };

  const navItems = [
    { label: t.nav.home, href: '#' },
    { label: t.nav.bookTickets, href: '#booking-section', onClick: onOpenBooking },
    { label: t.nav.routes, href: '#routes' },
    { label: t.nav.trainServices, href: '#train-types' },
    { label: t.nav.destinations, href: '#destinations' },
    { label: t.nav.aboutUs, href: '#why-us' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'EN', label: 'English', flag: '🇬🇧' },
    { code: 'VI', label: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'JP', label: '日本語', flag: '🇯🇵' },
  ];

  const currencies: { code: Currency; symbol: string; label: string }[] = [
    { code: 'VND', symbol: '₫', label: 'VND (₫)' },
    { code: 'USD', symbol: '$', label: 'USD ($)' },
    { code: 'EUR', symbol: '€', label: 'EUR (€)' },
    { code: 'JPY', symbol: '¥', label: 'JPY (¥)' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0B0F14]/85 backdrop-blur-xl border-b border-[#C9A96E]/20 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'bg-gradient-to-b from-[#070A0E]/80 via-[#070A0E]/30 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group cursor-pointer"
            onClick={() => soundFx.playClick(900, 0.04)}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D8B978] via-[#C9A96E] to-[#8C6E38] p-0.5 shadow-[0_0_15px_rgba(201,169,110,0.4)] group-hover:shadow-[0_0_25px_rgba(201,169,110,0.7)] transition-shadow duration-300">
              <div className="w-full h-full bg-[#0B0F14] rounded-[10px] flex items-center justify-center">
                <Train className="w-5 h-5 text-[#D8B978] transform group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-serif font-black tracking-widest text-[#F8FAFC] group-hover:text-[#D8B978] transition-colors">
                RAILWAY
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#C9A96E]/80 font-mono -mt-1 uppercase">
                Premier Express
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                  soundFx.playClick(750, 0.03);
                }}
                className="relative px-3 py-1.5 text-xs xl:text-sm font-medium tracking-wide text-slate-300 hover:text-[#F8FAFC] transition-colors duration-200 group"
              >
                <span>{item.label}</span>
                {/* Animated Gold Underline */}
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center space-x-3">
            {/* 🎵 Travel Background Music Toggle Button with Dancing Equalizer */}
            <button
              onClick={toggleMusic}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-300 ${
                isMusicPlaying
                  ? 'bg-[#C9A96E]/20 border-[#C9A96E] text-[#D8B978] shadow-[0_0_15px_rgba(201,169,110,0.4)]'
                  : 'bg-white/5 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
              title={isMusicPlaying ? 'Tắt nhạc du lịch / Mute Travel Music' : 'Bật nhạc du lịch thư giãn / Play Travel Music'}
              aria-label="Travel Music Toggle"
            >
              <Music className={`w-3.5 h-3.5 ${isMusicPlaying ? 'animate-bounce text-[#D8B978]' : 'text-slate-400'}`} />
              
              {/* Dancing Equalizer Bars */}
              <div className="flex items-end gap-0.5 h-3.5">
                {[0.4, 0.9, 0.6, 1].map((h, i) => (
                  <div
                    key={i}
                    className={`w-0.5 rounded-full bg-[#D8B978] transition-all duration-200 ${
                      isMusicPlaying ? 'animate-pulse' : 'opacity-30'
                    }`}
                    style={{
                      height: `${isMusicPlaying ? h * 14 : 3}px`,
                      animationDelay: `${i * 150}ms`,
                    }}
                  />
                ))}
              </div>

              <span className="text-[11px] font-mono font-bold tracking-wider">
                {isMusicPlaying ? 'Travel Harmony' : 'Nhạc Du Lịch'}
              </span>
            </button>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCurrencyDropdown(!showCurrencyDropdown);
                  setShowLangDropdown(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/5 border border-slate-700/60 text-slate-300 hover:border-[#C9A96E]/50 transition-colors"
              >
                <span>{currentCurrency}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              <AnimatePresence>
                {showCurrencyDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-32 bg-[#111827] border border-[#C9A96E]/30 rounded-xl shadow-2xl p-1 z-50 overflow-hidden"
                  >
                    {currencies.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          onCurrencyChange(c.code);
                          setShowCurrencyDropdown(false);
                          soundFx.playClick();
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between transition-colors ${
                          currentCurrency === c.code
                            ? 'bg-[#C9A96E]/20 text-[#D8B978] font-bold'
                            : 'text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        <span>{c.code}</span>
                        <span className="text-slate-400 font-mono">{c.symbol}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowLangDropdown(!showLangDropdown);
                  setShowCurrencyDropdown(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/5 border border-slate-700/60 text-slate-300 hover:border-[#C9A96E]/50 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-[#D8B978]" />
                <span>{currentLang}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              <AnimatePresence>
                {showLangDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-36 bg-[#111827] border border-[#C9A96E]/30 rounded-xl shadow-2xl p-1 z-50 overflow-hidden"
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          onLanguageChange(l.code);
                          setShowLangDropdown(false);
                          soundFx.playClick();
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center gap-2 transition-colors ${
                          currentLang === l.code
                            ? 'bg-[#C9A96E]/20 text-[#D8B978] font-bold'
                            : 'text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Book Now Button */}
            <Button
              size="sm"
              variant="primary"
              onClick={onOpenBooking}
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#0B0F14]" />}
            >
              {t.nav.bookNow}
            </Button>
          </div>

          {/* Mobile Action Controls */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleMusic}
              className="p-2 text-slate-300 hover:text-white"
              aria-label="Travel Music Toggle"
            >
              {isMusicPlaying ? <Volume2 className="w-5 h-5 text-[#D8B978] animate-pulse" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-lg bg-white/5 border border-slate-700/60 text-slate-200 hover:text-white"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Slide-over Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex justify-end md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#070A0E]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="relative z-50 w-4/5 max-w-sm h-full bg-[#0B0F14] border-l border-[#C9A96E]/30 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
            >
              {/* Drawer Header */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Train className="w-6 h-6 text-[#D8B978]" />
                    <span className="font-serif font-bold text-xl text-white tracking-widest">
                      RAILWAY
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Navigation List */}
                <div className="flex flex-col space-y-3 mt-6">
                  {navItems.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={(e) => {
                        if (item.onClick) {
                          e.preventDefault();
                          item.onClick();
                        }
                        setIsMobileMenuOpen(false);
                        soundFx.playClick();
                      }}
                      className="text-base font-medium text-slate-300 hover:text-[#D8B978] py-2 border-b border-slate-800/60 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Drawer Bottom Controls */}
              <div className="pt-6 border-t border-slate-800 space-y-4">
                {/* Music Toggle */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-slate-800">
                  <span className="text-xs text-slate-300 flex items-center gap-2">
                    <Music className="w-4 h-4 text-[#D8B978]" />
                    <span>Nhạc Nền Du Lịch</span>
                  </span>
                  <button
                    onClick={toggleMusic}
                    className={`px-3 py-1 rounded-md text-xs font-bold font-mono ${
                      isMusicPlaying ? 'bg-[#C9A96E] text-[#0B0F14]' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isMusicPlaying ? 'ON' : 'OFF'}
                  </button>
                </div>

                {/* Language Picker */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Language</span>
                  <div className="flex gap-2">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          onLanguageChange(l.code);
                          soundFx.playClick();
                        }}
                        className={`px-2.5 py-1 text-xs rounded-md font-bold ${
                          currentLang === l.code
                            ? 'bg-[#C9A96E] text-[#0B0F14]'
                            : 'bg-white/5 text-slate-400'
                        }`}
                      >
                        {l.code}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Currency Picker */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Currency</span>
                  <div className="flex gap-2">
                    {currencies.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          onCurrencyChange(c.code);
                          soundFx.playClick();
                        }}
                        className={`px-2 py-1 text-xs rounded-md font-mono ${
                          currentCurrency === c.code
                            ? 'bg-[#D8B978] text-[#0B0F14] font-bold'
                            : 'bg-white/5 text-slate-400'
                        }`}
                      >
                        {c.code}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  variant="primary"
                  className="w-full py-3.5"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  leftIcon={<Sparkles className="w-4 h-4 text-[#0B0F14]" />}
                >
                  {t.nav.bookNow}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
