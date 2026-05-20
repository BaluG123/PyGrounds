import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/theme';

type Props = { text: string };

export function AnalogyBlock({ text }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Text style={styles.emoji}>🎯</Text>
        <Text style={styles.label}>Think of it like...</Text>
      </View>
      <Text style={styles.body}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    backgroundColor: '#F0F7FF',
    borderWidth: 1,
    borderColor: '#C3DAFE',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  emoji: { fontSize: 20 },
  label: {
    color: '#2B6CB0',
    fontWeight: '900',
    fontSize: 14,
    fontStyle: 'italic',
  },
  body: {
    color: colors.ink,
    fontSize: 15,
    lineHeight: 24,
  },
});
