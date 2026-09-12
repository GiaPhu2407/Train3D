"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Sparkles,
  ArrowRight,
  RefreshCw,
  GitCommit,
  CheckCircle2,
  X,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { soundFx } from "@/lib/audio";

interface VersionData {
  version: string;
  title: string;
  buildId: string;
  commitSha: string;
  timestamp: string;
  features: string[];
}

interface VercelUpdateNotificationProps {
  isV2Active: boolean;
  onActivateV2: () => void;
  onToggleV2: (val: boolean) => void;
}

export const VercelUpdateNotification: React.FC<
  VercelUpdateNotificationProps
> = ({ isV2Active, onActivateV2, onToggleV2 }) => {
  const [versionData, setVersionData] = useState<VersionData | null>(null);
  const [hasNewDeployment, setHasNewDeployment] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [lastCheckTime, setLastCheckTime] = useState<string>("Vừa xong");

  // Check version endpoint
  const checkVersion = async () => {
    try {
      setIsChecking(true);
      const res = await fetch("/api/version?t=" + Date.now(), {
        cache: "no-store",
      });
      if (res.ok) {
        const data: VersionData = await res.json();
        setVersionData(data);

        // Check against cached commit SHA or version
        const cachedSha = localStorage.getItem("railway_commit_sha");
        const userActivatedV2 =
          localStorage.getItem("railway_v2_active") === "true";

        if (cachedSha && cachedSha !== data.commitSha) {
          // A new commit was pushed and deployed on Vercel!
          setHasNewDeployment(true);
        } else if (!userActivatedV2 && !isV2Active) {
          // V2 is ready for activation
          setHasNewDeployment(true);
        }

        setLastCheckTime(
          new Date().toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        );
      }
    } catch {
      // Offline or network error
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkVersion();

    // Check on visibility change (when user returns to browser tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkVersion();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Poll every 25 seconds to catch live Vercel deployments
    const interval = setInterval(checkVersion, 25000);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(interval);
    };
  }, [isV2Active]);

  const handleApplyUpdate = () => {
    soundFx.playDepartureChime();

    // Fire golden celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D8B978", "#F3E5AB", "#FFFFFF", "#C9A96E"],
      });
    } catch {
      // ignore
    }

    if (versionData?.commitSha) {
      localStorage.setItem("railway_commit_sha", versionData.commitSha);
    }
    localStorage.setItem("railway_v2_active", "true");

    setHasNewDeployment(false);
    setIsModalOpen(false);
    onActivateV2();
  };

  return (
    <>
      {/* 1. TOP STICKY VERCEL UPDATE BANNER (When V2 is not yet active OR a new Vercel deployment is detected) */}
      {(!isV2Active || hasNewDeployment) && !isBannerDismissed && (
        <aside
          aria-label="Vercel deployment update notification"
          className="relative z-50 bg-gradient-to-r from-[#1A1305] via-[#2A1F0A] to-[#120D04] border-b border-[#D8B978]/40 px-4 py-2.5 shadow-2xl transition-all"
        >
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-[#F3E5AB]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5C07B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E5C07B]"></span>
              </span>
              <span className="font-semibold tracking-wide text-white">
                Vercel Deploy Update:
              </span>
              <span className="text-[#E2D4B7] hidden sm:inline">
                Đã phát hiện bản cập nhật mới trên Vercel từ Git!
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D8B978]/20 text-[#D8B978] font-mono text-[11px] border border-[#D8B978]/30">
                <GitCommit className="w-3 h-3" />
                {versionData?.commitSha
                  ? `SHA: ${versionData.commitSha}`
                  : "V2.0 LIVE"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-[#D8B978] hover:text-white underline underline-offset-4 text-xs font-medium px-2 py-1 transition-colors"
              >
                Xem chi tiết
              </button>

              <button
                onClick={handleApplyUpdate}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gradient-to-r from-[#D8B978] to-[#B8964B] text-[#0B0F14] font-bold text-xs shadow hover:brightness-110 active:scale-95 transition-all"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Cập nhật trang mới ngay</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                onClick={() => setIsBannerDismissed(true)}
                className="p-1 text-slate-400 hover:text-white rounded transition-colors"
                title="Đóng thông báo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* 2. FLOATING VERCEL STATUS BADGE (Allows toggling V1/V2 or checking status anytime) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
        {/* Toggle switch badge */}
        <div className="flex items-center gap-2 bg-[#0B0F14]/95 border border-[#D8B978]/40 shadow-2xl backdrop-blur-md rounded-full px-3.5 py-1.5 text-xs text-slate-200">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[11px] text-slate-400">
              Vercel:
            </span>
            <span className="font-semibold text-[#D8B978]">
              {isV2Active ? "Giao diện V2.0 Mới" : "Bản Cũ (Chờ Update)"}
            </span>
          </div>

          <div className="h-3 w-px bg-slate-700 mx-0.5" />

          {isV2Active ? (
            <button
              onClick={() => onToggleV2(false)}
              className="text-[11px] text-slate-400 hover:text-white transition-colors"
              title="Xem lại giao diện trước"
            >
              Về bản cũ
            </button>
          ) : (
            <button
              onClick={handleApplyUpdate}
              className="inline-flex items-center gap-1 font-bold text-[#E5C07B] hover:text-white bg-[#D8B978]/20 px-2 py-0.5 rounded text-[11px] transition-all"
            >
              <Zap className="w-3 h-3 text-[#E5C07B]" />
              Lên trang mới
            </button>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="p-1 text-slate-400 hover:text-[#D8B978] transition-colors"
            title="Xem chi tiết phiên bản"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D8B978]" />
          </button>
        </div>
      </div>

      {/* 3. DETAILED UPDATE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0E131A] border border-[#D8B978]/50 rounded-2xl shadow-2xl p-6 sm:p-7 overflow-hidden">
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#D8B978]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D8B978] to-[#99732B] flex items-center justify-center text-[#0B0F14] shadow-lg">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-serif font-bold text-white">
                      Bản Cập Nhật Vercel V2.0
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                      DEPLOYED
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Triển khai tự động từ Git lên Vercel Production
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Build Details */}
            <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-[#141A23] border border-slate-800 text-xs mb-5 font-mono">
              <div>
                <span className="text-slate-500 block">Commit Git:</span>
                <span className="text-[#D8B978] font-bold">
                  {versionData?.commitSha || "a92f801"}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Trạng thái Vercel:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready & Active
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Kiểm tra lần cuối:</span>
                <span className="text-slate-300">{lastCheckTime}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Hệ thống:</span>
                <span className="text-slate-300">Next.js 16 + React 19</span>
              </div>
            </div>

            {/* Feature List */}
            <div className="space-y-2 mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D8B978]">
                Tính năng mới nổi bật trong trang mới:
              </h4>
              <div className="space-y-1.5 text-xs text-slate-300">
                {(
                  versionData?.features || [
                    "Giao diện V2.0 Royal Express siêu sang trọng hoàn toàn mới",
                    "Bảng điều độ tàu chạy trực tiếp & Live Train Radar GPS",
                    "Khám phá Toa Tàu & Cabin Suite 360° với mô phỏng view cửa sổ",
                    "Đặt trước ẩm thực 5 sao cung đình trên tàu",
                    "Lịch tìm vé giá tốt nhất theo ngày",
                    "Tra cứu vé PNR & Thẻ lên tàu điện tử Digital QR Boarding Pass",
                    "Trạm âm thanh đường sắt thư giãn ASMR & Nhạc du dương",
                  ]
                ).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D8B978] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleApplyUpdate}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#D8B978] via-[#F3E5AB] to-[#C9A96E] text-[#0B0F14] font-bold text-sm shadow-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Mở Giao Diện Mới Ngay</span>
              </button>

              <button
                onClick={checkVersion}
                disabled={isChecking}
                className="p-3 rounded-xl border border-slate-700 hover:border-[#D8B978] text-slate-300 hover:text-white transition-colors disabled:opacity-50"
                title="Làm mới kiểm tra Vercel"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isChecking ? "animate-spin text-[#D8B978]" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
