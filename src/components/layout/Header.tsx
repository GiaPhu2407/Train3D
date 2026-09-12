"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Globe,
  Train,
  Sparkles,
  ChevronDown,
  Search,
  Calendar,
  Sun,
  Moon,
} from "lucide-react";
import { soundFx } from "@/lib/audio";
import { Button } from "@/components/ui/Button";
import { Language, TRANSLATIONS } from "@/lib/translations";
import { Currency } from "@/lib/utils";
import { AmbientSoundPlayer } from "@/components/v2/AmbientSoundPlayer";

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onOpenBooking: () => void;
  onOpenTicketLookup?: () => void;
  onOpenFareCalendar?: () => void;
  isV2Active?: boolean;
  onToggleV2?: (val: boolean) => void;
  onTriggerUpdate?: () => void;
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  currentCurrency,
  onCurrencyChange,
  onOpenBooking,
  onOpenTicketLookup,
  onOpenFareCalendar,
  isV2Active = true,
  onToggleV2,
  theme = "dark",
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const t = TRANSLATIONS[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.home, href: "#" },
    { label: "Tuyến Tàu", href: "#routes" },
    { label: "Toa Hạng Sang", href: "#cabins" },
    { label: "Radar Tàu", href: "#live-radar" },
    { label: "Ẩm Thực 5 Sao", href: "#dining" },
    { label: "Điểm Đến", href: "#destinations" },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "VI", label: "Tiếng Việt", flag: "🇻🇳" },
    { code: "EN", label: "English", flag: "🇬🇧" },
    { code: "JP", label: "日本語", flag: "🇯🇵" },
  ];

  const currencies: { code: Currency; symbol: string; label: string }[] = [
    { code: "VND", symbol: "₫", label: "VND (₫)" },
    { code: "USD", symbol: "$", label: "USD ($)" },
    { code: "EUR", symbol: "€", label: "EUR (€)" },
  ];

  const isLight = theme === "light";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? isLight
              ? "bg-white/95 backdrop-blur-xl border-b border-[#D8B978]/30 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
              : "bg-[#070A0E]/90 backdrop-blur-xl border-b border-[#D8B978]/25 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
            : isLight
              ? "bg-gradient-to-b from-white/95 via-white/70 to-transparent py-4"
              : "bg-gradient-to-b from-[#070A0E]/95 via-[#070A0E]/50 to-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* 1. BRAND LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3 group cursor-pointer shrink-0"
            onClick={() => soundFx.playClick(900, 0.04)}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#F3E5AB] via-[#D8B978] to-[#99732B] p-0.5 shadow-[0_0_20px_rgba(216,185,120,0.35)] group-hover:shadow-[0_0_28px_rgba(216,185,120,0.6)] transition-all duration-300 group-hover:scale-105">
              <div
                className={`w-full h-full rounded-[14px] flex items-center justify-center transition-colors ${
                  isLight ? "bg-white" : "bg-[#0A0E14]"
                }`}
              >
                <Train className="w-5 h-5 text-[#D8B978] group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>

            <div className="flex flex-col">
              <span
                className={`text-xl font-serif font-black tracking-widest transition-colors ${
                  isLight
                    ? "text-slate-900 group-hover:text-[#B8964B]"
                    : "text-white group-hover:text-[#D8B978]"
                }`}
              >
                RAILWAY
              </span>
              <span className="text-[9px] tracking-[0.28em] text-[#D8B978] font-mono -mt-1 uppercase font-bold">
                Royal Express
              </span>
            </div>
          </Link>

          {/* 2. DESKTOP NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={() => soundFx.playClick(750, 0.03)}
                className={`relative px-3 py-1.5 text-xs xl:text-sm font-medium tracking-wide transition-all duration-200 rounded-lg group ${
                  isLight
                    ? "text-slate-700 hover:text-[#99732B] hover:bg-slate-100/80"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-[#D8B978] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </a>
            ))}
          </nav>

          {/* 3. RIGHT ACTION CONTROLS */}
          <div className="hidden md:flex items-center space-x-2.5">
            {/* Version Switcher Pill (V1 / V2) */}
            {onToggleV2 && (
              <div
                className={`flex items-center p-0.5 rounded-xl border text-xs font-mono transition-colors ${
                  isLight
                    ? "bg-slate-100 border-slate-300"
                    : "bg-[#0E131A] border-[#D8B978]/30 shadow-inner"
                }`}
              >
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onToggleV2(false);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    !isV2Active
                      ? "bg-[#D8B978] text-[#0B0F14] shadow"
                      : isLight
                        ? "text-slate-500 hover:text-slate-900"
                        : "text-slate-400 hover:text-white"
                  }`}
                  title="Chuyển về giao diện gốc V1"
                >
                  V1
                </button>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onToggleV2(true);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
                    isV2Active
                      ? "bg-gradient-to-r from-[#D8B978] via-[#F3E5AB] to-[#B8964B] text-[#0B0F14] shadow-md"
                      : isLight
                        ? "text-slate-500 hover:text-[#99732B]"
                        : "text-slate-400 hover:text-[#D8B978]"
                  }`}
                  title="Kích hoạt Giao diện Hoàng Gia V2.0"
                >
                  <span>V2.0</span>
                  <Sparkles className="w-2.5 h-2.5" />
                </button>
              </div>
            )}

            {/* Dark / Light Mode Switcher */}
            {onToggleTheme && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onToggleTheme();
                }}
                className={`p-2 rounded-xl border transition-all hover:scale-105 active:scale-95 ${
                  isLight
                    ? "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200"
                    : "bg-[#111722] border-[#D8B978]/30 text-[#D8B978] hover:bg-[#182130]"
                }`}
                title={
                  isLight
                    ? "Bật chế độ Tối (Night Mode)"
                    : "Bật chế độ Sáng (Day Mode)"
                }
              >
                {isLight ? (
                  <Moon className="w-4 h-4 text-slate-800" />
                ) : (
                  <Sun className="w-4 h-4 text-[#F3E5AB]" />
                )}
              </button>
            )}

            {/* Tra Cứu Vé PNR Button */}
            {onOpenTicketLookup && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenTicketLookup();
                }}
                className={`hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  isLight
                    ? "bg-white border-slate-300 text-slate-700 hover:border-[#D8B978] hover:text-[#99732B]"
                    : "bg-[#111722] border-[#D8B978]/30 text-slate-200 hover:border-[#D8B978] hover:text-[#D8B978]"
                }`}
                title="Tra cứu mã vé PNR & QR Boarding Pass"
              >
                <Search className="w-3.5 h-3.5 text-[#D8B978]" />
                <span>Tra Cứu Vé</span>
              </button>
            )}

            {/* Ambient Sound Player */}
            <AmbientSoundPlayer />

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCurrencyDropdown(!showCurrencyDropdown);
                  setShowLangDropdown(false);
                }}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                  isLight
                    ? "bg-slate-100 border-slate-300 text-slate-700"
                    : "bg-[#111722] border-slate-800 text-slate-300 hover:border-[#D8B978]/50"
                }`}
              >
                <span>{currentCurrency}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              <AnimatePresence>
                {showCurrencyDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-2 w-32 bg-[#0E131A] border border-[#D8B978]/30 rounded-xl shadow-2xl p-1 z-50 overflow-hidden"
                  >
                    {currencies.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          onCurrencyChange(c.code);
                          setShowCurrencyDropdown(false);
                          soundFx.playClick();
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between transition-colors ${
                          currentCurrency === c.code
                            ? "bg-[#D8B978]/20 text-[#D8B978] font-bold"
                            : "text-slate-300 hover:bg-white/5"
                        }`}
                      >
                        <span>{c.code}</span>
                        <span className="text-slate-400 font-mono">
                          {c.symbol}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowLangDropdown(!showLangDropdown);
                  setShowCurrencyDropdown(false);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                  isLight
                    ? "bg-slate-100 border-slate-300 text-slate-700"
                    : "bg-[#111722] border-slate-800 text-slate-300 hover:border-[#D8B978]/50"
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-[#D8B978]" />
                <span>{currentLang}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              <AnimatePresence>
                {showLangDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-2 w-36 bg-[#0E131A] border border-[#D8B978]/30 rounded-xl shadow-2xl p-1 z-50 overflow-hidden"
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          onLanguageChange(l.code);
                          setShowLangDropdown(false);
                          soundFx.playClick();
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center gap-2 transition-colors ${
                          currentLang === l.code
                            ? "bg-[#D8B978]/20 text-[#D8B978] font-bold"
                            : "text-slate-300 hover:bg-white/5"
                        }`}
                      >
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Book Now High-End Button */}
            <Button
              size="sm"
              variant="primary"
              onClick={onOpenBooking}
              className="shadow-lg shadow-[#D8B978]/20 hover:brightness-110 active:scale-95 transition-all font-bold"
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#0B0F14]" />}
            >
              {t.nav.bookNow}
            </Button>
          </div>

          {/* 4. MOBILE ACTION CONTROLS */}
          <div className="flex md:hidden items-center space-x-2">
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className={`p-2 rounded-xl border transition-all ${
                  isLight
                    ? "bg-slate-100 border-slate-300 text-slate-800"
                    : "bg-white/5 border-slate-700 text-[#D8B978]"
                }`}
                aria-label="Toggle theme"
              >
                {isLight ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4 text-[#F3E5AB]" />
                )}
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`p-2 rounded-xl border transition-colors ${
                isLight
                  ? "bg-slate-100 border-slate-300 text-slate-800"
                  : "bg-white/5 border-slate-700/60 text-slate-200 hover:text-white"
              }`}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex justify-end md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              className="relative z-50 w-4/5 max-w-sm h-full bg-[#0E131A] border-l border-[#D8B978]/30 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
            >
              {/* Drawer Top */}
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Train className="w-5 h-5 text-[#D8B978]" />
                    <span className="font-serif font-bold text-lg text-white tracking-widest">
                      RAILWAY EXPRESS
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* V1 / V2 Switcher in Mobile Drawer */}
                {onToggleV2 && (
                  <div className="mt-4 p-3 rounded-xl bg-[#141A23] border border-[#D8B978]/30">
                    <div className="text-[11px] text-slate-400 mb-2 font-mono">
                      CHỌN PHIÊN BẢN:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          onToggleV2(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`py-2 rounded-lg text-xs font-bold font-mono transition-all ${
                          !isV2Active
                            ? "bg-[#D8B978] text-[#0B0F14]"
                            : "bg-slate-800 text-slate-300"
                        }`}
                      >
                        Bản Gốc V1
                      </button>
                      <button
                        onClick={() => {
                          onToggleV2(true);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`py-2 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center gap-1 ${
                          isV2Active
                            ? "bg-gradient-to-r from-[#D8B978] to-[#B8964B] text-[#0B0F14]"
                            : "bg-slate-800 text-slate-300"
                        }`}
                      >
                        <span>Bản V2.0</span>
                        <Sparkles className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Mobile Quick Action Buttons */}
                <div className="space-y-2 mt-4">
                  {onOpenTicketLookup && (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenTicketLookup();
                      }}
                      className="w-full flex items-center gap-2.5 p-3 rounded-xl bg-[#D8B978]/15 border border-[#D8B978]/40 text-[#D8B978] text-xs font-bold text-left"
                    >
                      <Search className="w-4 h-4" />
                      <span>Tra Cứu Vé & QR Boarding Pass</span>
                    </button>
                  )}

                  {onOpenFareCalendar && (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenFareCalendar();
                      }}
                      className="w-full flex items-center gap-2.5 p-3 rounded-xl bg-emerald-950/40 border border-emerald-700/40 text-emerald-300 text-xs font-bold text-left"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Lịch Săn Vé Giá Rẻ (-38%)</span>
                    </button>
                  )}
                </div>

                {/* Mobile Navigation List */}
                <div className="flex flex-col space-y-1 mt-5">
                  {navItems.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        soundFx.playClick();
                      }}
                      className="text-sm font-medium text-slate-300 hover:text-[#D8B978] py-2.5 border-b border-slate-800/50 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Drawer Bottom Controls */}
              <div className="pt-5 border-t border-slate-800 space-y-4">
                {/* Theme Switcher in Mobile */}
                {onToggleTheme && (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-slate-800">
                    <span className="text-xs text-slate-300 flex items-center gap-2">
                      {isLight ? (
                        <Sun className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Moon className="w-4 h-4 text-[#D8B978]" />
                      )}
                      <span>Giao Diện</span>
                    </span>
                    <button
                      onClick={onToggleTheme}
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-[#D8B978] text-[#0B0F14]"
                    >
                      {isLight ? "☀️ Sáng" : "🌙 Tối"}
                    </button>
                  </div>
                )}

                {/* Book Now Button Mobile */}
                <Button
                  size="md"
                  variant="primary"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full font-bold shadow-lg"
                  leftIcon={<Sparkles className="w-4 h-4 text-[#0B0F14]" />}
                >
                  {t.nav.bookNow}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
