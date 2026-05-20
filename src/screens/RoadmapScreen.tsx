import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { aiRoadmap } from '../content/courses';
import { colors } from '../theme/theme';

export function RoadmapScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>AI From Scratch</Text>
      <Text style={styles.subtitle}>
        This is the path after NumPy, Pandas, and Matplotlib. You are learning the right foundations; add statistics, linear algebra, ML, and projects next.
      </Text>

      {aiRoadmap.map((step, index) => (
        <View key={step} style={styles.row}>
          <View style={styles.index}>
            <Text style={styles.indexText}>{index + 1}</Text>
          </View>
          <Text style={styles.step}>{step}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 36 },
  title: { color: colors.ink, fontSize: 30, fontWeight: '900' },
  subtitle: { color: colors.muted, lineHeight: 22, marginTop: 8, marginBottom: 20 },
  row: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.line,
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
  step: { color: colors.ink, flex: 1, lineHeight: 21, fontWeight: '700' },
});
