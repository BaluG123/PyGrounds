import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/theme';

type Props = { text: string; color?: string };

export function HeadingBlock({ text, color = colors.green }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={[styles.bar, { backgroundColor: color }]} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 24,
    marginBottom: 12,
  },
  bar: {
    width: 4,
    height: 28,
    borderRadius: 2,
  },
  text: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: '900',
    flex: 1,
  },
});
