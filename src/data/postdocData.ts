// Postdoc research topics at UEF, from the research plan and seminar series.
// Each `id` selects a schematic figure in components/figures/TopicFigure.tsx.

export type TopicId =
  | 'spectroscopy'
  | 'terahertz'
  | 'microscopy'
  | 'smlm'
  | 'diamond'
  | 'ultrafast'
  | 'identifiability'
  | 'differentiable'
  | 'uncertainty'
  | 'operators'
  | 'validation'
  | 'software'
  | 'agents'
  | 'hpc';

interface Topic {
  id: TopicId;
  title: string;
  summary: string;
  techniques: string[];
}

interface TopicGroup {
  title: string;
  intro: string;
  topics: Topic[];
}

export const postdocGroups: TopicGroup[] = [
  {
    title: 'Measurements',
    intro: 'Experimental systems where the data come from: light, electrons and quantum sensors.',
    topics: [
      {
        id: 'spectroscopy',
        title: 'High-dimensional spectroscopy and biophotonics',
        summary: 'Raman and FTIR spectra from small cohorts: clean preprocessing, sparse low-dimensional models and classifiers that survive confounders and patient-level leakage.',
        techniques: ['Baseline and cosmic-ray correction', 'PCA / PLS / sparse PLS', 'Group-aware validation', 'Permutation tests', 'DeepSets'],
      },
      {
        id: 'terahertz',
        title: 'Terahertz spectroscopy and optical inverse problems',
        summary: 'Recovering refractive index, absorption, permittivity and layer thickness from THz time-domain reflection and transmission, with realistic noise.',
        techniques: ['THz-TDS', 'Transfer Matrix Method', 'Fabry–Pérot and phase wrapping', 'Non-uniqueness', 'Laser RIN, delay-line jitter'],
      },
      {
        id: 'microscopy',
        title: 'Nanoscale electron microscopy',
        summary: 'Quantitative nanoparticle sizing from HRTEM images, with automatic scale calibration and every intermediate step kept traceable.',
        techniques: ['OCR scale calibration', 'Difference of Gaussians', 'Watershed', 'SAM segmentation'],
      },
      {
        id: 'smlm',
        title: 'Single-molecule localisation and photophysics',
        summary: 'Sub-pixel localisation of single emitters and kinetic models of fluorophore blinking and bleaching.',
        techniques: ['Gaussian PSF fitting', 'Drift correction', 'Markov state models', 'Dwell-time distributions'],
      },
      {
        id: 'diamond',
        title: 'Diamond quantum biosensing',
        summary: 'Local pH sensing with nitrogen-vacancy centres in diamond microneedles, separating stochastic signal dynamics from slow experimental drift.',
        techniques: ['NV centres', 'PCA tip isolation', 'Image thresholding', 'Stationary AR(2)'],
      },
      {
        id: 'ultrafast',
        title: 'Ultrafast laser–matter interaction',
        summary: 'Femtosecond ablation of diamond and wide-bandgap materials: threshold fluence, penetration depth and which physical description the data support.',
        techniques: ['Multiphoton absorption', 'Threshold fluence', 'AICc model comparison', 'Local vs non-local response'],
      },
    ],
  },
  {
    title: 'Methods',
    intro: 'Machine learning tied to physical models, identifiability and statistically valid evidence.',
    topics: [
      {
        id: 'identifiability',
        title: 'Identifiability and optimal experimental design',
        summary: 'Finding which parameter combinations a measurement can constrain, and choosing geometries and thicknesses that carry the most information before measuring.',
        techniques: ['Sensitivity Jacobians', 'Fisher information', 'Cramér–Rao bounds', 'Design optimisation'],
      },
      {
        id: 'differentiable',
        title: 'Physics-guided, differentiable machine learning',
        summary: 'Automatic differentiation through Maxwell and TMM forward models, physics-based reconstruction losses and neural surrogates, benchmarked against numerical solvers.',
        techniques: ['Differentiable forward models', 'Physics-based losses', 'Neural surrogates', 'Solver baselines'],
      },
      {
        id: 'uncertainty',
        title: 'Uncertainty quantification and Bayesian inversion',
        summary: 'Posterior distributions instead of point estimates, including the multi-modal solutions of ill-posed problems, with coverage checked empirically.',
        techniques: ['Normalizing flows', 'Multi-modal posteriors', 'Conformal prediction', 'Coverage validation'],
      },
      {
        id: 'operators',
        title: 'Spatial transport and neural operators',
        summary: 'Testing whether transport-like terms improve prediction on held-out experiments, without over-claiming a unique microscopic mechanism.',
        techniques: ['Laplacian corrections', 'Fourier Neural Operators', 'Held-out experiments'],
      },
      {
        id: 'validation',
        title: 'Statistical learning and scientific validation',
        summary: 'The cross-cutting core: small-sample inference, nested and grouped cross-validation, sparsity and explicit comparison with simpler baselines.',
        techniques: ['Nested / grouped CV', 'Permutation tests', 'Regularisation', 'Confounder sensitivity', 'Baselines'],
      },
    ],
  },
  {
    title: 'Infrastructure',
    intro: 'Software, AI tooling and compute that make the analyses reproducible and fast.',
    topics: [
      {
        id: 'software',
        title: 'Scientific software engineering',
        summary: 'Turning research notebooks into tested Python packages and command-line tools shared across spectroscopy, imaging and inverse modelling.',
        techniques: ['Packages and CLIs', 'Unit and regression tests', 'Physical-invariant tests', 'Provenance and logging'],
      },
      {
        id: 'agents',
        title: 'LLMs and agentic AI for research',
        summary: 'AI assistance for code, documentation, literature triage and consistency checks, with human review, restricted permissions and provenance.',
        techniques: ['Code generation and review', 'Literature triage', 'MCP tool access', 'Data governance'],
      },
      {
        id: 'hpc',
        title: 'High-performance computing',
        summary: 'Parallel cross-validation, Monte Carlo studies and GPU training on CSC Roihu, with data on Allas.',
        techniques: ['CSC Roihu (x86 CPU, GH200 GPU)', 'Parallel CV and Monte Carlo', 'GPU differentiable physics', 'Allas storage'],
      },
    ],
  },
];

export const postdocSummary =
  'AI/ML, statistical inference, computational physics and research software for experimental photonics.';
