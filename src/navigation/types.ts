import type { LibraryId } from '../types/course';

export type RootDrawerParamList = {
  Dashboard: undefined;
  'Python Basics': undefined;
  'Python Advanced': undefined;
  NumPy: undefined;
  Pandas: undefined;
  Matplotlib: undefined;
  'Math for AI': undefined;
  'Math Theory Guide': undefined;
  'Academic Deep Dive': undefined;
  'Master AI Hub': undefined;
  'Linear Algebra': undefined;
  'Machine Learning': undefined;
  'Scikit-Learn': undefined;
  'Deep Learning': undefined;
  NLP: undefined;
  GenAI: undefined;
  'Computer Vision': undefined;
  'Reinforcement Learning': undefined;
  'AI Engineering': undefined;
  'AI Projects': undefined;
  Roadmap: undefined;
  'Problem Solving': undefined;
  Playground: { starterCode?: string; practiceId?: string } | undefined;
  Account: undefined;
  'Refresh Mind': undefined;
};

import type { MindCategory, Difficulty } from '../types/mindQuiz';

export type RefreshMindStackParamList = {
  RefreshMindHome: undefined;
  MindQuiz: { category: MindCategory; difficulty: Difficulty };
};

export type AcademicStackParamList = {
  TrackList: undefined;
  ModuleList: { trackId: string; courseId?: LibraryId };
  TopicDetail: { trackId: string; moduleId: string; topicId: string };
  LabList: { trackId?: string; courseId?: LibraryId };
  LabDetail: { labId: string };
  TrackQuiz: { trackId: string; courseId?: LibraryId };
};

/** @deprecated Use AcademicStackParamList */
export type MathTheoryStackParamList = AcademicStackParamList;

export type CourseStackParamList = {
  CourseHome: { courseId: LibraryId };
  Lesson: { courseId: LibraryId; lessonId: string };
  TopicDetail: { courseId: LibraryId; trackId: string; moduleId: string; topicId: string };
  LabDetail: { courseId: LibraryId; labId: string };
  Quiz: { courseId: LibraryId };
  Practice: { courseId: LibraryId };
  Notes: { courseId: LibraryId };
};
