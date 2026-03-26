"use client";

import { useEffect, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useVelocity,
  useTransform,
  AnimatePresence
} from "framer-motion";

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [magneticTarget, setMagneticTarget] = useState<HTMLElement | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // High-performance spring physics
  const springConfig = { damping: 30, stiffness: 400, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Velocity-driven deformation (Squash & Stretch)
  const velocityX = useVelocity(cursorX);
  const velocityY = useVelocity(cursorY);

  const stretchX = useTransform(velocityX, [-3000, 0, 3000], [1.8, 1, 1.8]);
  const stretchY = useTransform(velocityY, [-3000, 0, 3000], [0.4, 1, 0.4]);

  const angle = useTransform([velocityX, velocityY], ([vx, vy]) => {
    const vX = Number(vx);
    const vY = Number(vy);
    if (Math.abs(vX) < 1 && Math.abs(vY) < 1) return 0;
    return Math.atan2(vY, vX) * (180 / Math.PI);
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (magneticTarget) {
      const rect = magneticTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Magnetic pull: 70% towards target, 30% towards mouse
      const pullX = centerX + (e.clientX - centerX) * 0.3;
      const pullY = centerY + (e.clientY - centerY) * 0.3;

      mouseX.set(pullX);
      mouseY.set(pullY);
    } else {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }
  }, [magneticTarget, mouseX, mouseY]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, .hover-trigger");
      const magnetic = target.closest(".magnetic") as HTMLElement;

      setIsHovered(!!interactive);
      setMagneticTarget(magnetic);
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove]);

  return (
    <div className="fixed inset-0 z-[999] pointer-events-none hidden md:block">
      {/* Liquid Trail Effect (SVG Filter) */}
      <svg className="hidden">
        <defs>
          <filter id="liquid">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
          </filter>
        </defs>
      </svg>

      {/* Main Kinetic Shell */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          filter: "url(#liquid)",
          translateX: "-50%",
          translateY: "-50%",
          rotate: angle,
          scaleX: stretchX,
          scaleY: stretchY,
        }}
      >
        <motion.div
          animate={{
            width: isHovered ? 100 : 44,
            height: isHovered ? 100 : 44,
            border: isHovered ? "2px solid #DC143C" : "1px solid rgba(255, 255, 255, 0.3)",
            backgroundColor: isHovered ? "rgba(220, 20, 60, 0.15)" : "rgba(220, 20, 60, 0)",
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-full relative"
        >
          {/* Inner pulse for hovered state */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute inset-0 border border-white/20 rounded-full animate-ping"
              />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Laser Core */}
      <motion.div
        className="absolute top-0 left-0 z-10"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isActive ? 0.6 : isHovered ? 2 : 1,
            backgroundColor: isHovered ? "#FFFFFF" : "#DC143C",
            boxShadow: isHovered
              ? "0 0 25px #FFFFFF"
              : "0 0 15px #DC143C",
          }}
          transition={{ duration: 0.2 }}
          className="w-2.5 h-2.5 rounded-full"
        />
      </motion.div>

      {/* Professional Metadata Label */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 50, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            className="absolute top-0 left-0 text-center"
            style={{ x: cursorX, y: cursorY, translateX: "-50%" }}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#DC143C] whitespace-nowrap bg-black/80 px-3 py-1.5 border border-[#DC143C]/30 backdrop-blur-xl">
                SYSTEM_ENGAGED
              </span>
              <div className="w-[1px] h-4 bg-gradient-to-b from-[#DC143C] to-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
