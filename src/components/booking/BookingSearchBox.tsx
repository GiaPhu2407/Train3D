'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, Calendar, Users, Train, Sparkles, ChevronDown } from 'lucide-react';
import { STATIONS } from '@/data/stations';
import { Button } from '@/components/ui/Button';
import { soundFx } from '@/lib/audio';
import { Language, TRANSLATIONS } from '@/lib/translations';
import { BookingSearchQuery, CabinClassType } from '@/lib/types';

interface BookingSearchBoxProps {
  currentLang: Language;
  onSearch: (query: BookingSearchQuery) => void;
  initialFrom?: string;
  initialTo?: string;
}

export const BookingSearchBox: React.FC<BookingSearchBoxProps> = ({
  currentLang,
  onSearch,
  initialFrom = 'HAN',
  initialTo = 'DAD',
}) => {
  const t = TRANSLATIONS[currentLang];

  const [tripType, setTripType] = useState<'one_way' | 'round_trip'>('one_way');
  const [fromStationId, setFromStationId] = useState(initialFrom);
  const [toStationId, setToStationId] = useState(initialTo);
  const [departureDate, setDepartureDate] = useState('2026-09-12');
  const [returnDate, setReturnDate] = useState('2026-09-18');
  const [isSwapping, setIsSwapping] = useState(false);

  // Passenger state
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    seniors: 0,
  });
  const [showPassengerPopover, setShowPassengerPopover] = useState(false);
  const [preferredClass, setPreferredClass] = useState<CabinClassType | 'all'>('all');

  const totalPassengers = passengers.adults + passengers.children + passengers.seniors;

  const handleSwap = () => {
    soundFx.playClick(950, 0.05);
    setIsSwapping(true);
    const temp = fromStationId;
    setFromStationId(toStationId);
    setToStationId(temp);
    setTimeout(() => setIsSwapping(false), 300);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playDepartureChime();
    onSearch({
      tripType,
      fromStationId,
      toStationId,
      departureDate,
      returnDate: tripType === 'round_trip' ? returnDate : undefined,
      passengersCount: passengers,
      preferredClass,
    });
  };

  return (
    <div id="booking-section" className="relative w-full max-w-6xl mx-auto">
      {/* Glassmorphic Container with Subtle Gold Glow */}
      <div className="relative rounded-2xl md:rounded-3xl bg-[#0F172A]/90 backdrop-blur-2xl border border-[#C9A96E]/35 p-5 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(201,169,110,0.15)]">
        {/* Trip Type Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800/90 pb-4 mb-6">
          <div className="flex items-center space-x-2 bg-[#0B0F14]/80 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setTripType('one_way');
              }}
              className={`px-4 py-1.5 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 ${
                tripType === 'one_way'
                  ? 'bg-gradient-to-r from-[#C9A96E] to-[#D8B978] text-[#0B0F14] shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.search.oneWay}
            </button>
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setTripType('round_trip');
              }}
              className={`px-4 py-1.5 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 ${
                tripType === 'round_trip'
                  ? 'bg-gradient-to-r from-[#C9A96E] to-[#D8B978] text-[#0B0F14] shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.search.roundTrip}
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#D8B978]">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>Instant Seat Selection & QR Pass</span>
          </div>
        </div>

        {/* Booking Form Grid */}
        <form onSubmit={handleSearchSubmit} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4 items-center">
            {/* FROM Station (Cols 1-3) */}
            <div className="lg:col-span-3 relative">
              <label className="block text-[10px] md:text-xs font-mono tracking-widest text-[#C9A96E] uppercase mb-1 font-semibold">
                {t.search.from}
              </label>
              <div className="relative">
                <select
                  value={fromStationId}
                  onChange={(e) => {
                    soundFx.playClick();
                    setFromStationId(e.target.value);
                  }}
                  className="w-full h-12 bg-[#0B0F14]/90 border border-slate-700/80 hover:border-[#C9A96E]/60 focus:border-[#C9A96E] rounded-xl px-3.5 pl-10 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-[#C9A96E] appearance-none transition-all cursor-pointer"
                >
                  {STATIONS.map((station) => (
                    <option key={station.id} value={station.id} disabled={station.id === toStationId}>
                      {station.city} ({station.code}) - {station.name}
                    </option>
                  ))}
                </select>
                <Train className="absolute left-3.5 top-3.5 w-4 h-4 text-[#C9A96E]/80 pointer-events-none" />
                <ChevronDown className="absolute right-3.5 top-4 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* SWAP Station Button (Col 4 on lg) */}
            <div className="flex justify-center lg:col-span-1 -my-2 lg:my-0">
              <button
                type="button"
                onClick={handleSwap}
                title={t.search.swapStations}
                className="w-10 h-10 rounded-full bg-[#1E293B] hover:bg-[#C9A96E] hover:text-[#0B0F14] text-[#D8B978] border border-[#C9A96E]/40 flex items-center justify-center shadow-lg transition-all duration-300 transform active:scale-90 hover:rotate-180"
              >
                <ArrowLeftRight className={`w-4 h-4 ${isSwapping ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* TO Station (Cols 5-7) */}
            <div className="lg:col-span-3 relative">
              <label className="block text-[10px] md:text-xs font-mono tracking-widest text-[#C9A96E] uppercase mb-1 font-semibold">
                {t.search.to}
              </label>
              <div className="relative">
                <select
                  value={toStationId}
                  onChange={(e) => {
                    soundFx.playClick();
                    setToStationId(e.target.value);
                  }}
                  className="w-full h-12 bg-[#0B0F14]/90 border border-slate-700/80 hover:border-[#C9A96E]/60 focus:border-[#C9A96E] rounded-xl px-3.5 pl-10 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-[#C9A96E] appearance-none transition-all cursor-pointer"
                >
                  {STATIONS.map((station) => (
                    <option key={station.id} value={station.id} disabled={station.id === fromStationId}>
                      {station.city} ({station.code}) - {station.name}
                    </option>
                  ))}
                </select>
                <Train className="absolute left-3.5 top-3.5 w-4 h-4 text-[#C9A96E]/80 pointer-events-none" />
                <ChevronDown className="absolute right-3.5 top-4 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* DEPARTURE DATE (Cols 8-9) */}
            <div className="lg:col-span-2 relative">
              <label className="block text-[10px] md:text-xs font-mono tracking-widest text-[#C9A96E] uppercase mb-1 font-semibold">
                {t.search.departure}
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  min="2026-09-02"
                  className="w-full h-12 bg-[#0B0F14]/90 border border-slate-700/80 hover:border-[#C9A96E]/60 focus:border-[#C9A96E] rounded-xl px-3.5 pl-10 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-[#C9A96E] transition-all cursor-pointer"
                />
                <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-[#C9A96E]/80 pointer-events-none" />
              </div>
            </div>

            {/* RETURN DATE or PASSENGERS (Cols 10-12) */}
            {tripType === 'round_trip' ? (
              <div className="lg:col-span-3 relative">
                <label className="block text-[10px] md:text-xs font-mono tracking-widest text-[#C9A96E] uppercase mb-1 font-semibold">
                  {t.search.return}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={departureDate}
                    className="w-full h-12 bg-[#0B0F14]/90 border border-slate-700/80 hover:border-[#C9A96E]/60 focus:border-[#C9A96E] rounded-xl px-3.5 pl-10 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-[#C9A96E] transition-all cursor-pointer"
                  />
                  <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-[#C9A96E]/80 pointer-events-none" />
                </div>
              </div>
            ) : (
              <div className="lg:col-span-3 relative">
                <label className="block text-[10px] md:text-xs font-mono tracking-widest text-[#C9A96E] uppercase mb-1 font-semibold">
                  {t.search.passengers}
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowPassengerPopover(!showPassengerPopover)}
                    className="w-full h-12 bg-[#0B0F14]/90 border border-slate-700/80 hover:border-[#C9A96E]/60 focus:border-[#C9A96E] rounded-xl px-3.5 pl-10 text-left text-sm font-medium text-white focus:outline-none flex items-center justify-between transition-all"
                  >
                    <span>
                      {totalPassengers} {totalPassengers > 1 ? 'Passengers' : 'Passenger'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>
                  <Users className="absolute left-3.5 top-3.5 w-4 h-4 text-[#C9A96E]/80 pointer-events-none" />

                  {/* Passenger Popover */}
                  {showPassengerPopover && (
                    <div className="absolute right-0 top-14 w-64 bg-[#111827] border border-[#C9A96E]/30 rounded-xl p-4 shadow-2xl z-50 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-white">{t.search.adults}</p>
                          <p className="text-slate-400 text-[10px]">Age 12+</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={passengers.adults <= 1}
                            onClick={() =>
                              setPassengers((p) => ({ ...p, adults: Math.max(1, p.adults - 1) }))
                            }
                            className="w-6 h-6 rounded bg-slate-800 text-white font-bold disabled:opacity-40"
                          >
                            -
                          </button>
                          <span className="font-mono text-white w-4 text-center">{passengers.adults}</span>
                          <button
                            type="button"
                            onClick={() => setPassengers((p) => ({ ...p, adults: p.adults + 1 }))}
                            className="w-6 h-6 rounded bg-slate-800 text-white font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-white">{t.search.children}</p>
                          <p className="text-slate-400 text-[10px]">Age 4-11</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={passengers.children <= 0}
                            onClick={() =>
                              setPassengers((p) => ({ ...p, children: Math.max(0, p.children - 1) }))
                            }
                            className="w-6 h-6 rounded bg-slate-800 text-white font-bold disabled:opacity-40"
                          >
                            -
                          </button>
                          <span className="font-mono text-white w-4 text-center">
                            {passengers.children}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setPassengers((p) => ({ ...p, children: p.children + 1 }))
                            }
                            className="w-6 h-6 rounded bg-slate-800 text-white font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-white">{t.search.seniors}</p>
                          <p className="text-slate-400 text-[10px]">Age 60+</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={passengers.seniors <= 0}
                            onClick={() =>
                              setPassengers((p) => ({ ...p, seniors: Math.max(0, p.seniors - 1) }))
                            }
                            className="w-6 h-6 rounded bg-slate-800 text-white font-bold disabled:opacity-40"
                          >
                            -
                          </button>
                          <span className="font-mono text-white w-4 text-center">
                            {passengers.seniors}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setPassengers((p) => ({ ...p, seniors: p.seniors + 1 }))
                            }
                            className="w-6 h-6 rounded bg-slate-800 text-white font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowPassengerPopover(false)}
                        className="w-full mt-2 py-1 bg-[#C9A96E] text-[#0B0F14] font-bold text-xs rounded-lg"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Bar: Cabin Class & SEARCH CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <span className="text-xs text-slate-400 whitespace-nowrap">{t.search.class}:</span>
              {[
                { id: 'all', label: t.search.allClasses },
                { id: 'soft_seat', label: 'Deluxe Soft Seat' },
                { id: 'sleeper_4', label: 'Luxury 4-Berth' },
                { id: 'vip_suite', label: 'VIP 2-Berth Suite' },
              ].map((cls) => (
                <button
                  key={cls.id}
                  type="button"
                  onClick={() => {
                    soundFx.playClick(850, 0.03);
                    setPreferredClass(cls.id as CabinClassType | 'all');
                  }}
                  className={`px-3 py-1 text-xs rounded-full border transition-all whitespace-nowrap ${
                    preferredClass === cls.id
                      ? 'bg-[#C9A96E]/20 border-[#C9A96E] text-[#D8B978] font-bold'
                      : 'border-slate-800 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  {cls.label}
                </button>
              ))}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              variant="gold_glow"
              className="w-full sm:w-auto px-8 py-3.5 text-sm tracking-wider uppercase"
              rightIcon={<Sparkles className="w-4 h-4 text-[#0B0F14]" />}
            >
              {t.search.searchBtn}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
