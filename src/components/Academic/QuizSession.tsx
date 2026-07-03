import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CheckCircle2, Sparkles, Trophy, XCircle } from 'lucide-react-native';
import type { AcademicQuizQuestion } from '../../types/academicQuiz';
import { colors, shadow, spacing } from '../../theme/theme';

const LETTERS = ['A', 'B', 'C', 'D'];

type Props = {
  title: string;
  subtitle: string;
  questions: AcademicQuizQuestion[];
  accentColor: string;
  accentBg: string;
  bestScore?: number;
  onComplete: (score: number) => void;
};

export function QuizSession({
  title,
  subtitle,
  questions,
  accentColor,
  accentBg,
  bestScore = 0,
  onComplete,
}: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(
    () => questions.filter(q => answers[q.id] === q.answerIndex).length,
    [answers, questions],
  );
  const answered = Object.keys(answers).length;
  const progress = questions.length ? answered / questions.length : 0;
  const allAnswered = answered === questions.length;
  const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={[styles.hero, { backgroundColor: accentColor }]}>
        <Sparkles color={colors.surface} size={24} />
        <Text style={styles.heroTitle}>{title}</Text>
        <Text style={styles.heroSub}>{subtitle}</Text>
        {bestScore > 0 ? (
          <View style={styles.bestPill}>
            <Trophy color={accentColor} size={14} />
            <Text style={[styles.bestText, { color: accentColor }]}>Best: {bestScore}/{questions.length}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.progressWrap}>
        <View style={styles.progressMeta}>
          <Text style={styles.progressLabel}>{answered}/{questions.length} answered</Text>
          <Text style={[styles.progressPct, { color: accentColor }]}>{Math.round(progress * 100)}%</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: accentColor }]} />
        </View>
      </View>

      {questions.map((question, index) => {
        const selected = answers[question.id];
        const showResult = submitted || selected !== undefined;
        return (
          <View key={question.id} style={styles.card}>
            <View style={styles.cardTop}>
              <View style={[styles.qBadge, { backgroundColor: accentBg }]}>
                <Text style={[styles.qBadgeText, { color: accentColor }]}>Q{index + 1}</Text>
              </View>
              {question.tag ? (
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{question.tag}</Text>
                </View>
              ) : null}
            </View>
            <Text style={styles.prompt}>{question.prompt}</Text>
            {question.options.map((option, optionIndex) => {
              const isSelected = selected === optionIndex;
              const isCorrect = question.answerIndex === optionIndex;
              const reveal = showResult && (isSelected || (submitted && isCorrect));
              return (
                <Pressable
                  key={option}
                  disabled={submitted}
                  onPress={() => setAnswers(cur => ({ ...cur, [question.id]: optionIndex }))}
                  style={[
                    styles.option,
                    isSelected && !submitted && { borderColor: accentColor, backgroundColor: accentBg },
                    reveal && isCorrect && styles.optionCorrect,
                    reveal && isSelected && !isCorrect && styles.optionWrong,
                  ]}
                >
                  <View style={[styles.optionLetter, reveal && isCorrect && styles.optionLetterCorrect, reveal && isSelected && !isCorrect && styles.optionLetterWrong]}>
                    <Text style={[styles.optionLetterText, (reveal && (isCorrect || isSelected)) && styles.optionLetterTextOn]}>{LETTERS[optionIndex]}</Text>
                  </View>
                  <Text style={styles.optionText}>{option}</Text>
                  {reveal && isCorrect ? <CheckCircle2 color={colors.green} size={18} /> : null}
                  {reveal && isSelected && !isCorrect ? <XCircle color={colors.coral} size={18} /> : null}
                </Pressable>
              );
            })}
            {showResult ? <Text style={styles.explanation}>{question.explanation}</Text> : null}
          </View>
        );
      })}

      {!submitted ? (
        <Pressable
          disabled={!allAnswered}
          style={[styles.submitBtn, { backgroundColor: allAnswered ? accentColor : colors.line }]}
          onPress={() => setSubmitted(true)}
        >
          <Text style={styles.submitText}>Check Answers</Text>
        </Pressable>
      ) : (
        <View style={[styles.resultCard, { borderColor: accentColor }]}>
          <Trophy color={accentColor} size={32} />
          <Text style={styles.resultTitle}>{pct >= 80 ? 'Excellent!' : pct >= 50 ? 'Good progress!' : 'Keep learning!'}</Text>
          <Text style={styles.resultScore}>{score}/{questions.length} correct · {pct}%</Text>
          <Pressable
            style={[styles.saveBtn, { backgroundColor: accentColor }]}
            onPress={() => onComplete(score)}
          >
            <Text style={styles.saveBtnText}>Save Best Score</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.xxl },
  hero: { padding: spacing.xl, gap: 6 },
  heroTitle: { color: colors.surface, fontSize: 24, fontWeight: '900', marginTop: 8 },
  heroSub: { color: '#EAF2EF', fontSize: 14, lineHeight: 20 },
  bestPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 8,
  },
  bestText: { fontWeight: '800', fontSize: 12 },
  progressWrap: { marginHorizontal: spacing.lg, marginVertical: spacing.lg },
  progressMeta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel: { color: colors.muted, fontWeight: '700', fontSize: 13 },
  progressPct: { fontWeight: '900', fontSize: 13 },
  progressTrack: { height: 8, backgroundColor: colors.line, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  card: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.lg,
    ...shadow,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  qBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 },
  qBadgeText: { fontWeight: '900', fontSize: 12 },
  tag: { backgroundColor: colors.background, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  tagText: { color: colors.muted, fontSize: 11, fontWeight: '800' },
  prompt: { color: colors.ink, fontSize: 16, fontWeight: '800', lineHeight: 23, marginBottom: 10 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    backgroundColor: '#FAFBF8',
  },
  optionCorrect: { backgroundColor: colors.mint, borderColor: colors.green },
  optionWrong: { backgroundColor: '#FDEDEA', borderColor: colors.coral },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLetterCorrect: { backgroundColor: colors.green },
  optionLetterWrong: { backgroundColor: colors.coral },
  optionLetterText: { color: colors.ink, fontWeight: '900', fontSize: 13 },
  optionLetterTextOn: { color: colors.surface },
  optionText: { flex: 1, color: colors.ink, lineHeight: 20, fontWeight: '600' },
  explanation: { color: colors.muted, fontSize: 14, lineHeight: 21, marginTop: 12, fontStyle: 'italic' },
  submitBtn: {
    marginHorizontal: spacing.lg,
    minHeight: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  submitText: { color: colors.surface, fontWeight: '900', fontSize: 16 },
  resultCard: {
    marginHorizontal: spacing.lg,
    marginTop: 8,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 2,
    padding: spacing.xl,
    alignItems: 'center',
    gap: 8,
    ...shadow,
  },
  resultTitle: { color: colors.ink, fontSize: 22, fontWeight: '900' },
  resultScore: { color: colors.muted, fontSize: 16, fontWeight: '700' },
  saveBtn: {
    marginTop: 12,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
    minWidth: '100%',
    alignItems: 'center',
  },
  saveBtnText: { color: colors.surface, fontWeight: '900', fontSize: 16 },
});
