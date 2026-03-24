"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const duration = 2800;
    const interval = 20;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Non-linear progress (ease out)
      const progress = Math.min(100, Math.floor(100 * Math.sin((step / steps) * (Math.PI / 2))));
      setCounter(progress);
      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => setIsLoading(false), 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const shutterVariants = {
    initial: { height: "50vh" },
    exit: { height: "0vh", transition: { duration: 1.2, ease: [0.85, 0, 0.15, 1] as any } }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 1.2, duration: 0 } }}
          className="fixed inset-0 z-[200] overflow-hidden"
        >
          {/* Top Shutter */}
          <motion.div
            variants={shutterVariants}
            initial="initial"
            exit="exit"
            className="absolute top-0 left-0 w-full bg-[#050505] z-50 flex items-end justify-center pb-8"
          >
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="text-8xl sm:text-[12rem] font-black text-white/5 absolute bottom-[-4rem] select-none"
             >
               CHAMIX
             </motion.div>
          </motion.div>

          {/* Bottom Shutter */}
          <motion.div
            variants={shutterVariants}
            initial="initial"
            exit="exit"
            className="absolute bottom-0 left-0 w-full bg-[#050505] z-50 flex items-start justify-center pt-8"
          >
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="text-8xl sm:text-[12rem] font-black text-white/5 absolute top-[-4rem] select-none"
             >
               GRAPHIC
             </motion.div>
          </motion.div>

          {/* Central Content */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="absolute inset-0 flex flex-col items-center justify-center z-[60]"
          >
             <div className="overflow-hidden mb-2">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-baseline gap-4"
                >
                   <span className="text-6xl sm:text-8xl font-black text-white italic tracking-tighter">
                      {counter}%
                   </span>
                </motion.div>
             </div>

             <motion.div
               initial={{ width: 0 }}
               animate={{ width: "200px" }}
               exit={{ width: 0, opacity: 0 }}
               className="h-[2px] bg-[#DC143C] relative overflow-hidden"
             >
                <motion.div
                  className="absolute inset-0 bg-white/40"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
             </motion.div>

             <motion.p
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ delay: 0.2 }}
               className="mt-6 text-[10px] font-mono tracking-[0.3em] text-[#8A8A8A] uppercase"
             >
               Loading High-Ticket Assets
             </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
