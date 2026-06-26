export interface DiaryEntry {
  week: string;
  date: string;
  experiment: string;
  observation: string;
  failure: string;
  newHypothesis: string;
}

export const diaryEntries: DiaryEntry[] = [
  {
    week: "Week 1: Neural Operators",
    date: "2026-06-01",
    experiment: "Started studying Neural Operators.",
    observation: "Operator learning generalizes functions instead of grids.",
    failure: "Struggling to map grid coordinates to general spaces cleanly.",
    newHypothesis: "Can this improve inverse problems?"
  },
  {
    week: "Week 2: DeepONet Implementation",
    date: "2026-06-08",
    experiment: "Implemented DeepONet.",
    observation: "Generalization bottleneck on out-of-distribution coordinates.",
    failure: "High-frequency details are lost.",
    newHypothesis: "Currently working on this topic."
  },
  {
    week: "Week 3: SCIO Testing",
    date: "2026-06-15",
    experiment: "SCIO experiment testing on Allen-Cahn equation.",
    observation: "Adaptive learning dynamics show promise but are not yet stable.",
    failure: "Loss oscillates near saddle points.",
    newHypothesis: "Refining stiffness pre-conditioning matrix."
  }
];
