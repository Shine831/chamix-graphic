"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
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
  const [systemLabel] = useState(() => Math.random() > 0.5 ? "0X_COMMAND" : "UX_LINKED");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Ghost trail motion values
  const ghostX = useMotionValue(-100);
  const ghostY = useMotionValue(-100);

  // High-performance spring physics for the core
  const springConfig = { damping: 35, stiffness: 450, mass: 0.35 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Softer spring for the ghost trail
  const ghostSpringConfig = { damping: 20, stiffness: 100, mass: 1 };
  const trailX = useSpring(ghostX, ghostSpringConfig);
  const trailY = useSpring(ghostY, ghostSpringConfig);

  // Velocity-driven deformation (Squash & Stretch)
  const velocityX = useVelocity(cursorX);
  const velocityY = useVelocity(cursorY);

  // Calculate total velocity magnitude
  const velocity = useTransform([velocityX, velocityY], ([vx, vy]) =>
    Math.sqrt(Math.pow(Number(vx), 2) + Math.pow(Number(vy), 2))
  );

  const stretchX = useTransform(velocity, [0, 3000], [1, 1.8]);
  const stretchY = useTransform(velocity, [0, 3000], [1, 0.4]);

  // Chromatic Aberration offsets based on velocity
  const redOffset = useTransform(velocityX, [-3000, 3000], [-15, 15]);
  const blueOffset = useTransform(velocityX, [-3000, 3000], [15, -15]);

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

      // Magnetic pull: 65% towards target, 35% towards mouse for a heavier feel
      const pullX = centerX + (e.clientX - centerX) * 0.35;
      const pullY = centerY + (e.clientY - centerY) * 0.35;

      mouseX.set(pullX);
      mouseY.set(pullY);
      ghostX.set(pullX);
      ghostY.set(pullY);
    } else {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      ghostX.set(e.clientX);
      ghostY.set(e.clientY);
    }
  }, [magneticTarget, mouseX, mouseY, ghostX, ghostY]);

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
      {/* Advanced Liquid Filter */}
      <svg className="hidden">
        <defs>
          <filter id="liquid-premium">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="liquid" />
            <feComposite in="SourceGraphic" in2="liquid" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Dynamic Laser Sight Lines */}
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.2 }}
              exit={{ scaleX: 0, opacity: 0 }}
              className="absolute top-0 left-0 w-full h-[1px] bg-[#DC143C]"
              style={{ y: cursorY }}
            />
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 0.2 }}
              exit={{ scaleY: 0, opacity: 0 }}
              className="absolute top-0 left-0 h-full w-[1px] bg-[#DC143C]"
              style={{ x: cursorX }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Chromatic Trail Layers */}
      <motion.div
        className="absolute top-0 left-0 w-12 h-12 rounded-full bg-[#DC143C]/20 blur-xl"
        style={{
          x: trailX,
          y: trailY,
          translateX: useTransform(redOffset, v => `calc(-50% + ${v}px)`),
          translateY: "-50%",
        }}
      />
      <motion.div
        className="absolute top-0 left-0 w-12 h-12 rounded-full bg-[#00FFFF]/10 blur-xl"
        style={{
          x: trailX,
          y: trailY,
          translateX: useTransform(blueOffset, v => `calc(-50% + ${v}px)`),
          translateY: "-50%",
        }}
      />

      {/* Fluid Ghost Trail */}
      <motion.div
        className="absolute top-0 left-0 w-16 h-16 border border-[#DC143C]/20 rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          scale: useTransform(velocity, [0, 3000], [1, 2.5]),
          opacity: useTransform(velocity, [0, 3000], [0.1, 0.5]),
          filter: "blur(4px)",
        }}
      />

      {/* Main Kinetic Shell */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          filter: "url(#liquid-premium)",
          translateX: "-50%",
          translateY: "-50%",
          rotate: angle,
          scaleX: stretchX,
          scaleY: stretchY,
        }}
      >
        <motion.div
          animate={{
            width: isHovered ? 140 : 40,
            height: isHovered ? 140 : 40,
            border: isHovered ? "2px solid #DC143C" : "1px solid rgba(255, 255, 255, 0.4)",
            backgroundColor: isHovered ? "rgba(220, 20, 60, 0.15)" : "rgba(220, 20, 60, 0)",
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-full relative"
        >
          {/* Inner pulse for hovered state */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.4, opacity: [0, 0.6, 0] }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-[#DC143C]/40 rounded-full"
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
            scale: isActive ? 0.4 : isHovered ? 3 : 1,
            backgroundColor: isHovered ? "#FFFFFF" : "#DC143C",
            boxShadow: isHovered
              ? "0 0 40px #FFFFFF, 0 0 80px rgba(255, 255, 255, 0.4), 0 0 120px rgba(220, 20, 60, 0.4)"
              : "0 0 20px #DC143C",
          }}
          transition={{ duration: 0.3, ease: "backOut" }}
          className="w-2.5 h-2.5 rounded-full relative"
        >
          {/* Core Sparkle */}
          <div className="absolute inset-0 bg-white rounded-full blur-[1px] opacity-70" />
        </motion.div>
      </motion.div>

      {/* Modern System Label */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 80, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 20, filter: "blur(10px)" }}
            className="absolute top-0 left-0 flex items-center gap-6"
            style={{ x: cursorX, y: cursorY, translateY: "-50%" }}
          >
            <div className="h-[1px] w-12 bg-[#DC143C] origin-left" />
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-[0.8em] text-[#DC143C] leading-none">
                PROTOCOL_ACTIVE
              </span>
              <span className="text-[11px] font-mono text-white/50 mt-1.5 flex items-center gap-2">
                <span className="w-1 h-1 bg-[#DC143C] rounded-full animate-pulse" />
                {systemLabel}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
