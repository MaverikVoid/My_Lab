export interface Essay {
  slug: string;
  title: string;
  category: "Scientific ML" | "Optimization" | "Mathematics" | "Research" | "Philosophy" | "Agentic AI";
  date: string;
  readTime: string;
  summary: string;
  content: string; // Markdown styled content
}

export const essays: Essay[] = [
  {
    slug: "why-pinns-fail",
    title: "Why PINNs Fail on Stiff PDEs",
    category: "Scientific ML",
    date: "2026-06",
    readTime: "Coming soon",
    summary: "Currently working on this topic.",
    content: "Currently working on this topic. Coming soon."
  },
  {
    slug: "residual-geometry",
    title: "Understanding PDE Residual Geometry",
    category: "Scientific ML",
    date: "2026-06",
    readTime: "Coming soon",
    summary: "Currently working on this topic.",
    content: "Currently working on this topic. Coming soon."
  },
  {
    slug: "optimization-beyond-adam",
    title: "Optimization Beyond Adam",
    category: "Optimization",
    date: "2026-06",
    readTime: "Coming soon",
    summary: "Currently working on this topic.",
    content: "Currently working on this topic. Coming soon."
  },
  {
    slug: "scientific-foundation-notes",
    title: "Notes on Scientific Foundation Models",
    category: "Scientific ML",
    date: "2026-06",
    readTime: "Coming soon",
    summary: "Currently working on this topic.",
    content: "Currently working on this topic. Coming soon."
  },
  {
    slug: "research-diary-notes",
    title: "Research Diary Notes",
    category: "Research",
    date: "2026-06",
    readTime: "Coming soon",
    summary: "Currently working on this topic.",
    content: "Currently working on this topic. Coming soon."
  },
  {
    slug: "paper-reviews",
    title: "Paper Reviews",
    category: "Research",
    date: "2026-06",
    readTime: "Coming soon",
    summary: "Currently working on this topic.",
    content: "Currently working on this topic. Coming soon."
  },
  {
    slug: "failure-analysis",
    title: "Failure Analysis",
    category: "Research",
    date: "2026-06",
    readTime: "Coming soon",
    summary: "Currently working on this topic.",
    content: "Currently working on this topic. Coming soon."
  }
];
