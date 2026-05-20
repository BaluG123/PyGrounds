import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/theme';

export function CodeBlock({ code }: { code: string }) {
  return (
    <View style={styles.block}>
      <Text selectable style={styles.code}>
        {code}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.code,
    borderRadius: 8,
    padding: 14,
    marginVertical: 10,
  },
  code: {
    color: colors.codeText,
    fontFamily: 'Courier',
    fontSize: 13,
    lineHeight: 20,
  },
});
