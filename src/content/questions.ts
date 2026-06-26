export interface QuestionReference {
  title: string;
  link: string;
}

export interface ScientificQuestion {
  id: string;
  question: string;
  context: string;
  state: "Open" | "Investigating" | "Writing" | "Published" | "Dormant" | "Solved";
  hypothesis: string;
  equation: string;
  obsidianNote: string;
  references: QuestionReference[];
}

export const currentQuestions: ScientificQuestion[] = [
  {
    id: "pde-residual-structure",
    question: "How can optimization algorithms exploit the structure of PDE residuals rather than treating them as generic objective functions?",
    context: "PDE residuals encode physical laws. Standard optimizers treat them as arbitrary black-box functions. We aim to utilize residual gradients and local stiffness structures to guide step sizes.",
    state: "Investigating",
    hypothesis: "By decomposing PDE residuals into orthogonal projections of boundary constraints and domain conservation steps, we can compute step-size scales dynamically without expensive line searches.",
    equation: "\\mathcal{R}[u] = f \\quad \\Rightarrow \\quad \\nabla_\\theta \\mathcal{R}[u(\\theta)] \\cdot \\mathcal{R}[u(\\theta)] = 0",
    obsidianNote: "Observed that Adam oscillates heavily when boundary condition gradient vectors oppose domain residual gradient vectors. Orthogonal projection of gradients along the boundary kernel stabilizes optimization trajectories.",
    references: [
      { title: "Physics-Informed Neural Networks (Raissi et al., 2019)", link: "https://arxiv.org/abs/1711.10561" },
      { title: "Numerical Optimization (Nocedal & Wright)", link: "https://link.springer.com/book/10.1007/978-0-387-40065-5" }
    ]
  },
  {
    id: "adaptive-stiffness-pinns",
    question: "Can optimization methods adapt automatically to stiffness in Physics-Informed Neural Networks?",
    context: "Stiff PDE formulations yield highly ill-conditioned loss landscapes in PINNs. Optimization must dynamically balance domain residuals and boundary constraints without manual parameter tuning.",
    state: "Investigating",
    hypothesis: "Stiffness manifests as a highly ill-conditioned Hessian matrix with widely spread eigenvalues. Pre-conditioning via local curvature interpolations can bound the spectral radius of the gradient updates.",
    equation: "\\kappa(\\nabla^2 L) = \\frac{\\lambda_{\\max}}{\\lambda_{\\min}} \\gg 1 \\quad \\Rightarrow \\quad P \\approx (\\nabla^2 L)^{-1}",
    obsidianNote: "SCIO pre-conditioning matrix estimation in JAX remains computationally heavy. Working on diagonal curvature approximations to compute P cheaply without full backpropagation matrices.",
    references: [
      { title: "Understanding Stiff PDEs in SciML (Karniadakis et al., 2021)", link: "#" }
    ]
  },
  {
    id: "scientific-foundation-models",
    question: "How can scientific foundation models generalize across multiple physical systems?",
    context: "Can neural operators or transformers learn general representations of fluid flows, solid mechanics, and heat transfers, transferring knowledge between different PDEs?",
    state: "Open",
    hypothesis: "If fluid, thermal, and mechanical systems are governed by unified conservation equations, their representations share a low-dimensional manifold. Attention masks act as adaptive solvers for operator propagation.",
    equation: "\\mathcal{G}: \\mathcal{U} \\to \\mathcal{V} \\quad \\text{where} \\quad \\mathcal{G}(u) = \\int_{\\Omega} K(x, y) u(y) dy",
    obsidianNote: "Is operator learning just kernel smoothing? Yes, but parameterized by multi-head attention weights. Need to check spectral bias and high-frequency representation drift.",
    references: [
      { title: "Fourier Neural Operator (Li et al., 2020)", link: "https://arxiv.org/abs/2010.08895" }
    ]
  },
  {
    id: "inverse-sciml",
    question: "Can inverse problems in Scientific Machine Learning recover governing equations from sparse and noisy observations?",
    context: "Combining sparse physical sensor data with mathematical boundary constraints to reconstruct unknown coefficients or functional forms of physical laws.",
    state: "Writing",
    hypothesis: "By treating equation discovery as a sparse parameter optimization problem (SINDy), we can recover partial coefficients from noisy sensors using automated L1 regularization over coordinate bases.",
    equation: "\\frac{\\partial u}{\\partial t} = \\mathbf{\\Theta}(U)\\xi \\quad \\text{s.t.} \\quad \\|\\xi\\|_1 \\le \\gamma",
    obsidianNote: "L1 penalty works well for clean grid parameters. On noisy collocation points, differentiation suffers. Differentiating noisy data requires automatic filter kernels integrated into loss dynamics.",
    references: [
      { title: "Data-Driven Discovery of PDEs (Sudy et al., 2016)", link: "#" }
    ]
  },
  {
    id: "autonomous-agents-sciml",
    question: "How can autonomous AI agents accelerate scientific discovery without sacrificing mathematical rigor?",
    context: "Designing agent systems that plan, execute, and verify scientific computing models, cross-checking outputs with physical conservation laws.",
    state: "Open",
    hypothesis: "Designing active inference loops where agents formulate simulation parameters, evaluate loss gradients, and adjust collocation grid spacing to stabilize solver errors.",
    equation: "\\delta a = \\arg\\min_a \\mathcal{F}(\\theta, a) \\quad \\text{(Variational Free Energy)}",
    obsidianNote: "Agents should verify conservation laws as hard physics constraints. If mass balance fails, the agent must trigger automatic grid refinement or adjust scaling coefficients.",
    references: [
      { title: "Active Inference & Scientific AI (Friston et al.)", link: "#" }
    ]
  }
];
