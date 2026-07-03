import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import { colors } from '../../theme/theme';

type Props = {
  complete: boolean;
  size?: 'sm' | 'md';
};

export function TopicProgressBadge({ complete, size = 'md' }: Props) {
  const iconSize = size === 'sm' ? 16 : 20;

  if (!complete) {
    return null;
  }

  return (
    <View style={[styles.badge, size === 'sm' && styles.badgeSm]}>
      <CheckCircle2 color={colors.green} size={iconSize} />
      {size === 'md' ? <Text style={styles.label}>Done</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeSm: {
    gap: 0,
  },
  label: {
    color: colors.green,
    fontWeight: '800',
    fontSize: 12,
  },
});
