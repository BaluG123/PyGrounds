# PyGrounds Play Store Deployment

Use this file for every Android production release.

## 1. Prepare Release Identity

Confirm these values before building:

- App name: `PyGrounds`
- Package name: `com.pygrounds`
- Version name: `1.0`
- Version code: `1`
- Minimum SDK: from `android/build.gradle`
- Target SDK: from `android/build.gradle`

For the next release, increase `versionCode` by 1 and update `versionName` in `android/app/build.gradle`.

## 2. Create Upload Keystore

Run this once and store the keystore safely. Do not commit it.

```sh
keytool -genkeypair -v \
  -storetype PKCS12 \
  -keystore pygrounds-upload-key.keystore \
  -alias pygrounds-upload \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

Move the keystore to:

```sh
android/app/pygrounds-upload-key.keystore
```

`.gitignore` already ignores `*.keystore`.

## 3. Configure Signing

Use environment variables or local Gradle properties. Environment variables are safer for CI.

```sh
export PYGROUNDS_UPLOAD_STORE_FILE=pygrounds-upload-key.keystore
export PYGROUNDS_UPLOAD_STORE_PASSWORD="your_store_password"
export PYGROUNDS_UPLOAD_KEY_ALIAS=pygrounds-upload
export PYGROUNDS_UPLOAD_KEY_PASSWORD="your_key_password"
```

Alternative local setup:

Create `android/gradle.properties` entries locally only. Do not share secrets.

```properties
PYGROUNDS_UPLOAD_STORE_FILE=pygrounds-upload-key.keystore
PYGROUNDS_UPLOAD_STORE_PASSWORD=your_store_password
PYGROUNDS_UPLOAD_KEY_ALIAS=pygrounds-upload
PYGROUNDS_UPLOAD_KEY_PASSWORD=your_key_password
```

## 4. Pre-Release Checks

Run:

```sh
npm install
npx tsc --noEmit
npm run lint
npm test -- --runInBand
```

Current known issue: the existing Jest test `ships a complete foundation course for every core library` expects 3 courses, but the app now contains 10. Update that test before calling the build fully green.

## 5. Build Android App Bundle

Google Play expects an `.aab` for production releases.

```sh
cd android
./gradlew clean
./gradlew bundleRelease
```

Output:

```text
android/app/build/outputs/bundle/release/app-release.aab
```

## 6. Create Play Console App

In Google Play Console:

1. Create app.
2. App name: `PyGrounds`.
3. Default language: English.
4. App or game: App.
5. Free or paid: choose your plan.
6. Declarations: accept Play policies only after reviewing them.

## 7. Complete Store Listing

Prepare:

- App icon: 512 x 512 PNG.
- Feature graphic: 1024 x 500 PNG.
- Phone screenshots: at least 2, recommended 6-8.
- Short description: up to 80 characters.
- Full description: up to 4000 characters.
- Privacy policy URL.
- Contact email.

Use `STORE_LISTING.md` as starter copy.

## 8. Data Safety

Complete the Play Console Data Safety form using `PRIVACY_AND_DATA_SAFETY.md`.

Be accurate. If Firebase Auth, Firestore, Messaging, or Google Sign-In are enabled in production, disclose them.

## 9. Release Track

Recommended path:

1. Internal testing: upload first `.aab`.
2. Add tester emails.
3. Install from Play testing link on at least two real Android devices.
4. Closed testing if required by your Play Console account.
5. Production release only after crash-free manual testing.

## 10. Manual Smoke Test

Before production rollout:

- App launches offline.
- Drawer opens.
- Courses open.
- Lessons scroll.
- Quizzes work.
- Practice labs open Playground.
- Edited Playground code runs.
- Reset Lab restores the current lab.
- PDF notes open from URL.
- Account screen does not crash if Firebase is not configured.
- No placeholder keys or placeholder URLs are visible to users.

## 11. Production Rollout

Start with a staged rollout:

- First rollout: 5%
- Wait 24-48 hours.
- Check crashes, ANRs, reviews, and uninstall rate.
- Increase to 25%, 50%, then 100%.

Do not rush 100% rollout on version 1.
