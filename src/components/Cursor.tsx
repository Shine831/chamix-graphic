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

  const stretchX = useTransform(velocity, [0, 3000], [1, 1.6]);
  const stretchY = useTransform(velocity, [0, 3000], [1, 0.5]);

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
      {/* Liquid Trail Effect (SVG Filter) */}
      <svg className="hidden">
        <defs>
          <filter id="liquid-premium">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="liquid" />
            <feComposite in="SourceGraphic" in2="liquid" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Fluid Ghost Trail */}
      <motion.div
        className="absolute top-0 left-0 w-16 h-16 border border-[#DC143C]/20 rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          scale: useTransform(velocity, [0, 3000], [1, 2]),
          opacity: useTransform(velocity, [0, 3000], [0.1, 0.4]),
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
            width: isHovered ? 120 : 40,
            height: isHovered ? 120 : 40,
            border: isHovered ? "2px solid #DC143C" : "1px solid rgba(255, 255, 255, 0.4)",
            backgroundColor: isHovered ? "rgba(220, 20, 60, 0.1)" : "rgba(220, 20, 60, 0)",
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-full relative"
        >
          {/* Inner pulse for hovered state */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: [0, 0.5, 0] }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-[#DC143C]/30 rounded-full"
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
            scale: isActive ? 0.5 : isHovered ? 2.5 : 1,
            backgroundColor: isHovered ? "#FFFFFF" : "#DC143C",
            boxShadow: isHovered
              ? "0 0 30px #FFFFFF, 0 0 60px rgba(255, 255, 255, 0.3)"
              : "0 0 20px #DC143C",
          }}
          transition={{ duration: 0.25 }}
          className="w-2 h-2 rounded-full relative"
        >
          {/* Core Sparkle */}
          <div className="absolute inset-0 bg-white rounded-full blur-[1px] opacity-50" />
        </motion.div>
      </motion.div>

      {/* Modern System Label */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 70, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 20, filter: "blur(10px)" }}
            className="absolute top-0 left-0 flex items-center gap-4"
            style={{ x: cursorX, y: cursorY, translateY: "-50%" }}
          >
            <div className="h-[1px] w-8 bg-[#DC143C]" />
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase tracking-[0.6em] text-[#DC143C] leading-none">
                PROTOCOL_ACTIVE
              </span>
              <span className="text-[10px] font-mono text-white/40 mt-1">
                {systemLabel}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
