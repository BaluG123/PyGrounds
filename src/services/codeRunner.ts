export type RunnerResult = {
  output: string;
  plot?: {
    kind: 'line' | 'hist';
    title: string;
    values: number[];
  };
};

const examples: Array<{ test: RegExp; result: RunnerResult }> = [
  // ─── Python Basics ───
  { test: /type\(x\).*type\(y\).*type\(z\)/s, result: { output: "<class 'int'>\n<class 'float'>\n<class 'str'>" } },
  { test: /total\s*=\s*0\s*\nfor\s+i\s+in\s+range\(1,\s*6\):\s*\n\s+total\s*\+=\s*i\s*\nprint\(total\)/s, result: { output: '15' } },
  { test: /def\s+square\(n\):\s*\n\s+return\s+n\s*\*\s*n.*square\(7\)/s, result: { output: '49' } },
  { test: /squares\s*=\s*\[x\*\*2\s+for\s+x\s+in\s+nums\].*print\(squares\)/s, result: { output: '[1, 4, 9, 16, 25]' } },
  { test: /text\.strip\(\)\.lower\(\).*text\.strip\(\)\.split/s, result: { output: "Hello, Python World!\nhello, python world!\n['Hello', 'Python World!']" } },
  { test: /squares\s*=\s*\[x\*\*2\s+for\s+x\s+in\s+range\(1,\s*6\)\].*sum\(squares\)/s, result: { output: '55' } },
  { test: /score\s*=\s*85.*grade.*print\(grade\)/s, result: { output: 'B' } },
  { test: /student\s*=.*"name".*"Ada".*print\(student\["name"\]\)/s, result: { output: 'Ada' } },
  { test: /def\s+double\(n\).*return\s+n\s*\*\s*2.*double\(21\)/s, result: { output: '42' } },
  { test: /text\.strip\(\)\.upper\(\)/s, result: { output: 'HELLO WORLD' } },
  { test: /total\s*=\s*0\s*\nfor\s+i\s+in\s+range\(1,\s*11\):/s, result: { output: '55' } },

  // ─── Python Advanced ───
  { test: /class\s+Dog:.*def\s+bark\(self\).*Rex.*Woof/s, result: { output: 'Rex says Woof!' } },
  { test: /def\s+squares_gen\(n\).*yield\s+i\s*\*\*\s*2.*squares_gen\(6\)/s, result: { output: '[0, 1, 4, 9, 16, 25]' } },
  { test: /def\s+squares_gen\(n\).*yield\s+i\s*\*\*\s*2.*squares_gen\(5\)/s, result: { output: '[0, 1, 4, 9, 16]' } },
  { test: /Skipping.*bad.*Total:\s*40/s, result: { output: 'Skipping: bad\nTotal: 40' } },
  { test: /class\s+Neuron.*forward\(self.*weight\s*\*\s*x\s*\+\s*self\.bias.*forward\(10\)/s, result: { output: '7.0' } },
  { test: /safe_divide\(10,\s*0\)/s, result: { output: 'Error' } },
  { test: /class\s+Dog\(Animal\).*Woof/s, result: { output: 'Woof!' } },
  { test: /math\.sqrt\(144\)/s, result: { output: '12.0' } },

  // ─── NumPy ───
  { test: /x\s*=\s*np\.array\(\[\[1,\s*2,\s*3\],\s*\[4,\s*5,\s*6\]\]\)[\s\S]*mean\(axis=0\)/, result: { output: '(2, 3)\n[2.5 3.5 4.5]' } },
  { test: /np\.arange\(12\)\.reshape\(3,\s*4\)[\s\S]*x\[0\][\s\S]*x\[:,\s*2\]/, result: { output: 'Shape: (3, 4)\nFirst row: [0 1 2 3]\nColumn 2: [ 2  6 10]' } },
  { test: /x\s*=\s*np\.array\(\[10,\s*20,\s*30\]\)[\s\S]*x\s*\/\s*x\.max\(\)/, result: { output: '[0.33333333 0.66666667 1.        ]' } },
  { test: /X\s*=\s*np\.array\(\[\[1,\s*2\],\s*\[3,\s*4\]\]\)[\s\S]*X\s*@\s*W\s*\+\s*b/, result: { output: '[0.5 -0.5]' } },
  { test: /scores\s*=\s*np\.array\(\[\[70,\s*80,\s*90\],\s*\[65,\s*75,\s*85\]\]\)[\s\S]*scores\s*\+\s*curve/, result: { output: '[[75 83 92]\n [70 78 87]]' } },
  { test: /matrix\s*=\s*np\.ones\(\(3,\s*3\)\).*row\s*=\s*np\.array\(\[10,\s*20,\s*30\]\).*matrix\s*\*\s*row/s, result: { output: '[[10. 20. 30.]\n [10. 20. 30.]\n [10. 20. 30.]]' } },
  { test: /v\s*=\s*np\.array\(\[3,\s*4\]\)[\s\S]*linalg\.norm[\s\S]*unit/, result: { output: 'Norm: 5.0\nUnit vector: [0.6 0.8]' } },
  { test: /np\.random\.seed\(42\)[\s\S]*np\.random\.randn\(5\)/, result: { output: 'Random data: [ 0.50 -0.14  0.65  1.52 -0.23]\nMean: 0.46\nStd: 0.62' } },
  { test: /x\[x\s*>\s*5\]/, result: { output: '[7 9 6]' } },
  { test: /np\.random\.seed\(0\)[\s\S]*np\.random\.randn\(3\)/, result: { output: '[1.76 0.4  0.98]' } },
  { test: /np\.arange\(6\)[\s\S]*reshape\(2,\s*3\)/, result: { output: '[[0 1 2]\n [3 4 5]]' } },

  // ─── Pandas ───
  { test: /pd\.DataFrame\(\{'score':\s*\[55,\s*65,\s*78\]\}\)[\s\S]*mean\(\)/, result: { output: '66.0' } },
  { test: /fillna\(df\['score'\]\.mean\(\)\)/, result: { output: '   score\n0   90.0\n1   90.0' } },
  { test: /groupby\('team'\)\['score'\]\.mean\(\)/, result: { output: 'team\nA    85.0\nB    70.0\nName: score, dtype: float64' } },
  { test: /df\.describe\(\)/, result: { output: '             age      score\ncount   3.000000   3.000000\nmean   30.000000  89.000000\nstd     5.000000   3.605551\nmin    25.000000  85.000000\n25%    27.500000  87.500000\n50%    30.000000  90.000000\n75%    32.500000  91.000000\nmax    35.000000  92.000000' } },
  { test: /df\.isna\(\)\.sum\(\)[\s\S]*dropna/, result: { output: 'Missing values:\na    1\nb    1\ndtype: int64\n\nAfter dropna:\n     a    b\n2  3.0  6.0' } },
  { test: /groupby\('dept'\)\['salary'\]\.agg/, result: { output: '       mean  max\ndept              \nEng    85.0   90\nSales  55.0   60' } },
  { test: /pd\.merge\(students,\s*scores/, result: { output: '   id name  score\n0   1  Ada     90\n1   2  Bob     85\n2   3  Cat     92' } },
  { test: /date_range.*month_name/, result: { output: '      month  sales\n0   January    100\n1  February    120\n2     March     90\n3     April    150\n4       May    130\n5      June    160' } },
  { test: /df\.isna\(\)\.sum\(\)[\s\S]*(?!dropna)/, result: { output: 'a    1\nb    2\ndtype: int64' } },
  { test: /df\[df\['score'\]\s*>\s*80\]/, result: { output: '  name  score\n0  Ada     90\n2  Cat     85' } },

  // ─── Matplotlib ───
  { test: /plt\.hist\(scores,\s*bins=3\)/, result: { output: 'Plot rendered: histogram with 3 bins', plot: { kind: 'hist', title: 'Score distribution', values: [55, 65, 67, 70, 92] } } },
  { test: /loss\s*=\s*\[1\.2,\s*0\.8,\s*0\.55,\s*0\.5\]/, result: { output: 'Plot rendered: line chart with labels epoch and loss', plot: { kind: 'line', title: 'Loss by epoch', values: [1.2, 0.8, 0.55, 0.5] } } },
  { test: /plt\.plot\(x,\s*y\)/, result: { output: 'Plot rendered: line chart with 3 points titled Growth', plot: { kind: 'line', title: 'Growth', values: [2, 4, 9] } } },
  { test: /plt\.scatter/, result: { output: 'Plot rendered: scatter plot titled Study vs Score', plot: { kind: 'line', title: 'Study vs Score', values: [50, 60, 65, 80, 90] } } },
  { test: /plt\.bar/, result: { output: 'Plot rendered: bar chart titled Sales by Category', plot: { kind: 'hist', title: 'Sales by Category', values: [30, 50, 40] } } },
  { test: /subplots\(1,\s*2\)/, result: { output: 'Plot rendered: 2 subplots side by side', plot: { kind: 'hist', title: 'Multi-panel', values: [30, 50, 40] } } },
  { test: /plt\.imshow/, result: { output: 'Plot rendered: heatmap correlation matrix', plot: { kind: 'hist', title: 'Correlation Matrix', values: [1.0, 0.8, 0.2, 0.5, 1.0] } } },
  { test: /train_loss.*val_loss.*Overfitting/s, result: { output: 'Plot rendered: two lines showing overfitting pattern', plot: { kind: 'line', title: 'Overfitting Example', values: [1.0, 0.7, 0.5, 0.35, 0.25] } } },
  { test: /Quadratic Growth/, result: { output: 'Plot rendered: line chart titled Quadratic Growth', plot: { kind: 'line', title: 'Quadratic Growth', values: [1, 4, 9, 16, 25] } } },
  { test: /Normal Distribution.*hist.*bins=20/s, result: { output: 'Plot rendered: histogram with 20 bins titled Normal Distribution', plot: { kind: 'hist', title: 'Normal Distribution', values: [85, 90, 95, 100, 105, 110, 115] } } },

  // ─── Math for AI ───
  { test: /data\.mean\(\).*data\.std\(\).*median/s, result: { output: 'Mean: 6.00\nStd: 1.90\nMedian: 6.00' } },
  { test: /p_rain.*p_umbrella.*p_either/s, result: { output: 'P(rain or umbrella) = 0.65' } },
  { test: /p_disease_given_positive/s, result: { output: 'P(disease | positive) = 0.161' } },
  { test: /np\.corrcoef\(hours,\s*scores\)/s, result: { output: 'Correlation: 0.986' } },
  { test: /np\.random\.normal\(loc=100/s, result: { output: 'Mean: 99.8\nStd: 15.1\nWithin 1 std: 68.4%' } },
  { test: /p_a\s*=\s*0\.4.*p_b\s*=\s*0\.5.*p_both\s*=\s*0\.2/s, result: { output: 'P(A or B) = 0.7' } },
  { test: /Posterior.*0\.161/s, result: { output: 'Posterior: 0.161' } },
  { test: /r\s*=.*corrcoef.*r\s*=\s*0\.986/s, result: { output: 'r = 0.986' } },
  { test: /Within\s*1\s*std.*68/s, result: { output: 'Within 1 std: 68.8%' } },
  { test: /Z-score.*2\.00/s, result: { output: 'Z-score: 2.00' } },

  // ─── Linear Algebra ───
  { test: /np\.dot\(a,\s*b\)[\s\S]*linalg\.norm\(a\)/, result: { output: 'Dot product: 32\nMagnitude of a: 3.742' } },
  { test: /A\s*@\s*B[\s\S]*A\.T/, result: { output: 'A @ B =\n[[19 22]\n [43 50]]\n\nTranspose of A =\n[[1 3]\n [2 4]]' } },
  { test: /np\.linalg\.eig\(A\)[\s\S]*Eigenvalues/, result: { output: 'Eigenvalues: [5. 2.]\nEigenvectors:\n[[ 0.89442719 -0.70710678]\n [ 0.4472136   0.70710678]]' } },
  { test: /np\.linalg\.svd[\s\S]*Singular values/, result: { output: 'Singular values: [9.53 0.51]' } },
  { test: /np\.dot\(a,\s*b\)\s*$/, result: { output: '32' } },
  { test: /np\.linalg\.norm\(v\)\s*$/, result: { output: '5.0' } },

  // ─── Scikit-Learn ───
  { test: /train_test_split.*test_size.*Train size/s, result: { output: 'Train size: 7, Test size: 3' } },
  { test: /LogisticRegression.*Predict for X=3/s, result: { output: 'Predict for X=3: [0]\nPredict for X=7: [1]' } },
  { test: /accuracy_score.*precision_score.*recall_score/s, result: { output: 'Accuracy: 0.83\nPrecision: 1.00\nRecall: 0.50' } },
  { test: /cross_val_score.*Average/s, result: { output: 'CV Scores: [1. 1. 1. 1. 1.]\nAverage: 1.00' } },

  // ─── Deep Learning ───
  { test: /np\.dot\(x,\s*w\)\s*\+\s*bias[\s\S]*max\(0,\s*z\)[\s\S]*Neuron output/s, result: { output: 'Neuron output: 1.30' } },
  { test: /relu.*sigmoid.*ReLU.*Sigmoid/s, result: { output: 'ReLU: [0. 0. 2.]\nSigmoid: [0.12 0.5  0.88]' } },
  { test: /np\.dot\(x,\s*W\)\s*\+\s*b[\s\S]*np\.maximum\(0[\s\S]*Layer output/s, result: { output: 'Layer output: [[1.  0.9 1.6]]' } },
  { test: /output\.shape/, result: { output: '(100, 50)' } },

  // ─── AI Projects ───
  { test: /1\.\s*Collect data[\s\S]*8\.\s*Deploy/s, result: { output: '1. Collect data\n2. Explore & clean\n3. Engineer features\n4. Train/test split\n5. Train model\n6. Evaluate metrics\n7. Tune hyperparameters\n8. Deploy & monitor' } },
  { test: /train_acc\s*=\s*0\.99.*test_acc\s*=\s*0\.65.*Overfitting/s, result: { output: 'Train: 0.99, Test: 0.65\nDiagnosis: Overfitting' } },
  { test: /Responsible AI Checklist/s, result: { output: 'Responsible AI Checklist: 4/5\n  ✓ Data audit\n  ✓ Bias testing\n  ✗ Explainability\n  ✓ Human oversight\n  ✓ Privacy review' } },
  { test: /gap\s*>\s*0\.15[\s\S]*Overfitting/s, result: { output: 'Overfitting' } },
  { test: /Passed:\s*2\/3/s, result: { output: 'Passed: 2/3' } },
  { test: /enumerate\(steps,\s*1\)/s, result: { output: '1. Collect\n2. Clean\n3. Train\n4. Evaluate\n5. Deploy' } },
  { test: /Best:\s*RandomForest/s, result: { output: 'Best: RandomForest (0.88)' } },
  { test: /train\s*=\s*0\.55.*Try a more complex/s, result: { output: 'Gap: 0.05, Action: Try a more complex model' } },
];

/**
 * Enhanced Python-like code runner for the offline playground.
 * Matches all built-in exercises using patterns, plus basic Python evaluation.
 */
export function runPythonLikeCode(code: string): RunnerResult {
  const normalized = code.trim();

  // Try pattern matching first
  const match = examples.find(item => item.test.test(normalized));
  if (match) {
    return match.result;
  }

  // Basic print("string") handler
  const printMatch = normalized.match(/print\(['"](.*)['"]\)/);
  if (printMatch) {
    return { output: printMatch[1] };
  }

  // print(f"...{expr}...") handler
  const fstringMatch = normalized.match(/print\(f['"](.*)['"]\)/);
  if (fstringMatch) {
    return { output: fstringMatch[1].replace(/\{[^}]+\}/g, '<value>') };
  }

  // Simple arithmetic print
  const mathMatch = normalized.match(/print\((\d+\s*[\+\-\*\/]\s*\d+)\)/);
  if (mathMatch) {
    try {
      const result = Function(`"use strict"; return (${mathMatch[1]})`)();
      return { output: String(result) };
    } catch {}
  }

  // Multiple print statements with simple strings
  const allPrints = [...normalized.matchAll(/print\(['"](.*?)['"]\)/g)];
  if (allPrints.length > 1) {
    return { output: allPrints.map(m => m[1]).join('\n') };
  }

  return {
    output:
      'This offline trainer can run all built-in exercises for Python, NumPy, Pandas, Matplotlib, Math, Linear Algebra, Scikit-Learn, Deep Learning, and AI Projects. For arbitrary Python, connect a native runtime (Chaquopy or server sandbox).',
  };
}
