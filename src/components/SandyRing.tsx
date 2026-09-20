import { useEffect, useRef } from "react";

/**
 * Stripe-inspired "sandy orbit" — thousands of fine sand-toned grains
 * streaming around a wide elliptical ring, with a rare spectral shimmer
 * mixed into the grain. Pure canvas 2D, pointer-parallaxed, cheap.
 */

type Grain = {
  angle: number;
  rf: number; // ring radius factor (jitter)
  tube: number; // offset around the tube cross-section (-1..1)
  speed: number; // radians per second
  size: number;
  alpha: number;
  color: string;
  shimmer: number;
  spark: boolean;
};

const SAND = ["#c98d4e", "#e3b077", "#8f5f2d", "#f0c477", "#b8875b", "#6b4a2c", "#f6dcb0"];
const SPARKS = ["#ff9f60", "#a55cff", "#6085ff", "#ff00ea"];

const COUNT = 3200;

export function SandyRing({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;

    const rand = (() => {
      let s = 42;
      return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
    })();

    const grains: Grain[] = Array.from({ length: COUNT }, () => {
      const spark = rand() < 0.07;
      return {
        angle: rand() * Math.PI * 2,
        rf: 0.78 + rand() * 0.3,
        tube: rand() * 2 - 1,
        speed: (0.05 + rand() * 0.16) * (rand() < 0.5 ? 1 : 1), // one direction, varied pace
        size: spark ? 1.6 + rand() * 1.8 : 0.5 + rand() * 1.3,
        alpha: 0.18 + rand() * 0.6,
        color: spark
          ? SPARKS[(rand() * SPARKS.length) | 0] ?? SPARKS[0]!
          : SAND[(rand() * SAND.length) | 0] ?? SAND[0]!,
        shimmer: rand() * Math.PI * 2,
        spark,
      };
    });

    // Pre-rendered sandy haze behind the ring (drawn once, blazed cheaply).
    let haze: HTMLCanvasElement | null = null;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      haze = document.createElement("canvas");
      haze.width = rect.width;
      haze.height = rect.height;
      const hctx = haze.getContext("2d");
      if (hctx) {
        const w = rect.width;
        const h = rect.height;
        const g = hctx.createRadialGradient(w / 2, h * 0.52, 10, w / 2, h * 0.52, Math.min(w, h) * 0.46);
        g.addColorStop(0, "rgba(240, 196, 119, 0.30)");
        g.addColorStop(0.55, "rgba(227, 176, 119, 0.16)");
        g.addColorStop(1, "rgba(227, 176, 119, 0)");
        hctx.fillStyle = g;
        hctx.fillRect(0, 0, w, h);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const move = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const leave = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
    };
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);

    const draw = (ms: number) => {
      const t = ms / 1000;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      if (haze) ctx.drawImage(haze, 0, 0, w, h);

      const cx = w / 2 + pointer.current.x * 8;
      const cy = h * 0.52 + pointer.current.y * 6;
      const R = Math.min(w, h) * 0.36;
      const tilt = 0.36 + pointer.current.y * 0.05; // ring inclination
      const cosA = Math.cos(tilt);
      const sinA = Math.sin(tilt);

      for (const g of grains) {
        const th = g.angle + t * g.speed * (1.25 - g.rf * 0.35);
        const r = R * g.rf;
        const x3 = Math.cos(th) * r;
        const z3 = Math.sin(th) * r;
        const y3 = g.tube * R * 0.05 + Math.sin(th * 2 + g.shimmer) * R * 0.012;

        // Tilt about the X axis, then a mild perspective.
        const y2 = y3 * cosA - z3 * sinA;
        const z2 = y3 * sinA + z3 * cosA;
        const persp = 1 + z2 / (R * 3.2);

        const shimmer = 0.72 + 0.28 * Math.sin(t * 1.7 + g.shimmer);
        const depth = 0.55 + 0.45 * (z2 / (R * g.rf));
        const a = g.alpha * shimmer * depth;
        if (a < 0.02) continue;

        ctx.globalAlpha = a;
        if (g.spark) {
          ctx.fillStyle = g.color;
          ctx.beginPath();
          ctx.arc(cx + x3 * persp, cy + y2 * persp, g.size * persp * 1.15, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = a * 0.35;
          ctx.beginPath();
          ctx.arc(cx + x3 * persp, cy + y2 * persp, g.size * persp * 3.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = g.color;
          ctx.fillRect(cx + x3 * persp, cy + y2 * persp, g.size * persp, g.size * persp);
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div className={`sandy-ring ${className}`} role="img" aria-label="A ring of fine sandy particles orbiting slowly, streaked with spectral colour">
      <div className="sandy-ring-haze" aria-hidden="true" />
      <canvas ref={canvasRef} />
    </div>
  );
}
