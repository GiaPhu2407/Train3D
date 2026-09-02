'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Shield, Coffee, Zap, Wifi } from 'lucide-react';
import { TrainSchedule, CabinClassType, TrainClassInfo } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { formatCurrency, Currency } from '@/lib/utils';
import { soundFx } from '@/lib/audio';

interface ClassSelectorProps {
  train: TrainSchedule;
  selectedClass: CabinClassType | null;
  onSelectClass: (classId: CabinClassType) => void;
  onContinue: () => void;
  onBack: () => void;
  currency: Currency;
}

export const ClassSelector: React.FC<ClassSelectorProps> = ({
  train,
  selectedClass,
  onSelectClass,
  onContinue,
  onBack,
  currency,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0B0F14]/80 border border-[#C9A96E]/20">
        <div>
          <span className="text-xs font-mono text-[#D8B978]">STEP 2 OF 6</span>
          <h3 className="text-xl font-serif font-bold text-white">
            Select Your Cabin Tier on <span className="text-[#C9A96E]">{train.name} ({train.code})</span>
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400">Departure</span>
          <p className="text-base font-mono font-bold text-white">{train.departureTime} → {train.arrivalTime}</p>
        </div>
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {train.classes.map((cls) => {
          const isSelected = selectedClass === cls.id;

          return (
            <motion.div
              key={cls.id}
              whileHover={{ y: -4 }}
              onClick={() => {
                soundFx.playClick(920, 0.04);
                onSelectClass(cls.id);
              }}
              className={`relative rounded-2xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                isSelected
                  ? 'bg-[#1E293B] border-2 border-[#C9A96E] shadow-[0_0_25px_rgba(201,169,110,0.35)]'
                  : 'bg-[#0F172A]/80 border border-slate-800 hover:border-[#C9A96E]/40'
              }`}
            >
              {/* Badge if available */}
              {cls.badge && (
                <span className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#C9A96E] to-[#D8B978] text-[#0B0F14] text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                  {cls.badge}
                </span>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-serif font-bold text-white">{cls.name}</h4>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'bg-[#C9A96E] border-[#C9A96E] text-[#0B0F14]'
                        : 'border-slate-600'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <p className="text-xs text-[#D8B978] font-mono mb-4">{cls.tagline}</p>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{cls.description}</p>

                {/* Amenities List */}
                <div className="space-y-2 border-t border-slate-800 pt-4">
                  {cls.amenities.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <Sparkles className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Selection State */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400">Price per passenger</span>
                  <p className="text-xl font-mono font-bold text-[#D8B978]">
                    {formatCurrency(cls.price, currency)}
                  </p>
                </div>

                <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#0B0F14] text-slate-300 border border-slate-700">
                  {cls.availableSeats} Left
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <Button variant="ghost" onClick={onBack}>
          ← Back to Train List
        </Button>
        <Button
          variant="primary"
          size="lg"
          disabled={!selectedClass}
          onClick={onContinue}
          className="px-8"
        >
          Proceed to Seat Selection →
        </Button>
      </div>
    </div>
  );
};
