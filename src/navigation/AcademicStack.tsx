import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AcademicStackParamList } from './types';
import { TrackListScreen } from '../screens/MathForAI/TrackListScreen';
import { ModuleListScreen } from '../screens/MathForAI/ModuleListScreen';
import { TopicDetailScreen } from '../screens/MathForAI/TopicDetailScreen';
import { LabListScreen } from '../screens/MathForAI/LabListScreen';
import { LabDetailScreen } from '../screens/MathForAI/LabDetailScreen';
import { TrackQuizScreen } from '../screens/MathForAI/TrackQuizScreen';
import { AcademicProgressProvider } from '../services/AcademicProgressContext';
import { colors } from '../theme/theme';
import { getTrackById, getLabById, getTopicById } from '../content/academic';
import { getCourseById } from '../content/courses';

const Stack = createNativeStackNavigator<AcademicStackParamList>();

export function AcademicStack() {
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
          name="TrackList"
          component={TrackListScreen}
          options={{ title: 'Master AI Hub' }}
        />
        <Stack.Screen
          name="ModuleList"
          component={ModuleListScreen}
          options={({ route }) => {
            const course = route.params.courseId ? getCourseById(route.params.courseId) : undefined;
            return {
              title: course ? `${course.title} Theory` : getTrackById(route.params.trackId)?.title ?? 'Modules',
            };
          }}
        />
        <Stack.Screen
          name="TopicDetail"
          component={TopicDetailScreen}
          options={({ route }) => {
            const result = getTopicById(
              route.params.trackId,
              route.params.moduleId,
              route.params.topicId,
            );
            return { title: result?.topic.title ?? 'Topic' };
          }}
        />
        <Stack.Screen
          name="LabList"
          component={LabListScreen}
          options={{ title: 'Python Labs' }}
        />
        <Stack.Screen
          name="LabDetail"
          component={LabDetailScreen}
          options={({ route }) => ({
            title: getLabById(route.params.labId)?.title ?? 'Lab',
          })}
        />
        <Stack.Screen
          name="TrackQuiz"
          component={TrackQuizScreen}
          options={({ route }) => ({
            title: getTrackById(route.params.trackId)?.title ?? 'Track Quiz',
          })}
        />
      </Stack.Navigator>
    </AcademicProgressProvider>
  );
}

/** @deprecated Use AcademicStack */
export const MathTheoryStack = AcademicStack;
