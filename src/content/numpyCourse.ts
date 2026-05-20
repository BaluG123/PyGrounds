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
        { type: 'heading', text: 'Why NumPy? The AI Fuel' },
        {
          type: 'paragraph',
          text: 'At its core, AI operates on millions of numbers. Pure Python lists are slow and memory-heavy because they store pointers to objects scattered across memory. NumPy solves this by introducing the `ndarray` (N-dimensional array): a continuous, highly efficient block of uniform numbers.',
        },
        {
          type: 'analogy',
          text: 'A normal Python list is like a shopping cart full of different-sized, individually wrapped boxes. A NumPy array is like a shipping crate containing exactly identical stacked soda cans. You can count, move, and process the soda cans exponentially faster because of their uniform layout.',
        },
        {
          type: 'diagram',
          title: 'Understanding Array Dimensions (Axes)',
          boxes: [
            { id: 'a0', x: 20, y: 30, width: 80, height: 45, label: 'Axis 0 (Rows)', color: '#1D7A57' },
            { id: 'a1', x: 120, y: 30, width: 90, height: 45, label: 'Axis 1 (Columns)', color: '#2B6CB0' },
            { id: 'a2', x: 230, y: 30, width: 70, height: 45, label: 'Axis 2 (Depth)', color: '#E44D6E' },
          ],
          arrows: [
            { from: 'a0', to: 'a1', label: '1D -> 2D' },
            { from: 'a1', to: 'a2', label: '2D -> 3D' },
          ],
          height: 120,
        },
        { type: 'divider' },
        { type: 'heading', text: 'Shapes and Reshaping' },
        {
          type: 'paragraph',
          text: 'An array has a `shape` (a tuple of dimensions) and a `dtype` (the type of numbers inside). You can change an array\'s shape using `.reshape()`, provided the total number of elements remains identical.',
        },
        {
          type: 'formula',
          expression: '\\text{Elements} = \\prod d_i = d_0 \\times d_1 \\times \\dots \\times d_n',
          note: 'Total elements must remain constant when reshaping.',
        },
        {
          type: 'playground',
          code: 'import numpy as np\n\nx = np.arange(12)\nreshaped = x.reshape(3, 4)\n\nprint(f"Original shape: {x.shape}")\nprint(f"Reshaped matrix:\\n{reshaped}")',
          expectedOutput: 'Original shape: (12,)\nReshaped matrix:\n[[ 0  1  2  3]\n [ 4  5  6  7]\n [ 8  9 10 11]]',
        },
        {
          type: 'callout',
          variant: 'remember',
          title: 'Dtype Matters in ML',
          body: 'Using the correct numeric type is critical. In Deep Learning, tensors usually use `float32` (single-precision float) to balance speed and accuracy, whereas indices use `int64`.',
        },
        {
          type: 'stepByStep',
          title: 'How NumPy Accesses Memory',
          steps: [
            { title: 'Allocate Contiguous Block', description: 'NumPy reserves a continuous space in computer memory for your numbers.' },
            { title: 'Define Shape & Strides', description: 'Sets indices rules: how many bytes to skip to move to the next row or column.' },
            { title: 'Zero-Copy Views', description: 'Slicing or reshaping returns a "view" referencing the same block without copying data.' },
          ],
        },
      ],
    },
    {
      id: 'numpy-broadcasting',
      title: 'Broadcasting and Vectorization',
      duration: '22 min',
      objective: 'Replace loops with operations across full arrays.',
      blocks: [
        { type: 'heading', text: 'Vectorization: Speed Without Loops' },
        {
          type: 'paragraph',
          text: 'In pure Python, applying an operation to an array requires a slow for-loop. NumPy uses **vectorization**: pushing loops down into compiled C code, executing element-wise operations almost instantly.',
        },
        {
          type: 'analogy',
          text: 'Applying a loop in Python is like a librarian scanning books one-by-one by hand. Vectorization is like a scanner checking an entire rack of books simultaneously with a laser bar.',
        },
        {
          type: 'table',
          headers: ['Operation Type', 'Example', 'Execution Speed'],
          rows: [
            ['Python Loop', 'for x in list: x + 1', 'Slow (Interpreted)'],
            ['Vectorized NumPy', 'array + 1', 'Extremely Fast (Compiled C)'],
            ['Broadcasting', 'matrix + row_vector', 'Optimized Memory Stretches'],
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'The Rules of Broadcasting' },
        {
          type: 'paragraph',
          text: 'Broadcasting allows you to perform arithmetic on arrays of different shapes. NumPy matches shapes from right to left. Two dimensions are compatible if they are equal, or if one of them is 1.',
        },
        {
          type: 'formula',
          expression: '(M, N) + (N,) \\longrightarrow (M, N)',
          note: 'Stretches the 1D vector across all M rows.',
        },
        {
          type: 'playground',
          code: 'import numpy as np\n\nmatrix = np.ones((3, 3))\nrow = np.array([10, 20, 30])\n\n# Stretches the row vector across all 3 rows of the matrix\nresult = matrix * row\nprint(result)',
          expectedOutput: '[[10. 20. 30.]\n [10. 20. 30.]\n [10. 20. 30.]]',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Keeping Dimensions',
          body: 'When aggregating arrays (like calculating means), use `keepdims=True` to retain dimensions. This ensures the output remains compatible for subsequent broadcasting operations.',
        },
      ],
    },
    {
      id: 'numpy-linear-algebra',
      title: 'Linear Algebra for AI',
      duration: '26 min',
      objective: 'Connect arrays to model weights, dot products, and distances.',
      blocks: [
        { type: 'heading', text: 'Matrix Math: The Math of Neural Networks' },
        {
          type: 'paragraph',
          text: 'Every neural network layer is built upon linear algebra. The forward pass is primarily dot products (vector projections) and matrix multiplications. NumPy\'s `@` operator handles this natively.',
        },
        {
          type: 'formula',
          expression: '\\vec{a} \\cdot \\vec{b} = \\sum_{i=1}^n a_i b_i',
          note: 'Dot product multiplies matching elements and sums them.',
        },
        {
          type: 'playground',
          code: 'import numpy as np\n\nX = np.array([[1, 2], [3, 4]])\nW = np.array([0.5, -1.0])\nbias = 2.0\n\n# Dot product plus bias (Forward pass of a layer)\nprediction = X @ W + bias\nprint(f"Predictions: {prediction}")',
          expectedOutput: 'Predictions: [ 0.5 -0.5]',
        },
        {
          type: 'callout',
          variant: 'remember',
          title: 'Dot Product Symbol',
          body: 'Use the `@` operator or `np.dot()` for matrix multiplication. Do not use the `*` operator, which performs element-wise multiplication!',
        },
        {
          type: 'stepByStep',
          title: 'Calculating Vector Norms',
          steps: [
            { title: 'Compute Squares', description: 'Square every element in the vector.' },
            { title: 'Aggregate Sum', description: 'Add all squared values together.' },
            { title: 'Square Root', description: 'Take the square root of the sum to find the geometric length (L2 norm).' },
          ],
        },
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
