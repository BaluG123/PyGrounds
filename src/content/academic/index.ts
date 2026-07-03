import type { LibraryId } from '../../types/course';
import type { AcademicLab, AcademicTrack } from '../../types/academic';
import { trackPythonFoundation } from './tracks/track-pythonFoundation';
import { trackDataScience } from './tracks/track-dataScience';
import { trackMathForAI } from './tracks/track-mathForAI';
import { trackMachineLearning } from './tracks/track-machineLearning';
import { trackDeepLearning } from './tracks/track-deepLearning';
import { trackSpecializations } from './tracks/track-specializations';
import { trackAIEngineering } from './tracks/track-aiEngineering';
import { trackCapstone } from './tracks/track-capstone';
import { ACADEMIC_LABS } from './labs';

export const ACADEMIC_TRACKS: AcademicTrack[] = [
  trackPythonFoundation,
  trackDataScience,
  trackMathForAI,
  trackMachineLearning,
  trackDeepLearning,
  trackSpecializations,
  trackAIEngineering,
  trackCapstone,
];

/** Tracks are reached from course homes — not listed separately in the hub. */
export const HUB_VISIBLE_TRACKS: AcademicTrack[] = [];

/** When a track spans multiple courses, show only the modules for that course. */
const COURSE_MODULE_IDS: Partial<Record<LibraryId, string[]>> = {
  'python-basics': ['ac-py-module-core'],
  'python-advanced': ['ac-py-module-advanced'],
  numpy: ['ac-ds-module-numpy'],
  pandas: ['ac-ds-module-pandas-viz'],
  matplotlib: ['ac-ds-module-pandas-viz'],
  'machine-learning': ['mod-ac-ml-learning-foundations'],
  'scikit-learn': ['mod-ac-ml-practical-pipelines'],
  nlp: ['mod-spec-nlp'],
  genai: ['mod-spec-genai'],
  'computer-vision': ['mod-spec-cv'],
  'reinforcement-learning': ['mod-spec-rl'],
};

export function getModulesForCourse(courseId: LibraryId) {
  const track = getTrackByCourseId(courseId);
  if (!track) return [];
  const moduleIds = COURSE_MODULE_IDS[courseId];
  if (!moduleIds) return track.modules;
  return track.modules.filter(m => moduleIds.includes(m.id));
}

export const CURRICULUM_SECTIONS: { title: string; subtitle: string; courseIds: LibraryId[] }[] = [
  {
    title: 'Python Foundation',
    subtitle: 'Syntax, data structures, OOP, and clean code habits.',
    courseIds: ['python-basics', 'python-advanced'],
  },
  {
    title: 'Data Science Prerequisites',
    subtitle: 'NumPy, Pandas, and Matplotlib for real datasets.',
    courseIds: ['numpy', 'pandas', 'matplotlib'],
  },
  {
    title: 'Math for AI',
    subtitle: 'Linear algebra, statistics, probability, and optimization.',
    courseIds: ['math-ai'],
  },
  {
    title: 'Machine Learning',
    subtitle: 'Classical ML theory and scikit-learn pipelines.',
    courseIds: ['machine-learning', 'scikit-learn'],
  },
  {
    title: 'Deep Learning',
    subtitle: 'Neural networks, backprop, CNNs, RNNs, and transformers.',
    courseIds: ['deep-learning'],
  },
  {
    title: 'AI Specializations',
    subtitle: 'NLP, GenAI, computer vision, and reinforcement learning.',
    courseIds: ['nlp', 'genai', 'computer-vision', 'reinforcement-learning'],
  },
  {
    title: 'Production & Capstone',
    subtitle: 'MLOps, LLMOps, responsible AI, and portfolio projects.',
    courseIds: ['ai-engineering', 'ai-projects'],
  },
];

export function getTrackById(trackId: string): AcademicTrack | undefined {
  return ACADEMIC_TRACKS.find(t => t.id === trackId);
}

export function getTrackByCourseId(courseId: LibraryId): AcademicTrack | undefined {
  const resolved = courseId === 'linear-algebra' ? 'math-ai' : courseId;
  return ACADEMIC_TRACKS.find(t => t.courseIds.includes(resolved));
}

export function getModuleById(trackId: string, moduleId: string) {
  const track = getTrackById(trackId);
  return track?.modules.find(m => m.id === moduleId);
}

export function getTopicById(trackId: string, moduleId: string, topicId: string) {
  const module = getModuleById(trackId, moduleId);
  if (!module) return undefined;
  const topic = module.topics.find(t => t.id === topicId);
  if (!topic) return undefined;
  return { track: getTrackById(trackId)!, module, topic };
}

export function getAllTopicsFlat() {
  return ACADEMIC_TRACKS.flatMap(track =>
    track.modules.flatMap(module =>
      module.topics.map(topic => ({
        trackId: track.id,
        trackTitle: track.title,
        moduleId: module.id,
        moduleTitle: module.title,
        topicId: topic.id,
        title: topic.title,
        estMinutes: topic.estMinutes,
      })),
    ),
  );
}

export function getLabById(labId: string): AcademicLab | undefined {
  return ACADEMIC_LABS.find(l => l.id === labId);
}

export function getLabsByTrackId(trackId: string): AcademicLab[] {
  return ACADEMIC_LABS.filter(l => l.trackId === trackId);
}

export function getLabsForCourse(courseId: LibraryId): AcademicLab[] {
  const track = getTrackByCourseId(courseId);
  if (!track) return [];
  return getLabsByTrackId(track.id);
}

export { ACADEMIC_LABS } from './labs';

export {
  trackPythonFoundation,
  trackDataScience,
  trackMathForAI,
  trackMachineLearning,
  trackDeepLearning,
  trackSpecializations,
  trackAIEngineering,
  trackCapstone,
};
