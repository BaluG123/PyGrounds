import type { AcademicLab } from '../../../types/academic';
import { MATH_LABS } from '../../mathForAI/labs';

export const mathAcademicLabs: AcademicLab[] = MATH_LABS.map(lab => ({
  id: lab.id,
  trackId: 'track-math-for-ai',
  moduleId: lab.phaseId,
  title: lab.title,
  description: lab.description,
  snippets: lab.snippets,
}));
