'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Train, ArrowRight, MapPin, Calendar, Utensils, X, Compass } from 'lucide-react';
import { DESTINATIONS, Destination } from '@/data/destinations';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { formatCurrency, Currency } from '@/lib/utils';
import { Language, TRANSLATIONS } from '@/lib/translations';
import { soundFx } from '@/lib/audio';

interface DestinationsProps {
  currentLang: Language;
  currency: Currency;
  onBookToDestination: (stationCode: string) => void;
}

export const Destinations: React.FC<DestinationsProps> = ({
  currentLang,
  currency,
  onBookToDestination,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [activeModalDest, setActiveModalDest] = useState<Destination | null>(null);

  return (
    <section id="destinations" className="py-24 bg-[#070A0E] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111827] border border-[#C9A96E]/30 text-[11px] font-mono font-bold text-[#D8B978] tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.destinations.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white tracking-tight">
            {t.destinations.title}
          </h2>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            {t.destinations.subtitle}
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {DESTINATIONS.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => {
                soundFx.playClick(900, 0.04);
                setActiveModalDest(dest);
              }}
              className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer border border-slate-800 hover:border-[#C9A96E]/70 shadow-2xl transition-all duration-500"
            >
              {/* Background Image with Hover Zoom */}
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Dynamic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070A0E] via-[#070A0E]/50 to-transparent group-hover:via-[#070A0E]/30 transition-colors duration-500" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full bg-[#0B0F14]/80 backdrop-blur-md border border-[#C9A96E]/40 text-[10px] font-mono font-bold text-[#D8B978] uppercase">
                  {dest.tag}
                </span>
              </div>

              {/* Card Content (lifts on hover) */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#D8B978] mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{dest.province} • Station {dest.stationCode}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-black text-white group-hover:text-[#D8B978] transition-colors">
                  {dest.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed opacity-90">
                  {dest.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                  <span className="text-xs font-mono text-white font-bold">
                    From {formatCurrency(dest.startingFare, currency)}
                  </span>
                  <span className="text-xs font-mono text-[#D8B978] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Explore Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Animated Small Train moving along bottom on hover */}
                <div className="relative w-full h-1 bg-slate-800/80 rounded-full mt-3 overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent transform -translate-x-full group-hover:translate-x-[600%] transition-transform duration-1000 ease-in-out" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Destination Detail Modal */}
      {activeModalDest && (
        <Modal
          isOpen={!!activeModalDest}
          onClose={() => setActiveModalDest(null)}
          maxWidth="max-w-3xl"
          title={
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#D8B978]" />
              <span>{activeModalDest.name} — Rail Destination Guide</span>
            </div>
          }
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <img
                src={activeModalDest.image}
                alt={activeModalDest.name}
                className="h-48 w-full object-cover rounded-2xl border border-slate-800"
              />
              <img
                src={activeModalDest.secondaryImage}
                alt={activeModalDest.name}
                className="h-48 w-full object-cover rounded-2xl border border-slate-800"
              />
            </div>

            <div>
              <h4 className="text-xl font-serif font-bold text-white mb-2">
                {activeModalDest.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeModalDest.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-2xl bg-[#0B0F14] border border-slate-800">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#D8B978] uppercase flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Must-See Attractions</span>
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeModalDest.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-[#D8B978] uppercase flex items-center gap-1.5 font-bold">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Culinary Specialties</span>
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeModalDest.culinaryTreats.map((c, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D8B978]" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="w-4 h-4 text-[#C9A96E]" />
                <span>Best time to visit: <strong>{activeModalDest.bestSeason}</strong></span>
              </div>

              <Button
                variant="gold_glow"
                size="md"
                onClick={() => {
                  const targetCode = activeModalDest.stationCode;
                  setActiveModalDest(null);
                  onBookToDestination(targetCode);
                }}
                className="w-full sm:w-auto px-6 font-mono text-xs uppercase"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Book Express to {activeModalDest.name}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
