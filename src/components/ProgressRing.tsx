import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/theme';

type Props = {
  value: number;
  label: string;
};

export function ProgressRing({ value, label }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.value}>{Math.round(value * 100)}%</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 8,
    borderColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  value: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '800',
  },
  label: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 2,
  },
});
