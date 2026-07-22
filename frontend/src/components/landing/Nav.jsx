import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Layanan", href: "#services" },
    { label: "Manifesto", href: "#manifesto" },
    { label: "Portofolio", href: "#portfolio" },
    { label: "Testimoni", href: "#testimoni" },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
      data-testid="site-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-500 ${
        scrolled
          ? "bg-[#05050A]/70 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" data-testid="nav-logo" className="flex items-center gap-3 group">
          <span className="relative inline-flex w-8 h-8 items-center justify-center">
            <span className="absolute inset-0 border border-white/40 rotate-45 group-hover:rotate-[135deg] transition-transform duration-700"></span>
            <span className="absolute inset-[6px] bg-white group-hover:bg-acid-cyan transition-colors"></span>
          </span>
          <span className="font-display font-black text-[13px] md:text-sm tracking-[0.25em]">
            ELASTECH<span className="text-white/40">/PRODUCTION</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.25em] font-medium text-white/60">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="relative hover:text-white transition-colors"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-acid-cyan transition-all duration-500 hover:w-full"></span>
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          data-testid="nav-cta"
          className="group hidden md:inline-flex items-center gap-3 pl-5 pr-2 py-2 border border-white/20 rounded-full hover:border-acid-cyan transition-colors"
        >
          <span className="text-xs uppercase tracking-[0.25em]">Mulai Proyek</span>
          <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-acid-cyan transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </a>

        <button
          data-testid="nav-menu-mobile"
          className="md:hidden w-10 h-10 flex items-center justify-center border border-white/20"
          aria-label="Menu"
        >
          <span className="flex flex-col gap-1.5">
            <span className="block w-5 h-px bg-white"></span>
            <span className="block w-5 h-px bg-white"></span>
          </span>
        </button>
      </div>
    </motion.header>
  );
};

export default Nav;
