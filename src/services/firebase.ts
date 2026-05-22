import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const fallbackFirebaseConfig = {
  apiKey: 'AIzaSyBAFztdPVhM8Zi3vd8LXuVSuyHFYdFtlAo',
  appId: '1:207631666790:android:0cbc31de4824f39e5aa7a7',
  messagingSenderId: '207631666790',
  projectId: 'pygrounds',
  storageBucket: 'pygrounds.firebasestorage.app',
};

let initPromise: Promise<unknown> | null = null;

export async function ensureFirebaseApp() {
  if (!firebase.apps.length) {
    initPromise ??= Promise.resolve(firebase.initializeApp(fallbackFirebaseConfig));
    await initPromise;
  }
}

export function configureGoogleAuth() {
  ensureFirebaseApp().catch(() => undefined);
  GoogleSignin.configure({
    webClientId: '207631666790-phfsosoiuk1qr39rkuolj54mphhokl7u.apps.googleusercontent.com',
  });
}

export async function signInWithGoogle() {
  await ensureFirebaseApp();
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const result = await GoogleSignin.signIn();
  const idToken = result.data?.idToken;

  if (!idToken) {
    throw new Error('Google sign-in did not return an id token.');
  }

  const credential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(credential);
}

export async function requestLearningNotifications() {
  await ensureFirebaseApp();
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging().registerDeviceForRemoteMessages();
  }
  const status = await messaging().requestPermission();
  const enabled =
    status === messaging.AuthorizationStatus.AUTHORIZED ||
    status === messaging.AuthorizationStatus.PROVISIONAL;

  if (!enabled) {
    return null;
  }

  return messaging().getToken();
}

export type StudyReminderTime = {
  id: string;
  label: string;
  timeLabel: string;
  hour: number;
  minute: number;
};

export const studyReminderTimes: StudyReminderTime[] = [
  { id: 'morning', label: 'Morning warm-up', timeLabel: '8:00 AM', hour: 8, minute: 0 },
  { id: 'lunch', label: 'Lunch sprint', timeLabel: '1:00 PM', hour: 13, minute: 0 },
  { id: 'evening', label: 'Evening focus', timeLabel: '7:30 PM', hour: 19, minute: 30 },
  { id: 'night', label: 'Night review', timeLabel: '9:00 PM', hour: 21, minute: 0 },
];

export const defaultStudyReminderTime = studyReminderTimes[2];

function tokenDocId(token: string) {
  return token.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 140);
}

export async function saveStudyReminderPreference(reminder: StudyReminderTime) {
  const token = await requestLearningNotifications();

  if (!token) {
    return null;
  }

  const user = auth().currentUser;
  const payload = {
    enabled: true,
    reminderId: reminder.id,
    reminderLabel: reminder.label,
    hour: reminder.hour,
    minute: reminder.minute,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    fcmToken: token,
    platformUpdatedAt: new Date().toISOString(),
    updatedAt: firestore.FieldValue.serverTimestamp(),
  };

  try {
    await firestore()
      .collection('notificationSubscriptions')
      .doc(tokenDocId(token))
      .set(
        {
          ...payload,
          userId: user?.uid ?? null,
        },
        { merge: true },
      );

    if (user) {
      await firestore()
        .collection('learners')
        .doc(user.uid)
        .set(
          {
            studyReminder: payload,
          },
          { merge: true },
        );
    }
  } catch (error) {
    console.warn('Failed to sync study reminder preference to cloud Firestore:', error);
  }

  return token;
}
