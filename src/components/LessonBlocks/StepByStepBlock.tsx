import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/theme';

type Props = {
  title: string;
  steps: { title: string; description: string }[];
  color?: string;
};

export function StepByStepBlock({ title, steps, color = colors.green }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {steps.map((step, i) => (
        <View key={i} style={styles.stepRow}>
          {/* Connector line + dot */}
          <View style={styles.timeline}>
            <View style={[styles.dot, { backgroundColor: color }]}>
              <Text style={styles.dotText}>{i + 1}</Text>
            </View>
            {i < steps.length - 1 && (
              <View style={[styles.line, { backgroundColor: color + '40' }]} />
            )}
          </View>
          {/* Content */}
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDesc}>{step.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 16,
    marginVertical: 12,
  },
  title: {
    color: colors.ink,
    fontWeight: '900',
    fontSize: 16,
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: 'row',
    minHeight: 60,
  },
  timeline: {
    width: 36,
    alignItems: 'center',
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  dotText: {
    color: colors.surface,
    fontWeight: '900',
    fontSize: 13,
  },
  line: {
    width: 3,
    flex: 1,
    borderRadius: 2,
    marginVertical: 2,
  },
  stepContent: {
    flex: 1,
    paddingLeft: 12,
    paddingBottom: 16,
  },
  stepTitle: {
    color: colors.ink,
    fontWeight: '900',
    fontSize: 15,
    marginBottom: 4,
  },
  stepDesc: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
  },
});
