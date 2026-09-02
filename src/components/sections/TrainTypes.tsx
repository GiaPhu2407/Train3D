'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Moon, Crown, Eye, Wifi, Utensils, Shield, Check } from 'lucide-react';
import { TiltCard } from '@/components/ui/TiltCard';
import { Language, TRANSLATIONS } from '@/lib/translations';
import { soundFx } from '@/lib/audio';

interface TrainTypesProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export const TrainTypes: React.FC<TrainTypesProps> = ({ currentLang, onOpenBooking }) => {
  const t = TRANSLATIONS[currentLang];

  const types = [
    {
      id: 'high-speed',
      title: 'HIGH-SPEED EXPRESS',
      subtitle: 'Fast, efficient and comfortable.',
      description: 'Aerodynamically refined express coaches featuring high-density quiet cabins, ergonomic leather recliners, Starlink Wi-Fi 6, and ultra-smooth rail suspension.',
      speed: 'Up to 160 km/h',
      image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
      icon: Zap,
      features: ['220V & USB Fast Charging', 'Ergonomic 140° Recline', 'Ultra-Quiet Soundproofing', 'Express On-Time Service'],
      badge: 'Speed & Precision',
    },
    {
      id: 'sleeper',
      title: 'GRAND SLEEPER TRAIN',
      subtitle: 'Relax and wake up at your destination.',
      description: 'Designed for overnight transits between historic capitals and coastal pearls. Pocket-spring hotel mattresses, fresh linen duvets, and dimmable reading illumination.',
      speed: 'Overnight Serenity',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      icon: Moon,
      features: ['Goose-Down Pillows & Duvets', 'Private Lockable Cabin Door', 'Complimentary Breakfast', 'Noise-Isolation System'],
      badge: 'Restful Sleep',
    },
    {
      id: 'premium-cabin',
      title: 'PREMIUM VIP SUITE',
      subtitle: 'Private comfort for a premium journey.',
      description: 'The pinnacle of Southeast Asian rail hospitality. Dedicated personal butler, free-flowing French champagne, ensuite marble washrooms, and bespoke multi-course culinary service.',
      speed: '5-Star Grand Prestige',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
      icon: Crown,
      features: ['Dedicated Personal Butler', '3-Course Fine Dining & Wine', 'VIP Station Lounge Pass', 'Private Double Bed Suite'],
      badge: 'Ultimate Prestige',
    },
    {
      id: 'panoramic',
      title: 'PANORAMIC VISTA SALON',
      subtitle: 'Uninterrupted 270° coastal sightseeing.',
      description: 'Curved floor-to-ceiling anti-reflective glass viewing car positioned at the rear of scenic daylight services for dramatic ocean views over the cliffs of Hai Van Pass.',
      speed: 'Scenic Daylight Experience',
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80',
      icon: Eye,
      features: ['270° Panoramic Curved Glass', 'Artisanal Coffee & Cocktail Bar', 'Rotating Luxury Armchairs', 'Scenic Audio Commentary'],
      badge: 'Breathtaking Vistas',
    },
  ];

  return (
    <section id="train-types" className="py-24 bg-[#070A0E] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111827] border border-[#C9A96E]/30 text-[11px] font-mono font-bold text-[#D8B978] tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.trainTypes.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white tracking-tight">
            {t.trainTypes.title}
          </h2>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            {t.trainTypes.subtitle}
          </p>
        </div>

        {/* 3D Tilt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {types.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.6 }}
              >
                <TiltCard maxTilt={6} className="h-full">
                  <div className="h-full rounded-2xl bg-[#0F172A] border border-slate-800 hover:border-[#C9A96E]/60 p-6 md:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300">
                    <div>
                      {/* Top Row: Icon & Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#C9A96E]/15 border border-[#C9A96E]/30 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-[#D8B978]" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#111827] border border-[#C9A96E]/40 text-xs font-mono font-bold text-[#D8B978]">
                          {item.badge}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-2xl font-serif font-bold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs font-mono text-[#D8B978] mb-4">{item.subtitle}</p>

                      {/* Image Preview */}
                      <div className="relative h-44 rounded-xl overflow-hidden mb-6 border border-slate-800">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-[#0B0F14]/85 text-[10px] font-mono text-slate-300 border border-slate-700">
                          {item.speed}
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {/* Features List */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-slate-800">
                        {item.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Book This Class CTA */}
                    <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
                      <button
                        onClick={() => {
                          soundFx.playClick(950, 0.04);
                          onOpenBooking();
                        }}
                        className="px-5 py-2.5 rounded-xl bg-[#1E293B] hover:bg-[#C9A96E] text-white hover:text-[#0B0F14] text-xs font-bold font-mono transition-all duration-300 shadow-md"
                      >
                        Explore & Book Fleet →
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
