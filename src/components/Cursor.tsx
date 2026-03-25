"use client";

import { useEffect, useState, useRef } from "react";
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
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Velocity for stretching effect
  const velocityX = useVelocity(cursorX);
  const velocityY = useVelocity(cursorY);

  const scaleX = useTransform(velocityX, [-3000, 0, 3000], [1.5, 1, 1.5]);
  const scaleY = useTransform(velocityY, [-3000, 0, 3000], [0.5, 1, 0.5]);
  const angle = useTransform([velocityX, velocityY], ([vx, vy]) => {
    return Math.atan2(Number(vy), Number(vx)) * (180 / Math.PI);
  });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Attract cursor towards center, but still follow mouse slightly
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        mouseX.set(centerX + distanceX * 0.3);
        mouseY.set(centerY + distanceY * 0.3);
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, .hover-trigger");
      const magnetic = target.closest(".magnetic") as HTMLElement;

      setIsHovered(!!interactive);
      setMagneticTarget(magnetic);
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY, magneticTarget]);

  return (
    <div className="fixed inset-0 z-[999] pointer-events-none hidden md:block">
      {/* Velocity-based Outer Ring */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          rotate: angle,
          scaleX,
          scaleY,
        }}
      >
        <motion.div
          animate={{
            width: isHovered ? 80 : 40,
            height: isHovered ? 80 : 40,
            border: isHovered ? "1px solid rgba(220, 20, 60, 1)" : "1px solid rgba(255, 255, 255, 0.4)",
            backgroundColor: isHovered ? "rgba(220, 20, 60, 0.1)" : "rgba(220, 20, 60, 0)",
          }}
          className="rounded-full transition-colors duration-300"
        />
      </motion.div>

      {/* Sharp Central Core */}
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
            scale: isActive ? 0.5 : isHovered ? 1.5 : 1,
            backgroundColor: isHovered ? "#FFFFFF" : "#DC143C",
          }}
          className="w-2 h-2 rounded-full shadow-[0_0_10px_rgba(220,20,60,0.8)]"
        />
      </motion.div>

      {/* Trailing Label for high-ticket feel */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 40 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-0 left-0"
            style={{ x: cursorX, y: cursorY, translateY: "-50%" }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white whitespace-nowrap bg-black/50 px-2 py-1 backdrop-blur-md border-l-2 border-[#DC143C]">
              EXPLORER_ELITE
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
