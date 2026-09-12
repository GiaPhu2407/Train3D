"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Calendar,
  Search,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Train,
  Radio,
  Utensils,
  BedDouble,
  Award,
  Star,
  Compass,
  PhoneCall,
} from "lucide-react";
import { LiveTrainRadar } from "./LiveTrainRadar";
import { CabinSuiteExplorer } from "./CabinSuiteExplorer";
import { GourmetDiningMenu } from "./GourmetDiningMenu";
import { TicketLookupModal } from "./TicketLookupModal";
import { FareCalendarModal } from "./FareCalendarModal";
import { BookingFlowModal } from "@/components/booking/BookingFlowModal";
import { STATIONS } from "@/data/stations";
import { BookingSearchQuery } from "@/lib/types";
import { soundFx } from "@/lib/audio";

interface V2NewExperienceProps {
  onOpenClassicBooking?: () => void;
}

export const V2NewExperience: React.FC<V2NewExperienceProps> = () => {
  const [tripType, setTripType] = useState<
    "one_way" | "round_trip" | "charter"
  >("one_way");
  const [fromStation, setFromStation] = useState("HAN");
  const [toStation, setToStation] = useState("DAD");
  const [departureDate, setDepartureDate] = useState("2026-09-15");
  const [returnDate, setReturnDate] = useState("2026-09-20");
  const [adults, setAdults] = useState(1);

  // Modals state
  const [isTicketLookupOpen, setIsTicketLookupOpen] = useState(false);
  const [isFareCalendarOpen, setIsFareCalendarOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<BookingSearchQuery | null>(
    null,
  );

  const handleStartBooking = () => {
    soundFx.playDepartureChime();
    setSearchQuery({
      tripType: tripType === "round_trip" ? "round_trip" : "one_way",
      fromStationId: fromStation,
      toStationId: toStation,
      departureDate,
      returnDate: tripType === "round_trip" ? returnDate : undefined,
      passengersCount: { adults, children: 0, seniors: 0 },
      preferredClass: "all",
    });
    setIsBookingModalOpen(true);
  };

  const handleCabinBooking = (tierId: string) => {
    soundFx.playDepartureChime();
    setSearchQuery({
      tripType: "one_way",
      fromStationId: fromStation,
      toStationId: toStation,
      departureDate,
      passengersCount: { adults: 1, children: 0, seniors: 0 },
      preferredClass: tierId === "presidential" ? "vip_suite" : "sleeper_4",
    });
    setIsBookingModalOpen(true);
  };

  const handleCalendarPick = (dateStr: string) => {
    // Format to 2026-09-XX
    const day = dateStr.split("/")[0];
    setDepartureDate(`2026-09-${day}`);
    handleStartBooking();
  };

  return (
    <div className="min-h-screen bg-[#070A0E] text-slate-100 selection:bg-[#D8B978] selection:text-[#0B0F14]">
      {/* 1. HERO SECTION V2.0 */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#D8B978]/15 via-[#B8964B]/5 to-transparent blur-3xl pointer-events-none rounded-full" />
        <div className="absolute -top-10 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto space-y-6 relative z-10">
          {/* Version Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#161D27] border border-[#D8B978]/40 shadow-lg shadow-[#D8B978]/10 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[#D8B978] font-bold tracking-wider uppercase">
              BẢN CẬP NHẬT V2.0 ROYAL EXPRESS ĐÃ SẴN SÀNG
            </span>
            <span className="h-3 w-px bg-slate-700" />
            <span className="text-slate-400 hidden sm:inline">
              Trải Nghiệm Đỉnh Cao
            </span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black text-white tracking-tight leading-[1.1]">
            Đường Sắt Hạng Sang Việt Nam <br />
            <span className="bg-gradient-to-r from-[#F3E5AB] via-[#D8B978] to-[#99732B] bg-clip-text text-transparent italic">
              Đẳng Cấp Vương Giả 5 Sao
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Tận hưởng hành trình xuyên Việt trên những toa tàu sang trọng bậc
            nhất. Toa tổng thống riêng tư, ẩm thực cung đình chế biến trực tiếp,
            và ngắm nhìn di sản thiên nhiên qua khung kính rộng tràn viền.
          </p>

          {/* Quick Action Shortcut Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setIsTicketLookupOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#121822] border border-slate-700 hover:border-[#D8B978] text-xs font-medium text-slate-200 hover:text-[#D8B978] transition-all"
            >
              <Search className="w-3.5 h-3.5 text-[#D8B978]" />
              <span>Tra Cứu Vé & QR Boarding Pass</span>
            </button>

            <button
              onClick={() => setIsFareCalendarOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#121822] border border-slate-700 hover:border-[#D8B978] text-xs font-medium text-slate-200 hover:text-[#D8B978] transition-all"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lịch Vé Rẻ Theo Ngày (-38%)</span>
            </button>

            <a
              href="#live-radar"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#121822] border border-slate-700 hover:border-[#D8B978] text-xs font-medium text-slate-200 hover:text-[#D8B978] transition-all"
            >
              <Radio className="w-3.5 h-3.5 text-sky-400" />
              <span>Radar Vị Trí Tàu Trực Tiếp</span>
            </a>
          </div>
        </div>

        {/* 2. REVOLUTIONARY QUICK BOOKING SEARCH ENGINE */}
        <div className="mt-12 max-w-5xl mx-auto bg-[#0E131A]/95 border border-[#D8B978]/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-20">
          {/* Trip Type Tabs */}
          <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4 overflow-x-auto no-scrollbar">
            {[
              { id: "one_way", label: "Một Chiều" },
              { id: "round_trip", label: "Khứ Hồi" },
              { id: "charter", label: "Thuê Trọn Toa VIP" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTripType(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  tripType === tab.id
                    ? "bg-[#D8B978] text-[#0B0F14] font-bold shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* From Station */}
            <div className="p-3 rounded-2xl bg-[#141A23] border border-slate-700/80 hover:border-[#D8B978]/60 transition-colors">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Ga Xuất Phát
              </label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D8B978] shrink-0" />
                <select
                  value={fromStation}
                  onChange={(e) => setFromStation(e.target.value)}
                  className="w-full bg-transparent text-white font-bold text-sm focus:outline-none cursor-pointer"
                >
                  {STATIONS.map((s) => (
                    <option
                      key={s.id}
                      value={s.id}
                      className="bg-[#141A23] text-white"
                    >
                      {s.name} ({s.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* To Station */}
            <div className="p-3 rounded-2xl bg-[#141A23] border border-slate-700/80 hover:border-[#D8B978]/60 transition-colors">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Ga Điểm Đến
              </label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <select
                  value={toStation}
                  onChange={(e) => setToStation(e.target.value)}
                  className="w-full bg-transparent text-white font-bold text-sm focus:outline-none cursor-pointer"
                >
                  {STATIONS.map((s) => (
                    <option
                      key={s.id}
                      value={s.id}
                      className="bg-[#141A23] text-white"
                    >
                      {s.name} ({s.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Departure Date */}
            <div className="p-3 rounded-2xl bg-[#141A23] border border-slate-700/80 hover:border-[#D8B978]/60 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Ngày Khởi Hành
                </label>
                <button
                  type="button"
                  onClick={() => setIsFareCalendarOpen(true)}
                  className="text-[10px] text-emerald-400 hover:underline font-mono"
                >
                  Giá rẻ nhất?
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D8B978] shrink-0" />
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full bg-transparent text-white font-bold text-sm focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Passengers & Class */}
            <div className="p-3 rounded-2xl bg-[#141A23] border border-slate-700/80 hover:border-[#D8B978]/60 transition-colors">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Hành Khách
              </label>
              <div className="flex items-center justify-between">
                <div className="text-white font-bold text-sm">
                  {adults} Người Lớn
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                    className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs flex items-center justify-center text-slate-300"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdults((prev) => Math.min(8, prev + 1))}
                    className="w-6 h-6 rounded bg-[#D8B978]/20 hover:bg-[#D8B978] hover:text-[#0B0F14] text-xs flex items-center justify-center text-[#D8B978]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Search CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#D8B978]" />
              <span>Cam kết giữ chỗ 100% • Hủy vé miễn phí trước 24h</span>
            </div>

            <button
              onClick={handleStartBooking}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#D8B978] via-[#F3E5AB] to-[#C9A96E] text-[#0B0F14] font-bold text-sm sm:text-base shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Tìm Chuyến Tàu & Chọn Chỗ Ngồi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. LIVE TRAIN RADAR COMPONENT */}
      <div id="live-radar">
        <LiveTrainRadar />
      </div>

      {/* 4. CABIN SUITE 360° EXPLORER */}
      <div id="cabins">
        <CabinSuiteExplorer onSelectCabinForBooking={handleCabinBooking} />
      </div>

      {/* 5. GOURMET DINING MENU PRE-ORDER */}
      <div id="dining">
        <GourmetDiningMenu />
      </div>

      {/* 6. FOUR LUXURY TRUST PILLARS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#0E131A] border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-[#D8B978]/20 flex items-center justify-center text-[#D8B978] mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-white text-base mb-1">
              Toa Tàu Tiêu Chuẩn 5 Sao
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hệ thống toa đóng mới hiện đại với giảm xóc bóng hơi nhập khẩu,
              triệt tiêu rung lắc tối đa.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0E131A] border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-[#D8B978]/20 flex items-center justify-center text-[#D8B978] mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-white text-base mb-1">
              Phòng Chờ VIP Độc Quyền
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Thưởng thức tiệc trà, cà phê và làm thủ tục ưu tiên riêng biệt tại
              sảnh ga VIP không cần xếp hàng.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0E131A] border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-[#D8B978]/20 flex items-center justify-center text-[#D8B978] mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-white text-base mb-1">
              Bảo Hiểm Toàn Diện 1 Tỷ
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mỗi tấm vé đều đi kèm gói bảo hiểm tai nạn và y tế cao cấp nhất từ
              Bảo Việt Đường Sắt.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0E131A] border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-[#D8B978]/20 flex items-center justify-center text-[#D8B978] mb-4">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-white text-base mb-1">
              Quản Gia Hỗ Trợ 24/7
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Đội ngũ tiếp viên được đào tạo theo chuẩn hàng không và khách sạn
              5 sao túc trực hỗ trợ suốt hành trình.
            </p>
          </div>
        </div>
      </section>

      {/* MODALS */}
      <TicketLookupModal
        isOpen={isTicketLookupOpen}
        onClose={() => setIsTicketLookupOpen(false)}
      />

      <FareCalendarModal
        isOpen={isFareCalendarOpen}
        onClose={() => setIsFareCalendarOpen(false)}
        onSelectDate={handleCalendarPick}
      />

      <BookingFlowModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        searchQuery={searchQuery}
        currency="VND"
        onResetSearch={() => setSearchQuery(null)}
      />
    </div>
  );
};
