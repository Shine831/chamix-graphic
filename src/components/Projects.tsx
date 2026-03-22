"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { TiltCard } from "@/components/TiltCard";
import { useRef } from "react";

const projects = [
  {
    id: "01",
    title: "Branding Lemac Beauty World",
    metric: "Perception de valeur +40%",
    image: "/images/projects/media__1774196304657.jpg",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "02",
    title: "Packaging Luxe",
    metric: "Engagement visuel x3",
    image: "/images/projects/media__1774196305468.jpg",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "03",
    title: "Carte de Fidélité Elite",
    metric: "Rétention client +65%",
    image: "/images/projects/media__1774196305133.jpg",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "04",
    title: "Identité SOBGO",
    metric: "Positionnement Elite",
    image: "/images/projects/media__1774196304952.jpg",
    className: "md:col-span-2 md:row-span-1",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax for heading
  const headingY = useTransform(scrollYProgress, [0, 0.5], [60, -30]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0.3]);

  // Horizontal line width expanding
  const lineWidth = useTransform(scrollYProgress, [0.05, 0.3], ["0%", "100%"]);

  return (
    <section id="projets" ref={sectionRef} className="relative z-10 w-full max-w-7xl px-4 py-32 mx-auto overflow-hidden">
      {/* Scroll-linked section header */}
      <motion.div style={{ y: headingY, opacity: headingOpacity }} className="mb-16">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
          <span className="text-[#DC143C]">01. </span>L&apos;Impact
        </h2>
        <p className="max-w-xl text-lg text-[#8A8A8A]">
          Nous ne montrons pas des images. Nous prouvons notre force de frappe financière par le design.
        </p>
        {/* Animated crimson line */}
        <motion.div style={{ width: lineWidth }} className="h-[2px] bg-gradient-to-r from-[#DC143C] to-transparent mt-8" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] hover-trigger">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, scrollYProgress }: {
  project: typeof projects[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Staggered parallax per card
  const cardY = useTransform(
    scrollYProgress,
    [0.05 + index * 0.05, 0.3 + index * 0.05],
    [80, 0]
  );
  const cardOpacity = useTransform(
    scrollYProgress,
    [0.05 + index * 0.05, 0.2 + index * 0.05],
    [0, 1]
  );
  const cardScale = useTransform(
    scrollYProgress,
    [0.05 + index * 0.05, 0.25 + index * 0.05],
    [0.9, 1]
  );

  return (
    <motion.div
      style={{ y: cardY, opacity: cardOpacity, scale: cardScale }}
      className={project.className}
    >
      <TiltCard className="group relative overflow-hidden glass-panel w-full h-full">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 opacity-60 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-700" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8">
          <div className="flex items-center gap-4 mb-4 transform translate-y-4 opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <span className="text-[#DC143C] font-mono text-sm tracking-widest font-bold">
              [ PROJET_{project.id} ]
            </span>
            <div className="h-[1px] flex-1 bg-white/20" />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-2">
            {project.title}
          </h3>
          
          <p className="text-[#8A8A8A] font-mono text-sm md:text-base transform transition-all duration-700 ease-out delay-75 group-hover:text-white">
            Résultat : <span className="text-[#DC143C] font-bold">{project.metric}</span>
          </p>
        </div>
        
        {/* Crimson Border Glow on Hover */}
        <div className="absolute inset-0 z-20 border border-transparent transition-all duration-500 group-hover:border-[#DC143C]/50 group-hover:shadow-[inset_0_0_30px_rgba(220,20,60,0.1)] pointer-events-none" />
      </TiltCard>
    </motion.div>
  );
}
