import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import auth, { type FirebaseAuthTypes } from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import { Bell, LogIn, LogOut, User } from 'lucide-react-native';
import { ensureFirebaseApp, requestLearningNotifications, signInWithGoogle } from '../services/firebase';
import { courses } from '../content/courses';
import { useProgress } from '../services/ProgressContext';
import { colors } from '../theme/theme';

function getSafeUser(): FirebaseAuthTypes.User | null {
  try {
    return firebase.apps.length ? auth().currentUser : null;
  } catch (e) {
    return null;
  }
}

export function AccountScreen() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(getSafeUser());
  const { progress } = useProgress();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let active = true;

    ensureFirebaseApp()
      .then(() => {
        if (active) {
          unsubscribe = auth().onAuthStateChanged(setUser);
        }
      })
      .catch(() => undefined);

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  const totalLessons = courses.reduce((sum, c) => sum + c.lessons.length, 0);
  const completedLessons = Object.values(progress.completedLessons).filter(Boolean).length;
  const quizzesTaken = Object.keys(progress.quizScores).length;
  const labsTried = Object.keys(progress.practiceRuns).length;

  async function handleGoogleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      Alert.alert('Google sign-in setup needed', error instanceof Error ? error.message : 'Unable to sign in.');
    }
  }

  async function handleNotifications() {
    try {
      const token = await requestLearningNotifications();
      Alert.alert('Notifications', token ? 'Learning reminders are enabled.' : 'Permission was not granted.');
    } catch (error) {
      Alert.alert('Notifications setup needed', error instanceof Error ? error.message : 'Unable to enable notifications.');
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.profileSection}>
        {user?.photoURL ? (
          <Image source={{ uri: user.photoURL }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <User color={colors.muted} size={40} />
          </View>
        )}
        <Text style={styles.title}>{user ? user.displayName ?? 'Signed in learner' : 'Guest Learner'}</Text>
        <Text style={styles.subtitle}>
          {user?.email ?? 'Sign in with Google to sync your progress across devices.'}
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{completedLessons}/{totalLessons}</Text>
          <Text style={styles.statLabel}>Lessons</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{quizzesTaken}</Text>
          <Text style={styles.statLabel}>Quizzes</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{labsTried}</Text>
          <Text style={styles.statLabel}>Labs</Text>
        </View>
      </View>

      <Pressable style={styles.button} onPress={user ? () => { if (firebase.apps.length) auth().signOut() } : handleGoogleSignIn}>
        {user ? <LogOut color={colors.surface} size={20} /> : <LogIn color={colors.surface} size={20} />}
        <Text style={styles.buttonText}>{user ? 'Sign Out' : 'Sign In with Google'}</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.secondary]} onPress={handleNotifications}>
        <Bell color={colors.ink} size={20} />
        <Text style={styles.secondaryText}>Enable Learning Reminders</Text>
      </Pressable>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>About PyGrounds</Text>
        <Text style={styles.infoText}>
          A free, open learning platform for anyone who wants to master Python and AI — from absolute basics to deep learning projects.
        </Text>
        <Text style={styles.infoText}>
          {courses.length} courses · {totalLessons} lessons · {courses.reduce((s, c) => s + c.quiz.length, 0)} quiz questions · {courses.reduce((s, c) => s + c.practice.length, 0)} practice exercises
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: 20 },
  profileSection: { alignItems: 'center', marginBottom: 20 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.green,
    marginBottom: 14,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.line,
    marginBottom: 14,
  },
  title: { color: colors.ink, fontSize: 24, fontWeight: '900', textAlign: 'center' },
  subtitle: { color: colors.muted, lineHeight: 22, marginTop: 6, textAlign: 'center' },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  stat: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.line,
  },
  statValue: { color: colors.ink, fontSize: 22, fontWeight: '900' },
  statLabel: { color: colors.muted, fontSize: 12, marginTop: 4 },
  button: {
    minHeight: 52,
    borderRadius: 8,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  secondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  buttonText: { color: colors.surface, fontWeight: '900', fontSize: 16 },
  secondaryText: { color: colors.ink, fontWeight: '900', fontSize: 16 },
  info: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.line,
    marginTop: 8,
  },
  infoTitle: { color: colors.ink, fontSize: 16, fontWeight: '900', marginBottom: 8 },
  infoText: { color: colors.muted, lineHeight: 21, marginBottom: 6 },
});
