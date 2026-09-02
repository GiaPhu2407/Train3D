'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Armchair, ShieldCheck, Train, Sparkles } from 'lucide-react';
import { Language, TRANSLATIONS } from '@/lib/translations';

interface JourneyTimelineProps {
  currentLang: Language;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  const steps = [
    {
      num: '01',
      title: t.timeline.s1_title,
      desc: t.timeline.s1_desc,
      icon: Search,
    },
    {
      num: '02',
      title: t.timeline.s2_title,
      desc: t.timeline.s2_desc,
      icon: Armchair,
    },
    {
      num: '03',
      title: t.timeline.s3_title,
      desc: t.timeline.s3_desc,
      icon: ShieldCheck,
    },
    {
      num: '04',
      title: t.timeline.s4_title,
      desc: t.timeline.s4_desc,
      icon: Train,
    },
  ];

  return (
    <section id="timeline" className="py-24 bg-[#070A0E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111827] border border-[#C9A96E]/30 text-[11px] font-mono font-bold text-[#D8B978] tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.timeline.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white tracking-tight">
            {t.timeline.title}
          </h2>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            {t.timeline.subtitle}
          </p>
        </div>

        {/* Timeline Grid with Progress Drawing Line */}
        <div className="relative">
          {/* Horizontal Drawing Railway Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-[3px] bg-slate-800 -translate-y-12 z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-[#8C6E38] via-[#F3E5AB] to-[#C9A96E] origin-left shadow-[0_0_12px_#D8B978]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.18, duration: 0.5 }}
                  className="p-6 md:p-8 rounded-3xl bg-[#0F172A] border border-slate-800 hover:border-[#C9A96E]/50 shadow-2xl flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Step Number & Icon Circle */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#0B0F14] border-2 border-[#C9A96E]/40 group-hover:border-[#C9A96E] flex items-center justify-center shadow-[0_0_20px_rgba(201,169,110,0.2)] group-hover:shadow-[0_0_30px_rgba(201,169,110,0.5)] transition-all duration-300">
                      <Icon className="w-7 h-7 text-[#D8B978]" />
                    </div>

                    <span className="absolute -top-3 -right-3 px-2 py-0.5 rounded-md bg-[#C9A96E] text-[#0B0F14] font-mono font-black text-xs shadow-md">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-[#D8B978] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
