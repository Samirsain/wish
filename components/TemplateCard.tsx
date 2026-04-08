"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Template } from "@/lib/data";
import MiniAnimation from "@/components/animations/MiniAnimation";

interface Props { template: Template; categorySlug: string; }

export default function TemplateCard({ template: tpl, categorySlug }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -14;
    setTilt({ x, y });
  };

  const ct = tpl.colorTheme;

  return (
    <Link
      href={`/${categorySlug}/${tpl.id}`}
      style={{ textDecoration: "none", display: "block" }}
      className="shine"
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          background: "#ffffff",
          border: hovered ? `1.5px solid ${ct.accent}30` : "1.5px solid rgba(0,0,0,0.07)",
          boxShadow: hovered
            ? `0 20px 50px rgba(0,0,0,0.1), 0 0 0 1px ${ct.accent}20, 0 0 30px ${ct.accent}18`
            : "0 2px 16px rgba(0,0,0,0.06)",
          transform: hovered
            ? `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-6px) scale(1.02)`
            : "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)",
          transition: hovered ? "box-shadow 0.3s ease, border-color 0.3s ease" : "all 0.5s cubic-bezier(0.34,1.56,0.64,1)",
          cursor: "pointer",
        }}
      >
        {/* Gradient top bar */}
        <div style={{
          height: "3px",
          background: `linear-gradient(90deg, ${ct.accent}, ${ct.accent2})`,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.3s ease",
        }} />

        {/* Animation preview */}
        <div style={{ position: "relative", height: "160px", background: ct.bg, overflow: "hidden" }}>
          <MiniAnimation type={tpl.animationType} accent={ct.accent} accent2={ct.accent2} />
          {/* Emoji overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "3.5rem",
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
            transform: hovered ? "scale(1.1) rotate(5deg)" : "scale(1)",
            transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          }}>
            {tpl.emoji}
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: "1.25rem 1.25rem 1.5rem" }}>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.05rem",
            color: "#1a1a2e",
            marginBottom: "0.5rem",
          }}>
            {tpl.name}
          </h3>

          <p style={{
            fontSize: "0.78rem",
            color: "#9ca3af",
            lineHeight: 1.6,
            marginBottom: "1rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {tpl.message.replace("{senderName}", "You").split("\n")[0]}
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              padding: "0.25rem 0.7rem",
              borderRadius: "100px",
              fontSize: "0.68rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              background: `${ct.accent}12`,
              color: ct.accent,
              border: `1px solid ${ct.accent}25`,
            }}>
              {tpl.animationType}
            </span>
            <span style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: hovered ? ct.accent : "#d1d5db",
              transform: hovered ? "translateX(4px)" : "translateX(0)",
              transition: "all 0.2s ease",
            }}>
              Use this →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
