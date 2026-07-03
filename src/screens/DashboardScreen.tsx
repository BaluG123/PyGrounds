import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import {
  ArrowRight,
  BookOpen,
  Brain,
  ChevronRight,
  ClipboardList,
  Code2,
  Flame,
  GraduationCap,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from 'lucide-react-native';
import { CourseCard } from '../components/CourseCard';
import { FloatingWhatsAppHelp } from '../components/FloatingWhatsAppHelp';
import { ProgressRing } from '../components/ProgressRing';
import { courses, getUnifiedQuizForCourse } from '../content/courses';
import { CURRICULUM_SECTIONS } from '../content/academic';
import { BRAND } from '../constants/brand';
import type { RootDrawerParamList } from '../navigation/types';
import type { LibraryId } from '../types/course';
import { useProgress } from '../services/ProgressContext';
import { colors, shadow } from '../theme/theme';

type Props = DrawerScreenProps<RootDrawerParamList, 'Dashboard'>;

const drawerScreens: Record<LibraryId, keyof RootDrawerParamList> = {
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

const sections = CURRICULUM_SECTIONS.map(section => ({
  title: section.title,
  subtitle: section.subtitle,
  ids: section.courseIds,
}));

const quickActions = [
  { label: 'Master AI Hub', route: 'Master AI Hub' as const, Icon: GraduationCap, color: colors.yellow },
  { label: 'Quick Quiz', route: 'Refresh Mind' as const, Icon: Zap, color: colors.coral },
  { label: 'Playground', route: 'Playground' as const, Icon: Code2, color: colors.green },
  { label: 'Roadmap', route: 'Roadmap' as const, Icon: Target, color: colors.blue },
];

export function DashboardScreen({ navigation }: Props) {
  const { progress } = useProgress();
  const totalLessons = courses.reduce((sum, course) => sum + course.lessons.length, 0);
  const completed = Object.values(progress.completedLessons).filter(Boolean).length;
  const overall = totalLessons ? completed / totalLessons : 0;
  const totalQuiz = courses.reduce((sum, c) => sum + getUnifiedQuizForCourse(c.id).length, 0);
  const totalPractice = courses.reduce((sum, c) => sum + c.practice.length, 0);

  return (
    <View style={styles.screen}>
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <View style={styles.heroGlow} />
        <View style={styles.heroTop}>
          <Image source={require('../assets/neuralearn-logo.png')} style={styles.logo} />
          <View style={styles.heroCopy}>
            <View style={styles.brandPill}>
              <Sparkles color={colors.navy} size={14} />
              <Text style={styles.brandPillText}>{BRAND.appName}</Text>
            </View>
            <Text style={styles.heroTitle}>Your AI learning command center</Text>
            <Text style={styles.heroSub}>{BRAND.tagline}</Text>
          </View>
          <ProgressRing value={overall} label="progress" />
        </View>

        <View style={styles.heroStats}>
          <View style={styles.heroStat}>
            <Text style={styles.heroStatValue}>{courses.length}</Text>
            <Text style={styles.heroStatLabel}>courses</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStat}>
            <Text style={styles.heroStatValue}>{totalLessons}</Text>
            <Text style={styles.heroStatLabel}>lessons</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStat}>
            <Text style={styles.heroStatValue}>{totalQuiz}</Text>
            <Text style={styles.heroStatLabel}>quiz Qs</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStat}>
            <Text style={styles.heroStatValue}>{totalPractice}</Text>
            <Text style={styles.heroStatLabel}>labs</Text>
          </View>
        </View>

        <View style={styles.tagRow}>
          {['Python', 'ML', 'Deep Learning', 'GenAI', 'RAG', 'MLOps'].map(tag => (
            <Text key={tag} style={styles.tag}>{tag}</Text>
          ))}
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, styles.statGreen]}>
          <Brain color={colors.green} size={22} />
          <Text style={styles.statValue}>{completed}</Text>
          <Text style={styles.statLabel}>lessons done</Text>
        </View>
        <View style={[styles.statCard, styles.statBlue]}>
          <Trophy color={colors.blue} size={22} />
          <Text style={styles.statValue}>{Object.keys(progress.quizScores).length}</Text>
          <Text style={styles.statLabel}>quizzes scored</Text>
        </View>
        <View style={[styles.statCard, styles.statCoral]}>
          <Flame color={colors.coral} size={22} />
          <Text style={styles.statValue}>{Object.keys(progress.practiceRuns).length}</Text>
          <Text style={styles.statLabel}>labs tried</Text>
        </View>
      </View>

      <Text style={styles.quickLabel}>Quick start</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickRow}>
        {quickActions.map(action => {
          const Icon = action.Icon;
          return (
            <Pressable
              key={action.route}
              style={styles.quickChip}
              onPress={() => navigation.navigate(action.route)}
            >
              <View style={[styles.quickIcon, { backgroundColor: `${action.color}22` }]}>
                <Icon color={action.color} size={18} />
              </View>
              <Text style={styles.quickText}>{action.label}</Text>
              <ChevronRight color={colors.muted} size={16} />
            </Pressable>
          );
        })}
      </ScrollView>

      <Pressable style={styles.hubCard} onPress={() => navigation.navigate('Master AI Hub')}>
        <View style={styles.hubIconWrap}>
          <GraduationCap color={colors.navy} size={26} />
        </View>
        <View style={styles.hubText}>
          <Text style={styles.hubTitle}>Master AI Hub</Text>
          <Text style={styles.hubSub}>Theory · Lessons · Labs · Unified quizzes in every course</Text>
        </View>
        <ArrowRight color={colors.yellow} size={22} />
      </Pressable>

      {sections.map((section, index) => (
        <View key={section.title} style={styles.sectionBlock}>
          <View style={styles.sectionHead}>
            <View style={[styles.sectionIndex, { backgroundColor: sectionAccent(index).bg }]}>
              <Text style={[styles.sectionIndexText, { color: sectionAccent(index).fg }]}>
                {String(index + 1).padStart(2, '0')}
              </Text>
            </View>
            <View style={styles.sectionTitles}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
            </View>
            <BookOpen color={sectionAccent(index).fg} size={20} />
          </View>
          {section.ids.map(id => {
            const course = courses.find(c => c.id === id);
            if (!course) return null;
            const courseDone = course.lessons.filter(lesson => progress.completedLessons[lesson.id]).length;
            const quizCount = getUnifiedQuizForCourse(course.id).length;
            return (
              <CourseCard
                key={course.id}
                course={course}
                progress={courseDone / course.lessons.length}
                quizCount={quizCount}
                onPress={() => navigation.navigate(drawerScreens[course.id])}
              />
            );
          })}
        </View>
      ))}

      <View style={styles.footerCard}>
        <ClipboardList color={colors.green} size={22} />
        <Text style={styles.footerText}>
          {totalQuiz}+ quiz questions across all tracks — course quizzes and mastery checks merged into one pool per course.
        </Text>
      </View>
    </ScrollView>
    <FloatingWhatsAppHelp />
    </View>
  );
}

function sectionAccent(index: number) {
  const palette = [
    { fg: colors.green, bg: colors.mint },
    { fg: colors.blue, bg: '#E0F0FF' },
    { fg: colors.violet, bg: '#EDE7FF' },
    { fg: '#0F8B8D', bg: '#DDF7F6' },
    { fg: colors.coral, bg: '#FFE8E5' },
    { fg: colors.navy, bg: '#D8E4EE' },
    { fg: colors.green, bg: colors.mint },
  ];
  return palette[index % palette.length];
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  content: { paddingBottom: 88 },
  hero: {
    backgroundColor: colors.navy,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 22,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
    marginBottom: 18,
  },
  heroGlow: {
    position: 'absolute',
    top: -40,
    right: -30,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.green,
    opacity: 0.12,
  },
  heroTop: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  logo: { width: 64, height: 64, borderRadius: 16 },
  heroCopy: { flex: 1 },
  brandPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: colors.yellow,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 8,
  },
  brandPillText: { color: colors.navy, fontWeight: '900', fontSize: 12 },
  heroTitle: { color: colors.surface, fontSize: 24, fontWeight: '900', lineHeight: 28 },
  heroSub: { color: '#C8D8E8', fontSize: 13, marginTop: 6, lineHeight: 18 },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  heroStat: { flex: 1, alignItems: 'center' },
  heroStatDivider: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.15)' },
  heroStatValue: { color: colors.surface, fontSize: 20, fontWeight: '900' },
  heroStatLabel: { color: '#B8C9D8', fontSize: 11, fontWeight: '700', marginTop: 2 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 },
  tag: {
    color: colors.surface,
    fontSize: 11,
    fontWeight: '800',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginBottom: 18 },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow,
  },
  statGreen: { borderTopWidth: 3, borderTopColor: colors.green },
  statBlue: { borderTopWidth: 3, borderTopColor: colors.blue },
  statCoral: { borderTopWidth: 3, borderTopColor: colors.coral },
  statValue: { color: colors.ink, fontSize: 22, fontWeight: '900', marginTop: 8 },
  statLabel: { color: colors.muted, fontSize: 11, fontWeight: '700', marginTop: 2 },
  quickLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  quickRow: { paddingHorizontal: 20, gap: 10, paddingBottom: 18 },
  quickChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow,
    shadowOpacity: 0.05,
  },
  quickIcon: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  quickText: { color: colors.ink, fontWeight: '800', fontSize: 13 },
  hubCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginHorizontal: 20,
    marginBottom: 18,
    backgroundColor: '#102A3D',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#254F70',
    ...shadow,
  },
  hubIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hubText: { flex: 1 },
  hubTitle: { color: colors.surface, fontWeight: '900', fontSize: 18 },
  hubSub: { color: '#C8D8E8', fontSize: 13, lineHeight: 19, marginTop: 4 },
  sectionBlock: { marginTop: 8, paddingHorizontal: 20 },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
    marginTop: 10,
  },
  sectionIndex: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  sectionIndexText: { fontWeight: '900', fontSize: 13 },
  sectionTitles: { flex: 1 },
  sectionTitle: { color: colors.ink, fontSize: 20, fontWeight: '900' },
  sectionSubtitle: { color: colors.muted, lineHeight: 19, marginTop: 3, fontSize: 13 },
  footerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: colors.mint,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#B8E6CF',
  },
  footerText: { flex: 1, color: colors.ink, fontSize: 13, lineHeight: 19, fontWeight: '600' },
});
