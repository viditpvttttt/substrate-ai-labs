type Props = {
  variant: "kernel" | "void" | "folio" | "substrate" | "arcadia" | "gridline";
  className?: string;
  alt?: string;
};

/**
 * Marks & logos for Substrate, Kernel, VOID, Folio, Arcadia and Gridline —
 * the site-wide visual identity. All marks are inline SVG drawn with
 * currentColor plus the spectral accent, so they rest on any surface.
 */
export function SpectralMark({ variant, className = "", alt }: Props) {
  if (variant === "kernel") {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={alt || "Kernel mark: a serif K on a beige card"}
        className={className}
      >
        <rect
          x="5"
          y="5"
          width="90"
          height="90"
          rx="20"
          fill="#EDE5D3"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
        <text
          x="50"
          y="52"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight="600"
          fontSize="44"
          fill="currentColor"
        >
          K
        </text>
      </svg>
    );
  }

  if (variant === "void") {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={alt || "VOID mark: two gradient pills on a white card"}
        className={className}
      >
        <defs>
          <linearGradient id="void-pill-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#805AD5" />
            <stop offset="100%" stopColor="#3182CE" />
          </linearGradient>
        </defs>
        <rect
          x="5"
          y="5"
          width="90"
          height="90"
          rx="20"
          fill="#FFFFFF"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />
        <rect x="31" y="24" width="13" height="52" rx="6.5" fill="url(#void-pill-grad)" />
        <rect
          x="56"
          y="24"
          width="13"
          height="52"
          rx="6.5"
          fill="url(#void-pill-grad)"
          opacity="0.55"
        />
      </svg>
    );
  }

  if (variant === "folio") {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={alt || "Folio mark: a soft arch on a light disc"}
        className={className}
      >
        <defs>
          <linearGradient id="folio-arch-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3182CE" />
            <stop offset="50%" stopColor="#805AD5" />
            <stop offset="100%" stopColor="#ED64A6" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="#FBF8F1"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />
        <path
          d="M24 68 A 26 26 0 0 1 76 68"
          stroke="url(#folio-arch-grad)"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  if (variant === "arcadia") {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={alt || "Arcadia mark: a target of concentric rings"}
        className={className}
      >
        <circle cx="50" cy="50" r="43" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="29" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="15" stroke="var(--spectral-b, #3182CE)" strokeWidth="2" />
        <circle cx="50" cy="50" r="5.5" fill="var(--spectral-b, #3182CE)" />
        <path
          d="M50 4 L50 12 M50 88 L50 96 M4 50 L12 50 M88 50 L96 50"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (variant === "gridline") {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={alt || "Gridline mark: a continuous path on a dotted grid"}
        className={className}
      >
        <rect x="6" y="6" width="88" height="88" rx="16" stroke="currentColor" strokeWidth="2" />
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 5 }).map((_, c) => (
            <circle
              key={`${r}-${c}`}
              cx={22 + c * 14}
              cy={22 + r * 14}
              r="1.1"
              fill="currentColor"
              opacity="0.3"
            />
          )),
        )}
        <path
          d="M18 62 C 26 32, 40 30, 48 50 C 56 70, 68 68, 82 38"
          stroke="var(--spectral-b, #3182CE)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={alt || "Substrate mark: layered strata"}
      className={className}
    >
      <path
        d="M12 34 C 34 26, 66 42, 88 34"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M12 52 C 36 60, 64 44, 88 52"
        stroke="var(--spectral-b, #3182CE)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M12 70 C 34 62, 66 78, 88 70"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
