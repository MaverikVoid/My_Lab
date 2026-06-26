"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Code, BookOpen, ExternalLink, ChevronDown, ChevronUp, Layers } from "lucide-react";
import { ResearchProject } from "@/content/research";

interface ResearchCardProps {
  project: ResearchProject;
}

export default function ResearchCard({ project }: ResearchCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-border-dim rounded-lg bg-card-bg p-6 transition-all duration-300 hover:border-text-muted/40" data-cursor="explore">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        {/* Card Header info */}
        <div className="space-y-2 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-wider bg-badge-bg px-2 py-0.5 rounded text-text-muted">
              {project.category}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted">
              {project.date}
            </span>
          </div>

          <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            {project.title}
          </h3>
          
          <p className="text-sm font-serif italic text-text-muted">
            {project.subtitle}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag, i) => (
              <span key={i} className="font-mono text-[8px] tracking-wide text-text-muted bg-badge-bg/40 px-2 py-0.5 rounded">
                #{tag.toLowerCase()}
              </span>
            ))}
          </div>
        </div>

        {/* Abstract/Read Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          data-cursor="button"
          className="self-start flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider text-sci-blue hover:text-sci-blue-hover border border-border-dim hover:border-sci-blue px-3 py-1.5 rounded transition-all cursor-pointer bg-transparent"
        >
          <span>{isExpanded ? "Close Publication" : "Examine Paper"}</span>
          {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>
      </div>

      {/* Main Abstract/Problem Sneak Peek */}
      {!isExpanded && (
        <div className="mt-4 border-t border-border-dim/40 pt-4">
          <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted block mb-1">
            Problem Summary
          </span>
          <p className="text-xs leading-relaxed text-foreground/80 line-clamp-2">
            {project.problem}
          </p>
        </div>
      )}

      {/* Expanded Scientific Sections */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-6 border-t border-border-dim pt-6 space-y-6">
              
              {/* Problem */}
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-sci-blue block font-semibold">
                  I. Problem Formulation
                </span>
                <p className="text-xs leading-relaxed text-foreground/90 pl-3 border-l border-border-dim">
                  {project.problem}
                </p>
              </div>

              {/* Idea */}
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-sci-blue block font-semibold">
                  II. Core Thesis / Intuition
                </span>
                <p className="text-xs leading-relaxed text-foreground/90 pl-3 border-l border-border-dim">
                  {project.idea}
                </p>
              </div>

              {/* Method */}
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-sci-blue block font-semibold">
                  III. Mathematical Methodology
                </span>
                <p className="text-xs leading-relaxed text-foreground/90 pl-3 border-l border-border-dim">
                  {project.method}
                </p>
              </div>

              {/* Results */}
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-sci-blue block font-semibold">
                  IV. Quantitative Results
                </span>
                <p className="text-xs leading-relaxed text-foreground/90 pl-3 border-l border-border-dim">
                  {project.results}
                </p>
              </div>

              {/* Experiments */}
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-sci-blue block font-semibold">
                  V. Empirical Experiments
                </span>
                <p className="text-xs leading-relaxed text-foreground/90 pl-3 border-l border-border-dim">
                  {project.experiments}
                </p>
              </div>

              {/* Open Questions */}
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-sci-blue block font-semibold">
                  VI. Open Boundary Questions
                </span>
                <p className="text-xs leading-relaxed text-text-muted pl-3 border-l border-sci-blue/30 italic">
                  &ldquo;{project.openQuestions}&rdquo;
                </p>
              </div>

              {/* Publication Links */}
              <div className="flex flex-wrap gap-4 border-t border-border-dim/60 pt-4 font-mono text-[10px] uppercase tracking-wider">
                {project.paperUrl && (
                  <a
                    href={project.paperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="button"
                    className="flex items-center space-x-1.5 text-text-muted hover:text-sci-blue transition-colors"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>arXiv Paper</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="button"
                    className="flex items-center space-x-1.5 text-text-muted hover:text-sci-blue transition-colors"
                  >
                    <Code className="h-3.5 w-3.5" />
                    <span>Source Code</span>
                  </a>
                )}
                {project.blogUrl && (
                  <a
                    href={project.blogUrl}
                    data-cursor="button"
                    className="flex items-center space-x-1.5 text-text-muted hover:text-sci-blue transition-colors"
                    onClick={(e) => {
                      if (project.blogUrl?.startsWith("#") || project.blogUrl?.startsWith("/")) {
                        e.preventDefault();
                        const slug = project.blogUrl.split("/").pop();
                        const el = document.getElementById(`thinking-${slug}`);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Research Essay</span>
                  </a>
                )}
                {project.demoUrl && project.demoUrl !== "#" && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="button"
                    className="flex items-center space-x-1.5 text-text-muted hover:text-sci-blue transition-colors"
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>Interactive Solver Demo</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
