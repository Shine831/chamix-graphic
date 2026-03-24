"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from "framer-motion";

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [magneticTarget, setMagneticTarget] = useState<HTMLElement | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // High-inertia physics for smooth, heavy movement
  const springConfig = { damping: 35, stiffness: 250, mass: 0.8 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Velocity-based squash and stretch
  const velX = useVelocity(cursorX);
  const velY = useVelocity(cursorY);

  const velocity = useTransform([velX, velY], ([vX, vY]) =>
    Math.sqrt(Math.pow(vX as number, 2) + Math.pow(vY as number, 2))
  );

  const rotation = useTransform([velX, velY], ([vX, vY]) =>
    Math.atan2(vY as number, vX as number) * (180 / Math.PI)
  );

  const scaleX = useTransform(velocity, (v) => 1 + Math.min(v * 0.0005, 0.4));
  const scaleY = useTransform(velocity, (v) => 1 - Math.min(v * 0.0003, 0.2));

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      let x = e.clientX;
      let y = e.clientY;

      if (magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Snap to center with a 20% influence from actual mouse position
        x = centerX + (x - centerX) * 0.2;
        y = centerY + (y - centerY) * 0.2;
      }

      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest("a, button, .hover-trigger");
      const magnetic = target.closest(".magnetic");

      setIsHovered(!!hoverable);
      setMagneticTarget(magnetic as HTMLElement);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

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
    <motion.div
      className="fixed top-0 left-0 z-[100] pointer-events-none hidden md:block mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        scaleX,
        scaleY,
        rotate: rotation,
      }}
    >
      <motion.div
        animate={{
          width: isHovered ? 80 : 32,
          height: isHovered ? 80 : 32,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          width: { type: "spring", bounce: 0.3 },
          height: { type: "spring", bounce: 0.3 },
          scale: { type: "spring", bounce: 0.4 },
        }}
        className="relative flex items-center justify-center rounded-full border border-white/40"
      >
        {/* Core Dot */}
        <motion.div
          animate={{
            scale: isHovered ? 0.5 : 1,
            backgroundColor: isHovered ? "#FFFFFF" : "#DC143C"
          }}
          className="w-1.5 h-1.5 rounded-full"
        />

        {/* Interaction HUD */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
             <div className="w-full h-full rounded-full border-[0.5px] border-white/20 scale-[1.2] animate-pulse" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
