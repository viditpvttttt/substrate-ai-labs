import type { BrandVariant } from "@/components/BrandLogo";

export interface WorkMilestone {
  date: string;
  title: string;
  body: string;
}

export interface Work {
  slug: string;
  name: string;
  badge: string;
  status: string;
  logo: BrandVariant;
  colors: { a: string; b: string; c: string };
  hero: string;
  lede: string;
  problem: string;
  approach: string;
  specs: { k: string; v: string }[];
  milestones: WorkMilestone[];
  stats: { value: string; label: string }[];
  gallery: { title: string; caption: string }[];
  quote: { text: string; by: string };
}

export const works: Work[] = [
  {
    slug: "kernel",
    name: "Kernel",
    badge: "Model",
    status: "In training",
    logo: "kernel",
    colors: { a: "#d99a4a", b: "#8f5f2d", c: "#30251b" },
    hero: "One model, every modality",
    lede:
      "Kernel is the multimodal LLM chatbot underneath everything Substrate builds: one conversation across text, images, audio and video — one attention pass instead of a stack of adapters.",
    problem:
      "Most multimodal systems are a language model wearing adapters: each modality is translated into text-shaped tokens, and the translation losses compound. Meaning that lives in a waveform's timing or a video's motion never survives the trip through the translator.",
    approach:
      "Kernel projects every modality into one continuous space and attends over it directly. A frame of video, a sentence and a waveform sit next to each other in a single pass — so cross-modal reasoning is the default, not a pipeline stage bolted on afterwards. The weights are trained to run locally first; remote compute is an option you flip on, not a default you opt out of.",
    specs: [
      { k: "Shape", v: "Dense decoder with a shared multimodal encoder" },
      { k: "Context", v: "Long-context window, unified across modalities" },
      { k: "Inference", v: "Local first, remote compute as an option" },
      { k: "Interfaces", v: "Native runtime, HTTP API, Gridline integration" },
      { k: "Tooling", v: "Structured output, tool calls, streaming" },
      { k: "Status", v: "In training — research preview with partners" },
    ],
    milestones: [
      {
        date: "2025",
        title: "Shared encoder",
        body: "First training run proving a single encoder could hold text, vision and audio without adapter loss.",
      },
      {
        date: "2026 Q1",
        title: "Video joins the lattice",
        body: "Temporal frames projected into the same space — motion becomes addressable context.",
      },
      {
        date: "2026 Q2",
        title: "Local-first quantisation",
        body: "The runtime tuned until the full stack runs on a laptop without a round trip.",
      },
      {
        date: "Next",
        title: "Research preview",
        body: "Partner access opens with reproducible evaluation suites — measured, not claimed.",
      },
    ],
    stats: [
      { value: "4", label: "Modalities, one context" },
      { value: "1", label: "Attention pass" },
      { value: "128k", label: "Token window" },
      { value: "0", label: "Translators" },
    ],
    gallery: [
      { title: "Cross-modal manifold", caption: "Unified latent coordinates across every modality." },
      { title: "Lattice topology", caption: "How symbols, frames and waves neighbour each other." },
      { title: "Evaluation harness", caption: "Balance over benchmark spikes — the full suite, reproducible." },
    ],
    quote: {
      text: "The adapter stack was hiding the problem. One space makes it obvious what the model actually sees.",
      by: "Research note — Substrate",
    },
  },
  {
    slug: "folio",
    name: "Folio",
    badge: "App",
    status: "Private beta",
    logo: "folio",
    colors: { a: "#c8b27c", b: "#665638", c: "#29251c" },
    hero: "The quiet operating surface for your day",
    lede:
      "Folio is one canvas that already knows the shape of your morning: weather, news, files, calendar, memory — and an assistant that can act on all of it in one sentence.",
    problem:
      "Your day is scattered across five tabs and three apps that do not talk to each other. The weather lives in one place, your files in another, your assistant in a chat window that forgets everything by design. Every surface wants engagement; none of them want to hand you the morning and get out of the way.",
    approach:
      "Folio starts as a dashboard — the weather you will actually walk through, the topics you chose, what your calendar is about to ask. Ask it something and the same surface becomes an assistant with your memory already loaded; hand it a repository or a research question and it becomes an agent that shows its plan before it runs. Memory is a list you can read and delete line by line, and every synthesised answer keeps the links it came from.",
    specs: [
      { k: "Shape", v: "Dashboard, assistant and agent runner in one app" },
      { k: "Modes", v: "Home, Work, Workbench, Research" },
      { k: "Sources", v: "Live browsing with citations on every claim" },
      { k: "Memory", v: "Readable, editable, deletable — never a shadow profile" },
      { k: "Platform", v: "macOS first, Windows next" },
      { k: "Status", v: "Private beta — waitlist open" },
    ],
    milestones: [
      {
        date: "2025",
        title: "Home canvas",
        body: "Weather, news and calendar composed on one quiet surface.",
      },
      {
        date: "2026 Q1",
        title: "Memory, in the open",
        body: "Memory shipped as a readable list — every line editable, deletable, explainable.",
      },
      {
        date: "2026 Q2",
        title: "Workbench & Work mode",
        body: "A real editor and meeting prep, powered by the same context as Home.",
      },
      {
        date: "Next",
        title: "Deep research",
        body: "Multi-source synthesis with citations kept on every claim — closing the beta.",
      },
    ],
    stats: [
      { value: "6", label: "Things, done unusually well" },
      { value: "1", label: "Canvas instead of five tabs" },
      { value: "100%", label: "Memory you can read" },
      { value: "0", label: "Shadow profiles" },
    ],
    gallery: [
      { title: "The morning canvas", caption: "Weather, topics and calendar on arrival." },
      { title: "Workbench", caption: "Your files with an AI pair that reads and writes in place." },
      { title: "Agent runner", caption: "Plans shown before they run — every step in the open." },
    ],
    quote: {
      text: "It starts as a dashboard. It ends up being the surface you actually live on.",
      by: "Design note — Substrate",
    },
  },
  {
    slug: "gridline",
    name: "Gridline",
    badge: "Editor",
    status: "Public beta",
    logo: "gridline",
    colors: { a: "#5a9bd5", b: "#2e6a9a", c: "#1a354e" },
    hero: "Your coding agent for ambitious software",
    lede:
      "Gridline is a coding agent that plans, asks clarifying questions, edits across files, and proves its work with artifacts — in the editor, the terminal, and everywhere your team already works.",
    problem:
      "Autocomplete finishes your lines; it does not finish your intent. Real work is multi-file, multi-day and full of decisions — and the tools that help with it either stay stuck in a chat window or ship diffs nobody can review. The gap between 'it generated something' and 'it shipped, verified' is where projects die.",
    approach:
      "Gridline treats the repository as a live, indexable lattice: every symbol, dependency and test is addressable context. Agents draft a plan in a PRD you can read, ask the clarifying questions that matter, then edit across files in place — with diffs small enough to walk line by line and a verification loop that runs the suite before anything merges. Automations keep the whole thing running while you sleep.",
    specs: [
      { k: "Shape", v: "Agent-first code editor with inline assistance" },
      { k: "Engine", v: "Kernel-native — local-first inference by default" },
      { k: "Languages", v: "TypeScript, Python, Rust, Go, and more" },
      { k: "Surfaces", v: "Editor, terminal, Slack, GitHub — one memory" },
      { k: "Automations", v: "Always-on agents on schedules and triggers" },
      { k: "Status", v: "Public beta — free during beta" },
    ],
    milestones: [
      {
        date: "2026 May",
        title: "Public beta",
        body: "Completions, agent editing, and terminal-native verification ship together.",
      },
      {
        date: "2026 Jun",
        title: "Multi-file ghost diffs",
        body: "Walk an agent's diff set line by line before a single byte is written.",
      },
      {
        date: "2026 Jul",
        title: "Local AST indexing",
        body: "Whole-repo context builds in milliseconds and stays on your device.",
      },
      {
        date: "Next",
        title: "Agent fleets",
        body: "Parallel agents sharing one memory, reporting to a single review queue.",
      },
    ],
    stats: [
      { value: "40+", label: "Languages, one grammar" },
      { value: "50ms", label: "Median completion latency" },
      { value: "18/18", label: "Specs verified before merge" },
      { value: "0", label: "Data sent to third parties" },
    ],
    gallery: [
      { title: "The plan window", caption: "A PRD drafted by the agent, questions included." },
      { title: "Reviewable diffs", caption: "Every change small enough to walk line by line." },
      { title: "Automations", caption: "Always-on agents on schedules and triggers." },
    ],
    quote: {
      text: "The agent asks before it builds. That one habit changes everything about trusting it.",
      by: "Beta note — Substrate",
    },
  },
];

export function getWork(slug: string) {
  return works.find((w) => w.slug === slug);
}
