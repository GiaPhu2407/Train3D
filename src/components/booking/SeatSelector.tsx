'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Train, Info, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { Seat, Coach, CabinClassType } from '@/lib/types';
import { generateCoachSeats } from '@/data/trains';
import { Button } from '@/components/ui/Button';
import { formatCurrency, Currency } from '@/lib/utils';
import { soundFx } from '@/lib/audio';

interface SeatSelectorProps {
  classType: CabinClassType;
  passengerCount: number;
  selectedSeats: Seat[];
  onSeatsChange: (seats: Seat[]) => void;
  onContinue: () => void;
  onBack: () => void;
  currency: Currency;
  trainName: string;
}

export const SeatSelector: React.FC<SeatSelectorProps> = ({
  classType,
  passengerCount,
  selectedSeats,
  onSeatsChange,
  onContinue,
  onBack,
  currency,
  trainName,
}) => {
  const [activeCoachNum, setActiveCoachNum] = useState(1);

  // Generate coaches
  const coach1 = useMemo(() => generateCoachSeats(1, classType), [classType]);
  const coach2 = useMemo(() => generateCoachSeats(2, classType), [classType]);

  const activeCoach = activeCoachNum === 1 ? coach1 : coach2;

  // Group seats by row
  const rowsMap = useMemo(() => {
    const map = new Map<number, { A?: Seat; B?: Seat; C?: Seat; D?: Seat }>();
    activeCoach.seats.forEach((seat) => {
      if (!map.has(seat.row)) {
        map.set(seat.row, {});
      }
      const rowObj = map.get(seat.row)!;
      rowObj[seat.col] = seat;
    });
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [activeCoach]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'occupied') {
      soundFx.playClick(300, 0.08); // Error low click
      return;
    }

    const isAlreadySelected = selectedSeats.some((s) => s.id === seat.id);

    if (isAlreadySelected) {
      soundFx.playClick(600, 0.04);
      onSeatsChange(selectedSeats.filter((s) => s.id !== seat.id));
    } else {
      if (selectedSeats.length >= passengerCount) {
        // Replace oldest or cap at passenger count
        soundFx.playClick(1000, 0.05);
        if (passengerCount === 1) {
          onSeatsChange([seat]);
        } else {
          onSeatsChange([...selectedSeats.slice(1), seat]);
        }
      } else {
        soundFx.playClick(1050, 0.05);
        onSeatsChange([...selectedSeats, seat]);
      }
    }
  };

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((acc, s) => acc + s.price, 0);
  }, [selectedSeats]);

  const isSeatSelected = (seatId: string) => selectedSeats.some((s) => s.id === seatId);

  return (
    <div className="space-y-6">
      {/* Header & Instructions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0B0F14]/80 border border-[#C9A96E]/20">
        <div>
          <span className="text-xs font-mono text-[#D8B978]">STEP 3 OF 6</span>
          <h3 className="text-xl font-serif font-bold text-white">
            Select {passengerCount} {passengerCount > 1 ? 'Seats / Berths' : 'Seat'} on {trainName}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Click available green-bordered seats to assign them to your booking.
          </p>
        </div>

        {/* Coach Tabs */}
        <div className="flex items-center gap-2 bg-[#111827] p-1 rounded-xl border border-slate-700/60">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              setActiveCoachNum(1);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeCoachNum === 1
                ? 'bg-[#C9A96E] text-[#0B0F14] shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Coach 01
          </button>
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              setActiveCoachNum(2);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeCoachNum === 2
                ? 'bg-[#C9A96E] text-[#0B0F14] shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Coach 02
          </button>
        </div>
      </div>

      {/* Seat Status Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 py-2 px-4 rounded-xl bg-[#0B0F14]/50 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#1E293B] border border-[#C9A96E]/50" />
          <span className="text-slate-300">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-r from-[#C9A96E] to-[#D8B978] shadow-[0_0_10px_#C9A96E]" />
          <span className="text-white font-bold">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#0F172A] border border-slate-800 opacity-40" />
          <span className="text-slate-500">Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D8B978]" />
          <span className="text-slate-400">Window seats marked A & D</span>
        </div>
      </div>

      {/* Visual Train Carriage Layout */}
      <div className="relative max-w-2xl mx-auto p-6 md:p-8 rounded-3xl bg-[#070A0E] border-2 border-slate-800 shadow-2xl">
        {/* Train Locomotive Head Direction Indicator */}
        <div className="flex items-center justify-center gap-2 pb-6 border-b border-slate-800 text-xs font-mono text-slate-400 uppercase tracking-widest">
          <Train className="w-4 h-4 text-[#D8B978]" />
          <span>▲ Direction of Travel (Locomotive Front) ▲</span>
        </div>

        {/* Coach Seats Grid */}
        <div className="py-6 space-y-3">
          {rowsMap.map(([rowNum, rowSeats]) => (
            <div key={rowNum} className="flex items-center justify-between gap-2 md:gap-4">
              {/* Left Side: Seats A & B */}
              <div className="flex items-center gap-2">
                {['A', 'B'].map((col) => {
                  const seat = rowSeats[col as 'A' | 'B'];
                  if (!seat) return <div key={col} className="w-12 h-12" />;

                  const isSelected = isSeatSelected(seat.id);
                  const isOccupied = seat.status === 'occupied';

                  return (
                    <button
                      key={seat.id}
                      type="button"
                      disabled={isOccupied}
                      onClick={() => handleSeatClick(seat)}
                      className={`relative w-11 h-11 md:w-13 md:h-13 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-xs transition-all duration-200 transform ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#F3E5AB] via-[#D8B978] to-[#C9A96E] text-[#0B0F14] shadow-[0_0_15px_rgba(201,169,110,0.8)] scale-105 z-10'
                          : isOccupied
                          ? 'bg-[#111827]/40 text-slate-600 border border-slate-800/80 cursor-not-allowed opacity-40'
                          : 'bg-[#1E293B]/90 text-slate-200 border border-[#C9A96E]/30 hover:border-[#C9A96E] hover:bg-[#C9A96E]/15 hover:scale-105'
                      }`}
                    >
                      <span>{seat.seatNumber}</span>
                      {seat.isWindow && !isSelected && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C9A96E]/80" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Center Aisle Indicator */}
              <div className="flex-1 flex flex-col items-center justify-center border-x border-dashed border-slate-800/60 py-1">
                <span className="text-[10px] font-mono text-slate-600 tracking-wider">
                  ROW {rowNum < 10 ? `0${rowNum}` : rowNum}
                </span>
              </div>

              {/* Right Side: Seats C & D */}
              <div className="flex items-center gap-2">
                {['C', 'D'].map((col) => {
                  const seat = rowSeats[col as 'C' | 'D'];
                  if (!seat) return <div key={col} className="w-12 h-12" />;

                  const isSelected = isSeatSelected(seat.id);
                  const isOccupied = seat.status === 'occupied';

                  return (
                    <button
                      key={seat.id}
                      type="button"
                      disabled={isOccupied}
                      onClick={() => handleSeatClick(seat)}
                      className={`relative w-11 h-11 md:w-13 md:h-13 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-xs transition-all duration-200 transform ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#F3E5AB] via-[#D8B978] to-[#C9A96E] text-[#0B0F14] shadow-[0_0_15px_rgba(201,169,110,0.8)] scale-105 z-10'
                          : isOccupied
                          ? 'bg-[#111827]/40 text-slate-600 border border-slate-800/80 cursor-not-allowed opacity-40'
                          : 'bg-[#1E293B]/90 text-slate-200 border border-[#C9A96E]/30 hover:border-[#C9A96E] hover:bg-[#C9A96E]/15 hover:scale-105'
                      }`}
                    >
                      <span>{seat.seatNumber}</span>
                      {seat.isWindow && !isSelected && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C9A96E]/80" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Coach End Gangway */}
        <div className="pt-4 border-t border-slate-800 text-center text-[11px] font-mono text-slate-500">
          ▼ Coach End • Restrooms & Luggage Bay ▼
        </div>
      </div>

      {/* Realtime Live Price Summary Sticky Bar */}
      <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#C9A96E]/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/10 border border-[#C9A96E]/30 flex items-center justify-center">
            <Train className="w-5 h-5 text-[#D8B978]" />
          </div>
          <div>
            <p className="text-xs text-slate-400">
              Selected Seats ({selectedSeats.length}/{passengerCount}):
            </p>
            <p className="text-sm font-mono font-bold text-white">
              {selectedSeats.length > 0
                ? selectedSeats.map((s) => `Coach ${s.coachNumber}-${s.seatNumber}`).join(', ')
                : 'No seat selected yet'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs text-slate-400">Total Fare:</p>
            <p className="text-2xl font-mono font-bold text-[#D8B978]">
              {formatCurrency(totalPrice, currency)}
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            disabled={selectedSeats.length !== passengerCount}
            onClick={onContinue}
            className="px-8"
          >
            Continue to Passenger Info →
          </Button>
        </div>
      </div>

      <div className="flex justify-start">
        <Button variant="ghost" onClick={onBack}>
          ← Back to Class Selection
        </Button>
      </div>
    </div>
  );
};
