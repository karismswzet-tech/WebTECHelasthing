import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Marquee = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Slight parallax nudge based on scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const words = [
    "ELASTECH PRODUCTION",
    "SAAS",
    "INTERNET OF THINGS",
    "WEB DEVELOPMENT",
    "JAKARTA — INDONESIA",
    "SEJAK 2019",
  ];

  const Row = () => (
    <>
      {words.map((w, i) => (
        <span key={i} className="inline-flex items-center gap-8 pr-8">
          <span>{w}</span>
          <span className="w-3 h-3 rounded-full bg-acid-cyan/80 shrink-0" />
        </span>
      ))}
    </>
  );

  return (
    <section
      ref={ref}
      data-testid="marquee-section"
      className="relative py-16 md:py-24 border-y border-white/10 overflow-hidden bg-ink-0"
    >
      <motion.div
        style={{ x }}
        className="marquee-track font-display font-black text-[16vw] md:text-[11vw] leading-none tracking-[-0.05em] text-stroke"
      >
        <Row />
        <Row />
      </motion.div>
    </section>
  );
};

export default Marquee;
