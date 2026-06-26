"use client";

import { motion } from "framer-motion";
import { Edit3, Eye, AlertTriangle, Lightbulb, CheckCircle2, Flame, HelpCircle } from "lucide-react";
import { diaryEntries, LossPoint } from "@/content/diary";

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

  const renderLossCurve = (points?: LossPoint[]) => {
    if (!points || points.length === 0) return null;
    const width = 160;
    const height = 55;
    const padding = 6;
    const maxEpoch = Math.max(...points.map(p => p.epoch));
    const maxLoss = Math.max(...points.map(p => p.loss));
    const minLoss = Math.min(...points.map(p => p.loss));
    const lossSpan = maxLoss - minLoss || 1;

    const svgPoints = points.map(p => {
      const x = padding + (p.epoch / maxEpoch) * (width - padding * 2);
      const y = height - padding - ((p.loss - minLoss) / lossSpan) * (height - padding * 2);
      return `${x},${y}`;
    }).join(" ");

    return (
      <div className="border border-border-dim/80 bg-black/10 rounded p-2 flex items-center justify-between gap-4 font-mono text-[9px] w-full sm:w-auto shrink-0 select-none">
        <div className="space-y-0.5">
          <span className="block text-[7px] uppercase tracking-wider text-text-muted">Loss Decay Trace</span>
          <span className="block font-bold">Init: {points[0].loss.toFixed(3)}</span>
          <span className="block font-bold text-sci-blue">Final: {points[points.length - 1].loss.toFixed(5)}</span>
        </div>
        <svg width={width} height={height} className="overflow-visible select-none border border-border-dim/40 rounded bg-[#0a0a0c]">
          <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke="var(--border-dim)" strokeWidth={0.5} strokeDasharray="2 2" />
          <polyline
            fill="none"
            stroke="var(--sci-blue)"
            strokeWidth={1.5}
            points={svgPoints}
          />
          {points.map((p, i) => {
            const x = padding + (p.epoch / maxEpoch) * (width - padding * 2);
            const y = height - padding - ((p.loss - minLoss) / lossSpan) * (height - padding * 2);
            return (
              <circle key={i} cx={x} cy={y} r={1.5} fill="var(--foreground)" />
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="border border-border-dim rounded-lg bg-card-bg p-6 md:p-8 space-y-8 transition-colors duration-300">
        
        {/* Notebook header information */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border-dim pb-4 gap-2">
          <div className="flex items-center space-x-2">
            <Edit3 className="h-4 w-4 text-sci-blue" />
            <span className="font-mono text-xs uppercase tracking-wider font-semibold text-foreground">
              Laboratory Notebook // Vol 04 (Empirical Logbook)
            </span>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-wider text-text-muted flex gap-4">
            <span>Project: SciML Systems</span>
            <span>Custodian: M. Dabgar</span>
          </div>
        </div>

        {/* Diary entries stack */}
        <div className="space-y-16">
          {diaryEntries.map((entry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4 }}
              className="space-y-6 relative pl-4 border-l border-border-dim hover:border-sci-blue/60 transition-colors"
            >
              {/* Header log meta */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-dim/20 pb-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground flex items-center space-x-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-sci-blue" />
                  <span>{entry.week}</span>
                </h4>
                <span className="font-mono text-[9px] text-text-muted bg-badge-bg px-2.5 py-0.5 rounded border border-border-dim/60">
                  LOG DATE: {entry.date}
                </span>
              </div>

              {/* Grid content representing raw notebook notes */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs leading-relaxed">
                
                {/* Left & Center: Experiment, Observation & Successes */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>1. Active Experiment & Focus</span>
                    </span>
                    <p className="text-foreground/95 italic pl-3 border-l border-border-dim/50 font-serif text-sm">
                      {renderDiaryTextWithConcepts(entry.experiment)}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted flex items-center space-x-1">
                      <HelpCircle className="h-3 w-3 text-sci-blue" />
                      <span>2. Empirical Observations</span>
                    </span>
                    <p className="text-foreground/90 pl-3 border-l border-border-dim/50">
                      {renderDiaryTextWithConcepts(entry.observation)}
                    </p>
                  </div>

                  {/* Success grid */}
                  <div className="space-y-1.5 bg-emerald-500/5 border border-emerald-500/15 rounded p-3">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-emerald-500 font-semibold flex items-center space-x-1">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>3. Successes & Key Progress</span>
                    </span>
                    <p className="text-foreground/90 font-serif leading-relaxed">
                      {renderDiaryTextWithConcepts(entry.successes)}
                    </p>
                  </div>
                </div>

                {/* Right: Failures, Mistakes & Dead Ends */}
                <div className="space-y-3">
                  <div className="bg-red-500/5 border border-red-500/15 rounded p-3 space-y-1.5">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-red-500 font-semibold flex items-center space-x-1">
                      <AlertTriangle className="h-3 w-3" />
                      <span>4. Core Mistake / Saddle Stall</span>
                    </span>
                    <p className="text-[11px] text-text-muted">
                      {renderDiaryTextWithConcepts(entry.mistakes)}
                    </p>
                  </div>

                  <div className="bg-zinc-500/5 border border-zinc-500/15 rounded p-3 space-y-1.5">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-400 font-semibold flex items-center space-x-1">
                      <Flame className="h-3 w-3" />
                      <span>5. Research Dead End</span>
                    </span>
                    <p className="text-[11px] text-text-muted">
                      {renderDiaryTextWithConcepts(entry.deadEnds)}
                    </p>
                  </div>
                </div>

              </div>

              {/* Extra Block: Code Snippet & Loss curve visualizers */}
              {(entry.codeSnippet || entry.lossCurve) && (
                <div className="flex flex-col sm:flex-row gap-6 items-stretch border-t border-border-dim/20 pt-4">
                  
                  {/* Code Editor block */}
                  {entry.codeSnippet && (
                    <div className="flex-1 flex flex-col border border-border-dim rounded bg-[#0a0a0c] overflow-hidden">
                      <div className="bg-background px-3 py-1 border-b border-border-dim/60 flex items-center justify-between font-mono text-[8px] text-text-muted uppercase">
                        <span>JAX Solver Logic</span>
                        <span className="text-sci-blue">Python</span>
                      </div>
                      <pre className="p-3 font-mono text-[10px] text-text-muted overflow-x-auto select-text leading-relaxed">
                        <code>{entry.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Dynamic Curve graph */}
                  {renderLossCurve(entry.lossCurve)}

                </div>
              )}

              {/* Hypothesis callout */}
              <div className="bg-sci-blue/5 border border-sci-blue/15 rounded p-3.5 flex items-start space-x-2.5">
                <Lightbulb className="h-4 w-4 text-sci-blue shrink-0 mt-0.5 animate-pulse" />
                <div className="space-y-0.5">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-sci-blue font-bold block">
                    Formulated Hypothesis / Adaptive Vector Loop
                  </span>
                  <p className="text-[11px] text-foreground/90 font-serif italic">
                    {renderDiaryTextWithConcepts(entry.newHypothesis)}
                  </p>
                </div>
              </div>

              {idx < diaryEntries.length - 1 && (
                <div className="border-t border-dashed border-border-dim/50 pt-8 mt-12" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
