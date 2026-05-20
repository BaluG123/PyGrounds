import { Grid3x3 } from 'lucide-react-native';
import type { CourseModule } from '../types/course';

export const linearAlgebraCourse: CourseModule = {
  id: 'linear-algebra',
  title: 'Linear Algebra',
  subtitle: 'Vectors, matrices, eigenvalues, SVD',
  color: '#2D8CFF',
  accent: '#E0F0FF',
  Icon: Grid3x3,
  history: {
    founder: 'Cayley, Sylvester, and many others',
    released: '1800s–present',
    summary:
      'Linear algebra is the language of neural networks. Every forward pass is a matrix multiplication, every embedding is a vector, and PCA uses eigendecomposition.',
  },
  concepts: [
    'Vectors: direction, magnitude, dot product',
    'Matrix multiplication and transpose',
    'Identity and inverse matrices',
    'Determinants and their meaning',
    'Eigenvalues and eigenvectors',
    'Singular Value Decomposition (SVD)',
    'PCA for dimensionality reduction',
    'Norms: L1, L2, and their role in regularization',
  ],
  lessons: [
    {
      id: 'la-vectors',
      title: 'Vectors and Dot Products',
      duration: '20 min',
      objective: 'Understand vectors as directions in space and the dot product as a similarity measure.',
      blocks: [
        { type: 'heading', text: 'Vectors: Arrows in Space' },
        {
          type: 'paragraph',
          text: 'In physics, a vector is an arrow with a length and direction. In computer science, a vector is just a list of numbers. In AI, these numbers represent features (e.g. [age, height, weight]) or abstract concepts (like word embeddings).',
        },
        {
          type: 'analogy',
          text: 'Think of a vector like GPS coordinates. A 2D vector [3, 4] means "walk 3 steps East, then 4 steps North". The hypotenuse of your path is the vector\'s magnitude.',
        },
        {
          type: 'formula',
          expression: '\\text{Magnitude } ||v|| = \\sqrt{v_1^2 + v_2^2 + \\dots + v_n^2}',
          note: 'Also known as the L2 Norm or Euclidean distance.',
        },
        { type: 'divider' },
        { type: 'heading', text: 'The Dot Product' },
        {
          type: 'paragraph',
          text: 'The dot product is the single most important operation in AI. It multiplies matching components of two vectors and adds them up. Geometrically, it measures how much two vectors point in the same direction (similarity).',
        },
        {
          type: 'formula',
          expression: '\\vec{a} \\cdot \\vec{b} = \\sum_{i=1}^n a_i b_i = ||a|| ||b|| \\cos(\\theta)',
          note: 'If the dot product is 0, the vectors are exactly perpendicular (orthogonal).',
        },
        {
          type: 'playground',
          code: 'import numpy as np\n\na = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\n\nprint(f"Dot product: {np.dot(a, b)}")\nprint(f"Magnitude of a: {np.linalg.norm(a):.3f}")',
          expectedOutput: 'Dot product: 32\nMagnitude of a: 3.742',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Cosine Similarity in NLP',
          body: 'If you divide the dot product by both magnitudes, you get Cosine Similarity (which ranges from -1 to 1). This is exactly how AI determines if two words or sentences have similar meanings!',
        },
      ],
    },
    {
      id: 'la-matrices',
      title: 'Matrix Operations',
      duration: '24 min',
      objective: 'Multiply matrices, understand shapes, and see why neural networks are matrix math.',
      blocks: [
        { type: 'heading', text: 'Matrices: Grids of Numbers' },
        {
          type: 'paragraph',
          text: 'A matrix is simply a 2D collection of vectors. When we pass data through a neural network, we are taking an input matrix (our data) and multiplying it by a weight matrix (what the model learned).',
        },
        {
          type: 'diagram',
          title: 'Matrix Multiplication Dimensions',
          boxes: [
            { id: 'm1', x: 20, y: 30, width: 70, height: 40, label: '3 × 2', color: '#2D8CFF' },
            { id: 'm2', x: 120, y: 30, width: 70, height: 40, label: '2 × 4', color: '#1D7A57' },
            { id: 'm3', x: 230, y: 30, width: 70, height: 40, label: '3 × 4', color: '#E44D6E' },
          ],
          arrows: [
            { from: 'm1', to: 'm2', label: 'Match' },
            { from: 'm2', to: 'm3', label: 'Output' },
          ],
          height: 120,
        },
        {
          type: 'formula',
          expression: '(M \\times K) \\cdot (K \\times N) \\longrightarrow (M \\times N)',
          note: 'Inner dimensions (K) must exactly match, or the code will crash.',
        },
        { type: 'divider' },
        { type: 'heading', text: 'Matrix Multiplication in Action' },
        {
          type: 'playground',
          code: 'import numpy as np\n\n# 2x2 Matrix\nA = np.array([[1, 2], \n              [3, 4]])\n\n# 2x2 Matrix\nB = np.array([[5, 6], \n              [7, 8]])\n\n# @ is the Python operator for matrix multiplication\nprint("A @ B =")\nprint(A @ B)\n\nprint("\\nTranspose of A (flips rows/cols) =")\nprint(A.T)',
          expectedOutput: 'A @ B =\n[[19 22]\n [43 50]]\n\nTranspose of A (flips rows/cols) =\n[[1 3]\n [2 4]]',
        },
        {
          type: 'callout',
          variant: 'remember',
          title: 'The Identity Matrix',
          body: 'The Identity matrix (I) is a square matrix with 1s on the diagonal and 0s everywhere else. It acts like the number "1" in normal math. Multiplying any matrix by I leaves it completely unchanged (A @ I = A).',
        },
      ],
    },
    {
      id: 'la-eigen',
      title: 'Eigenvalues and Eigenvectors',
      duration: '26 min',
      objective: 'Find the natural axes of a transformation and understand PCA.',
      blocks: [
        { type: 'heading', text: 'The Core of a Matrix' },
        {
          type: 'paragraph',
          text: 'When you multiply a vector by a matrix, the vector usually changes direction. However, for a given matrix, there are a few special vectors that do NOT change direction — they only stretch or shrink. These are called Eigenvectors.',
        },
        {
          type: 'formula',
          expression: 'A \\vec{v} = \\lambda \\vec{v}',
          note: 'A is the matrix, v is the eigenvector, λ (lambda) is the eigenvalue (stretch factor).',
        },
        {
          type: 'analogy',
          text: 'Imagine stretching a piece of rubber sheet in one direction. The line drawn exactly along the direction of the stretch doesn\'t rotate, it just gets longer. That line is an Eigenvector, and how much it stretched is the Eigenvalue.',
        },
        {
          type: 'playground',
          code: 'import numpy as np\nA = np.array([[4, 2], [1, 3]])\neigenvalues, eigenvectors = np.linalg.eig(A)\n\nprint(f"Eigenvalues (stretch factors): {eigenvalues}")\nprint(f"Eigenvectors (directions):\\n{eigenvectors}")',
          expectedOutput: 'Eigenvalues (stretch factors): [5. 2.]\nEigenvectors (directions):\n[[ 0.89442719 -0.70710678]\n [ 0.4472136   0.70710678]]',
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Principal Component Analysis (PCA)',
          body: 'PCA uses eigenvectors to reduce the dimensions of massive datasets. By finding the eigenvectors with the largest eigenvalues, we find the "Principal Components" containing the most important variance in the data.',
        },
      ],
    },
    {
      id: 'la-svd',
      title: 'Singular Value Decomposition',
      duration: '22 min',
      objective: 'Decompose any matrix and understand how SVD powers recommendations and compression.',
      blocks: [
        { type: 'heading', text: 'The Ultimate Matrix Factorization' },
        {
          type: 'paragraph',
          text: 'Eigendecomposition only works on square matrices. SVD (Singular Value Decomposition) is much more powerful because it works on ANY matrix of any shape. It breaks a matrix down into three simpler matrices.',
        },
        {
          type: 'formula',
          expression: 'A = U \\cdot \\Sigma \\cdot V^T',
          note: 'U and V are rotations, Sigma contains the singular values (importance).',
        },
        {
          type: 'table',
          headers: ['Component', 'Meaning', 'Geometery'],
          rows: [
            ['U', 'Left Singular Vectors', 'First Rotation'],
            ['Σ (Sigma)', 'Singular Values', 'Stretching / Scaling'],
            ['V^T', 'Right Singular Vectors', 'Second Rotation'],
          ],
        },
        {
          type: 'playground',
          code: 'import numpy as np\n\nA = np.array([[1, 2], \n              [3, 4], \n              [5, 6]])\n\n# Perform SVD\nU, S, Vt = np.linalg.svd(A, full_matrices=False)\nprint(f"Singular values (importance): {np.round(S, 2)}")\n\n# Reconstruct original matrix\nreconstructed = U @ np.diag(S) @ Vt\nprint(f"\\nReconstructed Matrix:\\n{np.round(reconstructed, 1)}")',
          expectedOutput: 'Singular values (importance): [9.53 0.51]\n\nReconstructed Matrix:\n[[1. 2.]\n [3. 4.]\n [5. 6.]]',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Data Compression',
          body: 'In SVD, if you throw away the smallest singular values in Σ and their corresponding vectors, you compress the data heavily while retaining almost all the important information. This is exactly how Netflix built its first recommendation engine!',
        },
      ],
    },
  ],
  quiz: [
    { id: 'la-q1', prompt: 'What does the dot product measure?', options: ['Alignment / similarity between vectors', 'Distance between vectors', 'The angle in degrees', 'The number of elements'], answerIndex: 0, explanation: 'The dot product measures how much two vectors point in the same direction.' },
    { id: 'la-q2', prompt: 'If A is (3×2) and B is (2×4), what is the shape of A @ B?', options: ['(3, 4)', '(2, 2)', '(3, 2)', 'Cannot multiply'], answerIndex: 0, explanation: 'Inner dims (2) match. Result shape is (outer dims) = (3, 4).' },
    { id: 'la-q3', prompt: 'What is the transpose of a (3×2) matrix?', options: ['(2, 3)', '(3, 2)', '(3, 3)', '(2, 2)'], answerIndex: 0, explanation: 'Transpose flips rows and columns: (m,n) → (n,m).' },
    { id: 'la-q4', prompt: 'What does Av = λv define?', options: ['Eigenvalue equation', 'Matrix inverse', 'Dot product', 'Determinant'], answerIndex: 0, explanation: 'This is the eigenvalue equation where v is the eigenvector and λ is the eigenvalue.' },
    { id: 'la-q5', prompt: 'What does PCA use eigenvectors for?', options: ['Finding directions of maximum variance', 'Encrypting data', 'Sorting arrays', 'Counting rows'], answerIndex: 0, explanation: 'PCA projects data onto eigenvectors of the covariance matrix with the largest eigenvalues.' },
    { id: 'la-q6', prompt: 'What does SVD stand for?', options: ['Singular Value Decomposition', 'Standard Vector Derivation', 'Simple Variable Distribution', 'Structured Value Detection'], answerIndex: 0, explanation: 'SVD decomposes any matrix into U × Σ × Vᵀ.' },
    { id: 'la-q7', prompt: 'A singular matrix has determinant equal to:', options: ['0', '1', '-1', 'Infinity'], answerIndex: 0, explanation: 'Determinant = 0 means the matrix has no inverse (is singular).' },
    { id: 'la-q8', prompt: 'What is the L2 norm of vector [3, 4]?', options: ['5', '7', '12', '25'], answerIndex: 0, explanation: '||[3,4]|| = √(9+16) = √25 = 5.' },
    { id: 'la-q9', prompt: 'Orthogonal vectors have a dot product of:', options: ['0', '1', '-1', 'Infinity'], answerIndex: 0, explanation: 'Perpendicular (orthogonal) vectors have zero dot product.' },
    { id: 'la-q10', prompt: 'In a neural network layer, Y = X @ W + b. What is W?', options: ['Weight matrix', 'Input data', 'Output', 'Bias vector'], answerIndex: 0, explanation: 'W contains the learned weights that transform the input X.' },
  ],
  practice: [
    { id: 'la-p1', title: 'Dot Product', prompt: 'Compute the dot product of [1,2,3] and [4,5,6].', starterCode: 'import numpy as np\na = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\nprint(np.dot(a, b))', expectedOutput: '32', hint: '1×4 + 2×5 + 3×6 = 4 + 10 + 18 = 32.' },
    { id: 'la-p2', title: 'Matrix Multiply', prompt: 'Multiply two 2×2 matrices.', starterCode: 'import numpy as np\nA = np.array([[1, 2], [3, 4]])\nB = np.array([[5, 6], [7, 8]])\nprint(A @ B)', expectedOutput: '[[19 22]\n [43 50]]', hint: 'Use the @ operator for matrix multiplication.' },
    { id: 'la-p3', title: 'Vector Norm', prompt: 'Compute the L2 norm of [3, 4].', starterCode: 'import numpy as np\nv = np.array([3, 4])\nprint(np.linalg.norm(v))', expectedOutput: '5.0', hint: 'L2 norm = √(3² + 4²) = √25 = 5.' },
    { id: 'la-p4', title: 'Eigenvalues', prompt: 'Find eigenvalues of a 2×2 matrix.', starterCode: 'import numpy as np\nA = np.array([[4, 2], [1, 3]])\nvals, vecs = np.linalg.eig(A)\nprint(f"Eigenvalues: {vals}")', expectedOutput: 'Eigenvalues: [5. 2.]', hint: 'np.linalg.eig returns eigenvalues and eigenvectors.' },
    { id: 'la-p5', title: 'SVD Decomposition', prompt: 'Decompose a matrix with SVD and print singular values.', starterCode: 'import numpy as np\nA = np.array([[1, 2], [3, 4], [5, 6]])\nU, S, Vt = np.linalg.svd(A, full_matrices=False)\nprint(f"Singular values: {np.round(S, 2)}")', expectedOutput: 'Singular values: [9.53 0.51]', hint: 'np.linalg.svd returns U, S, Vt.' },
  ],
};
