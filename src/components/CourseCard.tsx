import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import type { CourseModule } from '../types/course';
import { colors, shadow } from '../theme/theme';

type Props = {
  course: CourseModule;
  progress: number;
  onPress: () => void;
};

export function CourseCard({ course, progress, onPress }: Props) {
  const Icon = course.Icon;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={[styles.iconWrap, { backgroundColor: course.accent }]}>
        <Icon color={course.color} size={28} strokeWidth={2.4} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.subtitle}>{course.subtitle}</Text>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: `${progress * 100}%`, backgroundColor: course.color }]} />
        </View>
      </View>
      <ChevronRight color={colors.muted} size={22} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 116,
    borderRadius: 8,
    backgroundColor: colors.surface,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 14,
    ...shadow,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
  iconWrap: {
    width: 54,
    height: 54,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
  },
  title: {
    color: colors.ink,
    fontSize: 21,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.muted,
    marginTop: 4,
    lineHeight: 19,
  },
  barTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.line,
    marginTop: 14,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
});
