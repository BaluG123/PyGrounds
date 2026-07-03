import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRight, ClipboardList } from 'lucide-react-native';
import type { CourseModule } from '../types/course';
import { colors, shadow } from '../theme/theme';

type Props = {
  course: CourseModule;
  progress: number;
  quizCount?: number;
  onPress: () => void;
};

export function CourseCard({ course, progress, quizCount, onPress }: Props) {
  const Icon = course.Icon;
  const pct = Math.round(progress * 100);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={[styles.iconWrap, { backgroundColor: course.accent }]}>
        <Icon color={course.color} size={28} strokeWidth={2.4} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.subtitle} numberOfLines={2}>{course.subtitle}</Text>
        <View style={styles.metaRow}>
          <Text style={[styles.metaChip, { color: course.color, backgroundColor: course.accent }]}>
            {course.lessons.length} lessons
          </Text>
          {quizCount ? (
            <View style={styles.quizChip}>
              <ClipboardList color={colors.muted} size={12} />
              <Text style={styles.quizChipText}>{quizCount} quiz Qs</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: course.color }]} />
        </View>
        <Text style={styles.progressText}>{pct}% complete</Text>
      </View>
      <ChevronRight color={colors.muted} size={22} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 128,
    borderRadius: 16,
    backgroundColor: colors.surface,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow,
  },
  pressed: { transform: [{ scale: 0.985 }] },
  iconWrap: {
    width: 58,
    height: 58,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1 },
  title: { color: colors.ink, fontSize: 18, fontWeight: '900' },
  subtitle: { color: colors.muted, marginTop: 4, lineHeight: 18, fontSize: 13 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  metaChip: {
    fontSize: 11,
    fontWeight: '800',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: 'hidden',
  },
  quizChip: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  quizChipText: { color: colors.muted, fontSize: 11, fontWeight: '700' },
  barTrack: {
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.line,
    marginTop: 12,
    overflow: 'hidden',
  },
  barFill: { height: '100%', borderRadius: 4 },
  progressText: { color: colors.muted, fontSize: 11, fontWeight: '800', marginTop: 6 },
});
