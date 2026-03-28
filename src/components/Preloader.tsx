"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const BOOT_LOGS = [
  "INITIALIZING_QUANTUM_CORE...",
  "BYPASSING_STANDARD_PROTOCOLS...",
  "LOADING_PREMIUM_VECTORS...",
  "DOUALA_NODE_SYNCHRONIZED",
  "CHAMIX_PROTOCOL_STABLE",
  "ESTABLISHING_VISUAL_DOMINANCE"
];

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;':\",./<>?";

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
          setTimeout(() => setIsLoading(false), 1000);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 180);

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
          {/* Asymmetric Hydraulic Shutter Exit */}
          <motion.div
            exit={{
              y: "-100%",
              skewY: -10,
              transition: { duration: 1, ease: [0.85, 0, 0.15, 1] }
            }}
            className="absolute inset-x-0 top-0 h-1/2 bg-[#050505] z-50 border-b border-[#DC143C]/30 shadow-[0_20px_50px_rgba(220,20,60,0.2)]"
          />
          <motion.div
            exit={{
              y: "100%",
              skewY: 10,
              transition: { duration: 1.4, ease: [0.85, 0, 0.15, 1] } // Variable speed for organic feel
            }}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#050505] z-50 border-t border-[#DC143C]/30 shadow-[0_-20px_50px_rgba(220,20,60,0.2)]"
          />

          {/* High-Intensity Crimson Flash */}
          <motion.div
            initial={{ opacity: 0 }}
            exit={{
              opacity: [0, 1, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 0.8, times: [0, 0.1, 1] }}
            className="absolute inset-0 z-[60] bg-[#DC143C] mix-blend-soft-light pointer-events-none"
          />

          <div className="relative z-[70] flex flex-col items-center">
            {/* High-Ticket Branding with Glitch Artifacts */}
            <div className="relative flex flex-col items-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden"
              >
                <h1 className="text-7xl sm:text-9xl font-black tracking-[-0.08em] uppercase text-white leading-none">
                  CHAMIX
                </h1>
                {/* Secondary Glitch Layer */}
                <motion.h1
                  animate={{ x: [-2, 2, -1], opacity: [0.3, 0.6, 0.2] }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                  className="absolute inset-0 text-7xl sm:text-9xl font-black tracking-[-0.08em] uppercase text-[#DC143C] mix-blend-screen pointer-events-none opacity-30"
                >
                  CHAMIX
                </motion.h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="relative overflow-hidden -mt-4 sm:-mt-8"
              >
                <h1 className="text-7xl sm:text-9xl font-black tracking-[-0.08em] uppercase text-[#DC143C] text-glow-crimson leading-none">
                  GRAPHIC
                </h1>
              </motion.div>

              {/* Orbital Scanner */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -top-16 -left-16 w-32 h-32 border-2 border-[#DC143C]/10 rounded-full border-t-[#DC143C]/40 pointer-events-none"
              />
            </div>

            {/* Terminal Interface: System Logs */}
            <div className="w-80 flex flex-col items-start gap-8">
              <div className="h-6 font-mono text-[10px] tracking-[0.4em] text-[#8A8A8A] uppercase w-full flex items-center gap-2">
                <span className="text-[#DC143C] font-black">[RUN]</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentLog}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 10, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex-1"
                  >
                    {BOOT_LOGS[currentLog]}
                    <span className="text-[#DC143C] ml-1">{glitchText}</span>
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Advanced Multi-Stage Progress Bar */}
              <div className="w-full space-y-2">
                <div className="relative w-full h-[3px] bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    className="absolute top-0 left-0 h-full bg-[#DC143C] z-20"
                  />
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="absolute top-0 left-0 h-full bg-white/30 z-10"
                  />
                </div>

                <div className="flex justify-between items-center w-full font-mono text-[9px] tracking-[0.2em]">
                  <div className="flex gap-4">
                    <span className="text-[#8A8A8A]">EST: <span className="text-white">DLA_237</span></span>
                    <span className="text-[#8A8A8A]">SYS: <span className="text-[#DC143C]">READY</span></span>
                  </div>
                  <span className="text-white font-black">{Math.floor(progress)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kinetic Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(220,20,60,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(220,20,60,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
