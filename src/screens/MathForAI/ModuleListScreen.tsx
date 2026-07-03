import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChevronRight, Clock, ClipboardList } from 'lucide-react-native';
import { getModulesForCourse, getTrackById } from '../../content/academic';
import { getCourseById } from '../../content/courses';
import { getTrackQuiz } from '../../content/academic/quizzes';
import { TopicProgressBadge } from '../../components/MathForAI/TopicProgressBadge';
import type { AcademicStackParamList } from '../../navigation/types';
import { useAcademicProgress } from '../../services/AcademicProgressContext';
import { colors, shadow, spacing } from '../../theme/theme';

type Props = NativeStackScreenProps<AcademicStackParamList, 'ModuleList'>;

export function ModuleListScreen({ route, navigation }: Props) {
  const { trackId, courseId } = route.params;
  const track = getTrackById(trackId)!;
  const course = courseId ? getCourseById(courseId) : undefined;
  const modules = courseId ? getModulesForCourse(courseId) : track.modules;
  const quiz = getTrackQuiz(track.id);
  const { isComplete, getQuizScore } = useAcademicProgress();
  const quizScore = getQuizScore(track.id);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {course ? (
        <Text style={styles.courseLabel}>{course.title} · Theory Guide</Text>
      ) : null}
      <Text style={styles.levelBadge}>{track.levelBadge}</Text>
      <Text style={styles.subtitle}>{course ? course.subtitle : track.subtitle}</Text>

      {quiz ? (
        <Pressable
          style={[styles.quizCard, { borderColor: track.color, backgroundColor: track.accent }]}
          onPress={() => navigation.navigate('TrackQuiz', { trackId: track.id, courseId })}
        >
          <ClipboardList color={track.color} size={22} />
          <View style={styles.quizText}>
            <Text style={[styles.quizTitle, { color: track.color }]}>Track Mastery Quiz</Text>
            <Text style={styles.quizMeta}>
              {quiz.questions.length} questions
              {quizScore > 0 ? ` · Best score ${quizScore}/${quiz.questions.length}` : ' · Test your understanding'}
            </Text>
          </View>
          <ChevronRight color={track.color} size={20} />
        </Pressable>
      ) : null}

      {modules.map((module, moduleIndex) => (
        <View key={module.id} style={styles.moduleSection}>
          <View style={styles.moduleHeader}>
            <View style={[styles.moduleBadge, { backgroundColor: track.accent }]}>
              <Text style={[styles.moduleBadgeText, { color: track.color }]}>
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
                    trackId: track.id,
                    moduleId: module.id,
                    topicId: topic.id,
                  })
                }
              >
                <View style={[styles.topicIndex, { backgroundColor: done ? colors.mint : track.accent }]}>
                  <Text style={[styles.topicIndexText, { color: done ? colors.green : track.color }]}>
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
                    <Text style={styles.meta}>{topic.estMinutes} min</Text>
                  </View>
                </View>
                <TopicProgressBadge complete={done} size="sm" />
                <ChevronRight color={colors.muted} size={18} />
              </Pressable>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  courseLabel: { color: colors.muted, fontSize: 12, fontWeight: '800', textTransform: 'uppercase', marginBottom: 4 },
  levelBadge: { color: colors.green, fontSize: 12, fontWeight: '800', marginBottom: 6 },
  subtitle: { color: colors.ink, fontSize: 15, lineHeight: 22, marginBottom: spacing.md },
  quizCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 14,
    marginBottom: spacing.lg,
    ...shadow,
  },
  quizText: { flex: 1 },
  quizTitle: { fontWeight: '900', fontSize: 16 },
  quizMeta: { color: colors.muted, fontSize: 13, marginTop: 3 },
  moduleSection: { marginBottom: spacing.xl },
  moduleHeader: { flexDirection: 'row', gap: 12, marginBottom: spacing.md },
  moduleBadge: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  moduleBadgeText: { fontWeight: '900', fontSize: 14 },
  moduleHeaderText: { flex: 1 },
  moduleTitle: { color: colors.ink, fontWeight: '900', fontSize: 18 },
  moduleSubtitle: { color: colors.muted, fontSize: 14, lineHeight: 20, marginTop: 4 },
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
  meta: { color: colors.muted, fontSize: 12 },
});
