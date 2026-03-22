"use client";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-white/5 bg-[#020202]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">
              CHAMIX<span className="text-[#DC143C]">.</span>
            </h3>
            <p className="text-sm text-[#8A8A8A] font-mono max-w-xs">
              L&apos;Architecture Visuelle qui transforme l&apos;ambition en domination de marché.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex gap-8">
            <a href="#projets" className="text-sm font-bold uppercase tracking-widest text-[#8A8A8A] hover:text-white transition-colors duration-300">
              Projets
            </a>
            <a href="#experience" className="text-sm font-bold uppercase tracking-widest text-[#8A8A8A] hover:text-white transition-colors duration-300">
              Expérience
            </a>
            <a href="#contact" className="text-sm font-bold uppercase tracking-widest text-[#8A8A8A] hover:text-white transition-colors duration-300">
              Contact
            </a>
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-[1px] bg-white/5 my-10" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8A8A8A] font-mono tracking-wider text-center sm:text-left">
            © 2026 CHAMIX GRAPHIC — Forgé à Douala, Déployé pour Dominer.
          </p>
          <p className="text-xs text-[#8A8A8A]/50 font-mono tracking-wider">
            [ SYSTEME_ACTIF // V2.0 ]
          </p>
        </div>
      </div>
    </footer>
  );
}
