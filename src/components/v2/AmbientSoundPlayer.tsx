"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Music,
  Sparkles,
  Disc,
} from "lucide-react";

interface SoundTrack {
  id: string;
  name: string;
  description: string;
  type: "train" | "rain" | "whistle" | "chords";
}

const SOUND_TRACKS: SoundTrack[] = [
  {
    id: "train_rhythm",
    name: "Tiếng Tàu Đêm Trên Đường Ray",
    description: "Nhịp gõ bánh sắt ru giấc ngủ êm ái",
    type: "train",
  },
  {
    id: "rain_window",
    name: "Mưa Rơi Bên Khung Cửa Sổ",
    description: "Âm thanh giọt mưa tí tách ngắm cảnh đèo",
    type: "rain",
  },
  {
    id: "distant_whistle",
    name: "Còi Tàu Vọng & Gió Biển Lăng Cô",
    description: "Tiếng còi tàu ấm áp vang vọng giữa núi non",
    type: "whistle",
  },
];

export const AmbientSoundPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isOpen, setIsOpen] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentTrack = SOUND_TRACKS[currentTrackIndex];

  const stopAudio = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    try {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
    } catch {
      // ignore
    }
    setIsPlaying(false);
  };

  const playSynthesizedTrack = (trackType: string) => {
    stopAudio();

    try {
      const AudioCtx =
        window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      if (trackType === "train") {
        // Train click-clack rhythm: periodic double low-frequency thuds
        intervalRef.current = setInterval(() => {
          if (!audioCtxRef.current) return;
          const t = audioCtxRef.current.currentTime;

          // Clack 1
          const osc1 = audioCtxRef.current.createOscillator();
          const g1 = audioCtxRef.current.createGain();
          osc1.type = "triangle";
          osc1.frequency.setValueAtTime(80, t);
          osc1.frequency.exponentialRampToValueAtTime(30, t + 0.1);
          g1.gain.setValueAtTime(masterGain.gain.value * 0.8, t);
          g1.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
          osc1.connect(g1);
          g1.connect(ctx.destination);
          osc1.start(t);
          osc1.stop(t + 0.1);

          // Clack 2 slightly delayed
          setTimeout(() => {
            if (!audioCtxRef.current) return;
            const t2 = audioCtxRef.current.currentTime;
            const osc2 = audioCtxRef.current.createOscillator();
            const g2 = audioCtxRef.current.createGain();
            osc2.type = "triangle";
            osc2.frequency.setValueAtTime(70, t2);
            osc2.frequency.exponentialRampToValueAtTime(25, t2 + 0.08);
            g2.gain.setValueAtTime(masterGain.gain.value * 0.6, t2);
            g2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.08);
            osc2.connect(g2);
            g2.connect(ctx.destination);
            osc2.start(t2);
            osc2.stop(t2 + 0.08);
          }, 140);
        }, 800);
      } else if (trackType === "rain") {
        // Continuous soft white/pink noise filter
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 600;

        noise.connect(filter);
        filter.connect(masterGain);
        noise.start();
        (oscillatorRef as any).current = noise;
      } else {
        // Melodic ambient drone
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.connect(masterGain);
        osc.start();
        oscillatorRef.current = osc;
      }

      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playSynthesizedTrack(currentTrack.type);
    }
  };

  const handleSelectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    if (isPlaying) {
      playSynthesizedTrack(SOUND_TRACKS[index].type);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <div className="relative">
      {/* Trigger Button in Header/Bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
          isPlaying
            ? "bg-[#D8B978]/20 border-[#D8B978] text-[#D8B978]"
            : "bg-[#141A23] border-slate-800 text-slate-300 hover:text-white"
        }`}
        title="Trạm âm thanh hành trình"
      >
        <Disc
          className={`w-3.5 h-3.5 ${isPlaying ? "animate-spin text-[#D8B978]" : ""}`}
        />
        <span className="hidden sm:inline">
          {isPlaying ? currentTrack.name.split(" ")[0] : "Âm Thanh Tàu"}
        </span>
        {isPlaying ? (
          <Volume2 className="w-3 h-3 text-emerald-400" />
        ) : (
          <VolumeX className="w-3 h-3 text-slate-500" />
        )}
      </button>

      {/* Mini Player Flyout */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-[#0E131A] border border-[#D8B978]/40 rounded-2xl shadow-2xl p-4 z-50">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D8B978]" />
              <span>Thư Giãn Cùng Tiếng Tàu</span>
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1.5 mb-4">
            {SOUND_TRACKS.map((t, idx) => (
              <div
                key={t.id}
                onClick={() => handleSelectTrack(idx)}
                className={`p-2 rounded-xl text-xs cursor-pointer transition-all ${
                  currentTrackIndex === idx
                    ? "bg-[#18212D] text-[#D8B978] font-bold border border-[#D8B978]/40"
                    : "text-slate-400 hover:bg-[#141A23] hover:text-white"
                }`}
              >
                <div>{t.name}</div>
                <div className="text-[10px] text-slate-500 font-normal">
                  {t.description}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <button
              onClick={togglePlay}
              className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#D8B978] to-[#B8964B] text-[#0B0F14] font-bold text-xs flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-95 transition-all shadow"
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
              <span>{isPlaying ? "Tạm Dừng" : "Phát Âm Thanh"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
