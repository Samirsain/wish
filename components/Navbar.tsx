"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (open && drawerRef.current && !drawerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [open]);

  const navLinks = [
    { href: "/diwali",    label: "Diwali",    emoji: "🪔" },
    { href: "/eid",       label: "Eid",        emoji: "🌙" },
    { href: "/birthday",  label: "Birthday",   emoji: "🎂" },
    { href: "/christmas", label: "Christmas",  emoji: "🎄" },
    { href: "/newyear",   label: "New Year",   emoji: "🎆" },
  ];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: "64px",
          display: "flex",
          alignItems: "center",
          padding: "0 1.5rem",
          transition: "all 0.3s ease",
          background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", marginRight: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{
            fontFamily: "var(--font-accent)",
            fontWeight: 700,
            fontSize: "1.2rem",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "0.02em",
          }}>
            ✦ WishCraft
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="hidden md:flex">
          {navLinks.map(({ href, label, emoji }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "100px",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  background: active ? "rgba(99,102,241,0.08)" : "transparent",
                  color: active ? "#6366f1" : "#6b7280",
                  border: active ? "1px solid rgba(99,102,241,0.15)" : "1px solid transparent",
                }}
                onMouseEnter={e => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)";
                    (e.currentTarget as HTMLElement).style.color = "#1a1a2e";
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "#6b7280";
                  }
                }}
              >
                <span>{emoji}</span>
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <Link
          href="/birthday"
          className="hidden md:flex btn-luxury btn-primary ml-4"
          style={{ padding: "0.45rem 1.1rem", fontSize: "0.82rem" }}
        >
          Create Card
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          className="md:hidden"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            borderRadius: "8px",
          }}
          aria-label="Menu"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: "block",
              width: "22px",
              height: "2px",
              borderRadius: "2px",
              background: "#1a1a2e",
              transition: "all 0.3s ease",
              transform: open
                ? i === 0 ? "rotate(45deg) translate(5px, 5px)"
                : i === 1 ? "scaleX(0)"
                : "rotate(-45deg) translate(5px, -5px)"
                : "none",
              opacity: open && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "rgba(0,0,0,0.2)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease",
          backdropFilter: "blur(4px)",
        }}
        onClick={() => setOpen(false)}
      />
      <div
        ref={drawerRef}
        style={{
          position: "fixed",
          top: "64px",
          left: "1rem",
          right: "1rem",
          zIndex: 50,
          background: "rgba(255,255,255,0.98)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: "20px",
          padding: "1rem",
          boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
          transform: open ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.97)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        }}
        className="md:hidden"
      >
        {navLinks.map(({ href, label, emoji }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.8rem 1rem",
                borderRadius: "12px",
                textDecoration: "none",
                fontSize: "0.95rem",
                fontWeight: 500,
                color: active ? "#6366f1" : "#374151",
                background: active ? "rgba(99,102,241,0.06)" : "transparent",
                marginBottom: "0.25rem",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>{emoji}</span>
              <span>{label}</span>
              {active && <span style={{ marginLeft: "auto", color: "#6366f1", fontSize: "0.8rem" }}>●</span>}
            </Link>
          );
        })}
        <div style={{ height: "1px", background: "rgba(0,0,0,0.06)", margin: "0.75rem 0" }} />
        <Link
          href="/birthday"
          className="btn-luxury btn-primary"
          style={{ width: "100%", justifyContent: "center", display: "flex" }}
        >
          🎉 Create a Card
        </Link>
      </div>
    </>
  );
}
