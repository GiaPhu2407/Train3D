'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, ShieldCheck, Utensils, Luggage, Sparkles, Check } from 'lucide-react';
import { Passenger, AddOnItem, Seat } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { formatCurrency, Currency } from '@/lib/utils';
import { soundFx } from '@/lib/audio';

interface PassengerFormProps {
  seats: Seat[];
  passengers: Passenger[];
  addOns: AddOnItem[];
  onPassengersSubmit: (passengers: Passenger[], addOns: AddOnItem[]) => void;
  onBack: () => void;
  currency: Currency;
  seatTotal: number;
}

export const PassengerForm: React.FC<PassengerFormProps> = ({
  seats,
  passengers: initialPassengers,
  addOns: initialAddOns,
  onPassengersSubmit,
  onBack,
  currency,
  seatTotal,
}) => {
  // Initialize passengers based on seats
  const [passengersList, setPassengersList] = useState<Passenger[]>(() => {
    if (initialPassengers && initialPassengers.length === seats.length) {
      return initialPassengers;
    }
    return seats.map((seat, idx) => ({
      id: `p-${idx + 1}`,
      seatId: seat.id,
      seatNumber: seat.seatNumber,
      fullName: idx === 0 ? 'Nguyen Van An' : `Passenger ${idx + 1}`,
      idNumber: idx === 0 ? '079201008921' : '079201008922',
      email: idx === 0 ? 'nguyen.an@luxury-travel.vn' : '',
      phone: idx === 0 ? '+84 908 123 456' : '',
      passengerType: 'adult',
      mealPreference: 'fine_dining_vietnamese',
      baggage: 'luxury_35kg_priority',
    }));
  });

  const [availableAddOns, setAvailableAddOns] = useState<AddOnItem[]>([
    {
      id: 'lounge_pass',
      name: 'VIP Executive Station Lounge Pass',
      description: 'Exclusive access to private lounge, high-speed Wi-Fi, gourmet buffet & shower suites.',
      price: 180000,
      icon: 'sparkles',
      selected: true,
    },
    {
      id: 'gourmet_meal_box',
      name: 'Chef’s Imperial 3-Course Dinner Set',
      description: 'Handcrafted seasonal dishes with premium wine pairing served directly to your seat.',
      price: 250000,
      icon: 'utensils',
      selected: false,
    },
    {
      id: 'travel_insurance',
      name: 'Comprehensive Rail Travel Protection',
      description: '100% trip cancellation, medical coverage, and lost luggage instant compensation.',
      price: 95000,
      icon: 'shield',
      selected: true,
    },
  ]);

  const handlePassengerChange = (index: number, field: keyof Passenger, value: string) => {
    setPassengersList((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const toggleAddOn = (id: string) => {
    soundFx.playClick();
    setAvailableAddOns((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const addOnTotal = availableAddOns
    .filter((item) => item.selected)
    .reduce((acc, item) => acc + item.price, 0);

  const grandTotal = seatTotal + addOnTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick(950, 0.05);
    onPassengersSubmit(passengersList, availableAddOns.filter((a) => a.selected));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="p-4 rounded-xl bg-[#0B0F14]/80 border border-[#C9A96E]/20 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono text-[#D8B978]">STEP 4 OF 6</span>
          <h3 className="text-xl font-serif font-bold text-white">Passenger Details & Travel Services</h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Encrypted Passenger Data</span>
        </div>
      </div>

      {/* Passenger Input Cards */}
      <div className="space-y-6">
        {passengersList.map((p, idx) => (
          <div
            key={p.id}
            className="p-6 rounded-2xl bg-[#0F172A]/90 border border-slate-800 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#C9A96E]/20 text-[#D8B978] flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </div>
                <h4 className="text-base font-serif font-bold text-white">
                  Passenger {idx + 1} {idx === 0 ? '(Primary Contact)' : ''}
                </h4>
              </div>
              <span className="px-3 py-1 rounded-md bg-[#111827] border border-[#C9A96E]/40 text-xs font-mono text-[#D8B978]">
                Seat: {p.seatNumber}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase font-semibold">
                  Full Name (as in Passport/ID) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={p.fullName}
                    onChange={(e) => handlePassengerChange(idx, 'fullName', e.target.value)}
                    placeholder="e.g. NGUYEN VAN A"
                    className="w-full h-11 bg-[#0B0F14] border border-slate-700 focus:border-[#C9A96E] rounded-xl px-3 pl-9 text-xs text-white focus:outline-none"
                  />
                  <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
                </div>
              </div>

              {/* ID / Passport Number */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase font-semibold">
                  Passport / Citizen ID *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={p.idNumber}
                    onChange={(e) => handlePassengerChange(idx, 'idNumber', e.target.value)}
                    placeholder="e.g. 079201008921"
                    className="w-full h-11 bg-[#0B0F14] border border-slate-700 focus:border-[#C9A96E] rounded-xl px-3 pl-9 text-xs text-white focus:outline-none"
                  />
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
                </div>
              </div>

              {/* Email (Primary) */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase font-semibold">
                  Email Address {idx === 0 ? '*' : '(Optional)'}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required={idx === 0}
                    value={p.email}
                    onChange={(e) => handlePassengerChange(idx, 'email', e.target.value)}
                    placeholder="e.g. guest@railway.vn"
                    className="w-full h-11 bg-[#0B0F14] border border-slate-700 focus:border-[#C9A96E] rounded-xl px-3 pl-9 text-xs text-white focus:outline-none"
                  />
                  <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
                </div>
              </div>

              {/* Phone (Primary) */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase font-semibold">
                  Mobile Number {idx === 0 ? '*' : '(Optional)'}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required={idx === 0}
                    value={p.phone}
                    onChange={(e) => handlePassengerChange(idx, 'phone', e.target.value)}
                    placeholder="e.g. +84 908 123 456"
                    className="w-full h-11 bg-[#0B0F14] border border-slate-700 focus:border-[#C9A96E] rounded-xl px-3 pl-9 text-xs text-white focus:outline-none"
                  />
                  <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
                </div>
              </div>
            </div>

            {/* Meal & Luggage Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase font-semibold">
                  Onboard Dining Preference
                </label>
                <div className="relative">
                  <select
                    value={p.mealPreference}
                    onChange={(e) => handlePassengerChange(idx, 'mealPreference', e.target.value)}
                    className="w-full h-10 bg-[#0B0F14] border border-slate-700 focus:border-[#C9A96E] rounded-xl px-3 pl-9 text-xs text-white focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="fine_dining_vietnamese">Fine Dining Traditional Vietnamese Set</option>
                    <option value="continental_breakfast">Continental Gourmet Pastry & Fruit</option>
                    <option value="vegetarian_deluxe">Vegetarian Deluxe Organic Set</option>
                    <option value="none">No Special Meal Needed</option>
                  </select>
                  <Utensils className="w-3.5 h-3.5 text-[#C9A96E] absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase font-semibold">
                  Luggage Allowance
                </label>
                <div className="relative">
                  <select
                    value={p.baggage}
                    onChange={(e) => handlePassengerChange(idx, 'baggage', e.target.value)}
                    className="w-full h-10 bg-[#0B0F14] border border-slate-700 focus:border-[#C9A96E] rounded-xl px-3 pl-9 text-xs text-white focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="luxury_35kg_priority">Luxury Priority Baggage (Up to 35kg)</option>
                    <option value="standard_20kg">Standard Cabin Luggage (Up to 20kg)</option>
                  </select>
                  <Luggage className="w-3.5 h-3.5 text-[#C9A96E] absolute left-3 top-3" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Luxury Add-ons Section */}
      <div className="space-y-4">
        <h4 className="text-base font-serif font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D8B978]" />
          <span>Enhance Your Rail Journey (Optional Add-ons)</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {availableAddOns.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleAddOn(item.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                item.selected
                  ? 'bg-[#1E293B] border-[#C9A96E] shadow-[0_0_15px_rgba(201,169,110,0.2)]'
                  : 'bg-[#0F172A] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-xs font-bold text-white">{item.name}</h5>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      item.selected
                        ? 'bg-[#C9A96E] border-[#C9A96E] text-[#0B0F14]'
                        : 'border-slate-600'
                    }`}
                  >
                    {item.selected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 uppercase font-mono">Add-on</span>
                <span className="text-xs font-mono font-bold text-[#D8B978]">
                  +{formatCurrency(item.price, currency)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grand Total & Action Bar */}
      <div className="p-5 rounded-2xl bg-[#0F172A] border border-[#C9A96E]/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <span className="text-xs text-slate-400">Total Price (Seats + Services):</span>
          <p className="text-2xl font-mono font-bold text-[#D8B978]">
            {formatCurrency(grandTotal, currency)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button type="button" variant="ghost" onClick={onBack}>
            ← Back
          </Button>
          <Button type="submit" variant="primary" size="lg" className="px-8">
            Proceed to Payment →
          </Button>
        </div>
      </div>
    </form>
  );
};
