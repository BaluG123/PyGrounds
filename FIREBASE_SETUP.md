# Firebase & Firestore Setup Guide

This document outlines the steps required to properly configure Firebase, Firestore, and Firebase Cloud Messaging for PyGrounds users.

## 1. Firebase Console Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project named **PyGrounds** (or select your existing project).
3. Disable Google Analytics if not needed for this development phase.

## 2. Authentication Configuration

1. In the left navigation pane, go to **Build > Authentication**.
2. Click **Get Started**.
3. Go to the **Sign-in method** tab.
4. Enable the **Google** provider.
   *   Choose a Project support email.
   *   Save the configuration.

## 3. Firestore Database Setup

1. In the left navigation pane, go to **Build > Firestore Database**.
2. Click **Create database**.
3. Choose a location (e.g., `nam5` for us-central).
4. Start in **Test mode** (for initial development) or set up production rules.

### Recommended Firestore Security Rules (Production)

To ensure users can only read and write their own progress data, apply these rules in the Firestore Rules tab:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 4. Android Configuration

1. In the Firebase Console, go to **Project Overview**.
2. Add an **Android** app to your project.
3. Register the app with your Android package name (e.g., `com.pygrounds`).
4. Download the `google-services.json` file.
5. Place the `google-services.json` file inside your React Native project at `android/app/google-services.json`.
6. Add the SHA-1 signing certificate footprint.
   *   Run `./gradlew signingReport` in your `android` folder to get the SHA-1 for your debug keystore.
   *   Add this SHA-1 hash to the Android app configuration in the Firebase Console (required for Google Sign-In).

## 5. iOS Configuration

1. In the Firebase Console, go to **Project Overview**.
2. Add an **iOS** app to your project.
3. Register the app with your iOS bundle ID (e.g., `com.pygrounds`).
4. Download the `GoogleService-Info.plist` file.
5. Open your project workspace in Xcode (`ios/PyGrounds.xcworkspace`).
6. Drag and drop the `GoogleService-Info.plist` file into the root of your Xcode project, ensuring it's added to all targets.

## 6. Study Reminder Push Notifications

The app saves reminder preferences from the dashboard to:

- `notificationSubscriptions/{fcmTokenDocId}` for device-level push scheduling.
- `learners/{uid}.studyReminder` when the learner is signed in.

Each reminder stores `hour`, `minute`, `timezone`, `fcmToken`, `enabled`, and `updatedAt`. Use a Firebase scheduled Cloud Function or another trusted backend to query enabled subscriptions by local time and send FCM messages. The client requests notification permission and keeps the token updated when Firebase rotates it.

For Android 13+, `POST_NOTIFICATIONS` is already declared in `android/app/src/main/AndroidManifest.xml`. For iOS, enable Push Notifications and Background Modes > Remote notifications in Xcode, then upload the APNs key in Firebase Console.

## 7. React Native Firebase Packages

Ensure the required packages are installed in your project:

```bash
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore @react-native-firebase/messaging @react-native-google-signin/google-signin
```

Follow any specific auto-linking instructions for iOS (`cd ios && pod install`) and Android as specified in the [React Native Firebase Documentation](https://rnfirebase.io/).

## 8. Next Steps

With Firebase configured, the `src/services/firebase.ts` file is now fully operational. The `ProgressContext` will automatically sync the local `AsyncStorage` progress to Firestore whenever the user signs in with Google via the Account screen, and study reminders will register device tokens for scheduled FCM pushes.
