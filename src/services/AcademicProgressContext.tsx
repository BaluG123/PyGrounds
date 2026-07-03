import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  loadAcademicProgressData,
  markTopicComplete,
  saveTrackQuizScore,
  type AcademicProgressData,
} from './academicProgress';

type AcademicProgressContextValue = {
  data: AcademicProgressData;
  loading: boolean;
  completeTopic: (topicId: string) => Promise<void>;
  saveQuizScore: (trackId: string, score: number) => Promise<void>;
  isComplete: (topicId: string) => boolean;
  getQuizScore: (trackId: string) => number;
  /** @deprecated use data.completedTopics */
  progress: Record<string, boolean>;
};

const AcademicProgressContext = createContext<AcademicProgressContextValue | null>(null);

export function AcademicProgressProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AcademicProgressData>({ completedTopics: {}, quizScores: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAcademicProgressData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const completeTopic = useCallback(async (topicId: string) => {
    const next = await markTopicComplete(topicId);
    setData(next);
  }, []);

  const saveQuizScore = useCallback(async (trackId: string, score: number) => {
    const next = await saveTrackQuizScore(trackId, score);
    setData(next);
  }, []);

  const isComplete = useCallback((topicId: string) => Boolean(data.completedTopics[topicId]), [data]);
  const getQuizScore = useCallback((trackId: string) => data.quizScores[trackId] ?? 0, [data]);

  const value = useMemo(
    () => ({
      data,
      loading,
      completeTopic,
      saveQuizScore,
      isComplete,
      getQuizScore,
      progress: data.completedTopics,
    }),
    [data, loading, completeTopic, saveQuizScore, isComplete, getQuizScore],
  );

  return (
    <AcademicProgressContext.Provider value={value}>
      {children}
    </AcademicProgressContext.Provider>
  );
}

export function useAcademicProgress() {
  const ctx = useContext(AcademicProgressContext);
  if (!ctx) {
    throw new Error('useAcademicProgress must be used within AcademicProgressProvider');
  }
  return ctx;
}

export const useMathTheoryProgress = useAcademicProgress;
