"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Bookmark, FileText, CheckCircle2 } from "lucide-react";
export interface InfluentialIdea {
  id: string;
  title: string;
  type: "Book" | "Paper" | "Concept";
  author: string;
  coreIdea: string;
  whyItMattered: string;
  howItChangedThinking: string;
  whereApplied: string;
}

const influentialIdeas: InfluentialIdea[] = [
  {
    id: "beginning-of-infinity",
    title: "The Beginning of Infinity",
    type: "Book",
    author: "David Deutsch",
    coreIdea: "All progress is the result of seeking good explanations—explanations that are hard to vary and align with reality.",
    whyItMattered: "Reframed research from mere curve-fitting data to constructing physical explanations that possess universal reach.",
    howItChangedThinking: "Shifted my focus towards seeking interpretable, physically consistent explanations instead of relying purely on statistical approximations.",
    whereApplied: "Enforcing physical conservation laws in neural loss functions rather than treating models as black-box interpolators."
  },
  {
    id: "numerical-optimization",
    title: "Numerical Optimization",
    type: "Book",
    author: "Jorge Nocedal & Stephen Wright",
    coreIdea: "The mathematical foundations of continuous search spaces, constraints, and trajectory convergences.",
    whyItMattered: "Showed me that learning is not a mystical process; it is a vector field trace navigating a high-dimensional loss geometry.",
    howItChangedThinking: "Convinced me that understanding curvature, stiffness, and step-size interpolation is fundamental to designing robust PINNs solvers.",
    whereApplied: "Formulating custom gradient projection steps in SCIO to handle ill-conditioned PDE landscapes."
  },
  {
    id: "fourier-neural-operator",
    title: "Fourier Neural Operator for Parametric PDEs",
    type: "Paper",
    author: "Zongyi Li et al.",
    coreIdea: "Learning mapping between infinite-dimensional function spaces by parameterizing the integral kernel in Fourier space, bypassing grid-resolution constraints.",
    whyItMattered: "It challenged the conventional grid-by-grid approach to scientific machine learning, showing that we should model operators, not discrete arrays.",
    howItChangedThinking: "Demonstrated the power of spectral methods in neural architectures, sparking my interest in operator learning.",
    whereApplied: "Studying generalization bounds and spectral bias when mapping continuous function spaces."
  },
  {
    id: "pinns-paper",
    title: "Physics-Informed Neural Networks",
    type: "Paper",
    author: "M. Raissi, P. Perdikaris, and G.E. Karniadakis",
    coreIdea: "Integrating physical laws described by partial differential equations directly into deep learning networks using automatic differentiation.",
    whyItMattered: "It introduced a simple, elegant paradigm to bridge the gap between classical numerical analysis and neural network approximations.",
    howItChangedThinking: "Made me realize that physics can act as a regularizer, changing my research trajectory toward Scientific ML.",
    whereApplied: "Investigating failure modes on stiff PDEs, leading to the development of the SCIO optimizer."
  },
  {
    id: "scientific-computing",
    title: "Scientific Computing: An Introductory Survey",
    type: "Book",
    author: "Michael T. Heath",
    coreIdea: "The study of algorithms and error analysis for continuous mathematical problems in science and engineering.",
    whyItMattered: "Enforced the importance of conditioning, floating-point arithmetic, stability, and rigorous convergence bounds.",
    howItChangedThinking: "Taught me that computational algorithms must respect discretization and rounding properties to be useful in practice.",
    whereApplied: "Analyzing PDE stiffness matrix conditioning during PINN training cycles."
  }
];

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
