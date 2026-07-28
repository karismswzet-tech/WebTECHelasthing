import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";
import { api, setToken, getToken, formatApiError } from "@/lib/api";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already has a valid token, skip to dashboard
    if (getToken()) {
      api.get("/auth/me").then(() => nav("/admin")).catch(() => {});
    }
  }, [nav]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setToken(data.token);
      toast.success("Berhasil masuk.");
      nav("/admin");
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || "Gagal masuk.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      data-testid="admin-login-page"
      className="min-h-screen bg-ink-0 text-white flex items-center justify-center px-6 relative overflow-hidden"
      style={{ cursor: "auto" }}
    >
      <Toaster position="bottom-right" theme="dark" richColors />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="noise-layer" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md border border-white/10 bg-ink-10 p-8 md:p-12"
      >
        <div className="flex items-center gap-3 mb-10">
          <span className="relative inline-flex w-8 h-8 items-center justify-center">
            <span className="absolute inset-0 border border-white/40 rotate-45" />
            <span className="absolute inset-[6px] bg-acid-cyan" />
          </span>
          <span className="font-display font-black text-sm tracking-[0.25em]">
            ELASTECH<span className="text-white/40">/ADMIN</span>
          </span>
        </div>

        <h1 className="font-display font-black text-3xl md:text-4xl tracking-tight leading-none mb-2">
          Panel Admin
        </h1>
        <p className="text-white/50 text-sm mb-10">
          Masuk untuk melihat pesan yang masuk dari form kontak.
        </p>

        <form onSubmit={submit} className="space-y-6">
          <label className="block border-b border-white/10 pb-4 focus-within:border-acid-cyan transition-colors">
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/50">Email</span>
            <input
              data-testid="admin-email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@elastech.id"
              className="mt-2 w-full bg-transparent text-lg font-display font-light placeholder-white/25"
              autoComplete="email"
            />
          </label>
          <label className="block border-b border-white/10 pb-4 focus-within:border-acid-cyan transition-colors">
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/50">Kata Sandi</span>
            <input
              data-testid="admin-password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-2 w-full bg-transparent text-lg font-display font-light placeholder-white/25"
              autoComplete="current-password"
            />
          </label>

          <button
            data-testid="admin-login-submit"
            type="submit"
            disabled={loading}
            className="group w-full flex items-center justify-between bg-white text-black px-6 py-4 hover:bg-acid-cyan transition-colors disabled:opacity-50"
          >
            <span className="font-display text-sm uppercase tracking-[0.3em]">
              {loading ? "Memproses…" : "Masuk"}
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </form>

        <a
          href="/"
          data-testid="admin-back-home"
          className="mt-8 inline-block text-[11px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors"
        >
          ← Kembali ke situs
        </a>
      </motion.div>
    </main>
  );
}
