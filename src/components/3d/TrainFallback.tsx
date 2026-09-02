'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const TrainFallback: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[420px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#070A0E] via-[#0B0F14] to-[#111827]">
      {/* Background Mountain & Mist silhouettes */}
      <div className="absolute inset-0 opacity-25">
        <svg className="w-full h-full object-cover" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <path
            d="M0,450 L180,320 L350,420 L580,260 L780,380 L1020,280 L1200,390 L1200,600 L0,600 Z"
            fill="#1E293B"
          />
          <path
            d="M0,490 L220,390 L460,480 L690,360 L920,440 L1200,370 L1200,600 L0,600 Z"
            fill="#0F172A"
          />
        </svg>
      </div>

      {/* Atmospheric Fog Layers */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#0B0F14]/60 to-[#0B0F14]" />

      {/* Perspective Railway Tracks */}
      <div className="absolute bottom-0 w-full h-48 flex justify-center items-end overflow-hidden">
        <div className="relative w-[600px] h-full">
          {/* Rails diverging */}
          <div className="absolute top-0 left-1/2 -translate-x-12 w-1 h-full bg-gradient-to-b from-[#C9A96E]/20 via-[#CBD5E1]/60 to-[#CBD5E1] transform -skew-x-[24deg]" />
          <div className="absolute top-0 right-1/2 translate-x-12 w-1 h-full bg-gradient-to-b from-[#C9A96E]/20 via-[#CBD5E1]/60 to-[#CBD5E1] transform skew-x-[24deg]" />

          {/* Sleepers */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={`sleep-${i}`}
              className="absolute left-1/2 -translate-x-1/2 bg-[#1E242B] border-t border-[#C9A96E]/20 rounded-xs"
              style={{
                top: `${(i / 12) * 100}%`,
                width: `${100 + i * 36}px`,
                height: `${4 + i * 0.8}px`,
                opacity: 0.3 + (i / 12) * 0.7,
              }}
              animate={{
                top: [`${((i) / 12) * 100}%`, `${((i + 1) / 12) * 100}%`],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </div>

      {/* Stylized Luxury Train Silhouette with Glowing Headlights */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Headlight Cones */}
        <div className="relative flex justify-center">
          <div className="absolute -bottom-10 -left-20 w-32 h-64 bg-gradient-to-b from-[#FFF4D0]/40 via-[#C9A96E]/15 to-transparent transform -rotate-12 blur-md pointer-events-none" />
          <div className="absolute -bottom-10 -right-20 w-32 h-64 bg-gradient-to-b from-[#FFF4D0]/40 via-[#C9A96E]/15 to-transparent transform rotate-12 blur-md pointer-events-none" />
        </div>

        {/* 2.5D Train Body Illustration */}
        <div className="relative w-72 md:w-96 h-36 bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#070A0E] rounded-t-3xl border-t-2 border-x border-[#C9A96E]/40 shadow-2xl p-4 flex flex-col justify-between">
          {/* Top Windshield */}
          <div className="w-full h-10 bg-gradient-to-b from-[#090D12] to-[#1E293B] rounded-t-xl border-b border-[#C9A96E]/30 flex items-center justify-center overflow-hidden">
            <div className="w-2/3 h-5 bg-[#FFD79A]/20 rounded-xs border border-[#FFD79A]/40 shadow-inner flex items-center justify-center">
              <span className="text-[10px] tracking-widest text-[#D8B978] font-mono">SE3 EXPRESS</span>
            </div>
          </div>

          {/* Golden Belt Line */}
          <div className="w-full h-1.5 bg-gradient-to-r from-[#8C6E38] via-[#F3E5AB] to-[#8C6E38] rounded-full shadow-[0_0_10px_#C9A96E]" />

          {/* Passenger Windows */}
          <div className="flex justify-between items-center px-3 space-x-2">
            {[1, 2, 3, 4].map((w) => (
              <div
                key={w}
                className="w-12 h-6 bg-gradient-to-b from-[#FFD79A] to-[#FFB84D] rounded-xs shadow-[0_0_12px_rgba(255,184,77,0.5)] border border-[#FFE5B4]"
              />
            ))}
          </div>

          {/* Dual High-Beam Headlamps */}
          <div className="flex justify-between items-center px-4 pt-2">
            <div className="w-6 h-6 rounded-full bg-[#FFF4D0] shadow-[0_0_20px_#FFF4D0] border-2 border-white animate-pulse" />
            <div className="w-3 h-3 rounded-full bg-[#C9A96E] shadow-[0_0_10px_#C9A96E]" />
            <div className="w-6 h-6 rounded-full bg-[#FFF4D0] shadow-[0_0_20px_#FFF4D0] border-2 border-white animate-pulse" />
          </div>
        </div>

        {/* Train Chassis & Wheels Shadow */}
        <div className="w-76 md:w-100 h-4 bg-[#070A0E] rounded-b-md border-t border-[#334155] shadow-2xl flex justify-around items-center px-6">
          {[1, 2, 3, 4, 5, 6].map((w) => (
            <div key={w} className="w-4 h-4 rounded-full bg-[#334155] border border-[#64748B]" />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
