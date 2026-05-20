import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CheckCircle2, ClipboardList, PlayCircle } from 'lucide-react-native';
import { courses } from '../content/courses';
import type { CourseStackParamList } from '../navigation/types';
import { useProgress } from '../services/ProgressContext';
import { colors, shadow } from '../theme/theme';

type Props = NativeStackScreenProps<CourseStackParamList, 'CourseHome'>;

export function CourseHomeScreen({ route, navigation }: Props) {
  const course = courses.find(item => item.id === route.params.courseId)!;
  const { progress } = useProgress();
  const Icon = course.Icon;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={[styles.header, { backgroundColor: course.color }]}>
        <Icon color={colors.surface} size={36} />
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.subtitle}>{course.subtitle}</Text>
      </View>

      <View style={styles.history}>
        <Text style={styles.cardTitle}>Small History</Text>
        <Text style={styles.meta}>Founder: {course.history.founder}</Text>
        <Text style={styles.meta}>First released: {course.history.released}</Text>
        <Text style={styles.body}>{course.history.summary}</Text>
      </View>

      <Text style={styles.sectionTitle}>Important Concepts</Text>
      <View style={styles.concepts}>
        {course.concepts.map(concept => (
          <View key={concept} style={[styles.pill, { backgroundColor: course.accent }]}>
            <Text style={[styles.pillText, { color: course.color }]}>{concept}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Lessons</Text>
      {course.lessons.map((lesson, index) => {
        const done = progress.completedLessons[lesson.id];
        return (
          <Pressable
            key={lesson.id}
            style={styles.lesson}
            onPress={() => navigation.navigate('Lesson', { courseId: course.id, lessonId: lesson.id })}
          >
            <View style={[styles.lessonIndex, done && { backgroundColor: course.color }]}>
              {done ? (
                <CheckCircle2 color={colors.surface} size={20} />
              ) : (
                <Text style={styles.lessonIndexText}>{index + 1}</Text>
              )}
            </View>
            <View style={styles.lessonText}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.lessonMeta}>{lesson.duration} - {lesson.objective}</Text>
            </View>
          </Pressable>
        );
      })}

      <View style={styles.actions}>
        <Pressable style={styles.action} onPress={() => navigation.navigate('Practice', { courseId: course.id })}>
          <PlayCircle color={course.color} size={24} />
          <Text style={styles.actionText}>Practice Labs</Text>
        </Pressable>
        <Pressable style={styles.action} onPress={() => navigation.navigate('Quiz', { courseId: course.id })}>
          <ClipboardList color={course.color} size={24} />
          <Text style={styles.actionText}>Quiz</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 36 },
  header: {
    borderRadius: 8,
    padding: 22,
    marginBottom: 16,
  },
  title: { color: colors.surface, fontSize: 32, fontWeight: '900', marginTop: 12 },
  subtitle: { color: '#EEF7F3', marginTop: 6, lineHeight: 20 },
  history: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 18,
    ...shadow,
  },
  cardTitle: { color: colors.ink, fontSize: 18, fontWeight: '900', marginBottom: 8 },
  meta: { color: colors.ink, fontWeight: '700', marginTop: 4 },
  body: { color: colors.muted, lineHeight: 20, marginTop: 10 },
  sectionTitle: { color: colors.ink, fontSize: 20, fontWeight: '900', marginBottom: 12 },
  concepts: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 22 },
  pill: { borderRadius: 8, paddingVertical: 8, paddingHorizontal: 10 },
  pillText: { fontWeight: '800', fontSize: 12 },
  lesson: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.line,
  },
  lessonIndex: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonIndexText: { color: colors.green, fontWeight: '900' },
  lessonText: { flex: 1 },
  lessonTitle: { color: colors.ink, fontSize: 16, fontWeight: '900' },
  lessonMeta: { color: colors.muted, lineHeight: 18, marginTop: 3 },
  actions: { flexDirection: 'row', gap: 12, marginTop: 10 },
  action: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    gap: 8,
  },
  actionText: { color: colors.ink, fontWeight: '900' },
});
