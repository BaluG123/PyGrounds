import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export function configureGoogleAuth() {
  GoogleSignin.configure({
    webClientId: '207631666790-phfsosoiuk1qr39rkuolj54mphhokl7u.apps.googleusercontent.com',
  });
}

export async function signInWithGoogle() {
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
  const status = await messaging().requestPermission();
  const enabled =
    status === messaging.AuthorizationStatus.AUTHORIZED ||
    status === messaging.AuthorizationStatus.PROVISIONAL;

  if (!enabled) {
    return null;
  }

  return messaging().getToken();
}
