"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // 3D Perspective scroll
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.5], ["8deg", "2deg", "0deg"]);
  const perspective = useTransform(scrollYProgress, [0, 0.5], ["800px", "1200px"]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.3], [0.92, 1]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] px-4 py-32 text-center bg-black/40 backdrop-blur-3xl border-y border-white/5 overflow-hidden"
    >
      <motion.div
        style={{
          rotateX,
          scale: sectionScale,
          opacity: sectionOpacity,
          transformPerspective: perspective,
          transformOrigin: "center top",
        }}
        className="max-w-5xl"
      >
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#DC143C] font-mono text-sm font-bold tracking-widest uppercase mb-8 block"
        >
          [ AUTORITÉ // STATUT_SENIOR ]
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white mb-10 leading-[1.1]"
        >
          L&apos;expérience n&apos;est pas une option. <br className="hidden md:block" />
          <span className="text-[#8A8A8A]">C&apos;est le standard.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-lg md:text-2xl text-[#f5f5f5]/80 leading-relaxed"
        >
          Ici, pas de fioritures, pas de design creux pour espérer &quot;faire joli&quot;.
          L&apos;esthétique est mise au service exclusif du rapport de force commercial.
          Vous voulez une image de marque qui matérialise votre ambition et écrase
          les doutes sur votre marché ? <strong className="text-white">Nous l&apos;exécutons.</strong>
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 border-t border-white/10 pt-16">
          <AnimatedStat value={10} suffix="+" label="Années d'Excellence" delay={0} />
          <AnimatedStat value={200} suffix="+" label="Projets Déployés" delay={0.15} />
          <AnimatedStat value={99} suffix="%" label="Taux de Rétention" delay={0.3} />
          <AnimatedStat value={100} suffix="%" label="Focus Commercial" delay={0.45} />
        </div>
      </motion.div>
    </section>
  );
}

function AnimatedStat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * value);
        setCount(current);
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center space-y-2"
    >
      <span className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-glow-crimson font-mono tabular-nums">
        {count}{suffix}
      </span>
      <span className="text-sm font-bold tracking-widest text-[#8A8A8A] uppercase">
        {label}
      </span>
    </motion.div>
  );
}
