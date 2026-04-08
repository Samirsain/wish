"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Template } from "@/lib/data";
import AnimationCanvas from "@/components/animations/AnimationCanvas";

interface Props { template: Template; categorySlug: string; senderName: string; }

export default function WishClient({ template: tpl, categorySlug, senderName }: Props) {
  const ct = tpl.colorTheme;
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const msgRef = useRef<HTMLDivElement>(null);

  const lines = tpl.message
    .replace("{senderName}", senderName)
    .split("\n")
    .filter(Boolean);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 400);
    return () => clearTimeout(t);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: `${tpl.name} — WishCraft`, url: window.location.href });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch { /* user cancelled */ }
    } else {
      handleCopy();
    }
  };

  const ripple = (e: React.MouseEvent<HTMLButtonElement>, color = "rgba(99,102,241,0.15)") => {
    const btn = e.currentTarget;
    const r = btn.getBoundingClientRect();
    const span = document.createElement("span");
    const size = Math.max(r.width, r.height);
    span.style.cssText = `position:absolute;width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px;border-radius:50%;background:${color};transform:scale(0);animation:rippleAnim 0.6s linear;pointer-events:none`;
    btn.style.position = "relative";
    btn.style.overflow = "hidden";
    btn.appendChild(span);
    setTimeout(() => span.remove(), 700);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f8fc", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>

      {/* Card */}
      <div
        className="animate-scale-in"
        style={{
          width: "100%",
          maxWidth: "520px",
          borderRadius: "28px",
          overflow: "hidden",
          background: "#ffffff",
          border: "1.5px solid rgba(0,0,0,0.07)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        {/* Animation area */}
        <div style={{ position: "relative", height: "260px", background: ct.bg, overflow: "hidden" }}>
          <AnimationCanvas type={tpl.animationType} accent={ct.accent} accent2={ct.accent2} />

          {/* Gradient top bar */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${ct.accent}, ${ct.accent2})` }} />

          {/* Emoji */}
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "5rem",
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.2))",
            animation: "float 4s ease-in-out infinite",
          }}>
            {tpl.emoji}
          </div>

          {/* Template name badge */}
          <div style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(10px)",
            borderRadius: "100px",
            padding: "0.3rem 0.75rem",
            fontSize: "0.7rem",
            fontWeight: 600,
            color: ct.accent,
            border: `1px solid ${ct.accent}25`,
            letterSpacing: "0.04em",
          }}>
            {tpl.name}
          </div>
        </div>

        {/* Message body */}
        <div style={{ padding: "2rem 2rem 1.5rem" }}>
          <div ref={msgRef}>
            {lines.map((line, i) => (
              <p
                key={i}
                style={{
                  fontFamily: i < lines.length - 1 ? "var(--font-display)" : "var(--font-body)",
                  fontSize: i < lines.length - 1 ? "1.05rem" : "0.9rem",
                  fontWeight: i < lines.length - 1 ? 500 : 600,
                  color: i === lines.length - 1 ? ct.accent : "#374151",
                  lineHeight: 1.7,
                  marginBottom: i < lines.length - 1 ? "0.75rem" : 0,
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.6s ease ${i * 120 + 200}ms, transform 0.6s ease ${i * 120 + 200}ms`,
                  fontStyle: i < lines.length - 1 ? "italic" : "normal",
                }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${ct.accent}30, transparent)`, margin: "1.5rem 0" }} />

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={(e) => { ripple(e, `${ct.accent}20`); handleShare(); }}
              style={{
                flex: 1,
                background: `linear-gradient(135deg, ${ct.accent}, ${ct.accent2})`,
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                padding: "0.85rem",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                boxShadow: `0 4px 16px ${ct.accent}30`,
                transition: "all 0.2s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              {shared ? "✓ Shared!" : "🔗 Share"}
            </button>

            <button
              onClick={(e) => { ripple(e); handleCopy(); }}
              style={{
                flex: 1,
                background: "#ffffff",
                color: copied ? ct.accent : "#374151",
                border: `1.5px solid ${copied ? ct.accent + "50" : "rgba(0,0,0,0.1)"}`,
                borderRadius: "12px",
                padding: "0.85rem",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                transition: "all 0.2s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              {copied ? "✓ Copied!" : "📋 Copy Link"}
            </button>
          </div>
        </div>
      </div>

      {/* Back links */}
      <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href={`/${categorySlug}/${tpl.id}`}
          style={{
            padding: "0.6rem 1.25rem",
            borderRadius: "100px",
            fontSize: "0.82rem",
            fontWeight: 500,
            color: "#6b7280",
            background: "#ffffff",
            border: "1.5px solid rgba(0,0,0,0.08)",
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            transition: "all 0.2s ease",
          }}
        >
          ← Change Name
        </Link>
        <Link
          href={`/${categorySlug}`}
          style={{
            padding: "0.6rem 1.25rem",
            borderRadius: "100px",
            fontSize: "0.82rem",
            fontWeight: 500,
            color: "#6b7280",
            background: "#ffffff",
            border: "1.5px solid rgba(0,0,0,0.08)",
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            transition: "all 0.2s ease",
          }}
        >
          ← More Templates
        </Link>
        <Link
          href="/"
          style={{
            padding: "0.6rem 1.25rem",
            borderRadius: "100px",
            fontSize: "0.82rem",
            fontWeight: 500,
            color: ct.accent,
            background: `${ct.accent}08`,
            border: `1.5px solid ${ct.accent}25`,
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
        >
          ✦ WishCraft Home
        </Link>
      </div>

      {/* Watermark */}
      <p style={{ marginTop: "1.25rem", fontSize: "0.72rem", color: "#d1d5db", letterSpacing: "0.06em" }}>
        Made with WishCraft · wishcraft.app
      </p>
    </div>
  );
}
