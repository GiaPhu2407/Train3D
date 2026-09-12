"use client";

import React, { useState } from "react";
import {
  Utensils,
  Wine,
  Award,
  Check,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { soundFx } from "@/lib/audio";

interface MenuItem {
  id: string;
  name: string;
  category: "main" | "local" | "drinks" | "dessert";
  price: number;
  calories: string;
  tag: string;
  image: string;
  description: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "wagyu_truffle",
    name: "Bò Wagyu A5 Dát Vàng & Sốt Nấm Truffle Tây Bắc",
    category: "main",
    price: 890000,
    calories: "650 kcal",
    tag: "CHEF'S SIGNATURE",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    description:
      "Thịt bò Wagyu vân mỡ cẩm thạch hoàn hảo, dát vàng 24k thực phẩm, ăn kèm khoai tây nghiền bơ Pháp và sốt nấm quý Sa Pa.",
  },
  {
    id: "black_cod_langco",
    name: "Cá Tuyết Áp Chảo Sốt Chanh Leo Lăng Cô",
    category: "main",
    price: 580000,
    calories: "480 kcal",
    tag: "SEAFOOD SPECIAL",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    description:
      "Cá tuyết tươi ngọt áp chảo da giòn rụm, kết hợp sốt chanh leo chua thanh tự nhiên và măng tây xanh Đà Lạt.",
  },
  {
    id: "pho_dongtao",
    name: "Phở Gà Đông Tảo Thượng Hạng Nước Dùng Sâm Quy",
    category: "local",
    price: 260000,
    calories: "420 kcal",
    tag: "ĐẶC SẢN VIỆT",
    image:
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80",
    description:
      "Bánh phở tráng tay mềm mướt, thịt gà Đông Tảo giòn sần sật ninh cùng đẳng sâm Tây Bắc trong 18 giờ liên tục.",
  },
  {
    id: "banhmi_angus",
    name: "Bánh Mì Kẹp Thăn Bò Angus Sốt Pate Cột Đèn Hải Phòng",
    category: "local",
    price: 185000,
    calories: "390 kcal",
    tag: "POPULAR CHOICE",
    image:
      "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&w=800&q=80",
    description:
      "Bánh mì vỏ giòn rụm nướng nóng trên toa, thăn bò nướng than hoa mềm ngọt quyện sốt bơ trứng vàng béo ngậy.",
  },
  {
    id: "royal_tea_set",
    name: "Set Trà Chiều Cung Đình & Bánh Hạt Sen Tươi",
    category: "drinks",
    price: 320000,
    calories: "210 kcal",
    tag: "HIGH-TEA ROYAL",
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    description:
      "Trà sen Bách Diệp Tây Hồ ướp hoa gạo tự nhiên, dùng kèm tháp bánh macaron và bánh đậu xanh hạt sen vàng óng.",
  },
  {
    id: "wine_dalat_reserve",
    name: "Rượu Vang Đỏ Chateau Dalat Signature Reserve",
    category: "drinks",
    price: 1200000,
    calories: "125 kcal/ly",
    tag: "PREMIUM VINTAGE",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    description:
      "Dòng vang đỏ cao cấp ủ gỗ sồi Pháp 24 tháng, hương thơm quả mọng chín, vị chát mượt mà rất hợp khi ngắm cảnh đêm.",
  },
];

export const GourmetDiningMenu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "main" | "local" | "drinks"
  >("all");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const filteredItems = MENU_ITEMS.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory,
  );

  const handleAddToCart = (id: string) => {
    soundFx.playHoverTick();
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (id: string) => {
    soundFx.playHoverTick();
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) {
        next[id] -= 1;
      } else {
        delete next[id];
      }
      return next;
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MENU_ITEMS.find((m) => m.id === id);
    return sum + (item?.price || 0) * qty;
  }, 0);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181F2B] border border-[#D8B978]/30 text-xs font-mono text-[#D8B978] mb-3">
            <Utensils className="w-3.5 h-3.5" />
            <span>NHÀ HÀNG ẨM THỰC HOÀNG GIA TRÊN ĐƯỜNG RAY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white">
            Thực Đơn 5 Sao Phục Vụ Tận Khoang
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Được chế biến bởi bếp trưởng hàng đầu từ nguyên liệu tươi ngon nhất
            của từng vùng miền đoàn tàu đi qua.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {[
            { id: "all", label: "Tất Cả Món" },
            { id: "main", label: "Món Chính 5 Sao" },
            { id: "local", label: "Đặc Sản Cung Đình" },
            { id: "drinks", label: "Trà & Vang Thượng Hạng" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? "bg-[#D8B978] text-[#0B0F14] font-bold border-[#D8B978] shadow-md"
                  : "bg-[#0E131A] text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const qty = cart[item.id] || 0;
          return (
            <div
              key={item.id}
              className="bg-[#0E131A] border border-slate-800/80 hover:border-[#D8B978]/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#D8B978]/5 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E131A] via-transparent to-black/40" />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[#D8B978] text-[10px] font-mono border border-[#D8B978]/30">
                  {item.tag}
                </span>
                <span className="absolute bottom-3 right-3 text-xs font-mono text-slate-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  {item.calories}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-serif font-bold text-white mb-1 group-hover:text-[#D8B978] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                  <div className="text-base font-mono font-bold text-[#D8B978]">
                    {item.price.toLocaleString("vi-VN")} ₫
                  </div>

                  {qty === 0 ? (
                    <button
                      onClick={() => handleAddToCart(item.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#18212D] border border-[#D8B978]/40 hover:bg-[#D8B978] hover:text-[#0B0F14] text-[#D8B978] text-xs font-medium transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Đặt món này</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-[#18212D] border border-[#D8B978]/50 rounded-lg px-2 py-1 text-xs">
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-slate-400 hover:text-white p-0.5"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono font-bold text-white px-1">
                        {qty}
                      </span>
                      <button
                        onClick={() => handleAddToCart(item.id)}
                        className="text-[#D8B978] hover:text-white p-0.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Pre-Order Summary Bar (If user selected items) */}
      {totalItems > 0 && (
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#17140B] via-[#241A0B] to-[#120D04] border border-[#D8B978]/60 shadow-2xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D8B978] flex items-center justify-center text-[#0B0F14] font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-bold text-sm sm:text-base">
                Đã chọn {totalItems} món ẩm thực thượng hạng
              </div>
              <div className="text-xs text-slate-400">
                Món ăn sẽ được chuẩn bị nóng sốt và phục vụ đúng giờ theo lịch
                tàu của bạn
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block font-mono">
                TỔNG TIỀN MÓN:
              </span>
              <span className="text-lg sm:text-xl font-serif font-black text-[#D8B978]">
                {totalPrice.toLocaleString("vi-VN")} ₫
              </span>
            </div>

            <button
              onClick={() => {
                soundFx.playConfirmationTone();
                setOrderConfirmed(true);
                setTimeout(() => setOrderConfirmed(false), 4000);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D8B978] to-[#B8964B] text-[#0B0F14] font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg"
            >
              {orderConfirmed
                ? "✓ Đã Lưu Vào Vé Của Bạn"
                : "Xác Nhận Kèm Vào Vé"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
