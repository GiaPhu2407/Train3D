"use client";

import React, { useState, useEffect } from "react";
import {
  Radio,
  Gauge,
  Navigation,
  CloudSun,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Activity,
} from "lucide-react";

interface ActiveTrain {
  code: string;
  name: string;
  route: string;
  currentLocation: string;
  nextStation: string;
  speed: number;
  status: "On Time" | "Ahead of Schedule" | "Boarding" | "Departing Soon";
  weather: string;
  eta: string;
  pass: string;
  progressPercent: number;
}

const ACTIVE_TRAINS: ActiveTrain[] = [
  {
    code: "SE1 Royal",
    name: "Tàu Nhanh Hoàng Gia SE1",
    route: "Hà Nội ➔ TP. Hồ Chí Minh",
    currentLocation: "Đang vượt Đèo Hải Vân (Km 768)",
    nextStation: "Ga Đà Nẵng (Dự kiến đến 14:15)",
    speed: 84,
    status: "On Time",
    weather: "24°C • Mây mù nhẹ, cảnh biển ngoạn mục",
    eta: "32 phút nữa",
    pass: "Đèo Hải Vân",
    progressPercent: 54,
  },
  {
    code: "SE3 Express",
    name: "Tàu Di Sản Thống Nhất SE3",
    route: "Hà Nội ➔ Đà Nẵng",
    currentLocation: "Khu vực Cố Đô Huế (Km 688)",
    nextStation: "Ga Huế (Dự kiến đến 11:30)",
    speed: 91,
    status: "Ahead of Schedule",
    weather: "26°C • Nắng vàng nhẹ bên bờ sông Hương",
    eta: "18 phút nữa",
    pass: "Đèo Khe Nét",
    progressPercent: 78,
  },
  {
    code: "Lotus Luxury",
    name: "Chuyên Tàu 5 Sao Sen Vàng",
    route: "TP. Hồ Chí Minh ➔ Nha Trang",
    currentLocation: "Đoạn qua Vịnh Cam Ranh (Km 1315)",
    nextStation: "Ga Nha Trang (Dự kiến đến 17:45)",
    speed: 79,
    status: "On Time",
    weather: "29°C • Nắng trong, gió biển tươi mát",
    eta: "45 phút nữa",
    pass: "Đèo Cù Mông",
    progressPercent: 68,
  },
  {
    code: "Heritage Queen",
    name: "Tàu Hoàng Đế Du Ngoạn",
    route: "Đà Nẵng ➔ Quy Nhơn",
    currentLocation: "Bờ biển Sa Huỳnh (Km 982)",
    nextStation: "Ga Diêu Trì (Dự kiến đến 16:20)",
    speed: 82,
    status: "On Time",
    weather: "27°C • Trời xanh, sóng biển êm",
    eta: "25 phút nữa",
    pass: "Bờ biển Sa Huỳnh",
    progressPercent: 62,
  },
];

export const LiveTrainRadar: React.FC = () => {
  const [selectedTrain, setSelectedTrain] = useState<ActiveTrain>(
    ACTIVE_TRAINS[0],
  );
  const [livePulse, setLivePulse] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLivePulse((prev) => (prev + 1) % 100);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171E29] border border-[#D8B978]/30 text-[#D8B978] text-xs font-mono mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>HỆ THỐNG RADAR ĐIỀU ĐỘ THỜI GIAN THỰC (LIVE GPS)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-white">
            Bảng Vị Trí & Tốc Độ Đoàn Tàu Trực Tiếp
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Theo dõi vị trí vệ tinh, tốc độ hành trình và điều kiện thời tiết
            tại các cung đèo hùng vĩ dọc trục đường sắt Bắc - Nam.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto bg-[#0E131A] border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-slate-400">Tần số quét GPS:</span>
          <span className="text-emerald-400 font-bold">
            1.2 GHz • 100% Đồng bộ
          </span>
        </div>
      </div>

      {/* Main Radar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Train Selector List */}
        <div className="lg:col-span-5 space-y-3">
          {ACTIVE_TRAINS.map((train) => {
            const isSelected = selectedTrain.code === train.code;
            return (
              <div
                key={train.code}
                onClick={() => setSelectedTrain(train)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#151D28] border-[#D8B978] shadow-lg shadow-[#D8B978]/5 translate-x-1"
                    : "bg-[#0E131A] border-slate-800/80 hover:border-slate-700 hover:bg-[#121922]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">
                        {train.code}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-700/40 font-mono">
                        {train.status}
                      </span>
                    </div>
                    <div className="text-xs text-[#D8B978] font-medium mt-0.5">
                      {train.name}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5 font-mono">
                      <Navigation className="w-3 h-3 text-slate-500" />
                      {train.route}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-slate-400 font-mono">
                      Tốc độ
                    </div>
                    <div className="text-lg font-mono font-bold text-white flex items-center justify-end gap-1">
                      <span>{train.speed}</span>
                      <span className="text-[10px] text-slate-400">km/h</span>
                    </div>
                  </div>
                </div>

                {/* Micro progress bar */}
                <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#D8B978] to-emerald-400 h-full rounded-full transition-all duration-700"
                    style={{ width: `${train.progressPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Train Telemetry & Scenic View Card */}
        <div className="lg:col-span-7 bg-[#0E131A] border border-[#D8B978]/30 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
          {/* Radar background grid & scanline effect */}
          <div className="absolute inset-0 bg-[radial-gradient(#D8B978_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D8B978]/5 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Top Bar of Telemetry */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="text-lg font-serif font-bold text-white">
                  Đoàn Tàu: {selectedTrain.name}
                </h3>
              </div>
              <span className="font-mono text-xs text-[#D8B978] bg-[#D8B978]/10 px-3 py-1 rounded-full border border-[#D8B978]/30">
                MÃ HIỆU: {selectedTrain.code}
              </span>
            </div>

            {/* Visual Telemetry Gauges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-[#141A23] border border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Gauge className="w-4 h-4 text-[#D8B978]" />
                  <span>Vận tốc hiện tại</span>
                </div>
                <div className="text-2xl font-mono font-black text-white">
                  {selectedTrain.speed}{" "}
                  <span className="text-xs font-normal text-slate-400">
                    KM/H
                  </span>
                </div>
                <div className="text-[11px] text-emerald-400 font-mono mt-1">
                  Vận hành ổn định & êm ái
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#141A23] border border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Clock className="w-4 h-4 text-[#D8B978]" />
                  <span>Dự kiến đến ga</span>
                </div>
                <div className="text-2xl font-mono font-black text-white">
                  {selectedTrain.eta}
                </div>
                <div className="text-[11px] text-[#D8B978] font-mono mt-1">
                  Chính xác 99.8% theo GPS
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#141A23] border border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <CloudSun className="w-4 h-4 text-sky-400" />
                  <span>Thời tiết cung đường</span>
                </div>
                <div className="text-xs font-semibold text-white mt-1">
                  {selectedTrain.weather}
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-1">
                  Khí hậu lý tưởng thưởng ngoạn
                </div>
              </div>
            </div>

            {/* Current Position & Track Waypoint */}
            <div className="space-y-3 bg-[#111720] border border-slate-800/80 rounded-xl p-4 mb-6 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D8B978] shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-400 font-mono">
                    TỌA ĐỘ VÀ ĐỊA DANH HIỆN TẠI:
                  </div>
                  <div className="text-white font-medium text-sm mt-0.5">
                    {selectedTrain.currentLocation}
                  </div>
                </div>
              </div>

              <div className="h-px bg-slate-800" />

              <div className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-400 font-mono">
                    ĐIỂM ĐẾN TIẾP THEO:
                  </div>
                  <div className="text-emerald-300 font-medium text-sm mt-0.5">
                    {selectedTrain.nextStation}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#D8B978]" />
              <span>
                Tiếp sóng trực tiếp từ VNR & Hệ thống Vệ Tinh Đường Sắt
              </span>
            </div>
            <span className="font-mono text-[#D8B978]">Radar Ping: 24ms</span>
          </div>
        </div>
      </div>
    </section>
  );
};
