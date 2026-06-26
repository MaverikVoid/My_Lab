"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowLeft, ArrowUpRight } from "lucide-react";
import { essays, Essay } from "@/content/essays";

export default function ThinkingSection() {
  const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Scientific ML", "Optimization", "Mathematics", "Research", "Philosophy"];

  const filteredEssays = activeCategory === "All"
    ? essays
    : essays.filter((e) => e.category === activeCategory);

  const renderParagraphWithConcepts = (text: string) => {
    const regex = /(scientific machine learning|scientific ml|neural operators|optimization|mathematics|scientific computing|pdes|partial differential equations)/gi;
    const parts = text.split(regex);
    if (parts.length === 1) return text;
    
    return parts.map((part, i) => {
      const lower = part.toLowerCase();
      if (lower === "optimization") {
        return (
          <span
            key={i}
            data-concept="optimization"
            data-cursor="text"
            className="font-semibold underline decoration-sci-blue/30 underline-offset-2 hover:decoration-sci-blue hover:text-sci-blue transition-colors cursor-help"
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
            className="font-semibold underline decoration-sci-blue/30 underline-offset-2 hover:decoration-sci-blue hover:text-sci-blue transition-colors cursor-help"
          >
            {part}
          </span>
        );
      }
      if (lower === "neural operators") {
        return (
          <span
            key={i}
            data-concept="neural-operators"
            data-cursor="text"
            className="font-semibold underline decoration-sci-blue/30 underline-offset-2 hover:decoration-sci-blue hover:text-sci-blue transition-colors cursor-help"
          >
            {part}
          </span>
        );
      }
      if (lower === "mathematics") {
        return (
          <span
            key={i}
            data-concept="mathematics"
            data-cursor="text"
            className="font-semibold underline decoration-sci-blue/30 underline-offset-2 hover:decoration-sci-blue hover:text-sci-blue transition-colors cursor-help"
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
            className="font-semibold underline decoration-sci-blue/30 underline-offset-2 hover:decoration-sci-blue hover:text-sci-blue transition-colors cursor-help"
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
            className="font-semibold underline decoration-sci-blue/30 underline-offset-2 hover:decoration-sci-blue hover:text-sci-blue transition-colors cursor-help"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const handleBack = () => {
    setSelectedEssay(null);
    // Smooth scroll back to section header
    const header = document.getElementById("thinking");
    if (header) {
      header.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {!selectedEssay ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Category Filter bar */}
            <div className="flex flex-wrap gap-2 border-b border-border-dim pb-4 font-mono text-[10px] uppercase tracking-wider">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  data-cursor="button"
                  className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-foreground text-background font-semibold"
                      : "text-text-muted hover:bg-badge-bg hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Essays Grid/List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEssays.map((essay) => (
                <div
                  key={essay.slug}
                  id={`thinking-${essay.slug}`}
                  onClick={() => setSelectedEssay(essay)}
                  data-cursor="think"
                  className="group flex flex-col justify-between border border-border-dim rounded-lg bg-card-bg p-6 cursor-pointer transition-all duration-300 hover:border-text-muted/40 hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-text-muted">
                      <span
                        data-concept={
                          essay.category === "Scientific ML" ? "scientific-ml" :
                          essay.category === "Optimization" ? "optimization" :
                          essay.category === "Mathematics" ? "mathematics" : undefined
                        }
                      >
                        {essay.category}
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{essay.date}</span>
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-serif text-xl font-semibold leading-tight group-hover:text-sci-blue transition-colors flex items-start justify-between">
                        <span>{essay.title}</span>
                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-sci-blue shrink-0 ml-2 mt-1" />
                      </h4>
                      <p className="text-xs leading-relaxed text-text-muted">
                        {essay.summary}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-border-dim/40 pt-4 mt-6 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-text-muted">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{essay.readTime}</span>
                    </span>
                    <span className="text-sci-blue group-hover:underline">Read Entry &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="reading"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="border border-border-dim rounded-lg bg-card-bg p-6 md:p-12 transition-colors duration-300"
          >
            {/* Back to list button */}
            <button
              onClick={handleBack}
              data-cursor="button"
              className="flex items-center space-x-2 font-mono text-[10px] uppercase tracking-wider text-text-muted hover:text-foreground mb-8 border border-border-dim hover:border-text-muted/40 px-3 py-1.5 rounded transition-all cursor-pointer bg-transparent"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Essays</span>
            </button>

            {/* Essay Header */}
            <div className="space-y-4 border-b border-border-dim pb-6 mb-8">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                <span
                  data-concept={
                    selectedEssay.category === "Scientific ML" ? "scientific-ml" :
                    selectedEssay.category === "Optimization" ? "optimization" :
                    selectedEssay.category === "Mathematics" ? "mathematics" : undefined
                  }
                  className="bg-badge-bg px-2.5 py-0.5 rounded text-sci-blue font-semibold"
                >
                  {selectedEssay.category}
                </span>
                <span>•</span>
                <span>{selectedEssay.date}</span>
                <span>•</span>
                <span>{selectedEssay.readTime}</span>
              </div>

              <h3 className="font-serif text-3xl md:text-4xl font-semibold leading-tight text-foreground max-w-3xl">
                {selectedEssay.title}
              </h3>
            </div>

            {/* Essay Content */}
            <article className="prose dark:prose-invert max-w-2xl mx-auto journal-body text-sm text-foreground/90 space-y-6">
              {selectedEssay.content.split("\n\n").map((para, i) => {
                const trimmed = para.trim();
                if (!trimmed) return null;

                // Handle Headers
                if (trimmed.startsWith("### ")) {
                  return (
                    <h4 key={i} className="font-serif text-xl font-bold tracking-tight text-foreground mt-8 mb-2">
                      {trimmed.replace("### ", "")}
                    </h4>
                  );
                }

                // Handle lists
                if (trimmed.startsWith("1. ") || trimmed.startsWith("- ")) {
                  const items = trimmed.split("\n");
                  return (
                    <ul key={i} className="space-y-2 pl-4 list-decimal list-inside text-xs leading-relaxed text-foreground/80">
                      {items.map((item, idx) => (
                        <li key={idx} className="marker:text-sci-blue">
                          {item.replace(/^\d+\.\s+/, "").replace(/^-\s+/, "")}
                        </li>
                      ))}
                    </ul>
                  );
                }

                // Handle equations block (like $$...$$)
                if (trimmed.startsWith("$$") && trimmed.endsWith("$$")) {
                  const eq = trimmed.substring(2, trimmed.length - 2).trim();
                  return (
                    <div
                      key={i}
                      className="my-6 p-4 border-y border-border-dim/60 bg-badge-bg/20 flex justify-center text-xs md:text-sm font-mono overflow-x-auto text-sci-blue text-center"
                    >
                      {eq}
                    </div>
                  );
                }

                // Standard paragraph
                return (
                  <p key={i} className="leading-relaxed">
                    {renderParagraphWithConcepts(trimmed)}
                  </p>
                );
              })}
            </article>

            {/* Bottom Back Button */}
            <div className="border-t border-border-dim pt-8 mt-12 flex justify-center">
              <button
                onClick={handleBack}
                data-cursor="button"
                className="flex items-center space-x-2 font-mono text-[10px] uppercase tracking-wider text-text-muted hover:text-foreground border border-border-dim hover:border-text-muted/40 px-4 py-2 rounded transition-all cursor-pointer bg-transparent"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Return to Scientific Library</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
