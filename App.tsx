import React, { useEffect } from 'react';
import { Alert, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ProgressProvider } from './src/services/ProgressContext';
import { configureGoogleAuth, saveStudyReminderPreference } from './src/services/firebase';
import { getStudyReminderTime, loadStudyReminder } from './src/services/studyReminder';
import { colors } from './src/theme/theme';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    configureGoogleAuth();
    const unsubscribeForeground = messaging().onMessage(message => {
      const title = message.notification?.title ?? 'PyGrounds reminder';
      const body = message.notification?.body ?? 'Time for a short Python practice session.';
      Alert.alert(title, body);
    });
    const unsubscribeToken = messaging().onTokenRefresh(async () => {
      const reminder = await loadStudyReminder();
      if (reminder.enabled) {
        await saveStudyReminderPreference(getStudyReminderTime(reminder.reminderId));
      }
    });

    return () => {
      unsubscribeForeground();
      unsubscribeToken();
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <ProgressProvider>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={colors.background}
          />
          <AppNavigator />
        </ProgressProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
