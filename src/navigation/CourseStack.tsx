import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { LibraryId } from '../types/course';
import type { CourseStackParamList } from './types';
import { CourseHomeScreen } from '../screens/CourseHomeScreen';
import { LessonScreen } from '../screens/LessonScreen';
import { PracticeScreen } from '../screens/PracticeScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { PDFViewerScreen } from '../screens/PDFViewerScreen';
import { colors } from '../theme/theme';

const Stack = createNativeStackNavigator<CourseStackParamList>();

export function CourseStack({ courseId }: { courseId: LibraryId }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.ink,
        headerTitleStyle: { fontWeight: '900' },
      }}
    >
      <Stack.Screen
        name="CourseHome"
        component={CourseHomeScreen}
        initialParams={{ courseId }}
        options={{ title: 'Course' }}
      />
      <Stack.Screen name="Lesson" component={LessonScreen} options={{ title: 'Lesson' }} />
      <Stack.Screen name="Practice" component={PracticeScreen} options={{ title: 'Practice' }} />
      <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Quiz' }} />
      <Stack.Screen name="Notes" component={PDFViewerScreen} options={{ title: 'PDF Notes' }} />
    </Stack.Navigator>
  );
}
