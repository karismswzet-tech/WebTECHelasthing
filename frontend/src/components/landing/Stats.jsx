import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Perangkat IoT Terhubung" },
  { value: 99.9, suffix: "%", label: "Uptime Infrastruktur", decimals: 1 },
  { value: 24, suffix: "/7", label: "Dukungan Real-time" },
  { value: 40, suffix: "%", label: "Peningkatan Efisiensi Klien" },
];

const Counter = ({ to, decimals = 0, suffix = "", trigger }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const duration = 1600;
    const start = performance.now();
    let raf;
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [trigger, to]);
  return (
    <span>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export const Stats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      data-testid="stats-section"
      className="relative bg-ink-10 py-24 md:py-32 border-y border-white/10 overflow-hidden"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              data-testid={`stat-${i}`}
              className="flex flex-col border-l border-white/10 pl-6 md:pl-8"
            >
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 font-mono">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-none tracking-[-0.04em]">
                <Counter
                  to={s.value}
                  decimals={s.decimals || 0}
                  suffix={s.suffix}
                  trigger={inView}
                />
              </div>
              <div className="mt-6 text-xs md:text-sm uppercase tracking-[0.25em] text-white/60 max-w-[16ch]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
