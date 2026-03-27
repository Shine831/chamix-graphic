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

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLog, setCurrentLog] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setCurrentLog((prev) => (prev < BOOT_LOGS.length - 1 ? prev + 1 : prev));
    }, 350);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsLoading(false), 800);
          return 100;
        }
        return prev + Math.random() * 18;
      });
    }, 150);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 1.2, duration: 0 } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Asymmetric Mechanical Opening Sequence */}
          <motion.div
            exit={{ y: "-100%", skewY: -5 }}
            transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
            className="absolute inset-x-0 top-0 h-1/2 bg-[#050505] z-50 border-b border-[#DC143C]/20"
          />
          <motion.div
            exit={{ y: "100%", skewY: 5 }}
            transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#050505] z-50 border-t border-[#DC143C]/20"
          />

          {/* Crimson Flash Light Leak (Hidden during loading, shown during exit) */}
          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, times: [0, 0.2, 1] }}
            className="absolute inset-0 z-[60] bg-[#DC143C] mix-blend-overlay pointer-events-none"
          />

          <motion.div
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            className="relative z-[70] flex flex-col items-center"
          >
            {/* High-Ticket Branding */}
            <div className="relative flex flex-col items-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="overflow-hidden"
              >
                <h1 className="text-6xl sm:text-8xl font-black tracking-[-0.05em] uppercase text-white">
                  CHAMIX
                </h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="overflow-hidden -mt-4 sm:-mt-6"
              >
                <h1 className="text-6xl sm:text-8xl font-black tracking-[-0.05em] uppercase text-[#DC143C] text-glow-crimson">
                  GRAPHIC
                </h1>
              </motion.div>

              {/* Decorative Crosshair */}
              <motion.div
                animate={{ rotate: 90 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-12 -left-12 w-24 h-24 border border-white/5 rounded-full pointer-events-none"
              />
            </div>

            {/* Terminal Interface */}
            <div className="w-80 flex flex-col items-start gap-6">
              <div className="h-4 font-mono text-[9px] tracking-[0.3em] text-[#8A8A8A] uppercase overflow-hidden w-full">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentLog}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "circOut" }}
                    className="block"
                  >
                    {BOOT_LOGS[currentLog]}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Precision Progress Bar */}
              <div className="relative w-full h-[2px] bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  className="absolute top-0 left-0 h-full bg-[#DC143C]"
                />
                {/* Secondary trailing bar for depth */}
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="absolute top-0 left-0 h-full bg-white/20"
                />
              </div>

              <div className="flex justify-between w-full font-mono text-[9px] text-[#8A8A8A] tracking-tighter">
                <span>PRCS_LVL</span>
                <span className="text-white">{Math.floor(progress)}%</span>
              </div>
            </div>
          </motion.div>

          {/* Dynamic Laser Scan */}
          <motion.div
            animate={{
              top: ["-10%", "110%"],
              opacity: [0, 0.8, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#DC143C] to-transparent z-[55] blur-[1px]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
