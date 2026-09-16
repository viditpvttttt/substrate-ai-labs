"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * skiper56 — VanishForm (recreated from Skiper UI Pro).
 * Text input with a canvas-based particle system that disintegrates
 * text into animated particles when submitted.
 */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  char: string;
};

function VanishForm({
  placeholder = "yo@gxuri.me",
  onChange,
  onSubmit,
  className = "",
}: {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}) {
  const [value, setValue] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim() || isAnimating) return;

    const canvas = canvasRef.current;
    const input = inputRef.current;
    if (!canvas || !input) return;

    const rect = input.getBoundingClientRect();
    const parentRect = canvas.parentElement?.getBoundingClientRect();
    if (!parentRect) return;

    canvas.width = parentRect.width;
    canvas.height = parentRect.height;
    canvas.style.width = `${parentRect.width}px`;
    canvas.style.height = `${parentRect.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const inputRect = input.getBoundingClientRect();
    const offsetX = inputRect.left - parentRect.left;
    const offsetY = inputRect.top - parentRect.top;

    // Render text to an offscreen canvas to extract pixel data
    const off = document.createElement("canvas");
    off.width = parentRect.width;
    off.height = parentRect.height;
    const offCtx = off.getContext("2d");
    if (!offCtx) return;

    offCtx.font = `${parseFloat(getComputedStyle(input).fontSize)}px ${getComputedStyle(input).fontFamily}`;
    offCtx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--foreground") || "#1a1a1a";
    offCtx.textBaseline = "middle";
    offCtx.fillText(value, offsetX + 16, offsetY + rect.height / 2);

    const imageData = offCtx.getImageData(0, 0, off.width, off.height);
    const data = imageData.data;

    particlesRef.current = [];
    const step = 4;
    for (let y = 0; y < off.height; y += step) {
      for (let x = 0; x < off.width; x += step) {
        const i = (y * off.width + x) * 4;
        if (data[i + 3] > 128) {
          particlesRef.current.push({
            x: x + (Math.random() - 0.5) * 2,
            y: y + (Math.random() - 0.5) * 2,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.8) * 8,
            alpha: 1,
            char: "",
          });
        }
      }
    }

    setIsAnimating(true);
    setValue("");

    const start = performance.now();
    const duration = 1200;

    const animate = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.alpha = 1 - progress;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--foreground") || "#1a1a1a";
        ctx.fillRect(p.x, p.y, 2, 2);
      }
      ctx.globalAlpha = 1;

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    onSubmit?.(e);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative w-full max-w-md", className)}
    >
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onChange?.(e);
          }}
          placeholder={placeholder}
          disabled={isAnimating}
          className="w-full rounded-xl border border-border bg-card/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
        />
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0"
        />
      </div>
    </form>
  );
}

export { VanishForm };
