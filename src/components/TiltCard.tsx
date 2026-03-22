"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [0, 1], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [0, 1], ["-5deg", "5deg"]);
  // Glow effect positioning
  const backgroundX = useTransform(mouseXSpring, [0, 1], ["0%", "100%"]);
  const backgroundY = useTransform(mouseYSpring, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseEnter = () => setIsHovered(true);
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative w-full h-full rounded-[2px] transition-all duration-300 ease-out hover-trigger perspective-1000 ${className}`}
    >
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden shadow-2xl">
        {children}
        
        {/* The Glare / Light Reflection */}
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none mix-blend-overlay opacity-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.6 : 0,
            background: `radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 60%)`,
            left: useTransform(backgroundX, (v) => `calc(${v} - 50%)`),
            top: useTransform(backgroundY, (v) => `calc(${v} - 50%)`),
            width: "200%",
            height: "200%",
          }}
        />
      </div>
    </motion.div>
  );
}
