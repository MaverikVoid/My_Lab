export interface ResearchProject {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  category: "Scientific ML" | "Optimization" | "Dynamical Systems";
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
}

export const researchProjects: ResearchProject[] = [
  {
    id: "scio-optimizer",
    title: "SCIO: Stiffness-Conditioned Interpolated Optimizer",
    subtitle: "Adaptive optimization for Physics-Informed Neural Networks",
    date: "2025-12",
    category: "Optimization",
    tags: ["PINNs", "Optimization", "JAX", "Stiff PDEs"],
    problem: "Physics-Informed Neural Networks (PINNs) struggle to converge on stiff partial differential equations because of unbalanced loss terms and ill-conditioned landscapes.",
    idea: "Formulate a stiffness-conditioned interpolated optimizer that dynamically scales residual weights and interpolates parameter steps based on curvature metrics.",
    method: "Developed using JAX, SCIO evaluates the local Hessian eigenspectrum and adaptively projects gradient steps along stable manifolds.",
    results: "Manuscript in preparation.",
    experiments: "Testing on stiff 1D/2D equations including Allen-Cahn and high-frequency Helmholtz cavities.",
    openQuestions: "Can SCIO scale to high-dimensional systems without computing full Hessian matrices?",
    githubUrl: "https://github.com/meet-dabgar/scio-optimizer"
  }
];
