'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Train, Clock, ArrowRight, ShieldCheck, Star, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { TrainSchedule } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { formatCurrency, Currency } from '@/lib/utils';
import { soundFx } from '@/lib/audio';

interface TrainSearchResultsProps {
  trains: TrainSchedule[];
  onSelectTrain: (train: TrainSchedule) => void;
  currency: Currency;
  fromName: string;
  toName: string;
}

export const TrainSearchResults: React.FC<TrainSearchResultsProps> = ({
  trains,
  onSelectTrain,
  currency,
  fromName,
  toName,
}) => {
  return (
    <div className="space-y-6">
      {/* Route Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0B0F14]/80 border border-[#C9A96E]/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D8B978]">
            <span>SEARCH RESULTS</span>
            <span>•</span>
            <span>{trains.length} Express Services Available</span>
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-white mt-1">
            {fromName} <span className="text-[#C9A96E]">→</span> {toName}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-[#C9A96E]" />
          <span>Real-time seat allocation</span>
        </div>
      </div>

      {/* Train Schedule Cards */}
      <div className="space-y-4">
        {trains.map((train, idx) => {
          const minPrice = Math.min(...train.classes.map((c) => c.price));
          const totalAvailable = train.classes.reduce((acc, c) => acc + c.availableSeats, 0);

          return (
            <motion.div
              key={train.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="p-5 md:p-6 rounded-2xl bg-[#0F172A]/90 border border-slate-800 hover:border-[#C9A96E]/50 transition-all duration-300 shadow-xl hover:shadow-[0_10px_30px_rgba(201,169,110,0.15)] group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Train Info & Badges (Cols 1-4) */}
                <div className="lg:col-span-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#C9A96E]/20 border border-[#C9A96E]/50 text-[#D8B978] font-mono text-xs font-bold">
                      {train.code}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#D8B978] fill-[#D8B978]" />
                      <strong className="text-white">{train.rating}</strong> ({train.reviewsCount})
                    </span>
                  </div>
                  <h4 className="text-lg font-serif font-bold text-white group-hover:text-[#D8B978] transition-colors">
                    {train.name}
                  </h4>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {train.amenities.slice(0, 2).map((a, aIdx) => (
                      <span
                        key={aIdx}
                        className="text-[11px] px-2 py-0.5 rounded-sm bg-slate-800/80 text-slate-300 border border-slate-700/50"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Departure / Duration / Arrival (Cols 5-8) */}
                <div className="lg:col-span-5 flex items-center justify-between gap-3 px-2 md:px-4 py-3 rounded-xl bg-[#0B0F14]/50 border border-slate-800/60">
                  <div className="text-left">
                    <p className="text-2xl font-bold font-mono text-white">{train.departureTime}</p>
                    <p className="text-xs text-slate-400 truncate max-w-[100px]">{train.fromStationName}</p>
                  </div>

                  <div className="flex-1 flex flex-col items-center px-2">
                    <span className="text-[11px] font-mono text-[#D8B978] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {train.duration}
                    </span>
                    <div className="relative w-full flex items-center my-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#C9A96E]" />
                      <div className="flex-1 h-[2px] bg-gradient-to-r from-[#C9A96E] via-slate-600 to-[#C9A96E]" />
                      <Train className="w-3.5 h-3.5 text-[#D8B978] absolute left-1/2 -translate-x-1/2" />
                      <div className="w-2 h-2 rounded-full bg-[#C9A96E]" />
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">{train.onTimeRate} On-Time</span>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold font-mono text-white">{train.arrivalTime}</p>
                    <p className="text-xs text-slate-400 truncate max-w-[100px]">{train.toStationName}</p>
                  </div>
                </div>

                {/* Price & Action (Cols 9-12) */}
                <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                  <div className="text-left lg:text-right">
                    <p className="text-xs text-slate-400">Fares from</p>
                    <p className="text-xl md:text-2xl font-mono font-bold text-[#D8B978]">
                      {formatCurrency(minPrice, currency)}
                    </p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 justify-start lg:justify-end">
                      <Users className="w-3 h-3 text-[#C9A96E]" />
                      <span>{totalAvailable} seats left</span>
                    </p>
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      soundFx.playClick(900, 0.05);
                      onSelectTrain(train);
                    }}
                    className="w-full sm:w-auto px-6"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    SELECT
                  </Button>
                </div>
              </div>

              {/* Class Options Accordion Bar */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap items-center gap-3">
                <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                  Available Tiers:
                </span>
                {train.classes.map((cls) => (
                  <div
                    key={cls.id}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#111827] border border-slate-700/60 text-xs"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#C9A96E]" />
                    <span className="text-slate-200">{cls.name}:</span>
                    <span className="font-mono text-[#D8B978] font-bold">
                      {formatCurrency(cls.price, currency)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
