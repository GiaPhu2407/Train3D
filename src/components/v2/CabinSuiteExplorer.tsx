"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Eye,
  Coffee,
  Wifi,
  Tv,
  BedDouble,
  Check,
  Star,
  ArrowRight,
} from "lucide-react";
import { soundFx } from "@/lib/audio";

interface CabinTier {
  id: string;
  name: string;
  subtitle: string;
  pricePerPax: string;
  capacity: string;
  image: string;
  features: string[];
  description: string;
  badge: string;
  windowViews: {
    name: string;
    location: string;
    image: string;
  }[];
}

const CABIN_TIERS: CabinTier[] = [
  {
    id: "presidential",
    name: "Toa Tổng Thống (Imperial Presidential Suite)",
    subtitle:
      "Đỉnh cao vương giả trên đường ray – Khoang riêng tư nguyên toa duy nhất",
    pricePerPax: "4.850.000 ₫",
    capacity: "1 - 2 Hành khách VIP",
    badge: "ĐỘC BẢN HOÀNG GIA",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
    description:
      "Trải nghiệm đẳng cấp cung đình với phòng ngủ giường đôi King-size đệm bọc lụa Hà Đông, quầy bar cá nhân trang bị rượu vang thượng hạng, phòng tắm riêng lát đá cẩm thạch có bồn tắm ngắm cảnh biển và quản gia riêng phục vụ 24/7.",
    features: [
      "Bồn tắm ngắm cảnh hoàng hôn qua kính Panorama",
      "Quản gia riêng phục vụ thực đơn 5 sao tại phòng",
      "Giường đôi King-size nệm lông vũ nhập khẩu Ý",
      "Minibar miễn phí không giới hạn & Rượu vang chào mừng",
      "Wi-Fi vệ tinh Starlink tốc độ cao riêng biệt",
      "Đưa đón tận ga bằng xe limousine hạng sang",
    ],
    windowViews: [
      {
        name: "Hoàng hôn Vịnh Lăng Cô",
        location: "Huế - Đà Nẵng",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
      },
      {
        name: "Đèo Hải Vân Hùng Vĩ",
        location: "Đà Nẵng",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
      },
    ],
  },
  {
    id: "lotus_business",
    name: "Toa Thương Gia Sen Vàng (Lotus Business Suite)",
    subtitle:
      "Khoang 2 giường êm ái với thiết kế kiến trúc Đông Dương trang nhã",
    pricePerPax: "2.950.000 ₫",
    capacity: "Tối đa 2 Khách",
    badge: "ĐƯỢC ƯA CHUỘNG NHẤT",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85",
    description:
      "Thiết kế kết hợp giữa gỗ trầm ấm và họa tiết hoa sen vàng tinh tế. Cửa sổ panorama mở rộng cho tầm nhìn bao quát toàn bộ vẻ đẹp non nước Việt Nam cùng hệ thống cách âm giảm rung chấn hiện đại bậc nhất.",
    features: [
      "2 giường đơn đệm cao su thiên nhiên nâng đỡ cột sống",
      "Set trà chiều Cung Đình & Bánh thủ công truyền thống",
      "Cổng sạc Type-C nhanh 65W & Tai nghe khử ồn chủ động",
      "Màn hình giải trí 4K xem phim điện ảnh theo yêu cầu",
      "Quyền ưu tiên sử dụng Toa Nhà Hàng & Toa Bar Lounge",
    ],
    windowViews: [
      {
        name: "Bình minh Biển Sa Huỳnh",
        location: "Quảng Ngãi",
        image:
          "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=80",
      },
      {
        name: "Cánh đồng lúa Ninh Bình",
        location: "Ninh Bình",
        image:
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
      },
    ],
  },
  {
    id: "grand_sleeper",
    name: "Toa Giường Nằm VIP 4 (Grand Sleeper Cabin)",
    subtitle: "Không gian ấm cúng, riêng tư tuyệt đối cho gia đình và nhóm bạn",
    pricePerPax: "1.650.000 ₫",
    capacity: "4 Giường / Khoang",
    badge: "GIA ĐÌNH & ĐOÀN KHÁCH",
    image:
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=85",
    description:
      "Mỗi khoang gồm 4 giường nằm bọc ga gối satin kháng khuẩn tiêu chuẩn khách sạn 5 sao. Rèm che riêng tư từng giường, điều hòa hai chiều điều chỉnh độc lập và đèn đọc sách tùy biến nhiệt độ màu.",
    features: [
      "Rèm kéo nhung cách âm riêng tư cho từng vị trí giường",
      "Hệ thống điều hòa lọc không khí Plasma ion âm",
      "Bữa sáng nhẹ kèm cà phê Arabica Cầu Đất nguyên chất",
      "Ngăn chứa hành lý rộng rãi có khóa số an toàn",
      "Cung cấp gối cổ công thái học và bịt mắt lụa",
    ],
    windowViews: [
      {
        name: "Rừng thông Đại Ngàn Khe Nét",
        location: "Quảng Bình",
        image:
          "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",
      },
      {
        name: "Vườn thanh long đêm Bình Thuận",
        location: "Bình Thuận",
        image:
          "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80",
      },
    ],
  },
  {
    id: "panorama_deluxe",
    name: "Toa Ghế Ngả Hạng Nhất (Panorama First Class)",
    subtitle:
      "Ghế xoay da thật ngắm toàn cảnh góc rộng 180 độ ôm trọn thiên nhiên",
    pricePerPax: "950.000 ₫",
    capacity: "Ghế đơn ngả 145 độ",
    badge: "TIỆN NGHI VƯỢT TRỘI",
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=85",
    description:
      "Hàng ghế da cao cấp bọc da bò thật với cơ cấu ngả lưng góc rộng công thái học, chỗ để chân kéo dài và bàn làm việc cá nhân có cổng sạc không dây cho doanh nhân và du khách ngắm cảnh trong ngày.",
    features: [
      "Ghế bọc da ngả 145° có tính năng massage rung đa điểm",
      "Bàn ăn gấp gọn và sạc không dây chuẩn Qi",
      "Cửa kính phủ nano chống chói UV mở rộng tầm nhìn",
      "Nước suối khoáng núi cao và khăn thơm thảo mộc",
    ],
    windowViews: [
      {
        name: "Cung đường ôm vịnh Cam Ranh",
        location: "Khánh Hòa",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
      },
      {
        name: "Cầu Long Biên Lịch Sử",
        location: "Hà Nội",
        image:
          "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80",
      },
    ],
  },
];

interface CabinSuiteExplorerProps {
  onSelectCabinForBooking: (tierId: string) => void;
}

export const CabinSuiteExplorer: React.FC<CabinSuiteExplorerProps> = ({
  onSelectCabinForBooking,
}) => {
  const [activeTierId, setActiveTierId] = useState<string>("presidential");
  const [selectedViewIndex, setSelectedViewIndex] = useState<number>(0);

  const currentTier =
    CABIN_TIERS.find((t) => t.id === activeTierId) || CABIN_TIERS[0];

  const handleSelectTier = (id: string) => {
    soundFx.playHoverTick();
    setActiveTierId(id);
    setSelectedViewIndex(0);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181F2B] border border-[#D8B978]/30 text-xs font-mono text-[#D8B978] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>BỘ SƯU TẬP TOA TÀU HẠNG THƯỢNG LƯU</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white">
          Khám Phá Toa Tàu & Khoang Nghỉ 5 Sao
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Chiêm ngưỡng không gian nội thất được chế tác tinh xảo, mô phỏng tầm
          nhìn trực tiếp qua khung cửa sổ toa tàu.
        </p>
      </div>

      {/* Tier Switcher Tabs */}
      <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {CABIN_TIERS.map((tier) => {
          const isSelected = tier.id === activeTierId;
          return (
            <button
              key={tier.id}
              onClick={() => handleSelectTier(tier.id)}
              className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 border ${
                isSelected
                  ? "bg-gradient-to-r from-[#D8B978] to-[#B8964B] text-[#0B0F14] font-bold border-transparent shadow-lg shadow-[#D8B978]/20 scale-105"
                  : "bg-[#0E131A] text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
              }`}
            >
              <BedDouble className="w-4 h-4" />
              <span>{tier.name.split("(")[0].trim()}</span>
            </button>
          );
        })}
      </div>

      {/* Cabin Showcase Card */}
      <div className="bg-[#0E131A] border border-[#D8B978]/30 rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Interactive Visual with Window View Simulator */}
          <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[480px] overflow-hidden bg-slate-950 flex flex-col justify-between p-6">
            {/* Background Image: Main Cabin interior or Simulated window view */}
            <img
              src={
                selectedViewIndex === -1
                  ? currentTier.image
                  : currentTier.windowViews[selectedViewIndex]?.image ||
                    currentTier.image
              }
              alt={currentTier.name}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 brightness-90"
            />
            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E131A] via-black/30 to-black/60 pointer-events-none" />

            {/* Top Badges */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-[#D8B978] text-[#0B0F14] text-xs font-mono font-bold shadow-md">
                {currentTier.badge}
              </span>
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 text-xs font-mono">
                {currentTier.capacity}
              </span>
            </div>

            {/* Bottom Window View Switcher Floating Bar */}
            <div className="relative z-10 bg-black/70 backdrop-blur-md border border-white/20 rounded-2xl p-3 sm:p-4 mt-auto">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                <span className="flex items-center gap-1.5 font-medium text-white">
                  <Eye className="w-3.5 h-3.5 text-[#D8B978]" />
                  <span>Mô phỏng góc nhìn qua cửa sổ toa tàu:</span>
                </span>
                <span className="text-[11px] font-mono text-[#D8B978]">
                  Window View Simulator
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSelectedViewIndex(-1)}
                  className={`px-3 py-2 rounded-lg text-xs transition-all border text-left ${
                    selectedViewIndex === -1
                      ? "bg-[#D8B978] text-[#0B0F14] font-bold border-[#D8B978]"
                      : "bg-white/10 text-slate-200 border-white/10 hover:bg-white/20"
                  }`}
                >
                  <div className="font-semibold truncate">Nội Thất Cabin</div>
                  <div className="text-[10px] opacity-80 truncate">
                    Góc nhìn 360°
                  </div>
                </button>

                {currentTier.windowViews.map((wv, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedViewIndex(idx)}
                    className={`px-3 py-2 rounded-lg text-xs transition-all border text-left ${
                      selectedViewIndex === idx
                        ? "bg-[#D8B978] text-[#0B0F14] font-bold border-[#D8B978]"
                        : "bg-white/10 text-slate-200 border-white/10 hover:bg-white/20"
                    }`}
                  >
                    <div className="font-semibold truncate">{wv.name}</div>
                    <div className="text-[10px] opacity-80 truncate">
                      {wv.location}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Detailed Amenities & Booking Action */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800">
            <div>
              <div className="text-xs font-mono text-[#D8B978] uppercase tracking-wider mb-1">
                TIÊU CHUẨN ĐƯỜNG SẮT 5 SAO
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-2">
                {currentTier.name}
              </h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                {currentTier.description}
              </p>

              <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
                Đặc quyền & Tiện ích kèm theo:
              </div>

              <div className="space-y-2 mb-6">
                {currentTier.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-slate-300"
                  >
                    <div className="w-4 h-4 rounded-full bg-[#D8B978]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#D8B978]" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Action */}
            <div className="pt-6 border-t border-slate-800/80">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <span className="text-xs text-slate-400 block font-mono">
                    Giá vé tiêu chuẩn từ:
                  </span>
                  <div className="text-2xl sm:text-3xl font-serif font-black text-[#D8B978]">
                    {currentTier.pricePerPax}
                    <span className="text-xs font-normal text-slate-400 font-sans ml-1">
                      / khách
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold">5.0</span>
                  <span className="text-slate-500">(1,240 đánh giá)</span>
                </div>
              </div>

              <button
                onClick={() => {
                  soundFx.playConfirmationTone();
                  onSelectCabinForBooking(currentTier.id);
                }}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#D8B978] via-[#F3E5AB] to-[#C9A96E] text-[#0B0F14] font-bold text-sm shadow-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>Chọn Hạng Toa Này & Tiếp Tục Đặt Vé</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
