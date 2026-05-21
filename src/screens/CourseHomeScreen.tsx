import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CheckCircle2, ClipboardList, PlayCircle, FileText, Sparkles } from 'lucide-react-native';
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

      <View style={styles.sectionHeader}>
        <Sparkles color={course.color} size={20} />
        <Text style={styles.sectionTitle}>Key Concepts</Text>
      </View>
      <View style={styles.conceptsContainer}>
        {course.concepts.map((concept, index) => (
          <View key={concept} style={styles.conceptCard}>
            <View style={styles.conceptTopRow}>
              <View style={[styles.conceptBadge, { backgroundColor: course.accent }]}>
                <Text style={[styles.conceptBadgeText, { color: course.color }]}>
                  {String(index + 1).padStart(2, '0')}
                </Text>
              </View>
              <Text style={[styles.conceptLabel, { color: course.color }]}>Concept</Text>
            </View>
            <Text style={styles.conceptText}>{concept}</Text>
            <View style={[styles.conceptRule, { backgroundColor: course.color }]} />
          </View>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Lessons</Text>
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
        <Pressable style={styles.action} onPress={() => navigation.navigate('Notes', { courseId: course.id })}>
          <FileText color={course.color} size={24} />
          <Text style={styles.actionText}>PDF Notes</Text>
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
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
    ...shadow,
  },
  title: { color: colors.surface, fontSize: 32, fontWeight: '900', marginTop: 12 },
  subtitle: { color: '#EEF7F3', marginTop: 6, lineHeight: 20 },
  history: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 24,
    ...shadow,
  },
  cardTitle: { color: colors.ink, fontSize: 18, fontWeight: '900', marginBottom: 8 },
  meta: { color: colors.ink, fontWeight: '700', marginTop: 4 },
  body: { color: colors.muted, lineHeight: 20, marginTop: 10 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionTitle: { color: colors.ink, fontSize: 20, fontWeight: '900', marginBottom: 12 },
  conceptsContainer: { marginBottom: 24, gap: 12 },
  conceptCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow,
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
  },
  conceptTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  conceptBadge: {
    minWidth: 34,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  conceptBadgeText: {
    fontSize: 12,
    fontWeight: '900',
  },
  conceptLabel: { fontSize: 11, fontWeight: '900', textTransform: 'uppercase' },
  conceptText: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 21,
  },
  conceptRule: { height: 3, borderRadius: 2, marginTop: 12, width: 54, opacity: 0.8 },
  lesson: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow,
    shadowOpacity: 0.04,
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
  actions: { flexDirection: 'row', gap: 10, marginTop: 16 },
  action: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    ...shadow,
    shadowOpacity: 0.04,
  },
  actionText: { color: colors.ink, fontWeight: '800', fontSize: 12, textAlign: 'center' },
});
