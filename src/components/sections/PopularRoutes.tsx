'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin, Sparkles, Train } from 'lucide-react';
import { POPULAR_ROUTES, PopularRoute } from '@/data/routes';
import { Button } from '@/components/ui/Button';
import { formatCurrency, Currency } from '@/lib/utils';
import { Language, TRANSLATIONS } from '@/lib/translations';
import { soundFx } from '@/lib/audio';

interface PopularRoutesProps {
  currentLang: Language;
  currency: Currency;
  onSelectRoute: (fromCode: string, toCode: string) => void;
}

export const PopularRoutes: React.FC<PopularRoutesProps> = ({
  currentLang,
  currency,
  onSelectRoute,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section id="routes" className="py-24 bg-[#0B0F14] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111827] border border-[#C9A96E]/30 text-[11px] font-mono font-bold text-[#D8B978] tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.routesSection.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white tracking-tight">
            {t.routesSection.title}
          </h2>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            {t.routesSection.subtitle}
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {POPULAR_ROUTES.map((route, idx) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl bg-[#0F172A] border border-slate-800 hover:border-[#C9A96E]/60 shadow-xl hover:shadow-[0_15px_35px_rgba(201,169,110,0.2)] overflow-hidden flex flex-col justify-between transition-all duration-300"
            >
              {/* Image Container with Zoom */}
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={route.image}
                  alt={`${route.fromCity} to ${route.toCity}`}
                  className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />

                {/* Highlight Tag */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0B0F14]/80 backdrop-blur-md border border-[#C9A96E]/40 text-[10px] font-mono font-bold text-[#D8B978] uppercase">
                  {route.highlightTag}
                </div>

                {/* Distance Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#0B0F14]/80 text-[10px] font-mono text-slate-300">
                  {route.distance}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Route Title */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#D8B978] transition-colors">
                      {route.fromCity} <span className="text-[#C9A96E]">→</span> {route.toCity}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {route.description}
                  </p>

                  {/* Highlights pills */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {route.scenicHighlights.map((hl, hIdx) => (
                      <span
                        key={hIdx}
                        className="text-[10px] px-2 py-0.5 rounded-sm bg-[#111827] text-slate-300 border border-slate-800"
                      >
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Duration, Starting Price, CTA */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#C9A96E]" />
                      <span>{route.duration}</span>
                    </div>
                    <p className="text-lg font-mono font-bold text-[#D8B978] mt-0.5">
                      {formatCurrency(route.startingPrice, currency)}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      soundFx.playClick(950, 0.04);
                      onSelectRoute(route.fromCode, route.toCode);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E293B] hover:bg-[#C9A96E] text-white hover:text-[#0B0F14] text-xs font-bold font-mono transition-all duration-300 shadow-md group/btn"
                  >
                    <span>{t.routesSection.bookRoute}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
