import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Check, Clock, Target } from 'lucide-react-native';
import { ContentBlockRenderer } from '../../components/MathForAI/ContentBlockRenderer';
import { getTopicById } from '../../content/academic';
import type { CourseStackParamList, AcademicStackParamList } from '../../navigation/types';
import { useAcademicProgress } from '../../services/AcademicProgressContext';
import { colors, spacing } from '../../theme/theme';

type Props =
  | NativeStackScreenProps<CourseStackParamList, 'TopicDetail'>
  | NativeStackScreenProps<AcademicStackParamList, 'TopicDetail'>;

export function TopicDetailScreen({ route }: Props) {
  const { track, module, topic } = getTopicById(
    route.params.trackId,
    route.params.moduleId,
    route.params.topicId,
  )!;
  const { isComplete, completeTopic } = useAcademicProgress();
  const done = isComplete(topic.id);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={[styles.kicker, { color: track.color }]}>
          {track.termLabel} · {module.title}
        </Text>
        <Text style={styles.levelBadge}>{track.levelBadge}</Text>
        <Text style={styles.title}>{topic.title}</Text>
        {topic.objective ? (
          <View style={styles.objectiveBox}>
            <Target color={track.color} size={16} />
            <Text style={styles.objective}>{topic.objective}</Text>
          </View>
        ) : null}
        <View style={styles.metaRow}>
          <Clock color={colors.muted} size={15} />
          <Text style={styles.meta}>{topic.estMinutes} min read</Text>
        </View>

        {topic.blocks.map((block, index) => (
          <ContentBlockRenderer key={index} block={block} index={index} accentColor={track.color} />
        ))}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      <View style={styles.floatingBar}>
        <Pressable
          style={[styles.completeBtn, { backgroundColor: done ? colors.green : track.color }]}
          onPress={() => completeTopic(topic.id)}
        >
          <Check color={colors.surface} size={20} />
          <Text style={styles.completeBtnText}>{done ? 'Completed' : 'Mark as Complete'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: 100 },
  kicker: { fontWeight: '900', fontSize: 13, marginBottom: 4 },
  levelBadge: { color: colors.muted, fontSize: 11, fontStyle: 'italic', marginBottom: 8 },
  title: { color: colors.ink, fontSize: 28, fontWeight: '900', lineHeight: 33 },
  objectiveBox: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 12,
    marginTop: 10,
  },
  objective: { flex: 1, color: colors.ink, fontSize: 14, lineHeight: 21, fontWeight: '600' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10, marginBottom: 16 },
  meta: { color: colors.muted, fontSize: 14 },
  bottomSpacer: { height: 20 },
  floatingBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  completeBtn: {
    minHeight: 52,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  completeBtnText: { color: colors.surface, fontWeight: '900', fontSize: 16 },
});
