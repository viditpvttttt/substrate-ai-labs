import { Play } from "lucide-react";

export function MediaFeature({ src, label, title, portrait = false }: { src: string; label: string; title: string; portrait?: boolean }) {
  return (
    <article className={`media-feature group ${portrait ? "media-feature-portrait" : ""}`}>
      <video src={src} autoPlay muted loop playsInline preload="metadata" aria-label={title} />
      <div className="media-feature-overlay" />
      <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
        <span className="flex size-9 items-center justify-center rounded-full border border-contour-foreground/30 bg-contour-foreground/10 text-contour-foreground backdrop-blur-md"><Play className="size-3.5 fill-current" /></span>
        <div>
          <p className="font-mono text-[0.625rem] uppercase text-contour-foreground/70">{label}</p>
          <h3 className="mt-2 max-w-sm text-2xl text-contour-foreground sm:text-3xl">{title}</h3>
        </div>
      </div>
    </article>
  );
}