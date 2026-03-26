"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Projets", href: "#projets" },
  { label: "Expérience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > 300 && latest < previous) {
      setIsVisible(true);
    } else if (latest < 300 || latest > previous) {
      setIsVisible(false);
      setIsOpen(false);
    }
  });

  return (
    <>
      {/* Desktop Stealth Nav */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-0 left-0 right-0 z-[80] glass-panel border-b border-white/5 py-3 px-6 flex items-center justify-between"
      >
        <a href="#" className="relative block h-10 w-32 md:h-12 md:w-36 overflow-hidden transition-transform duration-300 hover:scale-105">
          <Image
            src="/images/logo.jpg"
            alt="CHAMIX GRAPHIC Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover-trigger text-sm font-bold uppercase tracking-widest text-[#8A8A8A] hover:text-white transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#DC143C] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-[#DC143C] transition-colors"
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.div>
        </button>
      </motion.nav>

      {/* Mobile menu overlay */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isOpen && isVisible ? 1 : 0,
          y: isOpen && isVisible ? 0 : -20,
          pointerEvents: isOpen && isVisible ? "auto" as const : "none" as const,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-16 left-0 right-0 z-[79] glass-panel border-b border-white/5 md:hidden"
      >
        <div className="flex flex-col px-6 py-6 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold uppercase tracking-widest text-[#8A8A8A] hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </>
  );
}
