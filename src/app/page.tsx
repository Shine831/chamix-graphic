"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
import { useRef } from "react";

const TITLE_WORDS = ["CHAMIX", "GRAPHIC"];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.85]);
  const heroSkew = useTransform(scrollYProgress, [0, 0.2], [0, -8]);

  // Kinetic typography & Distortion transforms
  const xLeft = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  const xRight = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const rgbDistortion = useTransform(scrollYProgress, [0, 0.2], [0, 15]);

  return (
    <>
      <Preloader />
      <Cursor />
      <Noise />
      <Navbar />
      <FloatingCTA />
      
      <main className="relative flex flex-col min-w-full" ref={containerRef}>
        {/* Advanced Background: Depth & Light */}
        <div className="fixed inset-0 z-0 bg-[#050505] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,20,60,0.12)_0%,rgba(5,5,5,1)_70%)]" />
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Hero Section Container */}
        <div className="h-[140vh] relative z-0">
          <motion.section 
            style={{ opacity: heroOpacity, scale: heroScale, skewY: heroSkew }}
            className="sticky top-0 z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pb-20 pt-32 overflow-hidden"
          >
            {/* Top Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12 magnetic"
            >
              <span className="px-6 py-2 text-[10px] font-mono font-black tracking-[0.5em] text-[#8A8A8A] uppercase border border-white/5 bg-white/5 backdrop-blur-2xl">
                [ EST_2024 // DOMINATION_PROTOCOL_ACTIVE ]
              </span>
            </motion.div>

            {/* Kinetic Typography Heading with RGB Split effect simulation */}
            <div className="relative select-none perspective-2000">
              <motion.div style={{ x: xLeft }} className="flex flex-col items-center relative">
                {/* Simulated RGB Split Layer */}
                <motion.h1
                  aria-hidden="true"
                  style={{ x: rgbDistortion }}
                  className="absolute inset-0 text-7xl sm:text-9xl md:text-[10rem] lg:text-[13rem] font-black tracking-tighter leading-[0.8] uppercase text-[#DC143C]/30 mix-blend-screen pointer-events-none"
                >
                  {TITLE_WORDS[0]}
                </motion.h1>
                <h1 className="text-7xl sm:text-9xl md:text-[10rem] lg:text-[13rem] font-black tracking-tighter leading-[0.8] uppercase text-white mix-blend-difference">
                  {TITLE_WORDS[0]}
                </h1>
              </motion.div>

              <motion.div style={{ x: xRight }} className="flex flex-col items-center -mt-4 sm:-mt-8 relative">
                 {/* Simulated RGB Split Layer */}
                 <motion.h1
                  aria-hidden="true"
                  style={{ x: useTransform(rgbDistortion, (v) => -Number(v)) }}
                  className="absolute inset-0 text-7xl sm:text-9xl md:text-[10rem] lg:text-[13rem] font-black tracking-tighter leading-[0.8] uppercase text-white/20 mix-blend-screen pointer-events-none"
                >
                  {TITLE_WORDS[1]}
                </motion.h1>
                <h1 className="text-7xl sm:text-9xl md:text-[10rem] lg:text-[13rem] font-black tracking-tighter leading-[0.8] uppercase text-[#DC143C] text-glow-crimson">
                  {TITLE_WORDS[1]}
                </h1>
              </motion.div>

              {/* Central Floating Statement */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, letterSpacing: "0.2em" }}
                animate={{ opacity: 1, scale: 1, letterSpacing: "0.6em" }}
                transition={{ delay: 3.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full pointer-events-none"
              >
                <p className="text-[10px] sm:text-xs md:text-sm font-black uppercase text-white/50 mix-blend-overlay">
                  L&apos;Architecture Visuelle de Domination
                </p>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 4.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl mt-12 text-sm sm:text-lg font-medium text-[#8A8A8A] uppercase tracking-[0.2em] leading-relaxed"
            >
              Expertise Radicale. Esthétique Implacable.
              <br />
              <span className="text-white">Conçu pour ceux qui exigent l&apos;absolu.</span>
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 4.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16"
            >
              <a
                href="https://wa.me/237659233477"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic group relative inline-flex items-center justify-center px-12 py-6 font-black tracking-[0.2em] text-white uppercase transition-all duration-700 bg-[#DC143C] overflow-hidden shadow-[0_25px_60px_rgba(220,20,60,0.4)] hover:shadow-[0_35px_80px_rgba(220,20,60,0.6)]"
              >
                <div className="absolute inset-0 w-full h-full transition-all duration-700 transform -translate-x-full bg-white group-hover:translate-x-0 ease-[cubic-bezier(0.16,1,0.3,1)] mix-blend-difference" />
                <span className="relative flex items-center gap-4">
                  <MessageSquare className="w-6 h-6" />
                  COMMANDER_MAINTENANT
                  <ArrowRight className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-2" />
                </span>
              </a>
            </motion.div>
          </motion.section>
        </div>

        {/* Content slide over */}
        <div className="relative z-20 bg-[#050505] border-t border-white/5 shadow-[0_-50px_100px_rgba(0,0,0,0.8)]">
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
