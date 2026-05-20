import type { ComponentType } from 'react';
import type { LucideProps } from 'lucide-react-native';

export type LibraryId =
  | 'python-basics'
  | 'python-advanced'
  | 'numpy'
  | 'pandas'
  | 'matplotlib'
  | 'math-ai'
  | 'linear-algebra'
  | 'scikit-learn'
  | 'deep-learning'
  | 'ai-projects';

export type CalloutVariant = 'tip' | 'warning' | 'info' | 'remember';

export type DiagramBox = {
  id: string;
  label: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
};

export type DiagramArrow = {
  from: string;
  to: string;
  label?: string;
};

export type LessonBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'formula'; expression: string; note?: string }
  | { type: 'code'; code: string }
  | { type: 'bullets'; items: string[] }
  | { type: 'playground'; code: string; expectedOutput?: string }
  | { type: 'heading'; text: string }
  | { type: 'callout'; variant: CalloutVariant; title: string; body: string }
  | { type: 'diagram'; title: string; boxes: DiagramBox[]; arrows: DiagramArrow[]; height?: number }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'stepByStep'; title: string; steps: { title: string; description: string }[] }
  | { type: 'analogy'; text: string }
  | { type: 'image'; title: string; imageType: string; data?: Record<string, any> }
  | { type: 'divider' };

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type PracticeQuestion = {
  id: string;
  title: string;
  prompt: string;
  starterCode: string;
  expectedOutput: string;
  hint: string;
};

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  objective: string;
  blocks: LessonBlock[];
};

export type CourseModule = {
  id: LibraryId;
  title: string;
  subtitle: string;
  color: string;
  accent: string;
  Icon: ComponentType<LucideProps>;
  history: {
    founder: string;
    released: string;
    summary: string;
  };
  concepts: string[];
  lessons: Lesson[];
  quiz: QuizQuestion[];
  practice: PracticeQuestion[];
};

export type ProgressState = {
  completedLessons: Record<string, boolean>;
  quizScores: Record<string, number>;
  practiceRuns: Record<string, number>;
};
