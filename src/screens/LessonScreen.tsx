import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Check } from 'lucide-react-native';
import { CodeBlock } from '../components/CodeBlock';
import { MathText } from '../components/MathText';
import { courses } from '../content/courses';
import type { CourseStackParamList } from '../navigation/types';
import { useProgress } from '../services/ProgressContext';
import { colors } from '../theme/theme';

type Props = NativeStackScreenProps<CourseStackParamList, 'Lesson'>;

export function LessonScreen({ route, navigation }: Props) {
  const course = courses.find(item => item.id === route.params.courseId)!;
  const lesson = course.lessons.find(item => item.id === route.params.lessonId)!;
  const { completeLesson, progress } = useProgress();
  const done = progress.completedLessons[lesson.id];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>{course.title} - {lesson.duration}</Text>
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.objective}>{lesson.objective}</Text>

      {lesson.blocks.map((block, index) => {
        if (block.type === 'paragraph') {
          return <Text key={index} style={styles.paragraph}>{block.text}</Text>;
        }
        if (block.type === 'formula') {
          return <MathText key={index} expression={block.expression} note={block.note} />;
        }
        if (block.type === 'code') {
          return <CodeBlock key={index} code={block.code} />;
        }
        return (
          <View key={index} style={styles.bullets}>
            {block.items.map(item => (
              <View key={item} style={styles.bulletRow}>
                <View style={[styles.dot, { backgroundColor: course.color }]} />
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        );
      })}

      <Pressable
        style={[styles.button, { backgroundColor: done ? colors.green : course.color }]}
        onPress={() => {
          completeLesson(lesson.id);
          navigation.goBack();
        }}
      >
        <Check color={colors.surface} size={20} />
        <Text style={styles.buttonText}>{done ? 'Completed' : 'Mark Lesson Complete'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 36 },
  kicker: { color: colors.green, fontWeight: '900', marginBottom: 8 },
  title: { color: colors.ink, fontSize: 30, fontWeight: '900', lineHeight: 35 },
  objective: { color: colors.muted, fontSize: 16, lineHeight: 23, marginTop: 8, marginBottom: 16 },
  paragraph: { color: colors.ink, fontSize: 16, lineHeight: 24, marginBottom: 12 },
  bullets: { marginVertical: 8, gap: 10 },
  bulletRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  dot: { width: 8, height: 8, borderRadius: 4, marginTop: 7 },
  bulletText: { flex: 1, color: colors.ink, lineHeight: 21 },
  button: {
    minHeight: 52,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 22,
  },
  buttonText: { color: colors.surface, fontWeight: '900', fontSize: 16 },
});
