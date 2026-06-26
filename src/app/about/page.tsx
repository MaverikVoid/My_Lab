"use client";

import { motion } from "framer-motion";
import { ArrowDown, Brain, Search, HelpCircle, Activity, BookOpen, GitCommit, ShieldAlert, Briefcase, Mail, Code, Compass, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import MathematicalBackground from "@/components/MathematicalBackground";
import FloatingQuestions from "@/components/FloatingQuestions";
import IdeaGraph from "@/components/IdeaGraph";

interface ThinkingPrinciple {
  title: string;
  description: string;
}

const principles: ThinkingPrinciple[] = [
  {
    title: "Why I chose optimization instead of LLMs",
    description: "Large Language Models focus on mapping statistical structures in text. I am drawn to physical reality. Optimization acts as the continuous bridge that maps physical laws directly to parameter manifolds—navigating loss landscapes is how we compute physical truth."
  },
  {
    title: "Why I care about stiff PDEs",
    description: "Stiffness represents multi-scale transitions occurring at vastly different scales, such as shock waves or chemical reactions. Standard deep learning fails completely here. Navigating stiffness is the ultimate trial of computational stability."
  },
  {
    title: "Why mathematics still matters in AI",
    description: "Empirical curve-fitting produces black-boxes that collapse when evaluated out-of-distribution. Rigorous numerical analysis and analytical bounds are the only mathematical insurance policy for safety-critical scientific deployments."
  }
];



interface JourneyNode {
  phase: string;
  title: string;
  description: string;
}

const journeyTimeline: JourneyNode[] = [
  {
    phase: "2024",
    title: "Academic Foundations",
    description: "Enrolled in the Integrated B.Tech–M.Tech in AI at NIT Surat because I wanted to understand the mathematical principles behind intelligence, rather than just training packages."
  },
  {
    phase: "2025",
    title: "Machine Learning & Recommenders",
    description: "Built statistical recommendation models because I wanted to test data modeling in practice, which quickly made me realize that black-box ML lacks physical grounding and reliability."
  },
  {
    phase: "2025",
    title: "Physics-Informed ML",
    description: "Shifted focus towards Scientific ML and PINNs because I wanted to see how physical laws can constrain model parameters, leading me to discover convergence failure modes on stiff boundary equations."
  },
  {
    phase: "2025",
    title: "SCIO Development",
    description: "Developed SCIO (Stiffness-Conditioned Interpolated Optimizer) in JAX because I realized conventional optimizers treat residuals as black-box losses, failing to navigate local curvature stiffness."
  },
  {
    phase: "2025",
    title: "Brown Internship",
    description: "Began work as a Research Intern at Brown University under Khemraj Shukla because my SCIO work on stiff PINNs aligned with their focus on solving challenging high-frequency wave equations."
  },
  {
    phase: "2026",
    title: "IEEE TETCI Submission",
    description: "Submitted our manuscript detailing stiffness-conditioned optimization bounds because I wanted to share these mathematical pre-conditioning results with the computational intelligence community."
  }
];

export default function AboutPage() {
  const scrollToContent = () => {
    const el = document.getElementById("manifesto");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Mathematical Flow Background */}
      <MathematicalBackground />

      {/* Top Navbar */}
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 md:px-8 space-y-32 flex-1 pb-24">
        
        {/* Section 0: Fullscreen Hero (Obsession Introduction) */}
        <section className="min-h-[90vh] flex flex-col justify-center space-y-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-2 font-mono text-[10px] uppercase tracking-widest text-text-muted">
              <span>Who is Thinking?</span>
              <span>//</span>
              <span className="text-sci-blue font-bold">Research Philosophy</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight leading-none text-foreground">
              The Operating System
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted/70 bg-badge-bg/40 px-3 py-1.5 rounded-md w-fit border border-border-dim/50">
              <span className="text-[10px] uppercase font-bold tracking-wider mr-1 text-text-muted">// FIELD EQUATIONS:</span>
              <span data-cursor="nabla" className="cursor-help font-serif italic hover:text-sci-blue transition-colors text-sm">∇ × u = ω</span>
              <span className="text-text-muted/40">|</span>
              <span data-cursor="func" className="cursor-help font-serif italic hover:text-sci-blue transition-colors text-sm">f(x) = ∫ K(x,y) u(y) dy</span>
              <span className="text-text-muted/40">|</span>
              <span data-cursor="partial" className="cursor-help font-serif italic hover:text-sci-blue transition-colors text-sm">∂_t u + u·∇u = -∇p</span>
            </div>

            <div className="space-y-4 pt-4 max-w-3xl">
              <p className="font-serif text-base sm:text-lg lg:text-xl text-foreground/90 font-light leading-relaxed">
                I develop optimization methods and machine learning algorithms for scientific computing, with a focus on Physics-Informed Machine Learning and scientific foundation models. My research aims to make scientific AI more stable, efficient, and mathematically grounded.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute bottom-12 left-0 flex items-center space-x-2 font-mono text-[9px] uppercase tracking-wider text-text-muted"
          >
            <button
              onClick={scrollToContent}
              data-cursor="button"
              className="flex items-center space-x-2 hover:text-foreground transition-colors cursor-pointer bg-transparent border-0"
            >
              <span>Examine Manifesto</span>
              <ArrowDown className="h-3 w-3 animate-bounce text-sci-blue" />
            </button>
          </motion.div>
        </section>

        {/* Section 1: Why I Do This (Manifesto) */}
        <section id="manifesto" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">
              01 // CORE MANIFESTO
            </span>
               <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              Biography
            </h2>
            <div className="h-[1px] bg-border-dim w-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Left Column: Biography Text */}
            <div className="lg:col-span-3 prose dark:prose-invert journal-body text-sm md:text-base leading-relaxed text-foreground/90 space-y-6">
              <p>
                I didn't start with optimization. I started by wondering why Physics-Informed Neural Networks (PINNs) fail on seemingly simple equations. That single question gradually pulled me into numerical analysis, PDEs, and scientific machine learning.
              </p>
              <p>
                I am an Integrated B.Tech–M.Tech student in Artificial Intelligence at NIT Surat. My work centers on building optimization algorithms that exploit mathematical structure rather than treating physical laws as black-box loss functions.
              </p>
              <p>
                To solve convergence issues in stiff systems, I developed SCIO (Stiffness-Conditioned Interpolated Optimizer), which led to my current role as a Research Intern at Brown University under the guidance of Khemraj Shukla.
              </p>
              <p>
                My broader interests cover Neural Operators, Scientific Foundation Models, and Agentic AI for Science. I build software tools in JAX to expand what scientific AI is mathematically trusted to do.
              </p>
              <p className="font-serif italic text-sci-blue pl-4 border-l border-sci-blue/30 text-base md:text-lg">
                &ldquo;I believe the strongest research portfolios don't just show accomplishments—they expose an active, evolving body of thought.&rdquo;
              </p>
            </div>

            {/* Right Column: Investigator Photo */}
            <div
              className="lg:col-span-2 relative group border border-border-dim rounded-lg overflow-hidden bg-zinc-950 flex justify-center items-center"
              data-cursor="researcher"
            >
              <img
                src="/meet-dabgar.jpg"
                alt="Meet Dabgar - Computational Scientist"
                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 bg-black/60 border border-white/10 px-2.5 py-1 rounded backdrop-blur-sm pointer-events-none">
                <span className="font-mono text-[8px] uppercase tracking-wider text-white">
                  RESEARCH INTERN // M. DABGAR // NIT SURAT
                </span>
              </div>
            </div>
            </div>
        </section>

        {/* Section 2: How I Think (Principles Grid) */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">
              02 // HEURISTIC MATRIX
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              How I Think
            </h2>
            <div className="h-[1px] bg-border-dim w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((pr, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.01 }}
                className="border border-border-dim rounded-lg bg-card-bg p-6 space-y-4 hover:border-text-muted/40 transition-colors duration-300"
              >
                <span className="font-mono text-[9px] text-sci-blue font-bold block uppercase tracking-wider">
                  Principle 0{idx + 1}
                </span>
                <h4 className="font-serif text-lg font-bold tracking-tight text-foreground">
                  {pr.title}
                </h4>
                <p className="text-xs leading-relaxed text-text-muted">
                  {pr.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 3: Current Research Identity (Lab Dashboard) */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">
              03 // REAL-TIME LOG STATE
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              Research Status
            </h2>
            <div className="h-[1px] bg-border-dim w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Box 1: Obsession */}
            <div className="border border-border-dim rounded-lg bg-card-bg p-6 space-y-3">
              <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted block">
                Current Obsession
              </span>
              <div className="h-[1px] bg-border-dim/40 w-full" />
              <h4 className="font-serif text-lg font-semibold text-foreground">
                Optimization for Scientific Machine Learning
              </h4>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Exploring step-size scaling and pre-conditioning techniques to stabilize neural solvers on stiff systems.
              </p>
            </div>

            {/* Box 2: Live Question */}
            <div className="border border-border-dim rounded-lg bg-card-bg p-6 space-y-3">
              <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted block">
                Active Question
              </span>
              <div className="h-[1px] bg-border-dim/40 w-full" />
              <h4 className="font-serif text-lg font-semibold text-sci-blue italic">
                Can optimization methods adapt automatically to stiffness in PINNs?
              </h4>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Formulating adaptive loss balancing methods to handle gradient stiffness without manual weight tuning.
              </p>
            </div>

            {/* Box 3: Experiment */}
            <div className="border border-border-dim rounded-lg bg-card-bg p-6 space-y-3">
              <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted block flex items-center space-x-1">
                <Activity className="h-3 w-3 text-sci-blue animate-pulse" />
                <span>Current Experiment</span>
              </span>
              <div className="h-[1px] bg-border-dim/40 w-full" />
              <h4 className="font-serif text-lg font-semibold text-foreground">
                SCIO Learning Dynamics on Stiff PDEs
              </h4>
              <p className="text-[11px] text-text-muted leading-relaxed font-mono">
                Evaluating parameter step interpolation on stiff Allen-Cahn boundaries. Loss stability checks on JAX.
              </p>
            </div>

            {/* Box 4: Reading */}
            <div className="border border-border-dim rounded-lg bg-card-bg p-6 space-y-3">
              <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted block flex items-center space-x-1">
                <BookOpen className="h-3 w-3 text-sci-blue" />
                <span>Current Reading</span>
              </span>
              <div className="h-[1px] bg-border-dim/40 w-full" />
              <h4 className="font-serif text-lg font-semibold text-foreground">
                Numerical Optimization
              </h4>
              <p className="text-[11px] text-text-muted leading-relaxed font-serif">
                Jorge Nocedal & Stephen Wright. Deep-diving into curvature approximations and trust-region subproblems.
              </p>
            </div>

            {/* Box 5: Building */}
            <div className="border border-border-dim rounded-lg bg-card-bg p-6 space-y-3">
              <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted block flex items-center space-x-1">
                <Code className="h-3 w-3 text-sci-blue" />
                <span>Current Building</span>
              </span>
              <div className="h-[1px] bg-border-dim/40 w-full" />
              <h4 className="font-serif text-lg font-semibold text-foreground">
                SCIO JAX Package
              </h4>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Developing a modular Stiffness-Conditioned Interpolated Optimizer package in JAX, designed for physics-informed architectures.
              </p>
            </div>

            {/* Box 6: Focus Area */}
            <div className="border border-border-dim rounded-lg bg-card-bg p-6 space-y-3">
              <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted block">
                Primary Core Focus
              </span>
              <div className="h-[1px] bg-border-dim/40 w-full" />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["Optimization", "Scientific ML", "Neural Operators", "Scientific Foundation Models"].map((f, i) => (
                  <span key={i} className="font-mono text-[10px] uppercase bg-badge-bg px-2.5 py-1 rounded text-foreground font-semibold">
                    {f}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Section 4: Floating Questions */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">
              04 // ACTIVE COGNITIVE DRIFT
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              Inquiry Landscape
            </h2>
            <div className="h-[1px] bg-border-dim w-full" />
            <p className="text-xs font-mono text-text-muted max-w-xl">
              Move your cursor across the grid. These questions float gently in space, reflecting my ongoing internal debates on the nature of intelligence.
            </p>
          </div>
          <FloatingQuestions />
        </section>

        {/* Section 5: Idea Graph */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">
              05 // TOPOLOGY OF CONVERGENCE
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              The Intelligence Network
            </h2>
            <div className="h-[1px] bg-border-dim w-full" />
            <p className="text-xs font-mono text-text-muted max-w-xl">
              An interactive SVG mind-map connecting different fields back to the singular mystery of **Intelligence**. Select nodes to explore connections.
            </p>
          </div>
          <IdeaGraph />
        </section>

        {/* Section 6: Curiosity Journey (The Journey) */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">
              06 // EVOLUTION CHRONOLOGY
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              Curiosity Journey
            </h2>
            <div className="h-[1px] bg-border-dim w-full" />
            <p className="text-xs font-mono text-text-muted max-w-xl">
              Tracing the vertical line of my research interests: how each domain naturally inherited its questions from the failures of the last.
            </p>
          </div>

          <div className="relative pl-6 border-l border-border-dim space-y-8 ml-4 transition-colors duration-300">
            {journeyTimeline.map((node, idx) => (
              <div key={idx} className="relative group space-y-1" data-cursor="journey">
                {/* Visual marker node */}
                <div className="absolute -left-[32px] top-1.5 h-3 w-3 rounded-full bg-background border border-border-dim group-hover:border-sci-blue transition-colors flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-text-muted group-hover:bg-sci-blue" />
                </div>

                <div className="flex items-center space-x-2 font-mono text-[9px] uppercase tracking-wider text-sci-blue font-bold">
                  <span>{node.phase}</span>
                  <span className="text-text-muted">//</span>
                  <span className="text-text-muted font-normal">Step 0{idx + 1}</span>
                </div>

                <h4 className="font-serif text-lg font-semibold text-foreground group-hover:text-sci-blue transition-colors">
                  {node.title}
                </h4>

                <p className="text-xs leading-relaxed text-foreground/80 max-w-2xl">
                  {node.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Failure Archive */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">
              07 // RESEARCH SADDLE POINTS
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              Failure Archive
            </h2>
            <div className="h-[1px] bg-border-dim w-full" />
            <p className="text-xs font-mono text-text-muted max-w-xl">
              A transparent log of algorithmic failures, collapsed gradients, and modeling boundary errors. These represent key steps toward finding stable solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Failure 1 */}
            <div className="border border-border-dim rounded-lg bg-card-bg p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-border-dim/30 pb-2">
                <h4 className="font-serif text-base font-semibold text-foreground">
                  Attempt 01: Soft PINN boundary loss
                </h4>
                <span className="font-mono text-[8px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded uppercase tracking-wider font-bold">Failed</span>
              </div>
              <p className="text-xs leading-relaxed text-foreground/80">
                <strong>Attempt:</strong> Solving Helmholtz wave equations with wave-number $k=20$ using weighted soft collocation bounds.
              </p>
              <div className="p-2.5 font-mono text-[9px] bg-black/40 rounded border border-border-dim/40 text-text-muted">
                Stdout: [Epoch 14200] loss_domain: 0.8243 | loss_boundary: 1.042e+02 | cos(theta): -0.92 (Gradients opposing)
              </div>
              <p className="text-xs leading-relaxed text-text-muted border-l-2 border-border-dim pl-3 font-mono">
                <strong>Reason:</strong> Collocation domain residuals dominated updates, projecting gradients in opposition to boundary constraints ({"\\nabla L_{domain} \\cdot \\nabla L_{boundary} < 0"}).
              </p>
              <p className="text-xs leading-relaxed text-sci-blue font-serif italic">
                <strong>Lesson:</strong> Soft penalty terms yield severe gradient conflicts. Enforce boundary conditions algebraically or use projection-based optimization.
              </p>
            </div>

            {/* Failure 2 */}
            <div className="border border-border-dim rounded-lg bg-card-bg p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-border-dim/30 pb-2">
                <h4 className="font-serif text-base font-semibold text-foreground">
                  Attempt 02: BPTT on chaotic variables
                </h4>
                <span className="font-mono text-[8px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded uppercase tracking-wider font-bold">Failed</span>
              </div>
              <p className="text-xs leading-relaxed text-foreground/80">
                <strong>Attempt:</strong> Backpropagation through time (BPTT) using automatic differentiation in JAX to tune parameters of a chaotic Lorenz-63 system.
              </p>
              <div className="p-2.5 font-mono text-[9px] bg-black/40 rounded border border-border-dim/40 text-text-muted">
                Stdout: [Epoch 182] Adjoint eigenvalues exceeded 10^14. Gradient output: NaN
              </div>
              <p className="text-xs leading-relaxed text-text-muted border-l-2 border-border-dim pl-3 font-mono">
                <strong>Reason:</strong> Positive Lyapunov exponents cause the adjoint sensitivity vectors to blow up exponentially, causing float overflow.
              </p>
              <p className="text-xs leading-relaxed text-sci-blue font-serif italic">
                <strong>Lesson:</strong> Standard adjoint differentiation fails on chaotic attractors. Shadowing or ensemble algorithms are required to bound adjoint limits.
              </p>
            </div>

          </div>
        </section>

        {/* Section 8: Working With Me (Collaboration parameters) */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">
              08 // COLLABORATION MATRIX
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              Working With Me
            </h2>
            <div className="h-[1px] bg-border-dim w-full" />
            <p className="text-xs font-mono text-text-muted max-w-xl">
              I enjoy discussing complex mathematical ideas, collaborating on ambitious research, and exploring stiff scientific computing problems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Research Collaborations */}
            <div className="border border-border-dim rounded-lg bg-card-bg p-6 space-y-3">
              <h4 className="font-serif text-base font-bold text-foreground">Research Collaborations</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                If you are working on operator learning, stiffness pre-conditioning, or JAX scientific solvers, let's build codebases and formulate joint publications together.
              </p>
            </div>

            {/* Card 2: Speaking & Seminars */}
            <div className="border border-border-dim rounded-lg bg-card-bg p-6 space-y-3">
              <h4 className="font-serif text-base font-bold text-foreground">Speaking & Seminars</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                I enjoy sharing my work on stiff PDE optimization, automatic differentiation limitations, and physics-regularized deep architectures at seminars.
              </p>
            </div>

            {/* Card 3: Open Source & Internships */}
            <div className="border border-border-dim rounded-lg bg-card-bg p-6 space-y-3">
              <h4 className="font-serif text-base font-bold text-foreground">Open Source & Internships</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                I build and maintain modular solver frameworks. Always interested in collaborative open-source packages or computational intern opportunities.
              </p>
            </div>

          </div>
        </section>

        {/* Section 10: Final Statement & Contact Coordinates */}
        <section className="border-t border-border-dim pt-16 flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 max-w-3xl"
          >
            <p className="font-serif text-2xl md:text-3xl leading-relaxed text-foreground italic">
              &ldquo;My goal isn't simply to solve problems. It's to understand the principles from which better solutions naturally emerge.&rdquo;
            </p>
          </motion.div>

          <div className="h-[1px] bg-border-dim/60 w-32" />

          {/* Social and contacts coordinate nodes */}
          <div className="flex flex-wrap justify-center gap-6 font-mono text-xs uppercase tracking-wider">
            <a href="mailto:meet.dabgar@example.com" data-cursor="button" className="flex items-center space-x-1.5 text-text-muted hover:text-sci-blue transition-colors">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" data-cursor="button" className="flex items-center space-x-1.5 text-text-muted hover:text-sci-blue transition-colors">
              <Code className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" data-cursor="button" className="flex items-center space-x-1.5 text-text-muted hover:text-sci-blue transition-colors">
              <Briefcase className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
            <a href="https://x.com/" target="_blank" rel="noopener noreferrer" data-cursor="button" className="flex items-center space-x-1.5 text-text-muted hover:text-sci-blue transition-colors">
              <Compass className="h-4 w-4" />
              <span>X.com</span>
            </a>
            <a href="https://scholar.google.com/" target="_blank" rel="noopener noreferrer" data-cursor="button" className="flex items-center space-x-1.5 text-text-muted hover:text-sci-blue transition-colors">
              <Award className="h-4 w-4" />
              <span>Google Scholar</span>
            </a>
          </div>
        </section>

      </main>

      {/* Understated academic footer */}
      <footer className="border-t border-border-dim bg-background/50 py-12 transition-colors duration-300">
        <div className="mx-auto max-w-6xl px-6 md:px-8 flex justify-center font-mono text-[9px] uppercase tracking-widest text-text-muted">
          <span>The Operating System // M. Dabgar // Lab Mind-Map &copy; 2026</span>
        </div>
      </footer>
    </>
  );
}
