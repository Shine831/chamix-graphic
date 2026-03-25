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

  const springConfig = { damping: 30, stiffness: 150, mass: 1 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [0, 1], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [0, 1], ["-7.5deg", "7.5deg"]);

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
        className={`relative w-full h-full transition-all duration-500 ease-out hover-trigger perspective-2000 ${className}`}
      >
        <div className="relative w-full h-full overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
          {children}

          {/* Multi-layered Glare Effect */}
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none mix-blend-soft-light"
            style={{
              opacity: isHovered ? 0.4 : 0,
              background: useTransform(
                [mouseXSpring, mouseYSpring],
                ([mx, my]) => `radial-gradient(circle at ${(mx as number) * 100}% ${(my as number) * 100}%, rgba(255,255,255,0.8) 0%, transparent 50%)`
              ),
            }}
          />
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none mix-blend-overlay"
            style={{
              opacity: isHovered ? 0.2 : 0,
              background: useTransform(
                [mouseXSpring, mouseYSpring],
                ([mx, my]) => `linear-gradient(${(mx as number) * 360}deg, transparent 40%, rgba(220,20,60,0.4) 50%, transparent 60%)`
              ),
            }}
          />
        </div>
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

  const x = useTransform(mouseX, [0, 1], [depth * -10, depth * 10]);
  const y = useTransform(mouseY, [0, 1], [depth * -10, depth * 10]);
  const z = depth * 20;

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
