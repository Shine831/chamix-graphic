"use client";

import { useState, useRef, createContext, useContext } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";

const TiltContext = createContext({
  mouseX: new MotionValue(0.5),
  mouseY: new MotionValue(0.5),
});

export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 35, stiffness: 200, mass: 0.6 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [0, 1], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [0, 1], ["-10deg", "10deg"]);

  // Depth of field (blur) based on tilt intensity
  const blurValue = useTransform(
    [mouseXSpring, mouseYSpring],
    ([mx, my]) => {
      const dist = Math.sqrt(Math.pow((mx as number) - 0.5, 2) + Math.pow((my as number) - 0.5, 2));
      return `${dist * 8}px`;
    }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
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
        className={`relative w-full h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover-trigger perspective-2000 ${className}`}
      >
        <motion.div
          className="relative w-full h-full overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            filter: isHovered ? "none" : "blur(0px)" // Placeholder for complex filter logic
          }}
        >
          {children}

          {/* Dynamic Specular Reflection (Glare) */}
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none mix-blend-plus-lighter"
            style={{
              opacity: isHovered ? 0.5 : 0,
              background: useTransform(
                [mouseXSpring, mouseYSpring],
                ([mx, my]) => {
                  const xPercent = (mx as number) * 100;
                  const yPercent = (my as number) * 100;
                  return `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(255,255,255,0.4) 0%, transparent 60%)`;
                }
              ),
            }}
          />

          {/* Crimson Accented Edge Glow */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              boxShadow: useTransform(
                [mouseXSpring, mouseYSpring],
                ([mx, my]) => {
                  const xShift = ((mx as number) - 0.5) * -20;
                  const yShift = ((my as number) - 0.5) * -20;
                  return `inset ${xShift}px ${yShift}px 40px -10px rgba(220,20,60,0.2)`;
                }
              ),
            }}
          />

          {/* Subtle Depth-of-Field Overlay */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none bg-black/5"
            style={{ backdropFilter: blurValue }}
          />
        </motion.div>
      </motion.div>
    </TiltContext.Provider>
  );
}

export function ParallaxLayer({
  children,
  depth = 1,
  className = ""
}: {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}) {
  const { mouseX, mouseY } = useContext(TiltContext);

  const x = useTransform(mouseX, [0, 1], [depth * -15, depth * 15]);
  const y = useTransform(mouseY, [0, 1], [depth * -15, depth * 15]);
  const z = depth * 30;

  return (
    <motion.div
      style={{
        x,
        y,
        z,
        transformStyle: "preserve-3d",
      }}
      className={`absolute inset-0 ${className}`}
    >
      {children}
    </motion.div>
  );
}
