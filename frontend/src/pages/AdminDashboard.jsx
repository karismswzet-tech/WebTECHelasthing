import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import { api, clearToken, getToken, formatApiError } from "@/lib/api";

const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleString("id-ID", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

export default function AdminDashboard() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({ total: 0, unread: 0, read: 0 });
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");

  const load = useCallback(async () => {
    try {
      const [s, st] = await Promise.all([
        api.get("/admin/submissions"),
        api.get("/admin/stats"),
      ]);
      setItems(s.data);
      setStats(st.data);
    } catch (err) {
      if (err.response?.status === 401) {
        clearToken();
        nav("/admin/login");
      } else {
        toast.error(formatApiError(err.response?.data?.detail) || "Gagal memuat data.");
      }
    } finally {
      setLoading(false);
    }
  }, [nav]);

  useEffect(() => {
    if (!getToken()) {
      nav("/admin/login");
      return;
    }
    load();
  }, [load, nav]);

  const openItem = async (item) => {
    setSelected(item);
    if (!item.is_read) {
      try {
        await api.patch(`/admin/submissions/${item.id}/read`);
        setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, is_read: true } : x)));
        setStats((s) => ({ ...s, unread: Math.max(0, s.unread - 1), read: s.read + 1 }));
      } catch {
        /* ignore */
      }
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/admin/submissions/${id}`);
      setItems((prev) => prev.filter((x) => x.id !== id));
      setStats((s) => ({ ...s, total: s.total - 1 }));
      if (selected?.id === id) setSelected(null);
      toast.success("Pesan dihapus.");
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || "Gagal menghapus.");
    }
  };

  const logout = () => {
    clearToken();
    nav("/admin/login");
  };

  const filtered = items.filter((i) =>
    filter === "all" ? true : filter === "unread" ? !i.is_read : i.is_read
  );

  const statCards = [
    { label: "Total Pesan", value: stats.total, key: "all" },
    { label: "Belum Dibaca", value: stats.unread, key: "unread" },
    { label: "Sudah Dibaca", value: stats.read, key: "read" },
  ];

  return (
    <main
      data-testid="admin-dashboard"
      className="min-h-screen bg-ink-0 text-white"
      style={{ cursor: "auto" }}
    >
      <Toaster position="bottom-right" theme="dark" richColors />
      <div className="noise-layer" />

      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 z-40 bg-ink-0/80 backdrop-blur-xl">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative inline-flex w-7 h-7 items-center justify-center">
              <span className="absolute inset-0 border border-white/40 rotate-45" />
              <span className="absolute inset-[5px] bg-acid-cyan" />
            </span>
            <span className="font-display font-black text-xs md:text-sm tracking-[0.25em]">
              ELASTECH<span className="text-white/40">/ADMIN</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              data-testid="admin-view-site"
              className="hidden md:inline text-[11px] uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors"
            >
              Lihat Situs
            </a>
            <button
              data-testid="admin-logout"
              onClick={logout}
              className="text-[11px] uppercase tracking-[0.25em] border border-white/20 px-4 py-2 hover:border-acid-cyan transition-colors"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-12">
        <div className="mb-10">
          <div className="text-[11px] uppercase tracking-[0.3em] text-acid-cyan mb-3 flex items-center gap-3">
            <span className="w-8 h-px bg-acid-cyan" />
            Kotak Masuk
          </div>
          <h1 className="font-display font-black text-4xl md:text-6xl tracking-tight leading-none">
            Pesan Kontak
          </h1>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-12">
          {statCards.map((c) => (
            <button
              key={c.key}
              data-testid={`admin-stat-${c.key}`}
              onClick={() => setFilter(c.key)}
              className={`text-left border p-6 md:p-8 transition-colors ${
                filter === c.key ? "border-acid-cyan bg-ink-10" : "border-white/10 hover:border-white/30"
              }`}
            >
              <div className="font-display font-black text-4xl md:text-6xl leading-none">
                {c.value}
              </div>
              <div className="mt-3 text-[10px] md:text-xs uppercase tracking-[0.25em] text-white/50">
                {c.label}
              </div>
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div data-testid="admin-loading" className="py-24 text-center text-white/40 uppercase tracking-[0.3em] text-xs">
            Memuat…
          </div>
        ) : filtered.length === 0 ? (
          <div data-testid="admin-empty" className="py-24 text-center border border-white/10">
            <div className="font-display text-2xl mb-2">Belum ada pesan</div>
            <div className="text-white/40 text-sm">
              Pesan dari form kontak akan muncul di sini.
            </div>
          </div>
        ) : (
          <div className="border border-white/10" data-testid="admin-submissions-list">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                data-testid={`submission-row-${i}`}
                className={`group grid grid-cols-12 gap-4 items-center px-6 py-5 border-b border-white/10 last:border-b-0 cursor-pointer transition-colors hover:bg-ink-10 ${
                  !item.is_read ? "bg-white/[0.02]" : ""
                }`}
                onClick={() => openItem(item)}
              >
                <div className="col-span-1 flex items-center">
                  {!item.is_read ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-acid-cyan" title="Belum dibaca" />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full border border-white/20" />
                  )}
                </div>
                <div className="col-span-3">
                  <div className={`font-display font-bold text-base ${!item.is_read ? "text-white" : "text-white/70"}`}>
                    {item.name}
                  </div>
                  <div className="text-xs text-white/40 truncate">{item.email}</div>
                </div>
                <div className="col-span-2 text-sm text-white/50 truncate hidden md:block">
                  {item.company || "—"}
                </div>
                <div className="col-span-4 text-sm text-white/60 truncate hidden md:block">
                  {item.message}
                </div>
                <div className="col-span-2 md:col-span-2 text-right text-[11px] uppercase tracking-[0.15em] text-white/40 font-mono">
                  {fmtDate(item.created_at)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50"
              onClick={() => setSelected(null)}
            />
            <motion.aside
              data-testid="submission-detail"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="fixed top-0 right-0 h-full w-full max-w-lg bg-ink-10 border-l border-white/10 z-50 overflow-y-auto"
            >
              <div className="p-8 md:p-12">
                <div className="flex items-center justify-between mb-10">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-acid-cyan">
                    Detail Pesan
                  </span>
                  <button
                    data-testid="detail-close"
                    onClick={() => setSelected(null)}
                    className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-acid-cyan transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <h2 className="font-display font-black text-3xl tracking-tight mb-1">
                  {selected.name}
                </h2>
                <a href={`mailto:${selected.email}`} className="text-acid-cyan text-sm hover:underline">
                  {selected.email}
                </a>

                <dl className="mt-10 space-y-6">
                  <div className="border-t border-white/10 pt-4">
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">Perusahaan</dt>
                    <dd className="text-white/80">{selected.company || "—"}</dd>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">Waktu</dt>
                    <dd className="text-white/80 font-mono text-sm">{fmtDate(selected.created_at)}</dd>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">Pesan</dt>
                    <dd className="text-white/80 leading-relaxed whitespace-pre-wrap">{selected.message}</dd>
                  </div>
                </dl>

                <div className="mt-12 flex gap-3">
                  <a
                    href={`mailto:${selected.email}`}
                    data-testid="detail-reply"
                    className="flex-1 text-center bg-white text-black px-6 py-4 font-display text-xs uppercase tracking-[0.3em] hover:bg-acid-cyan transition-colors"
                  >
                    Balas via Email
                  </a>
                  <button
                    data-testid="detail-delete"
                    onClick={() => remove(selected.id)}
                    className="px-6 py-4 border border-white/20 text-xs uppercase tracking-[0.3em] hover:border-red-500 hover:text-red-400 transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
