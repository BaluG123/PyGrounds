import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { BookOpenCheck, Brain, CheckCircle2, Lightbulb, TerminalSquare, Trophy } from 'lucide-react-native';
import {
  problemConcepts,
  problemDifficulties,
  problemLessons,
  problemQuestions,
  type ProblemDifficulty,
} from '../content/problemSolving';
import type { RootDrawerParamList } from '../navigation/types';
import { colors, shadow } from '../theme/theme';

type Props = DrawerScreenProps<RootDrawerParamList, 'Problem Solving'>;
type Filter = 'All' | ProblemDifficulty;

export function ProblemSolvingScreen({ navigation }: Props) {
  const [filter, setFilter] = useState<Filter>('All');
  const [visibleLimit, setVisibleLimit] = useState(30);

  const visibleQuestions = useMemo(() => {
    if (filter === 'All') return problemQuestions;
    return problemQuestions.filter(question => question.difficulty === filter);
  }, [filter]);

  const displayedQuestions = visibleQuestions.slice(0, visibleLimit);

  useEffect(() => {
    setVisibleLimit(30);
  }, [filter]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <View style={styles.heroIcon}>
            <Brain color={colors.surface} size={32} />
          </View>
          <View style={styles.heroStat}>
            <Text style={styles.heroStatValue}>{problemQuestions.length}+</Text>
            <Text style={styles.heroStatLabel}>questions</Text>
          </View>
        </View>
        <Text style={styles.title}>Problem Solving</Text>
        <Text style={styles.subtitle}>
          Train logic with small coding challenges, guided lessons, and playground-ready labs. The goal is simple: think, predict, run, debug, and improve.
        </Text>
      </View>

      <View style={styles.sectionHeader}>
        <BookOpenCheck color={colors.green} size={21} />
        <Text style={styles.sectionTitle}>Mini Lessons</Text>
      </View>
      {problemLessons.map((lesson, index) => (
        <View key={lesson.id} style={styles.lessonCard}>
          <View style={styles.lessonNumber}>
            <Text style={styles.lessonNumberText}>{index + 1}</Text>
          </View>
          <View style={styles.lessonBody}>
            <View style={styles.lessonTopLine}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.lessonTime}>{lesson.minutes}</Text>
            </View>
            <Text style={styles.lessonSummary}>{lesson.summary}</Text>
            {lesson.points.map(point => (
              <View key={point} style={styles.pointRow}>
                <CheckCircle2 color={colors.green} size={16} />
                <Text style={styles.pointText}>{point}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      <View style={styles.sectionHeader}>
        <Lightbulb color={colors.yellow} size={21} />
        <Text style={styles.sectionTitle}>Concept Blocks</Text>
      </View>
      <View style={styles.conceptGrid}>
        {problemConcepts.map(concept => (
          <View key={concept.title} style={styles.conceptCard}>
            <Text style={styles.conceptTitle}>{concept.title}</Text>
            <Text style={styles.conceptBody}>{concept.body}</Text>
            <Text style={styles.pattern}>{concept.pattern}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Trophy color={colors.coral} size={21} />
        <Text style={styles.sectionTitle}>Practice Labs</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {problemDifficulties.map(item => {
          const active = filter === item;
          return (
            <Pressable
              key={item}
              style={[styles.filterButton, active && styles.filterButtonActive]}
              onPress={() => setFilter(item)}
            >
              <Text style={[styles.filterText, active && styles.filterTextActive]}>{item}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <Text style={styles.questionCount}>
        Showing {visibleQuestions.length} playground labs from basic to advanced.
      </Text>

      {displayedQuestions.map((question, index) => (
        <View key={question.id} style={styles.questionCard}>
          <View style={styles.questionTop}>
            <Text style={styles.questionIndex}>#{index + 1}</Text>
            <Text style={styles.difficulty}>{question.difficulty}</Text>
          </View>
          <Text style={styles.questionTitle}>{question.title}</Text>
          <Text style={styles.prompt}>{question.prompt}</Text>
          <View style={styles.metaBox}>
            <Text style={styles.metaLabel}>Focus</Text>
            <Text style={styles.metaText}>{question.focus}</Text>
            <Text style={styles.metaLabel}>Hint</Text>
            <Text style={styles.metaText}>{question.hint}</Text>
          </View>
          <Pressable
            style={styles.button}
            onPress={() =>
              navigation.navigate('Playground', {
                starterCode: question.starterCode,
                practiceId: question.id,
              })
            }
          >
            <TerminalSquare color={colors.surface} size={20} />
            <Text style={styles.buttonText}>Solve in Playground</Text>
          </Pressable>
        </View>
      ))}

      {visibleLimit < visibleQuestions.length ? (
        <Pressable style={styles.loadMore} onPress={() => setVisibleLimit(limit => limit + 30)}>
          <Text style={styles.loadMoreText}>Load More Questions</Text>
        </Pressable>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 36 },
  hero: {
    backgroundColor: colors.navy,
    borderRadius: 12,
    padding: 20,
    marginBottom: 22,
    ...shadow,
  },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 12,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroStat: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  heroStatValue: { color: colors.green, fontSize: 20, fontWeight: '900' },
  heroStatLabel: { color: colors.muted, fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  title: { color: colors.surface, fontSize: 32, fontWeight: '900', marginTop: 16 },
  subtitle: { color: '#EAF2EF', lineHeight: 22, marginTop: 8 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12, marginTop: 6 },
  sectionTitle: { color: colors.ink, fontSize: 21, fontWeight: '900' },
  lessonCard: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    ...shadow,
    shadowOpacity: 0.04,
  },
  lessonNumber: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonNumberText: { color: colors.green, fontWeight: '900' },
  lessonBody: { flex: 1 },
  lessonTopLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  lessonTitle: { color: colors.ink, fontSize: 16, fontWeight: '900', flex: 1 },
  lessonTime: { color: colors.blue, fontSize: 12, fontWeight: '900' },
  lessonSummary: { color: colors.muted, lineHeight: 20, marginTop: 6, marginBottom: 8 },
  pointRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start', marginTop: 6 },
  pointText: { color: colors.ink, flex: 1, lineHeight: 19 },
  conceptGrid: { gap: 10, marginBottom: 18 },
  conceptCard: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 14,
    borderLeftWidth: 5,
    borderLeftColor: colors.yellow,
  },
  conceptTitle: { color: colors.ink, fontSize: 17, fontWeight: '900' },
  conceptBody: { color: colors.muted, lineHeight: 20, marginTop: 5 },
  pattern: {
    color: colors.ink,
    backgroundColor: '#F5F7F3',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    fontFamily: 'Courier',
    lineHeight: 18,
  },
  filters: { gap: 8, paddingBottom: 8 },
  filterButton: {
    minHeight: 38,
    borderRadius: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
  },
  filterButtonActive: { backgroundColor: colors.green, borderColor: colors.green },
  filterText: { color: colors.ink, fontWeight: '900' },
  filterTextActive: { color: colors.surface },
  questionCount: { color: colors.muted, lineHeight: 20, marginBottom: 12 },
  questionCard: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 16,
    marginBottom: 14,
    ...shadow,
    shadowOpacity: 0.04,
  },
  questionTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  questionIndex: { color: colors.green, fontWeight: '900' },
  difficulty: { color: colors.coral, fontSize: 12, fontWeight: '900', textTransform: 'uppercase' },
  questionTitle: { color: colors.ink, fontSize: 18, fontWeight: '900', marginTop: 8 },
  prompt: { color: colors.ink, lineHeight: 21, marginTop: 8 },
  metaBox: {
    backgroundColor: '#F5F7F3',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    gap: 4,
  },
  metaLabel: { color: colors.green, fontSize: 12, fontWeight: '900', textTransform: 'uppercase' },
  metaText: { color: colors.ink, lineHeight: 19, marginBottom: 5 },
  button: {
    minHeight: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
    backgroundColor: colors.green,
  },
  buttonText: { color: colors.surface, fontWeight: '900' },
  loadMore: {
    minHeight: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  loadMoreText: { color: colors.green, fontWeight: '900' },
});
