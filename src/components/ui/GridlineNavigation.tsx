import { Link } from "@tanstack/react-router";
import { FlipText } from "@/components/anim/FlipLink";

// Reuse the existing navigation items and add Gridline
const nav = [
  { to: "/kernel", label: "Kernel" },
  { to: "/void", label: "VOID" },
  { to: "/folio", label: "Folio" },
  { to: "/arcadia", label: "Arcadia" },
  { to: "/studio", label: "Studio" },
  // New Gridline entry
  { to: "/gridline", label: "Gridline" },
] as const;

/**
 * A standalone navigation component that mirrors the site header navigation
 * but includes a link to the newly created Gridline page.
 *
 * This component can be imported and used anywhere in the app, for example in a
 * sidebar, a drawer, or a dedicated header for a specific layout.
 */
export function GridlineNavigation() {
  return (
    <nav className="flex items-center gap-6 sm:gap-8">
      {nav.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground"
          activeProps={{ className: "group relative text-sm text-foreground" }}
        >
          <FlipText text={item.label} />
          <span
            className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full"
            aria-hidden="true"
          />
        </Link>
      ))}
    </nav>
  );
}

export default GridlineNavigation;
