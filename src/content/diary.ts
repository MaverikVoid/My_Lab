export interface LossPoint {
  epoch: number;
  loss: number;
}

export interface DiaryEntry {
  week: string;
  date: string;
  experiment: string;
  observation: string;
  successes: string;
  mistakes: string;
  deadEnds: string;
  newHypothesis: string;
  codeSnippet?: string;
  lossCurve?: LossPoint[];
}

export const diaryEntries: DiaryEntry[] = [
  {
    week: "Log Week 01 // Spectral Operator Mapping",
    date: "2026-06-01",
    experiment: "Studying infinite-dimensional mapping in Neural Operators to bypass grid constraints.",
    observation: "Integral kernel projections learn continuous global physics but exhibit severe high-frequency attenuation.",
    successes: "Constructed Fourier coefficient projection step that maps functions independent of discretization resolutions.",
    mistakes: "Attempted standard bilinear coordinates interpolation across irregular boundaries, leading to interpolation leaks.",
    deadEnds: "Mapping directly to localized grids scales poorly ($O(N^2)$) on high-dimensional PDEs.",
    newHypothesis: "Can we decouple low and high frequencies using parallel attention-modulated kernels?",
    codeSnippet: `def spectral_kernel_2d(x, y, w_spec):
    # JAX spectral coordinate projection
    x_ft = jnp.fft.rfft2(x)
    # Apply spectral weight scaling
    out_ft = x_ft * w_spec
    return jnp.fft.irfft2(out_ft)`,
    lossCurve: [
      { epoch: 0, loss: 0.85 },
      { epoch: 100, loss: 0.52 },
      { epoch: 200, loss: 0.41 },
      { epoch: 300, loss: 0.38 },
      { epoch: 400, loss: 0.37 }
    ]
  },
  {
    week: "Log Week 02 // DeepONet Trunk Saturation",
    date: "2026-06-08",
    experiment: "Implemented DeepONet branch and trunk networks for parametric PDEs.",
    observation: "The trunk network suffers from spectral bias, learning low-frequency boundaries while ignoring sharp shocks.",
    successes: "Mapped spatial coordinates using random Fourier features to lift trunk inputs.",
    mistakes: "Sustained trunk depth without residual links, leading to vanishing backpropagation updates.",
    deadEnds: "Increasing width of trunk network alone doesn't resolve L2 error stalls on high-wavenumber Helmholtz.",
    newHypothesis: "Injecting residual connections into the branch network balances multi-scale feature propagation.",
    codeSnippet: `def forward_deeponet(branch_in, trunk_in, params):
    # Branch and Trunk inner product projection
    u = mlp_forward(branch_in, params['branch'])
    v = mlp_forward(trunk_in, params['trunk'])
    return jnp.sum(u * v, axis=-1)`,
    lossCurve: [
      { epoch: 0, loss: 0.95 },
      { epoch: 200, loss: 0.61 },
      { epoch: 400, loss: 0.44 },
      { epoch: 600, loss: 0.31 },
      { epoch: 800, loss: 0.28 }
    ]
  },
  {
    week: "Log Week 03 // SCIO Allen-Cahn Tests",
    date: "2026-06-15",
    experiment: "Testing SCIO on stiff 1D/2D Allen-Cahn equations to evaluate step-size preconditioning.",
    observation: "Boundary stiffness creates sharp transition layers that trigger Adam oscillation cycles.",
    successes: "Damped limit cycle oscillations completely by projecting steps along local Hessian manifolds.",
    mistakes: "Computing full 1000x1000 Hessian matrices inside the training loop is computationally heavy ($O(N^3)$).",
    deadEnds: "Quasi-Newton BFGS updates oscillate near sharp boundary saddle zones.",
    newHypothesis: "Using diagonal Hessian approximations plus line step interpolation can reduce computation to linear complexity.",
    codeSnippet: `def scio_update(theta, grads, h_diag, lr, eta):
    # Curvature scale projection
    precond = 1.0 / (jnp.maximum(h_diag, 1e-4))
    step = precond * grads
    # Interpolated parameter shift
    return theta - lr * step * eta`,
    lossCurve: [
      { epoch: 0, loss: 0.72 },
      { epoch: 500, loss: 0.12 },
      { epoch: 1000, loss: 0.015 },
      { epoch: 1500, loss: 0.0008 },
      { epoch: 2000, loss: 0.00012 }
    ]
  }
];
