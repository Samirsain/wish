"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Template } from "@/lib/data";

interface Props { template: Template; categorySlug: string; }

export default function NameInputForm({ template: tpl, categorySlug }: Props) {
  const [name, setName] = useState("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const btnRef = useRef<HTMLButtonElement>(null);
  const ct = tpl.colorTheme;
  const MAX = 40;

  const ripple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current; if (!btn) return;
    const r = btn.getBoundingClientRect();
    const span = document.createElement("span");
    const size = Math.max(r.width, r.height);
    span.className = "ripple";
    span.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
    btn.appendChild(span);
    setTimeout(() => span.remove(), 700);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 300));
    router.push(`/wish/${categorySlug}/${tpl.id}?name=${encodeURIComponent(n)}`);
  };

  const trimmed = name.trim();
  const canSubmit = trimmed.length > 0 && trimmed.length <= MAX;

  return (
    <div style={{
      background: "#ffffff",
      border: "1.5px solid rgba(0,0,0,0.08)",
      borderRadius: "24px",
      padding: "2rem",
      boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      maxWidth: "480px",
      margin: "0 auto",
    }}>
      <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{tpl.emoji}</div>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "1.4rem",
          color: "#1a1a2e",
          marginBottom: "0.4rem",
        }}>
          Personalise your card
        </h2>
        <p style={{ fontSize: "0.85rem", color: "#9ca3af", lineHeight: 1.5 }}>
          Enter your name to sign this wish — it will appear on the card.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Floating label input */}
        <div style={{ position: "relative", marginBottom: "1.5rem" }}>
          <label style={{
            position: "absolute",
            left: "1.25rem",
            top: focused || name ? "0.4rem" : "50%",
            transform: focused || name ? "translateY(0) scale(0.75)" : "translateY(-50%) scale(1)",
            transformOrigin: "left",
            fontSize: "1rem",
            color: focused ? ct.accent : "#9ca3af",
            transition: "all 0.2s ease",
            pointerEvents: "none",
            fontWeight: 500,
            zIndex: 1,
          }}>
            Your name
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value.slice(0, MAX))}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            maxLength={MAX}
            autoComplete="given-name"
            style={{
              width: "100%",
              background: focused ? "#ffffff" : "#fafafa",
              border: focused ? `1.5px solid ${ct.accent}` : "1.5px solid rgba(0,0,0,0.1)",
              borderRadius: "14px",
              color: "#1a1a2e",
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              padding: name || focused ? "1.5rem 1.25rem 0.6rem" : "1.05rem 1.25rem",
              transition: "all 0.2s ease",
              outline: "none",
              boxShadow: focused ? `0 0 0 3px ${ct.accent}15` : "none",
            }}
          />
          {/* Character counter */}
          <span style={{
            position: "absolute",
            right: "1rem",
            bottom: "0.75rem",
            fontSize: "0.7rem",
            color: name.length > MAX * 0.8 ? "#ef4444" : "#d1d5db",
            transition: "color 0.2s ease",
          }}>
            {name.length}/{MAX}
          </span>
        </div>

        {/* Preview */}
        {trimmed && (
          <div style={{
            background: `${ct.accent}08`,
            border: `1px solid ${ct.accent}20`,
            borderRadius: "12px",
            padding: "0.9rem 1rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
          }}>
            <span style={{ fontSize: "1.2rem" }}>👀</span>
            <div>
              <p style={{ fontSize: "0.72rem", color: "#9ca3af", marginBottom: "0.15rem", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Preview</p>
              <p style={{ fontSize: "0.85rem", color: "#374151" }}>
                <span style={{ color: ct.accent, fontWeight: 600 }}>— {trimmed}</span>
              </p>
            </div>
          </div>
        )}

        <button
          ref={btnRef}
          type="submit"
          disabled={!canSubmit || loading}
          onClick={ripple}
          className="ripple-container btn-luxury"
          style={{
            width: "100%",
            background: canSubmit
              ? `linear-gradient(135deg, ${ct.accent}, ${ct.accent2})`
              : "rgba(0,0,0,0.06)",
            color: canSubmit ? "#ffffff" : "#9ca3af",
            border: "none",
            borderRadius: "14px",
            padding: "1rem",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: canSubmit ? "pointer" : "not-allowed",
            boxShadow: canSubmit ? `0 4px 20px ${ct.accent}35` : "none",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          {loading ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                style={{ animation: "spinSlow 1s linear infinite" }}>
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
              Creating your card...
            </>
          ) : (
            <>✨ Create My Wish Card</>
          )}
        </button>
      </form>
    </div>
  );
}
