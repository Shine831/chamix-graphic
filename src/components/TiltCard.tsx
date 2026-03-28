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

  const springConfig = { damping: 45, stiffness: 300, mass: 1 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [0, 1], ["18deg", "-18deg"]);
  const rotateY = useTransform(mouseXSpring, [0, 1], ["-18deg", "18deg"]);

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

  // Border Beam Position
  const beamX = useTransform(mouseXSpring, [0, 1], ["0%", "100%"]);
  const beamY = useTransform(mouseYSpring, [0, 1], ["0%", "100%"]);

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
          className="relative w-full h-full overflow-hidden bg-[#0a0a0a] border border-white/5 shadow-2xl"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {children}

          {/* Dynamic Border Beam */}
          <motion.div
            className="absolute inset-0 z-50 pointer-events-none"
            style={{
              opacity: isHovered ? 1 : 0,
              background: useTransform(
                [mouseXSpring, mouseYSpring],
                ([mx, my]) => {
                  const xPercent = (mx as number) * 100;
                  const yPercent = (my as number) * 100;
                  return `conic-gradient(from 0deg at ${xPercent}% ${yPercent}%, transparent 0%, #DC143C 25%, transparent 50%, #DC143C 75%, transparent 100%)`;
                }
              ),
              maskImage: `linear-gradient(black, black), linear-gradient(black, black)`,
              maskClip: "content-box, border-box",
              maskComposite: "exclude",
              padding: "2px",
            }}
          />

          {/* Multi-Layered Specular Refractions */}
          <motion.div
            className="absolute inset-0 z-40 pointer-events-none mix-blend-overlay"
            style={{
              opacity: isHovered ? 0.6 : 0,
              background: useTransform(
                [mouseXSpring, mouseYSpring],
                ([mx, my]) => {
                  const xPercent = (mx as number) * 100;
                  const yPercent = (my as number) * 100;
                  return `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(255,255,255,0.8) 0%, transparent 50%)`;
                }
              ),
            }}
          />

          <motion.div
            className="absolute inset-0 z-30 pointer-events-none mix-blend-color-dodge"
            style={{
              opacity: isHovered ? 0.4 : 0,
              background: useTransform(
                [mouseXSpring, mouseYSpring],
                ([mx, my]) => {
                  const xPercent = (1 - (mx as number)) * 100;
                  const yPercent = (1 - (my as number)) * 100;
                  return `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(220,20,60,0.6) 0%, transparent 70%)`;
                }
              ),
            }}
          />

          {/* Crimson Accented Edge Glow */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              opacity: isHovered ? 1 : 0,
              boxShadow: useTransform(
                [mouseXSpring, mouseYSpring],
                ([mx, my]) => {
                  const xShift = ((mx as number) - 0.5) * -50;
                  const yShift = ((my as number) - 0.5) * -50;
                  return `inset ${xShift}px ${yShift}px 80px -20px rgba(220,20,60,0.4)`;
                }
              ),
            }}
          />

          {/* Depth Grain Texture */}
          <div
            className="absolute inset-0 z-10 pointer-events-none opacity-[0.08] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
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

  const x = useTransform(mouseX, [0, 1], [depth * -35, depth * 35]);
  const y = useTransform(mouseY, [0, 1], [depth * -35, depth * 35]);
  const rotateZ = useTransform(mouseX, [0, 1], [depth * -3, depth * 3]);
  const z = depth * 60;

  return (
    <motion.div
      style={{
        x,
        y,
        z,
        rotateZ,
        transformStyle: "preserve-3d",
      }}
      className={`absolute inset-0 ${className}`}
    >
      {children}
    </motion.div>
  );
}
