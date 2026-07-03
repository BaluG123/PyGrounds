import type { AcademicTrack } from '../../../types/academic';
import { MATH_THEORY_PHASES } from '../../mathForAI/theory';

/** Math track wraps existing 6 theory phases as academic modules */
export const trackMathForAI: AcademicTrack = {
  id: 'track-math-for-ai',
  title: 'Mathematics for AI',
  subtitle: 'Linear algebra, calculus, probability, and deep learning math',
  levelBadge: 'Math foundations for modern AI',
  courseIds: ['math-ai'],
  color: '#D4A843',
  accent: '#FFF5DC',
  termLabel: 'Term 3',
  modules: MATH_THEORY_PHASES.map(phase => ({
    id: phase.id,
    title: phase.title,
    subtitle: phase.subtitle,
    topics: phase.topics,
  })),
};
