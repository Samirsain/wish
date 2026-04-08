"use client";

import { useEffect, useRef } from "react";
import { AnimationType } from "@/lib/data";

interface Props { type: AnimationType; accent: string; accent2?: string; }

function hex(h: string): [number, number, number] {
  const n = parseInt(h.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export default function AnimationCanvas({ type, accent, accent2 = "#f59e0b" }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const [r1, g1, b1] = hex(accent);
    const [r2, g2, b2] = hex(accent2);

    if (type === "particles") {
      const pts = Array.from({ length: 70 }, () => ({
        x: Math.random() * c.width, y: Math.random() * c.height,
        r: Math.random() * 2.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
        a: Math.random() * 0.5 + 0.15,
        useAccent2: Math.random() > 0.6,
      }));
      const draw = () => {
        ctx.clearRect(0, 0, c.width, c.height);
        pts.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0;
          if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0;
          const [pr, pg, pb] = p.useAccent2 ? [r2, g2, b2] : [r1, g1, b1];
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.5);
          grd.addColorStop(0, `rgba(${pr},${pg},${pb},${p.a})`);
          grd.addColorStop(1, `rgba(${pr},${pg},${pb},0)`);
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = grd; ctx.fill();
        });
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 90) {
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
              ctx.strokeStyle = `rgba(${r1},${g1},${b1},${0.12 * (1 - d / 90)})`;
              ctx.lineWidth = 0.6; ctx.stroke();
            }
          }
        }
        raf.current = requestAnimationFrame(draw);
      };
      draw();
    }

    else if (type === "sparkles") {
      const stars = Array.from({ length: 50 }, () => ({
        x: Math.random() * c.width, y: Math.random() * c.height,
        size: Math.random() * 5 + 2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        useAccent2: Math.random() > 0.5,
      }));
      const drawStar = (x: number, y: number, s: number, a: number, color: string) => {
        ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = color;
        ctx.shadowColor = color; ctx.shadowBlur = s * 3;
        ctx.translate(x, y);
        for (let i = 0; i < 4; i++) {
          ctx.rotate(Math.PI / 4);
          ctx.beginPath();
          ctx.moveTo(0, -s); ctx.lineTo(s * 0.2, -s * 0.2);
          ctx.lineTo(0, 0); ctx.lineTo(-s * 0.2, -s * 0.2);
          ctx.closePath(); ctx.fill();
        }
        ctx.restore();
      };
      const draw = () => {
        ctx.clearRect(0, 0, c.width, c.height);
        const t = Date.now() * 0.001;
        stars.forEach(s => {
          s.phase += s.speed;
          const a = (Math.sin(s.phase) + 1) / 2 * 0.8 + 0.1;
          const [pr, pg, pb] = s.useAccent2 ? [r2, g2, b2] : [r1, g1, b1];
          drawStar(s.x, s.y, s.size, a, `rgb(${pr},${pg},${pb})`);
        });
        void t;
        raf.current = requestAnimationFrame(draw);
      };
      draw();
    }

    else if (type === "fireworks") {
      interface Particle { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; r: number; useAccent2: boolean; trail: {x:number;y:number}[]; }
      const particles: Particle[] = [];
      let lastBurst = 0;

      const burst = () => {
        const cx = c.width * (0.2 + Math.random() * 0.6);
        const cy = c.height * (0.15 + Math.random() * 0.5);
        const count = 40 + Math.floor(Math.random() * 20);
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3;
          const speed = Math.random() * 3 + 1.5;
          particles.push({ x: cx, y: cy, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, maxLife: 0.7 + Math.random() * 0.5, r: Math.random() * 2.5 + 1, useAccent2: Math.random() > 0.5, trail: [] });
        }
        // center flash
        const flash = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
        flash.addColorStop(0, `rgba(${r1},${g1},${b1},0.5)`);
        flash.addColorStop(1, `rgba(${r1},${g1},${b1},0)`);
        ctx.fillStyle = flash; ctx.beginPath(); ctx.arc(cx, cy, 30, 0, Math.PI * 2); ctx.fill();
      };

      const draw = () => {
        ctx.clearRect(0, 0, c.width, c.height);
        const now = Date.now();
        if (now - lastBurst > 1400) { burst(); lastBurst = now; }

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > 5) p.trail.shift();
          p.x += p.vx; p.y += p.vy;
          p.vy += 0.06; p.vx *= 0.98; p.life -= 0.018;
          if (p.life <= 0) { particles.splice(i, 1); continue; }
          const a = p.life / p.maxLife;
          const [pr, pg, pb] = p.useAccent2 ? [r2, g2, b2] : [r1, g1, b1];
          // trail
          p.trail.forEach((pt, ti) => {
            const ta = (ti / p.trail.length) * a * 0.4;
            ctx.beginPath(); ctx.arc(pt.x, pt.y, p.r * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${pr},${pg},${pb},${ta})`; ctx.fill();
          });
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${pr},${pg},${pb},${a})`; ctx.fill();
        }
        raf.current = requestAnimationFrame(draw);
      };
      draw();
    }

    else if (type === "candles") {
      const candles = Array.from({ length: 6 }, (_, i) => ({
        x: c.width * (0.12 + i * 0.16),
        baseY: c.height * 0.72,
        h: 40 + Math.random() * 20,
        w: 10 + Math.random() * 6,
        phase: Math.random() * Math.PI * 2,
      }));

      const draw = () => {
        ctx.clearRect(0, 0, c.width, c.height);
        const t = Date.now() * 0.003;

        candles.forEach(cd => {
          // Wax body
          ctx.fillStyle = `rgba(${r1},${g1},${b1},0.12)`;
          ctx.beginPath();
          ctx.roundRect(cd.x - cd.w / 2, cd.baseY - cd.h, cd.w, cd.h, 3);
          ctx.fill();
          ctx.strokeStyle = `rgba(${r1},${g1},${b1},0.3)`;
          ctx.lineWidth = 1; ctx.stroke();

          // Floor glow
          const fg = ctx.createRadialGradient(cd.x, cd.baseY, 0, cd.x, cd.baseY, cd.w * 2.5);
          fg.addColorStop(0, `rgba(${r1},${g1},${b1},0.12)`);
          fg.addColorStop(1, `rgba(${r1},${g1},${b1},0)`);
          ctx.fillStyle = fg; ctx.beginPath(); ctx.ellipse(cd.x, cd.baseY, cd.w * 2.5, 6, 0, 0, Math.PI * 2); ctx.fill();

          // Flame flicker
          const flicker = Math.sin(t * 3 + cd.phase) * 0.15 + 1;
          const fx = cd.x + Math.sin(t * 4 + cd.phase) * 2;
          const fy = cd.baseY - cd.h - 2;
          const fh = 18 * flicker;
          const fw = 7 * flicker;

          const flameG = ctx.createRadialGradient(fx, fy, 0, fx, fy, fh * 1.2);
          flameG.addColorStop(0, `rgba(255,255,220,0.95)`);
          flameG.addColorStop(0.3, `rgba(${r1},${g1},${b1},0.8)`);
          flameG.addColorStop(0.7, `rgba(${r2},${g2},${b2},0.4)`);
          flameG.addColorStop(1, `rgba(${r2},${g2},${b2},0)`);

          ctx.beginPath();
          ctx.moveTo(fx, fy + fh);
          ctx.bezierCurveTo(fx - fw, fy + fh * 0.5, fx - fw * 0.8, fy - fh * 0.3, fx, fy - fh);
          ctx.bezierCurveTo(fx + fw * 0.8, fy - fh * 0.3, fx + fw, fy + fh * 0.5, fx, fy + fh);
          ctx.fillStyle = flameG; ctx.fill();

          // Glow halo
          const halo = ctx.createRadialGradient(fx, fy, 0, fx, fy, fw * 4);
          halo.addColorStop(0, `rgba(${r1},${g1},${b1},0.25)`);
          halo.addColorStop(1, `rgba(${r1},${g1},${b1},0)`);
          ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(fx, fy, fw * 4, 0, Math.PI * 2); ctx.fill();
        });

        raf.current = requestAnimationFrame(draw);
      };
      draw();
    }

    else if (type === "confetti") {
      interface Confetto { x: number; y: number; vx: number; vy: number; rot: number; vrot: number; w: number; h: number; useAccent2: boolean; wobble: number; wobbleSpeed: number; shape: "rect" | "ellipse"; }
      const pieces: Confetto[] = Array.from({ length: 60 }, () => ({
        x: Math.random() * c.width, y: Math.random() * c.height - c.height,
        vx: (Math.random() - 0.5) * 1.5, vy: Math.random() * 1.5 + 0.8,
        rot: Math.random() * Math.PI * 2, vrot: (Math.random() - 0.5) * 0.1,
        w: Math.random() * 10 + 6, h: Math.random() * 5 + 4,
        useAccent2: Math.random() > 0.5,
        wobble: Math.random() * Math.PI * 2, wobbleSpeed: Math.random() * 0.05 + 0.02,
        shape: Math.random() > 0.5 ? "rect" : "ellipse",
      }));

      const draw = () => {
        ctx.clearRect(0, 0, c.width, c.height);
        pieces.forEach(p => {
          p.y += p.vy; p.x += p.vx + Math.sin(p.wobble) * 0.5;
          p.rot += p.vrot; p.wobble += p.wobbleSpeed;
          if (p.y > c.height + 20) { p.y = -20; p.x = Math.random() * c.width; }
          const [pr, pg, pb] = p.useAccent2 ? [r2, g2, b2] : [r1, g1, b1];
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
          ctx.fillStyle = `rgba(${pr},${pg},${pb},0.75)`;
          if (p.shape === "ellipse") {
            ctx.beginPath(); ctx.ellipse(0, 0, p.w / 2, p.h / 2, 0, 0, Math.PI * 2); ctx.fill();
          } else {
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          }
          ctx.restore();
        });
        raf.current = requestAnimationFrame(draw);
      };
      draw();
    }

    return () => { cancelAnimationFrame(raf.current); window.removeEventListener("resize", resize); };
  }, [type, accent, accent2]);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}
