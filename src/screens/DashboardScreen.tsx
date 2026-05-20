import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { Brain, Flame, Target } from 'lucide-react-native';
import { CourseCard } from '../components/CourseCard';
import { ProgressRing } from '../components/ProgressRing';
import { courses } from '../content/courses';
import type { RootDrawerParamList } from '../navigation/types';
import { useProgress } from '../services/ProgressContext';
import { colors } from '../theme/theme';

type Props = DrawerScreenProps<RootDrawerParamList, 'Dashboard'>;
const drawerScreens = {
  numpy: 'NumPy',
  pandas: 'Pandas',
  matplotlib: 'Matplotlib',
} as const;

export function DashboardScreen({ navigation }: Props) {
  const { progress } = useProgress();
  const totalLessons = courses.reduce((sum, course) => sum + course.lessons.length, 0);
  const completed = Object.values(progress.completedLessons).filter(Boolean).length;
  const overall = totalLessons ? completed / totalLessons : 0;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.heroText}>
          <Text style={styles.kicker}>PyGrounds AI Lab</Text>
          <Text style={styles.title}>Learn the data stack that AI is built on.</Text>
          <Text style={styles.copy}>
            Start with NumPy, Pandas, and Matplotlib. Read the concepts, run small exercises, answer quizzes, and keep your progress synced.
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

      <Text style={styles.sectionTitle}>Core Libraries</Text>
      {courses.map(course => {
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
    fontSize: 29,
    lineHeight: 34,
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
  },
});
