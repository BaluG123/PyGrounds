import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'academicProgress.v2';
const LEGACY_TOPIC_KEY = 'academicProgress';
const LEGACY_MATH_KEY = 'mathTheoryProgress';

export type AcademicProgressData = {
  completedTopics: Record<string, boolean>;
  quizScores: Record<string, number>;
};

const EMPTY: AcademicProgressData = { completedTopics: {}, quizScores: {} };

export async function loadAcademicProgressData(): Promise<AcademicProgressData> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as AcademicProgressData;
    }
    for (const key of [LEGACY_TOPIC_KEY, LEGACY_MATH_KEY]) {
      const legacy = await AsyncStorage.getItem(key);
      if (legacy) {
        const topics = JSON.parse(legacy) as Record<string, boolean>;
        const migrated = { completedTopics: topics, quizScores: {} };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        return migrated;
      }
    }
    return EMPTY;
  } catch {
    return EMPTY;
  }
}

export async function saveAcademicProgressData(data: AcademicProgressData): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function markTopicComplete(topicId: string): Promise<AcademicProgressData> {
  const current = await loadAcademicProgressData();
  const next = {
    ...current,
    completedTopics: { ...current.completedTopics, [topicId]: true },
  };
  await saveAcademicProgressData(next);
  return next;
}

export async function saveTrackQuizScore(trackId: string, score: number): Promise<AcademicProgressData> {
  const current = await loadAcademicProgressData();
  const prev = current.quizScores[trackId] ?? 0;
  const next = {
    ...current,
    quizScores: { ...current.quizScores, [trackId]: Math.max(prev, score) },
  };
  await saveAcademicProgressData(next);
  return next;
}

/** @deprecated flat topic map */
export type AcademicProgressState = Record<string, boolean>;
export async function loadAcademicProgress(): Promise<AcademicProgressState> {
  const data = await loadAcademicProgressData();
  return data.completedTopics;
}
