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
  "quiz": [
    {
      "id": "np-q1",
      "prompt": "What does axis=0 usually mean for a 2D array?",
      "options": [
        "Operate down rows for each column",
        "Operate across columns for each row",
        "Flatten first",
        "Transpose first"
      ],
      "answerIndex": 0,
      "explanation": "axis=0 collapses the row direction, producing one result per column. Think of it as 'crush downward': np.sum([[1,2],[3,4]], axis=0) → [4, 6]."
    },
    {
      "id": "np-q2",
      "prompt": "Which shape can broadcast with (4, 3)?",
      "options": [
        "(3,)",
        "(4, 2)",
        "(5, 3)",
        "(2,)"
      ],
      "answerIndex": 0,
      "explanation": "Broadcasting rules compare shapes from the right. (3,) aligns with the last dimension 3, and the missing leading dimension is treated as 1 — so it stretches across all 4 rows."
    },
    {
      "id": "np-q3",
      "prompt": "Why is vectorization important in NumPy?",
      "options": [
        "It pushes loops into optimized native code",
        "It removes the need for data",
        "It changes Python syntax",
        "It only makes plots prettier"
      ],
      "answerIndex": 0,
      "explanation": "NumPy operations are implemented in compiled C/Fortran. A vectorized operation on 1 million elements can be 100x faster than an equivalent Python for-loop."
    },
    {
      "id": "np-q4",
      "prompt": "What does X @ W commonly represent in ML?",
      "options": [
        "Matrix multiplication",
        "String formatting",
        "Random sampling",
        "File saving"
      ],
      "answerIndex": 0,
      "explanation": "The @ operator (PEP 465) performs matrix multiplication. In ML, X (data) @ W (weights) computes the weighted input for each sample in one shot."
    },
    {
      "id": "np-q5",
      "prompt": "What does np.random.seed(42) do?",
      "options": [
        "Makes random results reproducible",
        "Generates 42 random numbers",
        "Sets array values to 42",
        "Creates a seed file"
      ],
      "answerIndex": 0,
      "explanation": "A seed initialises the pseudo-random number generator to a fixed state. Anyone running the same code with seed(42) gets identical random numbers — critical for reproducible ML experiments."
    },
    {
      "id": "np-q6",
      "prompt": "What is the shape of np.arange(12).reshape(3, 4)?",
      "options": [
        "(3, 4)",
        "(4, 3)",
        "(12,)",
        "(12, 1)"
      ],
      "answerIndex": 0,
      "explanation": "arange(12) gives [0..11] with shape (12,). reshape(3,4) rearranges into 3 rows × 4 columns. Total elements must match: 3×4=12. ✓"
    },
    {
      "id": "np-q7",
      "prompt": "What does x[x > 5] do?",
      "options": [
        "Selects elements greater than 5 using a boolean mask",
        "Sets all elements to 5",
        "Returns True or False",
        "Raises an error"
      ],
      "answerIndex": 0,
      "explanation": "x > 5 creates a boolean array ([False, True, ...]). Using it as an index selects only True positions. This is called boolean (fancy) indexing."
    },
    {
      "id": "np-q8",
      "prompt": "What file format does np.save() use?",
      "options": [
        ".npy binary format",
        ".csv text format",
        ".json format",
        ".xlsx format"
      ],
      "answerIndex": 0,
      "explanation": ".npy stores the array's shape, dtype, and raw data in a compact binary format. It's much faster to load than CSV and preserves dtype exactly."
    },
    {
      "id": "np-q9",
      "prompt": "What does np.linalg.norm(v) compute?",
      "options": [
        "The magnitude (L2 norm) of vector v",
        "The normal distribution",
        "The normalized form",
        "The number of elements"
      ],
      "answerIndex": 0,
      "explanation": "The L2 norm is √(Σxᵢ²) — the Euclidean length of the vector. Used constantly in ML: gradient magnitudes, distance metrics, regularisation penalties."
    },
    {
      "id": "np-q10",
      "prompt": "What dtype should you typically use for ML tensors?",
      "options": [
        "float32",
        "int8",
        "string",
        "bool"
      ],
      "answerIndex": 0,
      "explanation": "float32 uses 4 bytes per number. float64 doubles memory with little benefit for most networks. GPUs are also optimised for float32 arithmetic."
    },
    {
      "id": "np-q11",
      "prompt": "What does np.zeros((3, 3)) produce?",
      "options": [
        "A 3×3 matrix filled with 0.0",
        "A 3×3 identity matrix",
        "A 1D array of three zeros",
        "An empty array"
      ],
      "answerIndex": 0,
      "explanation": "np.zeros(shape) creates an array filled with 0.0 of the given shape. Commonly used to initialise weight matrices before training."
    },
    {
      "id": "np-q12",
      "prompt": "What does arr.T do?",
      "options": [
        "Returns the transpose of the array",
        "Converts to a tuple",
        "Fills with T values",
        "Sorts the array"
      ],
      "answerIndex": 0,
      "explanation": "The .T attribute swaps rows and columns. A (3,4) array becomes (4,3). Essential for aligning dimensions in matrix multiplications."
    },
    {
      "id": "np-q13",
      "prompt": "What is the difference between np.copy(a) and a view?",
      "options": [
        "copy() creates independent data; a view shares the same memory",
        "They are identical",
        "Views are slower",
        "copy() changes the dtype"
      ],
      "answerIndex": 0,
      "explanation": "Slicing (a[1:3]) usually returns a view — modifying it changes the original. np.copy() or a.copy() allocates new memory, so changes are independent."
    },
    {
      "id": "np-q14",
      "prompt": "What does np.concatenate([a, b], axis=0) do?",
      "options": [
        "Stacks arrays vertically (along rows)",
        "Multiplies arrays element-wise",
        "Merges dicts",
        "Flattens both arrays"
      ],
      "answerIndex": 0,
      "explanation": "axis=0 stacks along rows (vertically). Two (3,4) arrays produce a (6,4) array. Use axis=1 to concatenate column-wise."
    },
    {
      "id": "np-q15",
      "prompt": "What does np.where(condition, x, y) return?",
      "options": [
        "x where condition is True, y where False",
        "Indices where condition is True only",
        "A filtered list",
        "A boolean mask"
      ],
      "answerIndex": 0,
      "explanation": "np.where is a vectorised if-else: np.where(arr>0, arr, 0) implements ReLU — keeps positive values, zeros out the rest."
    },
    {
      "id": "np-q16",
      "prompt": "What does np.dot(a, b) compute for 1D arrays?",
      "options": [
        "The scalar dot product",
        "The outer product",
        "Element-wise multiplication",
        "The cross product"
      ],
      "answerIndex": 0,
      "explanation": "For 1D arrays, np.dot gives Σaᵢbᵢ — the dot product, equivalent to a @ b. For 2D, it performs matrix multiplication."
    },
    {
      "id": "np-q17",
      "prompt": "What does np.linspace(0, 1, 5) produce?",
      "options": [
        "[0.0, 0.25, 0.5, 0.75, 1.0]",
        "[0, 1, 2, 3, 4]",
        "[0.0, 0.2, 0.4, 0.6, 0.8]",
        "[1, 1, 1, 1, 1]"
      ],
      "answerIndex": 0,
      "explanation": "linspace(start, stop, num) produces num evenly spaced values inclusive of both endpoints. Useful for plotting smooth curves."
    },
    {
      "id": "np-q18",
      "prompt": "How do you add a new axis to an array of shape (4,)?",
      "options": [
        "arr[:, np.newaxis] → shape (4,1)",
        "arr.reshape(4)",
        "arr.flatten()",
        "arr.expand()"
      ],
      "answerIndex": 0,
      "explanation": "np.newaxis (or None) inserts a size-1 dimension. (4,) → (4,1) is needed to broadcast a column vector against a (4,3) matrix."
    },
    {
      "id": "np-q19",
      "prompt": "What does np.argmax(arr) return?",
      "options": [
        "The index of the maximum value",
        "The maximum value itself",
        "All indices where value equals max",
        "The sorted array"
      ],
      "answerIndex": 0,
      "explanation": "argmax returns the flat index of the largest element. In classification, np.argmax(logits) gives the predicted class label."
    },
    {
      "id": "np-q20",
      "prompt": "What is the result of np.eye(3)?",
      "options": [
        "3×3 identity matrix",
        "3×3 zero matrix",
        "3-element array of 1s",
        "3×3 matrix of random values"
      ],
      "answerIndex": 0,
      "explanation": "np.eye(n) creates an n×n identity matrix (1s on the diagonal, 0s elsewhere). Used in linear algebra and to initialise certain weight matrices."
    },
    {
      "id": "np-q21",
      "prompt": "What does np.clip(arr, 0, 1) do?",
      "options": [
        "Clamps all values to [0, 1]",
        "Removes values outside [0,1]",
        "Normalizes the array",
        "Rounds to 0 or 1"
      ],
      "answerIndex": 0,
      "explanation": "clip(a_min, a_max) replaces values below a_min with a_min and above a_max with a_max. Useful for keeping probabilities in [0,1]."
    },
    {
      "id": "np-q22",
      "prompt": "What does arr.flatten() return?",
      "options": [
        "A 1D copy of the array",
        "A view with shape (-1,)",
        "The array sorted",
        "A tuple of all elements"
      ],
      "answerIndex": 0,
      "explanation": "flatten() always returns a copy as a 1D array. arr.ravel() does the same but returns a view when possible (faster)."
    },
    {
      "id": "np-q23",
      "prompt": "What is the output shape of np.sum(arr) for arr of shape (3,4)?",
      "options": [
        "() — a scalar",
        "(3,)",
        "(4,)",
        "(3,4)"
      ],
      "answerIndex": 0,
      "explanation": "With no axis argument, np.sum collapses everything into a single scalar (shape ()). Specify axis to keep dimensions."
    },
    {
      "id": "np-q24",
      "prompt": "What does np.vstack([a, b]) do?",
      "options": [
        "Stacks arrays row-wise (vertically)",
        "Stacks arrays column-wise",
        "Creates a 3D array",
        "Concatenates strings"
      ],
      "answerIndex": 0,
      "explanation": "vstack is shorthand for concatenate along axis=0. Two (2,3) arrays → (4,3). hstack stacks horizontally (axis=1)."
    },
    {
      "id": "np-q25",
      "prompt": "What does np.random.randn(3, 3) produce?",
      "options": [
        "A 3×3 matrix from standard normal distribution (mean=0, std=1)",
        "A 3×3 matrix of integers 0-3",
        "A 3×3 uniform matrix [0,1)",
        "A fixed random matrix"
      ],
      "answerIndex": 0,
      "explanation": "randn samples from N(0,1). Commonly used to initialise neural network weights before scaling (e.g. Xavier init)."
    },
    {
      "id": "np-q26",
      "prompt": "What does np.unique(arr) return?",
      "options": [
        "Sorted unique elements",
        "Unique elements in original order",
        "Count of each element",
        "A set"
      ],
      "answerIndex": 0,
      "explanation": "np.unique returns sorted unique values. With return_counts=True it also returns how many times each value appears — useful for class distribution analysis."
    },
    {
      "id": "np-q27",
      "prompt": "What does arr[::2] do?",
      "options": [
        "Selects every other element starting from index 0",
        "Selects the last two elements",
        "Divides by 2",
        "Reverses the array"
      ],
      "answerIndex": 0,
      "explanation": "Slice syntax [start:stop:step]. ::2 means start=0, stop=end, step=2 — every even index: [0,2,4,...]. Use [::-1] to reverse."
    },
    {
      "id": "np-q28",
      "prompt": "What is the difference between np.random.rand() and np.random.randn()?",
      "options": [
        "rand() is uniform [0,1); randn() is standard normal",
        "They are identical",
        "randn() is uniform",
        "rand() is normal"
      ],
      "answerIndex": 0,
      "explanation": "rand draws from Uniform(0,1) — all values equally likely between 0 and 1. randn draws from Normal(0,1) — values cluster around 0."
    },
    {
      "id": "np-q29",
      "prompt": "What does np.linalg.inv(A) compute?",
      "options": [
        "The matrix inverse A⁻¹",
        "The eigenvalues",
        "The determinant",
        "The transpose"
      ],
      "answerIndex": 0,
      "explanation": "inv(A) returns A⁻¹ such that A @ A⁻¹ = I. Used in closed-form solutions like OLS: w = (XᵀX)⁻¹Xᵀy. Raises LinAlgError if A is singular."
    },
    {
      "id": "np-q30",
      "prompt": "What does np.sum(arr, axis=1, keepdims=True) do?",
      "options": [
        "Sums each row and keeps shape (n,1)",
        "Sums each column",
        "Returns a scalar",
        "Removes all dimensions"
      ],
      "answerIndex": 0,
      "explanation": "keepdims=True preserves the collapsed dimension as size 1 — shape (3,4) becomes (3,1) instead of (3,). This allows broadcasting back against the original array."
    },
    {
      "id": "np-q31",
      "prompt": "What is fancy indexing in NumPy?",
      "options": [
        "Indexing with an array of integers",
        "Indexing with negative numbers",
        "Indexing with slices",
        "Indexing with a lambda"
      ],
      "answerIndex": 0,
      "explanation": "Fancy indexing uses an array of indices: arr[[0, 2, 4]] selects rows 0, 2, 4. Unlike slices, it always returns a copy."
    },
    {
      "id": "np-q32",
      "prompt": "What does np.einsum('ij,jk->ik', A, B) compute?",
      "options": [
        "Matrix multiplication A @ B",
        "Hadamard product",
        "Outer product",
        "Trace"
      ],
      "answerIndex": 0,
      "explanation": "einsum expresses tensor operations with index notation. 'ij,jk->ik' sums over j — exactly matrix multiplication. Extremely versatile for batched operations."
    },
    {
      "id": "np-q33",
      "prompt": "What is the output of np.arange(1, 10, 2)?",
      "options": [
        "[1, 3, 5, 7, 9]",
        "[1, 2, 3, 4, 5]",
        "[1, 3, 5, 7]",
        "[2, 4, 6, 8]"
      ],
      "answerIndex": 0,
      "explanation": "arange(start, stop, step) gives [1,3,5,7,9]. Like Python range but returns an ndarray. stop=10 is excluded."
    },
    {
      "id": "np-q34",
      "prompt": "What does np.cov(X) compute for a 2D array X of shape (features, samples)?",
      "options": [
        "The covariance matrix",
        "The correlation matrix",
        "The variance of each column",
        "The mean of each row"
      ],
      "answerIndex": 0,
      "explanation": "np.cov treats each row as a variable and columns as observations by default. The result is a (features×features) matrix showing how variables vary together — foundational for PCA."
    },
    {
      "id": "np-q35",
      "prompt": "Which function computes element-wise maximum of two arrays?",
      "options": [
        "np.maximum(a, b)",
        "np.max(a, b)",
        "np.fmax(a,b) only",
        "max(a, b)"
      ],
      "answerIndex": 0,
      "explanation": "np.maximum(a, b) compares element by element and returns the larger. np.max(arr) finds the global max of one array. Very different!"
    },
    {
      "id": "np-q36",
      "prompt": "What does np.linalg.eig(A) return?",
      "options": [
        "Eigenvalues and eigenvectors of A",
        "Singular values",
        "The rank",
        "The determinant"
      ],
      "answerIndex": 0,
      "explanation": "eig returns (eigenvalues, eigenvectors). Eigenvectors form the columns of the second result. Used in PCA, spectral clustering, and stability analysis."
    },
    {
      "id": "np-q37",
      "prompt": "What does np.linalg.svd(A) decompose A into?",
      "options": [
        "U, S, Vt where A = U @ diag(S) @ Vt",
        "Eigenvalues and eigenvectors",
        "LU factorisation",
        "QR factorisation"
      ],
      "answerIndex": 0,
      "explanation": "SVD splits any matrix into U (left singular vectors), S (singular values), Vt (right singular vectors transposed). Foundation of dimensionality reduction and recommendation systems."
    },
    {
      "id": "np-q38",
      "prompt": "What does np.corrcoef(x, y) measure?",
      "options": [
        "Pearson correlation coefficient between x and y",
        "Covariance",
        "Euclidean distance",
        "Cosine similarity"
      ],
      "answerIndex": 0,
      "explanation": "corrcoef returns values in [-1, 1]. 1 = perfect positive correlation, -1 = perfect negative, 0 = no linear relationship. Returns a 2×2 matrix."
    },
    {
      "id": "np-q39",
      "prompt": "What does np.broadcast_to(arr, shape) do?",
      "options": [
        "Returns a read-only view with the new shape without copying data",
        "Creates a writeable copy",
        "Raises an error if shapes differ",
        "Transposes the array"
      ],
      "answerIndex": 0,
      "explanation": "broadcast_to is memory-efficient: the data is not replicated; NumPy just pretends the array has the larger shape. The result is read-only."
    },
    {
      "id": "np-q40",
      "prompt": "What does np.isnan(arr).any() check?",
      "options": [
        "Whether any element is NaN",
        "Whether all elements are NaN",
        "The number of NaN values",
        "Whether dtype is float"
      ],
      "answerIndex": 0,
      "explanation": "np.isnan produces a boolean array; .any() returns True if at least one element is True. Essential for data quality checks before training."
    },
    {
      "id": "np-q41",
      "prompt": "What does np.cumsum([1, 2, 3, 4]) return?",
      "options": [
        "[1, 3, 6, 10]",
        "[1, 2, 3, 4]",
        "[10, 10, 10, 10]",
        "[0, 1, 3, 6]"
      ],
      "answerIndex": 0,
      "explanation": "cumsum computes the running total: [1, 1+2, 1+2+3, 1+2+3+4] = [1,3,6,10]. Used in probability (CDF), finance (running returns), and more."
    },
    {
      "id": "np-q42",
      "prompt": "What is the purpose of np.newaxis vs np.reshape?",
      "options": [
        "newaxis inserts a size-1 dim cleanly; reshape is more general but requires specifying all dims",
        "They are identical",
        "reshape is faster",
        "newaxis changes dtype"
      ],
      "answerIndex": 0,
      "explanation": "arr[:, np.newaxis] is idiomatic for adding a column axis. reshape(-1,1) achieves the same but is more explicit. newaxis reads as 'add a dim here'."
    },
    {
      "id": "np-q43",
      "prompt": "What does np.random.choice(arr, size=3, replace=False) do?",
      "options": [
        "Samples 3 unique elements without replacement",
        "Samples 3 elements with repetition allowed",
        "Shuffles the array",
        "Creates 3 copies"
      ],
      "answerIndex": 0,
      "explanation": "replace=False ensures no element is picked twice — sampling without replacement. Used for train/val/test splitting and bootstrapping."
    },
    {
      "id": "np-q44",
      "prompt": "What does arr.astype(np.float32) do?",
      "options": [
        "Returns a new array with dtype changed to float32",
        "Modifies arr in-place",
        "Rounds all values",
        "Converts to a Python list"
      ],
      "answerIndex": 0,
      "explanation": "astype always returns a copy with the new dtype. Changing from float64 to float32 halves memory — important when loading large datasets."
    },
    {
      "id": "np-q45",
      "prompt": "What does np.percentile(arr, 75) compute?",
      "options": [
        "The value below which 75% of data falls (Q3)",
        "The 75th element",
        "The mean of the top 75%",
        "The standard deviation"
      ],
      "answerIndex": 0,
      "explanation": "The 75th percentile (Q3) is the value such that 75% of observations are below it. Useful for outlier detection (IQR = Q3 - Q1)."
    },
    {
      "id": "np-q46",
      "prompt": "What does np.tile(arr, 3) do?",
      "options": [
        "Repeats the array 3 times end-to-end",
        "Reshapes to 3 columns",
        "Repeats each element 3 times",
        "Creates 3 copies of the ndarray object"
      ],
      "answerIndex": 0,
      "explanation": "tile repeats the whole array: [1,2] → [1,2,1,2,1,2]. np.repeat repeats each element: [1,2] → [1,1,2,2] with repeat=2."
    },
    {
      "id": "np-q47",
      "prompt": "What does np.nan_to_num(arr) do?",
      "options": [
        "Replaces NaN with 0, +inf with a large number, -inf with a small number",
        "Removes NaN rows",
        "Raises ValueError on NaN",
        "Fills NaN with the column mean"
      ],
      "answerIndex": 0,
      "explanation": "nan_to_num is a quick way to sanitise arrays before computation. Safe defaults: NaN→0, inf→max finite float, -inf→min finite float."
    },
    {
      "id": "np-q48",
      "prompt": "What is the output of np.array([1, 2, 3], dtype=np.bool_)?",
      "options": [
        "[True, True, True]",
        "[1, 2, 3]",
        "[True, False, True]",
        "Error"
      ],
      "answerIndex": 0,
      "explanation": "Non-zero integers convert to True. Only 0 converts to False. So [1,2,3] all become True."
    },
    {
      "id": "np-q49",
      "prompt": "What does np.outer(a, b) compute for 1D vectors a and b?",
      "options": [
        "The outer product — an (m×n) matrix where result[i,j]=a[i]*b[j]",
        "The dot product",
        "The cross product",
        "The concatenated array"
      ],
      "answerIndex": 0,
      "explanation": "The outer product creates every pair-wise product. For a=(m,) and b=(n,) the result is (m,n). Common in attention mechanisms and Gram matrices."
    },
    {
      "id": "np-q50",
      "prompt": "What does np.linalg.lstsq(A, b) solve?",
      "options": [
        "The least-squares solution to Ax≈b",
        "The exact solution to Ax=b",
        "The eigenvalue problem",
        "The null space of A"
      ],
      "answerIndex": 0,
      "explanation": "When the system is overdetermined (more equations than unknowns), lstsq minimises ‖Ax−b‖². This is the closed-form linear regression solution."
    },
    {
      "id": "np-q51",
      "prompt": "What does np.diag(arr) do when arr is a 1D array?",
      "options": [
        "Creates a 2D matrix with arr on the main diagonal",
        "Extracts the diagonal of a matrix",
        "Flattens the array",
        "Returns the trace"
      ],
      "answerIndex": 0,
      "explanation": "np.diag is bidirectional: pass a 1D array → get a diagonal matrix; pass a 2D matrix → extract its diagonal as 1D. Context determines behaviour."
    },
    {
      "id": "np-q52",
      "prompt": "What is the output of np.dot(np.array([1,0,0]), np.array([0,1,0]))?",
      "options": [
        "0",
        "1",
        "[0,0,0]",
        "Error"
      ],
      "answerIndex": 0,
      "explanation": "Orthogonal unit vectors have dot product 0. This is the core concept behind orthogonality, which underpins PCA and QR decomposition."
    },
    {
      "id": "np-q53",
      "prompt": "What does np.abs(arr) compute?",
      "options": [
        "Element-wise absolute value",
        "The norm of the array",
        "The sum of positives",
        "Clips negatives to 0"
      ],
      "answerIndex": 0,
      "explanation": "np.abs applies abs() element-by-element. For complex arrays it returns the magnitude. Used in L1 norm: np.sum(np.abs(w)) for regularisation."
    },
    {
      "id": "np-q54",
      "prompt": "What does np.stack([a, b], axis=0) differ from np.concatenate([a, b], axis=0)?",
      "options": [
        "stack creates a new axis; concatenate joins along an existing axis",
        "They are identical",
        "concatenate is faster",
        "stack requires same dtype"
      ],
      "answerIndex": 0,
      "explanation": "stack([a,b]) of two (3,) arrays → (2,3). concatenate([a,b]) → (6,). Stack adds a new dimension; concatenate extends an existing one."
    },
    {
      "id": "np-q55",
      "prompt": "What does np.sort(arr, axis=0) do for a 2D array?",
      "options": [
        "Sorts each column independently",
        "Sorts each row independently",
        "Sorts the flattened array then reshapes",
        "Sorts by the first column"
      ],
      "answerIndex": 0,
      "explanation": "axis=0 sorts along rows (within each column independently). axis=1 sorts along columns (within each row). The array shape does not change."
    },
    {
      "id": "np-q56",
      "prompt": "What does arr.strides tell you?",
      "options": [
        "The number of bytes to step in each dimension to move to the next element",
        "The array shape",
        "The memory address",
        "The dtype size"
      ],
      "answerIndex": 0,
      "explanation": "Strides describe the memory layout. For a C-contiguous (3,4) float32 array, strides=(16,4): moving one row costs 16 bytes (4 elements × 4 bytes), one column costs 4 bytes."
    },
    {
      "id": "np-q57",
      "prompt": "Which NumPy function applies a Python function element-wise?",
      "options": [
        "np.vectorize(fn)",
        "np.apply(fn)",
        "np.map(fn)",
        "np.broadcast(fn)"
      ],
      "answerIndex": 0,
      "explanation": "np.vectorize wraps a regular Python function so it accepts arrays. Note: it is NOT faster than a for-loop — it's a convenience, not an optimisation."
    },
    {
      "id": "np-q58",
      "prompt": "What is a structured array in NumPy?",
      "options": [
        "An array with named fields of different dtypes, like a table",
        "An array with a sorted structure",
        "An ndarray with custom strides",
        "An array of strings"
      ],
      "answerIndex": 0,
      "explanation": "Structured arrays work like lightweight tables: np.dtype([('name','U10'),('age','i4')]). Each element is a record. Useful before pandas is available."
    },
    {
      "id": "np-q59",
      "prompt": "What does np.linalg.matrix_rank(A) return?",
      "options": [
        "The number of linearly independent rows/columns",
        "The number of rows",
        "The trace",
        "The determinant"
      ],
      "answerIndex": 0,
      "explanation": "Rank tells how much information a matrix actually carries. A rank-deficient matrix cannot be inverted. Checked before calling lstsq or inv."
    },
    {
      "id": "np-q60",
      "prompt": "What is the result of np.array([1,2,3]) * np.array([4,5,6])?",
      "options": [
        "[4, 10, 18] — element-wise product",
        "[32] — dot product",
        "[[4,5,6],[8,10,12],[12,15,18]] — outer product",
        "Error"
      ],
      "answerIndex": 0,
      "explanation": "* between arrays of the same shape is the Hadamard (element-wise) product: [1×4, 2×5, 3×6]. Use np.dot or @ for inner/matrix product."
    },
    {
      "id": "np-q61",
      "prompt": "What does np.diff(arr) compute?",
      "options": [
        "First-order differences: arr[i+1] - arr[i]",
        "Cumulative differences",
        "Absolute differences",
        "Numerical gradient"
      ],
      "answerIndex": 0,
      "explanation": "diff([1,4,9,16]) → [3,5,7]. Result has one fewer element. Used to compute velocity from position data, or detect changes in a time series."
    },
    {
      "id": "np-q62",
      "prompt": "What does np.pad(arr, pad_width=1, mode='constant') do?",
      "options": [
        "Adds a border of zeros around the array",
        "Removes the border",
        "Pads with random values",
        "Resizes to a smaller shape"
      ],
      "answerIndex": 0,
      "explanation": "pad is used in CNN implementations to control output size. mode='constant' (default value 0) adds zero-padding; mode='reflect' mirrors the edge values."
    },
    {
      "id": "np-q63",
      "prompt": "What does np.apply_along_axis(fn, axis=0, arr) do?",
      "options": [
        "Applies fn to 1D slices along the given axis",
        "Applies fn element-wise",
        "Maps fn over the array in parallel",
        "Vectorizes fn"
      ],
      "answerIndex": 0,
      "explanation": "For axis=0 on a (3,4) array, fn is called 4 times — once per column (a length-3 slice each time). Slower than vectorized ops but useful for non-vectorizable functions."
    },
    {
      "id": "np-q64",
      "prompt": "What does np.meshgrid(x, y) produce?",
      "options": [
        "Two 2D arrays representing coordinate grids for x and y",
        "A 3D array",
        "The dot product of x and y",
        "A single (m×n) distance matrix"
      ],
      "answerIndex": 0,
      "explanation": "meshgrid broadcasts x and y to produce grids. Essential for plotting decision boundaries: you evaluate a model at every (x,y) point on the grid."
    },
    {
      "id": "np-q65",
      "prompt": "What does np.logspace(0, 2, 5) produce?",
      "options": [
        "5 values evenly spaced on a log scale from 10⁰=1 to 10²=100",
        "[0,0.5,1,1.5,2]",
        "[1,2,3,4,5] in log space",
        "Logarithm of [0,2,5]"
      ],
      "answerIndex": 0,
      "explanation": "logspace(start, stop, num) gives 10^linspace(start, stop, num). Result: [1, 3.16, 10, 31.6, 100]. Used to search learning rate hyperparameters."
    },
    {
      "id": "np-q66",
      "prompt": "What is the default order of np.ravel(arr)?",
      "options": [
        "C order (row-major, last index changes fastest)",
        "Fortran order (column-major)",
        "Random order",
        "Sorted order"
      ],
      "answerIndex": 0,
      "explanation": "C order reads elements left-to-right, top-to-bottom — natural reading order. Fortran order reads column by column. Most NumPy arrays are C-contiguous."
    },
    {
      "id": "np-q67",
      "prompt": "What does np.linalg.det(A) compute?",
      "options": [
        "The determinant of matrix A",
        "The trace",
        "The rank",
        "The condition number"
      ],
      "answerIndex": 0,
      "explanation": "The determinant measures how much a transformation scales volume. det=0 means singular (non-invertible). det(I)=1. Used to check matrix invertibility."
    },
    {
      "id": "np-q68",
      "prompt": "What does np.argsort(arr) return?",
      "options": [
        "Indices that would sort the array",
        "The sorted array",
        "The rank of each element",
        "The inverse permutation"
      ],
      "answerIndex": 0,
      "explanation": "argsort([30,10,20]) → [1,2,0]: index 1 (value 10) first, then 2 (20), then 0 (30). Use arr[np.argsort(arr)] to sort. Used in top-k retrieval."
    },
    {
      "id": "np-q69",
      "prompt": "What does the memory layout 'C-contiguous' mean?",
      "options": [
        "Rows are stored in consecutive memory (row-major)",
        "Columns are stored consecutively",
        "Data is compressed",
        "Data is stored in a linked list"
      ],
      "answerIndex": 0,
      "explanation": "C-contiguous (row-major) stores row 0 fully before row 1. Fortran-contiguous is column-major. Contiguity affects the speed of slicing operations."
    },
    {
      "id": "np-q70",
      "prompt": "What does np.searchsorted(sorted_arr, value) return?",
      "options": [
        "The index where value should be inserted to keep the array sorted",
        "The position of value in the array",
        "The number of values less than value",
        "The nearest neighbour"
      ],
      "answerIndex": 0,
      "explanation": "searchsorted uses binary search (O(log n)). Returns the insertion point. Useful for bucketing continuous values into bins and implementing lookup tables."
    },
    {
      "id": "np-q71",
      "prompt": "What does the ufunc np.exp(arr) do?",
      "options": [
        "Computes e^x element-wise",
        "Computes log(x) element-wise",
        "Computes x^2 element-wise",
        "Computes the exponential of the sum"
      ],
      "answerIndex": 0,
      "explanation": "Universal functions (ufuncs) operate element-wise on arrays with no Python loop overhead. np.exp is used in softmax, sigmoid, and many activation functions."
    },
    {
      "id": "np-q72",
      "prompt": "What does np.triu(A) return?",
      "options": [
        "Upper triangular matrix (elements below the diagonal set to 0)",
        "Lower triangular matrix",
        "The diagonal only",
        "The symmetric part"
      ],
      "answerIndex": 0,
      "explanation": "triu (upper triangular) zeroes out elements below the diagonal. np.tril does the opposite. Used to implement causal masking in transformers."
    },
    {
      "id": "np-q73",
      "prompt": "What does np.random.shuffle(arr) do?",
      "options": [
        "Shuffles arr in-place and returns None",
        "Returns a shuffled copy",
        "Shuffles along axis=1",
        "Returns the permutation used"
      ],
      "answerIndex": 0,
      "explanation": "shuffle modifies the array in-place and returns None. Use np.random.permutation(arr) to get a shuffled copy without modifying the original."
    },
    {
      "id": "np-q74",
      "prompt": "What is the shape of np.ones((2,3,4))?",
      "options": [
        "(2, 3, 4) — a 3D tensor of ones",
        "(24,)",
        "(2, 12)",
        "(6, 4)"
      ],
      "answerIndex": 0,
      "explanation": "np.ones accepts any shape tuple and fills with 1.0. A (2,3,4) array has 2 matrices each of size 3×4 — total 24 elements. Common for initialising bias terms."
    },
    {
      "id": "np-q75",
      "prompt": "What does np.testing.assert_array_almost_equal(a, b) do?",
      "options": [
        "Raises AssertionError if arrays differ beyond floating-point tolerance",
        "Checks for exact equality",
        "Checks only the shapes",
        "Prints differences"
      ],
      "answerIndex": 0,
      "explanation": "Due to float32 rounding, exact equality checks often fail. assert_array_almost_equal (default 6 decimal places) is the correct way to unit-test numerical functions."
    }
  ],
  "practice": [
    {
      "id": "np-p1",
      "title": "Normalize a Vector",
      "prompt": "Create an array [10, 20, 30], divide by its maximum, and print the result.",
      "starterCode": "import numpy as np\nx = np.array([10, 20, 30])\nprint(x / x.max())",
      "expectedOutput": "[0.33333333 0.66666667 1.        ]",
      "hint": "x.max() returns the largest value. Division broadcasts automatically."
    },
    {
      "id": "np-p2",
      "title": "Column Means",
      "prompt": "Print the mean of each column in a 2x3 array.",
      "starterCode": "import numpy as np\nx = np.array([[1, 2, 3], [4, 5, 6]])\nprint(x.mean(axis=0))",
      "expectedOutput": "[2.5 3.5 4.5]",
      "hint": "axis=0 collapses rows — each column's mean survives."
    },
    {
      "id": "np-p3",
      "title": "Simple Linear Model",
      "prompt": "Use X @ W + b to produce two predictions.",
      "starterCode": "import numpy as np\nX = np.array([[1, 2], [3, 4]])\nW = np.array([0.5, -1.0])\nb = 2\nprint(X @ W + b)",
      "expectedOutput": "[0.5 -0.5]",
      "hint": "@ computes the dot product row by row; b broadcasts to each result."
    },
    {
      "id": "np-p4",
      "title": "Boolean Filter",
      "prompt": "Filter an array to keep only values greater than 5.",
      "starterCode": "import numpy as np\nx = np.array([2, 7, 3, 9, 1, 6])\nprint(x[x > 5])",
      "expectedOutput": "[7 9 6]",
      "hint": "x > 5 creates a boolean mask; use it as the index."
    },
    {
      "id": "np-p5",
      "title": "Reproducible Random",
      "prompt": "Generate 3 random numbers with seed 0 and print them rounded to 2 decimal places.",
      "starterCode": "import numpy as np\nnp.random.seed(0)\ndata = np.random.randn(3)\nprint(np.round(data, 2))",
      "expectedOutput": "[1.76 0.4  0.98]",
      "hint": "seed(0) ensures the same numbers every run."
    },
    {
      "id": "np-p6",
      "title": "Reshape Array",
      "prompt": "Reshape a 1D array of 6 elements into a 2x3 matrix.",
      "starterCode": "import numpy as np\nx = np.arange(6)\nprint(x.reshape(2, 3))",
      "expectedOutput": "[[0 1 2]\n [3 4 5]]",
      "hint": "6 elements can reshape to (2, 3) since 2×3 = 6."
    },
    {
      "id": "np-p7",
      "title": "Z-Score Normalization",
      "prompt": "Standardize an array to zero mean and unit variance (z-score).",
      "starterCode": "import numpy as np\nx = np.array([2.0, 4.0, 4.0, 4.0, 5.0, 5.0, 7.0, 9.0])\nz = (x - x.mean()) / x.std()\nprint(np.round(z, 2))",
      "expectedOutput": "[-1.5  -0.5  -0.5  -0.5   0.    0.    1.    2.  ]",
      "hint": "z = (x - mean) / std. Each element becomes 'how many standard deviations from the mean'."
    },
    {
      "id": "np-p8",
      "title": "Matrix Transpose Product",
      "prompt": "Compute XᵀX (the Gram matrix) for a 3x2 matrix X.",
      "starterCode": "import numpy as np\nX = np.array([[1, 2], [3, 4], [5, 6]])\nprint(X.T @ X)",
      "expectedOutput": "[[35 44]\n [44 56]]",
      "hint": "X.T has shape (2,3); X.T @ X → (2,2). XᵀX is always square and symmetric."
    },
    {
      "id": "np-p9",
      "title": "ReLU Activation",
      "prompt": "Implement the ReLU function: max(0, x) for each element.",
      "starterCode": "import numpy as np\nx = np.array([-3.0, -1.0, 0.0, 2.0, 5.0])\nrelu = np.maximum(x, 0)\nprint(relu)",
      "expectedOutput": "[0. 0. 0. 2. 5.]",
      "hint": "np.maximum(x, 0) compares element-wise with 0 and returns the larger value."
    },
    {
      "id": "np-p10",
      "title": "Softmax Function",
      "prompt": "Implement softmax: e^x / sum(e^x), with numerical stability using x - max(x).",
      "starterCode": "import numpy as np\ndef softmax(x):\n    e = np.exp(x - np.max(x))\n    return e / e.sum()\n\nprint(np.round(softmax(np.array([1.0, 2.0, 3.0])), 4))",
      "expectedOutput": "[0.0900 0.2447 0.6652]",
      "hint": "Subtracting max(x) prevents overflow. The result is unchanged mathematically."
    },
    {
      "id": "np-p11",
      "title": "Euclidean Distance",
      "prompt": "Compute the Euclidean distance between two vectors.",
      "starterCode": "import numpy as np\na = np.array([1.0, 2.0, 3.0])\nb = np.array([4.0, 6.0, 3.0])\ndist = np.linalg.norm(a - b)\nprint(round(dist, 4))",
      "expectedOutput": "5.0",
      "hint": "‖a−b‖ = √((1-4)²+(2-6)²+(3-3)²) = √(9+16+0) = 5."
    },
    {
      "id": "np-p12",
      "title": "One-Hot Encoding",
      "prompt": "Convert class labels [0, 2, 1, 0] into a one-hot matrix with 3 classes.",
      "starterCode": "import numpy as np\nlabels = np.array([0, 2, 1, 0])\nn_classes = 3\none_hot = np.eye(n_classes)[labels]\nprint(one_hot.astype(int))",
      "expectedOutput": "[[1 0 0]\n [0 0 1]\n [0 1 0]\n [1 0 0]]",
      "hint": "np.eye(n)[labels] fancy-indexes the identity matrix. Row i of I is the one-hot for class i."
    },
    {
      "id": "np-p13",
      "title": "Cumulative Sum",
      "prompt": "Given daily profits [100, -50, 200, -80, 150], compute the running total.",
      "starterCode": "import numpy as np\nprofits = np.array([100, -50, 200, -80, 150])\nprint(np.cumsum(profits))",
      "expectedOutput": "[100  50 250 170 320]",
      "hint": "cumsum keeps a running total — each element is the sum of all previous elements including itself."
    },
    {
      "id": "np-p14",
      "title": "Covariance Matrix",
      "prompt": "Compute the 2×2 covariance matrix of two features stored as rows.",
      "starterCode": "import numpy as np\ndata = np.array([[2, 4, 6, 8], [1, 3, 2, 5]])\nprint(np.cov(data))",
      "expectedOutput": "[[6.66666667 3.        ]\n [3.         2.91666667]]",
      "hint": "np.cov treats rows as variables. The off-diagonal is the covariance between the two features."
    },
    {
      "id": "np-p15",
      "title": "Broadcasting Add",
      "prompt": "Add a bias vector [10, 20, 30] to every row of a (4,3) matrix without a loop.",
      "starterCode": "import numpy as np\nX = np.ones((4, 3))\nbias = np.array([10, 20, 30])\nprint(X + bias)",
      "expectedOutput": "[[11. 21. 31.]\n [11. 21. 31.]\n [11. 21. 31.]\n [11. 21. 31.]]",
      "hint": "bias has shape (3,) which aligns with the last dimension (3) of X. NumPy stretches it across all 4 rows."
    },
    {
      "id": "np-p16",
      "title": "Boolean Mask Assignment",
      "prompt": "Set all negative values in an array to 0 using boolean indexing.",
      "starterCode": "import numpy as np\nx = np.array([3, -1, 4, -1, 5, -9, 2, 6])\nx[x < 0] = 0\nprint(x)",
      "expectedOutput": "[3 0 4 0 5 0 2 6]",
      "hint": "Boolean indexing on the left side of = assigns values to matched positions."
    },
    {
      "id": "np-p17",
      "title": "SVD Compression",
      "prompt": "Use SVD to approximate a 4×4 matrix using only the top-1 singular value.",
      "starterCode": "import numpy as np\nnp.random.seed(0)\nA = np.random.randint(1, 10, (4, 4)).astype(float)\nU, S, Vt = np.linalg.svd(A)\nA_approx = S[0] * np.outer(U[:, 0], Vt[0, :])\nprint(np.round(A_approx, 1))",
      "expectedOutput": "[[ 7.5  6.1  8.8  8. ]\n [ 5.5  4.5  6.5  5.9]\n [ 8.2  6.7  9.7  8.8]\n [ 6.9  5.6  8.1  7.4]]",
      "hint": "Rank-1 approximation = σ₁ × u₁ × v₁ᵀ. The outer product gives a (4,4) matrix from two length-4 vectors."
    },
    {
      "id": "np-p18",
      "title": "Top-K Indices",
      "prompt": "Find the indices of the 3 largest values in an array.",
      "starterCode": "import numpy as np\nscores = np.array([0.1, 0.9, 0.4, 0.7, 0.3, 0.8])\ntop3 = np.argsort(scores)[-3:][::-1]\nprint(top3)",
      "expectedOutput": "[1 5 3]",
      "hint": "argsort gives ascending order; take last 3 (largest), then reverse for descending."
    },
    {
      "id": "np-p19",
      "title": "Decision Boundary Grid",
      "prompt": "Use meshgrid to create a 3×3 coordinate grid from x=[0,1,2] and y=[0,1,2] and print the combined points.",
      "starterCode": "import numpy as np\nx = np.array([0, 1, 2])\ny = np.array([0, 1, 2])\nxx, yy = np.meshgrid(x, y)\npoints = np.column_stack([xx.ravel(), yy.ravel()])\nprint(points)",
      "expectedOutput": "[[0 0]\n [1 0]\n [2 0]\n [0 1]\n [1 1]\n [2 1]\n [0 2]\n [1 2]\n [2 2]]",
      "hint": "meshgrid + ravel gives all (x,y) pairs. column_stack assembles them into an (n,2) array for model inference."
    },
    {
      "id": "np-p20",
      "title": "Least Squares Regression",
      "prompt": "Fit a line y=mx+c to points using np.linalg.lstsq and print the coefficients.",
      "starterCode": "import numpy as np\nx = np.array([1, 2, 3, 4, 5], dtype=float)\ny = np.array([2, 4, 5, 4, 5], dtype=float)\nA = np.column_stack([x, np.ones_like(x)])\ncoeffs, _, _, _ = np.linalg.lstsq(A, y, rcond=None)\nprint(np.round(coeffs, 2))",
      "expectedOutput": "[0.7  2.1]",
      "hint": "A = [x | 1] builds the design matrix. lstsq returns [m, c] minimising squared error."
    },
    {
      "id": "np-p21",
      "title": "Pairwise Distances",
      "prompt": "Compute the pairwise Euclidean distance matrix between 3 points.",
      "starterCode": "import numpy as np\npoints = np.array([[0,0],[3,4],[6,0]], dtype=float)\ndiff = points[:, np.newaxis, :] - points[np.newaxis, :, :]\ndist = np.sqrt((diff**2).sum(axis=-1))\nprint(dist)",
      "expectedOutput": "[[ 0.  5.  6.]\n [ 5.  0.  5.]\n [ 6.  5.  0.]]",
      "hint": "Broadcasting (3,1,2)-(1,3,2)=(3,3,2). Sum squared diffs over last axis and take sqrt."
    },
    {
      "id": "np-p22",
      "title": "Sliding Window Mean",
      "prompt": "Compute a 3-element sliding window average (moving average) for a 1D signal.",
      "starterCode": "import numpy as np\nsignal = np.array([1, 2, 3, 4, 5, 6, 7], dtype=float)\nwindow = 3\nma = np.convolve(signal, np.ones(window)/window, mode='valid')\nprint(np.round(ma, 4))",
      "expectedOutput": "[2. 3. 4. 5. 6.]",
      "hint": "np.convolve with a uniform kernel of size k divides by k gives the moving average. 'valid' trims edges."
    },
    {
      "id": "np-p23",
      "title": "Clip and Normalize",
      "prompt": "Clip values to [0, 255] and normalize to [0, 1] — a common image preprocessing step.",
      "starterCode": "import numpy as np\nimg = np.array([-10, 0, 128, 200, 300], dtype=float)\nimg = np.clip(img, 0, 255) / 255.0\nprint(np.round(img, 4))",
      "expectedOutput": "[0.     0.     0.502  0.7843 1.    ]",
      "hint": "Clip first to handle out-of-range values, then divide by 255 to scale to [0,1]."
    },
    {
      "id": "np-p24",
      "title": "Eigendecomposition",
      "prompt": "Find the eigenvalues of a symmetric 2×2 matrix and print them sorted.",
      "starterCode": "import numpy as np\nA = np.array([[4, 2], [2, 3]], dtype=float)\nvals, _ = np.linalg.eig(A)\nprint(np.sort(vals))",
      "expectedOutput": "[1.56155281 5.43844719]",
      "hint": "np.linalg.eig returns unsorted eigenvalues. Use np.sort for consistent output. For symmetric matrices np.linalg.eigh is preferred and always returns real values."
    },
    {
      "id": "np-p25",
      "title": "Batch Dot Products",
      "prompt": "Compute the dot product of each of 4 query vectors with each of 3 key vectors (scaled dot-product attention scores).",
      "starterCode": "import numpy as np\nnp.random.seed(1)\nQ = np.random.randn(4, 8)  # 4 queries, dim=8\nK = np.random.randn(3, 8)  # 3 keys, dim=8\nscores = Q @ K.T / np.sqrt(8)\nprint(scores.shape)\nprint(np.round(scores, 2))",
      "expectedOutput": "(4, 3)\n[[-0.28  0.17  0.85]\n [-0.68  0.68  0.04]\n [ 0.35 -0.62  0.23]\n [-0.29 -0.23  0.11]]",
      "hint": "Q @ Kᵀ gives a (4,3) score matrix — each query's similarity to each key. Divide by √d to stabilise gradients."
    }
  ],
};
