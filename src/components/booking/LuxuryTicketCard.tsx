'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Train, Download, QrCode, Volume2, CheckCircle2, Calendar, Sparkles, MapPin, User, ArrowRight, RotateCw } from 'lucide-react';
import { BookingState } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { formatDate, formatCurrency, Currency } from '@/lib/utils';
import { soundFx } from '@/lib/audio';

interface LuxuryTicketCardProps {
  booking: BookingState;
  currency: Currency;
  onReset: () => void;
}

export const LuxuryTicketCard: React.FC<LuxuryTicketCardProps> = ({
  booking,
  currency,
  onReset,
}) => {
  const train = booking.selectedTrain;
  const primaryPassenger = booking.passengers[0] || {
    fullName: 'NGUYEN VAN A',
    idNumber: '079201008921',
    email: '',
  };
  const seatsFormatted = booking.selectedSeats.map((s) => s.seatNumber).join(', ');
  const coachNumber = booking.selectedSeats[0]?.coachNumber || 1;
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  useEffect(() => {
    // 1. Confetti burst
    try {
      confetti({
        particleCount: 130,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#C9A96E', '#D8B978', '#F3E5AB', '#FFFFFF'],
      });
    } catch {
      // Confetti fallback
    }

    // 2. Automatically speak voice announcement: "Bạn đã mua vé thành công!"
    setIsPlayingVoice(true);
    soundFx.speakBookingSuccess('VI', primaryPassenger.fullName);
    const timer = setTimeout(() => setIsPlayingVoice(false), 5000);
    return () => clearTimeout(timer);
  }, [primaryPassenger.fullName]);

  const handleReplayVoice = (lang: 'VI' | 'EN') => {
    setIsPlayingVoice(true);
    soundFx.speakBookingSuccess(lang, primaryPassenger.fullName);
    setTimeout(() => setIsPlayingVoice(false), 5000);
  };

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-2">
      {/* Confirmation Success Header Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-2"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold tracking-wider">
          <CheckCircle2 className="w-4 h-4" />
          <span>RESERVATION CONFIRMED • PNR: {booking.bookingReference || 'RW-892104'}</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-black text-white">
          Đặt Vé Tàu Thành Công!
        </h2>
        <p className="text-xs md:text-sm text-slate-300 max-w-lg mx-auto">
          Vé điện tử VIP có mã QR xác thực đã được gửi tới{' '}
          <strong className="text-[#D8B978]">{primaryPassenger.email || 'hộp thư của bạn'}</strong>.
        </p>

        {/* 🎙️ Voice Announcement Widget */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#0F172A] border border-[#C9A96E]/40 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-mono text-[#D8B978]">
              <Volume2 className={`w-4 h-4 ${isPlayingVoice ? 'animate-bounce text-emerald-400' : 'text-[#C9A96E]'}`} />
              <span>{isPlayingVoice ? 'Đang phát thông báo giọng nói...' : 'Thông báo phát thanh ga tàu'}</span>
            </div>

            {/* Audio Waveform Bars */}
            <div className="flex items-center gap-0.5 h-4">
              {[0.4, 0.9, 0.6, 1, 0.5, 0.8].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full bg-[#C9A96E] transition-all duration-300 ${
                    isPlayingVoice ? 'animate-pulse' : 'opacity-40'
                  }`}
                  style={{ height: `${isPlayingVoice ? h * 16 : 4}px` }}
                />
              ))}
            </div>

            {/* Replay Buttons */}
            <button
              onClick={() => handleReplayVoice('VI')}
              className="px-2.5 py-1 rounded-lg bg-[#C9A96E]/20 hover:bg-[#C9A96E] text-[#D8B978] hover:text-[#0B0F14] text-[11px] font-bold font-mono transition-colors flex items-center gap-1"
            >
              <RotateCw className="w-3 h-3" />
              <span>Nghe lại (Tiếng Việt)</span>
            </button>
            <button
              onClick={() => handleReplayVoice('EN')}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 text-[11px] font-mono transition-colors"
            >
              <span>English</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Luxury E-Ticket Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="relative rounded-3xl bg-gradient-to-b from-[#111827] via-[#0B0F14] to-[#070A0E] border-2 border-[#C9A96E]/50 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(201,169,110,0.25)] overflow-hidden"
      >
        {/* Decorative Top Gold Foil Strip */}
        <div className="h-3 w-full bg-gradient-to-r from-[#8C6E38] via-[#F3E5AB] to-[#C9A96E]" />

        {/* Ticket Header */}
        <div className="p-6 md:p-8 border-b border-[#C9A96E]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#C9A96E]/15 border border-[#C9A96E]/40 flex items-center justify-center">
              <Train className="w-6 h-6 text-[#D8B978]" />
            </div>
            <div>
              <span className="font-serif font-black tracking-widest text-xl text-white">
                RAILWAY
              </span>
              <span className="text-[10px] text-[#C9A96E] uppercase font-mono tracking-widest block">
                Official Electronic Boarding Pass
              </span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] font-mono uppercase text-slate-400">Booking Reference</span>
            <p className="text-xl font-mono font-black text-[#D8B978] tracking-widest">
              {booking.bookingReference || 'RW-789012'}
            </p>
          </div>
        </div>

        {/* Main Journey Details Grid */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Route Banner */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0F172A]/80 border border-slate-800">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">GA ĐI (DEPARTURE)</span>
              <p className="text-lg md:text-xl font-serif font-bold text-white">
                {train?.fromStationName || 'Hanoi Central'}
              </p>
              <p className="text-xs font-mono text-[#D8B978]">{train?.departureTime || '19:25'}</p>
            </div>

            <div className="flex flex-col items-center px-4">
              <span className="text-[10px] font-mono text-slate-400">{train?.duration || '15h 35m'}</span>
              <div className="w-20 sm:w-32 h-[2px] bg-gradient-to-r from-[#C9A96E] to-[#D8B978] my-1" />
              <Train className="w-4 h-4 text-[#D8B978]" />
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase">GA ĐẾN (ARRIVAL)</span>
              <p className="text-lg md:text-xl font-serif font-bold text-white">
                {train?.toStationName || 'Da Nang Central'}
              </p>
              <p className="text-xs font-mono text-[#D8B978]">{train?.arrivalTime || '11:00'}</p>
            </div>
          </div>

          {/* Ticket Information Key-Values */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#0B0F14] border border-slate-800/80 text-xs">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">TÀU (TRAIN)</span>
              <span className="text-sm font-bold font-mono text-white">{train?.code || 'SE3'}</span>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">NGÀY ĐI (DATE)</span>
              <span className="text-sm font-bold font-mono text-white">
                {formatDate(booking.searchQuery.departureDate) || '12 Sep 2026'}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">TOA / GHẾ (SEAT)</span>
              <span className="text-sm font-bold font-mono text-[#D8B978]">
                Toa {coachNumber} • Chỗ {seatsFormatted || '12A'}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">HẠNG VÉ (CLASS)</span>
              <span className="text-sm font-bold text-white capitalize">
                {booking.selectedClass?.replace('_', ' ') || 'VIP Royal Suite'}
              </span>
            </div>
          </div>

          {/* Passenger & QR Code Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
            <div className="space-y-2 w-full sm:w-auto">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">HÀNH KHÁCH CHÍNH</span>
                <p className="text-base font-bold text-white tracking-wider">
                  {primaryPassenger.fullName.toUpperCase()}
                </p>
                <p className="text-xs font-mono text-slate-400">CCCD/Passport: {primaryPassenger.idNumber}</p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <span className="px-2.5 py-1 rounded bg-[#C9A96E]/15 border border-[#C9A96E]/40 text-[11px] font-mono text-[#D8B978]">
                  Cửa ưu tiên: VIP Fast-Track
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-800 text-[11px] font-mono text-slate-300">
                  Đã thanh toán: {formatCurrency(booking.totalPrice, currency)}
                </span>
              </div>
            </div>

            {/* Simulated Digital QR Boarding Pass */}
            <div className="flex flex-col items-center p-3 bg-white rounded-2xl border-2 border-[#C9A96E] shadow-xl shrink-0">
              <QrCode className="w-24 h-24 text-[#0B0F14]" />
              <span className="text-[9px] font-mono font-bold text-[#0B0F14] mt-1 tracking-widest">
                QUÉT TẠI CỬA GA
              </span>
            </div>
          </div>

          {/* Stylized Barcode at bottom of boarding pass */}
          <div className="pt-4 border-t border-dashed border-slate-800 flex flex-col items-center">
            <div className="flex items-center gap-1 h-8 opacity-75">
              {Array.from({ length: 42 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-slate-300 h-full"
                  style={{
                    width: `${(i % 3) + 1.5}px`,
                    opacity: (i * 7) % 4 === 0 ? 0.3 : 1,
                  }}
                />
              ))}
            </div>
            <span className="text-[9px] font-mono text-slate-500 tracking-[0.4em] mt-1">
              * 2026-RW-VN-EXPRESS-TICKET *
            </span>
          </div>
        </div>
      </motion.div>

      {/* Ticket Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Button
          variant="primary"
          size="lg"
          onClick={handlePrint}
          leftIcon={<Download className="w-4 h-4 text-[#0B0F14]" />}
        >
          Tải & In Vé Tàu
        </Button>

        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            soundFx.playChime();
            alert('Hành trình đã được lưu vào Lịch & Apple Wallet!');
          }}
          leftIcon={<Calendar className="w-4 h-4 text-slate-300" />}
        >
          Lưu Vào Lịch
        </Button>

        <Button variant="ghost" size="lg" onClick={onReset}>
          ← Về Trang Chủ
        </Button>
      </div>
    </div>
  );
};
