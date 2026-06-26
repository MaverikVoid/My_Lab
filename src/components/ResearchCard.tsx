"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Code, BookOpen, Layers, ChevronDown, ChevronUp, CheckCircle, Info, Target, GitBranch, Copy } from "lucide-react";
import { ResearchProject } from "@/content/research";

interface ResearchCardProps {
  project: ResearchProject;
}

export default function ResearchCard({ project }: ResearchCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [copied, setCopied] = useState(false);

  const pipelineSteps = [
    { label: "Problem", title: "I. The Stiffness Convergence Barrier" },
    { label: "Observation", title: "II. Gradient Space Stiffness" },
    { label: "Idea", title: "III. Core Thesis: Curvature Scaling" },
    { label: "Mathematics", title: "IV. Stiffness-Conditioned Preconditioner" },
    { label: "Experiments", title: "V. Stiff Helmholtz & Allen-Cahn Tests" },
    { label: "Results", title: "VI. Empirical Speedup & L2 Decay" },
    { label: "Paper", title: "VII. IEEE TETCI Manuscript Status" },
    { label: "Code", title: "VIII. JAX Package & Auto-Diff Implementation" },
    { label: "Citation", title: "IX. BibTeX Academic Reference" }
  ];

  const handleCopyCitation = () => {
    const bibtex = `@article{dabgar2026scio,
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
      className={`border rounded-lg bg-card-bg p-6 transition-all duration-300 ${
        isExpanded ? "border-sci-blue shadow-[0_4px_25px_rgba(15,76,129,0.03)]" : "border-border-dim hover:border-text-muted/40"
      }`} 
      data-cursor="explore"
    >
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
          onClick={() => {
            setIsExpanded(!isExpanded);
            setActiveStep(0);
          }}
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

      {/* Expanded Scientific Sections (Interactive Pipeline) */}
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
              
              {/* Stepper Navigation tabs */}
              <div className="flex flex-wrap gap-1.5 border-b border-border-dim/40 pb-4 font-mono text-[9px] uppercase tracking-wider overflow-x-auto py-1">
                {pipelineSteps.map((step, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    data-cursor="button"
                    className={`px-2.5 py-1.5 rounded border transition-all cursor-pointer shrink-0 ${
                      activeStep === i
                        ? "bg-sci-blue text-white border-sci-blue font-bold shadow-sm"
                        : "border-border-dim text-text-muted hover:border-text-muted/40 hover:text-foreground"
                    }`}
                  >
                    {step.label}
                  </button>
                ))}
              </div>

              {/* Stepper Contents */}
              <div className="min-h-[220px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-sci-blue" />
                      <h4 className="font-serif text-base md:text-lg font-bold text-foreground">
                        {pipelineSteps[activeStep].title}
                      </h4>
                    </div>

                    {activeStep === 0 && (
                      <div className="space-y-3 pl-4 border-l-2 border-sci-blue text-xs leading-relaxed text-foreground/90">
                        <p>{project.problem}</p>
                        <p className="text-text-muted font-serif italic">
                          Stiffness creates multi-scale convergence bottlenecks: residual gradients on collocation bounds are near-orthogonal to boundary constraints, stalling typical optimizer regimes.
                        </p>
                      </div>
                    )}

                    {activeStep === 1 && (
                      <div className="space-y-3 pl-4 border-l-2 border-sci-blue text-xs leading-relaxed text-foreground/90">
                        <p>
                          During PINN training on stiff systems (e.g. Allen-Cahn with epsilon &lt;= 0.001), standard Adam algorithms exhibit severe saddle-point limit cycle oscillations.
                        </p>
                        <p className="font-mono text-[10px] bg-badge-bg/40 p-3 rounded border border-border-dim">
                          Observed: Gradient variance ratio between boundary terms and domain terms exceeds 10^5, leading to gradient conflict where boundary gradients oppose domain interior manifolds.
                        </p>
                      </div>
                    )}

                    {activeStep === 2 && (
                      <div className="space-y-3 pl-4 border-l-2 border-sci-blue text-xs leading-relaxed text-foreground/90 font-serif italic">
                        <p>{project.idea}</p>
                        <p className="text-foreground/80 not-italic">
                          By computing local eigenspectrum approximations, SCIO projects updates along stable curvature directions, automatically damping oscillations and balancing collocation loss constraints.
                        </p>
                      </div>
                    )}

                    {activeStep === 3 && (
                      <div className="space-y-3 pl-4 border-l-2 border-sci-blue text-xs leading-relaxed text-foreground/90">
                        <p>{project.method}</p>
                        <div className="p-4 border-y border-border-dim bg-badge-bg/25 flex justify-center text-xs md:text-sm font-mono overflow-x-auto text-sci-blue select-text">
                          {"\\theta_{t+1} = \\theta_t - \\eta P_t \\nabla L(\\theta_t) \\quad \\text{where} \\quad P_t = \\text{diag}(\\max(\\lambda_i, \\epsilon))^{-1}"}
                        </div>
                        <p className="text-[10px] font-mono text-text-muted">
                          The stiffness parameter maps curvature eigenspread to precondition step-size bounds.
                        </p>
                      </div>
                    )}

                    {activeStep === 4 && (
                      <div className="space-y-3 pl-4 border-l-2 border-sci-blue text-xs leading-relaxed text-foreground/90">
                        <p>{project.experiments}</p>
                        <p className="text-text-muted">
                          Evaluated on stiff 1D/2D Allen-Cahn equations, high-frequency Helmholtz cavities under wave-number stiffness bounds, and convergence boundary trials in coordinate physics systems.
                        </p>
                      </div>
                    )}

                    {activeStep === 5 && (
                      <div className="space-y-3 pl-4 border-l-2 border-sci-blue text-xs leading-relaxed text-foreground/90">
                        <p>{project.results}</p>
                        <div className="grid grid-cols-2 gap-4 max-w-sm pt-2 font-mono text-[10px] text-text-muted">
                          <div className="border border-border-dim/60 p-2.5 rounded bg-badge-bg/30">
                            <span className="block text-[8px] uppercase tracking-wider">Adam Solver</span>
                            <span className="block text-sm font-bold text-red-400 mt-1">Stalls (L2 ~ 2.3e-1)</span>
                            <span className="block text-[8px] opacity-75 mt-0.5">&gt; 50k epochs</span>
                          </div>
                          <div className="border border-sci-blue/30 p-2.5 rounded bg-sci-blue/5">
                            <span className="block text-[8px] uppercase tracking-wider text-sci-blue">SCIO Solver</span>
                            <span className="block text-sm font-bold text-sci-blue mt-1">Converges (L2 ~ 1.2e-4)</span>
                            <span className="block text-[8px] opacity-75 mt-0.5">2.5k epochs (15x speedup)</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeStep === 6 && (
                      <div className="space-y-3 pl-4 border-l-2 border-sci-blue text-xs leading-relaxed text-foreground/90">
                        <div className="flex items-center space-x-1.5 text-amber-500 font-mono text-[9px] uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded w-fit">
                          <Info className="h-3 w-3" />
                          <span>Manuscript In Preparation</span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed">
                          Title: <strong>SCIO: Stiffness-Conditioned Interpolated Optimizer for stiff PDEs in Physics-Informed Neural Networks</strong>
                        </p>
                        <p className="text-text-muted">
                          Target Submission: IEEE Transactions on Emerging Topics in Computational Intelligence (IEEE TETCI). Presenting boundary pre-conditioning algorithms in JAX.
                        </p>
                      </div>
                    )}

                    {activeStep === 7 && (
                      <div className="space-y-3 pl-4 border-l-2 border-sci-blue text-xs leading-relaxed text-foreground/90">
                        <div className="flex items-center space-x-1.5 text-sci-blue font-mono text-[9px] uppercase tracking-wider bg-sci-blue/10 border border-sci-blue/20 px-2 py-0.5 rounded w-fit">
                          <GitBranch className="h-3 w-3" />
                          <span>JAX Package Open-Source</span>
                        </div>
                        <p className="mt-2">
                          SCIO is developed directly in JAX to take advantage of GPU-vectorized Automatic Differentiation and JIT compilation.
                        </p>
                        <p className="font-mono text-[10px] text-text-muted bg-badge-bg/40 p-2.5 rounded border border-border-dim flex justify-between items-center select-text">
                          <span>pip install git+https://github.com/meet-dabgar/scio-optimizer.git</span>
                        </p>
                      </div>
                    )}

                    {activeStep === 8 && (
                      <div className="space-y-3 pl-4 border-l-2 border-sci-blue text-xs leading-relaxed text-foreground/90">
                        <div className="flex items-center justify-between border-b border-border-dim/40 pb-2">
                          <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted">BibTeX Academic Citation Reference</span>
                          <button
                            onClick={handleCopyCitation}
                            className="flex items-center space-x-1 font-mono text-[8px] uppercase text-sci-blue hover:underline cursor-pointer bg-transparent border-none p-0"
                          >
                            <Copy className="h-3 w-3" />
                            <span>{copied ? "Copied!" : "Copy Citation"}</span>
                          </button>
                        </div>
                        <pre className="font-mono text-[10px] text-text-muted bg-badge-bg/50 p-4 rounded overflow-x-auto border border-border-dim select-text leading-normal">
{`@article{dabgar2026scio,
  author  = {Dabgar, Meet and Shukla, Khemraj},
  title   = {SCIO: Stiffness-Conditioned Interpolated Optimizer for stiff PDEs in PINNs},
  journal = {IEEE Transactions on Emerging Topics in Computational Intelligence (Submitted)},
  year    = {2026}
}`}
                        </pre>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Action Buttons footer */}
              <div className="flex flex-wrap gap-4 border-t border-border-dim/60 pt-4 font-mono text-[10px] uppercase tracking-wider">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="button"
                    className="flex items-center space-x-1.5 text-text-muted hover:text-sci-blue transition-colors"
                  >
                    <Code className="h-3.5 w-3.5" />
                    <span>JAX Codebase</span>
                  </a>
                )}
                <button
                  onClick={() => setActiveStep(8)}
                  data-cursor="button"
                  className="flex items-center space-x-1.5 text-text-muted hover:text-sci-blue transition-colors bg-transparent border-none p-0 cursor-pointer"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Get Citation Reference</span>
                </button>
                <button
                  onClick={() => window.dispatchEvent(new Event("open-command-terminal"))}
                  data-cursor="button"
                  className="flex items-center space-x-1.5 text-text-muted hover:text-sci-blue transition-colors bg-transparent border-none p-0 cursor-pointer"
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>Execute in Terminal</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
