# PyGrounds Version 1 Release Checklist

This checklist decides whether the app is ready for version 1.

## Current Readiness

Status: not ready for public production until the blocking items are finished.

The app has strong learning content and offline value, but a public release needs release signing, privacy setup, PDF validation, store assets, and a full QA pass.

## Blocking Before Release

- Replace placeholder Firebase web client ID in `src/services/firebase.ts` or disable Google sign-in in production.
- Add real PDF URLs and test each PDF on Android.
- Update the stale Jest course-count test so the full suite can pass.
- Generate a production upload keystore and build a signed `.aab`.
- Add a public privacy policy URL.
- Prepare Play Store icon, feature graphic, and screenshots.
- Test on at least one low-end Android phone and one modern Android phone.
- Confirm the app works with airplane mode enabled after first install.

## Product Quality Checklist

- The first screen clearly tells students what to do next.
- Every course has lessons, quiz, practice, and notes.
- Problem Solving has enough labs to keep students returning.
- Playground edited code runs without requiring reset.
- Reset restores the current lab, not a random default.
- Empty/loading/error states are understandable.
- No dead buttons.
- No placeholder text visible to users.
- No debug-only screens visible.
- App icon looks polished on Android launcher.

## Learning Quality Checklist

- Content moves from beginner to advanced without sudden jumps.
- Each lesson has examples, concept blocks, and practice.
- Practice questions include hints.
- Playground starter code is small enough for students to modify.
- PDF notes match the course where they appear.
- Quizzes explain the correct answer.
- Problem-solving challenges train patterns, not only syntax.

## Android QA Checklist

- Cold launch.
- Background and resume.
- Rotate screen if supported.
- Open every drawer item.
- Complete one lesson.
- Run one quiz.
- Open one PDF.
- Open one practice lab.
- Edit Playground code and press Run.
- Press Reset Lab.
- Sign in or verify Account gracefully handles unsigned users.
- Test with no internet.
- Test with poor internet.

## Release Build Checklist

- `npx tsc --noEmit` passes.
- `npm run lint` passes or known issues are documented.
- `npm test -- --runInBand` passes.
- `./gradlew bundleRelease` succeeds.
- Generated `.aab` is uploaded to internal testing.
- Internal testing install works from Play Store.
- No crash on launch in Play Console pre-launch report.

## Version 1 Scope

Version 1 should focus on:

- Offline AI and Python foundations.
- Clean beginner learning path.
- Strong problem-solving practice.
- Reliable Playground for supported beginner patterns.
- PDF notes for deeper reading.

Avoid adding complex features right before launch unless they are necessary. Stability matters more than feature count for version 1.

## Suggested Version 1.1 Scope

- Search inside Problem Solving questions.
- Bookmarks for favorite labs.
- Daily challenge streak.
- Better progress dashboard.
- Downloadable PDFs for offline reading.
- More robust Python runtime for arbitrary Python code.
