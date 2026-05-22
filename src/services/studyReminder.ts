import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  defaultStudyReminderTime,
  saveStudyReminderPreference,
  studyReminderTimes,
  type StudyReminderTime,
} from './firebase';

const STORAGE_KEY = 'pygrounds.studyReminder.v1';

export type StudyReminderState = {
  enabled: boolean;
  reminderId: string;
  updatedAt: string;
};

export async function loadStudyReminder(): Promise<StudyReminderState> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return {
      enabled: false,
      reminderId: defaultStudyReminderTime.id,
      updatedAt: '',
    };
  }

  try {
    return JSON.parse(raw);
  } catch {
    return {
      enabled: false,
      reminderId: defaultStudyReminderTime.id,
      updatedAt: '',
    };
  }
}

export function getStudyReminderTime(reminderId: string): StudyReminderTime {
  return studyReminderTimes.find(reminder => reminder.id === reminderId) ?? defaultStudyReminderTime;
}

export async function enableStudyReminder(reminder: StudyReminderTime) {
  const token = await saveStudyReminderPreference(reminder);

  if (!token) {
    return null;
  }

  const state: StudyReminderState = {
    enabled: true,
    reminderId: reminder.id,
    updatedAt: new Date().toISOString(),
  };

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return state;
}
