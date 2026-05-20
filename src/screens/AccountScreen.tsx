import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import auth, { type FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Bell, LogIn, LogOut } from 'lucide-react-native';
import { requestLearningNotifications, signInWithGoogle } from '../services/firebase';
import { colors } from '../theme/theme';

export function AccountScreen() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(auth().currentUser);

  useEffect(() => auth().onAuthStateChanged(setUser), []);

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
      <Text style={styles.title}>Learner Account</Text>
      <Text style={styles.subtitle}>
        Google authentication connects your quiz scores and learning progress to Firestore when Firebase config files are added.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{user ? user.displayName ?? 'Signed in learner' : 'Guest learner'}</Text>
        <Text style={styles.meta}>{user?.email ?? 'Progress is stored offline until sign-in is configured.'}</Text>
      </View>

      <Pressable style={styles.button} onPress={user ? () => auth().signOut() : handleGoogleSignIn}>
        {user ? <LogOut color={colors.surface} size={20} /> : <LogIn color={colors.surface} size={20} />}
        <Text style={styles.buttonText}>{user ? 'Sign Out' : 'Sign In with Google'}</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.secondary]} onPress={handleNotifications}>
        <Bell color={colors.ink} size={20} />
        <Text style={styles.secondaryText}>Enable Learning Reminders</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { color: colors.ink, fontSize: 30, fontWeight: '900' },
  subtitle: { color: colors.muted, lineHeight: 22, marginTop: 8, marginBottom: 20 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 14,
  },
  cardTitle: { color: colors.ink, fontSize: 18, fontWeight: '900' },
  meta: { color: colors.muted, marginTop: 6, lineHeight: 20 },
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
});
