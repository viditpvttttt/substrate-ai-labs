/**
 * The new Substrate brand logos — image-based marks for each product,
 * used consistently across the header, footer, preloader and heroes.
 */
const sources = {
  substrate: "/images/logos/substrate.png",
  kernel: "/images/logos/kernel.png",
  folio: "/images/logos/folio.png",
  gridline: "/images/logos/gridline.png",
} as const;

export type BrandVariant = keyof typeof sources;

export function BrandLogo({
  variant,
  className = "",
  alt,
  wide = false,
}: {
  variant: BrandVariant;
  className?: string;
  alt?: string;
  wide?: boolean;
}) {
  return (
    <img
      src={sources[variant]}
      alt={alt ?? `Substrate ${variant} logo`}
      draggable={false}
      className={`select-none object-contain ${wide ? "w-auto" : ""} ${className}`}
    />
  );
}

export const brandWorks = ["kernel", "folio", "gridline"] as const;
