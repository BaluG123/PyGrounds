import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { Brain, Flame, Target } from 'lucide-react-native';
import { CourseCard } from '../components/CourseCard';
import { ProgressRing } from '../components/ProgressRing';
import { StudyReminderCard } from '../components/StudyReminderCard';
import { courses } from '../content/courses';
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
  'linear-algebra': 'Linear Algebra',
  'scikit-learn': 'Scikit-Learn',
  'deep-learning': 'Deep Learning',
  'ai-projects': 'AI Projects',
};

type SectionDef = { title: string; ids: LibraryId[] };
const sections: SectionDef[] = [
  { title: '🐍 Python Fundamentals', ids: ['python-basics', 'python-advanced'] },
  { title: '📊 Data Science Toolkit', ids: ['numpy', 'pandas', 'matplotlib'] },
  { title: '🧮 Mathematics', ids: ['math-ai', 'linear-algebra'] },
  { title: '🤖 Machine Learning & AI', ids: ['scikit-learn', 'deep-learning', 'ai-projects'] },
];

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
          <Text style={styles.kicker}>PyGrounds AI Lab</Text>
          <Text style={styles.title}>Master Python & AI from zero to hero.</Text>
          <Text style={styles.copy}>
            {courses.length} courses · {totalLessons} lessons · {totalQuiz} quiz questions · {totalPractice} practice labs
          </Text>
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

      <StudyReminderCard />

      {sections.map(section => (
        <View key={section.title}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
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
    padding: 22,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    marginBottom: 18,
  },
  heroText: {
    flex: 1,
  },
  kicker: {
    color: colors.yellow,
    fontWeight: '800',
    marginBottom: 8,
  },
  title: {
    color: colors.surface,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '900',
  },
  copy: {
    color: '#DCE8E2',
    marginTop: 10,
    lineHeight: 20,
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
  sectionTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 12,
    marginTop: 8,
  },
});
