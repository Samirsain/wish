"use client";

import { useEffect, useRef } from "react";
import { AnimationType } from "@/lib/data";

interface Props { type: AnimationType; accent: string; accent2?: string; className?: string; }

function hex(h: string): [number, number, number] {
  const n = parseInt(h.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export default function MiniAnimation({ type, accent, accent2 = "#f59e0b", className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();

    const [r1, g1, b1] = hex(accent);
    const [r2, g2, b2] = hex(accent2);

    if (type === "particles") {
      const pts = Array.from({ length: 25 }, () => ({
        x: Math.random() * c.width, y: Math.random() * c.height,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        a: Math.random() * 0.45 + 0.1, acc2: Math.random() > 0.5,
      }));
      const draw = () => {
        ctx.clearRect(0, 0, c.width, c.height);
        pts.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0;
          if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0;
          const [pr, pg, pb] = p.acc2 ? [r2, g2, b2] : [r1, g1, b1];
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${pr},${pg},${pb},${p.a})`; ctx.fill();
        });
        raf = requestAnimationFrame(draw);
      };
      draw();
    }

    else if (type === "sparkles") {
      const stars = Array.from({ length: 20 }, () => ({
        x: Math.random() * c.width, y: Math.random() * c.height,
        size: Math.random() * 3 + 1.5, phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.03 + 0.01, acc2: Math.random() > 0.5,
      }));
      const drawStar = (x: number, y: number, s: number, a: number, col: string) => {
        ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col;
        ctx.shadowColor = col; ctx.shadowBlur = s * 2;
        ctx.translate(x, y);
        for (let i = 0; i < 4; i++) {
          ctx.rotate(Math.PI / 4);
          ctx.beginPath();
          ctx.moveTo(0, -s); ctx.lineTo(s * 0.25, -s * 0.25);
          ctx.lineTo(0, 0); ctx.lineTo(-s * 0.25, -s * 0.25);
          ctx.closePath(); ctx.fill();
        }
        ctx.restore();
      };
      const draw = () => {
        ctx.clearRect(0, 0, c.width, c.height);
        stars.forEach(s => {
          s.phase += s.speed;
          const a = (Math.sin(s.phase) + 1) / 2 * 0.75 + 0.1;
          const [pr, pg, pb] = s.acc2 ? [r2, g2, b2] : [r1, g1, b1];
          drawStar(s.x, s.y, s.size, a, `rgb(${pr},${pg},${pb})`);
        });
        raf = requestAnimationFrame(draw);
      };
      draw();
    }

    else if (type === "fireworks") {
      interface P { x: number; y: number; vx: number; vy: number; life: number; r: number; acc2: boolean; }
      const particles: P[] = [];
      let lastBurst = 0;
      const burst = () => {
        const cx = c.width * (0.2 + Math.random() * 0.6);
        const cy = c.height * (0.2 + Math.random() * 0.4);
        for (let i = 0; i < 22; i++) {
          const angle = (i / 22) * Math.PI * 2;
          const speed = Math.random() * 2 + 1;
          particles.push({ x: cx, y: cy, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, r: Math.random() * 2 + 0.8, acc2: Math.random() > 0.5 });
        }
      };
      const draw = () => {
        ctx.clearRect(0, 0, c.width, c.height);
        const now = Date.now();
        if (now - lastBurst > 1600) { burst(); lastBurst = now; }
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.life -= 0.022;
          if (p.life <= 0) { particles.splice(i, 1); continue; }
          const [pr, pg, pb] = p.acc2 ? [r2, g2, b2] : [r1, g1, b1];
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${pr},${pg},${pb},${p.life})`; ctx.fill();
        }
        raf = requestAnimationFrame(draw);
      };
      draw();
    }

    else if (type === "candles") {
      const cds = Array.from({ length: 3 }, (_, i) => ({
        x: c.width * (0.25 + i * 0.25), baseY: c.height * 0.78,
        h: 22 + Math.random() * 10, w: 7 + Math.random() * 3,
        phase: Math.random() * Math.PI * 2,
      }));
      const draw = () => {
        ctx.clearRect(0, 0, c.width, c.height);
        const t = Date.now() * 0.003;
        cds.forEach(cd => {
          ctx.fillStyle = `rgba(${r1},${g1},${b1},0.1)`;
          ctx.beginPath();
          ctx.roundRect(cd.x - cd.w / 2, cd.baseY - cd.h, cd.w, cd.h, 2);
          ctx.fill();

          const flicker = Math.sin(t * 3 + cd.phase) * 0.15 + 1;
          const fx = cd.x + Math.sin(t * 4 + cd.phase) * 1.5;
          const fy = cd.baseY - cd.h - 1;
          const fh = 10 * flicker, fw = 4.5 * flicker;

          const flameG = ctx.createRadialGradient(fx, fy, 0, fx, fy, fh);
          flameG.addColorStop(0, "rgba(255,255,200,0.95)");
          flameG.addColorStop(0.4, `rgba(${r1},${g1},${b1},0.7)`);
          flameG.addColorStop(1, `rgba(${r1},${g1},${b1},0)`);

          ctx.beginPath();
          ctx.moveTo(fx, fy + fh);
          ctx.bezierCurveTo(fx - fw, fy + fh * 0.5, fx - fw * 0.8, fy - fh * 0.3, fx, fy - fh);
          ctx.bezierCurveTo(fx + fw * 0.8, fy - fh * 0.3, fx + fw, fy + fh * 0.5, fx, fy + fh);
          ctx.fillStyle = flameG; ctx.fill();
        });
        raf = requestAnimationFrame(draw);
      };
      draw();
    }

    else if (type === "confetti") {
      const pieces = Array.from({ length: 30 }, () => ({
        x: Math.random() * c.width, y: Math.random() * c.height - c.height * 0.5,
        vx: (Math.random() - 0.5) * 1.2, vy: Math.random() * 1.2 + 0.5,
        rot: Math.random() * Math.PI * 2, vrot: (Math.random() - 0.5) * 0.08,
        w: Math.random() * 7 + 4, h: Math.random() * 4 + 3,
        acc2: Math.random() > 0.5, wobble: Math.random() * Math.PI * 2, ws: 0.03,
      }));
      const draw = () => {
        ctx.clearRect(0, 0, c.width, c.height);
        pieces.forEach(p => {
          p.y += p.vy; p.x += p.vx + Math.sin(p.wobble) * 0.4;
          p.rot += p.vrot; p.wobble += p.ws;
          if (p.y > c.height + 10) { p.y = -10; p.x = Math.random() * c.width; }
          const [pr, pg, pb] = p.acc2 ? [r2, g2, b2] : [r1, g1, b1];
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
          ctx.fillStyle = `rgba(${pr},${pg},${pb},0.7)`;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        });
        raf = requestAnimationFrame(draw);
      };
      draw();
    }

    return () => cancelAnimationFrame(raf);
  }, [type, accent, accent2]);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}
