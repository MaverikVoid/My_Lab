"use client";

import { useState } from "react";
import { Copy, Info, Target } from "lucide-react";

export interface ResearchProject {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  category: string;
  tags: string[];
  problem: string;
  idea: string;
  method: string;
  results: string;
  experiments: string;
  openQuestions: string;
  paperUrl?: string;
  githubUrl?: string;
  blogUrl?: string;
  demoUrl?: string;
  citation?: string;
  bibtex?: string;
}

interface ResearchCardProps {
  project: ResearchProject;
}

export default function ResearchCard({ project }: ResearchCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCitation = () => {
    const bibtex = project.citation || project.bibtex || `@article{dabgar2026scio,
  author  = {Dabgar, Meet and Shukla, Khemraj},
  title   = {SCIO: Stiffness-Conditioned Interpolated Optimizer for stiff PDEs in PINNs},
  journal = {IEEE Transactions on Emerging Topics in Computational Intelligence (Submitted)},
  year    = {2026}
}`;
    navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="border border-border-dim rounded-lg bg-card-bg p-6 space-y-6 hover:border-text-muted/30 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
      data-cursor="explore"
    >
      {/* Header Info */}
      <div className="flex flex-col gap-2 border-b border-border-dim/40 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-wider bg-sci-blue/10 text-sci-blue border border-sci-blue/20 px-2.5 py-0.5 rounded font-bold">
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

      {/* Main Core Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 text-xs leading-relaxed">
        {/* Core content block */}
        <div className="lg:col-span-3 space-y-4">
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-wider text-text-muted mb-1.5 flex items-center">
              <Target className="h-3.5 w-3.5 text-sci-blue mr-1.5 shrink-0" />
              <span>The Problem Statement</span>
            </h4>
            <p className="text-foreground/80 font-serif leading-relaxed italic border-l border-sci-blue/20 pl-2.5">
              {project.problem}
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-wider text-text-muted mb-1.5 flex items-center">
              <Info className="h-3.5 w-3.5 text-sci-blue mr-1.5 shrink-0" />
              <span>Proposed Idea & Core Thesis</span>
            </h4>
            <p className="text-foreground/95 font-light">
              {project.idea}
            </p>
          </div>
        </div>

        {/* Citation block */}
        {project.citation && (
          <div className="lg:col-span-2 lg:border-l lg:border-border-dim/30 lg:pl-6 space-y-2 flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted">Academic Reference Citation</span>
              <button
                onClick={handleCopyCitation}
                className="flex items-center space-x-1 font-mono text-[8px] uppercase text-sci-blue hover:underline cursor-pointer bg-transparent border-none p-0"
              >
                <Copy className="h-3 w-3" />
                <span>{copied ? "Copied!" : "Copy BibTeX"}</span>
              </button>
            </div>
            <pre className="font-mono text-[9px] text-text-muted bg-badge-bg/30 p-3 rounded border border-border-dim select-text leading-tight max-h-[110px] overflow-y-auto">
              {project.citation}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
