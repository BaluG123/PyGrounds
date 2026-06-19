import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CheckCircle2, ClipboardList, PlayCircle, FileText, Sparkles, ChevronDown, ChevronRight } from 'lucide-react-native';
import { courses } from '../content/courses';
import type { CourseStackParamList } from '../navigation/types';
import { useProgress } from '../services/ProgressContext';
import { colors, shadow } from '../theme/theme';

type Props = NativeStackScreenProps<CourseStackParamList, 'CourseHome'>;

export function CourseHomeScreen({ route, navigation }: Props) {
  const course = courses.find(item => item.id === route.params.courseId)!;
  const { progress } = useProgress();
  const Icon = course.Icon;
  const [expandedConcept, setExpandedConcept] = useState<number | null>(null);

  // Calculate lessons per concept (distribute evenly)
  const lessonsPerConcept = Math.ceil(course.lessons.length / course.concepts.length);
  
  const getConceptLessons = (conceptIndex: number) => {
    const start = conceptIndex * lessonsPerConcept;
    const end = Math.min(start + lessonsPerConcept, course.lessons.length);
    return course.lessons.slice(start, end);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={[styles.header, { backgroundColor: course.color }]}>
        <Icon color={colors.surface} size={36} />
        <Text style={styles.moduleLabel}>Academic Module</Text>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.subtitle}>{course.subtitle}</Text>
        <View style={styles.headerStats}>
          <View style={styles.headerStat}>
            <Text style={styles.headerStatValue}>{course.lessons.length}</Text>
            <Text style={styles.headerStatLabel}>lessons</Text>
          </View>
          <View style={styles.headerStat}>
            <Text style={styles.headerStatValue}>{course.concepts.length}</Text>
            <Text style={styles.headerStatLabel}>concepts</Text>
          </View>
          <View style={styles.headerStat}>
            <Text style={styles.headerStatValue}>{course.practice.length}</Text>
            <Text style={styles.headerStatLabel}>labs</Text>
          </View>
        </View>
      </View>

      <View style={styles.history}>
        <Text style={styles.cardTitle}>Context and Learning Outcome</Text>
        <Text style={styles.meta}>Founder: {course.history.founder}</Text>
        <Text style={styles.meta}>First released: {course.history.released}</Text>
        <Text style={styles.body}>{course.history.summary}</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Sparkles color={course.color} size={20} />
        <Text style={styles.sectionTitle}>Learning Path</Text>
      </View>
      <Text style={styles.pathDescription}>Tap any concept to explore its lessons</Text>

      <View style={styles.conceptsContainer}>
        {course.concepts.map((concept, conceptIndex) => {
          const conceptLessons = getConceptLessons(conceptIndex);
          const isExpanded = expandedConcept === conceptIndex;
          const allDone = conceptLessons.every(lesson => progress.completedLessons[lesson.id]);
          const someDone = conceptLessons.some(lesson => progress.completedLessons[lesson.id]);

          return (
            <View key={concept} style={styles.conceptWrapper}>
              <Pressable
                style={[
                  styles.conceptCard,
                  isExpanded && styles.conceptCardExpanded,
                  { borderColor: isExpanded ? course.color : colors.line }
                ]}
                onPress={() => setExpandedConcept(isExpanded ? null : conceptIndex)}
              >
                <View style={styles.conceptTopRow}>
                  <View style={[styles.conceptBadge, { backgroundColor: course.accent }]}>
                    <Text style={[styles.conceptBadgeText, { color: course.color }]}>
                      {String(conceptIndex + 1).padStart(2, '0')}
                    </Text>
                  </View>
                  <View style={styles.conceptProgress}>
                    {allDone ? (
                      <View style={[styles.progressDot, { backgroundColor: course.color }]}>
                        <CheckCircle2 color={colors.surface} size={14} />
                      </View>
                    ) : someDone ? (
                      <View style={[styles.progressDot, { backgroundColor: course.accent, borderWidth: 2, borderColor: course.color }]} />
                    ) : null}
                  </View>
                  <View style={styles.chevronContainer}>
                    {isExpanded ? (
                      <ChevronDown color={course.color} size={20} />
                    ) : (
                      <ChevronRight color={colors.muted} size={20} />
                    )}
                  </View>
                </View>
                <Text style={styles.conceptText}>{concept}</Text>
                <View style={styles.conceptMeta}>
                  <Text style={[styles.lessonCount, { color: course.color }]}>
                    {conceptLessons.length} {conceptLessons.length === 1 ? 'lesson' : 'lessons'}
                  </Text>
                </View>
              </Pressable>

              {isExpanded && (
                <View style={[styles.lessonsPanel, { borderColor: course.color }]}>
                  {conceptLessons.map((lesson, lessonIndex) => {
                    const done = progress.completedLessons[lesson.id];
                    const globalIndex = conceptIndex * lessonsPerConcept + lessonIndex;
                    return (
                      <Pressable
                        key={lesson.id}
                        style={styles.miniLesson}
                        onPress={() => navigation.navigate('Lesson', { courseId: course.id, lessonId: lesson.id })}
                      >
                        <View style={[styles.miniLessonIndex, done && { backgroundColor: course.color }]}>
                          {done ? (
                            <CheckCircle2 color={colors.surface} size={16} />
                          ) : (
                            <Text style={styles.miniLessonIndexText}>{globalIndex + 1}</Text>
                          )}
                        </View>
                        <View style={styles.miniLessonText}>
                          <Text style={styles.miniLessonTitle}>{lesson.title}</Text>
                          <Text style={styles.miniLessonMeta}>{lesson.duration}</Text>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </View>

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
  moduleLabel: {
    color: colors.yellow,
    fontWeight: '900',
    marginTop: 12,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  headerStats: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  headerStat: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    padding: 10,
  },
  headerStatValue: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: '900',
  },
  headerStatLabel: {
    color: '#EEF7F3',
    fontSize: 12,
    marginTop: 2,
    fontWeight: '700',
  },
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
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  sectionTitle: { color: colors.ink, fontSize: 20, fontWeight: '900' },
  pathDescription: { color: colors.muted, fontSize: 14, marginBottom: 12 },
  conceptsContainer: { marginBottom: 24, gap: 12 },
  conceptWrapper: { marginBottom: 4 },
  conceptCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 2,
    borderColor: colors.line,
    ...shadow,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  conceptCardExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    ...shadow,
    shadowOpacity: 0.12,
  },
  conceptTopRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 10 
  },
  conceptBadge: {
    minWidth: 36,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  conceptBadgeText: {
    fontSize: 13,
    fontWeight: '900',
  },
  conceptProgress: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 8,
  },
  progressDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronContainer: {
    width: 24,
    alignItems: 'center',
  },
  conceptText: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
    marginBottom: 8,
  },
  conceptMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonCount: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  lessonsPanel: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 8,
  },
  miniLesson: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
  },
  miniLessonIndex: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniLessonIndexText: { color: colors.green, fontWeight: '900', fontSize: 12 },
  miniLessonText: { flex: 1 },
  miniLessonTitle: { color: colors.ink, fontSize: 14, fontWeight: '800' },
  miniLessonMeta: { color: colors.muted, fontSize: 12, marginTop: 2 },
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
