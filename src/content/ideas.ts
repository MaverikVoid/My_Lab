export interface InfluentialIdea {
  id: string;
  title: string;
  type: "Book" | "Paper" | "Concept";
  author: string;
  coreIdea: string;
  whyItMattered: string;
  howItChangedThinking: string;
  whereApplied: string;
}

export const influentialIdeas: InfluentialIdea[] = [
  {
    id: "beginning-of-infinity",
    title: "The Beginning of Infinity",
    type: "Book",
    author: "David Deutsch",
    coreIdea: "All progress is the result of seeking good explanations—explanations that are hard to vary and align with reality.",
    whyItMattered: "Reframed research from mere curve-fitting data to constructing physical explanations that possess universal reach.",
    howItChangedThinking: "Shifted my focus towards seeking interpretable, physically consistent explanations instead of relying purely on statistical approximations.",
    whereApplied: "Enforcing physical conservation laws in neural loss functions rather than treating models as black-box interpolators."
  },
  {
    id: "numerical-optimization",
    title: "Numerical Optimization",
    type: "Book",
    author: "Jorge Nocedal & Stephen Wright",
    coreIdea: "The mathematical foundations of continuous search spaces, constraints, and trajectory convergences.",
    whyItMattered: "Showed me that learning is not a mystical process; it is a vector field trace navigating a high-dimensional loss geometry.",
    howItChangedThinking: "Convinced me that understanding curvature, stiffness, and step-size interpolation is fundamental to designing robust PINNs solvers.",
    whereApplied: "Formulating custom gradient projection steps in SCIO to handle ill-conditioned PDE landscapes."
  },
  {
    id: "fourier-neural-operator",
    title: "Fourier Neural Operator for Parametric PDEs",
    type: "Paper",
    author: "Zongyi Li et al.",
    coreIdea: "Learning mapping between infinite-dimensional function spaces by parameterizing the integral kernel in Fourier space, bypassing grid-resolution constraints.",
    whyItMattered: "It challenged the conventional grid-by-grid approach to scientific machine learning, showing that we should model operators, not discrete arrays.",
    howItChangedThinking: "Demonstrated the power of spectral methods in neural architectures, sparking my interest in operator learning.",
    whereApplied: "Studying generalization bounds and spectral bias when mapping continuous function spaces."
  },
  {
    id: "pinns-paper",
    title: "Physics-Informed Neural Networks",
    type: "Paper",
    author: "M. Raissi, P. Perdikaris, and G.E. Karniadakis",
    coreIdea: "Integrating physical laws described by partial differential equations directly into deep learning networks using automatic differentiation.",
    whyItMattered: "It introduced a simple, elegant paradigm to bridge the gap between classical numerical analysis and neural network approximations.",
    howItChangedThinking: "Made me realize that physics can act as a regularizer, changing my research trajectory toward Scientific ML.",
    whereApplied: "Investigating failure modes on stiff PDEs, leading to the development of the SCIO optimizer."
  },
  {
    id: "scientific-computing",
    title: "Scientific Computing: An Introductory Survey",
    type: "Book",
    author: "Michael T. Heath",
    coreIdea: "The study of algorithms and error analysis for continuous mathematical problems in science and engineering.",
    whyItMattered: "Enforced the importance of conditioning, floating-point arithmetic, stability, and rigorous convergence bounds.",
    howItChangedThinking: "Taught me that computational algorithms must respect discretization and rounding properties to be useful in practice.",
    whereApplied: "Analyzing PDE stiffness matrix conditioning during PINN training cycles."
  }
];
