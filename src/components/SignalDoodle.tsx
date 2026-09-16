/**
 * A single winding contour, sketched rather than engineered — a quiet nod
 * to the fact that behind every clean diagram on this site is a lot of
 * loose, hand-drawn thinking first. Used as a light divider or accent, never
 * as the main graphic on a section.
 */
export function SignalDoodle({
  className = "",
  "aria-hidden": ariaHidden,
}: {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}) {
  return (
    <svg
      viewBox="0 0 640 160"
      className={className}
      role={ariaHidden ? undefined : "img"}
      aria-hidden={ariaHidden}
      aria-label={ariaHidden ? undefined : "A winding hand-drawn line"}
      fill="none"
    >
      <path
        d="M8 90
           C 40 40, 78 30, 108 58
           C 132 80, 118 110, 90 118
           C 66 125, 60 100, 82 92
           C 102 85, 116 100, 104 116
           C 90 134, 132 140, 160 112
           C 196 76, 210 40, 256 42
           C 300 44, 296 84, 258 96
           C 226 106, 224 70, 260 66
           C 320 60, 350 96, 402 90
           C 450 84, 468 44, 516 46
           C 566 48, 596 78, 632 66"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
    </svg>
  );
}
