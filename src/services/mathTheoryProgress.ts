import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'mathTheoryProgress';

export type MathTheoryProgressState = Record<string, boolean>;

export async function loadMathTheoryProgress(): Promise<MathTheoryProgressState> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }
    return JSON.parse(raw) as MathTheoryProgressState;
  } catch {
    return {};
  }
}

export async function saveMathTheoryProgress(state: MathTheoryProgressState): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export async function markMathTopicComplete(topicId: string): Promise<MathTheoryProgressState> {
  const current = await loadMathTheoryProgress();
  const next = { ...current, [topicId]: true };
  await saveMathTheoryProgress(next);
  return next;
}
