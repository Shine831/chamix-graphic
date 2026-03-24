"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";
import Noise from "@/components/Noise";
import FloatingCTA from "@/components/FloatingCTA";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import Magnetic from "@/components/Magnetic";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Hero Animations
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.8]);

  // Kinetic Typography
  const skewX = useTransform(scrollYProgress, [0, 0.15], [0, 10]);
  const rotateX = useTransform(scrollYProgress, [0, 0.15], [0, -15]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [0, -100]);

  // Background Depth Layers
  const bgLayer1Y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgLayer2Y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <>
      <Preloader />
      <Cursor />
      <Noise />
      <Navbar />
      <FloatingCTA />
      
      <main className="relative flex flex-col min-w-full" ref={containerRef}>
        {/* Layered Background System */}
        <div className="fixed inset-0 z-0 bg-[#050505] pointer-events-none">
           {/* Deep Glow */}
           <motion.div
             style={{ y: bgLayer1Y }}
             className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(220,20,60,0.15)_0%,transparent_50%)]"
           />
           {/* Secondary Atmosphere */}
           <motion.div
             style={{ y: bgLayer2Y }}
             className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(220,20,60,0.05)_0%,transparent_40%)]"
           />
           <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
        </div>

        {/* Hero Section */}
        <div className="h-[120vh] relative z-10">
          <motion.section 
            style={{ opacity: heroOpacity, scale: heroScale, skewX, rotateX }}
            className="sticky top-0 z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pb-20 pt-32 perspective-2000"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 3.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <span className="px-5 py-2 text-[10px] font-mono font-black tracking-[0.4em] text-white/40 uppercase border border-white/5 rounded-full bg-white/5 backdrop-blur-md">
                ESTD // 2024 // DOUALA
              </span>
            </motion.div>

            <motion.div style={{ y: titleY }} className="relative">
              <motion.h1
                initial={{ opacity: 0, filter: "blur(20px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5, delay: 3.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-6xl text-6xl font-black tracking-tighter uppercase sm:text-7xl md:text-8xl lg:text-[8rem] leading-[0.85] text-white select-none"
              >
                <span className="text-glow-crimson block mb-2 relative">
                  CHAMIX GRAPHIC
                </span>
                <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-white/90 font-bold tracking-tight">
                  <span className="text-white/30 italic">L&apos;Ingénierie</span> Visuelle
                  <br />
                  <span className="relative">
                    Qui Domine.
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 4.5, duration: 1, ease: [0.85, 0, 0.15, 1] }}
                      className="absolute -bottom-2 left-0 h-[2px] bg-[#DC143C]"
                    />
                  </span>
                </span>
              </motion.h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 4.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl mt-10 text-sm font-medium text-white/50 sm:text-base tracking-wide uppercase leading-relaxed"
            >
              Le design n&apos;est pas une option. <br />
              C&apos;est votre arme de persuasion massive.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 4.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14"
            >
              <Magnetic strength={0.2}>
                <a
                  href="https://wa.me/237659233477"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-trigger group relative inline-flex items-center justify-center px-12 py-6 font-black tracking-[0.2em] text-white uppercase transition-all duration-500 bg-[#DC143C] shadow-[0_0_40px_rgba(220,20,60,0.3)] hover:shadow-[0_0_60px_rgba(220,20,60,0.5)]"
                >
                  <div className="absolute inset-0 w-full h-full transition-all duration-700 transform -translate-x-full bg-white group-hover:translate-x-0 ease-[cubic-bezier(0.85,0,0.15,1)] mix-blend-difference" />
                  <span className="relative flex items-center gap-4">
                    <MessageSquare className="w-5 h-5 fill-current" />
                    Lancer le Projet
                    <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" />
                  </span>
                </a>
              </Magnetic>

              <div className="mt-8 flex flex-col items-center gap-2">
                 <div className="w-[1px] h-12 bg-gradient-to-b from-[#DC143C] to-transparent animate-shimmer-y" />
                 <span className="text-[9px] font-mono tracking-[0.5em] text-white/20 uppercase">
                    Scroll pour explorer
                 </span>
              </div>
            </motion.div>
          </motion.section>
        </div>

        {/* Content Sections */}
        <div className="relative z-20 bg-[#050505] border-t border-white/5 shadow-[0_-40px_100px_rgba(0,0,0,0.9)]">
          <Marquee />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}
