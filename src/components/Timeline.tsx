"use client";

import { motion } from "framer-motion";
import { Award, Compass, BookOpen, Presentation, GraduationCap } from "lucide-react";
import React from "react";

interface Milestone {
  date: string;
  type: "Publication" | "Internship" | "Presentation" | "Academic" | "Project";
  title: React.ReactNode;
  description: React.ReactNode;
  institution: string;
}

const milestones: Milestone[] = [
  {
    date: "2026",
    type: "Publication",
    title: "IEEE TETCI Submission",
    description: "Submitted manuscript detailing stiffness-conditioned optimization bounds in Physics-Informed Neural Networks.",
    institution: "IEEE Transactions on Emerging Topics in Computational Intelligence"
  },
  {
    date: "2025",
    type: "Internship",
    title: "Research Intern",
    description: "Invited to work as a Research Intern under the guidance of Khemraj Shukla, studying adaptive PDE solvers and PINNs.",
    institution: "Brown University"
  },
  {
    date: "2025",
    type: "Project",
    title: (
      <>
        Developed{" "}
        <span
          data-concept="optimization"
          data-cursor="text"
          className="font-semibold underline decoration-sci-blue/30 hover:decoration-sci-blue cursor-help transition-colors"
        >
          SCIO
        </span>
      </>
    ),
    description: "Created SCIO (Stiffness-Conditioned Interpolated Optimizer), a JAX-based optimizer to automatically scale residuals in stiff PINNs.",
    institution: "Scientific ML Research"
  },
  {
    date: "2025",
    type: "Academic",
    title: (
      <>
        Started{" "}
        <span
          data-concept="scientific-ml"
          data-cursor="text"
          className="font-semibold underline decoration-sci-blue/30 hover:decoration-sci-blue cursor-help transition-colors"
        >
          Physics-Informed ML
        </span>
      </>
    ),
    description: "Shifted research focus towards the intersection of numerical analysis, continuous mechanics, and neural network approximations.",
    institution: "NIT Surat"
  },
  {
    date: "2025",
    type: "Project",
    title: "Built Movie Recommendation System",
    description: "Developed collaborative filtering and content-based recommendation systems using machine learning libraries.",
    institution: "Machine Learning Projects"
  },
  {
    date: "2024",
    type: "Academic",
    title: (
      <>
        Enrolled in Integrated B.Tech–M.Tech in{" "}
        <span
          data-concept="mathematics"
          data-cursor="text"
          className="font-semibold underline decoration-sci-blue/30 hover:decoration-sci-blue cursor-help transition-colors"
        >
          AI
        </span>
      </>
    ),
    description: "Started the dual-degree program in Artificial Intelligence, focusing on scientific computing and machine learning foundations.",
    institution: "NIT Surat"
  }
];

export default function Timeline() {
  const getIcon = (type: Milestone["type"]) => {
    switch (type) {
      case "Publication":
        return <BookOpen className="h-3 w-3 text-sci-blue" />;
      case "Presentation":
        return <Presentation className="h-3 w-3 text-sci-blue" />;
      case "Internship":
        return <Compass className="h-3 w-3 text-sci-blue" />;
      case "Academic":
        return <GraduationCap className="h-3 w-3 text-sci-blue" />;
      case "Project":
        return <Award className="h-3 w-3 text-sci-blue" />;
    }
  };

  return (
    <div className="relative pl-6 border-l border-border-dim space-y-10 ml-4 py-2 transition-colors duration-300">
      {milestones.map((ms, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.35, delay: idx * 0.1 }}
          className="relative group space-y-2"
          data-cursor="journey"
        >
          {/* Node marker */}
          <div className="absolute -left-[35px] top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-background border border-border-dim group-hover:border-sci-blue transition-colors">
            {getIcon(ms.type)}
          </div>

          {/* Time label */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] tracking-wider text-sci-blue font-bold">
              {ms.date}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted">
              // {ms.type}
            </span>
          </div>

          {/* Core Info */}
          <div className="space-y-1">
            <h4 className="font-serif text-lg font-semibold leading-tight text-foreground group-hover:text-sci-blue transition-colors">
              {ms.title}
            </h4>
            <p className="font-mono text-[9px] uppercase tracking-wider text-text-muted">
              {ms.institution}
            </p>
            <p className="text-xs leading-relaxed text-foreground/80 max-w-2xl">
              {ms.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
