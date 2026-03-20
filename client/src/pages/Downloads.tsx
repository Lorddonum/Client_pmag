import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FileText, Download, Loader2, BookOpen, ArrowRight, X } from "lucide-react";

interface Catalogue {
  name: string;
  filename: string;
  url: string;
  description: string;
}

const CATALOGUES: Catalogue[] = [
  {
    name: "2026 Paralight Aluminum Profile Catalog",
    filename: "2026 Paralight Aluminum Profile Catalog — Comprehensive.pdf",
    url: "/catalogues/2026 Paralight Aluminum Profile Catalog — Comprehensive.pdf",
    description: "Comprehensive aluminum profile catalogue — full range",
  },
  {
    name: "Commercial Lighting Catalog",
    filename: "Commercial Lighting Catalog.pdf",
    url: "/catalogues/Commercial Lighting Catalog.pdf",
    description: "Full commercial lighting product range",
  },
  {
    name: "Colorful Linear Series Catalog",
    filename: "Colorful Linear Series Catalog.pdf",
    url: "/catalogues/Colorful Linear Series Catalog.pdf",
    description: "Colorful linear lighting series",
  },
  {
    name: "05 Series Magnetic Track Brochure",
    filename: "05 Series Magnetic Track Brochure.pdf",
    url: "/catalogues/05 Series Magnetic Track Brochure.pdf",
    description: "Maglinear 05 Series magnetic track system",
  },
  {
    name: "10 Series Magnetic Track Brochure",
    filename: "10 Series Magnetic Track Brochure.pdf",
    url: "/catalogues/10 Series Magnetic Track Brochure.pdf",
    description: "Maglinear 10 Series magnetic track system",
  },
  {
    name: "20 Series Magnetic Track Brochure",
    filename: "20 Series Magnetic Track Brochure.pdf",
    url: "/catalogues/20 Series Magnetic Track Brochure.pdf",
    description: "Maglinear 20 Series magnetic track system",
  },
  {
    name: "S06 Series Magnetic Track Brochure",
    filename: "S06 Series Magnetic Track Brochure.pdf",
    url: "/catalogues/S06 Series Magnetic Track Brochure.pdf",
    description: "Maglinear S06 Series magnetic track system",
  },
];

// ── Animated warm background ──────────────────────────────────────────────
function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const stateRef = useRef<{
    w: number; h: number; t: number;
    pts: Array<{
      x: number; y: number; vx: number; vy: number;
      r: number; op: number; cr: number; cg: number; cb: number;
      sh: number; rot: number; rs: number;
    }>;
  }>({ w: 0, h: 0, t: 0, pts: [] });

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const pal: [number, number, number][] = [
      [180, 140, 80], [210, 170, 100], [230, 165, 0],
      [155, 110, 55], [0, 168, 232],
    ];

    function init() {
      const { w, h } = stateRef.current;
      const n = Math.max(50, Math.floor((w * h) / 16000));
      stateRef.current.pts = Array.from({ length: n }, (_, i) => {
        const c = pal[i % pal.length];
        return {
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28 - 0.09,
          r: 2 + Math.random() * 5, op: 0.10 + Math.random() * 0.16,
          cr: c[0], cg: c[1], cb: c[2],
          sh: i % 3, rot: Math.random() * Math.PI * 2,
          rs: (Math.random() - 0.5) * 0.013,
        };
      });
    }

    function resize() {
      if (!cv) return;
      const rc = cv.getBoundingClientRect();
      stateRef.current.w = cv.width = rc.width;
      stateRef.current.h = cv.height = rc.height;
      init();
    }
    const ro = new ResizeObserver(resize);
    ro.observe(cv); resize();

    function frame() {
      if (!ctx) return;
      const s = stateRef.current;
      s.t += 16;
      ctx.clearRect(0, 0, s.w, s.h);

      // wavy grid
      ctx.strokeStyle = `rgba(150,105,40,${0.06 + Math.sin(s.t * 0.0003) * 0.02})`;
      ctx.lineWidth = 0.65;
      for (let x = 0; x < s.w; x += 80) {
        const off = Math.sin(x * 0.005 + s.t * 0.0008) * 3;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + off, s.h); ctx.stroke();
      }
      for (let y = 0; y < s.h; y += 80) {
        const off = Math.cos(y * 0.005 + s.t * 0.0008) * 3;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(s.w, y + off); ctx.stroke();
      }

      // soft glowing orbs
      const orbs: [number, number, number, number, number, number, number][] = [
        [s.w * 0.12, s.h * 0.28, 340, 215, 160, 55, 0.11],
        [s.w * 0.87, s.h * 0.6, 400, 230, 140, 0, 0.09],
        [s.w * 0.5, s.h * 0.05, 270, 0, 168, 232, 0.06],
        [s.w * 0.28, s.h * 0.85, 310, 185, 125, 45, 0.08],
      ];
      for (const [cx, cy, r, cr, cg, cb, a] of orbs) {
        const dy = Math.sin(s.t * 0.0005 + cx) * 25;
        const g = ctx.createRadialGradient(cx, cy + dy, 0, cx, cy + dy, r);
        g.addColorStop(0, `rgba(${cr},${cg},${cb},${a})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(cx, cy + dy, r, 0, Math.PI * 2); ctx.fill();
      }

      // particle links
      const ps = s.pts;
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 145) {
            ctx.strokeStyle = `rgba(160,110,40,${(1 - d / 145) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(ps[i].x, ps[i].y); ctx.lineTo(ps[j].x, ps[j].y); ctx.stroke();
          }
        }
      }

      // particle shapes
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy; p.rot += p.rs;
        if (p.x < -20) p.x = s.w + 20; if (p.x > s.w + 20) p.x = -20;
        if (p.y < -20) p.y = s.h + 20; if (p.y > s.h + 20) p.y = -20;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = `rgba(${p.cr},${p.cg},${p.cb},${p.op})`;
        if (p.sh === 0) { ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI * 2); ctx.fill(); }
        else if (p.sh === 1) { ctx.fillRect(-p.r, -p.r, p.r * 2, p.r * 2); }
        else {
          ctx.beginPath();
          ctx.moveTo(0, -p.r * 1.4); ctx.lineTo(p.r * 1.4, 0);
          ctx.lineTo(0, p.r * 1.4); ctx.lineTo(-p.r * 1.4, 0);
          ctx.closePath(); ctx.fill();
        }
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(frame);
    }
    animRef.current = requestAnimationFrame(frame);
    return () => { ro.disconnect(); cancelAnimationFrame(animRef.current); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function Downloads() {
  const { t } = useTranslation();

  // Request popup state
  const [requestTarget, setRequestTarget] = useState<{ catalogueUrl: string; catalogueName: string } | null>(null);
  const [reqForm, setReqForm] = useState({ name: "", email: "", company: "", comment: "" });
  const [reqSubmitting, setReqSubmitting] = useState(false);
  const [reqDone, setReqDone] = useState(false);

  // Redeem code state
  const [redeemCode, setRedeemCode] = useState("");
  const [redeemStatus, setRedeemStatus] = useState<"idle" | "loading" | "error">("idle");
  const [redeemError, setRedeemError] = useState("");

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestTarget) return;
    setReqSubmitting(true);
    try {
      const res = await fetch("/api/catalogue-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: reqForm.name,
          email: reqForm.email,
          company: reqForm.name, // same field — "Name / Company"
          comment: reqForm.comment,
          ...requestTarget,
        }),
      });
      if (res.ok) {
        setReqDone(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setReqSubmitting(false);
    }
  };

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!redeemCode.trim()) return;
    setRedeemStatus("loading");
    setRedeemError("");
    try {
      const res = await fetch("/api/catalogue-redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: redeemCode.trim() }),
      });
      if (res.ok) {
        const { catalogueUrl } = await res.json();
        // Trigger download
        const a = document.createElement("a");
        a.href = catalogueUrl;
        a.download = catalogueUrl.split("/").pop() || "catalogue.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setRedeemCode("");
        setRedeemStatus("idle");
      } else {
        const { error } = await res.json();
        setRedeemError(error || "Invalid or already used code");
        setRedeemStatus("error");
      }
    } catch {
      setRedeemError("Network error, please try again");
      setRedeemStatus("error");
    }
  };

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: "#EDE0C4", color: "#1C1410" }}>
      <Navbar />

      <div className="relative pt-32 pb-24">
        {/* Canvas + ambient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <AnimatedBackground />
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px]"
            style={{ backgroundColor: "rgba(200,155,70,0.18)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] rounded-full blur-[130px]"
            style={{ backgroundColor: "rgba(230,165,0,0.14)" }} />
          <div className="absolute top-[60%] left-[10%] w-[360px] h-[360px] rounded-full blur-[110px]"
            style={{ backgroundColor: "rgba(180,130,55,0.12)" }} />
        </div>

        <main className="relative z-10">
          <div className="container mx-auto px-6 lg:px-12">

            {/* ── Hero ── */}
            <div className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-6"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ background: "linear-gradient(135deg, #00A8E8, #0088C0)" }}
                >
                  <Download className="w-5 h-5 text-white" />
                </div>
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: "#00A8E8" }}
                >
                  {t('downloads.resources')}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
                style={{ color: "#1C1410" }}
              >
                {t('downloads.dl_center')}
                <span className="italic font-normal" style={{ color: "#8B6830" }}>
                  {t('downloads.center')}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg leading-relaxed max-w-2xl mb-10"
                style={{ color: "#6B4E28" }}
              >
                {t('downloads.desc')}
              </motion.p>

              {/* Count chip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex flex-wrap gap-4"
              >
                <div
                  className="flex items-center gap-3 px-5 py-3 rounded-xl border"
                  style={{ backgroundColor: "rgba(255,245,220,0.55)", borderColor: "rgba(180,135,60,0.35)", backdropFilter: "blur(8px)" }}
                >
                  <BookOpen className="w-4 h-4" style={{ color: "#A07830" }} />
                  <span className="text-lg font-bold" style={{ color: "#1C1410" }}>{CATALOGUES.length}</span>
                  <span className="text-xs" style={{ color: "#8B6830" }}>{t('downloads.total')}</span>
                </div>
              </motion.div>

              {/* Redeem Code bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 rounded-2xl border p-5"
                style={{ backgroundColor: "rgba(255,245,220,0.50)", borderColor: "rgba(180,135,60,0.30)", backdropFilter: "blur(12px)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#A07830" }}>Redeem Download Code</p>
                <form onSubmit={handleRedeem} className="flex items-center gap-3">
                  <input
                    type="text"
                    maxLength={6}
                    value={redeemCode}
                    onChange={e => { setRedeemCode(e.target.value.toUpperCase()); setRedeemStatus("idle"); setRedeemError(""); }}
                    placeholder="Enter 6-char code"
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-mono uppercase outline-none tracking-widest"
                    style={{ backgroundColor: "rgba(255,248,230,0.7)", border: "1px solid rgba(180,135,60,0.40)", color: "#1C1410" }}
                  />
                  <button
                    type="submit"
                    disabled={redeemStatus === "loading" || redeemCode.length < 6}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
                    style={{ backgroundColor: "#1a2332", color: "#fff" }}
                  >
                    {redeemStatus === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Download"}
                  </button>
                </form>
                {redeemStatus === "error" && (
                  <p className="text-xs mt-2 text-red-500">{redeemError}</p>
                )}
              </motion.div>
            </div>

            {/* ── Catalogue Grid ── */}
            <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: "rgba(255,245,220,0.40)", borderColor: "rgba(180,135,60,0.28)", backdropFilter: "blur(8px)" }}>
              {CATALOGUES.map((cat, idx) => (
                <motion.div
                  key={cat.filename}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.04 }}
                  className="flex items-center gap-4 px-6 py-5 transition-all"
                  style={{ borderBottom: idx < CATALOGUES.length - 1 ? "1px solid rgba(180,135,60,0.15)" : undefined }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(200,160,75,0.12)")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: "rgba(200,160,75,0.25)", border: "1px solid rgba(180,135,60,0.30)" }}
                  >
                    <FileText className="w-5 h-5" style={{ color: "#A07830" }} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold truncate" style={{ color: "#1C1410" }}>{cat.name}</h4>
                    <p className="text-xs mt-0.5 truncate" style={{ color: "#8B6830" }}>{cat.description}</p>
                  </div>

                  {/* Request button */}
                  <button
                    onClick={() => {
                      setReqForm({ name: "", email: "", company: "", comment: "" });
                      setReqDone(false);
                      setRequestTarget({ catalogueUrl: cat.url, catalogueName: cat.name });
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105 shrink-0"
                    style={{ backgroundColor: "rgba(26,35,50,0.10)", color: "#1a2332", border: "1px solid rgba(26,35,50,0.25)" }}
                  >
                    <Download className="w-3.5 h-3.5" />
                    Request
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Footer link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-end pt-4 pb-4"
            >
              <a
                href="/contact"
                className="flex items-center gap-2 text-xs group transition-colors"
                style={{ color: "#8B6830" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#00A8E8")}
                onMouseLeave={e => (e.currentTarget.style.color = "#8B6830")}
              >
                {t('downloads.need_custom')}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>
          </div>
        </main>
      </div>

      <Footer />

      {/* ── Request Popup Modal ── */}
      <AnimatePresence>
        {requestTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(28,20,16,0.7)", backdropFilter: "blur(6px)" }}
            onClick={() => setRequestTarget(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="relative w-full max-w-md rounded-2xl p-8"
              style={{ backgroundColor: "#f9f6f0", border: "1px solid rgba(180,135,60,0.35)" }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setRequestTarget(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: "rgba(180,135,60,0.15)", color: "#8B6830" }}
              >
                <X className="w-4 h-4" />
              </button>

              {reqDone ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "rgba(0,168,232,0.12)" }}>
                    <FileText className="w-7 h-7" style={{ color: "#00A8E8" }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "#1C1410" }}>Request Submitted!</h3>
                  <p className="text-sm" style={{ color: "#8B6830" }}>We've received your request for <strong>{requestTarget.catalogueName}</strong>. You'll get a download code in your email once approved.</p>
                  <button
                    onClick={() => setRequestTarget(null)}
                    className="mt-6 px-6 py-2.5 rounded-xl text-sm font-semibold"
                    style={{ backgroundColor: "#1a2332", color: "#fff" }}
                  >Close</button>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-bold mb-1" style={{ color: "#1C1410" }}>Request Catalogue</h3>
                  <p className="text-xs mb-6" style={{ color: "#8B6830" }}>{requestTarget.catalogueName}</p>
                  <form onSubmit={handleRequestSubmit} className="space-y-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-semibold block mb-1.5" style={{ color: "#A07830" }}>Name / Company *</label>
                      <input
                        required
                        value={reqForm.name}
                        onChange={e => setReqForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                        style={{ backgroundColor: "rgba(255,248,230,0.8)", border: "1px solid rgba(180,135,60,0.40)", color: "#1C1410" }}
                        placeholder="Your name or company"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-semibold block mb-1.5" style={{ color: "#A07830" }}>Email *</label>
                      <input
                        required
                        type="email"
                        value={reqForm.email}
                        onChange={e => setReqForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                        style={{ backgroundColor: "rgba(255,248,230,0.8)", border: "1px solid rgba(180,135,60,0.40)", color: "#1C1410" }}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-semibold block mb-1.5" style={{ color: "#A07830" }}>Comment (optional)</label>
                      <textarea
                        rows={3}
                        value={reqForm.comment}
                        onChange={e => setReqForm(f => ({ ...f, comment: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                        style={{ backgroundColor: "rgba(255,248,230,0.8)", border: "1px solid rgba(180,135,60,0.40)", color: "#1C1410" }}
                        placeholder="Any specific questions..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={reqSubmitting}
                      className="w-full py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-60"
                      style={{ backgroundColor: "#1a2332", color: "#fff" }}
                    >
                      {reqSubmitting ? <Loader2 className="w-4 h-4 animate-spin inline" /> : "Submit Request"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
