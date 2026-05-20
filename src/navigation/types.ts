import type { LibraryId } from '../types/course';

export type RootDrawerParamList = {
  Dashboard: undefined;
  'Python Basics': undefined;
  'Python Advanced': undefined;
  NumPy: undefined;
  Pandas: undefined;
  Matplotlib: undefined;
  'Math for AI': undefined;
  'Linear Algebra': undefined;
  'Scikit-Learn': undefined;
  'Deep Learning': undefined;
  'AI Projects': undefined;
  Roadmap: undefined;
  Playground: { starterCode?: string; practiceId?: string } | undefined;
  Account: undefined;
  'Refresh Mind': undefined;
};

import type { MindCategory, Difficulty } from '../types/mindQuiz';

export type RefreshMindStackParamList = {
  RefreshMindHome: undefined;
  MindQuiz: { category: MindCategory; difficulty: Difficulty };
};

export type CourseStackParamList = {
  CourseHome: { courseId: LibraryId };
  Lesson: { courseId: LibraryId; lessonId: string };
  Quiz: { courseId: LibraryId };
  Practice: { courseId: LibraryId };
};
