"use client";

import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import React, { useState } from "react";

/**
 * skiper80 — Projects Showcase (recreated from Skiper UI Pro).
 * Portfolio gallery with hover interactions and expandable detail views.
 */

type Project = {
  id: string;
  name: string;
  description: string;
  badge: string;
  url?: string;
};

const defaultProjects: Project[] = [
  { id: "kernel", name: "Kernel", description: "One multimodal model across text, vision, audio and video.", badge: "Model" },
  { id: "folio", name: "Folio", description: "The quiet operating surface for your day — dashboard, assistant and agent runner.", badge: "App" },
  { id: "gridline", name: "Gridline", description: "A coding agent with intelligent completions, multi-file editing and automations.", badge: "Editor" },
];

function Skiper80({ projects = defaultProjects }: { projects?: Project[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const active = projects.find((p) => p.id === expanded);

  return (
    <div className="w-full">
      <div className="flex flex-col">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="border-b border-border"
          >
            <button
              onClick={() => setExpanded(expanded === project.id ? null : project.id)}
              className="group flex w-full items-center justify-between py-6 text-left transition-colors hover:bg-card/40"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-2xl font-medium text-foreground transition-transform group-hover:translate-x-2 sm:text-4xl">
                  {project.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground sm:inline">
                  {project.badge}
                </span>
                <motion.div
                  animate={{ rotate: expanded === project.id ? 45 : 0 }}
                  className="text-muted-foreground"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </motion.div>
              </div>
            </button>

            <AnimatePresence>
              {expanded === project.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pl-8 pr-4">
                    <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    {project.url && (
                      <a
                        href={project.url}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                      >
                        Learn more →
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export { Skiper80 };
export type { Project };
