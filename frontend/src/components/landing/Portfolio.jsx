import { motion } from "framer-motion";
import { FadeUp, MaskLine } from "./Reveal";

const projects = [
  {
    n: "P/01",
    title: "Nusantara Bank Dashboard",
    tag: "SaaS · Fintech",
    year: "2024",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwc2FhcyUyMGRhc2hib2FyZCUyMGRhcmt8ZW58MHx8fHwxNzg0NzAyNTUyfDA&ixlib=rb-4.1.0&q=85",
    span: "md:col-span-7",
  },
  {
    n: "P/02",
    title: "Sentra IoT Pabrik",
    tag: "IoT · Manufaktur",
    year: "2024",
    img: "https://images.pexels.com/photos/16423102/pexels-photo-16423102.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    span: "md:col-span-5",
  },
  {
    n: "P/03",
    title: "Ritel Digital Kopi Nusa",
    tag: "Web · E-commerce",
    year: "2025",
    img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxwcmVtaXVtJTIwbGFwdG9wJTIwbW9ja3VwJTIwZGFya3xlbnwwfHx8fDE3ODQ3MDI1NTJ8MA&ixlib=rb-4.1.0&q=85",
    span: "md:col-span-5",
  },
  {
    n: "P/04",
    title: "Panel Analitik Logistik",
    tag: "SaaS · Logistik",
    year: "2025",
    img: "https://images.unsplash.com/photo-1625014618427-fbc980b974f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGZ1dHVyaXN0aWMlMjBkYXJrJTIwM0QlMjBuZXR3b3JrfGVufDB8fHx8MTc4NDcwMjU1Mnww&ixlib=rb-4.1.0&q=85",
    span: "md:col-span-7",
  },
];

const Card = ({ p, i }) => (
  <motion.a
    href="#contact"
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.9, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    data-testid={`portfolio-${p.n.replace("/", "-").toLowerCase()}`}
    className={`group relative col-span-12 ${p.span} block border border-white/10 bg-ink-10 overflow-hidden`}
  >
    <div className="relative aspect-[16/10] overflow-hidden">
      <motion.img
        src={p.img}
        alt={p.title}
        className="w-full h-full object-cover"
        initial={{ scale: 1.05, filter: "brightness(0.45) saturate(0.7)" }}
        whileHover={{ scale: 1.15, filter: "brightness(1) saturate(1)" }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-0 via-transparent to-transparent" />
      <div className="absolute top-6 left-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] font-mono text-acid-cyan">
        <span>{p.n}</span>
        <span className="w-8 h-px bg-acid-cyan" />
        <span className="text-white/70">{p.year}</span>
      </div>
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-white/50 mb-2">
            {p.tag}
          </div>
          <h3 className="font-display font-bold text-2xl md:text-3xl leading-tight tracking-tight max-w-md">
            {p.title}
          </h3>
        </div>
        <span className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center group-hover:bg-acid-cyan group-hover:border-acid-cyan group-hover:text-black transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </span>
      </div>
    </div>
  </motion.a>
);

export const Portfolio = () => (
  <section
    id="portfolio"
    data-testid="portfolio-section"
    className="relative bg-ink-0 py-32 md:py-48 border-t border-white/10"
  >
    <div className="mx-auto max-w-[1600px] px-6 md:px-10">
      <div className="grid grid-cols-12 gap-8 mb-16 md:mb-24">
        <div className="col-span-12 md:col-span-4 text-[11px] uppercase tracking-[0.3em] text-white/50">
          <FadeUp>
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-acid-cyan" />
              <span>Portofolio Terpilih</span>
            </div>
          </FadeUp>
        </div>
        <div className="col-span-12 md:col-span-8">
          <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.04em]">
            <MaskLine>Karya berbicara.</MaskLine>
            <MaskLine delay={0.1}>
              <span className="italic font-light text-white/70">Klien mendengar.</span>
            </MaskLine>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 md:gap-8">
        {projects.map((p, i) => (
          <Card key={p.n} p={p} i={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Portfolio;
