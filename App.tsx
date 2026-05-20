import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ProgressProvider } from './src/services/ProgressContext';
import { configureGoogleAuth } from './src/services/firebase';
import { colors } from './src/theme/theme';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    configureGoogleAuth();
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
