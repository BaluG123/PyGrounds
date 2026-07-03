import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import { BookOpen, ChevronRight, Code2, Search, Sparkles } from 'lucide-react-native';
import { CURRICULUM_SECTIONS, getAllTopicsFlat } from '../../content/academic';
import { getCourseById } from '../../content/courses';
import type { AcademicStackParamList, RootDrawerParamList } from '../../navigation/types';
import type { LibraryId } from '../../types/course';
import { colors, shadow, spacing } from '../../theme/theme';

type Props = NativeStackScreenProps<AcademicStackParamList, 'TrackList'>;

const DRAWER_ROUTES: Record<LibraryId, keyof RootDrawerParamList> = {
  'python-basics': 'Python Basics',
  'python-advanced': 'Python Advanced',
  numpy: 'NumPy',
  pandas: 'Pandas',
  matplotlib: 'Matplotlib',
  'math-ai': 'Math for AI',
  'linear-algebra': 'Math for AI',
  'machine-learning': 'Machine Learning',
  'scikit-learn': 'Scikit-Learn',
  'deep-learning': 'Deep Learning',
  nlp: 'NLP',
  genai: 'GenAI',
  'computer-vision': 'Computer Vision',
  'reinforcement-learning': 'Reinforcement Learning',
  'ai-engineering': 'AI Engineering',
  'ai-projects': 'AI Projects',
};

export function TrackListScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return getAllTopicsFlat().filter(item => item.title.toLowerCase().includes(q));
  }, [query]);

  function openCourse(courseId: LibraryId) {
    navigation.dispatch(CommonActions.navigate(DRAWER_ROUTES[courseId]));
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.hero}>
        <Sparkles color={colors.yellow} size={28} />
        <Text style={styles.heroLabel}>Master AI Hub</Text>
        <Text style={styles.heroTitle}>One curriculum. Every format.</Text>
        <Text style={styles.heroSubtitle}>
          Open any course for theory, interactive lessons, labs, and a unified quiz — all in one place.
        </Text>
      </View>

      <View style={styles.quickRow}>
        <Pressable style={styles.quickBtn} onPress={() => navigation.navigate('LabList', {})}>
          <Code2 color={colors.navy} size={18} />
          <Text style={styles.quickBtnText}>Browse All Labs</Text>
        </Pressable>
      </View>

      <View style={styles.searchWrap}>
        <Search color={colors.muted} size={18} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search theory topics…"
          placeholderTextColor={colors.muted}
          style={styles.searchInput}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>

      {searchResults.length > 0 ? (
        <View style={styles.searchResults}>
          {searchResults.map(item => (
            <Pressable
              key={`${item.trackId}-${item.topicId}`}
              style={styles.searchRow}
              onPress={() => {
                setQuery('');
                navigation.navigate('TopicDetail', {
                  trackId: item.trackId,
                  moduleId: item.moduleId,
                  topicId: item.topicId,
                });
              }}
            >
              <View style={styles.searchTextWrap}>
                <Text style={styles.searchTitle}>{item.title}</Text>
                <Text style={styles.searchMeta}>{item.trackTitle} · {item.estMinutes} min</Text>
              </View>
              <ChevronRight color={colors.muted} size={18} />
            </Pressable>
          ))}
        </View>
      ) : null}

      <View style={styles.sectionHeader}>
        <BookOpen color={colors.green} size={20} />
        <Text style={styles.sectionTitle}>All Courses</Text>
      </View>
      <Text style={styles.sectionHint}>
        Same rich content everywhere — theory guide, lessons, labs, and merged quiz on each course home.
      </Text>

      {CURRICULUM_SECTIONS.map(section => (
        <View key={section.title} style={styles.sectionBlock}>
          <Text style={styles.blockTitle}>{section.title}</Text>
          <Text style={styles.blockSubtitle}>{section.subtitle}</Text>
          {section.courseIds.map(courseId => {
            const course = getCourseById(courseId);
            if (!course) return null;
            const Icon = course.Icon;
            return (
              <Pressable
                key={courseId}
                style={styles.courseCard}
                onPress={() => openCourse(courseId)}
              >
                <View style={[styles.courseIconWrap, { backgroundColor: course.accent }]}>
                  <Icon color={course.color} size={20} />
                </View>
                <View style={styles.courseMeta}>
                  <Text style={styles.courseTitle}>{course.title}</Text>
                  <Text style={styles.courseSubtitle} numberOfLines={2}>{course.subtitle}</Text>
                </View>
                <ChevronRight color={colors.muted} size={20} />
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
  content: { paddingBottom: spacing.xxl },
  hero: {
    backgroundColor: colors.navy,
    padding: spacing.xl,
    paddingTop: spacing.xxl,
    gap: 6,
  },
  heroLabel: { color: colors.yellow, fontWeight: '900', fontSize: 12, marginTop: 8, textTransform: 'uppercase' },
  heroTitle: { color: colors.surface, fontSize: 26, fontWeight: '900', lineHeight: 30 },
  heroSubtitle: { color: '#C8D8E8', fontSize: 14, lineHeight: 21, marginTop: 4 },
  quickRow: { flexDirection: 'row', gap: 10, marginHorizontal: spacing.lg, marginTop: -16, marginBottom: spacing.sm },
  quickBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow,
  },
  quickBtnText: { color: colors.ink, fontWeight: '800', fontSize: 14 },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 14,
    paddingVertical: 10,
    ...shadow,
  },
  searchInput: { flex: 1, color: colors.ink, fontSize: 16, padding: 0 },
  searchResults: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  searchTextWrap: { flex: 1 },
  searchTitle: { color: colors.ink, fontWeight: '800', fontSize: 15 },
  searchMeta: { color: colors.muted, fontSize: 13, marginTop: 2 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: spacing.lg, marginBottom: spacing.sm },
  sectionTitle: { color: colors.ink, fontSize: 18, fontWeight: '900' },
  sectionHint: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionBlock: { marginHorizontal: spacing.lg, marginBottom: spacing.lg },
  blockTitle: { color: colors.ink, fontWeight: '900', fontSize: 16, marginBottom: 4 },
  blockSubtitle: { color: colors.muted, fontSize: 13, lineHeight: 18, marginBottom: 10 },
  courseCard: {
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
  courseIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseMeta: { flex: 1 },
  courseTitle: { color: colors.ink, fontWeight: '900', fontSize: 15 },
  courseSubtitle: { color: colors.muted, fontSize: 12, lineHeight: 17, marginTop: 3 },
});
