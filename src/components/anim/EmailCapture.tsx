import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

/**
 * A sign-in style email field: gradient ring wakes on focus, and the
 * submit arrow morphs into a check once the mail client opens.
 */
export function EmailCapture({ subject = "Hello Substrate" }: { subject?: string }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <form
      className="mx-auto flex max-w-md items-center gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = `mailto:hello@substrate.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Reach me at ${email}`)}`;
        setSent(true);
        setTimeout(() => setSent(false), 2500);
      }}
    >
      <motion.div
        className="relative flex-1 rounded-full"
        animate={{
          boxShadow: focused
            ? "0 0 0 1.5px color-mix(in oklab, var(--spectral-b) 55%, transparent), 0 8px 30px -12px color-mix(in oklab, var(--spectral-b) 40%, transparent)"
            : "0 0 0 1px var(--border)",
        }}
        transition={{ duration: 0.3 }}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="you@work.dev"
          className="w-full rounded-full bg-card/70 px-6 py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
        />
      </motion.div>
      <motion.button
        type="submit"
        whileTap={{ scale: 0.94 }}
        className="btn-shine relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
        aria-label="Get in touch"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={sent ? "check" : "arrow"}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {sent ? "✓" : "→"}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </form>
  );
}
