"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const BOOT_LOGS = [
  "INITIALIZING_QUANTUM_CORE...",
  "BYPASSING_STANDARD_PROTOCOLS...",
  "LOADING_PREMIUM_VECTORS...",
  "DOUALA_NODE_SYNCHRONIZED",
  "CHAMIX_PROTOCOL_STABLE",
  "ESTABLISHING_VISUAL_DOMINANCE"
];

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
const SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";

const ScrambleText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(prev =>
          prev.split("").map((char, index) => {
            if (index < iteration) return text[index];
            return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
          }).join("")
        );

        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, delay]);

  return <span>{displayText}</span>;
};

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLog, setCurrentLog] = useState(0);
  const [progress, setProgress] = useState(0);
  const [glitchText, setGlitchText] = useState("");

  useEffect(() => {
    const logInterval = setInterval(() => {
      setCurrentLog((prev) => (prev < BOOT_LOGS.length - 1 ? prev + 1 : prev));
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsLoading(false), 1200);
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 150);

    const glitchInterval = setInterval(() => {
      const randomChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      setGlitchText(randomChar);
    }, 50);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
      clearInterval(glitchInterval);
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
          {/* Advanced Laser Scan Effect */}
          <motion.div
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[2px] bg-[#DC143C] shadow-[0_0_20px_#DC143C] z-[80] opacity-40"
          />

          {/* Asymmetric Hydraulic Shutter Exit */}
          <motion.div
            exit={{
              y: "-100%",
              skewY: -12,
              transition: { duration: 1.2, ease: [0.85, 0, 0.15, 1] }
            }}
            className="absolute inset-x-0 top-0 h-1/2 bg-[#050505] z-50 border-b border-[#DC143C]/40 shadow-[0_25px_60px_rgba(220,20,60,0.3)]"
          />
          <motion.div
            exit={{
              y: "100%",
              skewY: 12,
              transition: { duration: 1.6, ease: [0.85, 0, 0.15, 1] }
            }}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#050505] z-50 border-t border-[#DC143C]/40 shadow-[0_-25px_60px_rgba(220,20,60,0.3)]"
          />

          {/* High-Intensity Crimson Flash-Blind */}
          <motion.div
            initial={{ opacity: 0 }}
            exit={{
              opacity: [0, 1, 0],
              scale: [1, 1.5, 1],
              transition: { duration: 0.8, times: [0, 0.15, 1] }
            }}
            className="absolute inset-0 z-[60] bg-[#DC143C] mix-blend-screen pointer-events-none"
          />

          <div className="relative z-[70] flex flex-col items-center">
            {/* Branding with Scramble & Glitch */}
            <div className="relative flex flex-col items-center mb-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <h1 className="text-7xl sm:text-9xl font-black tracking-[-0.08em] uppercase text-white leading-none">
                  <ScrambleText text="CHAMIX" delay={0.2} />
                </h1>
                <motion.h1
                  animate={{ x: [-3, 3, -2], opacity: [0.2, 0.5, 0.1] }}
                  transition={{ duration: 0.15, repeat: Infinity }}
                  className="absolute inset-0 text-7xl sm:text-9xl font-black tracking-[-0.08em] uppercase text-[#DC143C] mix-blend-screen pointer-events-none opacity-30"
                >
                  CHAMIX
                </motion.h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative -mt-4 sm:-mt-8"
              >
                <h1 className="text-7xl sm:text-9xl font-black tracking-[-0.08em] uppercase text-[#DC143C] text-glow-crimson leading-none">
                  <ScrambleText text="GRAPHIC" delay={0.5} />
                </h1>
              </motion.div>

              {/* Advanced Orbital Scanner */}
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -top-20 -left-20 w-40 h-40 border-[1px] border-[#DC143C]/20 rounded-full border-t-[#DC143C] pointer-events-none shadow-[0_0_30px_rgba(220,20,60,0.1)]"
              />
            </div>

            {/* Terminal Interface */}
            <div className="w-88 flex flex-col items-start gap-10">
              <div className="h-6 font-mono text-[10px] tracking-[0.5em] text-[#8A8A8A] uppercase w-full flex items-center gap-3">
                <span className="text-[#DC143C] font-black animate-pulse">[PROC]</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentLog}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 text-white/80"
                  >
                    {BOOT_LOGS[currentLog]}
                    <span className="text-[#DC143C] ml-1">{glitchText}</span>
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Progress System */}
              <div className="w-full space-y-3">
                <div className="relative w-full h-[4px] bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    className="absolute top-0 left-0 h-full bg-[#DC143C] z-20"
                  />
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                    className="absolute top-0 left-0 h-full bg-white/20 z-10"
                  />
                  {/* Energy Ripple on Progress Bar */}
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent z-30"
                  />
                </div>

                <div className="flex justify-between items-center w-full font-mono text-[10px] tracking-[0.3em]">
                  <div className="flex gap-6">
                    <span className="text-[#8A8A8A]">EST: <span className="text-white">DLA_237</span></span>
                    <span className="text-[#8A8A8A]">NODE: <span className="text-[#DC143C]">ELITE_V1</span></span>
                  </div>
                  <span className="text-white font-black">{Math.floor(progress)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kinetic Grid Pattern with Depth */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(rgba(220,20,60,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(220,20,60,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
          <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_0%,#050505_90%)" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
