"use client";

import { motion, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";
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

  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  // Transform velocity into visual effects
  const letterSpacing = useTransform(smoothVelocity, [-1, 0, 1], ["0.2em", "0em", "0.2em"]);
  const titleSkew = useTransform(smoothVelocity, [-1, 0, 1], [-15, 0, 15]);
  const grainOpacity = useTransform(scrollYProgress, [0, 0.1], [0.03, 0.08]);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.8]);
  const heroSkew = useTransform(scrollYProgress, [0, 0.2], [0, -5]);

  // Split-word kinetic transforms
  const xLeft = useTransform(scrollYProgress, [0, 0.4], [0, -200]);
  const xRight = useTransform(scrollYProgress, [0, 0.4], [0, 200]);
  const rgbDistortion = useTransform(smoothVelocity, [-1, 0, 1], [-20, 0, 20]);

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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(220,20,60,0.15)_0%,rgba(5,5,5,1)_75%)]" />
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 1, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-10%]"
            style={{
              opacity: grainOpacity,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Hero Section Container */}
        <div className="h-[150vh] relative z-0">
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
              <span className="px-8 py-2.5 text-[10px] font-mono font-black tracking-[0.6em] text-[#DC143C] uppercase border border-[#DC143C]/20 bg-[#DC143C]/5 backdrop-blur-3xl shadow-[0_0_20px_rgba(220,20,60,0.1)]">
                [ EST_2024 // PROTOCOL_LEVEL_01 ]
              </span>
            </motion.div>

            {/* Adaptive Kinetic Typography */}
            <div className="relative select-none perspective-2000">
              <motion.div style={{ x: xLeft, skewX: titleSkew, letterSpacing }} className="flex flex-col items-center relative">
                {/* RGB Split Layer (Velocity Sensitive) */}
                <motion.h1
                  aria-hidden="true"
                  style={{ x: rgbDistortion }}
                  className="absolute inset-0 text-7xl sm:text-9xl md:text-[11rem] lg:text-[15rem] font-black tracking-tighter leading-[0.75] uppercase text-[#DC143C]/40 mix-blend-screen pointer-events-none blur-[2px]"
                >
                  {TITLE_WORDS[0]}
                </motion.h1>
                <h1 className="text-7xl sm:text-9xl md:text-[11rem] lg:text-[15rem] font-black tracking-tighter leading-[0.75] uppercase text-white mix-blend-difference drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  {TITLE_WORDS[0]}
                </h1>
              </motion.div>

              <motion.div style={{ x: xRight, skewX: titleSkew, letterSpacing }} className="flex flex-col items-center -mt-6 sm:-mt-10 relative">
                 {/* RGB Split Layer (Velocity Sensitive) */}
                 <motion.h1
                  aria-hidden="true"
                  style={{ x: useTransform(rgbDistortion, (v) => -Number(v)) }}
                  className="absolute inset-0 text-7xl sm:text-9xl md:text-[11rem] lg:text-[15rem] font-black tracking-tighter leading-[0.75] uppercase text-white/30 mix-blend-screen pointer-events-none blur-[2px]"
                >
                  {TITLE_WORDS[1]}
                </motion.h1>
                <h1 className="text-7xl sm:text-9xl md:text-[11rem] lg:text-[15rem] font-black tracking-tighter leading-[0.75] uppercase text-[#DC143C] text-glow-crimson">
                  {TITLE_WORDS[1]}
                </h1>
              </motion.div>

              {/* Central Floating Statement */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full pointer-events-none"
              >
                <p className="text-[9px] sm:text-xs md:text-sm font-black uppercase text-white tracking-[1.2em] mix-blend-overlay opacity-60">
                  L&apos;Architecture Visuelle de Domination
                </p>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 4.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl mt-16 text-sm sm:text-lg font-medium text-[#8A8A8A] uppercase tracking-[0.3em] leading-relaxed"
            >
              Expertise Radicale. Esthétique Implacable.
              <br />
              <span className="text-white bg-gradient-to-r from-white to-[#DC143C] bg-clip-text text-transparent">Conçu pour ceux qui exigent l&apos;absolu.</span>
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 4.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-20"
            >
              <a
                href="https://wa.me/237659233477"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic group relative inline-flex items-center justify-center px-14 py-7 font-black tracking-[0.3em] text-white uppercase transition-all duration-700 bg-[#DC143C] overflow-hidden shadow-[0_30px_70px_rgba(220,20,60,0.45)] hover:shadow-[0_40px_90px_rgba(220,20,60,0.65)]"
              >
                <div className="absolute inset-0 w-full h-full transition-all duration-700 transform -translate-x-full bg-white group-hover:translate-x-0 ease-[cubic-bezier(0.16,1,0.3,1)] mix-blend-difference" />
                <span className="relative flex items-center gap-5">
                  <MessageSquare className="w-6 h-6" />
                  INITIER_L_IMPACT
                  <ArrowRight className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-3" />
                </span>
              </a>
            </motion.div>
          </motion.section>
        </div>

        {/* Content slide over */}
        <div className="relative z-20 bg-[#050505] border-t border-white/5 shadow-[0_-100px_150px_rgba(0,0,0,0.9)]">
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
