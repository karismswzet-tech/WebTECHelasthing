import { motion } from "framer-motion";
import { FadeUp, MaskLine } from "./Reveal";

const items = [
  {
    quote:
      "Sejak menerapkan platform SAAS ELASTECH, operasional kami naik efisiensinya hingga 40%. Timnya profesional dan responsif.",
    name: "Raka Prasetyo",
    role: "COO, PT Sentra Logistik Nusantara",
    star: 5,
  },
  {
    quote:
      "Sistem IoT-nya berjalan diam-diam di 300+ titik pabrik. Data real-time-nya mengubah cara kami mengambil keputusan setiap hari.",
    name: "Sari Wijayanti",
    role: "Head of Operations, Industri Kaya Persada",
    star: 5,
  },
  {
    quote:
      "Landing page baru kami dari ELASTECH menaikkan konversi 2.3x dalam kuartal pertama. Desainnya premium — dan cepat.",
    name: "Bimo Adiwijaya",
    role: "Founder, Kopi Nusa Roastery",
    star: 5,
  },
];

const Stars = ({ n = 5 }) => (
  <div className="flex gap-1.5">
    {Array.from({ length: n }).map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#00F0FF">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

export const Testimonials = () => (
  <section
    id="testimoni"
    data-testid="testimonials-section"
    className="relative bg-ink-0 py-32 md:py-48 border-t border-white/10"
  >
    <div className="mx-auto max-w-[1600px] px-6 md:px-10">
      <div className="grid grid-cols-12 gap-8 mb-16 md:mb-24">
        <div className="col-span-12 md:col-span-4 text-[11px] uppercase tracking-[0.3em] text-white/50">
          <FadeUp>
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-acid-cyan" />
              <span>Testimoni Klien</span>
            </div>
          </FadeUp>
        </div>
        <div className="col-span-12 md:col-span-8">
          <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.04em]">
            <MaskLine>Pengalaman positif</MaskLine>
            <MaskLine delay={0.1}>
              <span className="italic font-light text-white/70">dari perusahaan yang percaya.</span>
            </MaskLine>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/10">
        {items.map((t, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            data-testid={`testimonial-${i}`}
            className="relative py-12 md:py-16 md:px-10 px-4 border-b md:border-b-0 md:border-r border-white/10 last:border-r-0 first:pl-0 last:pr-0 flex flex-col"
          >
            <Stars n={t.star} />
            <blockquote className="mt-8 font-display font-light text-2xl md:text-[26px] leading-[1.25] tracking-tight text-white/90 flex-1">
              <span className="text-acid-cyan mr-1">“</span>
              {t.quote}
              <span className="text-acid-cyan ml-1">”</span>
            </blockquote>
            <figcaption className="mt-10 border-t border-white/10 pt-6">
              <div className="font-display font-bold text-base">{t.name}</div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-white/50 mt-1">
                {t.role}
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
