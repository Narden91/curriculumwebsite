interface FundedProject {
  name: string;
  funder: string;
  period?: string;
  summary?: string;
  role: string;
  url?: string;
}

export const fundedProjects: FundedProject[] = [
  {
    name: "HERMES",
    funder: "Horizon Europe, UEF",
    period: "2026 - present",
    summary: "Graphene-based 100 Gbps THz communication unit.",
    role: "AI/ML lead: Python and C++ pipelines for Transfer Matrix Method optimisation and inverse-problem reconstruction from experimental photonic data; dashboards for spectral and material analysis. Includes an industrial secondment to Monozukuri S.p.A. (Rome).",
  },
  {
    name: "THz-Skin",
    funder: "EU-funded, UEF",
    period: "2026 - present",
    summary: "THz spectroscopy for accessible skin-cancer detection.",
    role: "AI/ML contributor: sample-library and data-analysis workflow design.",
  },
  {
    name: "MEATIC",
    funder: "Methods for Electromagnetic Analysis of Tokamak Structures",
    period: "2026 - present",
    role: "Data-analysis collaborator: ML workloads on CINECA HPC under project allocation.",
  },
  {
    name: "FUPA1",
    funder: "University of Cassino",
    role: "Data-analysis collaborator; CINECA HPC user under project allocation.",
  },
  {
    name: "CLEPSYDRA",
    funder: "Interreg Euro-MED",
    role: "Co-developer of the end-to-end Python ML and data-ingestion web platform.",
    url: "http://clepsydra-dss.eu:8008/Clepsydra_Frontend/",
  },
];
