import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BookOpen, GraduationCap, Target } from 'lucide-react-native';
import { aiRoadmap } from '../content/courses';
import { colors } from '../theme/theme';

export function RoadmapScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <GraduationCap color={colors.surface} size={30} />
        </View>
        <Text style={styles.kicker}>PyGrounds AI Curriculum</Text>
        <Text style={styles.title}>AI Mastery Roadmap</Text>
        <Text style={styles.subtitle}>
          A structured path from Python foundations to production AI systems, built like a serious academic syllabus with practical labs.
        </Text>
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <BookOpen color={colors.green} size={20} />
          <Text style={styles.summaryValue}>{aiRoadmap.length}</Text>
          <Text style={styles.summaryLabel}>terms</Text>
        </View>
        <View style={styles.summaryCard}>
          <Target color={colors.blue} size={20} />
          <Text style={styles.summaryValue}>Capstone</Text>
          <Text style={styles.summaryLabel}>portfolio finish</Text>
        </View>
      </View>

      {aiRoadmap.map((step, index) => (
        <View key={step.title} style={styles.termCard}>
          <View style={styles.termTop}>
            <View style={styles.index}>
              <Text style={styles.indexText}>{index + 1}</Text>
            </View>
            <View style={styles.termHead}>
              <Text style={styles.phase}>{step.phase}</Text>
              <Text style={styles.termTitle}>{step.title}</Text>
            </View>
          </View>
          <Text style={styles.outcome}>{step.outcome}</Text>
          <View style={styles.topicList}>
            {step.topics.map(topic => (
              <View key={topic} style={styles.topicRow}>
                <View style={styles.topicDot} />
                <Text style={styles.topicText}>{topic}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 36 },
  hero: {
    backgroundColor: colors.navy,
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: '#254F70',
    marginBottom: 14,
  },
  heroIcon: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  kicker: {
    color: colors.yellow,
    fontWeight: '900',
    marginBottom: 8,
  },
  title: { color: colors.surface, fontSize: 30, fontWeight: '900' },
  subtitle: { color: '#DCE8E2', lineHeight: 22, marginTop: 8 },
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.line,
  },
  summaryValue: {
    color: colors.ink,
    fontWeight: '900',
    fontSize: 20,
    marginTop: 8,
  },
  summaryLabel: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
  termCard: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 12,
  },
  termTop: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  index: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexText: { color: colors.green, fontWeight: '900' },
  termHead: { flex: 1 },
  phase: {
    color: colors.green,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  termTitle: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: '900',
    marginTop: 2,
  },
  outcome: {
    color: colors.muted,
    lineHeight: 21,
    marginBottom: 12,
  },
  topicList: {
    gap: 8,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
  },
  topicDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.green,
    marginTop: 7,
  },
  topicText: {
    color: colors.ink,
    flex: 1,
    lineHeight: 20,
    fontWeight: '700',
  },
});
