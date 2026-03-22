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
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.85]);

  return (
    <>
      <Preloader />
      <Cursor />
      <Noise />
      <Navbar />
      <FloatingCTA />
      
      <main className="relative flex flex-col min-w-full" ref={containerRef}>
        {/* Background with noise/vignette */}
        <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(220,20,60,0.05)_0%,rgba(5,5,5,1)_70%)] pointer-events-none" />

        {/* Hero Section Container for Sticky Scroll */}
        <div className="h-[120vh] relative z-0">
          <motion.section 
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="sticky top-0 z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pb-20 pt-32"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <span className="px-4 py-2 text-xs font-mono font-bold tracking-widest text-[#8A8A8A] uppercase border border-white/10 rounded-none bg-[#050505]/50 backdrop-blur-sm">
                [ INITIATION_PHASE // BASS_DOUALA ]
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.5, delay: 3, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-6xl text-6xl font-black tracking-tighter uppercase sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.9] text-white"
            >
              <span className="text-glow-crimson block mb-4 relative">
                <motion.span 
                  initial={{ width: "100%" }} 
                  animate={{ width: "0%" }} 
                  transition={{ duration: 1.4, delay: 3.2, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-0 bg-[#050505] z-10 origin-right" 
                />
                CHAMIX GRAPHIC
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white/90 font-bold tracking-tight">
                L&apos;Architecture Visuelle
                <br />
                Qui Domine Le Marché.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 3.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl mt-8 text-lg font-medium text-[#8A8A8A] sm:text-xl"
            >
              Expertise en Infographie & Design de Prestige pour leaders ambitieux.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 3.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12"
            >
              <a
                href="https://wa.me/237659233477"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-trigger group relative inline-flex items-center justify-center px-10 py-5 font-bold tracking-widest text-white uppercase transition-all duration-300 bg-[#DC143C] overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full transition-all duration-500 transform -translate-x-full bg-white group-hover:translate-x-0 ease-[cubic-bezier(0.16,1,0.3,1)] mix-blend-difference" />
                <span className="relative flex items-center gap-3">
                  <MessageSquare className="w-5 h-5" />
                  Engager la Transformation
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
              <p className="mt-6 text-xs font-mono tracking-wider text-[#8A8A8A]">
                CONTACT DIRECT : +237 659 233 477
              </p>
            </motion.div>
          </motion.section>
        </div>

        {/* Dynamic Sub-Sections slide over */}
        <div className="relative z-20 bg-[#050505] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
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
