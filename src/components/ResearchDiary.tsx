"use client";

import { motion } from "framer-motion";
import { Edit3, Eye, AlertTriangle, Lightbulb } from "lucide-react";
import { diaryEntries } from "@/content/diary";

export default function ResearchDiary() {
  const renderDiaryTextWithConcepts = (text: string) => {
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
      <div className="border border-border-dim rounded-lg bg-card-bg p-6 md:p-8 space-y-8 transition-colors duration-300">
        
        {/* Notebook header information */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border-dim pb-4 gap-2">
          <div className="flex items-center space-x-2">
            <Edit3 className="h-4 w-4 text-sci-blue" />
            <span className="font-mono text-xs uppercase tracking-wider font-semibold text-foreground">
              Laboratory Notebook // Vol 04
            </span>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-wider text-text-muted flex gap-4">
            <span>Project: SciML Systems</span>
            <span>Custodian: M. Dabgar</span>
          </div>
        </div>

        {/* Diary entries stack */}
        <div className="space-y-12">
          {diaryEntries.map((entry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4 }}
              className="space-y-4 relative pl-4 border-l border-border-dim hover:border-sci-blue/60 transition-colors"
            >
              {/* Header log meta */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-foreground">
                  {entry.week}
                </h4>
                <span className="font-mono text-[9px] text-text-muted bg-badge-bg px-2 py-0.5 rounded">
                  LOG DATE: {entry.date}
                </span>
              </div>

              {/* Grid content representing raw notebook notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
                
                {/* Left: Experiment and Observation */}
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>1. Active Experiment</span>
                    </span>
                    <p className="text-foreground/95 italic pl-2 border-l border-border-dim/40 font-serif">
                      {renderDiaryTextWithConcepts(entry.experiment)}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>2. Empirical Observation</span>
                    </span>
                    <p className="text-foreground/95 pl-2 border-l border-border-dim/40">
                      {renderDiaryTextWithConcepts(entry.observation)}
                    </p>
                  </div>
                </div>

                {/* Right: Failure and New Hypothesis */}
                <div className="space-y-3">
                  <div className="bg-badge-bg/40 border border-border-dim/40 rounded p-3 space-y-1">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-red-500 font-semibold flex items-center space-x-1">
                      <AlertTriangle className="h-3 w-3" />
                      <span>3. Identified Failure Mode</span>
                    </span>
                    <p className="text-[11px] text-text-muted">
                      {renderDiaryTextWithConcepts(entry.failure)}
                    </p>
                  </div>

                  <div className="bg-sci-blue/5 border border-sci-blue/15 rounded p-3 space-y-1">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-sci-blue font-semibold flex items-center space-x-1">
                      <Lightbulb className="h-3 w-3 animate-pulse" />
                      <span>4. Formulated Hypothesis</span>
                    </span>
                    <p className="text-[11px] text-foreground/90 font-serif italic">
                      {renderDiaryTextWithConcepts(entry.newHypothesis)}
                    </p>
                  </div>
                </div>

              </div>

              {idx < diaryEntries.length - 1 && (
                <div className="border-t border-dashed border-border-dim/50 pt-6 mt-8" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
