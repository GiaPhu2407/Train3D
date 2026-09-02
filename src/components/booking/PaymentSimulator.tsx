'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, QrCode, Building2, ShieldCheck, Lock, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatCurrency, Currency } from '@/lib/utils';
import { soundFx } from '@/lib/audio';

interface PaymentSimulatorProps {
  totalAmount: number;
  currency: Currency;
  onPaymentSuccess: (method: 'credit_card' | 'vnpay_qr' | 'momo' | 'bank_transfer') => void;
  onBack: () => void;
}

export const PaymentSimulator: React.FC<PaymentSimulatorProps> = ({
  totalAmount,
  currency,
  onPaymentSuccess,
  onBack,
}) => {
  const [method, setMethod] = useState<'credit_card' | 'vnpay_qr' | 'bank_transfer'>('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Card form state
  const [cardNumber, setCardNumber] = useState('4532 8901 2345 6789');
  const [cardHolder, setCardHolder] = useState('NGUYEN VAN AN');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('888');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    soundFx.playDepartureChime();

    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess(method);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4 rounded-xl bg-[#0B0F14]/80 border border-[#C9A96E]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-mono text-[#D8B978]">STEP 5 OF 6</span>
          <h3 className="text-xl font-serif font-bold text-white">Select Payment & Confirm Reservation</h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400">Total Amount Due</span>
          <p className="text-xl font-mono font-bold text-[#D8B978]">
            {formatCurrency(totalAmount, currency)}
          </p>
        </div>
      </div>

      {/* Payment Method Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          {
            id: 'credit_card',
            label: 'Credit / Debit Card',
            icon: CreditCard,
            sub: 'Visa, Mastercard, JCB, Amex',
          },
          {
            id: 'vnpay_qr',
            label: 'QR Pay (VNPay / MoMo)',
            icon: QrCode,
            sub: 'Instant Mobile Banking Scan',
          },
          {
            id: 'bank_transfer',
            label: 'Fast Bank Transfer',
            icon: Building2,
            sub: 'VietQR 24/7 Napas Link',
          },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = method === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                soundFx.playClick();
                setMethod(tab.id as 'credit_card' | 'vnpay_qr' | 'bank_transfer');
              }}
              className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-start gap-3 ${
                isSelected
                  ? 'bg-[#1E293B] border-[#C9A96E] shadow-[0_0_15px_rgba(201,169,110,0.25)]'
                  : 'bg-[#0F172A] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-[#C9A96E] text-[#0B0F14]' : 'bg-[#111827] text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">{tab.label}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{tab.sub}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Method Content */}
      <form onSubmit={handlePay} className="space-y-6">
        {method === 'credit_card' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Visual Credit Card Preview (Cols 1-5) */}
            <div className="lg:col-span-5">
              <div className="relative w-full aspect-[1.58/1] rounded-2xl bg-gradient-to-tr from-[#0F172A] via-[#1E293B] to-[#334155] border border-[#C9A96E]/50 p-6 flex flex-col justify-between shadow-2xl overflow-hidden">
                {/* Gold Foil Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A96E]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between">
                  <span className="font-serif font-black tracking-widest text-[#D8B978] text-sm">
                    RAILWAY ELITE
                  </span>
                  <div className="w-8 h-6 bg-[#D8B978]/40 rounded-xs border border-[#D8B978] flex items-center justify-center">
                    <div className="w-4 h-3 border border-[#0B0F14]/40" />
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="font-mono text-base sm:text-lg tracking-widest text-white drop-shadow-md">
                    {cardNumber || '•••• •••• •••• ••••'}
                  </p>
                  <div className="flex justify-between items-end text-[11px] text-slate-300">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 block">
                        Card Holder
                      </span>
                      <span className="font-mono font-bold tracking-wider">{cardHolder || 'NAME'}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 block">
                        Expires
                      </span>
                      <span className="font-mono font-bold">{cardExpiry || 'MM/YY'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Inputs (Cols 6-12) */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase font-semibold">
                  Card Number
                </label>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="4532 8901 2345 6789"
                  className="w-full h-11 bg-[#0B0F14] border border-slate-700 focus:border-[#C9A96E] rounded-xl px-3.5 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase font-semibold">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  placeholder="NGUYEN VAN A"
                  className="w-full h-11 bg-[#0B0F14] border border-slate-700 focus:border-[#C9A96E] rounded-xl px-3.5 text-xs text-white uppercase focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1 uppercase font-semibold">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    required
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full h-11 bg-[#0B0F14] border border-slate-700 focus:border-[#C9A96E] rounded-xl px-3.5 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1 uppercase font-semibold">
                    CVV / CVC
                  </label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    placeholder="888"
                    className="w-full h-11 bg-[#0B0F14] border border-slate-700 focus:border-[#C9A96E] rounded-xl px-3.5 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {method === 'vnpay_qr' && (
          <div className="p-8 rounded-2xl bg-[#0F172A] border border-slate-800 flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-white rounded-2xl shadow-2xl border-4 border-[#C9A96E]">
              {/* Simulated QR Code SVG */}
              <div className="w-44 h-44 bg-white flex items-center justify-center p-2">
                <QrCode className="w-full h-full text-[#0B0F14]" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-white">Scan with Mobile Banking or VNPay / MoMo App</p>
              <p className="text-xs text-slate-400">QR Code expires automatically in 14:59</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D8B978] bg-[#0B0F14] px-4 py-1.5 rounded-full border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Awaiting payment confirmation...</span>
            </div>
          </div>
        )}

        {method === 'bank_transfer' && (
          <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white">24/7 Napas Bank Transfer Account</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 bg-[#0B0F14] rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Beneficiary Bank</span>
                <span className="text-white font-bold text-sm">Vietcombank (VCB)</span>
              </div>
              <div className="p-3 bg-[#0B0F14] rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Account Number</span>
                <span className="text-[#D8B978] font-bold text-sm">9988 2026 8888</span>
              </div>
              <div className="p-3 bg-[#0B0F14] rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Account Name</span>
                <span className="text-white font-bold text-sm">RAILWAY LUXURY CORP</span>
              </div>
              <div className="p-3 bg-[#0B0F14] rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Transfer Description</span>
                <span className="text-white font-bold text-sm">RW SE3 BOOKING</span>
              </div>
            </div>
          </div>
        )}

        {/* Security & Action */}
        <div className="p-5 rounded-2xl bg-[#0F172A] border border-[#C9A96E]/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-white">256-Bit SSL Bank Grade Security</p>
              <p className="text-[10px] text-slate-400">Direct booking guarantee with Vietnam Railway API</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button type="button" variant="ghost" onClick={onBack} disabled={isProcessing}>
              ← Back
            </Button>
            <Button
              type="submit"
              variant="gold_glow"
              size="lg"
              isLoading={isProcessing}
              className="px-8 w-full sm:w-auto"
              rightIcon={<Sparkles className="w-4 h-4 text-[#0B0F14]" />}
            >
              {isProcessing ? 'Processing...' : `Authorize & Issue Ticket (${formatCurrency(totalAmount, currency)})`}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
