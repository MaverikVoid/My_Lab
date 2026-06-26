export interface ScientificQuestion {
  id: string;
  question: string;
  context: string;
}

export const currentQuestions: ScientificQuestion[] = [
  {
    id: "pde-residual-structure",
    question: "How can optimization algorithms exploit the structure of PDE residuals rather than treating them as generic objective functions?",
    context: "PDE residuals encode physical laws. Standard optimizers treat them as arbitrary black-box functions. We aim to utilize residual gradients and local stiffness structures to guide step sizes."
  },
  {
    id: "adaptive-stiffness-pinns",
    question: "Can optimization methods adapt automatically to stiffness in Physics-Informed Neural Networks?",
    context: "Stiff PDE formulations yield highly ill-conditioned loss landscapes in PINNs. Optimization must dynamically balance domain residuals and boundary constraints without manual parameter tuning."
  },
  {
    id: "scientific-foundation-models",
    question: "How can scientific foundation models generalize across multiple physical systems?",
    context: "Can neural operators or transformers learn general representations of fluid flows, solid mechanics, and heat transfers, transferring knowledge between different PDEs?"
  },
  {
    id: "inverse-sciml",
    question: "Can inverse problems in Scientific Machine Learning recover governing equations from sparse and noisy observations?",
    context: "Combining sparse physical sensor data with mathematical boundary constraints to reconstruct unknown coefficients or functional forms of physical laws."
  },
  {
    id: "autonomous-agents-sciml",
    question: "How can autonomous AI agents accelerate scientific discovery without sacrificing mathematical rigor?",
    context: "Designing agent systems that plan, execute, and verify scientific computing models, cross-checking outputs with physical conservation laws."
  }
];
