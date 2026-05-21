import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { Play, RotateCcw } from 'lucide-react-native';
import { MiniPlot } from '../components/MiniPlot';
import type { RootDrawerParamList } from '../navigation/types';
import { runPythonLikeCode, type RunnerResult } from '../services/codeRunner';
import { useProgress } from '../services/ProgressContext';
import { colors } from '../theme/theme';

type Props = DrawerScreenProps<RootDrawerParamList, 'Playground'>;

const defaultCode = 'import numpy as np\nx = np.array([10, 20, 30])\nprint(x / x.max())';

export function PlaygroundScreen({ route }: Props) {
  const currentStarter = route.params?.starterCode ?? defaultCode;
  const [code, setCode] = useState(currentStarter);
  const [result, setResult] = useState<RunnerResult | null>(null);
  const { recordPracticeRun } = useProgress();

  useEffect(() => {
    if (route.params?.starterCode) {
      setCode(route.params.starterCode);
      setResult(null);
    }
  }, [route.params?.starterCode, route.params?.practiceId]);

  function run() {
    const next = runPythonLikeCode(code);
    setResult(next);
    if (route.params?.practiceId) {
      recordPracticeRun(route.params.practiceId);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Python Playground</Text>
      <Text style={styles.subtitle}>
        Offline runner for the built-in NumPy, Pandas, and Matplotlib labs. It is designed for learning patterns before full Python runtime integration.
      </Text>

      <TextInput
        value={code}
        onChangeText={nextCode => {
          setCode(nextCode);
          setResult(null);
        }}
        multiline
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.editor}
        textAlignVertical="top"
      />

      <View style={styles.actions}>
        <Pressable style={[styles.button, styles.run]} onPress={run}>
          <Play color={colors.surface} size={19} />
          <Text style={styles.buttonText}>Run</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.reset]}
          onPress={() => {
            setCode(currentStarter);
            setResult(null);
          }}
        >
          <RotateCcw color={colors.ink} size={19} />
          <Text style={styles.resetText}>Reset Lab</Text>
        </Pressable>
      </View>

      <View style={styles.output}>
        <Text style={styles.outputTitle}>Output</Text>
        <Text selectable style={styles.outputText}>{result?.output ?? 'Run code to see output.'}</Text>
        {result?.plot ? <MiniPlot plot={result.plot} /> : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 36 },
  title: { color: colors.ink, fontSize: 30, fontWeight: '900' },
  subtitle: { color: colors.muted, lineHeight: 21, marginTop: 6, marginBottom: 16 },
  editor: {
    minHeight: 260,
    backgroundColor: colors.code,
    color: colors.codeText,
    borderRadius: 8,
    padding: 14,
    fontFamily: 'Courier',
    fontSize: 14,
    lineHeight: 21,
  },
  actions: { flexDirection: 'row', gap: 12, marginTop: 14 },
  button: {
    minHeight: 48,
    borderRadius: 8,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  run: { backgroundColor: colors.green, flex: 1 },
  reset: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  buttonText: { color: colors.surface, fontWeight: '900' },
  resetText: { color: colors.ink, fontWeight: '900' },
  output: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.line,
    marginTop: 16,
  },
  outputTitle: { color: colors.ink, fontWeight: '900', fontSize: 16, marginBottom: 8 },
  outputText: { color: colors.ink, fontFamily: 'Courier', lineHeight: 20 },
});
