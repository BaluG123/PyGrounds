import type { LibraryId } from '../types/course';

export type RootDrawerParamList = {
  Dashboard: undefined;
  NumPy: undefined;
  Pandas: undefined;
  Matplotlib: undefined;
  Roadmap: undefined;
  Playground: { starterCode?: string; practiceId?: string } | undefined;
  Account: undefined;
};

export type CourseStackParamList = {
  CourseHome: { courseId: LibraryId };
  Lesson: { courseId: LibraryId; lessonId: string };
  Quiz: { courseId: LibraryId };
  Practice: { courseId: LibraryId };
};
