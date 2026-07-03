import type { MathLab } from '../../../types/mathLabs';
import { lab1LinearAlgebraCalculusProbability } from './lab1-linearAlgebraCalculusProbability';
import { lab2MlFundamentals } from './lab2-mlFundamentals';
import { lab3DeepLearning } from './lab3-deepLearning';
import { lab4AttentionTransformers } from './lab4-attentionTransformers';
import { lab5LlmTextProcessing } from './lab5-llmTextProcessing';
import { lab6PracticalProjects } from './lab6-practicalProjects';

export const MATH_LABS: MathLab[] = [
  lab1LinearAlgebraCalculusProbability,
  lab2MlFundamentals,
  lab3DeepLearning,
  lab4AttentionTransformers,
  lab5LlmTextProcessing,
  lab6PracticalProjects,
];

export function getLabById(labId: string): MathLab | undefined {
  return MATH_LABS.find(lab => lab.id === labId);
}

export function getLabsByPhaseId(phaseId: string): MathLab[] {
  return MATH_LABS.filter(lab => lab.phaseId === phaseId);
}

export {
  lab1LinearAlgebraCalculusProbability,
  lab2MlFundamentals,
  lab3DeepLearning,
  lab4AttentionTransformers,
  lab5LlmTextProcessing,
  lab6PracticalProjects,
};
