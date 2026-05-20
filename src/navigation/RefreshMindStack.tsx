import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RefreshMindStackParamList } from './types';
import { RefreshMindScreen } from '../screens/RefreshMindScreen';
import { MindQuizScreen } from '../screens/MindQuizScreen';
import { colors } from '../theme/theme';

const Stack = createNativeStackNavigator<RefreshMindStackParamList>();

export function RefreshMindStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.ink,
        headerTitleStyle: { fontWeight: '900' },
      }}
    >
      <Stack.Screen
        name="RefreshMindHome"
        component={RefreshMindScreen}
        options={{ title: 'Refresh Mind' }}
      />
      <Stack.Screen
        name="MindQuiz"
        component={MindQuizScreen}
        options={{ title: 'Challenge' }}
      />
    </Stack.Navigator>
  );
}
