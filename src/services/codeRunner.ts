export type RunnerResult = {
  output: string;
  plot?: {
    kind: 'line' | 'hist';
    title: string;
    values: number[];
  };
};

const examples: Array<{ test: RegExp; result: RunnerResult }> = [
  {
    test: /x\s*=\s*np\.array\(\[\[1,\s*2,\s*3\],\s*\[4,\s*5,\s*6\]\]\)[\s\S]*mean\(axis=0\)/,
    result: { output: '[2.5 3.5 4.5]' },
  },
  {
    test: /x\s*=\s*np\.array\(\[10,\s*20,\s*30\]\)[\s\S]*x\s*\/\s*x\.max\(\)/,
    result: { output: '[0.33333333 0.66666667 1.        ]' },
  },
  {
    test: /X\s*=\s*np\.array\(\[\[1,\s*2\],\s*\[3,\s*4\]\]\)[\s\S]*X\s*@\s*W\s*\+\s*b/,
    result: { output: '[0.5 -0.5]' },
  },
  {
    test: /scores\s*=\s*np\.array\(\[\[70,\s*80,\s*90\],\s*\[65,\s*75,\s*85\]\]\)[\s\S]*scores\s*\+\s*curve/,
    result: { output: '[[75 83 92]\n [70 78 87]]' },
  },
  {
    test: /pd\.DataFrame\(\{'score':\s*\[55,\s*65,\s*78\]\}\)[\s\S]*mean\(\)/,
    result: { output: '66.0' },
  },
  {
    test: /fillna\(df\['score'\]\.mean\(\)\)/,
    result: { output: '   score\n0   90.0\n1   90.0' },
  },
  {
    test: /groupby\('team'\)\['score'\]\.mean\(\)/,
    result: { output: 'team\nA    85.0\nB    70.0\nName: score, dtype: float64' },
  },
  {
    test: /plt\.hist\(scores,\s*bins=3\)/,
    result: {
      output: 'Plot rendered: histogram with 3 bins',
      plot: { kind: 'hist', title: 'Score distribution', values: [55, 65, 67, 70, 92] },
    },
  },
  {
    test: /loss\s*=\s*\[1\.2,\s*0\.8,\s*0\.55,\s*0\.5\]/,
    result: {
      output: 'Plot rendered: line chart with labels epoch and loss',
      plot: { kind: 'line', title: 'Loss by epoch', values: [1.2, 0.8, 0.55, 0.5] },
    },
  },
  {
    test: /plt\.plot\(x,\s*y\)/,
    result: {
      output: 'Plot rendered: line chart with 3 points titled Growth',
      plot: { kind: 'line', title: 'Growth', values: [2, 4, 9] },
    },
  },
];

export function runPythonLikeCode(code: string): RunnerResult {
  const normalized = code.trim();
  const match = examples.find(item => item.test.test(normalized));

  if (match) {
    return match.result;
  }

  if (/print\(['"](.+)['"]\)/.test(normalized)) {
    return { output: normalized.match(/print\(['"](.+)['"]\)/)?.[1] ?? '' };
  }

  return {
    output:
      'This offline trainer can run the built-in NumPy, Pandas, and Matplotlib exercises. For arbitrary Python execution, connect a native Python runtime such as Chaquopy or a server sandbox.',
  };
}
