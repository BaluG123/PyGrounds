import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme/theme';

export function DividerBlock() {
  return (
    <View style={styles.wrap}>
      <View style={styles.line} />
      <View style={styles.dot} />
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.line,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.green,
  },
});
