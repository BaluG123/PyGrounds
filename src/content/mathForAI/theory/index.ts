import type { MathPhase } from '../../../types/mathTheory';
import { phase1Foundations } from './phase1-foundations';
import { phase2CoreML } from './phase2-coreML';
import { phase3DeepLearning } from './phase3-deepLearning';
import { phase4TransformersLLMs } from './phase4-transformersLLMs';
import { phase5RagAdvanced } from './phase5-ragAdvanced';
import { phase6ScalingOptimization } from './phase6-scalingOptimization';

export const MATH_THEORY_PHASES: MathPhase[] = [
  phase1Foundations,
  phase2CoreML,
  phase3DeepLearning,
  phase4TransformersLLMs,
  phase5RagAdvanced,
  phase6ScalingOptimization,
];

export function getPhaseById(phaseId: string): MathPhase | undefined {
  return MATH_THEORY_PHASES.find(phase => phase.id === phaseId);
}

export function getTopicById(phaseId: string, topicId: string) {
  const phase = getPhaseById(phaseId);
  if (!phase) {
    return undefined;
  }
  const topic = phase.topics.find(item => item.id === topicId);
  if (!topic) {
    return undefined;
  }
  return { phase, topic };
}

export function getAllTopicsFlat() {
  return MATH_THEORY_PHASES.flatMap(phase =>
    phase.topics.map(topic => ({
      phaseId: phase.id,
      phaseTitle: phase.title,
      topicId: topic.id,
      title: topic.title,
      estMinutes: topic.estMinutes,
    })),
  );
}

export { phase1Foundations, phase2CoreML, phase3DeepLearning, phase4TransformersLLMs, phase5RagAdvanced, phase6ScalingOptimization };
