import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Play, RotateCcw, CheckCircle2 } from 'lucide-react-native';
import { runPythonLikeCode, type RunnerResult } from '../services/codeRunner';
import { MiniPlot } from './MiniPlot';
import { colors } from '../theme/theme';

type Props = {
  code: string;
  expectedOutput?: string;
};

export function InlinePlayground({ code, expectedOutput }: Props) {
  const [currentCode, setCurrentCode] = useState(code.replace(/\\n/g, '\n'));
  const [result, setResult] = useState<RunnerResult | null>(null);
  const [expanded, setExpanded] = useState(false);

  const isCorrect = result && expectedOutput
    ? result.output.trim() === expectedOutput.replace(/\\n/g, '\n').trim()
    : null;

  function run() {
    setResult(runPythonLikeCode(currentCode));
    setExpanded(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🧪 Try It</Text>
        {isCorrect === true && <CheckCircle2 color={colors.green} size={18} />}
      </View>

      <TextInput
        value={currentCode}
        onChangeText={setCurrentCode}
        multiline
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.editor}
        textAlignVertical="top"
      />

      <View style={styles.actions}>
        <Pressable style={styles.runButton} onPress={run}>
          <Play color={colors.surface} size={16} />
          <Text style={styles.runText}>Run</Text>
        </Pressable>
        <Pressable style={styles.resetButton} onPress={() => { setCurrentCode(code.replace(/\\n/g, '\n')); setResult(null); }}>
          <RotateCcw color={colors.ink} size={16} />
        </Pressable>
      </View>

      {expanded && result && (
        <View style={[styles.output, isCorrect === true && styles.outputCorrect, isCorrect === false && styles.outputWrong]}>
          <Text style={styles.outputLabel}>{isCorrect === true ? '✓ Correct' : isCorrect === false ? '✗ Try Again' : 'Output'}</Text>
          <Text selectable style={styles.outputText}>{result.output}</Text>
          {result.plot ? <MiniPlot plot={result.plot} /> : null}
          {isCorrect === false && expectedOutput ? (
            <Text style={styles.expectedText}>Expected: {expectedOutput.replace(/\\n/g, '\n')}</Text>
          ) : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 8,
    marginVertical: 12,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: colors.mint,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: colors.green,
    fontWeight: '900',
    fontSize: 13,
  },
  editor: {
    backgroundColor: colors.code,
    color: colors.codeText,
    padding: 12,
    fontFamily: 'Courier',
    fontSize: 13,
    lineHeight: 20,
    minHeight: 100,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    padding: 8,
    backgroundColor: '#F0F2EE',
  },
  runButton: {
    flex: 1,
    backgroundColor: colors.green,
    borderRadius: 6,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  runText: {
    color: colors.surface,
    fontWeight: '900',
    fontSize: 13,
  },
  resetButton: {
    backgroundColor: colors.surface,
    borderRadius: 6,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.line,
  },
  output: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    backgroundColor: colors.surface,
  },
  outputCorrect: {
    backgroundColor: '#EDFCF2',
  },
  outputWrong: {
    backgroundColor: '#FEF2F0',
  },
  outputLabel: {
    fontWeight: '900',
    fontSize: 12,
    color: colors.muted,
    marginBottom: 6,
  },
  outputText: {
    fontFamily: 'Courier',
    fontSize: 13,
    lineHeight: 19,
    color: colors.ink,
  },
  expectedText: {
    fontFamily: 'Courier',
    fontSize: 12,
    color: colors.muted,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
});
