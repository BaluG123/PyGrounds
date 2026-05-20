# PyGrounds

PyGrounds is a React Native learning app for AI foundations. It teaches NumPy, Pandas, and Matplotlib with short history notes, core concepts, lessons, quizzes, practice labs, local progress tracking, and a Python-like offline playground for the built-in exercises.

## Run

```sh
npm install
npm start
npm run android
```

For iOS after native dependency changes:

```sh
bundle install
bundle exec pod install
npm run ios
```

## Verify

```sh
npm run lint
npx tsc --noEmit
npm test -- --runInBand
```

## Firebase Setup

The app includes Firebase Authentication, Firestore progress syncing, Firebase Messaging, and Google sign-in code. To connect a real Firebase project:

1. Add `android/app/google-services.json`.
2. Add the iOS `GoogleService-Info.plist` in Xcode.
3. Replace `ADD_FIREBASE_WEB_CLIENT_ID_HERE` in `src/services/firebase.ts`.
4. Enable Google sign-in in Firebase Authentication.
5. Create Firestore rules for `learners/{uid}` progress documents.
6. Configure push notification credentials for Firebase Messaging.

Until Firebase is configured, learning progress is still stored locally with AsyncStorage.

## Current Playground Scope

The playground runs the built-in NumPy, Pandas, and Matplotlib exercises offline through a deterministic training runner. Arbitrary Python execution needs a native Python runtime such as Chaquopy, a WebView/Pyodide approach for web-like targets, or a server sandbox.
