"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { useEffect, useRef } from "react";

export default function FloatingCTA() {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Heavier spring for premium magnetic feel
  const springConfig = { damping: 25, stiffness: 120, mass: 0.8 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      // Stronger magnetic pull within 200px radius
      if (distance < 200) {
        mouseX.set(distanceX * 0.45);
        mouseY.set(distanceY * 0.45);
      } else {
        mouseX.set(0);
        mouseY.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.a
      ref={buttonRef}
      href="https://wa.me/237659233477?text=Bonjour%2C%20je%20suis%20prêt%20à%20engager%20la%20transformation%20visuelle."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0, y: 100 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      style={{ x, y }}
      transition={{ delay: 3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="magnetic hover-trigger fixed bottom-8 right-8 z-[90] flex items-center gap-5 px-10 py-6 bg-[#DC143C] text-white font-black text-xs uppercase tracking-[0.3em] shadow-[0_15px_50px_rgba(220,20,60,0.5)] hover:shadow-[0_25px_80px_rgba(220,20,60,0.7)] transition-shadow duration-700 group overflow-hidden"
    >
      {/* Pulse Radar Effect: Expanding Concentric Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut",
            }}
            className="absolute w-full h-full border border-white/20"
          />
        ))}
      </div>

      {/* Glossy Liquid Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

      <MessageSquare className="w-6 h-6 relative z-10 transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12" />
      <span className="relative z-10 hidden sm:inline">Engager le Protocole</span>
      
      {/* Precision Status Indicator */}
      <div className="absolute top-3 right-3 flex gap-1 items-center">
        <span className="text-[7px] font-mono opacity-60 mr-1 hidden group-hover:block">ONLINE</span>
        <div className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_12px_rgba(74,222,128,0.9)] animate-pulse" />
      </div>

      {/* Edge Highlight */}
      <div className="absolute inset-0 border border-white/10 group-hover:border-white/30 transition-colors duration-500" />
    </motion.a>
  );
}
