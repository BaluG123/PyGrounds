import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { courses } from '../content/courses';
import type { CourseStackParamList } from '../navigation/types';
import { useProgress } from '../services/ProgressContext';
import { colors } from '../theme/theme';

type Props = NativeStackScreenProps<CourseStackParamList, 'Quiz'>;

export function QuizScreen({ route }: Props) {
  const course = courses.find(item => item.id === route.params.courseId)!;
  const { progress, saveQuizScore } = useProgress();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const score = course.quiz.filter(question => answers[question.id] === question.answerIndex).length;
  const complete = Object.keys(answers).length === course.quiz.length;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{course.title} Quiz</Text>
      <Text style={styles.subtitle}>Best score: {progress.quizScores[course.id] ?? 0}/{course.quiz.length}</Text>

      {course.quiz.map((question, index) => {
        const selected = answers[question.id];
        return (
          <View key={question.id} style={styles.question}>
            <Text style={styles.prompt}>{index + 1}. {question.prompt}</Text>
            {question.options.map((option, optionIndex) => {
              const isSelected = selected === optionIndex;
              const isCorrect = question.answerIndex === optionIndex;
              const showState = selected !== undefined && (isSelected || isCorrect);
              return (
                <Pressable
                  key={option}
                  onPress={() => setAnswers(current => ({ ...current, [question.id]: optionIndex }))}
                  style={[
                    styles.option,
                    isSelected && { borderColor: course.color },
                    showState && isCorrect && styles.correct,
                    showState && isSelected && !isCorrect && styles.wrong,
                  ]}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </Pressable>
              );
            })}
            {selected !== undefined ? <Text style={styles.explanation}>{question.explanation}</Text> : null}
          </View>
        );
      })}

      <Pressable
        disabled={!complete}
        style={[styles.button, { backgroundColor: complete ? course.color : colors.line }]}
        onPress={() => saveQuizScore(course.id, score)}
      >
        <Text style={styles.buttonText}>Save Score: {score}/{course.quiz.length}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 36 },
  title: { color: colors.ink, fontSize: 30, fontWeight: '900' },
  subtitle: { color: colors.muted, marginTop: 6, marginBottom: 18 },
  question: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 14,
  },
  prompt: { color: colors.ink, fontWeight: '900', fontSize: 16, lineHeight: 22, marginBottom: 10 },
  option: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    backgroundColor: '#FAFBF8',
  },
  optionText: { color: colors.ink, lineHeight: 20 },
  correct: { backgroundColor: colors.mint, borderColor: colors.green },
  wrong: { backgroundColor: '#FDEDEA', borderColor: colors.coral },
  explanation: { color: colors.muted, lineHeight: 20, marginTop: 12 },
  button: { minHeight: 52, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  buttonText: { color: colors.surface, fontWeight: '900', fontSize: 16 },
});
