'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Train, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Language, TRANSLATIONS } from '@/lib/translations';

interface CtaSectionProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ currentLang, onOpenBooking }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section className="relative py-28 md:py-36 bg-[#070A0E] overflow-hidden">
      {/* Background Cinematic Track & Moving Light Streak */}
      <div className="absolute inset-0 opacity-40">
        <img
          src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Railway in the night"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A0E] via-[#070A0E]/80 to-[#070A0E]" />
      </div>

      {/* Moving Train Headlight Beam in Background */}
      <motion.div
        className="absolute top-1/2 left-0 w-96 h-12 bg-gradient-to-r from-transparent via-[#FFF4D0]/30 to-transparent blur-xl pointer-events-none transform -translate-y-1/2"
        animate={{ x: ['-100%', '300%'] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        {/* Monogram Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D8B978] to-[#8C6E38] p-0.5 mx-auto shadow-[0_0_35px_rgba(201,169,110,0.4)]"
        >
          <div className="w-full h-full bg-[#0B0F14] rounded-[14px] flex items-center justify-center">
            <Train className="w-8 h-8 text-[#D8B978]" />
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-white tracking-tight leading-tight"
        >
          {t.cta.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          {t.cta.subtitle}
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            variant="gold_glow"
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-10 py-4 text-base font-bold tracking-wider uppercase"
            rightIcon={<ArrowRight className="w-5 h-5 text-[#0B0F14]" />}
          >
            {t.cta.btn}
          </Button>
        </motion.div>

        {/* Concierge Hotline Note */}
        <p className="text-xs font-mono text-slate-400 flex items-center justify-center gap-2 pt-4">
          <PhoneCall className="w-3.5 h-3.5 text-[#C9A96E]" />
          <span>{t.cta.callUs}</span>
        </p>
      </div>
    </section>
  );
};
