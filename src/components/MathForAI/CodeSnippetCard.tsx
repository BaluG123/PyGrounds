import React, { useState } from 'react';
import { Clipboard, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Copy, Check } from 'lucide-react-native';
import { KaTeXMath } from '../KaTeXMath';
import type { CodeSnippet } from '../../types/academic';
import { colors, shadow, spacing } from '../../theme/theme';

type Props = {
  snippet: CodeSnippet;
  accentColor?: string;
};

export function CodeSnippetCard({ snippet, accentColor = '#D4A843' }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    Clipboard.setString(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={styles.card}>
      <Text style={[styles.title, { color: accentColor }]}>{snippet.title}</Text>
      {snippet.intro ? <Text style={styles.intro}>{snippet.intro}</Text> : null}
      {snippet.relatedFormula ? (
        <View style={styles.formulaWrap}>
          <KaTeXMath latex={snippet.relatedFormula} displayMode />
        </View>
      ) : null}
      <ScrollView horizontal showsHorizontalScrollIndicator style={styles.codeScroll}>
        <View style={styles.codeBlock}>
          <Text selectable style={styles.code}>
            {snippet.code}
          </Text>
        </View>
      </ScrollView>
      {snippet.expectedOutputNote ? (
        <Text style={styles.outputNote}>Expected: {snippet.expectedOutputNote}</Text>
      ) : null}
      <Pressable style={[styles.copyBtn, copied && styles.copyBtnDone]} onPress={handleCopy}>
        {copied ? <Check color={colors.surface} size={16} /> : <Copy color={colors.surface} size={16} />}
        <Text style={styles.copyBtnText}>{copied ? 'Copied!' : 'Copy code'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadow,
  },
  title: {
    fontWeight: '900',
    fontSize: 17,
    marginBottom: 6,
  },
  intro: {
    color: colors.ink,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
  },
  formulaWrap: {
    marginBottom: 8,
  },
  codeScroll: {
    marginVertical: 8,
    borderRadius: 8,
  },
  codeBlock: {
    backgroundColor: colors.code,
    borderRadius: 8,
    padding: 14,
    minWidth: '100%',
  },
  code: {
    color: colors.codeText,
    fontFamily: 'Courier',
    fontSize: 12,
    lineHeight: 19,
  },
  outputNote: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.navy,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  copyBtnDone: {
    backgroundColor: colors.green,
  },
  copyBtnText: {
    color: colors.surface,
    fontWeight: '800',
    fontSize: 14,
  },
});
