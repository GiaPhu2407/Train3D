"use client";

import React, { useState } from "react";
import {
  Search,
  X,
  QrCode,
  Download,
  Share2,
  Printer,
  Train,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  User,
  Sparkles,
} from "lucide-react";
import { soundFx } from "@/lib/audio";

interface TicketData {
  pnr: string;
  passengerName: string;
  idNumber: string;
  trainCode: string;
  trainName: string;
  fromStation: string;
  toStation: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  coachNumber: string;
  seatNumber: string;
  classType: string;
  gate: string;
  meal: string;
  status: "CONFIRMED" | "BOARDING_SOON";
}

const SAMPLE_TICKETS: Record<string, TicketData> = {
  "SE-8829": {
    pnr: "SE-8829",
    passengerName: "NGUYỄN VĂN AN",
    idNumber: "001201099882",
    trainCode: "SE1 ROYAL EXPRESS",
    trainName: "Tàu Hoàng Gia Thống Nhất",
    fromStation: "Ga Hà Nội (HAN)",
    toStation: "Ga Đà Nẵng (DAD)",
    departureDate: "15/09/2026",
    departureTime: "19:30",
    arrivalTime: "11:15 (+1)",
    coachNumber: "Toa 01",
    seatNumber: "Ghế 04 (King Bed)",
    classType: "Imperial Presidential Suite",
    gate: "Cửa G-02 (Sảnh VIP Ga Hà Nội)",
    meal: "Bò Wagyu A5 dát vàng & Rượu vang",
    status: "CONFIRMED",
  },
  "RW-9901": {
    pnr: "RW-9901",
    passengerName: "TRẦN THỊ MAI",
    idNumber: "079198004512",
    trainCode: "LOTUS 5-STAR LUXURY",
    trainName: "Tàu Sen Vàng Du Ngoạn",
    fromStation: "Ga Sài Gòn (SGN)",
    toStation: "Ga Nha Trang (NHA)",
    departureDate: "18/09/2026",
    departureTime: "08:15",
    arrivalTime: "15:45",
    coachNumber: "Toa 03",
    seatNumber: "Ghế 12A (View Biển)",
    classType: "Lotus Business Suite",
    gate: "Cửa G-01 (Phòng Chờ Thương Gia)",
    meal: "Set Trà Chiều Cung Đình & Bánh Sen",
    status: "CONFIRMED",
  },
};

interface TicketLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TicketLookupModal: React.FC<TicketLookupModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchInput, setSearchInput] = useState("SE-8829");
  const [ticketResult, setTicketResult] = useState<TicketData | null>(
    SAMPLE_TICKETS["SE-8829"],
  );
  const [isSearching, setIsSearching] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSearching(true);
    soundFx.playHoverTick();

    setTimeout(() => {
      const query = searchInput.trim().toUpperCase();
      if (SAMPLE_TICKETS[query]) {
        setTicketResult(SAMPLE_TICKETS[query]);
      } else {
        // Generate dynamic ticket for any entered PNR
        setTicketResult({
          pnr: query || "VN-7749",
          passengerName: "QUÝ KHÁCH HÀNG VIP",
          idNumber: "038202008899",
          trainCode: "SE3 HERITAGE LUXURY",
          trainName: "Tàu Hạng Nhất Di Sản",
          fromStation: "Ga Hà Nội (HAN)",
          toStation: "Ga Huế (HUE)",
          departureDate: "20/09/2026",
          departureTime: "19:15",
          arrivalTime: "08:45 (+1)",
          coachNumber: "Toa 02",
          seatNumber: "Ghế VIP 08B",
          classType: "Toa Giường Nằm 4 VIP",
          gate: "Cửa G-03 (Lối Đi Ưu Tiên)",
          meal: "Thực đơn cung đình theo yêu cầu",
          status: "CONFIRMED",
        });
      }
      setIsSearching(false);
      soundFx.playConfirmationTone();
    }, 400);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      window.location.origin + "?pnr=" + ticketResult?.pnr,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0E131A] border border-[#D8B978]/50 rounded-3xl shadow-2xl p-5 sm:p-7 my-8 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D8B978]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D8B978]/20 flex items-center justify-center text-[#D8B978]">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-white">
                Tra Cứu Vé & Thẻ Lên Tàu Điện Tử
              </h3>
              <p className="text-xs text-slate-400">
                Nhập mã đặt chỗ (PNR) để hiển thị thẻ lên tàu QR chuẩn quốc tế
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

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Nhập mã PNR (VD: SE-8829, RW-9901...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141A23] border border-slate-700 focus:border-[#D8B978] text-white text-sm uppercase font-mono tracking-wider focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D8B978] to-[#B8964B] text-[#0B0F14] font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all shadow-md"
          >
            {isSearching ? "Đang tra..." : "Tra Cứu"}
          </button>
        </form>

        {/* Quick Sample PNR buttons */}
        <div className="flex items-center gap-2 mb-6 text-xs text-slate-400">
          <span>Mã mẫu thử nghiệm:</span>
          {["SE-8829", "RW-9901"].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => {
                setSearchInput(code);
                setTicketResult(SAMPLE_TICKETS[code]);
              }}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-[#D8B978]/20 hover:text-[#D8B978] text-slate-300 font-mono transition-colors"
            >
              {code}
            </button>
          ))}
        </div>

        {/* Digital Boarding Pass Ticket Card */}
        {ticketResult && (
          <div className="bg-gradient-to-br from-[#131923] via-[#10151E] to-[#0A0D13] border border-[#D8B978]/40 rounded-2xl overflow-hidden shadow-2xl relative mb-6">
            {/* Ticket Header */}
            <div className="bg-[#17202C] border-b border-[#D8B978]/30 px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Train className="w-4 h-4 text-[#D8B978]" />
                <span className="font-serif font-bold text-white text-sm tracking-wide">
                  {ticketResult.trainCode}
                </span>
                <span className="text-[11px] text-[#D8B978] hidden sm:inline">
                  • {ticketResult.trainName}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-700/50 text-[10px] font-mono text-emerald-300 font-semibold">
                <CheckCircle2 className="w-3 h-3" />
                <span>VÉ HỢP LỆ</span>
              </div>
            </div>

            {/* Ticket Body */}
            <div className="p-5 sm:p-6">
              {/* Route Display */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    GA XUẤT PHÁT
                  </span>
                  <div className="text-lg sm:text-xl font-bold text-white">
                    {ticketResult.fromStation.split("(")[0]}
                  </div>
                  <span className="text-xs text-[#D8B978] font-mono font-bold">
                    {ticketResult.departureTime}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {ticketResult.departureDate}
                  </span>
                </div>

                <div className="flex-1 px-4 flex flex-col items-center">
                  <span className="text-[10px] text-slate-500 font-mono mb-1">
                    HÀNH TRÌNH
                  </span>
                  <div className="w-full relative flex items-center justify-center">
                    <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#D8B978] to-transparent" />
                    <Train className="w-4 h-4 text-[#D8B978] absolute bg-[#10151E] px-0.5" />
                  </div>
                  <span className="text-[10px] text-[#D8B978] font-mono mt-1">
                    {ticketResult.classType}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-mono block">
                    GA ĐẾN
                  </span>
                  <div className="text-lg sm:text-xl font-bold text-white">
                    {ticketResult.toStation.split("(")[0]}
                  </div>
                  <span className="text-xs text-[#D8B978] font-mono font-bold">
                    {ticketResult.arrivalTime}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {ticketResult.departureDate}
                  </span>
                </div>
              </div>

              {/* Passenger & Allocation Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-[#090C11] border border-slate-800 text-xs font-mono mb-5">
                <div>
                  <span className="text-slate-500 block text-[10px]">
                    HÀNH KHÁCH
                  </span>
                  <span className="text-white font-bold truncate block">
                    {ticketResult.passengerName}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">
                    TOA & GHẾ
                  </span>
                  <span className="text-[#D8B978] font-bold block">
                    {ticketResult.coachNumber} • {ticketResult.seatNumber}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">
                    CỬA LÊN TÀU
                  </span>
                  <span className="text-emerald-400 font-bold block">
                    {ticketResult.gate}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">
                    MÃ ĐẶT CHỖ PNR
                  </span>
                  <span className="text-[#D8B978] font-bold block">
                    {ticketResult.pnr}
                  </span>
                </div>
              </div>

              {/* Dynamic QR Code & Barcode Section */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#141B24] border border-[#D8B978]/20">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-white p-1.5 flex items-center justify-center shrink-0 shadow-md">
                    <QrCode className="w-full h-full text-[#0B0F14]" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D8B978]" />
                      <span>QR Code Soát Vé Tự Động</span>
                    </span>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Xuất trình mã này tại cổng soát vé thông minh ga tàu để
                      qua cửa tự động không cần xếp hàng.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handlePrint}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-[#D8B978] hover:text-[#0B0F14] text-slate-300 transition-all text-xs flex items-center gap-1"
                    title="In thẻ lên tàu"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>In Thẻ</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-[#D8B978] hover:text-[#0B0F14] text-slate-300 transition-all text-xs flex items-center gap-1"
                    title="Sao chép liên kết vé"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copied ? "Đã sao chép" : "Chia sẻ"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#D8B978]" />
            <span>
              Mã hóa bảo mật PNR 256-bit theo chuẩn Hiệp Hội Đường Sắt Quốc Tế
              (UIC)
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white underline underline-offset-4"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
