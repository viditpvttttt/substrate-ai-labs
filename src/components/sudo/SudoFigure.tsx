/**
 * Sudo — the studio mascot. Line-art illustrations on white, blended into
 * the site's cream canvas, drifting gently as if breathing.
 */
export function SudoFigure({
  src,
  alt,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={`sudo-figure ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="h-auto w-full object-contain mix-blend-multiply" />
      {caption && (
        <figcaption className="rule-label mt-4 text-center tracking-[0.18em]">{caption}</figcaption>
      )}
    </figure>
  );
}

export const sudo = {
  multitask: { src: "/images/sudo/sudo-multitask.png", alt: "Sudo, the Substrate mascot, juggling documents and interface windows" },
  security: { src: "/images/sudo/sudo-security.png", alt: "Sudo turning a giant key inside a shield" },
  research: { src: "/images/sudo/sudo-research.png", alt: "Sudo examining documents through a magnifying glass" },
  deploy: { src: "/images/sudo/sudo-deploy.png", alt: "Sudo launching a rocket from a server rack" },
  success: { src: "/images/sudo/sudo-success.png", alt: "Sudo celebrating beside a large checkmark badge" },
  cookies: { src: "/images/sudo/sudo-cookies.png", alt: "Sudo adjusting privacy toggles on a giant cookie" },
  lost: { src: "/images/sudo/sudo-404.png", alt: "Sudo studying a signpost with a magnifying glass" },
} as const;
