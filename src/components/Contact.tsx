"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquare, MapPin, Mail, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // 3D entrance from below
  const rotateX = useTransform(scrollYProgress, [0, 0.3], ["6deg", "0deg"]);
  const translateZ = useTransform(scrollYProgress, [0, 0.3], ["-100px", "0px"]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  // Parallax for left vs right columns
  const leftY = useTransform(scrollYProgress, [0.1, 0.5], [40, 0]);
  const rightY = useTransform(scrollYProgress, [0.15, 0.55], [80, 0]);

  return (
    <section id="contact" ref={sectionRef} className="relative z-10 w-full max-w-7xl px-4 py-32 mx-auto overflow-hidden">
      <motion.div
        style={{
          rotateX,
          translateZ,
          opacity: sectionOpacity,
          transformPerspective: "1000px",
          transformOrigin: "center bottom",
        }}
        className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-between"
      >
        {/* Left Column with parallax */}
        <motion.div style={{ y: leftY }} className="flex-1 w-full max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6"
          >
            <span className="text-[#DC143C] block mb-2">Le Closing</span>
            Fermeture Des Deals.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-[#8A8A8A] mb-12"
          >
            À Douala, le business refuse l&apos;email lent. Le business se signe sur WhatsApp. 
            Prêt à transformer votre image en un actif rentable ?
          </motion.p>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-4 group"
            >
              <div className="p-3 bg-[#111] rounded-full text-[#DC143C] group-hover:bg-[#DC143C] group-hover:text-white transition-all duration-300">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold tracking-wide uppercase">Localisation Principale</h4>
                <p className="text-[#8A8A8A] font-mono mt-1">Logpom Bassong, Douala, Cameroun</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-4 group"
            >
              <div className="p-3 bg-[#111] rounded-full text-[#DC143C] group-hover:bg-[#DC143C] group-hover:text-white transition-all duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold tracking-wide uppercase">Vecteur Secondaire</h4>
                <p className="text-[#8A8A8A] font-mono mt-1">bambousrong@gmail.com</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column - CTA Card with heavier parallax */}
        <motion.div style={{ y: rightY }} className="flex-1 w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: "5deg" }}
            whileInView={{ opacity: 1, scale: 1, rotateY: "0deg" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel p-8 md:p-12 relative overflow-hidden group"
            style={{ transformPerspective: "800px" }}
          >
            {/* Ambient radar pulse */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#DC143C]/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#DC143C]/5 rounded-full blur-[60px] pointer-events-none" />
            
            <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4 flex items-center gap-2">
              ACCÈS PRIORITAIRE
              <ArrowUpRight className="w-5 h-5 text-[#DC143C]" />
            </h3>

            <a
              href="https://wa.me/237659233477?text=Bonjour%2C%20je%20suis%20prêt%20à%20engager%20la%20transformation%20visuelle."
              target="_blank"
              rel="noopener noreferrer"
              className="hover-trigger relative flex items-center justify-center w-full px-8 py-6 font-bold tracking-widest text-white uppercase transition-all duration-500 bg-[#DC143C] hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(220,20,60,0.5)] mt-8 group/btn overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out" />
              <span className="relative flex items-center gap-3">
                <MessageSquare className="w-6 h-6 group-hover/btn:text-[#DC143C] transition-colors" />
                Démarrer le Projet
              </span>
            </a>
            <p className="text-center text-[#8A8A8A] text-xs font-mono mt-4 uppercase tracking-widest">
              Ligne Critique : +237 659 233 477
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
