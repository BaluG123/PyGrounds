import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookOpen, ChevronRight, Code2 } from 'lucide-react-native';
import { ACADEMIC_LABS, ACADEMIC_TRACKS, getTrackById } from '../../content/academic';
import type { AcademicStackParamList } from '../../navigation/types';
import { colors, shadow, spacing } from '../../theme/theme';

type Props = NativeStackScreenProps<AcademicStackParamList, 'LabList'>;

export function LabListScreen({ route, navigation }: Props) {
  const filterTrackId = route.params?.trackId;
  const labs = filterTrackId
    ? ACADEMIC_LABS.filter(l => l.trackId === filterTrackId)
    : ACADEMIC_LABS;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={[styles.hero, { backgroundColor: colors.navy }]}>
        <Code2 color={colors.surface} size={32} />
        <Text style={styles.heroLabel}>Practical Labs</Text>
        <Text style={styles.heroTitle}>Python Code Labs</Text>
        <Text style={styles.heroSubtitle}>
          Runnable Python patterns — copy, run locally, and master each concept
        </Text>
      </View>

      <Pressable style={styles.theoryLink} onPress={() => navigation.navigate('TrackList')}>
        <BookOpen color={colors.green} size={18} />
        <Text style={styles.theoryLinkText}>View Theory Guide</Text>
        <ChevronRight color={colors.muted} size={18} />
      </Pressable>

      <Text style={styles.sectionTitle}>
        {filterTrackId ? `${getTrackById(filterTrackId)?.title ?? 'Track'} Labs` : 'All Lab Modules'}
      </Text>
      {labs.map((lab, index) => {
        const track = getTrackById(lab.trackId);
        return (
          <Pressable
            key={lab.id}
            style={styles.labCard}
            onPress={() => navigation.navigate('LabDetail', { labId: lab.id })}
          >
            <View style={[styles.badge, { backgroundColor: track?.accent ?? colors.mint }]}>
              <Text style={[styles.badgeText, { color: track?.color ?? colors.green }]}>
                {String(index + 1).padStart(2, '0')}
              </Text>
            </View>
            <View style={styles.labBody}>
              <Text style={styles.labTitle}>{lab.title}</Text>
              <Text style={styles.labDesc}>{lab.description}</Text>
              <Text style={styles.labMeta}>
                {lab.snippets.length} snippet{lab.snippets.length === 1 ? '' : 's'}
                {track ? ` · ${track.termLabel}` : ''}
              </Text>
            </View>
            <ChevronRight color={colors.muted} size={20} />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.xxl },
  hero: { padding: spacing.xl, paddingTop: spacing.xxl, gap: 6 },
  heroLabel: { color: colors.yellow, fontWeight: '800', fontSize: 13, marginTop: 8 },
  heroTitle: { color: colors.surface, fontSize: 28, fontWeight: '900', lineHeight: 32 },
  heroSubtitle: { color: '#C8D8E8', fontSize: 15, lineHeight: 21 },
  theoryLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: spacing.lg,
    marginTop: -18,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 14,
    paddingVertical: 12,
    ...shadow,
  },
  theoryLinkText: { flex: 1, color: colors.ink, fontWeight: '800', fontSize: 15 },
  sectionTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '900',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  labCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.lg,
    ...shadow,
  },
  badge: { width: 40, height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontWeight: '900', fontSize: 14 },
  labBody: { flex: 1 },
  labTitle: { color: colors.ink, fontWeight: '900', fontSize: 16 },
  labDesc: { color: colors.muted, fontSize: 14, lineHeight: 20, marginTop: 4 },
  labMeta: { color: colors.green, fontWeight: '800', fontSize: 12, marginTop: 6 },
});
