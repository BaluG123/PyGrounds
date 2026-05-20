import { Braces } from 'lucide-react-native';
import type { CourseModule } from '../types/course';

export const numpyCourse: CourseModule = {
  id: 'numpy',
  title: 'NumPy',
  subtitle: 'Arrays, vector math, broadcasting, linear algebra',
  color: '#1D7A57',
  accent: '#DDF4E8',
  Icon: Braces,
  history: {
    founder: 'Travis Oliphant and the scientific Python community',
    released: '2005',
    summary:
      'NumPy unified earlier array projects into the core numerical engine that most Python AI tools still stand on.',
  },
  concepts: [
    'ndarray shape, dtype, axes, strides',
    'Vectorization instead of slow Python loops',
    'Broadcasting rules for compatible shapes',
    'Boolean masks and fancy indexing',
    'Aggregations across axes',
    'Random sampling with reproducible seeds',
    'Linear algebra: dot products, norms, inverse, eigenvalues',
    'Saving arrays and preparing tensors for ML',
  ],
  lessons: [
    {
      id: 'numpy-arrays',
      title: 'Thinking in Arrays',
      duration: '18 min',
      objective: 'Read and reshape numerical data without losing track of axes.',
      blocks: [
        { type: 'paragraph', text: 'AI systems learn from numbers. NumPy gives you one fast object, ndarray, for storing those numbers with a shape and dtype.' },
        { type: 'formula', expression: 'shape = (rows, columns), axis 0 = down, axis 1 = across', note: 'Most beginner bugs come from mixing up axes.' },
        { type: 'code', code: 'import numpy as np\nx = np.array([[1, 2, 3], [4, 5, 6]])\nprint(x.shape)\nprint(x.mean(axis=0))' },
        { type: 'playground', code: 'import numpy as np\nx = np.arange(12).reshape(3, 4)\nprint(f"Shape: {x.shape}")\nprint(f"First row: {x[0]}")\nprint(f"Column 2: {x[:, 2]}")', expectedOutput: 'Shape: (3, 4)\nFirst row: [0 1 2 3]\nColumn 2: [ 2  6 10]' },
        { type: 'bullets', items: [
          'Use reshape only when the total element count stays the same.',
          'Use dtype deliberately: float32 for many ML tensors, int64 for ids.',
          'Use axis arguments until they feel automatic.',
        ] },
      ],
    },
    {
      id: 'numpy-broadcasting',
      title: 'Broadcasting and Vectorization',
      duration: '22 min',
      objective: 'Replace loops with operations across full arrays.',
      blocks: [
        { type: 'paragraph', text: 'Broadcasting lets NumPy stretch smaller arrays over larger arrays when dimensions are compatible.' },
        { type: 'formula', expression: '(m, n) + (n,) -> (m, n)', note: 'Compare shapes from the right side.' },
        { type: 'code', code: 'import numpy as np\nscores = np.array([[70, 80, 90], [65, 75, 85]])\ncurve = np.array([5, 3, 2])\nprint(scores + curve)' },
        { type: 'playground', code: 'import numpy as np\nmatrix = np.ones((3, 3))\nrow = np.array([10, 20, 30])\nprint(matrix * row)', expectedOutput: '[[10. 20. 30.]\n [10. 20. 30.]\n [10. 20. 30.]]' },
        { type: 'bullets', items: [
          'Vectorized code is shorter and usually much faster.',
          'Masks create readable filters: x[x > 0].',
          'Keep dimensions with keepdims=True when a later broadcast needs them.',
        ] },
      ],
    },
    {
      id: 'numpy-linear-algebra',
      title: 'Linear Algebra for AI',
      duration: '26 min',
      objective: 'Connect arrays to model weights, dot products, and distances.',
      blocks: [
        { type: 'paragraph', text: 'Neural networks are built from matrix multiplication, activation functions, and optimization. NumPy is the clearest place to learn those mechanics.' },
        { type: 'formula', expression: 'prediction = XW + b' },
        { type: 'code', code: 'import numpy as np\nX = np.array([[1, 2], [3, 4]])\nW = np.array([0.5, -1.0])\nb = 2\nprint(X @ W + b)' },
        { type: 'playground', code: 'import numpy as np\nv = np.array([3, 4])\nnorm = np.linalg.norm(v)\nunit = v / norm\nprint(f"Norm: {norm}")\nprint(f"Unit vector: {unit}")', expectedOutput: 'Norm: 5.0\nUnit vector: [0.6 0.8]' },
      ],
    },
    {
      id: 'numpy-random',
      title: 'Random Sampling and Seeds',
      duration: '18 min',
      objective: 'Generate reproducible random data for experiments and simulations.',
      blocks: [
        { type: 'paragraph', text: 'ML relies heavily on randomness: weight initialization, data shuffling, dropout. Reproducible experiments require setting a random seed.' },
        { type: 'playground', code: 'import numpy as np\nnp.random.seed(42)\ndata = np.random.randn(5)\nprint(f"Random data: {np.round(data, 2)}")\nprint(f"Mean: {data.mean():.2f}")\nprint(f"Std: {data.std():.2f}")', expectedOutput: 'Random data: [ 0.50 -0.14  0.65  1.52 -0.23]\nMean: 0.46\nStd: 0.62' },
        { type: 'bullets', items: [
          'np.random.seed(n) makes results reproducible.',
          'np.random.randn() samples from standard normal (mean=0, std=1).',
          'np.random.uniform(low, high, size) for uniform distributions.',
          'np.random.choice(array, size) for random sampling from data.',
        ] },
      ],
    },
    {
      id: 'numpy-saving',
      title: 'Saving and Loading Arrays',
      duration: '14 min',
      objective: 'Persist NumPy arrays to disk for data pipelines.',
      blocks: [
        { type: 'paragraph', text: 'After preprocessing data, save arrays to .npy or .npz files to avoid repeating expensive computations.' },
        { type: 'code', code: 'import numpy as np\ndata = np.array([1, 2, 3, 4, 5])\nnp.save("my_data.npy", data)\nloaded = np.load("my_data.npy")\nprint(loaded)' },
        { type: 'bullets', items: [
          '.npy saves a single array. .npz saves multiple arrays.',
          'np.savez("file.npz", x=arr1, y=arr2) for multiple arrays.',
          'Binary format is faster than CSV for large numerical data.',
          'Use np.loadtxt/np.savetxt for human-readable text files.',
        ] },
      ],
    },
  ],
  quiz: [
    { id: 'np-q1', prompt: 'What does axis=0 usually mean for a 2D array?', options: ['Operate down rows for each column', 'Operate across columns for each row', 'Flatten first', 'Transpose first'], answerIndex: 0, explanation: 'axis=0 collapses the row direction, producing one result per column.' },
    { id: 'np-q2', prompt: 'Which shape can broadcast with (4, 3)?', options: ['(3,)', '(4, 2)', '(5, 3)', '(2,)'], answerIndex: 0, explanation: 'Shapes are compared from the right: 3 matches 3, and the missing leading dimension is treated as 1.' },
    { id: 'np-q3', prompt: 'Why is vectorization important?', options: ['It pushes loops into optimized native code', 'It removes the need for data', 'It changes Python syntax', 'It only makes plots prettier'], answerIndex: 0, explanation: 'NumPy operations run in optimized compiled routines instead of slow Python loops.' },
    { id: 'np-q4', prompt: 'What does X @ W commonly represent in ML?', options: ['Matrix multiplication', 'String formatting', 'Random sampling', 'File saving'], answerIndex: 0, explanation: 'The @ operator performs matrix multiplication in Python.' },
    { id: 'np-q5', prompt: 'What does np.random.seed(42) do?', options: ['Makes random results reproducible', 'Generates 42 random numbers', 'Sets array values to 42', 'Creates a seed file'], answerIndex: 0, explanation: 'Setting a seed ensures the same sequence of random numbers every time.' },
    { id: 'np-q6', prompt: 'What is the shape of np.arange(12).reshape(3, 4)?', options: ['(3, 4)', '(4, 3)', '(12,)', '(12, 1)'], answerIndex: 0, explanation: 'reshape(3, 4) creates a 3-row, 4-column matrix from 12 elements.' },
    { id: 'np-q7', prompt: 'What does x[x > 5] do?', options: ['Selects elements greater than 5 using a boolean mask', 'Sets all elements to 5', 'Returns True or False', 'Raises an error'], answerIndex: 0, explanation: 'Boolean indexing filters the array to keep only values matching the condition.' },
    { id: 'np-q8', prompt: 'What file format does np.save() use?', options: ['.npy binary format', '.csv text format', '.json format', '.xlsx format'], answerIndex: 0, explanation: '.npy is NumPy\'s efficient binary format for single arrays.' },
    { id: 'np-q9', prompt: 'What does np.linalg.norm(v) compute?', options: ['The magnitude (L2 norm) of vector v', 'The normal distribution', 'The normalized form', 'The number of elements'], answerIndex: 0, explanation: 'L2 norm = √(sum of squared elements), which is the vector length.' },
    { id: 'np-q10', prompt: 'What dtype should you typically use for ML tensors?', options: ['float32', 'int8', 'string', 'bool'], answerIndex: 0, explanation: 'float32 offers a good balance of precision and memory for neural network computations.' },
  ],
  practice: [
    { id: 'np-p1', title: 'Normalize a Vector', prompt: 'Create an array [10, 20, 30], divide by its maximum, and print the result.', starterCode: 'import numpy as np\nx = np.array([10, 20, 30])\nprint(x / x.max())', expectedOutput: '[0.33333333 0.66666667 1.        ]', hint: 'x.max() returns the largest value.' },
    { id: 'np-p2', title: 'Column Means', prompt: 'Print the mean of each column in a 2x3 array.', starterCode: 'import numpy as np\nx = np.array([[1, 2, 3], [4, 5, 6]])\nprint(x.mean(axis=0))', expectedOutput: '[2.5 3.5 4.5]', hint: 'Columns survive when you reduce axis=0.' },
    { id: 'np-p3', title: 'Simple Linear Model', prompt: 'Use X @ W + b to produce two predictions.', starterCode: 'import numpy as np\nX = np.array([[1, 2], [3, 4]])\nW = np.array([0.5, -1.0])\nb = 2\nprint(X @ W + b)', expectedOutput: '[0.5 -0.5]', hint: 'The @ operator computes the dot product row by row.' },
    { id: 'np-p4', title: 'Boolean Filter', prompt: 'Filter an array to keep only values greater than 5.', starterCode: 'import numpy as np\nx = np.array([2, 7, 3, 9, 1, 6])\nprint(x[x > 5])', expectedOutput: '[7 9 6]', hint: 'x[x > 5] uses a boolean mask to filter.' },
    { id: 'np-p5', title: 'Reproducible Random', prompt: 'Generate 3 random numbers with seed 0 and print them rounded.', starterCode: 'import numpy as np\nnp.random.seed(0)\ndata = np.random.randn(3)\nprint(np.round(data, 2))', expectedOutput: '[1.76 0.4  0.98]', hint: 'seed(0) ensures the same numbers every run.' },
    { id: 'np-p6', title: 'Reshape Array', prompt: 'Reshape a 1D array of 6 elements into a 2x3 matrix.', starterCode: 'import numpy as np\nx = np.arange(6)\nprint(x.reshape(2, 3))', expectedOutput: '[[0 1 2]\n [3 4 5]]', hint: '6 elements can reshape to (2, 3) since 2×3 = 6.' },
  ],
};
