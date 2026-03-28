"use client";

import { motion, useScroll, useTransform, useVelocity, useSpring, useMotionValue } from "framer-motion";
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
import { useRef, useEffect } from "react";

const TITLE_WORDS = ["CHAMIX", "GRAPHIC"];

function MagneticText({ children, className, strength = 40 }: { children: React.ReactNode, className?: string, strength?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * (strength / 100));
    y.set((e.clientY - centerY) * (strength / 100));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  // Transform velocity into visual effects
  const letterSpacing = useTransform(smoothVelocity, [-1, 0, 1], ["0.25em", "0em", "0.25em"]);
  const titleSkew = useTransform(smoothVelocity, [-1, 0, 1], [-20, 0, 20]);
  const grainOpacity = useTransform(scrollYProgress, [0, 0.1], [0.04, 0.1]);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.75]);
  const heroSkew = useTransform(scrollYProgress, [0, 0.2], [0, -8]);

  // Split-word kinetic transforms
  const xLeft = useTransform(scrollYProgress, [0, 0.4], [0, -300]);
  const xRight = useTransform(scrollYProgress, [0, 0.4], [0, 300]);
  const rgbDistortion = useTransform(smoothVelocity, [-1, 0, 1], [-30, 0, 30]);

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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(220,20,60,0.2)_0%,rgba(5,5,5,1)_80%)]" />

          {/* Scanline Overlay */}
          <div className="absolute inset-0 z-10 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              rotate: [0, 2, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-15%]"
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
              transition={{ duration: 1.2, delay: 3.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-14 magnetic"
            >
              <span className="px-10 py-3 text-[10px] font-mono font-black tracking-[0.8em] text-[#DC143C] uppercase border border-[#DC143C]/30 bg-[#DC143C]/5 backdrop-blur-3xl shadow-[0_0_30px_rgba(220,20,60,0.15)]">
                [ EST_2025 // NEXUS_ELITE_01 ]
              </span>
            </motion.div>

            {/* Adaptive Kinetic Typography */}
            <div className="relative select-none perspective-2000">
              <motion.div style={{ x: xLeft, skewX: titleSkew, letterSpacing }} className="flex flex-col items-center relative">
                <MagneticText strength={50}>
                  {/* RGB Split Layer (Velocity Sensitive) */}
                  <motion.h1
                    aria-hidden="true"
                    style={{ x: rgbDistortion }}
                    className="absolute inset-0 text-7xl sm:text-9xl md:text-[11rem] lg:text-[16rem] font-black tracking-tighter leading-[0.75] uppercase text-[#DC143C]/50 mix-blend-screen pointer-events-none blur-[3px]"
                  >
                    {TITLE_WORDS[0]}
                  </motion.h1>
                  <h1 className="text-7xl sm:text-9xl md:text-[11rem] lg:text-[16rem] font-black tracking-tighter leading-[0.75] uppercase text-white mix-blend-difference drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                    {TITLE_WORDS[0]}
                  </h1>
                </MagneticText>
              </motion.div>

              <motion.div style={{ x: xRight, skewX: titleSkew, letterSpacing }} className="flex flex-col items-center -mt-8 sm:-mt-12 relative">
                <MagneticText strength={50}>
                  {/* RGB Split Layer (Velocity Sensitive) */}
                  <motion.h1
                    aria-hidden="true"
                    style={{ x: useTransform(rgbDistortion, (v) => -Number(v)) }}
                    className="absolute inset-0 text-7xl sm:text-9xl md:text-[11rem] lg:text-[16rem] font-black tracking-tighter leading-[0.75] uppercase text-white/40 mix-blend-screen pointer-events-none blur-[3px]"
                  >
                    {TITLE_WORDS[1]}
                  </motion.h1>
                  <h1 className="text-7xl sm:text-9xl md:text-[11rem] lg:text-[16rem] font-black tracking-tighter leading-[0.75] uppercase text-[#DC143C] text-glow-crimson">
                    {TITLE_WORDS[1]}
                  </h1>
                </MagneticText>
              </motion.div>

              {/* Central Floating Statement */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 4.2, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full pointer-events-none"
              >
                <p className="text-[10px] sm:text-sm md:text-base font-black uppercase text-white tracking-[1.5em] mix-blend-overlay opacity-70">
                  L&apos;Ingénierie de la Domination Visuelle
                </p>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 4.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl mt-20 text-sm sm:text-xl font-medium text-[#8A8A8A] uppercase tracking-[0.4em] leading-relaxed"
            >
              Stratégie Radicale. Esthétique Implacable.
              <br />
              <span className="text-white bg-gradient-to-r from-white via-white to-[#DC143C] bg-clip-text text-transparent">L&apos;Standard Ultra-Premium pour Marques de Hautes Volées.</span>
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 4.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-24"
            >
              <a
                href="https://wa.me/237659233477"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic group relative inline-flex items-center justify-center px-16 py-8 font-black tracking-[0.4em] text-white uppercase transition-all duration-700 bg-[#DC143C] overflow-hidden shadow-[0_40px_80px_rgba(220,20,60,0.5)] hover:shadow-[0_50px_100px_rgba(220,20,60,0.7)]"
              >
                <div className="absolute inset-0 w-full h-full transition-all duration-700 transform -translate-x-full bg-white group-hover:translate-x-0 ease-[cubic-bezier(0.16,1,0.3,1)] mix-blend-difference" />
                <span className="relative flex items-center gap-6">
                  <MessageSquare className="w-7 h-7" />
                  INITIER_LE_STANDARD
                  <ArrowRight className="w-7 h-7 transition-transform duration-500 group-hover:translate-x-4" />
                </span>
              </a>
            </motion.div>
          </motion.section>
        </div>

        {/* Content slide over */}
        <div className="relative z-20 bg-[#050505] border-t border-white/5 shadow-[0_-120px_180px_rgba(0,0,0,1)]">
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
