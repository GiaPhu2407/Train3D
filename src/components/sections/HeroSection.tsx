'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Compass, ShieldCheck, Clock } from 'lucide-react';
import { TrainCanvas } from '@/components/3d/TrainCanvas';
import { BookingSearchBox } from '@/components/booking/BookingSearchBox';
import { Button } from '@/components/ui/Button';
import { Language, TRANSLATIONS } from '@/lib/translations';
import { BookingSearchQuery } from '@/lib/types';
import { soundFx } from '@/lib/audio';

interface HeroSectionProps {
  currentLang: Language;
  onSearch: (query: BookingSearchQuery) => void;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  onSearch,
  onOpenBooking,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 md:pt-28 pb-12 overflow-hidden bg-[#070A0E]">
      {/* 3D Interactive Train Background Viewport */}
      <div className="absolute inset-0 z-0 opacity-95">
        <TrainCanvas />
      </div>

      {/* Hero Headline Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 md:pt-16 pb-6 text-center">
        {/* Luxury Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B0F14]/80 border border-[#C9A96E]/40 backdrop-blur-md shadow-[0_0_20px_rgba(201,169,110,0.2)] mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D8B978] animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-[11px] md:text-xs font-mono font-bold tracking-[0.2em] text-[#D8B978] uppercase">
            {t.hero.tag}
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black tracking-tight leading-[0.95] text-white max-w-5xl mx-auto drop-shadow-2xl"
        >
          {t.hero.title1}{' '}
          <span className="gold-gradient-text block sm:inline">{t.hero.title2}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed drop-shadow"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            size="lg"
            variant="gold_glow"
            onClick={onOpenBooking}
            className="px-8 py-4 text-sm font-bold tracking-wider"
            rightIcon={<ArrowRight className="w-4 h-4 text-[#0B0F14]" />}
          >
            {t.hero.bookBtn}
          </Button>

          <a href="#routes" onClick={() => soundFx.playClick(700, 0.04)}>
            <Button
              size="lg"
              variant="secondary"
              className="px-8 py-4 text-sm font-bold tracking-wider bg-[#0B0F14]/70 backdrop-blur-md border-[#C9A96E]/30 text-slate-200 hover:border-[#C9A96E]"
              leftIcon={<Compass className="w-4 h-4 text-[#D8B978]" />}
            >
              {t.hero.exploreBtn}
            </Button>
          </a>
        </motion.div>

        {/* Live Operational Stats Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400"
        >
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B0F14]/60 border border-slate-800 backdrop-blur-xs">
            <Clock className="w-3.5 h-3.5 text-[#D8B978]" />
            <span>{t.hero.activeTrainsBadge}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B0F14]/60 border border-slate-800 backdrop-blur-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.hero.satisfactionBadge}</span>
          </div>
        </motion.div>
      </div>

      {/* Floating Glassmorphic Booking Search Box */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4">
        <BookingSearchBox currentLang={currentLang} onSearch={onSearch} />
      </div>
    </section>
  );
};
