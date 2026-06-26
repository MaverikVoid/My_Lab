"use client";

import React from "react";
import { motion } from "framer-motion";
import { HelpCircle, ChevronRight } from "lucide-react";
import { currentQuestions } from "@/content/questions";

export default function CurrentQuestions() {
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {currentQuestions.map((q, idx) => (
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.35, delay: idx * 0.1 }}
          data-cursor="think"
          className="group border border-border-dim rounded-lg bg-card-bg p-6 transition-all duration-300 hover:border-text-muted/40 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border-dim/40 pb-2">
              <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted flex items-center space-x-1">
                <HelpCircle className="h-3 w-3 text-sci-blue" />
                <span>Active Inquiry // {idx + 1}</span>
              </span>
              <span className="font-mono text-[8px] bg-sci-blue/10 text-sci-blue px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                Open Loop
              </span>
            </div>

            <h4 className="font-serif text-lg font-semibold leading-tight text-foreground group-hover:text-sci-blue transition-colors">
              {renderTextWithConcepts(q.question)}
            </h4>
          </div>

          <div className="mt-4 pt-4 border-t border-border-dim/40">
            <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted block mb-1">
              Context & Motivation
            </span>
            <p className="text-[11px] leading-relaxed text-foreground/80 font-serif italic">
              {renderTextWithConcepts(q.context)}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
