"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const BOOT_LOGS = [
  "INITIALIZING_CORE_SYSTEM...",
  "ESTABLISHING_PREMIUM_CONNECTION...",
  "LOADING_LUXURY_ASSETS...",
  "CALIBRATING_VISUAL_PRECISION...",
  "DOUALA_NODE_ACTIVE",
  "CHAMIX_PROTOCOL_READY"
];

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLog, setCurrentLog] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setCurrentLog((prev) => (prev < BOOT_LOGS.length - 1 ? prev + 1 : prev));
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          exit={{ opacity: 1 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Asymmetric Background Shutters */}
          <motion.div
            exit={{ x: "-100%" }}
            transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 bg-[#050505] z-50 border-r border-white/5"
          />
          <motion.div
            exit={{ x: "100%" }}
            transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
            className="absolute inset-y-0 right-0 w-1/2 bg-[#050505] z-50 border-l border-white/5"
          />

          <div className="relative z-[60] flex flex-col items-center">
            {/* Glitchy Text Header */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                className="text-5xl sm:text-7xl font-black tracking-tighter uppercase text-white"
              >
                CHAMIX
              </motion.h1>
            </div>

            <div className="overflow-hidden mb-12">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.1 }}
                className="text-5xl sm:text-7xl font-black tracking-tighter uppercase text-[#DC143C]"
              >
                GRAPHIC
              </motion.h1>
            </div>

            {/* Terminal Boot Logs */}
            <div className="h-6 mb-8 font-mono text-[10px] tracking-[0.2em] text-[#8A8A8A] uppercase flex flex-col items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentLog}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {BOOT_LOGS[currentLog]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Premium Progress Bar */}
            <div className="relative w-64 h-[1px] bg-white/10">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                className="absolute top-0 left-0 h-full bg-[#DC143C] shadow-[0_0_15px_rgba(220,20,60,0.8)]"
              />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[10px] text-white/40">
                {Math.floor(progress)}%
              </div>
            </div>
          </div>

          {/* Decorative scanner line */}
          <motion.div
            animate={{
              top: ["0%", "100%", "0%"],
              opacity: [0, 0.5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[1px] bg-[#DC143C]/30 z-[55] blur-[1px]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
