import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Brain, ChevronRight, Zap } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RefreshMindStackParamList } from '../navigation/types';
import { getQuestionCount, mindQuestions } from '../content/mindQuestions';
import { CATEGORY_META } from '../types/mindQuiz';
import type { MindCategory, Difficulty } from '../types/mindQuiz';
import { colors, shadow } from '../theme/theme';

type Props = NativeStackScreenProps<RefreshMindStackParamList, 'RefreshMindHome'>;

const DIFFICULTIES: { key: Difficulty; label: string; emoji: string }[] = [
  { key: 'easy', label: 'Easy', emoji: '🌱' },
  { key: 'medium', label: 'Medium', emoji: '🔥' },
  { key: 'hard', label: 'Hard', emoji: '💎' },
];

export function RefreshMindScreen({ navigation }: Props) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');
  const categories = Object.entries(CATEGORY_META) as [MindCategory, typeof CATEGORY_META[MindCategory]][];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Brain color="#FFF" size={32} />
        </View>
        <Text style={styles.heroTitle}>Refresh Your Mind</Text>
        <Text style={styles.heroSub}>
          Take a break from coding and sharpen your brain with math challenges!
        </Text>
      </View>

      {/* Difficulty Selector */}
      <Text style={styles.sectionTitle}>Choose Difficulty</Text>
      <View style={styles.diffRow}>
        {DIFFICULTIES.map(d => {
          const active = selectedDifficulty === d.key;
          return (
            <Pressable
              key={d.key}
              style={[styles.diffChip, active && styles.diffChipActive]}
              onPress={() => setSelectedDifficulty(d.key)}
            >
              <Text style={styles.diffEmoji}>{d.emoji}</Text>
              <Text style={[styles.diffLabel, active && styles.diffLabelActive]}>
                {d.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Category Cards */}
      <Text style={styles.sectionTitle}>Pick a Challenge</Text>
      {categories.map(([key, meta]) => (
        <Pressable
          key={key}
          style={styles.card}
          onPress={() => navigation.navigate('MindQuiz', {
            category: key,
            difficulty: selectedDifficulty,
          })}
        >
          <View style={[styles.cardIcon, { backgroundColor: meta.accent }]}>
            <Text style={styles.cardEmoji}>{meta.emoji}</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{meta.title}</Text>
            <Text style={styles.cardDesc}>{meta.description}</Text>
            <Text style={styles.cardCount}>{getQuestionCount(key, selectedDifficulty)} questions ready</Text>
          </View>
          <ChevronRight color={colors.muted} size={20} />
        </Pressable>
      ))}

      {/* Bottom tip */}
      <View style={styles.tipCard}>
        <Zap color={colors.yellow} size={20} />
        <Text style={styles.tipText}>
          {mindQuestions.length}+ mental workouts for focus, speed, and problem-solving skills that directly help in programming.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 40 },
  hero: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#183B56',
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  heroTitle: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 8,
  },
  heroSub: {
    color: '#C3D8E8',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
  },
  diffRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  diffChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.surface,
  },
  diffChipActive: {
    borderColor: colors.green,
    backgroundColor: colors.mint,
  },
  diffEmoji: { fontSize: 18 },
  diffLabel: {
    color: colors.muted,
    fontWeight: '800',
    fontSize: 14,
  },
  diffLabelActive: {
    color: colors.green,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow,
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardEmoji: { fontSize: 24 },
  cardBody: {
    flex: 1,
    marginLeft: 14,
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '900',
  },
  cardDesc: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 3,
  },
  cardCount: {
    color: colors.green,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 6,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFF9E8',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#F6C85F40',
  },
  tipText: {
    flex: 1,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
  },
});
