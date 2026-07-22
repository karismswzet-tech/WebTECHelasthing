import { motion } from "framer-motion";
import { FadeUp, MaskLine } from "./Reveal";

const services = [
  {
    id: "saas",
    tag: "01 / SaaS",
    title: "Perangkat Lunak sebagai Layanan",
    subtitle: "Solusi SAAS untuk Bisnis Modern",
    desc:
      "Platform berbasis cloud yang skalabel dan efisien. Akses dari mana saja tanpa investasi infrastruktur besar. Nikmati pembaruan otomatis dan keamanan data terjamin.",
    bullets: ["Cloud-native", "Skalabel & elastis", "Keamanan enkripsi", "Pembaruan otomatis"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwc2FhcyUyMGRhc2hib2FyZCUyMGRhcmt8ZW58MHx8fHwxNzg0NzAyNTUyfDA&ixlib=rb-4.1.0&q=85",
    span: "md:col-span-8",
  },
  {
    id: "iot",
    tag: "02 / IoT",
    title: "Internet of Things",
    subtitle: "Solusi IoT untuk Industri Cerdas",
    desc:
      "Menghubungkan perangkat pintar Anda dengan monitoring real-time dan otomasi industri. Bisnis Anda beroperasi lebih efisien dengan teknologi terkini.",
    bullets: ["500+ perangkat terhubung", "Monitoring real-time", "Otomasi industri", "Dukungan 24/7"],
    img: "https://images.pexels.com/photos/16423102/pexels-photo-16423102.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    span: "md:col-span-4",
  },
  {
    id: "web",
    tag: "03 / Web",
    title: "Website & Aplikasi Web",
    subtitle: "Pembuatan Website Kustom",
    desc:
      "Landing page berdampak, e-commerce dengan konversi tinggi, hingga aplikasi web kustom dan dashboard analitik — dibangun untuk performa dan keindahan.",
    bullets: ["Landing page premium", "E-commerce lengkap", "Web app kustom", "Desain responsif"],
    img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxwcmVtaXVtJTIwbGFwdG9wJTIwbW9ja3VwJTIwZGFya3xlbnwwfHx8fDE3ODQ3MDI1NTJ8MA&ixlib=rb-4.1.0&q=85",
    span: "md:col-span-12",
  },
];

const ServiceCard = ({ s, idx }) => (
  <motion.article
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.9, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
    data-testid={`service-card-${s.id}`}
    className={`group relative col-span-12 ${s.span} border border-white/10 bg-ink-10 overflow-hidden`}
  >
    {/* Image / clipped frame */}
    <div className="relative aspect-[16/10] overflow-hidden">
      <motion.img
        src={s.img}
        alt={s.title}
        className="w-full h-full object-cover"
        initial={{ scale: 1.05, filter: "brightness(0.55)" }}
        whileHover={{ scale: 1.12, filter: "brightness(0.85)" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-0 via-ink-0/40 to-transparent pointer-events-none" />
      <div className="absolute top-6 left-6 text-[11px] uppercase tracking-[0.3em] text-acid-cyan font-mono">
        {s.tag}
      </div>
      <div className="absolute top-6 right-6 w-8 h-8 border border-white/40 rotate-45 group-hover:rotate-[135deg] group-hover:border-acid-cyan transition-transform duration-700" />
    </div>

    {/* Content */}
    <div className="relative p-8 md:p-12 border-t border-white/10">
      <div className="text-[11px] uppercase tracking-[0.3em] text-white/50 mb-4">
        {s.subtitle}
      </div>
      <h3 className="font-display font-bold text-3xl md:text-4xl tracking-tight leading-tight mb-6">
        {s.title}
      </h3>
      <p className="text-white/60 text-base md:text-lg font-light leading-relaxed max-w-2xl mb-8">
        {s.desc}
      </p>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-3 max-w-lg text-sm text-white/70">
        {s.bullets.map((b) => (
          <li key={b} className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-acid-cyan shrink-0" />
            {b}
          </li>
        ))}
      </ul>
    </div>

    {/* Bottom read link */}
    <div className="flex items-center justify-between px-8 md:px-12 py-6 border-t border-white/10 text-[11px] uppercase tracking-[0.3em] text-white/50 group-hover:text-white transition-colors">
      <span>Baca selengkapnya</span>
      <span className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center group-hover:bg-acid-cyan group-hover:border-acid-cyan group-hover:text-black transition-colors">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </div>
  </motion.article>
);

export const Services = () => (
  <section
    id="services"
    data-testid="services-section"
    className="relative bg-ink-0 py-32 md:py-48 border-t border-white/10"
  >
    <div className="mx-auto max-w-[1600px] px-6 md:px-10">
      <div className="grid grid-cols-12 gap-8 mb-20 md:mb-28">
        <div className="col-span-12 md:col-span-4 text-[11px] uppercase tracking-[0.3em] text-white/50">
          <FadeUp>
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-acid-cyan" />
              <span>Tiga Layanan Unggulan</span>
            </div>
          </FadeUp>
        </div>
        <div className="col-span-12 md:col-span-8">
          <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.04em]">
            <MaskLine>Satu tim.</MaskLine>
            <MaskLine delay={0.1}>Tiga disiplin.</MaskLine>
            <MaskLine delay={0.2}>
              <span className="italic font-light text-white/70">Nol kompromi.</span>
            </MaskLine>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 md:gap-8">
        {services.map((s, i) => (
          <ServiceCard key={s.id} s={s} idx={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Services;
