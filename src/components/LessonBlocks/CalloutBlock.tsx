import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Lightbulb, AlertTriangle, Info, Bookmark } from 'lucide-react-native';
import type { CalloutVariant } from '../../types/course';
import { colors } from '../../theme/theme';

const VARIANTS: Record<CalloutVariant, {
  emoji: string;
  bg: string;
  border: string;
  iconColor: string;
  Icon: typeof Lightbulb;
}> = {
  tip: {
    emoji: '💡',
    bg: '#FFF9E8',
    border: '#F6C85F',
    iconColor: '#D4A017',
    Icon: Lightbulb,
  },
  warning: {
    emoji: '⚠️',
    bg: '#FEF2F0',
    border: '#E56B5D',
    iconColor: '#E56B5D',
    Icon: AlertTriangle,
  },
  info: {
    emoji: 'ℹ️',
    bg: '#E3EEF9',
    border: '#2B6CB0',
    iconColor: '#2B6CB0',
    Icon: Info,
  },
  remember: {
    emoji: '📌',
    bg: '#EDE8F5',
    border: '#7454C4',
    iconColor: '#7454C4',
    Icon: Bookmark,
  },
};

type Props = {
  variant: CalloutVariant;
  title: string;
  body: string;
};

export function CalloutBlock({ variant, title, body }: Props) {
  const v = VARIANTS[variant];
  return (
    <View style={[styles.wrap, { backgroundColor: v.bg, borderLeftColor: v.border }]}>
      <View style={styles.header}>
        <v.Icon color={v.iconColor} size={18} />
        <Text style={[styles.title, { color: v.iconColor }]}>{title}</Text>
      </View>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderLeftWidth: 4,
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  title: {
    fontWeight: '900',
    fontSize: 14,
  },
  body: {
    color: colors.ink,
    fontSize: 15,
    lineHeight: 23,
  },
});
