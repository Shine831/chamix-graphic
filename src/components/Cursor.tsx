"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button") || target.closest(".hover-trigger")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Outer spectral ring */}
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none hidden md:block mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            width: isHovered ? 64 : 32,
            height: isHovered ? 64 : 32,
            x: isHovered ? -16 : 0,
            y: isHovered ? -16 : 0,
            backgroundColor: isHovered ? "rgba(255,255,255,1)" : "rgba(220, 20, 60, 0)",
            border: isHovered ? "0px solid transparent" : "1px solid rgba(255,255,255,0.5)",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="rounded-full flex items-center justify-center transition-colors"
        >
          {/* Inner dot */}
          <motion.div
            animate={{
              opacity: isHovered ? 0 : 1,
              scale: isHovered ? 0 : 1,
            }}
            className="w-1.5 h-1.5 bg-[#DC143C] rounded-full"
          />
        </motion.div>
      </motion.div>
    </>
  );
}
