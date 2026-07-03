import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Clock,
  Code2,
  FileText,
  PlayCircle,
  Sparkles,
} from 'lucide-react-native';
import { getCourseById, getUnifiedQuizForCourse } from '../content/courses';
import { getLabsForCourse, getModulesForCourse, getTrackByCourseId } from '../content/academic';
import { BRAND } from '../constants/brand';
import { TopicProgressBadge } from '../components/MathForAI/TopicProgressBadge';
import type { CourseStackParamList } from '../navigation/types';
import { useAcademicProgress } from '../services/AcademicProgressContext';
import { useProgress } from '../services/ProgressContext';
import { colors, shadow } from '../theme/theme';

type Props = NativeStackScreenProps<CourseStackParamList, 'CourseHome'>;

export function CourseHomeScreen({ route, navigation }: Props) {
  const course = getCourseById(route.params.courseId)!;
  const academicTrack = getTrackByCourseId(course.id);
  const theoryModules = getModulesForCourse(course.id);
  const academicLabs = getLabsForCourse(course.id);
  const unifiedQuiz = getUnifiedQuizForCourse(course.id);
  const theoryTopicCount = theoryModules.reduce((sum, m) => sum + m.topics.length, 0);
  const totalLabs = course.practice.length + academicLabs.length;

  const { progress } = useProgress();
  const { isComplete } = useAcademicProgress();
  const Icon = course.Icon;
  const [expandedConcept, setExpandedConcept] = useState<number | null>(null);

  const lessonsPerConcept = Math.ceil(course.lessons.length / course.concepts.length);

  const getConceptLessons = (conceptIndex: number) => {
    const start = conceptIndex * lessonsPerConcept;
    const end = Math.min(start + lessonsPerConcept, course.lessons.length);
    return course.lessons.slice(start, end);
  };

  const accent = academicTrack?.color ?? course.color;
  const accentBg = academicTrack?.accent ?? course.accent;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={[styles.header, { backgroundColor: course.color }]}>
        <Icon color={colors.surface} size={36} />
        <Text style={styles.moduleLabel}>{BRAND.appName} · Unified Course</Text>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.subtitle}>{course.subtitle}</Text>
        <View style={styles.headerStats}>
          <View style={styles.headerStat}>
            <Text style={styles.headerStatValue}>{course.lessons.length}</Text>
            <Text style={styles.headerStatLabel}>lessons</Text>
          </View>
          <View style={styles.headerStat}>
            <Text style={styles.headerStatValue}>{theoryTopicCount}</Text>
            <Text style={styles.headerStatLabel}>theory</Text>
          </View>
          <View style={styles.headerStat}>
            <Text style={styles.headerStatValue}>{totalLabs}</Text>
            <Text style={styles.headerStatLabel}>labs</Text>
          </View>
          <View style={styles.headerStat}>
            <Text style={styles.headerStatValue}>{unifiedQuiz.length}</Text>
            <Text style={styles.headerStatLabel}>quiz Qs</Text>
          </View>
        </View>
      </View>

      <View style={styles.history}>
        <Text style={styles.cardTitle}>Context and Learning Outcome</Text>
        <Text style={styles.meta}>Founder: {course.history.founder}</Text>
        <Text style={styles.meta}>First released: {course.history.released}</Text>
        <Text style={styles.body}>{course.history.summary}</Text>
        {academicTrack ? (
          <Text style={[styles.levelBadge, { color: accent }]}>{academicTrack.levelBadge}</Text>
        ) : null}
      </View>

      {theoryModules.length > 0 && academicTrack ? (
        <>
          <View style={styles.sectionHeader}>
            <BookOpen color={accent} size={20} />
            <Text style={styles.sectionTitle}>Theory Guide</Text>
          </View>
          <Text style={styles.pathDescription}>
            Deep reading with formulas and code — Master AI Hub theory content
          </Text>
          {theoryModules.map((module, moduleIndex) => (
            <View key={module.id} style={styles.moduleSection}>
              <View style={styles.moduleHeader}>
                <View style={[styles.moduleBadge, { backgroundColor: accentBg }]}>
                  <Text style={[styles.moduleBadgeText, { color: accent }]}>
                    {String(moduleIndex + 1).padStart(2, '0')}
                  </Text>
                </View>
                <View style={styles.moduleHeaderText}>
                  <Text style={styles.moduleTitle}>{module.title}</Text>
                  <Text style={styles.moduleSubtitle}>{module.subtitle}</Text>
                </View>
              </View>
              {module.topics.map((topic, topicIndex) => {
                const done = isComplete(topic.id);
                return (
                  <Pressable
                    key={topic.id}
                    style={[styles.topicCard, done && styles.topicCardDone]}
                    onPress={() =>
                      navigation.navigate('TopicDetail', {
                        courseId: course.id,
                        trackId: academicTrack.id,
                        moduleId: module.id,
                        topicId: topic.id,
                      })
                    }
                  >
                    <View style={[styles.topicIndex, { backgroundColor: done ? colors.mint : accentBg }]}>
                      <Text style={[styles.topicIndexText, { color: done ? colors.green : accent }]}>
                        {topicIndex + 1}
                      </Text>
                    </View>
                    <View style={styles.topicBody}>
                      <Text style={styles.topicTitle}>{topic.title}</Text>
                      {topic.objective ? (
                        <Text style={styles.objective} numberOfLines={2}>{topic.objective}</Text>
                      ) : null}
                      <View style={styles.metaRow}>
                        <Clock color={colors.muted} size={13} />
                        <Text style={styles.metaSmall}>{topic.estMinutes} min read</Text>
                      </View>
                    </View>
                    <TopicProgressBadge complete={done} size="sm" />
                    <ChevronRight color={colors.muted} size={18} />
                  </Pressable>
                );
              })}
            </View>
          ))}
        </>
      ) : null}

      <View style={styles.sectionHeader}>
        <Sparkles color={course.color} size={20} />
        <Text style={styles.sectionTitle}>Interactive Lessons</Text>
      </View>
      <Text style={styles.pathDescription}>Tap a concept to open guided lessons with playgrounds</Text>

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
                  { borderColor: isExpanded ? course.color : colors.line },
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
                      <View
                        style={[
                          styles.progressDot,
                          { backgroundColor: course.accent, borderWidth: 2, borderColor: course.color },
                        ]}
                      />
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
                <Text style={[styles.lessonCount, { color: course.color }]}>
                  {conceptLessons.length} {conceptLessons.length === 1 ? 'lesson' : 'lessons'}
                </Text>
              </Pressable>

              {isExpanded ? (
                <View style={[styles.lessonsPanel, { borderColor: course.color }]}>
                  {conceptLessons.map((lesson, lessonIndex) => {
                    const done = progress.completedLessons[lesson.id];
                    const globalIndex = conceptIndex * lessonsPerConcept + lessonIndex;
                    return (
                      <Pressable
                        key={lesson.id}
                        style={styles.miniLesson}
                        onPress={() =>
                          navigation.navigate('Lesson', { courseId: course.id, lessonId: lesson.id })
                        }
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
              ) : null}
            </View>
          );
        })}
      </View>

      {totalLabs > 0 ? (
        <>
          <View style={styles.sectionHeader}>
            <Code2 color={accent} size={20} />
            <Text style={styles.sectionTitle}>Labs</Text>
          </View>
          <Text style={styles.pathDescription}>Practice playgrounds and Python code reference labs</Text>

          {course.practice.map(item => (
            <Pressable
              key={item.id}
              style={styles.labCard}
              onPress={() => navigation.navigate('Practice', { courseId: course.id })}
            >
              <View style={[styles.labBadge, { backgroundColor: course.accent }]}>
                <PlayCircle color={course.color} size={18} />
              </View>
              <View style={styles.labBody}>
                <Text style={styles.labTitle}>{item.title}</Text>
                <Text style={styles.labMeta} numberOfLines={2}>{item.prompt}</Text>
                <Text style={[styles.labTag, { color: course.color }]}>Interactive · Practice</Text>
              </View>
              <ChevronRight color={colors.muted} size={18} />
            </Pressable>
          ))}

          {academicLabs.map(lab => (
            <Pressable
              key={lab.id}
              style={styles.labCard}
              onPress={() => navigation.navigate('LabDetail', { courseId: course.id, labId: lab.id })}
            >
              <View style={[styles.labBadge, { backgroundColor: accentBg }]}>
                <Code2 color={accent} size={18} />
              </View>
              <View style={styles.labBody}>
                <Text style={styles.labTitle}>{lab.title}</Text>
                <Text style={styles.labMeta} numberOfLines={2}>{lab.description}</Text>
                <Text style={[styles.labTag, { color: accent }]}>
                  {lab.snippets.length} snippet{lab.snippets.length === 1 ? '' : 's'} · Code Lab
                </Text>
              </View>
              <ChevronRight color={colors.muted} size={18} />
            </Pressable>
          ))}
        </>
      ) : null}

      <View style={styles.actions}>
        <Pressable
          style={[styles.action, styles.actionPrimary, { backgroundColor: accent, borderColor: accent }]}
          onPress={() => navigation.navigate('Quiz', { courseId: course.id })}
        >
          <ClipboardList color={colors.surface} size={24} />
          <Text style={[styles.actionText, styles.actionTextPrimary]}>
            Unified Quiz ({unifiedQuiz.length})
          </Text>
        </Pressable>
        <Pressable style={styles.action} onPress={() => navigation.navigate('Notes', { courseId: course.id })}>
          <FileText color={course.color} size={24} />
          <Text style={styles.actionText}>PDF Notes</Text>
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
  headerStats: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 18 },
  headerStat: {
    flexGrow: 1,
    flexBasis: '22%',
    minWidth: 70,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    padding: 10,
  },
  headerStatValue: { color: colors.surface, fontSize: 18, fontWeight: '900' },
  headerStatLabel: { color: '#EEF7F3', fontSize: 11, marginTop: 2, fontWeight: '700' },
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
  levelBadge: { fontSize: 12, fontWeight: '800', marginTop: 10 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8, marginTop: 8 },
  sectionTitle: { color: colors.ink, fontSize: 20, fontWeight: '900' },
  pathDescription: { color: colors.muted, fontSize: 14, marginBottom: 12, lineHeight: 20 },
  moduleSection: { marginBottom: 20 },
  moduleHeader: { flexDirection: 'row', gap: 12, marginBottom: 10 },
  moduleBadge: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  moduleBadgeText: { fontWeight: '900', fontSize: 14 },
  moduleHeaderText: { flex: 1 },
  moduleTitle: { color: colors.ink, fontWeight: '900', fontSize: 17 },
  moduleSubtitle: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 4 },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 12,
    marginBottom: 8,
    ...shadow,
  },
  topicCardDone: { borderColor: colors.mint },
  topicIndex: { width: 32, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  topicIndexText: { fontWeight: '900', fontSize: 13 },
  topicBody: { flex: 1 },
  topicTitle: { color: colors.ink, fontWeight: '800', fontSize: 15 },
  objective: { color: colors.muted, fontSize: 13, lineHeight: 18, marginTop: 3 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  metaSmall: { color: colors.muted, fontSize: 12 },
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
  },
  conceptCardExpanded: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
  conceptTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  conceptBadge: {
    minWidth: 36,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  conceptBadgeText: { fontSize: 13, fontWeight: '900' },
  conceptProgress: { flex: 1, alignItems: 'flex-end', marginRight: 8 },
  progressDot: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  chevronContainer: { width: 24, alignItems: 'center' },
  conceptText: { color: colors.ink, fontSize: 16, fontWeight: '800', lineHeight: 22, marginBottom: 8 },
  lessonCount: { fontSize: 12, fontWeight: '800', textTransform: 'uppercase' },
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
  labCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 14,
    marginBottom: 8,
    ...shadow,
  },
  labBadge: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  labBody: { flex: 1 },
  labTitle: { color: colors.ink, fontWeight: '900', fontSize: 15 },
  labMeta: { color: colors.muted, fontSize: 13, lineHeight: 18, marginTop: 3 },
  labTag: { fontSize: 11, fontWeight: '800', marginTop: 5, textTransform: 'uppercase' },
  actions: { flexDirection: 'row', gap: 10, marginTop: 8 },
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
  actionPrimary: {},
  actionText: { color: colors.ink, fontWeight: '800', fontSize: 12, textAlign: 'center' },
  actionTextPrimary: { color: colors.surface },
});
