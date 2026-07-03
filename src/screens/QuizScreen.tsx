import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { QuizSession } from '../components/Academic/QuizSession';
import { getCourseById, getUnifiedQuizForCourse } from '../content/courses';
import type { CourseStackParamList } from '../navigation/types';
import { useProgress } from '../services/ProgressContext';

type Props = NativeStackScreenProps<CourseStackParamList, 'Quiz'>;

export function QuizScreen({ route }: Props) {
  const course = getCourseById(route.params.courseId)!;
  const { progress, saveQuizScore } = useProgress();

  const questions = getUnifiedQuizForCourse(course.id).map(q => ({
    id: q.id,
    prompt: q.prompt,
    options: q.options,
    answerIndex: q.answerIndex,
    explanation: q.explanation,
  }));

  return (
    <QuizSession
      title={`${course.title} · Unified Quiz`}
      subtitle={`${questions.length} questions — lessons, theory, and mastery combined`}
      questions={questions}
      accentColor={course.color}
      accentBg={course.accent}
      bestScore={progress.quizScores[course.id] ?? 0}
      onComplete={score => saveQuizScore(course.id, score)}
    />
  );
}
