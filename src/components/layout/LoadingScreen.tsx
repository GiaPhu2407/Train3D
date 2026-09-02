'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Train } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulated smooth boot progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 8;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#070A0E] flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Ambient Glow */}
          <div className="absolute w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Logo & Monogram */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center mb-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D8B978] via-[#C9A96E] to-[#8C6E38] p-0.5 shadow-[0_0_35px_rgba(201,169,110,0.5)] mb-4">
              <div className="w-full h-full bg-[#0B0F14] rounded-[14px] flex items-center justify-center">
                <Train className="w-8 h-8 text-[#D8B978]" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-black tracking-widest text-white mb-1">
              RAILWAY
            </h1>
            <p className="text-xs tracking-[0.3em] text-[#C9A96E] uppercase font-mono">
              Premier Express of Vietnam
            </p>
          </motion.div>

          {/* Animated Golden Track Line with Moving Train */}
          <div className="relative w-64 md:w-80 h-12 flex flex-col justify-end">
            {/* Moving Miniature Train on Track */}
            <motion.div
              className="absolute bottom-2.5 z-10 flex items-center text-[#D8B978]"
              style={{
                left: `${Math.min(progress, 90)}%`,
                transform: 'translateX(-50%)',
              }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <div className="relative">
                <Train className="w-5 h-5 drop-shadow-[0_0_8px_#C9A96E]" />
                <div className="absolute -left-3 top-1.5 w-3 h-0.5 bg-gradient-to-r from-transparent to-[#D8B978] blur-[0.5px]" />
              </div>
            </motion.div>

            {/* Glowing Rail Line */}
            <div className="relative w-full h-[3px] bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#8C6E38] via-[#F3E5AB] to-[#C9A96E] shadow-[0_0_12px_#D8B978]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Sleepers Beneath */}
            <div className="flex justify-between mt-1 px-1 opacity-30">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1 bg-[#C9A96E] rounded-xs" />
              ))}
            </div>
          </div>

          {/* Subtitle Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mt-6 text-xs font-mono text-slate-400 tracking-wider"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-ping" />
            <span>Preparing your journey... {Math.min(progress, 100)}%</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
