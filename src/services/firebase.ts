import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
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
  void ensureFirebaseApp();
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
  const status = await messaging().requestPermission();
  const enabled =
    status === messaging.AuthorizationStatus.AUTHORIZED ||
    status === messaging.AuthorizationStatus.PROVISIONAL;

  if (!enabled) {
    return null;
  }

  return messaging().getToken();
}
