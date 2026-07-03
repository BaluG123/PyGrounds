import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookOpen } from 'lucide-react-native';
import { CodeSnippetCard } from '../../components/MathForAI/CodeSnippetCard';
import { getLabById, getTrackById } from '../../content/academic';
import type { CourseStackParamList, AcademicStackParamList } from '../../navigation/types';
import { colors, spacing } from '../../theme/theme';

type Props =
  | NativeStackScreenProps<CourseStackParamList, 'LabDetail'>
  | NativeStackScreenProps<AcademicStackParamList, 'LabDetail'>;

export function LabDetailScreen({ route, navigation }: Props) {
  const lab = getLabById(route.params.labId)!;
  const track = getTrackById(lab.trackId);
  const courseId = 'courseId' in route.params ? route.params.courseId : undefined;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {track ? (
        <Pressable
          style={[styles.theoryBtn, { borderColor: track.color, backgroundColor: track.accent }]}
          onPress={() => {
            if (courseId) {
              (navigation as NativeStackScreenProps<CourseStackParamList, 'LabDetail'>['navigation']).navigate(
                'CourseHome',
                { courseId },
              );
            } else {
              (navigation as NativeStackScreenProps<AcademicStackParamList, 'LabDetail'>['navigation']).navigate(
                'ModuleList',
                { trackId: lab.trackId },
              );
            }
          }}
        >
          <BookOpen color={track.color} size={18} />
          <Text style={styles.theoryBtnText}>
            {courseId ? 'Back to unified course home' : `View related theory — ${track.title}`}
          </Text>
        </Pressable>
      ) : null}

      {track ? <Text style={styles.levelBadge}>{track.levelBadge}</Text> : null}
      <Text style={styles.description}>{lab.description}</Text>
      <Text style={styles.snippetCount}>
        {lab.snippets.length} code snippet{lab.snippets.length === 1 ? '' : 's'}
      </Text>

      {lab.snippets.map(snippet => (
        <CodeSnippetCard
          key={snippet.id}
          snippet={snippet}
          accentColor={track?.color ?? colors.navy}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  theoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: spacing.md,
  },
  theoryBtnText: { flex: 1, color: colors.ink, fontWeight: '800', fontSize: 14 },
  levelBadge: { color: colors.muted, fontSize: 11, fontWeight: '600', marginBottom: 8 },
  description: { color: colors.ink, fontSize: 16, lineHeight: 24, marginBottom: 6 },
  snippetCount: { color: colors.muted, fontSize: 13, fontWeight: '700', marginBottom: spacing.lg },
});
