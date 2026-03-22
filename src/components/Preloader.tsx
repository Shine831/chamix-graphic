"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050505]"
        >
          {/* Crimson line scan */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 1.5, repeat: 1, ease: "linear" }}
            className="absolute top-1/2 left-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#DC143C] to-transparent"
          />

          {/* Brand text reveal */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="text-4xl sm:text-6xl font-black tracking-tighter uppercase text-white"
            >
              CHAMIX GRAPHIC
            </motion.h1>
          </div>

          {/* Tagline */}
          <div className="overflow-hidden mt-4">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="text-sm font-mono text-[#8A8A8A] tracking-widest uppercase"
            >
              Architecture Visuelle de Prestige
            </motion.p>
          </div>

          {/* Loading progress bar */}
          <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-white/10 overflow-hidden"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full bg-[#DC143C]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
