"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function FloatingCTA() {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
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

      // Magnetic pull within 150px radius
      if (distance < 150) {
        mouseX.set(distanceX * 0.4);
        mouseY.set(distanceY * 0.4);
        setIsHovered(true);
      } else {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
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
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{ x, y }}
      transition={{ delay: 2.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="magnetic hover-trigger fixed bottom-8 right-8 z-[90] flex items-center gap-4 px-8 py-5 bg-[#DC143C] text-white font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(220,20,60,0.5)] hover:shadow-[0_0_70px_rgba(220,20,60,0.7)] transition-shadow duration-500 group overflow-hidden"
    >
      {/* High-intensity Pulse aura */}
      <span className="absolute inset-0 rounded-none animate-ping bg-[#DC143C]/40 pointer-events-none" style={{ animationDuration: "1.5s" }} />
      <span className="absolute inset-0 rounded-none animate-pulse bg-white/10 pointer-events-none" />

      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

      <MessageSquare className="w-5 h-5 relative z-10 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12" />
      <span className="relative z-10 hidden sm:inline">Engager le Protocole</span>
      
      {/* Status indicator */}
      <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse" />
    </motion.a>
  );
}
