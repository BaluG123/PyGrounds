import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { emptyProgress, loadProgress, saveProgress } from './progress';
import type { ProgressState } from '../types/course';

type ProgressContextValue = {
  progress: ProgressState;
  completeLesson: (lessonId: string) => void;
  saveQuizScore: (courseId: string, score: number) => void;
  recordPracticeRun: (practiceId: string) => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: PropsWithChildren) {
  const [progress, setProgress] = useState<ProgressState>(emptyProgress);

  useEffect(() => {
    loadProgress().then(setProgress);
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      completeLesson: lessonId => {
        setProgress(current => {
          const next = {
            ...current,
            completedLessons: { ...current.completedLessons, [lessonId]: true },
          };
          saveProgress(next);
          return next;
        });
      },
      saveQuizScore: (courseId, score) => {
        setProgress(current => {
          const next = {
            ...current,
            quizScores: { ...current.quizScores, [courseId]: score },
          };
          saveProgress(next);
          return next;
        });
      },
      recordPracticeRun: practiceId => {
        setProgress(current => {
          const next = {
            ...current,
            practiceRuns: {
              ...current.practiceRuns,
              [practiceId]: (current.practiceRuns[practiceId] ?? 0) + 1,
            },
          };
          saveProgress(next);
          return next;
        });
      },
    }),
    [progress],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used inside ProgressProvider');
  }
  return context;
}
