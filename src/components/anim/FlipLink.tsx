/**
 * Hover text that rolls upward letter by letter, revealing a second copy.
 * Purely CSS-driven; the parent needs the `group` class (or pass ownHover).
 */
export function FlipText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`relative inline-block overflow-hidden align-bottom ${className}`}>
      <span className="flex">
        {text.split("").map((ch, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
            style={{ transitionDelay: `${i * 18}ms` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
      <span className="absolute inset-0 flex" aria-hidden="true">
        {text.split("").map((ch, i) => (
          <span
            key={i}
            className="inline-block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
            style={{ transitionDelay: `${i * 18}ms` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
    </span>
  );
}
