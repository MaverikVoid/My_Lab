"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Link2, BookOpen, FileCode, Edit3, HelpCircle } from "lucide-react";

interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
  description: string;
  projects: string[];
  articles: { title: string; slug: string }[];
  notes: string;
  connections: string[];
}

const graphNodes: Node[] = [
  {
    id: "scientific-ml",
    name: "Scientific ML",
    x: 400,
    y: 220,
    description: "Integrating deep learning architectures with physical laws, conservation principles, and classical numerical solvers.",
    projects: ["SCIO: Stiffness-Conditioned Interpolated Optimizer"],
    articles: [
      { title: "Why PINNs Fail on Stiff PDEs", slug: "why-pinns-fail" },
      { title: "Understanding PDE Residual Geometry", slug: "residual-geometry" },
      { title: "Notes on Scientific Foundation Models", slug: "scientific-foundation-notes" }
    ],
    notes: "Grey-box systems combine the parameter speed of deep learning with the numerical stability of traditional mechanics.",
    connections: ["optimization", "pdes", "pinns", "neural-operators", "scientific-computing"]
  },
  {
    id: "optimization",
    name: "Optimization",
    x: 270,
    y: 160,
    description: "Multi-scale parameter searches, variational minimization, and gradient-based trajectory alignment.",
    projects: ["SCIO: Stiffness-Conditioned Interpolated Optimizer"],
    articles: [
      { title: "Optimization Beyond Adam", slug: "optimization-beyond-adam" }
    ],
    notes: "Every learning algorithm is fundamentally a path optimization through a loss landscape.",
    connections: ["scientific-ml", "finance", "pinns", "control-theory", "agentic-ai"]
  },
  {
    id: "pdes",
    name: "PDEs",
    x: 530,
    y: 160,
    description: "Partial Differential Equations representing fluid dynamics, electromagnetic fields, and diffusion processes.",
    projects: ["SCIO: Stiffness-Conditioned Interpolated Optimizer"],
    articles: [
      { title: "Why PINNs Fail on Stiff PDEs", slug: "why-pinns-fail" },
      { title: "Understanding PDE Residual Geometry", slug: "residual-geometry" }
    ],
    notes: "PDEs represent the continuous mathematical limits of local space-time interactions.",
    connections: ["scientific-ml", "neural-operators", "pinns", "scientific-computing", "functional-analysis"]
  },
  {
    id: "neural-operators",
    name: "Neural Operators",
    x: 620,
    y: 220,
    description: "Learning mesh-independent mapping functions between infinite-dimensional Hilbert spaces.",
    projects: [],
    articles: [
      { title: "Notes on Scientific Foundation Models", slug: "scientific-foundation-notes" }
    ],
    notes: "Unlike typical ML which is grid-bound, operators map functions directly to functions.",
    connections: ["pdes", "scientific-ml", "transformers", "functional-analysis"]
  },
  {
    id: "pinns",
    name: "PINNs",
    x: 400,
    y: 100,
    description: "Physics-Informed Neural Networks regularizing model fits using residual equations evaluated on collocation points.",
    projects: ["SCIO: Stiffness-Conditioned Interpolated Optimizer"],
    articles: [
      { title: "Why PINNs Fail on Stiff PDEs", slug: "why-pinns-fail" }
    ],
    notes: "Soft boundaries lead to stiffness; enforcing boundary criteria algebraically is essential.",
    connections: ["scientific-ml", "optimization", "pdes"]
  },
  {
    id: "transformers",
    name: "Transformers",
    x: 520,
    y: 300,
    description: "Self-attention operations modeling non-local dependencies and symbolic mathematical syntax representations.",
    projects: [],
    articles: [
      { title: "Notes on Scientific Foundation Models", slug: "scientific-foundation-notes" }
    ],
    notes: "Attention masks behave mathematically as adaptive kernel solvers for operator propagation.",
    connections: ["neural-operators", "agentic-ai"]
  },
  {
    id: "control-theory",
    name: "Control Theory",
    x: 280,
    y: 280,
    description: "Feedback loops, optimal trajectory stabilization, and Pontryagin's maximum principles.",
    projects: [],
    articles: [],
    notes: "Optimal control and neural backpropagation share the exact same adjoint-state mechanics.",
    connections: ["optimization", "finance", "agentic-ai"]
  },
  {
    id: "finance",
    name: "Finance",
    x: 180,
    y: 220,
    description: "Dynamical price systems, volatility estimations, and non-equilibrium thermodynamic market models.",
    projects: [],
    articles: [],
    notes: "Liquidity profiles flow according to localized micro-thermodynamic force fields.",
    connections: ["optimization", "control-theory"]
  },
  {
    id: "agentic-ai",
    name: "Agentic AI",
    x: 400,
    y: 340,
    description: "Autonomous reasoning loops, experimental hypothesis generators, and Active Inference systems.",
    projects: [],
    articles: [],
    notes: "Variational free energy minimization forces agents to modify the environment to match expectations.",
    connections: ["optimization", "transformers", "control-theory"]
  },
  {
    id: "functional-analysis",
    name: "Functional Analysis",
    x: 530,
    y: 60,
    description: "The mathematics of infinite-dimensional spaces, operators, and spectral decomposition functions.",
    projects: [],
    articles: [],
    notes: "The weight space of infinitely wide neural networks behaves according to reproducing kernel Hilbert space bounds.",
    connections: ["neural-operators", "pdes"]
  },
  {
    id: "scientific-computing",
    name: "Scientific Computing",
    x: 270,
    y: 60,
    description: "Numerical analysis, high-performance computing, JAX arrays, and finite-volume discretization solver engines.",
    projects: ["SCIO: Stiffness-Conditioned Interpolated Optimizer"],
    articles: [
      { title: "Understanding PDE Residual Geometry", slug: "residual-geometry" }
    ],
    notes: "Moving from traditional static grid meshes to continuous, differentiable numerical maps.",
    connections: ["pdes", "scientific-ml", "optimization"]
  }
];

export default function KnowledgeGraph() {
  const [selectedNode, setSelectedNode] = useState<Node>(graphNodes[0]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Helper to determine if an SVG link should be highlighted
  const isLinkActive = (fromId: string, toId: string) => {
    // If a node is selected, highlight links connected to it
    if (selectedNode && (selectedNode.id === fromId || selectedNode.id === toId)) {
      return selectedNode.connections.includes(fromId) || selectedNode.connections.includes(toId);
    }
    // If a node is hovered, highlight its links
    if (hoveredNode && (hoveredNode === fromId || hoveredNode === toId)) {
      const nodeObj = graphNodes.find(n => n.id === hoveredNode);
      return nodeObj ? nodeObj.connections.includes(fromId) || nodeObj.connections.includes(toId) : false;
    }
    return false;
  };

  // Pre-calculate all links to avoid drawing duplicates
  const links: { from: Node; to: Node }[] = [];
  const addedLinks = new Set<string>();

  graphNodes.forEach((node) => {
    node.connections.forEach((connId) => {
      const target = graphNodes.find((n) => n.id === connId);
      if (target) {
        const linkKey = [node.id, target.id].sort().join("-");
        if (!addedLinks.has(linkKey)) {
          addedLinks.add(linkKey);
          links.push({ from: node, to: target });
        }
      }
    });
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
      {/* SVG graph container */}
      <div className="lg:col-span-2 relative flex flex-col justify-between border border-border-dim rounded-lg bg-graph-bg overflow-hidden min-h-[380px] md:min-h-[480px] p-6 transition-colors duration-300">
        <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
          <Network className="h-4 w-4 text-sci-blue" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            Knowledge Landscape // Interactive Network
          </span>
        </div>

        <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center space-x-2 font-mono text-[9px] text-text-muted">
          <span>Click nodes to inspect research connections</span>
        </div>

        {/* The SVG Network Diagram */}
        <div className="w-full h-full flex items-center justify-center pt-8">
          <svg
            viewBox="100 20 580 360"
            className="w-full h-full max-h-[420px] select-none"
          >
            {/* Draw Links */}
            {links.map((link, idx) => {
              const active = isLinkActive(link.from.id, link.to.id);
              return (
                <motion.line
                  key={`link-${idx}`}
                  x1={link.from.x}
                  y1={link.from.y}
                  x2={link.to.x}
                  y2={link.to.y}
                  stroke={active ? "var(--sci-blue)" : "var(--graph-link)"}
                  strokeWidth={active ? 1.5 : 0.65}
                  strokeOpacity={active ? 0.8 : 0.35}
                  transition={{ duration: 0.3 }}
                />
              );
            })}

            {/* Draw Nodes */}
            {graphNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const isHovered = hoveredNode === node.id;
              const isConnected = selectedNode?.connections.includes(node.id) || isSelected;

              return (
                <g
                  key={node.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedNode(node)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Subtle outer glow ring on hover/selection */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 10 : isHovered ? 8 : 4}
                    fill="none"
                    stroke="var(--sci-blue)"
                    strokeWidth={1.5}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: isSelected || isHovered ? 0.3 : 0,
                      scale: isSelected ? 1.5 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Core Node Circle */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 5.5 : 4}
                    fill={
                      isSelected
                        ? "var(--sci-blue)"
                        : isConnected
                        ? "var(--foreground)"
                        : "var(--text-muted)"
                    }
                    animate={{
                      r: isSelected ? 5.5 : isHovered ? 5 : 4,
                    }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Node Title */}
                  <motion.text
                    x={node.x}
                    y={node.y - 10}
                    textAnchor="middle"
                    className="font-mono text-[9px] uppercase tracking-wider font-semibold"
                    fill={isSelected ? "var(--sci-blue)" : "var(--foreground)"}
                    animate={{
                      fill: isSelected
                        ? "var(--sci-blue)"
                        : isHovered
                        ? "var(--foreground)"
                        : "var(--text-muted)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {node.name}
                  </motion.text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Detail panel side card */}
      <div className="border border-border-dim rounded-lg bg-card-bg p-6 flex flex-col justify-between transition-colors duration-300">
        <AnimatePresence mode="wait">
          {selectedNode && (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-6 flex-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-border-dim pb-3">
                  <h3 className="font-serif text-2xl font-semibold tracking-tight text-sci-blue">
                    {selectedNode.name}
                  </h3>
                  <span className="font-mono text-[8px] bg-badge-bg px-2 py-0.5 rounded tracking-widest text-text-muted">
                    NODE INSPECT
                  </span>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-foreground">
                  {selectedNode.description}
                </p>

                <div className="mt-6 space-y-4">
                  {/* Private Notebook Note */}
                  <div className="bg-badge-bg/40 border border-border-dim/40 rounded p-3 text-[11px] leading-relaxed italic text-text-muted relative">
                    <Edit3 className="absolute right-3 top-3 h-3 w-3 text-text-muted/40" />
                    <span className="font-mono text-[8px] not-italic block uppercase tracking-wider text-text-muted/60 mb-1">
                      Laboratory Notebook Extract
                    </span>
                    &ldquo;{selectedNode.notes}&rdquo;
                  </div>

                  {/* Connected Projects */}
                  {selectedNode.projects.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted flex items-center space-x-1">
                        <FileCode className="h-3 w-3" />
                        <span>Core Research Projects</span>
                      </span>
                      <ul className="text-[11px] space-y-1 list-disc list-inside text-foreground/80 pl-1">
                        {selectedNode.projects.map((proj, i) => (
                          <li key={i} className="hover:text-sci-blue transition-colors">
                            {proj}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Connected Articles */}
                  {selectedNode.articles.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted flex items-center space-x-1">
                        <BookOpen className="h-3 w-3" />
                        <span>Associated Essays</span>
                      </span>
                      <div className="space-y-1 pl-1">
                        {selectedNode.articles.map((art, i) => (
                          <a
                            key={i}
                            href={`#thinking-${art.slug}`}
                            className="block text-[11px] text-foreground/80 hover:text-sci-blue transition-colors underline decoration-border-dim underline-offset-2"
                            onClick={(e) => {
                              e.preventDefault();
                              const el = document.getElementById(`thinking-${art.slug}`);
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}
                          >
                            {art.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Connections list */}
              <div className="border-t border-border-dim pt-4 mt-6">
                <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted flex items-center space-x-1">
                  <Link2 className="h-2.5 w-2.5" />
                  <span>Immediate Graph Connections</span>
                </span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedNode.connections.map((connId) => {
                    const connNode = graphNodes.find(n => n.id === connId);
                    return (
                      <button
                        key={connId}
                        onClick={() => {
                          const targetNode = graphNodes.find((n) => n.id === connId);
                          if (targetNode) setSelectedNode(targetNode);
                        }}
                        className="font-mono text-[9px] uppercase bg-badge-bg px-2 py-0.5 rounded hover:bg-sci-blue hover:text-white transition-colors cursor-pointer text-text-muted"
                      >
                        {connNode?.name || connId}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
