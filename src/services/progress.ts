import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import type { ProgressState } from '../types/course';

const STORAGE_KEY = 'pygrounds.progress.v1';

export const emptyProgress: ProgressState = {
  completedLessons: {},
  quizScores: {},
  practiceRuns: {},
};

export async function loadProgress(): Promise<ProgressState> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return emptyProgress;
  }

  try {
    return { ...emptyProgress, ...JSON.parse(raw) };
  } catch {
    return emptyProgress;
  }
}

export async function saveProgress(progress: ProgressState) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));

  const user = auth().currentUser;
  if (!user) {
    return;
  }

  await firestore()
    .collection('learners')
    .doc(user.uid)
    .set(
      {
        progress,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
}
