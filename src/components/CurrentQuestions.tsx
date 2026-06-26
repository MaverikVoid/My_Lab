"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, ChevronUp, FileText, CornerDownRight, BookOpen } from "lucide-react";
import { currentQuestions, ScientificQuestion } from "@/content/questions";

export default function CurrentQuestions() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const stateColors = {
    Open: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    Investigating: "bg-sci-blue/10 text-sci-blue border-sci-blue/20",
    Writing: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Published: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Dormant: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    Solved: "bg-teal-500/10 text-teal-400 border-teal-500/20"
  };

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

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      {currentQuestions.map((q, idx) => {
        const isExpanded = expandedId === q.id;
        return (
          <div
            key={q.id}
            onClick={() => handleToggle(q.id)}
            data-cursor="explore"
            className={`group border rounded-lg bg-card-bg p-6 transition-all duration-300 cursor-pointer ${
              isExpanded 
                ? "border-sci-blue shadow-[0_4px_20px_rgba(15,76,129,0.04)] md:col-span-2" 
                : "border-border-dim hover:border-text-muted/40"
            }`}
          >
            <div className="flex flex-col space-y-4">
              
              {/* Header meta */}
              <div className="flex items-center justify-between border-b border-border-dim/40 pb-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted flex items-center space-x-1.5">
                  <HelpCircle className="h-3.5 w-3.5 text-sci-blue" />
                  <span>Conjecture // 0{idx + 1}</span>
                </span>
                
                <div className="flex items-center space-x-2">
                  <span className={`font-mono text-[8px] border px-2 py-0.5 rounded uppercase tracking-wider font-semibold ${
                    stateColors[q.state]
                  }`}>
                    {q.state}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-3.5 w-3.5 text-text-muted group-hover:text-sci-blue transition-colors" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5 text-text-muted group-hover:text-sci-blue transition-colors" />
                  )}
                </div>
              </div>

              {/* Title / Question */}
              <h4 className="font-serif text-lg md:text-xl font-semibold leading-tight text-foreground group-hover:text-sci-blue transition-colors">
                {renderTextWithConcepts(q.question)}
              </h4>

              {/* Context Summary */}
              {!isExpanded && (
                <p className="text-xs leading-relaxed text-text-muted font-serif italic border-l border-border-dim pl-3">
                  {q.context.length > 120 ? `${q.context.substring(0, 120)}...` : q.context}
                </p>
              )}

              {/* Expandable Section */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    onClick={(e) => e.stopPropagation()} // stop toggle on child clicks
                    className="overflow-hidden space-y-6 pt-4"
                  >
                    
                    {/* Conjecture Context */}
                    <div className="space-y-1.5 pl-3 border-l border-border-dim">
                      <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted block">
                        Background Context & Motivation
                      </span>
                      <p className="text-xs leading-relaxed text-foreground/80">
                        {renderTextWithConcepts(q.context)}
                      </p>
                    </div>

                    {/* Hypothesis */}
                    <div className="space-y-1.5 pl-3 border-l border-sci-blue/30">
                      <span className="font-mono text-[8px] uppercase tracking-wider text-sci-blue block font-bold">
                        Working Hypothesis
                      </span>
                      <p className="text-xs leading-relaxed text-foreground/90 font-serif italic">
                        {q.hypothesis}
                      </p>
                    </div>

                    {/* Mathematical Model (Center equations block) */}
                    <div className="space-y-2">
                      <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted block">
                        Mathematical Formulation
                      </span>
                      <div className="p-4 border-y border-border-dim bg-badge-bg/20 flex justify-center text-xs md:text-sm font-mono overflow-x-auto text-sci-blue select-text">
                        {q.equation}
                      </div>
                    </div>

                    {/* Obsidian Notebook Extract */}
                    <div className="bg-badge-bg/40 border border-border-dim rounded p-4 space-y-2 relative">
                      <div className="absolute top-3 right-3 font-mono text-[8px] text-text-muted/40">
                        Obsidian Extract
                      </div>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted/60 block">
                        Personal Notebook Log
                      </span>
                      <p className="text-[11px] leading-relaxed text-text-muted font-mono italic">
                        &ldquo;{q.obsidianNote}&rdquo;
                      </p>
                    </div>

                    {/* Citations & Reference links */}
                    {q.references.length > 0 && (
                      <div className="space-y-2 border-t border-border-dim/40 pt-4">
                        <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted block">
                          Associated Literature References
                        </span>
                        <div className="space-y-1.5">
                          {q.references.map((ref, idx) => (
                            <a
                              key={idx}
                              href={ref.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-cursor="button"
                              className="flex items-center space-x-1 text-xs text-sci-blue hover:underline font-mono text-[10px]"
                            >
                              <BookOpen className="h-3 w-3 shrink-0" />
                              <span>{ref.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        );
      })}
    </div>
  );
}
