'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Headphones, Tag, Zap, CheckCircle2 } from 'lucide-react';
import { Language, TRANSLATIONS } from '@/lib/translations';

interface WhyChooseUsProps {
  currentLang: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  const features = [
    {
      icon: Tag,
      title: t.whyUs.f1_title,
      description: t.whyUs.f1_desc,
      detail: 'No dynamic surge surcharges or hidden administrative fees.',
    },
    {
      icon: ShieldCheck,
      title: t.whyUs.f2_title,
      description: t.whyUs.f2_desc,
      detail: 'Direct official API integration with Vietnam Railways authority.',
    },
    {
      icon: Headphones,
      title: t.whyUs.f3_title,
      description: t.whyUs.f3_desc,
      detail: 'Live dedicated hotline in English, Vietnamese and Japanese.',
    },
    {
      icon: Zap,
      title: t.whyUs.f4_title,
      description: t.whyUs.f4_desc,
      detail: 'Paperless check-in with Apple Wallet & digital QR barcode.',
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-[#0B0F14] relative overflow-hidden">
      {/* Background track silhouette */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(#C9A96E_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111827] border border-[#C9A96E]/30 text-[11px] font-mono font-bold text-[#D8B978] tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.whyUs.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white tracking-tight">
            {t.whyUs.title}
          </h2>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            {t.whyUs.subtitle}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="p-6 md:p-8 rounded-2xl bg-[#0F172A] border border-slate-800 hover:border-[#C9A96E]/50 shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#C9A96E]/10 border border-[#C9A96E]/30 flex items-center justify-center mb-6 group-hover:bg-[#C9A96E]/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-[#D8B978]" />
                  </div>

                  <h3 className="text-lg font-serif font-bold text-white mb-2 group-hover:text-[#D8B978] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{item.detail}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
