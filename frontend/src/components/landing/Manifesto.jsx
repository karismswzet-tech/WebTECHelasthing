import { motion } from "framer-motion";
import { FadeUp, MaskLine } from "./Reveal";

const chapters = [
  {
    n: "01",
    kicker: "Filosofi",
    title: "Teknologi bukan tujuan. Teknologi adalah jembatan.",
    body:
      "Kami tidak menjual perangkat lunak — kami menjual ketenangan pikiran. Setiap sistem yang kami bangun bertujuan sederhana: membuat bisnis Anda lebih cerdas, cepat, dan berdaya tahan menghadapi ketidakpastian.",
  },
  {
    n: "02",
    kicker: "Proses",
    title: "Dimulai dari pertanyaan bisnis, bukan tren.",
    body:
      "Sebelum baris kode pertama ditulis, kami mendengar. Kami merancang arsitektur untuk sepuluh tahun ke depan — bukan sekadar rilis berikutnya. Tren datang dan pergi; fondasi yang benar tetap berdiri.",
  },
  {
    n: "03",
    kicker: "Dampak",
    title: "Angka yang berbicara sendiri.",
    body:
      "Peningkatan efisiensi hingga 40% pada operasi klien. Uptime 99.9% pada infrastruktur SAAS kami. Ratusan perangkat IoT saling terhubung diam-diam setiap detik. Ini bukan janji — ini catatan.",
  },
];

export const Manifesto = () => {
  return (
    <section
      id="manifesto"
      data-testid="manifesto-section"
      className="relative bg-ink-0 py-32 md:py-48 border-t border-white/10"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-8 mb-24 md:mb-32">
          <div className="col-span-12 md:col-span-4 text-[11px] uppercase tracking-[0.3em] text-white/50">
            <FadeUp>
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-acid-cyan" />
                <span>Manifesto — 3 Bab</span>
              </div>
            </FadeUp>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.04em]">
              <MaskLine>Kami tidak percaya</MaskLine>
              <MaskLine delay={0.1}>pada digital sebagai</MaskLine>
              <MaskLine delay={0.2}>
                <span className="italic font-light text-white/70">dekorasi.</span>
              </MaskLine>
            </h2>
          </div>
        </div>

        {/* Chapters */}
        <div className="space-y-24 md:space-y-32">
          {chapters.map((c, i) => (
            <motion.article
              key={c.n}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              data-testid={`manifesto-chapter-${c.n}`}
              className="grid grid-cols-12 gap-8 items-start border-t border-white/10 pt-12"
            >
              <div className="col-span-4 md:col-span-3">
                <div className="font-display font-black text-[14vw] md:text-[9rem] leading-[0.8] text-stroke tracking-[-0.05em]">
                  {c.n}
                </div>
              </div>
              <div className="col-span-8 md:col-span-4">
                <div className="text-[11px] uppercase tracking-[0.3em] text-acid-cyan mb-4">
                  Bab / {c.kicker}
                </div>
                <h3 className="font-display font-bold text-2xl md:text-4xl leading-tight tracking-tight">
                  {c.title}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-4 md:col-start-9">
                <p className="text-base md:text-lg font-light text-white/60 leading-relaxed">
                  {c.body}
                </p>
                <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono">
                  <span>—</span>
                  <span>Chapter {c.n} / 03</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
