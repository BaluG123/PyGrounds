import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/theme';

type Props = {
  expression: string;
  note?: string;
};

export function MathText({ expression, note }: Props) {
  return (
    <View style={styles.wrap}>
      <Text selectable style={styles.expression}>
        {expression}
      </Text>
      {note ? <Text style={styles.note}>{note}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderLeftWidth: 4,
    borderLeftColor: colors.yellow,
    backgroundColor: '#FFF9E8',
    padding: 14,
    marginVertical: 10,
    borderRadius: 8,
  },
  expression: {
    color: colors.ink,
    fontFamily: 'Courier',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
  },
  note: {
    color: colors.muted,
    marginTop: 8,
    lineHeight: 19,
  },
});
