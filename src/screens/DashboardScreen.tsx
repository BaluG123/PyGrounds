import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { Brain, Flame, Target, GraduationCap } from 'lucide-react-native';
import { CourseCard } from '../components/CourseCard';
import { ProgressRing } from '../components/ProgressRing';
import { StudyReminderCard } from '../components/StudyReminderCard';
import { courses } from '../content/courses';
import { CURRICULUM_SECTIONS } from '../content/academic';
import type { RootDrawerParamList } from '../navigation/types';
import type { LibraryId } from '../types/course';
import { useProgress } from '../services/ProgressContext';
import { colors } from '../theme/theme';

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

type SectionDef = { title: string; subtitle: string; ids: LibraryId[] };
const sections: SectionDef[] = CURRICULUM_SECTIONS.map(section => ({
  title: section.title,
  subtitle: section.subtitle,
  ids: section.courseIds,
}));

export function DashboardScreen({ navigation }: Props) {
  const { progress } = useProgress();
  const totalLessons = courses.reduce((sum, course) => sum + course.lessons.length, 0);
  const completed = Object.values(progress.completedLessons).filter(Boolean).length;
  const overall = totalLessons ? completed / totalLessons : 0;
  const totalQuiz = courses.reduce((sum, c) => sum + c.quiz.length, 0);
  const totalPractice = courses.reduce((sum, c) => sum + c.practice.length, 0);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.heroText}>
          <View style={styles.kickerPill}>
            <Text style={styles.kicker}>PyGrounds AI Learning Platform</Text>
          </View>
          <Text style={styles.title}>Master AI from foundations to production systems.</Text>
          <Text style={styles.copy}>
            {courses.length} courses · {totalLessons} lessons · {totalQuiz} quiz questions · {totalPractice} practice labs
          </Text>
          <View style={styles.heroPills}>
            <Text style={styles.heroPill}>LLMs</Text>
            <Text style={styles.heroPill}>RAG</Text>
            <Text style={styles.heroPill}>Agents</Text>
            <Text style={styles.heroPill}>MLOps</Text>
          </View>
        </View>
        <ProgressRing value={overall} label="course" />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Brain color={colors.green} size={22} />
          <Text style={styles.statValue}>{completed}</Text>
          <Text style={styles.statLabel}>lessons done</Text>
        </View>
        <View style={styles.stat}>
          <Target color={colors.blue} size={22} />
          <Text style={styles.statValue}>{Object.keys(progress.quizScores).length}</Text>
          <Text style={styles.statLabel}>quizzes scored</Text>
        </View>
        <View style={styles.stat}>
          <Flame color={colors.coral} size={22} />
          <Text style={styles.statValue}>{Object.keys(progress.practiceRuns).length}</Text>
          <Text style={styles.statLabel}>labs tried</Text>
        </View>
      </View>

      <Pressable
        style={styles.academicHub}
        onPress={() => navigation.navigate('Master AI Hub')}
      >
        <GraduationCap color={colors.yellow} size={28} />
        <View style={styles.academicHubText}>
          <Text style={styles.academicHubTitle}>Master AI Hub</Text>
          <Text style={styles.academicHubSub}>
            Same unified content in every course — theory, lessons, labs, quiz
          </Text>
        </View>
      </Pressable>

      <StudyReminderCard />

      {sections.map(section => (
        <View key={section.title} style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
          {section.ids.map(id => {
            const course = courses.find(c => c.id === id);
            if (!course) { return null; }
            const courseDone = course.lessons.filter(lesson => progress.completedLessons[lesson.id]).length;
            return (
              <CourseCard
                key={course.id}
                course={course}
                progress={courseDone / course.lessons.length}
                onPress={() => navigation.navigate(drawerScreens[course.id])}
              />
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 36,
  },
  hero: {
    backgroundColor: colors.navy,
    borderRadius: 8,
    padding: 20,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#254F70',
  },
  heroText: {
    flex: 1,
  },
  kicker: {
    color: colors.navy,
    fontWeight: '800',
    fontSize: 12,
  },
  kickerPill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.yellow,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10,
  },
  title: {
    color: colors.surface,
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '900',
  },
  copy: {
    color: '#DCE8E2',
    marginTop: 10,
    lineHeight: 20,
  },
  heroPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  heroPill: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '900',
    borderWidth: 1,
    borderColor: '#6E8CA1',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 22,
  },
  stat: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.line,
  },
  statValue: {
    color: colors.ink,
    fontSize: 23,
    fontWeight: '900',
    marginTop: 8,
  },
  statLabel: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
  academicHub: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.navy,
    borderRadius: 12,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#254F70',
  },
  academicHubText: { flex: 1 },
  academicHubTitle: { color: colors.surface, fontWeight: '900', fontSize: 18 },
  academicHubSub: { color: '#C8D8E8', fontSize: 13, lineHeight: 19, marginTop: 4 },
  sectionTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: colors.muted,
    lineHeight: 19,
    marginBottom: 12,
  },
  sectionBlock: {
    marginTop: 10,
  },
});
