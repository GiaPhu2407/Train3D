'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, Train } from 'lucide-react';
import { TESTIMONIALS, Testimonial } from '@/data/testimonials';
import { Language, TRANSLATIONS } from '@/lib/translations';
import { soundFx } from '@/lib/audio';

interface TestimonialsProps {
  currentLang: Language;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto carousel rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    soundFx.playClick();
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    soundFx.playClick();
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-[#0B0F14] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111827] border border-[#C9A96E]/30 text-[11px] font-mono font-bold text-[#D8B978] tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.testimonials.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white tracking-tight">
            {t.testimonials.title}
          </h2>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            {t.testimonials.subtitle}
          </p>
        </div>

        {/* Carousel Showcase Card */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="p-8 sm:p-12 rounded-3xl bg-[#0F172A]/90 border border-[#C9A96E]/30 shadow-2xl relative overflow-hidden"
            >
              {/* Quote Icon */}
              <Quote className="w-16 h-16 text-[#C9A96E]/15 absolute top-6 right-8 pointer-events-none" />

              <div className="space-y-6">
                {/* Star Rating */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#D8B978] fill-[#D8B978]" />
                  ))}
                  <span className="ml-2 text-xs font-mono text-[#D8B978] uppercase tracking-wider">
                    Verified Luxury Traveler
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-lg sm:text-2xl font-serif italic text-slate-100 leading-relaxed">
                  "{current.quote}"
                </p>

                {/* Passenger Bio & Route info */}
                <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={current.avatar}
                      alt={current.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#C9A96E]"
                    />
                    <div>
                      <h4 className="text-base font-serif font-bold text-white">{current.name}</h4>
                      <p className="text-xs text-[#D8B978] font-mono">{current.title} • {current.country}</p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 justify-start sm:justify-end">
                      <Train className="w-3.5 h-3.5 text-[#C9A96E]" />
                      <span>{current.route}</span>
                    </span>
                    <span className="text-[11px] text-[#D8B978] font-mono block">
                      {current.cabinClass}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-[#111827] border border-slate-800 text-slate-300 hover:text-white hover:border-[#C9A96E] transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    soundFx.playClick();
                    setCurrentIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === i ? 'w-8 bg-[#C9A96E]' : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-[#111827] border border-slate-800 text-slate-300 hover:text-white hover:border-[#C9A96E] transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
