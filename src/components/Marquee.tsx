"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const words = [
  "BRANDING",
  "INFOGRAPHIE",
  "IDENTITÉ VISUELLE",
  "PACKAGING",
  "DIRECTION ARTISTIQUE",
  "DESIGN 3D",
  "STRATÉGIE VISUELLE",
  "PRINT DESIGN",
];

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // The marquee shifts based on scroll position for added dynamism
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative z-10 w-full overflow-hidden py-12 border-y border-white/5 bg-[#050505]">
      <motion.div style={{ opacity }}>
        {/* First row - scrolls left */}
        <motion.div
          style={{ x: x1 }}
          className="flex whitespace-nowrap gap-0 mb-4"
        >
          {[...words, ...words, ...words, ...words].map((word, i) => (
            <span
              key={`row1-${i}`}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white/[0.04] px-6 select-none shrink-0"
            >
              {word}
              <span className="text-[#DC143C]/20 mx-6">•</span>
            </span>
          ))}
        </motion.div>

        {/* Second row - scrolls right (opposite direction) */}
        <motion.div
          style={{ x: x2 }}
          className="flex whitespace-nowrap gap-0"
        >
          {[...words, ...words, ...words, ...words].reverse().map((word, i) => (
            <span
              key={`row2-${i}`}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white/[0.03] px-4 select-none shrink-0"
            >
              {word}
              <span className="text-[#DC143C]/10 mx-4">◆</span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
