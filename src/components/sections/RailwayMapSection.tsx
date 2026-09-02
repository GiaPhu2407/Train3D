'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Train, MapPin, Clock, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { STATIONS } from '@/data/stations';
import { Station } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { formatCurrency, Currency } from '@/lib/utils';
import { Language, TRANSLATIONS } from '@/lib/translations';
import { soundFx } from '@/lib/audio';

interface RailwayMapSectionProps {
  currentLang: Language;
  currency: Currency;
  onBookFromStation: (stationCode: string) => void;
}

export const RailwayMapSection: React.FC<RailwayMapSectionProps> = ({
  currentLang,
  currency,
  onBookFromStation,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [selectedStation, setSelectedStation] = useState<Station>(STATIONS[0]);
  const [trainProgress, setTrainProgress] = useState(0);

  // Animated small train loop traveling along the North-South track
  useEffect(() => {
    const interval = setInterval(() => {
      setTrainProgress((prev) => (prev >= 100 ? 0 : prev + 0.8));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Compute position of moving train along SVG spline
  // We approximate along North-South coordinates
  const trainCoord = {
    x: 50 + Math.sin((trainProgress / 100) * Math.PI) * 14 - (trainProgress > 50 ? (trainProgress - 50) * 0.25 : 0),
    y: 8 + (trainProgress / 100) * 82,
  };

  return (
    <section id="railway-map" className="py-24 bg-[#0B0F14] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111827] border border-[#C9A96E]/30 text-[11px] font-mono font-bold text-[#D8B978] tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.railwayMap.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white tracking-tight">
            {t.railwayMap.title}
          </h2>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            {t.railwayMap.subtitle}
          </p>
        </div>

        {/* Interactive Map & Detail Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Stylized Vietnam Rail SVG Map (Cols 1-6) */}
          <div className="lg:col-span-6 relative p-6 md:p-8 rounded-3xl bg-[#070A0E] border border-slate-800 shadow-2xl flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-[#D8B978]">
                <Train className="w-4 h-4" />
                <span>TRANS-VIETNAM HERITAGE SPINE</span>
              </span>
              <span className="text-[10px] bg-[#111827] px-2.5 py-1 rounded border border-slate-800">
                1,726 KM TOTAL
              </span>
            </div>

            {/* Interactive SVG Diagram */}
            <div className="relative w-full max-w-md aspect-[3/4] bg-[#0F172A]/40 rounded-2xl border border-slate-800/80 p-4 flex items-center justify-center overflow-hidden">
              {/* Vietnam Coastline Backdrop Graphic */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full object-contain filter drop-shadow-lg"
              >
                {/* Stylized Coastal Outline */}
                <path
                  d="M 35,5 Q 52,10 50,15 T 47,28 T 53,44 T 60,50 T 65,65 T 67,73 T 57,83 T 44,89 T 38,94"
                  fill="none"
                  stroke="#1E293B"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Sapa Northwest Branch Track */}
                <path
                  d="M 50,12 L 38,7"
                  fill="none"
                  stroke="#C9A96E"
                  strokeWidth="1.5"
                  strokeDasharray="2,2"
                  opacity="0.8"
                />

                {/* Hai Phong East Branch Track */}
                <path
                  d="M 50,12 L 58,15"
                  fill="none"
                  stroke="#C9A96E"
                  strokeWidth="1.5"
                  strokeDasharray="2,2"
                  opacity="0.8"
                />

                {/* Glowing Main North-South Railway Line */}
                <path
                  id="mainRailPath"
                  d="M 50,12 Q 47,28 53,44 T 59,49 T 64,62 T 67,72 T 57,82 T 45,88"
                  fill="none"
                  stroke="url(#railGoldGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Pulse Glow Layer */}
                <path
                  d="M 50,12 Q 47,28 53,44 T 59,49 T 64,62 T 67,72 T 57,82 T 45,88"
                  fill="none"
                  stroke="#D8B978"
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity="0.15"
                  className="animate-pulse"
                />

                <defs>
                  <linearGradient id="railGoldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F3E5AB" />
                    <stop offset="50%" stopColor="#D8B978" />
                    <stop offset="100%" stopColor="#C9A96E" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Animated Moving Train Indicator along Line */}
              <div
                className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-all duration-75"
                style={{
                  left: `${trainCoord.x}%`,
                  top: `${trainCoord.y}%`,
                }}
              >
                <div className="relative">
                  <div className="w-6 h-6 rounded-full bg-[#C9A96E] flex items-center justify-center text-[#0B0F14] shadow-[0_0_15px_#C9A96E]">
                    <Train className="w-3.5 h-3.5" />
                  </div>
                  <div className="absolute -inset-1 rounded-full bg-[#D8B978] animate-ping opacity-75" />
                </div>
              </div>

              {/* Station Node Interactive Pins */}
              {STATIONS.map((station) => {
                const isSelected = selectedStation.id === station.id;

                return (
                  <button
                    key={station.id}
                    type="button"
                    onClick={() => {
                      soundFx.playClick(900, 0.04);
                      setSelectedStation(station);
                    }}
                    style={{
                      left: `${station.coordinates.x}%`,
                      top: `${station.coordinates.y}%`,
                    }}
                    className={`absolute z-30 transform -translate-x-1/2 -translate-y-1/2 flex items-center group cursor-pointer focus:outline-none ${
                      station.coordinates.x > 55 ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Node Dot */}
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#F3E5AB] border-[#0B0F14] shadow-[0_0_15px_#F3E5AB] scale-125'
                          : station.isMajorHub
                          ? 'bg-[#D8B978] border-[#0B0F14] hover:scale-115'
                          : 'bg-[#1E293B] border-[#C9A96E] hover:bg-[#C9A96E]'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#0B0F14]" />}
                    </div>

                    {/* Node City Label */}
                    <span
                      className={`text-[10px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded transition-colors whitespace-nowrap ${
                        station.coordinates.x > 55 ? 'mr-1.5' : 'ml-1.5'
                      } ${
                        isSelected
                          ? 'bg-[#C9A96E] text-[#0B0F14] shadow-md'
                          : 'bg-[#0B0F14]/90 text-slate-300 group-hover:text-white border border-slate-800'
                      }`}
                    >
                      {station.city}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] font-mono text-slate-500 mt-4 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>Click any node to explore station details & express connections</span>
            </p>
          </div>

          {/* Station Details Panel (Cols 7-12) */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedStation.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="p-6 md:p-8 rounded-3xl bg-[#0F172A] border border-[#C9A96E]/40 shadow-2xl space-y-6"
              >
                {/* Station Header */}
                <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#C9A96E]/20 text-[#D8B978] font-mono font-bold text-xs">
                        {selectedStation.code}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {selectedStation.region} Vietnam Terminal
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-black text-white mt-1">
                      {selectedStation.name}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">{t.railwayMap.fareFrom}</span>
                    <span className="text-xl font-mono font-bold text-[#D8B978]">
                      {formatCurrency(selectedStation.startingPrice, currency)}
                    </span>
                  </div>
                </div>

                {/* Station Photo & Description */}
                <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-800">
                  <img
                    src={selectedStation.image}
                    alt={selectedStation.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
                </div>

                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {selectedStation.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#D8B978] uppercase tracking-wider block">
                    Station Facilities & Attractions:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedStation.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-lg bg-[#0B0F14] text-slate-300 border border-slate-700/60"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Popular Departures from this Station */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-400">
                    <span>Direct Express Services: </span>
                    <strong className="text-white font-mono">{selectedStation.popularRoutes.join(', ')}</strong>
                  </div>

                  <Button
                    variant="gold_glow"
                    size="md"
                    onClick={() => onBookFromStation(selectedStation.id)}
                    className="w-full sm:w-auto px-6 font-mono text-xs uppercase"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {t.railwayMap.bookFromHere}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
