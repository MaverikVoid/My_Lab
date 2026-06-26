"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Bookmark, FileText, CheckCircle2 } from "lucide-react";
import { influentialIdeas } from "@/content/ideas";

export default function IdeasChangedMe() {
  const renderTextWithConcepts = (text: string) => {
    const regex = /(scientific machine learning|scientific ml|neural operator|fourier neural operator|fno|optimization|mathematics|mathematical|scientific computing|pdes|partial differential equations|symplectic)/gi;
    const parts = text.split(regex);
    if (parts.length === 1) return text;
    
    return parts.map((part, i) => {
      const lower = part.toLowerCase();
      if (lower === "optimization" || lower === "symplectic") {
        return (
          <span
            key={i}
            data-concept="optimization"
            data-cursor="text"
            className="font-semibold underline decoration-sci-blue/30 hover:decoration-sci-blue cursor-help transition-colors"
          >
            {part}
          </span>
        );
      }
      if (lower === "scientific machine learning" || lower === "scientific ml") {
        return (
          <span
            key={i}
            data-concept="scientific-ml"
            data-cursor="text"
            className="font-semibold underline decoration-sci-blue/30 hover:decoration-sci-blue cursor-help transition-colors"
          >
            {part}
          </span>
        );
      }
      if (lower === "neural operator" || lower === "fourier neural operator" || lower === "fno") {
        return (
          <span
            key={i}
            data-concept="neural-operators"
            data-cursor="text"
            className="font-semibold underline decoration-sci-blue/30 hover:decoration-sci-blue cursor-help transition-colors"
          >
            {part}
          </span>
        );
      }
      if (lower === "mathematics" || lower === "mathematical") {
        return (
          <span
            key={i}
            data-concept="mathematics"
            data-cursor="text"
            className="font-semibold underline decoration-sci-blue/30 hover:decoration-sci-blue cursor-help transition-colors"
          >
            {part}
          </span>
        );
      }
      if (lower === "scientific computing") {
        return (
          <span
            key={i}
            data-concept="scientific-computing"
            data-cursor="text"
            className="font-semibold underline decoration-sci-blue/30 hover:decoration-sci-blue cursor-help transition-colors"
          >
            {part}
          </span>
        );
      }
      if (lower === "pdes" || lower === "partial differential equations") {
        return (
          <span
            key={i}
            data-concept="pdes"
            data-cursor="text"
            className="font-semibold underline decoration-sci-blue/30 hover:decoration-sci-blue cursor-help transition-colors"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {influentialIdeas.map((idea, idx) => (
          <motion.div
            key={idea.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.35, delay: idx * 0.1 }}
            data-cursor="read"
            className="border border-border-dim rounded-lg bg-card-bg p-6 md:p-8 space-y-6 transition-colors duration-300"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-dim pb-4 gap-2">
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-wider bg-badge-bg px-2 py-0.5 rounded text-text-muted">
                  {idea.type}
                </span>
                <h4 className="font-serif text-xl font-bold tracking-tight text-foreground">
                  {idea.title}
                </h4>
                <p className="font-mono text-[10px] text-text-muted">
                  by {idea.author}
                </p>
              </div>
              
              <Bookmark className="h-5 w-5 text-sci-blue/60 shrink-0 self-start sm:self-auto" />
            </div>

            {/* Core details layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
              
              {/* Left Column */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted block font-semibold">
                    The Underlying Concept
                  </span>
                  <p className="text-foreground/90 pl-3 border-l border-border-dim">
                    {renderTextWithConcepts(idea.coreIdea)}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted block font-semibold">
                    Why It Mattered
                  </span>
                  <p className="text-foreground/90 pl-3 border-l border-border-dim italic font-serif">
                    &ldquo;{renderTextWithConcepts(idea.whyItMattered)}&rdquo;
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted block font-semibold">
                    Cognitive Reframing (How it changed my thinking)
                  </span>
                  <p className="text-foreground/90 pl-3 border-l border-border-dim">
                    {renderTextWithConcepts(idea.howItChangedThinking)}
                  </p>
                </div>

                <div className="bg-sci-blue/5 border border-sci-blue/15 rounded p-3 space-y-1 flex items-start space-x-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-sci-blue mt-0.5 shrink-0" />
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-sci-blue font-semibold block">
                      Concrete Research Application
                    </span>
                    <p className="text-[11px] text-foreground/80 mt-1">
                      {renderTextWithConcepts(idea.whereApplied)}
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </motion.div>
        ))}
      </div>
    </div>
  );
}
