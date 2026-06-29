"use client";

import React, { useState } from "react";

// 1. LossCurve component
export function LossCurve() {
  const points = [
    { epoch: 0, loss: 1.0 },
    { epoch: 100, loss: 0.5 },
    { epoch: 200, loss: 0.25 },
    { epoch: 300, loss: 0.12 },
    { epoch: 400, loss: 0.08 },
    { epoch: 500, loss: 0.05 },
  ];

  return (
    <div className="border border-border-dim rounded bg-badge-bg/20 p-4 my-6 space-y-3 font-mono text-[10px]">
      <span className="text-sci-blue font-bold uppercase tracking-wider block">Interactive JAX Training Loss Curve</span>
      <div className="relative h-32 w-full flex items-end border-l border-b border-border-dim/80 pb-1 pl-1">
        {points.map((p, idx) => {
          const height = `${p.loss * 100}%`;
          const left = `${(idx / (points.length - 1)) * 90 + 5}%`;
          return (
            <div key={idx} className="absolute group" style={{ left, bottom: 0, height }}>
              {/* Dot */}
              <div className="h-2 w-2 rounded-full bg-sci-blue -translate-y-1 -translate-x-1 cursor-crosshair group-hover:scale-150 transition-transform" />
              {/* Line segment approximation (optional or simple) */}
              <span className="hidden group-hover:block absolute -top-8 -left-4 bg-black/80 text-white p-1 rounded whitespace-nowrap text-[8px] z-10">
                Ep {p.epoch}: {p.loss.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-text-muted text-[8px] uppercase tracking-wider pt-1">
        <span>Epoch 0</span>
        <span>Epoch 500</span>
      </div>
    </div>
  );
}

// 2. InteractiveEquation component
export function InteractiveEquation() {
  const [activeTerm, setActiveTerm] = useState<string | null>(null);

  const glossary: { [key: string]: string } = {
    L: "Total physics-informed loss function minimized during training.",
    L_PDE: "Domain residual loss enforcing physical conservation laws (e.g. Navier-Stokes, wave equations).",
    lambda: "Adaptive weight scaling parameter (e.g. projected via SCIO local eigenvalues).",
    L_BC: "Boundary conditions loss enforcing Dirichlet/Neumann constraint margins.",
  };

  return (
    <div className="border border-border-dim rounded bg-badge-bg/25 p-5 my-6 flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-2 text-xl font-serif text-sci-blue select-none">
        <span
          onMouseEnter={() => setActiveTerm("L")}
          onMouseLeave={() => setActiveTerm(null)}
          className={`cursor-help px-1 rounded transition-colors ${activeTerm === "L" ? "bg-sci-blue/20" : ""}`}
        >
          L
        </span>
        <span>=</span>
        <span
          onMouseEnter={() => setActiveTerm("L_PDE")}
          onMouseLeave={() => setActiveTerm(null)}
          className={`cursor-help px-1 rounded transition-colors ${activeTerm === "L_PDE" ? "bg-sci-blue/20" : ""}`}
        >
          L_PDE
        </span>
        <span>+</span>
        <span
          onMouseEnter={() => setActiveTerm("lambda")}
          onMouseLeave={() => setActiveTerm(null)}
          className={`cursor-help px-1 rounded transition-colors ${activeTerm === "lambda" ? "bg-sci-blue/20 text-sci-blue" : ""}`}
        >
          &lambda;
        </span>
        <span
          onMouseEnter={() => setActiveTerm("L_BC")}
          onMouseLeave={() => setActiveTerm(null)}
          className={`cursor-help px-1 rounded transition-colors ${activeTerm === "L_BC" ? "bg-sci-blue/20" : ""}`}
        >
          L_BC
        </span>
      </div>

      <div className="font-mono text-[9px] text-center min-h-[1.5rem] text-text-muted max-w-sm">
        {activeTerm ? (
          <span className="text-foreground">
            <strong>{activeTerm}:</strong> {glossary[activeTerm]}
          </span>
        ) : (
          "Hover variables in the equation to inspect their physical definitions."
        )}
      </div>
    </div>
  );
}

// 3. ExperimentViewer component
export function ExperimentViewer() {
  const [stiffness, setStiffness] = useState<number>(0.001);

  return (
    <div className="border border-border-dim rounded bg-card-bg p-5 my-6 space-y-4 font-mono text-[10px]">
      <div className="flex justify-between items-center border-b border-border-dim/40 pb-2">
        <span className="text-sci-blue font-bold uppercase tracking-wider">SciML Solver Comparison Matrix</span>
        <div className="flex items-center space-x-2">
          <span className="text-text-muted text-[8px] uppercase">Stiffness (Epsilon):</span>
          <select
            value={stiffness}
            onChange={(e) => setStiffness(parseFloat(e.target.value))}
            className="bg-black/50 border border-border-dim rounded px-1.5 py-0.5 text-foreground focus:outline-none"
          >
            <option value={0.1}>0.1 (Mild)</option>
            <option value={0.01}>0.01 (Medium)</option>
            <option value={0.001}>0.001 (Stiff)</option>
          </select>
        </div>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border-dim/30 text-text-muted text-[8px] uppercase tracking-wider">
            <th className="pb-2">Algorithm</th>
            <th className="pb-2">Convergence</th>
            <th className="pb-2">L2 Error</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border-dim/10">
            <td className="py-2 text-foreground font-semibold">Standard Adam</td>
            <td className="py-2">
              {stiffness <= 0.01 ? (
                <span className="text-red-400">Limit Cycle Oscillations</span>
              ) : (
                <span className="text-foreground">Slow (45k epochs)</span>
              )}
            </td>
            <td className="py-2">{stiffness <= 0.01 ? "2.3e-1 (Unstable)" : "4.5e-3"}</td>
          </tr>
          <tr className="border-b border-border-dim/10">
            <td className="py-2 text-foreground font-semibold">L-BFGS</td>
            <td className="py-2">
              {stiffness <= 0.001 ? (
                <span className="text-red-400">Linesearch Fails</span>
              ) : (
                <span className="text-foreground">Converges (18k epochs)</span>
              )}
            </td>
            <td className="py-2">{stiffness <= 0.001 ? "NaN / Exploded" : "9.8e-4"}</td>
          </tr>
          <tr className="text-sci-blue font-bold">
            <td className="py-2">SCIO (Ours)</td>
            <td className="py-2">Converges ({stiffness <= 0.001 ? "2.5k" : "1.2k"} epochs)</td>
            <td className="py-2">{stiffness <= 0.001 ? "1.2e-4" : "8.5e-5"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export const mdxComponents = {
  LossCurve,
  InteractiveEquation,
  ExperimentViewer,
};
