"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number; // 0 = bone, 1 = gold
};

/**
 * Ambient cinematic atmosphere:
 *  - slow drifting embers / dust motes rising through darkness
 *  - soft smoke blooms that swell and dissolve
 * Lightweight canvas, DPR-aware, pauses for reduced-motion.
 */
export default function MistCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // ---- Embers / dust motes ----
    const count = Math.min(90, Math.floor((w * h) / 16000));
    const particles: Particle[] = [];
    const spawn = (initial = false): Particle => {
      const maxLife = 6 + Math.random() * 10;
      return {
        x: Math.random() * w,
        y: initial ? Math.random() * h : h + 20,
        r: 0.5 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -(0.15 + Math.random() * 0.5),
        life: initial ? Math.random() * maxLife : 0,
        maxLife,
        hue: Math.random() < 0.32 ? 1 : 0,
      };
    };
    for (let i = 0; i < count; i++) particles.push(spawn(true));

    // ---- Smoke blooms ----
    type Smoke = { x: number; y: number; r: number; t: number; dur: number };
    const smokes: Smoke[] = [];
    const spawnSmoke = (): Smoke => ({
      x: w * (0.2 + Math.random() * 0.6),
      y: h * (0.55 + Math.random() * 0.5),
      r: 120 + Math.random() * 220,
      t: 0,
      dur: 9 + Math.random() * 7,
    });
    for (let i = 0; i < 5; i++) {
      const s = spawnSmoke();
      s.t = Math.random() * s.dur;
      smokes.push(s);
    }

    let last = performance.now();
    let raf = 0;

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      ctx.clearRect(0, 0, w, h);

      // smoke (additive, very soft)
      ctx.globalCompositeOperation = "lighter";
      for (const s of smokes) {
        s.t += dt;
        if (s.t > s.dur) Object.assign(s, spawnSmoke());
        const p = s.t / s.dur;
        const fade = Math.sin(p * Math.PI); // ease in/out
        const r = s.r * (0.6 + p * 0.8);
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r);
        g.addColorStop(0, `rgba(60,52,40,${0.05 * fade})`);
        g.addColorStop(0.5, `rgba(30,26,22,${0.03 * fade})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // embers
      for (const pt of particles) {
        pt.life += dt;
        if (pt.life > pt.maxLife || pt.y < -20) {
          Object.assign(pt, spawn(false));
        }
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vx += (Math.random() - 0.5) * 0.01; // gentle wander

        const lp = pt.life / pt.maxLife;
        const alpha = Math.sin(lp * Math.PI) * 0.7;
        const color =
          pt.hue === 1
            ? `rgba(216,183,119,${alpha})`
            : `rgba(236,230,216,${alpha * 0.8})`;
        const glow = ctx.createRadialGradient(
          pt.x,
          pt.y,
          0,
          pt.x,
          pt.y,
          pt.r * 4
        );
        glow.addColorStop(0, color);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      raf = requestAnimationFrame(draw);
    };

    if (!reduce) {
      raf = requestAnimationFrame(draw);
    } else {
      // single static frame
      draw(performance.now());
      cancelAnimationFrame(raf);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
