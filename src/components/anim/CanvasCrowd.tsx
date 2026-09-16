import { useEffect, useRef } from "react";

interface Agent {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
}

const COLORS = [
  "oklch(0.72 0.19 22 / 0.5)",
  "oklch(0.76 0.15 155 / 0.5)",
  "oklch(0.68 0.17 255 / 0.5)",
  "oklch(0.55 0.045 68 / 0.45)",
];

/**
 * A canvas of small wandering dots that drift gently and lean toward the
 * cursor — a quiet crowd milling around the hero.
 */
export function CanvasCrowd({
  className = "",
  count = 130,
}: {
  className?: string;
  count?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const agents: Agent[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1 + Math.random() * 2.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", resize);

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      for (const a of agents) {
        a.vx += (Math.random() - 0.5) * 0.04;
        a.vy += (Math.random() - 0.5) * 0.04;

        const dx = pointer.x - a.x;
        const dy = pointer.y - a.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 160 && dist > 0.001) {
          a.vx += (dx / dist) * 0.015;
          a.vy += (dy / dist) * 0.015;
        }

        a.vx = Math.max(-0.6, Math.min(0.6, a.vx));
        a.vy = Math.max(-0.6, Math.min(0.6, a.vy));
        a.x += a.vx;
        a.y += a.vy;

        if (a.x < -10) a.x = width + 10;
        if (a.x > width + 10) a.x = -10;
        if (a.y < -10) a.y = height + 10;
        if (a.y > height + 10) a.y = -10;

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = a.color;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
