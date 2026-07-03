import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { LibraryId } from '../types/course';
import type { CourseStackParamList } from './types';
import { CourseHomeScreen } from '../screens/CourseHomeScreen';
import { LessonScreen } from '../screens/LessonScreen';
import { PracticeScreen } from '../screens/PracticeScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { PDFViewerScreen } from '../screens/PDFViewerScreen';
import { TopicDetailScreen } from '../screens/MathForAI/TopicDetailScreen';
import { LabDetailScreen } from '../screens/MathForAI/LabDetailScreen';
import { AcademicProgressProvider } from '../services/AcademicProgressContext';
import { getCourseById } from '../content/courses';
import { getLabById, getTopicById } from '../content/academic';
import { colors } from '../theme/theme';

const Stack = createNativeStackNavigator<CourseStackParamList>();

export function CourseStack({ courseId }: { courseId: LibraryId }) {
  const course = getCourseById(courseId);

  return (
    <AcademicProgressProvider>
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
          options={{ title: course?.title ?? 'Course' }}
        />
        <Stack.Screen name="Lesson" component={LessonScreen} options={{ title: 'Lesson' }} />
        <Stack.Screen
          name="TopicDetail"
          component={TopicDetailScreen}
          options={({ route }) => {
            const result = getTopicById(
              route.params.trackId,
              route.params.moduleId,
              route.params.topicId,
            );
            return { title: result?.topic.title ?? 'Theory' };
          }}
        />
        <Stack.Screen
          name="LabDetail"
          component={LabDetailScreen}
          options={({ route }) => ({
            title: getLabById(route.params.labId)?.title ?? 'Code Lab',
          })}
        />
        <Stack.Screen name="Practice" component={PracticeScreen} options={{ title: 'Practice' }} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Quiz' }} />
        <Stack.Screen name="Notes" component={PDFViewerScreen} options={{ title: 'PDF Notes' }} />
      </Stack.Navigator>
    </AcademicProgressProvider>
  );
}
