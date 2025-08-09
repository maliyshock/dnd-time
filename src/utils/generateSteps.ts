type GenerateSteps = {
  steps: number[];
  multiplier: number;
};

export type Step = { label: number; value: number; id: string };

export function generateSteps({ steps, multiplier }: GenerateSteps) {
  return steps.map(step => ({ id: `${step}_${multiplier}`, label: step, value: step * multiplier }));
}
