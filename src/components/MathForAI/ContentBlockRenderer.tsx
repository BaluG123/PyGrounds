import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AlertTriangle, HelpCircle, Lightbulb } from 'lucide-react-native';
import { CodeBlock } from '../CodeBlock';
import { KaTeXMath } from '../KaTeXMath';
import type { ContentBlock } from '../../types/academic';
import { colors } from '../../theme/theme';

const NOTE_VARIANTS = {
  tip: { bg: '#FFF9E8', border: colors.yellow, color: '#D4A017', Icon: Lightbulb, label: 'Tip' },
  why: { bg: '#E3EEF9', border: colors.blue, color: colors.blue, Icon: HelpCircle, label: 'Why it matters' },
  warning: { bg: '#FEF2F0', border: colors.coral, color: colors.coral, Icon: AlertTriangle, label: 'Warning' },
} as const;

type Props = {
  block: ContentBlock;
  index: number;
  accentColor?: string;
};

export function ContentBlockRenderer({ block, index, accentColor = colors.violet }: Props) {
  switch (block.type) {
    case 'heading':
      return (
        <Text
          key={index}
          style={[
            block.level === 2 ? styles.h2 : styles.h3,
            block.level === 2 ? { borderLeftColor: accentColor } : undefined,
          ]}
        >
          {block.text}
        </Text>
      );

    case 'paragraph':
      return (
        <Text key={index} style={styles.paragraph}>
          {block.text}
        </Text>
      );

    case 'formula':
      return (
        <View key={index} style={styles.formulaWrap}>
          <KaTeXMath latex={block.latex} displayMode caption={block.caption} />
        </View>
      );

    case 'inlineFormulaParagraph':
      return (
        <View key={index} style={styles.inlineRow}>
          {block.segments.map((segment, segIndex) => {
            if ('latex' in segment) {
              return (
                <View key={segIndex} style={styles.inlineMath}>
                  <KaTeXMath latex={segment.latex} displayMode={false} />
                </View>
              );
            }
            return (
              <Text key={segIndex} style={styles.inlineText}>
                {segment.text}
              </Text>
            );
          })}
        </View>
      );

    case 'codeblock':
      return <CodeBlock key={index} code={block.code} />;

    case 'note': {
      const variant = NOTE_VARIANTS[block.variant];
      return (
        <View
          key={index}
          style={[styles.note, { backgroundColor: variant.bg, borderLeftColor: variant.border }]}
        >
          <View style={styles.noteHeader}>
            <variant.Icon color={variant.color} size={18} />
            <Text style={[styles.noteLabel, { color: variant.color }]}>{variant.label}</Text>
          </View>
          <Text style={styles.noteText}>{block.text}</Text>
        </View>
      );
    }

    case 'list':
      return (
        <View key={index} style={styles.list}>
          {block.items.map(item => (
            <View key={item} style={styles.listRow}>
              <View style={[styles.dot, { backgroundColor: accentColor }]} />
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </View>
      );

    default:
      return null;
  }
}

const styles = StyleSheet.create({
  h2: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 28,
    marginTop: 20,
    marginBottom: 10,
    borderLeftWidth: 4,
    paddingLeft: 12,
  },
  h3: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    color: colors.ink,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  formulaWrap: {
    alignItems: 'center',
  },
  inlineRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 12,
    gap: 2,
  },
  inlineText: {
    color: colors.ink,
    fontSize: 16,
    lineHeight: 24,
  },
  inlineMath: {
    marginHorizontal: 2,
  },
  note: {
    borderLeftWidth: 4,
    borderRadius: 10,
    padding: 14,
    marginVertical: 10,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  noteLabel: {
    fontWeight: '900',
    fontSize: 13,
  },
  noteText: {
    color: colors.ink,
    fontSize: 15,
    lineHeight: 22,
  },
  list: {
    marginVertical: 8,
    gap: 10,
  },
  listRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 7,
  },
  listText: {
    flex: 1,
    color: colors.ink,
    fontSize: 16,
    lineHeight: 23,
  },
});
