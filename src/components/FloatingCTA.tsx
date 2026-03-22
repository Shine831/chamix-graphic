"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export default function FloatingCTA() {
  return (
    <motion.a
      href="https://wa.me/237659233477?text=Bonjour%2C%20je%20suis%20prêt%20à%20engager%20la%20transformation%20visuelle."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="hover-trigger fixed bottom-6 right-6 z-[90] flex items-center gap-3 px-6 py-4 bg-[#DC143C] text-white font-bold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(220,20,60,0.4)] hover:shadow-[0_0_50px_rgba(220,20,60,0.6)] transition-shadow duration-500 group"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-none animate-ping bg-[#DC143C]/30 pointer-events-none" style={{ animationDuration: "2s" }} />
      
      <MessageSquare className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:rotate-12" />
      <span className="relative z-10 hidden sm:inline">WhatsApp</span>
    </motion.a>
  );
}
