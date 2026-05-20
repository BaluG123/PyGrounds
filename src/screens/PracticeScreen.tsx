import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Lightbulb, TerminalSquare } from 'lucide-react-native';
import { courses } from '../content/courses';
import type { CourseStackParamList } from '../navigation/types';
import { colors } from '../theme/theme';

type Props = NativeStackScreenProps<CourseStackParamList, 'Practice'>;

export function PracticeScreen({ route, navigation }: Props) {
  const course = courses.find(item => item.id === route.params.courseId)!;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{course.title} Practice</Text>
      <Text style={styles.subtitle}>Run each lab in the offline playground, compare the output, then try changing the inputs.</Text>

      {course.practice.map(item => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.prompt}>{item.prompt}</Text>
          <View style={styles.hintRow}>
            <Lightbulb color={colors.yellow} size={18} />
            <Text style={styles.hint}>{item.hint}</Text>
          </View>
          <Text style={styles.expected}>Expected: {item.expectedOutput}</Text>
          <Pressable
            style={[styles.button, { backgroundColor: course.color }]}
            onPress={() =>
              navigation.getParent()?.navigate('Playground', {
                starterCode: item.starterCode,
                practiceId: item.id,
              })
            }
          >
            <TerminalSquare color={colors.surface} size={20} />
            <Text style={styles.buttonText}>Open in Playground</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 36 },
  title: { color: colors.ink, fontSize: 30, fontWeight: '900' },
  subtitle: { color: colors.muted, lineHeight: 21, marginTop: 6, marginBottom: 18 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 14,
  },
  cardTitle: { color: colors.ink, fontSize: 18, fontWeight: '900' },
  prompt: { color: colors.ink, lineHeight: 21, marginTop: 8 },
  hintRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 },
  hint: { color: colors.muted, flex: 1, lineHeight: 19 },
  expected: {
    color: colors.ink,
    backgroundColor: '#F5F7F3',
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
    fontFamily: 'Courier',
  },
  button: {
    minHeight: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  buttonText: { color: colors.surface, fontWeight: '900' },
});
