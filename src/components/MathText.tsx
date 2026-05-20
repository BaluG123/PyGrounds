import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/theme';

type Props = {
  expression: string;
  note?: string;
};

function cleanLatex(exp: string): string {
  let cleaned = exp;
  // Run nested components first
  cleaned = cleaned.replace(/\\vec\{([a-zA-Z])\}/g, '$1⃗');
  cleaned = cleaned.replace(/\\bar\{([^}]+)\}/g, '$1̄');
  cleaned = cleaned.replace(/\\text\{([^}]+)\}/g, '$1');

  // Common symbols
  cleaned = cleaned.replace(/\\cdot/g, '·');
  cleaned = cleaned.replace(/\\longrightarrow/g, '⟶');
  cleaned = cleaned.replace(/\\dots/g, '…');
  cleaned = cleaned.replace(/\\sum_\{([^}]+)\}\^([a-zA-Z0-9])/g, '∑(from $1 to $2) ');
  cleaned = cleaned.replace(/\\sum/g, '∑');
  cleaned = cleaned.replace(/\\prod/g, '∏');
  cleaned = cleaned.replace(/\\times/g, '×');
  cleaned = cleaned.replace(/\\eta/g, 'η');
  cleaned = cleaned.replace(/\\nabla/g, '∇');
  cleaned = cleaned.replace(/\\sigma/g, 'σ');
  cleaned = cleaned.replace(/\\Sigma/g, 'Σ');
  cleaned = cleaned.replace(/\\mu/g, 'μ');
  cleaned = cleaned.replace(/\\lambda/g, 'λ');
  cleaned = cleaned.replace(/\\theta/g, 'θ');
  cleaned = cleaned.replace(/\\pi/g, 'π');
  cleaned = cleaned.replace(/\\alpha/g, 'α');
  cleaned = cleaned.replace(/\\beta/g, 'β');

  // Run larger wrappers that might have contained the above components
  cleaned = cleaned.replace(/\\sqrt\{([^}]+)\}/g, '√($1)');
  cleaned = cleaned.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)');
  
  // Superscripts
  const supers: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', 'n': 'ⁿ', 'i': 'ⁱ', '-': '⁻', 'x': 'ˣ' };
  cleaned = cleaned.replace(/\^([0-9ni\-x])/g, (m, c) => supers[c] || c);
  cleaned = cleaned.replace(/\^\{([^}]+)\}/g, (m, c) => c.split('').map((char: string) => supers[char] || char).join(''));

  // Subscripts
  const subs: Record<string, string> = { '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉', 'n': 'ₙ', 'i': 'ᵢ', 'j': 'ⱼ' };
  cleaned = cleaned.replace(/_([0-9nij])/g, (m, c) => subs[c] || c);
  cleaned = cleaned.replace(/_\{([^}]+)\}/g, (m, c) => c.split('').map((char: string) => subs[char] || char).join(''));
  
  return cleaned;
}

export function MathText({ expression, note }: Props) {
  return (
    <View style={styles.wrap}>
      <Text selectable style={styles.expression}>
        {cleanLatex(expression)}
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
