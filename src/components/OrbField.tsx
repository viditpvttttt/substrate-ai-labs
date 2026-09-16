import { useEffect, useRef } from "react";

type Orb = {
  x: number;
  y: number;
  z: number;
  r: number;
  color: [string, string];
  phase: number;
};

const ORBS: Orb[] = [
  { x: -1.1, y: -0.3, z: 0.2, r: 1.15, color: ["#d99a4a", "#8f5f2d"], phase: 0 },
  { x: 0.9, y: -0.9, z: -0.5, r: 0.72, color: ["#9b9b92", "#4b4b46"], phase: 1.2 },
  { x: 1.15, y: 0.75, z: 0.4, r: 0.6, color: ["#c8b27c", "#765a32"], phase: 2.4 },
  { x: -0.35, y: 0.95, z: 0.7, r: 0.45, color: ["#b8b5aa", "#68665e"], phase: 3.6 },
  { x: 0.15, y: 0.1, z: 1.1, r: 0.3, color: ["#f0c477", "#b87329"], phase: 4.8 },
];

export function OrbField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const move = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.current.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const leave = () => {
      pointer.current.tx = 0;
      pointer.current.ty = 0;
    };
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);

    const draw = (t: number) => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const p = pointer.current;
      p.x += (p.tx - p.x) * 0.06;
      p.y += (p.ty - p.y) * 0.06;

      const scale = Math.min(w, h) / 4.6;
      const list = ORBS.map((o) => {
        const bob = Math.sin(t / 2600 + o.phase) * 0.14;
        const z = o.z + Math.cos(t / 3400 + o.phase) * 0.18;
        const persp = 3.4 / (3.4 - z);
        return {
          o,
          z,
          cx: w / 2 + (o.x + p.x * 0.28 * (1 + z)) * scale * persp,
          cy: h / 2 + (o.y + bob + p.y * 0.28 * (1 + z)) * scale * persp,
          rad: o.r * scale * persp * 0.62,
        };
      }).sort((a, b) => a.z - b.z);

      for (const item of list) {
        const { cx, cy, rad, o } = item;
        const g = ctx.createRadialGradient(cx - rad * 0.35, cy - rad * 0.4, rad * 0.1, cx, cy, rad);
        g.addColorStop(0, o.color[0]);
        g.addColorStop(1, o.color[1]);
        ctx.globalAlpha = 0.92;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        ctx.globalAlpha = 0.22;
        ctx.beginPath();
        ctx.ellipse(cx - rad * 0.32, cy - rad * 0.42, rad * 0.34, rad * 0.2, -0.6, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full touch-none ${className}`}
      role="img"
      aria-label="Interactive field of soft three-dimensional orbs that follow the pointer"
    />
  );
}
