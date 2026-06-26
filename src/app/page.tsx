"use client";

import { motion } from "framer-motion";
import { ArrowDown, HelpCircle, Network, FileCode, BookOpen, Clock, Activity, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import MathematicalBackground from "@/components/MathematicalBackground";
import ResearchCard from "@/components/ResearchCard";
import ThinkingSection from "@/components/ThinkingSection";
import ResearchDiary from "@/components/ResearchDiary";
import CurrentQuestions from "@/components/CurrentQuestions";
import Timeline from "@/components/Timeline";
import KnowledgeGraph from "@/components/KnowledgeGraph";
import { researchProjects } from "@/content/research";

export default function Home() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Mathematical Attractor / Flow Background */}
      <MathematicalBackground />

      {/* Top sticky navigation bar */}
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 md:px-8 py-16 sm:py-24 space-y-32 flex-1">
        
        {/* Section 0: Hero / Identity */}
        <section className="min-h-[75vh] flex flex-col justify-center space-y-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Minimal scientific tags */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10px] uppercase tracking-widest text-text-muted">
              <span className="text-sci-blue font-bold">Meet Dabgar</span>
              <span>//</span>
              <span
                data-concept="scientific-ml"
                data-cursor="text"
                className="hover:text-sci-blue cursor-help transition-colors"
              >
                Scientific Machine Learning
              </span>
              <span>•</span>
              <span
                data-concept="scientific-ml"
                data-cursor="text"
                className="hover:text-sci-blue cursor-help transition-colors"
              >
                Physics-Informed ML
              </span>
              <span>•</span>
              <span
                data-concept="optimization"
                data-cursor="text"
                className="hover:text-sci-blue cursor-help transition-colors"
              >
                Optimization
              </span>
              <span>•</span>
              <span>Scientific Computing</span>
            </div>

            {/* Core Header Name */}
            <div className="space-y-2">
              <h1
                data-cursor="text"
                className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight leading-none text-foreground"
              >
                Meet Dabgar
              </h1>
              <p className="font-mono text-xs uppercase tracking-wider text-sci-blue font-bold">
                Scientific Machine Learning Researcher
              </p>
              <p className="font-serif text-sm italic text-text-muted">
                Optimization &bull; Physics-Informed Machine Learning &bull; Scientific Computing
              </p>
            </div>

            {/* Scientific Intent Statement */}
            <p
              data-cursor="text"
              className="font-serif text-base sm:text-lg lg:text-xl max-w-3xl leading-relaxed text-foreground/90 font-light"
            >
              I develop optimization methods and machine learning algorithms for scientific computing, with a focus on Physics-Informed Machine Learning and scientific foundation models. My research aims to make scientific AI more stable, efficient, and mathematically grounded.
            </p>
          </motion.div>

          {/* Action Trigger */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <button
              onClick={() => scrollToSection("research")}
              data-cursor="button"
              className="inline-flex items-center space-x-2 font-mono text-[10px] uppercase tracking-wider text-background bg-foreground hover:bg-sci-blue hover:text-white px-6 py-4 rounded transition-all duration-300 cursor-pointer shadow-sm"
            >
              <span>Enter the Laboratory</span>
              <ArrowDown className="h-3 w-3 animate-bounce" />
            </button>
            <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted sm:ml-2">
              Scroll down to explore the evolution of ideas.
            </span>
          </motion.div>
        </section>

        {/* Section 1: Active Inquiries (Current Questions) */}
        <section id="questions" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">
              01 // ACTIVE INQUIRIES
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              Current Questions
            </h2>
            <div className="h-[1px] bg-border-dim w-full" />
            <p className="text-xs font-mono text-text-muted max-w-xl">
              Scientific problems currently occupying my workspace. These represent open loops under active theoretical formulation.
            </p>
          </div>
          <CurrentQuestions />
        </section>

        {/* Section 2: Research Publications */}
        <section id="research" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">
              02 // FORMAL RESEARCH
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              Research Publications
            </h2>
            <div className="h-[1px] bg-border-dim w-full" />
            <p className="text-xs font-mono text-text-muted max-w-xl">
              Structured research projects formatted as micro-publications. Hover or click to inspect problem, methodology, and empirical outcomes.
            </p>
          </div>
          <div className="space-y-6">
            {researchProjects.map((project) => (
              <ResearchCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* Section 3: Knowledge Landscape Graph */}
        <section id="knowledge-graph" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">
              03 // DISCIPLINE TOPOLOGY
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              Knowledge Landscape
            </h2>
            <div className="h-[1px] bg-border-dim w-full" />
            <p className="text-xs font-mono text-text-muted max-w-xl">
              An interactive network mapping the cross-connections between my areas of study. Select any node to trace papers, notes, and related fields.
            </p>
          </div>
          <KnowledgeGraph />
        </section>

        {/* Section 4: Thinking (Essays) */}
        <section id="thinking" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">
              04 // SCIENTIFIC THINKING
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              Thinking
            </h2>
            <div className="h-[1px] bg-border-dim w-full" />
            <p className="text-xs font-mono text-text-muted max-w-xl">
              Extended essays and notes examining optimization, dynamical mechanics, and the biological/variational principles of natural and artificial intelligence.
            </p>
          </div>
          <ThinkingSection />
        </section>

        {/* Section 5: Laboratory Notebook (Diary) */}
        <section id="diary" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">
              05 // EMPIRICAL LOGBOOK
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              Research Diary
            </h2>
            <div className="h-[1px] bg-border-dim w-full" />
            <p className="text-xs font-mono text-text-muted max-w-xl">
              An unpolished laboratory log detailing active experiments, empirical failures, and ongoing hypotheses. A transparent account of numerical errors and system behaviors.
            </p>
          </div>
          <ResearchDiary />
        </section>

        {/* Section 6: Academic Timeline */}
        <section id="timeline" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">
              06 // CHRONOLOGY OF MILESTONES
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              Research Timeline
            </h2>
            <div className="h-[1px] bg-border-dim w-full" />
            <p className="text-xs font-mono text-text-muted max-w-xl">
              A curated timeline tracking major academic milestones, talks, publications, and professional research appointments.
            </p>
          </div>
          <Timeline />
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-border-dim bg-background/50 py-12 transition-colors duration-300">
        <div className="mx-auto max-w-6xl px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[10px] uppercase tracking-wider text-text-muted">
          <div className="flex items-center space-x-2">
            <Activity className="h-3.5 w-3.5 text-sci-blue animate-pulse" />
            <span>Meet Dabgar &copy; 2026 // Scientific Mind Topology</span>
          </div>
          <div className="flex space-x-6">
            <a href="https://arxiv.org/" target="_blank" rel="noopener noreferrer" data-cursor="button" className="hover:text-sci-blue">arXiv</a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" data-cursor="button" className="hover:text-sci-blue">GitHub</a>
            <a href="https://scholar.google.com/" target="_blank" rel="noopener noreferrer" data-cursor="button" className="hover:text-sci-blue">Scholar</a>
          </div>
        </div>
      </footer>
    </>
  );
}
