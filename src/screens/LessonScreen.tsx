import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Check } from 'lucide-react-native';
import { CodeBlock } from '../components/CodeBlock';
import { InlinePlayground } from '../components/InlinePlayground';
import { MathText } from '../components/MathText';
import { HeadingBlock } from '../components/LessonBlocks/HeadingBlock';
import { CalloutBlock } from '../components/LessonBlocks/CalloutBlock';
import { DiagramBlock } from '../components/LessonBlocks/DiagramBlock';
import { TableBlock } from '../components/LessonBlocks/TableBlock';
import { StepByStepBlock } from '../components/LessonBlocks/StepByStepBlock';
import { AnalogyBlock } from '../components/LessonBlocks/AnalogyBlock';
import { ImageBlock } from '../components/LessonBlocks/ImageBlock';
import { DividerBlock } from '../components/LessonBlocks/DividerBlock';
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

  const renderBlock = (block: (typeof lesson.blocks)[number], index: number) => {
    switch (block.type) {
      case 'paragraph':
        return <Text key={index} style={styles.paragraph}>{block.text}</Text>;
      case 'formula':
        return <MathText key={index} expression={block.expression} note={block.note} />;
      case 'code':
        return <CodeBlock key={index} code={block.code} />;
      case 'playground':
        return <InlinePlayground key={index} code={block.code} expectedOutput={block.expectedOutput} />;
      case 'heading':
        return <HeadingBlock key={index} text={block.text} color={course.color} />;
      case 'callout':
        return <CalloutBlock key={index} variant={block.variant} title={block.title} body={block.body} />;
      case 'diagram':
        return <DiagramBlock key={index} title={block.title} boxes={block.boxes} arrows={block.arrows} height={block.height} />;
      case 'table':
        return <TableBlock key={index} headers={block.headers} rows={block.rows} />;
      case 'stepByStep':
        return <StepByStepBlock key={index} title={block.title} steps={block.steps} color={course.color} />;
      case 'analogy':
        return <AnalogyBlock key={index} text={block.text} />;
      case 'image':
        return <ImageBlock key={index} title={block.title} imageType={block.imageType} data={block.data} />;
      case 'divider':
        return <DividerBlock key={index} />;
      case 'bullets':
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
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.kicker}>{course.title} · {lesson.duration}</Text>
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.objective}>{lesson.objective}</Text>

      {lesson.blocks.map(renderBlock)}

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
