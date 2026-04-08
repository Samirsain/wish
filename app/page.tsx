"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { categories } from "@/lib/data";

/* ── floating-particle canvas (light version) ── */
function HeroParticles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    const N = 55;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * (c.width || 800),
      y: Math.random() * (c.height || 600),
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      hue: [250, 280, 200, 330][Math.floor(Math.random() * 4)],
      alpha: Math.random() * 0.3 + 0.05,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0;
        if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},80%,60%,${p.alpha})`;
        ctx.fill();
      });
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${0.06 * (1 - d / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const ACCENT: Record<string, { from: string; to: string; glow: string }> = {
  diwali:   { from: "#f59e0b", to: "#ef4444",  glow: "rgba(245,158,11,0.2)"  },
  eid:      { from: "#10b981", to: "#f59e0b",  glow: "rgba(16,185,129,0.2)"  },
  birthday: { from: "#ec4899", to: "#f43f5e",  glow: "rgba(236,72,153,0.2)"  },
  christmas:{ from: "#16a34a", to: "#ef4444",  glow: "rgba(22,163,74,0.2)"   },
  newyear:  { from: "#6366f1", to: "#a855f7",  glow: "rgba(99,102,241,0.2)"  },
};

export default function HomePage() {
  useReveal();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="page-enter min-h-screen overflow-x-hidden" style={{ background: "#ffffff" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #fafafa 0%, #ffffff 100%)" }}>
        <HeroParticles />

        {/* Soft ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)", filter: "blur(50px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)", filter: "blur(50px)" }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-slide-down flex justify-center mb-6">
            <span className="badge animate-border-pulse">✦ Personalised Greeting Cards</span>
          </div>

          {/* Headline */}
          <h1 className="font-display animate-slide-up delay-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-6">
            <span className="block text-gradient">Send wishes</span>
            <span className="block italic" style={{ color: "#1a1a2e", fontSize: "0.85em" }}>that feel</span>
            <span className="block text-gradient" style={{ fontSize: "0.9em" }}>magical ✦</span>
          </h1>

          {/* Sub */}
          <p className="animate-slide-up delay-300 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed mb-10"
            style={{ color: "#6b7280" }}>
            Choose a festival, pick a template, type your name — share a beautiful animated card with your loved ones in seconds.
          </p>

          {/* CTAs */}
          <div className="animate-slide-up delay-500 flex flex-wrap gap-3 justify-center">
            <Link href="/birthday" className="btn-luxury btn-primary text-sm sm:text-base">
              🎉 Start Creating
            </Link>
            <Link href="#categories" className="btn-luxury btn-outline text-sm sm:text-base">
              Browse Occasions ↓
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-in delay-700 mt-14 flex flex-wrap justify-center gap-6 sm:gap-16">
            {[
              { n: "5+", label: "Occasions" },
              { n: "15", label: "Templates" },
              { n: "∞",  label: "Wishes" },
            ].map(({ n, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-3xl sm:text-4xl font-bold text-gradient">{n}</div>
                <div className="text-xs tracking-widest uppercase mt-1" style={{ color: "#9ca3af" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-1000">
          <span className="text-xs tracking-widest uppercase" style={{ color: "#d1d5db" }}>Scroll</span>
          <div className="w-px h-8 rounded-full" style={{ background: "linear-gradient(180deg, #6366f1, transparent)" }} />
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14 reveal">
          <p className="text-xs tracking-widest uppercase mb-3 font-semibold" style={{ color: "#6366f1" }}>Choose Your Occasion</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold" style={{ color: "#1a1a2e" }}>Every moment deserves</h2>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-gradient italic">a special card ✦</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 stagger">
          {categories.map((cat, i) => {
            const acc = ACCENT[cat.slug] ?? { from: "#6366f1", to: "#8b5cf6", glow: "rgba(99,102,241,0.2)" };
            const isHovered = hovered === cat.slug;
            return (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="reveal shine group block"
                style={{ transitionDelay: `${i * 80}ms`, textDecoration: "none" }}
                onMouseEnter={() => setHovered(cat.slug)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500"
                  style={{
                    background: isHovered ? "#ffffff" : "#fafafa",
                    border: isHovered ? `1.5px solid ${acc.from}30` : "1.5px solid rgba(0,0,0,0.07)",
                    boxShadow: isHovered
                      ? `0 16px 48px rgba(0,0,0,0.1), 0 0 0 1px ${acc.from}20, 0 0 30px ${acc.glow}`
                      : "0 2px 12px rgba(0,0,0,0.05)",
                    transform: isHovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
                    padding: "1.75rem 1.5rem",
                  }}
                >
                  {/* Gradient top bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, ${acc.from}, ${acc.to})`, opacity: isHovered ? 1 : 0.3 }} />

                  {/* Soft glow */}
                  <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full pointer-events-none transition-all duration-500"
                    style={{ background: `radial-gradient(circle, ${acc.glow} 0%, transparent 70%)`, filter: "blur(10px)", opacity: isHovered ? 1 : 0 }} />

                  {/* Emoji */}
                  <div className="relative text-5xl mb-4 transition-transform duration-500"
                    style={{ transform: isHovered ? "scale(1.15) rotate(5deg)" : "scale(1) rotate(0deg)" }}>
                    {cat.emoji}
                  </div>

                  {/* Name */}
                  <h3 className="font-display font-bold text-xl mb-1.5 transition-all duration-300"
                    style={{
                      background: isHovered ? `linear-gradient(135deg, ${acc.from}, ${acc.to})` : "none",
                      WebkitBackgroundClip: isHovered ? "text" : "unset",
                      WebkitTextFillColor: isHovered ? "transparent" : "#1a1a2e",
                      backgroundClip: isHovered ? "text" : "unset",
                    }}>
                    {cat.name}
                  </h3>

                  {/* Desc */}
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "#9ca3af" }}>{cat.description}</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium" style={{ color: "#d1d5db" }}>{cat.templates.length} templates</span>
                    <span className="text-xs font-semibold transition-all duration-300"
                      style={{ color: isHovered ? acc.from : "#d1d5db", transform: isHovered ? "translateX(4px)" : "translateX(0)" }}>
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20" style={{ background: "transparent" }}>
        <div className="divider mb-16" />
        <div className="text-center mb-14 reveal">
          <p className="text-xs tracking-widest uppercase mb-3 font-semibold" style={{ color: "#6366f1" }}>Simple & Fast</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold" style={{ color: "#1a1a2e" }}>How it works</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 stagger">
          {[
            { n: "01", icon: "🎭", title: "Pick an occasion", desc: "Choose from Diwali, Eid, Birthday, Christmas or New Year." },
            { n: "02", icon: "✍️", title: "Add your name",   desc: "Personalise the card with your name as the sender." },
            { n: "03", icon: "🔗", title: "Share the link",  desc: "Copy the shareable link and send it anywhere — WhatsApp, Instagram, email." },
          ].map(({ n, icon, title, desc }, i) => (
            <div key={n} className="reveal group text-center" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-5 mx-auto transition-all duration-500 group-hover:scale-110"
                style={{
                  background: "#ffffff",
                  border: "1.5px solid rgba(99,102,241,0.12)",
                  boxShadow: "0 4px 20px rgba(99,102,241,0.08)",
                }}>
                <span className="text-3xl">{icon}</span>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#ffffff", fontSize: "0.6rem" }}>
                  {n}
                </span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2" style={{ color: "#1a1a2e" }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{desc}</p>
            </div>
          ))}
        </div>
        <div className="divider mt-16" />
      </section>

      {/* ── FOOTER ── */}
      <footer className="text-center py-10 px-4">
        <p className="font-accent tracking-widest mb-1 text-gradient" style={{ fontSize: "0.9rem" }}>✦ WishCraft</p>
        <p style={{ color: "#d1d5db", fontSize: "0.78rem" }}>Made with love · Share joy, not just messages</p>
      </footer>
    </div>
  );
}
