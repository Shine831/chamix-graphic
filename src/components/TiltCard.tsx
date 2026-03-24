"use client";

import React, { useState, useRef, createContext, useContext } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";

const TiltContext = createContext<{
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
} | null>(null);

export function ParallaxLayer({ children, offset = 0.1, className = "" }: { children: React.ReactNode, offset?: number, className?: string }) {
  const context = useContext(TiltContext);
  if (!context) return <>{children}</>;

  const x = useTransform(context.mouseX, [0, 1], [`${offset * 100}%`, `${-offset * 100}%`]);
  const y = useTransform(context.mouseY, [0, 1], [`${offset * 100}%`, `${-offset * 100}%`]);

  return (
    <motion.div style={{ x, y, zIndex: Math.floor(offset * 100) }} className={`absolute inset-0 ${className}`}>
      {children}
    </motion.div>
  );
}

export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [0, 1], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [0, 1], ["-7.5deg", "7.5deg"]);

  // Glare / Light position
  const glareX = useTransform(mouseXSpring, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <TiltContext.Provider value={{ mouseX: mouseXSpring, mouseY: mouseYSpring }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative w-full h-full overflow-hidden rounded-[4px] bg-[#111] border border-white/5 perspective-2000 transition-shadow duration-500 ${isHovered ? "shadow-[0_20px_50px_rgba(0,0,0,0.8)]" : ""} ${className}`}
      >
        <div className="relative w-full h-full pointer-events-none" style={{ transform: "translateZ(0px)" }}>
           {children}
        </div>

        {/* Dynamic Glare Overlay */}
        <motion.div
          className="absolute inset-0 z-50 pointer-events-none mix-blend-soft-light"
          style={{
            opacity: isHovered ? 0.4 : 0,
            background: useTransform(
              [glareX, glareY],
              ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.8) 0%, transparent 60%)`
            ),
          }}
        />

        {/* Subtle Rim Light */}
        <motion.div
           className="absolute inset-0 z-40 pointer-events-none border border-white/10"
           animate={{ opacity: isHovered ? 1 : 0 }}
        />
      </motion.div>
    </TiltContext.Provider>
  );
}
