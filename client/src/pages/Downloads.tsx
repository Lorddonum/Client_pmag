import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  FileText, Download, Loader2, FolderOpen,
  Search, ArrowRight, BookOpen, Layers, X, Package
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  modelNumber: string;
  series: string[];
  brand: string;
  category: string;
  catalogueUrl: string | null;
  image: string | null;
}

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
      const rc = cv.getBoundingClientRect();
      stateRef.current.w = cv.width = rc.width;
      stateRef.current.h = cv.height = rc.height;
      init();
    }
    const ro = new ResizeObserver(resize);
    ro.observe(cv); resize();

    function frame() {
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
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBrand, setActiveBrand] = useState<"all" | "Paralight" | "Maglinear">("all");
  const [activeSeries, setActiveSeries] = useState<string>("all");

  useEffect(() => {
    const load = async () => {
      try {
        let res = await fetch("/api/products");
        if (!res.ok) res = await fetch("/data/products.json");
        if (res.ok) {
          const data: Product[] = await res.json();
          setProducts(data.filter(p => !!p.catalogueUrl));
        }
      } catch (e) {
        console.error("Downloads: failed to load products", e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const filteredProducts = useMemo(() => products.filter(p => {
    if (activeBrand !== "all" && p.brand !== activeBrand) return false;
    if (activeSeries !== "all" && !(p.series || []).includes(activeSeries)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !p.name.toLowerCase().includes(q) &&
        !p.modelNumber.toLowerCase().includes(q) &&
        !(p.series || []).some(s => s.toLowerCase().includes(q))
      ) return false;
    }
    return true;
  }), [products, activeBrand, activeSeries, searchQuery]);

  const allSeries = useMemo(() => {
    const pool = activeBrand === "all" ? products : products.filter(p => p.brand === activeBrand);
    const set = new Set<string>();
    for (const p of pool) for (const s of (p.series || [])) set.add(s);
    return Array.from(set).sort();
  }, [products, activeBrand]);

  const grouped = useMemo(() => {
    const acc: Record<string, Product[]> = {};
    for (const p of filteredProducts) {
      const key = (p.series && p.series.length > 0) ? p.series[0] : "Other";
      if (!acc[key]) acc[key] = [];
      acc[key].push(p);
    }
    return acc;
  }, [filteredProducts]);

  const paralightCount = products.filter(p => p.brand === "Paralight").length;
  const maglinearCount = products.filter(p => p.brand === "Maglinear").length;

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
                  Resources
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
                style={{ color: "#1C1410" }}
              >
                Download{" "}
                <span className="italic font-normal" style={{ color: "#8B6830" }}>
                  Center
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg leading-relaxed max-w-2xl mb-10"
                style={{ color: "#6B4E28" }}
              >
                Access product catalogues, specifications, and technical documentation
                for our complete range of architectural lighting solutions.
              </motion.p>

              {/* Stat chips */}
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
                  <span className="text-lg font-bold" style={{ color: "#1C1410" }}>{products.length}</span>
                  <span className="text-xs" style={{ color: "#8B6830" }}>Total Catalogues</span>
                </div>
                <div
                  className="flex items-center gap-3 px-5 py-3 rounded-xl border"
                  style={{ backgroundColor: "rgba(255,245,220,0.55)", borderColor: "rgba(180,135,60,0.35)", backdropFilter: "blur(8px)" }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#00A8E8]" />
                  <span className="text-lg font-bold" style={{ color: "#1C1410" }}>{paralightCount}</span>
                  <span className="text-xs" style={{ color: "#8B6830" }}>Paralight</span>
                </div>
                <div
                  className="flex items-center gap-3 px-5 py-3 rounded-xl border"
                  style={{ backgroundColor: "rgba(255,245,220,0.55)", borderColor: "rgba(180,135,60,0.35)", backdropFilter: "blur(8px)" }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#ECAA00]" />
                  <span className="text-lg font-bold" style={{ color: "#1C1410" }}>{maglinearCount}</span>
                  <span className="text-xs" style={{ color: "#8B6830" }}>Maglinear Lighting</span>
                </div>
              </motion.div>
            </div>

            {/* ── Filters ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border p-6 mb-10"
              style={{
                backgroundColor: "rgba(255,245,220,0.50)",
                borderColor: "rgba(180,135,60,0.30)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: "#A07830" }}
                  />
                  <input
                    type="text"
                    placeholder="Search by name, model number, or series..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-10 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{
                      backgroundColor: "rgba(255,248,230,0.7)",
                      border: "1px solid rgba(180,135,60,0.40)",
                      color: "#1C1410",
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#00A8E8")}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(180,135,60,0.40)")}
                    data-testid="input-search-downloads"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "rgba(180,135,60,0.30)" }}
                    >
                      <X className="w-3 h-3" style={{ color: "#6B4E28" }} />
                    </button>
                  )}
                </div>

                {/* Brand tabs */}
                <div
                  className="flex items-center gap-1 p-1 rounded-xl"
                  style={{ backgroundColor: "rgba(200,160,80,0.20)", border: "1px solid rgba(180,135,60,0.30)" }}
                >
                  {(["all", "Paralight", "Maglinear"] as const).map(key => (
                    <button
                      key={key}
                      onClick={() => { setActiveBrand(key); setActiveSeries("all"); }}
                      className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
                      style={
                        activeBrand === key
                          ? {
                            backgroundColor:
                              key === "Paralight" ? "#00A8E8"
                                : key === "Maglinear" ? "#ECAA00"
                                  : "#1C1410",
                            color: "#fff",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                          }
                          : { color: "#8B6830" }
                      }
                      data-testid={`filter-${key}`}
                    >
                      {key === "all" ? "All" : key}
                    </button>
                  ))}
                </div>
              </div>

              {/* Series pills */}
              {allSeries.length > 1 && (
                <div
                  className="mt-4 pt-4 flex items-center gap-2 flex-wrap"
                  style={{ borderTop: "1px solid rgba(180,135,60,0.20)" }}
                >
                  <span
                    className="text-[10px] uppercase tracking-widest mr-1 font-medium"
                    style={{ color: "#A07830" }}
                  >
                    Series:
                  </span>
                  {["all", ...allSeries].map(s => (
                    <button
                      key={s}
                      onClick={() => setActiveSeries(s)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={
                        activeSeries === s
                          ? {
                            backgroundColor: "rgba(180,135,60,0.25)",
                            color: "#1C1410",
                            border: "1px solid rgba(180,135,60,0.50)",
                          }
                          : { color: "#8B6830", border: "1px solid transparent" }
                      }
                    >
                      {s === "all" ? "All" : s}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* ── Content ── */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-40">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(200,160,80,0.30)" }}
                >
                  <Loader2 className="w-7 h-7 animate-spin" style={{ color: "#00A8E8" }} />
                </div>
                <p className="text-sm" style={{ color: "#8B6830" }}>Loading catalogues…</p>
              </div>

            ) : filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-32 rounded-2xl border"
                style={{ backgroundColor: "rgba(255,245,220,0.40)", borderColor: "rgba(180,135,60,0.30)" }}
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "rgba(200,160,80,0.25)" }}
                >
                  <FileText className="w-9 h-9" style={{ color: "#A07830" }} />
                </div>
                <p className="text-lg font-medium mb-2" style={{ color: "#1C1410" }}>No catalogues found</p>
                <p className="text-sm" style={{ color: "#8B6830" }}>
                  {searchQuery ? "Try adjusting your search terms" : "Check back soon for updates"}
                </p>
              </motion.div>

            ) : (
              <div className="space-y-8">
                <AnimatePresence mode="wait">
                  {Object.entries(grouped).map(([series, prods], sIdx) => {
                    const brandColor = prods[0]?.brand === "Paralight" ? "#00A8E8" : "#ECAA00";
                    const brandName = prods[0]?.brand === "Maglinear"
                      ? "Maglinear Lighting" : (prods[0]?.brand ?? "");

                    return (
                      <motion.div
                        key={series}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: sIdx * 0.05 }}
                        className="rounded-2xl border overflow-hidden"
                        style={{
                          backgroundColor: "rgba(255,245,220,0.40)",
                          borderColor: "rgba(180,135,60,0.28)",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        {/* Series header */}
                        <div
                          className="px-6 py-5 flex items-center justify-between"
                          style={{
                            backgroundColor: "rgba(200,160,75,0.25)",
                            borderBottom: "1px solid rgba(180,135,60,0.20)",
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: `${brandColor}20` }}
                            >
                              <FolderOpen className="w-4 h-4" style={{ color: brandColor }} />
                            </div>
                            <div>
                              <h3 className="text-sm font-semibold" style={{ color: "#1C1410" }}>
                                {series}
                              </h3>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span
                                  className="text-[10px] uppercase tracking-widest font-semibold"
                                  style={{ color: brandColor }}
                                >
                                  {brandName}
                                </span>
                                <span
                                  className="w-1 h-1 rounded-full"
                                  style={{ backgroundColor: "#A07830" }}
                                />
                                <span
                                  className="text-[10px] uppercase tracking-wider"
                                  style={{ color: "#8B6830" }}
                                >
                                  {prods.length} file{prods.length !== 1 ? "s" : ""}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Layers className="w-4 h-4" style={{ color: "#C4A060" }} />
                        </div>

                        {/* Product rows */}
                        <div>
                          {prods.map((product, idx) => (
                            <motion.a
                              key={product.id}
                              href={product.catalogueUrl || "#"}
                              download={`${product.name}-Catalogue.pdf`}
                              data-testid={`download-${product.id}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: idx * 0.03 }}
                              className="group flex items-center gap-4 px-6 py-4 transition-all"
                              style={{
                                borderBottom:
                                  idx < prods.length - 1
                                    ? "1px solid rgba(180,135,60,0.15)"
                                    : undefined,
                              }}
                              onMouseEnter={e =>
                                (e.currentTarget.style.backgroundColor = "rgba(200,160,75,0.15)")
                              }
                              onMouseLeave={e =>
                                (e.currentTarget.style.backgroundColor = "transparent")
                              }
                            >
                              {/* Thumbnail */}
                              <div
                                className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
                                style={{
                                  backgroundColor: "rgba(200,160,75,0.25)",
                                  border: "1px solid rgba(180,135,60,0.30)",
                                }}
                              >
                                {product.image ? (
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <Package className="w-5 h-5" style={{ color: "#A07830" }} />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <h4
                                  className="text-sm font-medium truncate"
                                  style={{ color: "#1C1410" }}
                                >
                                  {product.name}
                                </h4>
                                <span
                                  className="text-[10px] uppercase tracking-wider font-mono"
                                  style={{ color: "#8B6830" }}
                                >
                                  {product.modelNumber}
                                </span>
                              </div>

                              <div className="flex items-center gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
                                <span
                                  className="text-[10px] uppercase tracking-wider hidden sm:block"
                                  style={{ color: "#8B6830" }}
                                >
                                  PDF
                                </span>
                                <div
                                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                                  style={{ backgroundColor: `${brandColor}20` }}
                                >
                                  <Download className="w-4 h-4" style={{ color: brandColor }} />
                                </div>
                              </div>
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 pb-4"
                >
                  <p className="text-xs" style={{ color: "#A07830" }}>
                    Showing {filteredProducts.length} of {products.length} catalogues
                  </p>
                  <a
                    href="/contact"
                    className="flex items-center gap-2 text-xs group transition-colors"
                    style={{ color: "#8B6830" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#00A8E8")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#8B6830")}
                  >
                    Need a custom specification sheet?
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </motion.div>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
