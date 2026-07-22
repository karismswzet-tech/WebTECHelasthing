import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const easeOut = [0.22, 1, 0.36, 1];

const line = (delay = 0) => ({
  hidden: { y: "110%" },
  visible: {
    y: 0,
    transition: { duration: 1.05, delay, ease: easeOut },
  },
});

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacityImg = useTransform(scrollYProgress, [0, 0.8], [0.55, 0]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <section
      ref={ref}
      id="top"
      data-testid="hero-section"
      className="relative min-h-screen w-full overflow-hidden bg-ink-0"
    >
      {/* Parallax 3D-ish background image */}
      <motion.div
        style={{ y: yImg, scale: scaleImg, opacity: opacityImg }}
        className="absolute inset-0 -z-10"
      >
        <img
          src="https://images.unsplash.com/photo-1625014618427-fbc980b974f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGZ1dHVyaXN0aWMlMjBkYXJrJTIwM0QlMjBuZXR3b3JrfGVufDB8fHx8MTc4NDcwMjU1Mnww&ixlib=rb-4.1.0&q=85"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-0/40 via-ink-0/60 to-ink-0"></div>
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-40 -z-10" />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 pt-40 md:pt-48 pb-24">
        {/* Top meta bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex items-start justify-between text-[11px] uppercase tracking-[0.25em] text-white/50 mb-16 md:mb-24"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-acid-cyan animate-pulse" />
            <span>EST. 2019 — Jakarta / Indonesia</span>
          </div>
          <div className="hidden md:block text-right leading-relaxed">
            <div>SAAS · IOT · WEB</div>
            <div className="text-white/30">v.02.5 / edisi 2026</div>
          </div>
        </motion.div>

        {/* Kinetic reveal headline */}
        <motion.div style={{ y: yText }}>
          <h1
            className="font-display font-black text-white leading-[0.86] tracking-[-0.045em] text-[19vw] md:text-[13.5vw] lg:text-[12.5rem]"
            aria-label="Solusi Digital Terdepan"
          >
            <span className="mask-line">
              <motion.span variants={line(0.2)} initial="hidden" animate="visible">
                Solusi
              </motion.span>
            </span>
            <span className="mask-line">
              <motion.span
                variants={line(0.35)}
                initial="hidden"
                animate="visible"
                className="italic font-light text-white/95"
                style={{ fontStyle: "italic" }}
              >
                <span className="text-stroke-strong">Digital</span>
              </motion.span>
            </span>
            <span className="mask-line">
              <motion.span
                variants={line(0.5)}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-6"
              >
                Terdepan
                <span className="hidden md:inline-block w-24 h-[3px] bg-acid-cyan align-middle" />
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* Bottom row: description + CTA + scroll hint */}
        <div className="mt-16 md:mt-24 grid grid-cols-12 gap-8 items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.9, ease: easeOut }}
            className="col-span-12 md:col-span-5 md:col-start-1 text-base md:text-lg font-light text-white/70 leading-relaxed max-w-md"
          >
            Kami membangun infrastruktur digital yang tak terlihat namun tak
            tergantikan — untuk perusahaan yang menolak sekadar bertahan di
            era yang berubah setiap detik.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.9, ease: easeOut }}
            className="col-span-12 md:col-span-4 md:col-start-7 flex flex-col gap-4"
          >
            <a
              href="#services"
              data-testid="hero-cta-primary"
              className="group inline-flex items-center justify-between border border-white/20 hover:border-acid-cyan px-6 py-5 transition-colors"
            >
              <span className="font-display text-sm uppercase tracking-[0.3em]">
                Jelajahi Layanan
              </span>
              <span className="w-10 h-10 rounded-full border border-white/30 group-hover:bg-acid-cyan group-hover:border-acid-cyan group-hover:text-black flex items-center justify-center transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M6 13l6 6 6-6" />
                </svg>
              </span>
            </a>
            <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-white/40">
              <span>Klien aktif</span>
              <span className="flex-1 h-px bg-white/10" />
              <span className="font-mono text-white/80">+120</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 1 }}
            className="col-span-12 md:col-span-2 md:col-start-11 hidden md:flex flex-col items-end gap-3 text-[11px] uppercase tracking-[0.25em] text-white/40"
          >
            <span>Gulir</span>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
