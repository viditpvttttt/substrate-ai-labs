/**
 * A small cluster of soft, irregular organic shapes — a hand-drawn
 * counterpart to OrbField's perfect spheres. Static and lightweight (no
 * canvas, no animation loop) so it is cheap to drop into any section that
 * wants a bit of illustrated warmth, like Folio's "one surface" story.
 */
export function BlobCluster({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 320"
      className={className}
      role="img"
      aria-label="Cluster of soft organic shapes"
    >
      <path
        d="M96 46
           C 150 22, 206 34, 214 78
           C 220 110, 190 118, 196 146
           C 202 176, 168 178, 140 194
           C 104 214, 54 206, 40 168
           C 28 136, 52 128, 46 96
           C 41 66, 58 62, 96 46 Z"
        fill="var(--foreground)"
        opacity="0.92"
      />
      <circle cx="108" cy="150" r="26" fill="var(--spectral-g)" />

      <path
        d="M300 40
           C 320 32, 336 48, 334 76
           C 332 104, 340 128, 322 140
           C 304 152, 288 132, 290 104
           C 292 78, 280 48, 300 40 Z"
        fill="var(--spectral-b)"
      />

      <ellipse cx="330" cy="220" rx="52" ry="42" fill="var(--spectral-r)" />
    </svg>
  );
}
