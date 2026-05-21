# Privacy and Data Safety Notes

This is a practical guide for the Play Console Data Safety form and privacy policy. It is not legal advice. Review it carefully before publishing.

## Current App Behavior to Verify

The codebase includes:

- Local progress storage with AsyncStorage.
- Firebase Authentication integration.
- Firestore progress syncing code.
- Firebase Cloud Messaging token request.
- Google Sign-In integration.
- PDF viewing from URLs.

If Firebase and Google Sign-In are enabled in production, disclose the related data collection in Play Console.

## Data Types That May Apply

Depending on enabled production features, the app may collect or process:

- Name
- Email address
- Profile photo URL
- User IDs
- App activity, such as lesson completion and practice progress
- Device or other IDs, such as push notification token
- Crash diagnostics if you add crash reporting later

## Suggested Plain-English Privacy Policy Points

Your privacy policy should explain:

- What data PyGrounds collects.
- Why it is collected.
- Whether data is optional or required.
- Whether data is shared with third parties.
- How students can request deletion.
- How local/offline progress works.
- Contact email for privacy requests.

## Minimal Privacy Policy Draft

PyGrounds helps students learn Python, AI foundations, and problem solving.

The app may store learning progress locally on your device. If you sign in, PyGrounds may use your name, email address, profile photo, and user ID to create your account and sync learning progress. If notifications are enabled, the app may use a device notification token to send learning reminders.

PyGrounds uses Firebase and Google services for authentication, progress syncing, and messaging where enabled. PDF notes may load from external URLs.

PyGrounds does not sell personal data.

For deletion or privacy requests, contact: `ADD_SUPPORT_EMAIL_HERE`.

## Play Console Data Safety Checklist

Answer based on the real production build:

- Does the app collect or share user data?
- Is all user data encrypted in transit?
- Can users request data deletion?
- Is account creation optional?
- Are there ads? If no, say no.
- Is data used for app functionality, analytics, developer communications, or personalization?
- Are children in the target audience? If yes, extra policy requirements apply.

## Before Release

- Replace `ADD_SUPPORT_EMAIL_HERE`.
- Publish the privacy policy on a public URL.
- Add the URL in Play Console.
- Make sure the Account screen and sign-in behavior match the policy.
- Do not claim data is not collected if Firebase sign-in/progress sync is active.
