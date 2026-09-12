"use client";

import React, { useState } from "react";
import { Calendar, X, TrendingDown, ArrowRight, Sparkles } from "lucide-react";
import { soundFx } from "@/lib/audio";

interface DayFare {
  date: string;
  dayOfWeek: string;
  price: number;
  isLowest: boolean;
  status: "available" | "few_seats" | "busy";
}

const FARE_DAYS: DayFare[] = [
  {
    date: "12/09",
    dayOfWeek: "Hôm nay",
    price: 950000,
    isLowest: false,
    status: "few_seats",
  },
  {
    date: "13/09",
    dayOfWeek: "Chủ Nhật",
    price: 1150000,
    isLowest: false,
    status: "busy",
  },
  {
    date: "14/09",
    dayOfWeek: "Thứ Hai",
    price: 820000,
    isLowest: false,
    status: "available",
  },
  {
    date: "15/09",
    dayOfWeek: "Thứ Ba",
    price: 690000,
    isLowest: true,
    status: "available",
  },
  {
    date: "16/09",
    dayOfWeek: "Thứ Tư",
    price: 690000,
    isLowest: true,
    status: "available",
  },
  {
    date: "17/09",
    dayOfWeek: "Thứ Năm",
    price: 780000,
    isLowest: false,
    status: "available",
  },
  {
    date: "18/09",
    dayOfWeek: "Thứ Sáu",
    price: 980000,
    isLowest: false,
    status: "few_seats",
  },
  {
    date: "19/09",
    dayOfWeek: "Thứ Bảy",
    price: 1250000,
    isLowest: false,
    status: "busy",
  },
  {
    date: "20/09",
    dayOfWeek: "Chủ Nhật",
    price: 1100000,
    isLowest: false,
    status: "busy",
  },
  {
    date: "21/09",
    dayOfWeek: "Thứ Hai",
    price: 790000,
    isLowest: false,
    status: "available",
  },
  {
    date: "22/09",
    dayOfWeek: "Thứ Ba",
    price: 690000,
    isLowest: true,
    status: "available",
  },
  {
    date: "23/09",
    dayOfWeek: "Thứ Tư",
    price: 720000,
    isLowest: false,
    status: "available",
  },
  {
    date: "24/09",
    dayOfWeek: "Thứ Năm",
    price: 850000,
    isLowest: false,
    status: "available",
  },
  {
    date: "25/09",
    dayOfWeek: "Thứ Sáu",
    price: 1050000,
    isLowest: false,
    status: "few_seats",
  },
];

interface FareCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDate: (date: string) => void;
}

export const FareCalendarModal: React.FC<FareCalendarModalProps> = ({
  isOpen,
  onClose,
  onSelectDate,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>("15/09");

  if (!isOpen) return null;

  const currentFare =
    FARE_DAYS.find((d) => d.date === selectedDay) || FARE_DAYS[3];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#0E131A] border border-[#D8B978]/50 rounded-3xl shadow-2xl p-5 sm:p-7 overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#D8B978]/20 flex items-center justify-center text-[#D8B978]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-serif font-bold text-white">
                  Lịch Săn Vé Giá Tốt Nhất Theo Ngày
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#D8B978]/20 text-[#D8B978] border border-[#D8B978]/30">
                  SMART FARE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Tuyến Hà Nội ➔ Đà Nẵng / Sài Gòn (Cập nhật thời gian thực)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Highlight Banner */}
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-700/40 flex items-center justify-between gap-3 text-xs mb-5">
          <div className="flex items-center gap-2 text-emerald-300">
            <TrendingDown className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Mẹo tiết kiệm:</strong> Khởi hành vào Thứ 3 hoặc Thứ 4
              giúp quý khách tiết kiệm đến <strong>38%</strong> so với các
              chuyến cuối tuần!
            </span>
          </div>
        </div>

        {/* 14-Day Calendar Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 mb-6">
          {FARE_DAYS.map((day) => {
            const isSelected = selectedDay === day.date;
            return (
              <div
                key={day.date}
                onClick={() => {
                  soundFx.playHoverTick();
                  setSelectedDay(day.date);
                }}
                className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                  isSelected
                    ? "bg-[#18212D] border-[#D8B978] shadow-lg shadow-[#D8B978]/10 scale-105"
                    : "bg-[#121822] border-slate-800/80 hover:border-slate-700 hover:bg-[#151D29]"
                }`}
              >
                <div className="text-[11px] text-slate-400 font-mono">
                  {day.dayOfWeek}
                </div>
                <div className="text-base font-bold text-white my-1">
                  {day.date}
                </div>
                <div
                  className={`text-xs font-mono font-bold ${
                    day.isLowest ? "text-emerald-400" : "text-[#D8B978]"
                  }`}
                >
                  {(day.price / 1000).toFixed(0)}k ₫
                </div>
                {day.isLowest && (
                  <span className="mt-1 inline-block text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                    RẺ NHẤT
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Selection details */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div>
            <span className="text-xs text-slate-400">Ngày đang chọn:</span>
            <div className="text-base font-bold text-white flex items-center gap-2">
              <span>
                {currentFare.date} ({currentFare.dayOfWeek})
              </span>
              <span className="text-[#D8B978] font-mono">
                {currentFare.price.toLocaleString("vi-VN")} ₫
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
            >
              Hủy
            </button>
            <button
              onClick={() => {
                soundFx.playConfirmationTone();
                onSelectDate(currentFare.date);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D8B978] to-[#B8964B] text-[#0B0F14] font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-lg"
            >
              <span>Chọn Ngày Này & Tìm Chuyến</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
