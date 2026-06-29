"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowDown, 
  Activity, 
  FileText, 
  Code, 
  Briefcase, 
  Mail, 
  Award, 
  ExternalLink, 
  MapPin, 
  Calendar,
  ChevronRight,
  BookOpen,
  ArrowUpRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import MathematicalBackground from "@/components/MathematicalBackground";
import ResearchCard from "@/components/ResearchCard";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface HomeClientProps {
  research: any[];
  projects: any[];
  experience: any[];
  achievements: any[];
}

export default function HomeClient({
  research,
  projects,
  experience,
  achievements,
}: HomeClientProps) {
  const [selectedPillar, setSelectedPillar] = useState<string>("all");

  const pillars = [
    { id: "all", label: "All Coordinates" },
    { id: "Scientific Machine Learning", label: "Scientific ML" },
    { id: "Agentic AI", label: "Agentic AI" },
    { id: "Applied AI Systems", label: "Applied AI" }
  ];

  const filteredProjects = selectedPillar === "all"
    ? projects
    : projects.filter(p => p.category === selectedPillar);

  const skillsData = [
    {
      category: "Scientific ML",
      tags: ["PINNs", "Neural Operators (FNO/DeepONet)", "JAX", "Equinox", "Diffrax", "PDE Solvers", "Curvature Eigenspectrum"]
    },
    {
      category: "Deep Learning",
      tags: ["PyTorch", "Transformers", "Mamba", "Recurrent Depth Transformers", "CNNs", "Reinforcement Learning"]
    },
    {
      category: "Agentic AI",
      tags: ["ReAct Loop", "Tool Calling", "LangChain", "LangGraph", "LangSmith", "Multi-Agent Systems", "Sandboxed Execution", "AST Parsing"]
    },
    {
      category: "Backend & Systems",
      tags: ["FastAPI", "Docker", "IMAP/SMTP Triage"]
    },
    {
      category: "Programming",
      tags: ["Python", "C", "C++"]
    },
    {
      category: "Mathematics",
      tags: ["Numerical Optimization", "Curvature Preconditioning", "Partial Differential Equations", "Vector Calculus", "Linear Algebra"]
    }
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Mathematical Flow Background */}
      <MathematicalBackground />

      {/* Top sticky navigation bar */}
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 md:px-8 py-12 sm:py-20 space-y-32 flex-1">
        
        {/* Section 0: Hero / Identity */}
        <section className="min-h-[80vh] flex flex-col justify-center space-y-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Minimal portfolio tags */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10px] uppercase tracking-widest text-text-muted">
              <span className="text-sci-blue font-bold">Meet Dabgar</span>
              <span>//</span>
              <span>Scientific Machine Learning</span>
              <span>•</span>
              <span>Optimization</span>
              <span>•</span>
              <span>Agentic AI</span>
            </div>

            {/* Core Header Name */}
            <div className="space-y-3">
              <h1
                data-cursor="text"
                className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight leading-none text-foreground"
              >
                Meet Dabgar
              </h1>
              <p className="font-mono text-xs sm:text-sm uppercase tracking-wider text-sci-blue font-bold max-w-2xl leading-relaxed">
                Research Engineer working at the intersection of Scientific Machine Learning, Optimization, and Agentic AI.
              </p>
              <p className="font-serif text-sm italic text-text-muted">
                Integrated B.Tech-M.Tech in AI | Research Intern at Brown University
              </p>
            </div>
 
            {/* Scientific Intent Statement */}
            <p
              data-cursor="text"
              className="font-serif text-base sm:text-lg lg:text-xl max-w-3xl leading-relaxed text-foreground/90 font-light"
            >
              I study why neural network models struggle with boundary-value constraints and stiff physical systems. I build adaptive optimization algorithms, neural PDE solvers, and autonomous coding agents that make AI-driven scientific discovery stable, fast, and mathematically grounded.
            </p>
          </motion.div>
 
          {/* Action Trigger */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-6 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollToSection("research")}
              data-cursor="button"
              className="inline-flex items-center justify-center space-x-2 font-mono text-[10px] uppercase tracking-wider text-background bg-foreground hover:bg-sci-blue hover:text-white px-6 py-4 rounded transition-all duration-300 cursor-pointer shadow-sm"
            >
              <span>Examine Research</span>
              <ArrowDown className="h-3 w-3 animate-bounce" />
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              data-cursor="button"
              className="inline-flex items-center justify-center space-x-2 font-mono text-[10px] uppercase tracking-wider text-foreground border border-border-dim hover:border-sci-blue hover:text-sci-blue px-6 py-4 rounded transition-all duration-300 cursor-pointer bg-transparent"
            >
              <span>View Projects</span>
            </button>
            <a
              href="/resume.pdf"
              download="Meet_Dabgar_Resume.pdf"
              data-cursor="button"
              className="inline-flex items-center justify-center space-x-2 font-mono text-[10px] uppercase tracking-wider text-foreground border border-border-dim hover:border-sci-blue hover:text-sci-blue px-6 py-4 rounded transition-all duration-300 cursor-pointer bg-transparent"
            >
              <span>Download CV / Resume</span>
              <FileText className="h-3 w-3" />
            </a>
          </motion.div>
        </section>

        {/* Section 1: About / Biography */}
        <section id="about" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">
              01 // BIOGRAPHY
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              About Meet
            </h2>
            <div className="h-[1px] bg-border-dim w-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3 prose dark:prose-invert text-sm md:text-base leading-relaxed text-foreground/90 space-y-6">
              <p>
                I am an Integrated B.Tech–M.Tech student in Artificial Intelligence at the National Institute of Technology (NIT), Surat. My academic journey is driven by an obsession with understanding numerical boundaries: why deep architectures break down on stiff dynamical systems, and how structural preconditioning can enforce convergence bounds.
              </p>
              <p>
                To resolve high-frequency eigenvalue stiffness in physics-informed constraints, I formulated the **SCIO (Stiffness-Conditioned Interpolated Optimizer)**. This optimizer uses curvature-aware eigenspectrum bounds to pre-condition step lengths, mitigating gradient pathology on stiff collocation domains.
              </p>
              <p>
                This work led to my appointment as a Research Intern at **Brown University** under the guidance of Dr. Khemraj Shukla. At Brown, I focus on building high-performance JAX solvers, neural operators, and spectral scaling methods to model complex boundary layers. I am also an invited speaker at the **CRUNCH Group** at Brown University, invited by Dr. George Karniadakis to present my work on scientific machine learning optimizations.
              </p>
              <p>
                Beyond scientific ML, I engineer agentic AI architectures. I build autonomous, sandboxed developer loops that parse code syntax trees and run real-time compiler diagnostic feedback cycles, bridging scientific theory with enterprise system execution.
              </p>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div
                className="relative group border border-border-dim rounded-lg overflow-hidden bg-zinc-950 flex justify-center items-center"
                data-cursor="researcher"
              >
                <img
                  src="/meet-dabgar.jpg"
                  alt="Meet Dabgar"
                  className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 bg-black/70 border border-white/10 px-3 py-1 rounded backdrop-blur-sm pointer-events-none">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-white">
                    M. DABGAR // RESEARCH PORTRAIT
                  </span>
                </div>
              </div>

              {/* Research coordinates matrix */}
              <div className="border border-border-dim/80 rounded-lg p-4 bg-badge-bg/25 space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted block border-b border-border-dim/40 pb-1">// Core Coordinates</span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[9px] font-mono text-text-muted uppercase block">University</span>
                    <span className="font-semibold">NIT Surat, India</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-text-muted uppercase block">Affiliation</span>
                    <span className="font-semibold">Brown University</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-text-muted uppercase block">Focus Areas</span>
                    <span className="font-semibold text-sci-blue">SciML &bull; Agentic AI</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-text-muted uppercase block">Toolkit</span>
                    <span className="font-semibold">JAX, PyTorch, C++</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Research Projects */}
        <section id="research" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">
              02 // PRIMARY INVESTIGATION
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              Featured Research
            </h2>
            <div className="h-[1px] bg-border-dim w-full" />
            <p className="text-xs font-mono text-text-muted max-w-xl">
              Micro-publications detailing theoretical formulations, numerical optimization techniques, and empirical outcomes.
            </p>
          </div>
          <div className="space-y-6">
            {research.map((project) => (
              <ResearchCard key={project.id || project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* Section 3: Project Pillars */}
        <section id="projects" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">
              03 // CLASSIFIED DEVELOPMENT
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              Project Pillars
            </h2>
            <div className="h-[1px] bg-border-dim w-full" />
            <p className="text-xs font-mono text-text-muted max-w-xl">
              Engineering implementation coordinates, classified into Scientific Computing, Agentic Workflows, and Applied Deep Learning.
            </p>
          </div>

          {/* Pillars Tab Selector */}
          <div className="flex flex-wrap gap-2 border-b border-border-dim/40 pb-2">
            {pillars.map((pillar) => (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar.id)}
                data-cursor="button"
                className={`font-mono text-[10px] uppercase tracking-wider px-4 py-2 rounded-t-md transition-all cursor-pointer border-t border-x -mb-[9px] ${
                  selectedPillar === pillar.id
                    ? "bg-card-bg text-sci-blue border-border-dim border-b-background z-10 font-bold"
                    : "bg-transparent text-text-muted border-transparent hover:text-foreground"
                }`}
              >
                {pillar.label}
              </button>
            ))}
          </div>

          {/* Projects Asymmetrical Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  layout
                  key={project.slug}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className={`border border-border-dim rounded-lg bg-card-bg p-6 space-y-4 hover:border-sci-blue/60 transition-all duration-300 flex flex-col justify-between ${
                    project.featured && selectedPillar === "all" ? "md:col-span-2" : ""
                  }`}
                  data-cursor="explore"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-sci-blue bg-sci-blue/10 px-2.5 py-0.5 rounded border border-sci-blue/20">
                        {project.category}
                      </span>
                      <span className="font-mono text-[9px] text-text-muted">
                        {project.date}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold tracking-tight text-foreground">
                      {project.title}
                    </h3>

                    {project.technologies && (
                      <span className="block font-mono text-[8px] uppercase tracking-wider text-text-muted">
                        Stack: {project.technologies}
                      </span>
                    )}

                    <div className="space-y-2 text-xs">
                      <div>
                        <strong className="text-[10px] font-mono text-text-muted uppercase block">Problem:</strong>
                        <p className="text-foreground/80 leading-relaxed">{project.problem}</p>
                      </div>
                      <div>
                        <strong className="text-[10px] font-mono text-text-muted uppercase block">Solution:</strong>
                        <p className="text-foreground/90 leading-relaxed">{project.solution}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 pt-4 border-t border-border-dim/40 font-mono text-[9px] uppercase tracking-wider">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="button"
                        className="flex items-center space-x-1 text-text-muted hover:text-sci-blue transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    <span className="ml-auto text-[8px] text-text-muted font-normal lowercase italic">
                      {project.tags?.join(", ")}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Section 4: Experience Timeline */}
        <section id="experience" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">
              04 // CHRONOLOGICAL STATIONS
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              Research & Appointments
            </h2>
            <div className="h-[1px] bg-border-dim w-full" />
            <p className="text-xs font-mono text-text-muted max-w-xl">
              Chronological track of research internships and engineering appointments.
            </p>
          </div>

          <div className="relative pl-6 border-l border-border-dim space-y-12 ml-4">
            {experience.map((exp, idx) => (
              <div key={exp.slug} className="relative group space-y-2" data-cursor="journey">
                {/* Timeline node icon indicator */}
                <div className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-background border border-border-dim group-hover:border-sci-blue transition-colors flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-text-muted group-hover:bg-sci-blue transition-colors" />
                </div>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[9px] uppercase tracking-wider">
                  <span className="text-sci-blue font-bold">{exp.date}</span>
                  <span className="text-text-muted/50">//</span>
                  <span className="flex items-center text-text-muted">
                    <MapPin className="h-3 w-3 mr-0.5" />
                    {exp.location}
                  </span>
                  <span className="text-text-muted/50">//</span>
                  <span className="text-text-muted font-normal">Step 0{experience.length - idx}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                  <h3 className="font-serif text-lg font-bold tracking-tight text-foreground group-hover:text-sci-blue transition-colors">
                    {exp.title}
                  </h3>
                  <span className="font-serif text-sm font-bold text-sci-blue">
                    @ {exp.institution || exp.company}
                  </span>
                </div>

                <div className="text-xs leading-relaxed text-foreground/80 max-w-3xl journal-body space-y-2">
                  {/* Parsing description bullets if markdown rendering is not used directly */}
                  {exp.content.split("\n").map((line: string, lineIdx: number) => {
                    const cleanLine = line.replace(/^- /, "").trim();
                    if (!cleanLine) return null;
                    return (
                      <p key={lineIdx} className="flex items-start">
                        <ChevronRight className="h-3.5 w-3.5 text-sci-blue shrink-0 mt-0.5 mr-1.5" />
                        <span>{cleanLine}</span>
                      </p>
                    );
                  })}
                </div>

                {exp.tags && (
                  <div className="flex flex-wrap gap-1 pt-1.5">
                    {exp.tags.map((t: string, i: number) => (
                      <span key={i} className="font-mono text-[8px] bg-badge-bg/40 border border-border-dim/40 px-2 py-0.5 rounded text-text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Achievements */}
        <section id="achievements" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">
              05 // ACADEMIC RECOGNITION
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              Key Achievements
            </h2>
            <div className="h-[1px] bg-border-dim w-full" />
            <p className="text-xs font-mono text-text-muted max-w-xl">
              Academic honors, invitations, and milestones tracking professional research metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((ach) => (
              <div 
                key={ach.slug}
                className="border border-border-dim rounded-lg bg-card-bg p-5 space-y-3 flex flex-col justify-between hover:border-sci-blue/50 transition-colors duration-300"
                data-cursor="explore"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-border-dim/40 pb-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted">
                      {ach.date}
                    </span>
                    <Award className="h-4 w-4 text-sci-blue" />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-foreground">
                    {ach.title}
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {ach.content.replace(/---[\s\S]*?---/, "").trim()}
                  </p>
                </div>
                <span className="block font-mono text-[8px] uppercase tracking-wider text-sci-blue pt-2 font-semibold">
                  // {ach.org}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Skills Matrix */}
        <section id="skills" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">
              06 // THEORETICAL & APPLIED SKILLS
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              Skill Topologies
            </h2>
            <div className="h-[1px] bg-border-dim w-full" />
            <p className="text-xs font-mono text-text-muted max-w-xl">
              My engineering stack, grouped logically by scientific computation, deep architectures, and systems backend.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.map((cat, idx) => (
              <div 
                key={idx}
                className="border border-border-dim/80 rounded-lg p-5 bg-card-bg/40 space-y-4"
              >
                <h4 className="font-serif text-sm font-bold text-foreground border-b border-border-dim/50 pb-2 flex items-center justify-between">
                  <span>{cat.category}</span>
                  <span className="font-mono text-[9px] text-text-muted/65">Category 0{idx + 1}</span>
                </h4>
                
                <div className="flex flex-wrap gap-1.5">
                  {cat.tags.map((tag, tagIdx) => (
                    <span 
                      key={tagIdx}
                      className="font-mono text-[10px] uppercase bg-badge-bg border border-border-dim/50 px-2.5 py-1 rounded text-foreground font-semibold hover:border-sci-blue/40 hover:text-sci-blue transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Contact Coordinates */}
        <section id="contact" className="border-t border-border-dim pt-16 flex flex-col items-center text-center space-y-8 scroll-mt-24">
          <div className="space-y-2 text-center">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">
              07 // SIGNAL
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              Contact
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 max-w-3xl"
          >
            <p className="font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed text-foreground italic">
              &ldquo;Enforcing mathematical limits is not a constraint on AI—it is the precondition for intelligence.&rdquo;
            </p>
          </motion.div>

          <div className="h-[1px] bg-border-dim/60 w-32" />

          <div className="flex flex-wrap justify-center gap-6 font-mono text-xs uppercase tracking-wider">
            <a href="mailto:mdabgar2004@gmail.com" data-cursor="button" className="flex items-center space-x-1.5 text-text-muted hover:text-sci-blue transition-colors">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </a>
            <a href="https://github.com/MaverikVoid" target="_blank" rel="noopener noreferrer" data-cursor="button" className="flex items-center space-x-1.5 text-text-muted hover:text-sci-blue transition-colors">
              <GithubIcon className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/meetdabgarai" target="_blank" rel="noopener noreferrer" data-cursor="button" className="flex items-center space-x-1.5 text-text-muted hover:text-sci-blue transition-colors">
              <LinkedinIcon className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-border-dim bg-background/50 py-12 transition-colors duration-300">
        <div className="mx-auto max-w-6xl px-6 md:px-8 flex justify-center font-mono text-[9px] uppercase tracking-widest text-text-muted">
          <span>Meet Dabgar // Portfolio Coordinates &copy; 2026</span>
        </div>
      </footer>
    </>
  );
}
