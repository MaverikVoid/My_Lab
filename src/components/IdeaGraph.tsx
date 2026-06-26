"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Link, Lightbulb, Compass, Award } from "lucide-react";

interface IdeaNode {
  id: string;
  name: string;
  x: number;
  y: number;
  description: string;
  tiesToIntelligence: string;
  connections: string[];
  isCenter?: boolean;
}

const ideaNodes: IdeaNode[] = [
  {
    id: "intelligence",
    name: "Intelligence",
    x: 400,
    y: 190,
    isCenter: true,
    description: "The core enigma: how physical systems process information, adapt, minimize entropy, and model reality.",
    tiesToIntelligence: "The focal point of all research. The ultimate goal is to understand the mathematical and physical principles from which general intelligence emerges.",
    connections: [
      "philosophy", "psychology", "optimization", "finance", "systems", 
      "scientific-computing", "agentic-ai", "mathematics", "neural-operators", 
      "pdes", "scientific-ml"
    ]
  },
  {
    id: "philosophy",
    name: "Philosophy",
    x: 290,
    y: 80,
    description: "Epistemology, active inference, and formal logic defining what can be known and how systems model truth.",
    tiesToIntelligence: "Teaches us how to ask correct questions. Epistemology provides the boundary rules for an agent's internal model of its environment.",
    connections: ["intelligence", "psychology", "systems"]
  },
  {
    id: "optimization",
    name: "Optimization",
    x: 220,
    y: 150,
    description: "The mechanics of learning: climbing down error manifolds via gradient descent and variational searches.",
    tiesToIntelligence: "Learning is optimization in action. Intelligence can be viewed as the asymptotic limit of a system optimizing its thermodynamic efficiency.",
    connections: ["intelligence", "scientific-ml", "finance", "systems"]
  },
  {
    id: "finance",
    name: "Finance",
    x: 200,
    y: 230,
    description: "Market structures modeled as multi-agent systems reacting to incomplete information under high uncertainty.",
    tiesToIntelligence: "Markets represent collective intelligence. Studying them teaches us how decentralized networks process noise and distribute decision-making.",
    connections: ["intelligence", "optimization"]
  },
  {
    id: "systems",
    name: "Systems",
    x: 250,
    y: 300,
    description: "Cybernetics, feedback loops, and self-regulating architectures that maintain integrity against entropy.",
    tiesToIntelligence: "Bridges control theory with agency. An intelligent system must govern itself, maintaining its boundary via predictive correction loops.",
    connections: ["intelligence", "philosophy", "optimization"]
  },
  {
    id: "scientific-computing",
    name: "Scientific Computing",
    x: 350,
    y: 320,
    description: "High-performance arrays, auto-diff compilers, and discrete approximations of continuous mathematics.",
    tiesToIntelligence: "The motor system of discovery. It gives us the computational machinery to execute, evaluate, and scale mathematical experiments.",
    connections: ["intelligence", "scientific-ml"]
  },
  {
    id: "agentic-ai",
    name: "Agentic AI",
    x: 450,
    y: 320,
    description: "Autonomous loops that design experiments, evaluate hypotheses, and build internal representations.",
    tiesToIntelligence: "The active embodiment of intelligence: closing the loop between perception, learning, and physical action in the real world.",
    connections: ["intelligence", "neural-operators"]
  },
  {
    id: "mathematics",
    name: "Mathematics",
    x: 550,
    y: 300,
    description: "The universal syntax: topology, differential geometry, and measure theory.",
    tiesToIntelligence: "The foundational language of intelligence. Geometry and algebra define the dimensional spaces where thoughts and mappings can exist.",
    connections: ["intelligence", "neural-operators", "pdes"]
  },
  {
    id: "neural-operators",
    name: "Neural Operators",
    x: 600,
    y: 230,
    description: "Learning mappings between function spaces rather than discrete pixel vectors.",
    tiesToIntelligence: "Represents infinite-dimensional reasoning. Translates continuous natural patterns directly into internal functional operations.",
    connections: ["intelligence", "mathematics", "pdes"]
  },
  {
    id: "pdes",
    name: "PDEs",
    x: 580,
    y: 150,
    description: "Partial Differential Equations representing continuous physical vector fields and boundary values.",
    tiesToIntelligence: "PDEs represent the physical laws of nature. Intelligence is the system that learns to resolve and exploit these continuous laws.",
    connections: ["intelligence", "pdes", "scientific-ml", "mathematics"]
  },
  {
    id: "scientific-ml",
    name: "Scientific ML",
    x: 510,
    y: 80,
    description: "Fusing deep neural networks with physical constraints and conservation principles.",
    tiesToIntelligence: "Bridges raw observation with physical reality. Represents structured induction where physical laws guide neural search spaces.",
    connections: ["intelligence", "pdes", "scientific-computing", "optimization"]
  },
  {
    id: "psychology",
    name: "Psychology",
    x: 400,
    y: 50,
    description: "Cognition, heuristics, and human reasoning biases formed under survival constraints.",
    tiesToIntelligence: "The primary biological baseline of intelligence. Understanding human cognitive shortcuts guides how we model machine reasoning.",
    connections: ["intelligence", "philosophy"]
  }
];

export default function IdeaGraph() {
  const [selectedNode, setSelectedNode] = useState<IdeaNode>(ideaNodes[0]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const isLinkActive = (fromId: string, toId: string) => {
    if (selectedNode && (selectedNode.id === fromId || selectedNode.id === toId)) {
      return selectedNode.connections.includes(fromId) || selectedNode.connections.includes(toId);
    }
    if (hoveredNode && (hoveredNode === fromId || hoveredNode === toId)) {
      const nodeObj = ideaNodes.find(n => n.id === hoveredNode);
      return nodeObj ? nodeObj.connections.includes(fromId) || nodeObj.connections.includes(toId) : false;
    }
    return false;
  };

  // Compile all links
  const links: { from: IdeaNode; to: IdeaNode }[] = [];
  const addedLinks = new Set<string>();

  ideaNodes.forEach((node) => {
    node.connections.forEach((connId) => {
      const target = ideaNodes.find((n) => n.id === connId);
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
      {/* SVG Network Canvas */}
      <div className="lg:col-span-2 relative flex flex-col justify-between border border-border-dim rounded-lg bg-graph-bg overflow-hidden min-h-[380px] md:min-h-[480px] p-6 transition-colors duration-300">
        <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
          <Network className="h-4 w-4 text-sci-blue" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            Topology of Mind // Connected Disciplines
          </span>
        </div>

        <div className="w-full h-full flex items-center justify-center pt-8">
          <svg viewBox="100 20 600 350" className="w-full h-full max-h-[420px] select-none">
            {/* Links */}
            {links.map((link, idx) => {
              const active = isLinkActive(link.from.id, link.to.id);
              const isCenterLink = link.from.isCenter || link.to.isCenter;
              return (
                <motion.line
                  key={`link-${idx}`}
                  x1={link.from.x}
                  y1={link.from.y}
                  x2={link.to.x}
                  y2={link.to.y}
                  stroke={active ? "var(--sci-blue)" : "var(--graph-link)"}
                  strokeWidth={active ? 1.5 : isCenterLink ? 0.75 : 0.4}
                  strokeOpacity={active ? 0.8 : isCenterLink ? 0.25 : 0.12}
                  transition={{ duration: 0.25 }}
                />
              );
            })}

            {/* Nodes */}
            {ideaNodes.map((node) => {
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
                  {/* Glowing perimeter ring */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={node.isCenter ? (isSelected ? 16 : 14) : (isSelected ? 10 : 8)}
                    fill="none"
                    stroke="var(--sci-blue)"
                    strokeWidth={1.5}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: isSelected || isHovered ? 0.35 : 0,
                      scale: isSelected ? 1.3 : 1
                    }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Core Node Circle */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={node.isCenter ? 8 : isSelected ? 5.5 : 4}
                    fill={
                      node.isCenter
                        ? "var(--sci-blue)"
                        : isSelected
                        ? "var(--sci-blue)"
                        : isConnected
                        ? "var(--foreground)"
                        : "var(--text-muted)"
                    }
                    animate={{
                      r: node.isCenter ? (isHovered ? 9.5 : 8) : isSelected ? 5.5 : isHovered ? 5 : 4
                    }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Node Name */}
                  <motion.text
                    x={node.x}
                    y={node.isCenter ? node.y + 22 : node.y - 10}
                    textAnchor="middle"
                    className="font-mono text-[9px] uppercase tracking-wider font-semibold"
                    fill={isSelected ? "var(--sci-blue)" : "var(--foreground)"}
                    animate={{
                      fill: isSelected
                        ? "var(--sci-blue)"
                        : isHovered
                        ? "var(--foreground)"
                        : "var(--text-muted)"
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
                    {selectedNode.isCenter ? "GRAPH CENTER" : "SYSTEM NODE"}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted block font-semibold">
                    Domain Scope
                  </span>
                  <p className="text-xs leading-relaxed text-foreground">
                    {selectedNode.description}
                  </p>
                </div>

                <div className="mt-6 bg-sci-blue/5 border border-sci-blue/15 rounded p-4 space-y-2">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-sci-blue font-semibold flex items-center space-x-1">
                    <Lightbulb className="h-3.5 w-3.5" />
                    <span>Ties to Intelligence</span>
                  </span>
                  <p className="text-[11px] leading-relaxed text-foreground/90 font-serif italic">
                    &ldquo;{selectedNode.tiesToIntelligence}&rdquo;
                  </p>
                </div>
              </div>

              {/* Connected node switches */}
              <div className="border-t border-border-dim pt-4 mt-6">
                <span className="font-mono text-[8px] uppercase tracking-wider text-text-muted flex items-center space-x-1">
                  <Link className="h-2.5 w-2.5 text-text-muted" />
                  <span>Immediate Links</span>
                </span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedNode.connections.map((connId) => {
                    const connNode = ideaNodes.find(n => n.id === connId);
                    return (
                      <button
                        key={connId}
                        onClick={() => {
                          const targetNode = ideaNodes.find((n) => n.id === connId);
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
