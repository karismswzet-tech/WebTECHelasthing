import { motion } from "framer-motion";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { MaskLine } from "./Reveal";
import { api, formatApiError } from "@/lib/api";

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sending, setSending] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Mohon lengkapi nama, email, dan pesan.");
      return;
    }
    setSending(true);
    try {
      await api.post("/contact", form);
      toast.success("Pesan terkirim. Kami akan menghubungi Anda dalam 24 jam.");
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || "Gagal mengirim pesan.");
    } finally {
      setSending(false);
    }
  };

  const field = (label, key, type = "text", tag = "input") => {
    const Cmp = tag;
    return (
      <label className="block border-t border-white/10 py-6 md:py-8 group">
        <span className="text-[11px] uppercase tracking-[0.3em] text-white/50 group-focus-within:text-acid-cyan transition-colors">
          {label}
        </span>
        {tag === "textarea" ? (
          <textarea
            data-testid={`contact-${key}`}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            rows={4}
            className="mt-3 w-full bg-transparent text-xl md:text-2xl font-display font-light text-white placeholder-white/25 border-none resize-none"
            placeholder="Ceritakan tentang proyek Anda..."
          />
        ) : (
          <Cmp
            data-testid={`contact-${key}`}
            type={type}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="mt-3 w-full bg-transparent text-xl md:text-2xl font-display font-light text-white placeholder-white/25 border-none"
            placeholder={type === "email" ? "anda@perusahaan.com" : "Tulis di sini..."}
          />
        )}
      </label>
    );
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative bg-ink-0 py-32 md:py-48 border-t border-white/10"
    >
      <Toaster position="bottom-right" theme="dark" richColors />
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8">
          {/* Left: mega heading */}
          <div className="col-span-12 md:col-span-6">
            <div className="text-[11px] uppercase tracking-[0.3em] text-white/50 mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-acid-cyan" />
              <span>Mulai Percakapan</span>
            </div>
            <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-[-0.045em] mb-10">
              <MaskLine>Punya ide</MaskLine>
              <MaskLine delay={0.1}>
                <span className="italic font-light text-white/70">yang serius?</span>
              </MaskLine>
              <MaskLine delay={0.2}>Kami dengar.</MaskLine>
            </h2>
            <p className="text-white/60 max-w-md text-base md:text-lg font-light leading-relaxed">
              Tim ELASTECH akan merespons dalam 1x24 jam kerja. Ceritakan tujuan
              bisnis Anda — kami rancang teknologinya.
            </p>

            <div className="mt-16 grid grid-cols-2 gap-6 max-w-md">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">Email</div>
                <div className="font-mono text-sm text-white/80">halo@elastech.id</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">Studio</div>
                <div className="font-mono text-sm text-white/80">Jakarta, ID</div>
              </div>
            </div>
          </div>

          {/* Right: dummy form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            data-testid="contact-form"
            className="col-span-12 md:col-span-6 border border-white/10 bg-ink-10 p-8 md:p-12"
          >
            {field("01 / Nama Lengkap", "name")}
            {field("02 / Email", "email", "email")}
            {field("03 / Perusahaan", "company")}
            {field("04 / Pesan", "message", "text", "textarea")}

            <div className="border-t border-white/10 pt-8 flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-[0.3em] text-white/40">
                * Wajib · Data aman
              </div>
              <button
                type="submit"
                disabled={sending}
                data-testid="contact-submit"
                className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 border border-white/20 hover:border-acid-cyan rounded-full transition-colors disabled:opacity-50"
              >
                <span className="text-xs uppercase tracking-[0.3em]">
                  {sending ? "Mengirim…" : "Kirim Pesan"}
                </span>
                <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-acid-cyan transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
