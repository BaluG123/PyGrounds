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
        { type: 'paragraph', text: 'A vector is an ordered list of numbers. In ML, feature vectors represent data points, weight vectors represent learned parameters, and embeddings represent words or images as vectors.' },
        { type: 'formula', expression: 'a · b = Σ aᵢbᵢ = |a||b|cos(θ)', note: 'The dot product measures how aligned two vectors are.' },
        { type: 'playground', code: 'import numpy as np\na = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\nprint(f"Dot product: {np.dot(a, b)}")\nprint(f"Magnitude of a: {np.linalg.norm(a):.3f}")', expectedOutput: 'Dot product: 32\nMagnitude of a: 3.742' },
        { type: 'bullets', items: [
          'Magnitude (L2 norm): ||v|| = √(Σvᵢ²).',
          'Unit vector: v / ||v|| — direction without magnitude.',
          'Cosine similarity: dot product of unit vectors — used in NLP.',
          'Orthogonal vectors have dot product = 0 (perpendicular).',
        ] },
      ],
    },
    {
      id: 'la-matrices',
      title: 'Matrix Operations',
      duration: '24 min',
      objective: 'Multiply matrices, understand shapes, and see why neural networks are matrix math.',
      blocks: [
        { type: 'paragraph', text: 'A matrix is a 2D grid of numbers. Neural network layers are matrix multiplications: output = input × weights + bias.' },
        { type: 'formula', expression: '(m×k) @ (k×n) → (m×n)', note: 'Inner dimensions must match. Output shape is outer dimensions.' },
        { type: 'playground', code: 'import numpy as np\nA = np.array([[1, 2], [3, 4]])\nB = np.array([[5, 6], [7, 8]])\nprint("A @ B =")\nprint(A @ B)\nprint(f"\nTranspose of A =")\nprint(A.T)', expectedOutput: 'A @ B =\n[[19 22]\n [43 50]]\n\nTranspose of A =\n[[1 3]\n [2 4]]' },
        { type: 'formula', expression: 'Identity: I × A = A × I = A', note: 'The identity matrix is the multiplicative "1" for matrices.' },
        { type: 'bullets', items: [
          'Transpose flips rows and columns: shape (m,n) → (n,m).',
          'Inverse A⁻¹: A @ A⁻¹ = I. Not all matrices have inverses.',
          'Determinant = 0 means the matrix is singular (no inverse).',
          'In neural nets: each layer is Y = activation(X @ W + b).',
        ] },
      ],
    },
    {
      id: 'la-eigen',
      title: 'Eigenvalues and Eigenvectors',
      duration: '26 min',
      objective: 'Find the natural axes of a transformation and understand PCA.',
      blocks: [
        { type: 'paragraph', text: 'An eigenvector of matrix A is a direction that A only stretches (not rotates). The eigenvalue is the stretch factor. PCA finds the directions of maximum variance — those are eigenvectors of the covariance matrix.' },
        { type: 'formula', expression: 'Av = λv', note: 'v is the eigenvector, λ is the eigenvalue.' },
        { type: 'playground', code: 'import numpy as np\nA = np.array([[4, 2], [1, 3]])\neigenvalues, eigenvectors = np.linalg.eig(A)\nprint(f"Eigenvalues: {eigenvalues}")\nprint(f"Eigenvectors:\n{eigenvectors}")', expectedOutput: 'Eigenvalues: [5. 2.]\nEigenvectors:\n[[ 0.89442719 -0.70710678]\n [ 0.4472136   0.70710678]]' },
        { type: 'bullets', items: [
          'Large eigenvalues = directions of high variance = important features.',
          'PCA keeps the top-k eigenvectors to reduce dimensionality.',
          'Symmetric matrices always have real eigenvalues.',
          'Used in: Google PageRank, face recognition, recommender systems.',
        ] },
      ],
    },
    {
      id: 'la-svd',
      title: 'SVD and Dimensionality Reduction',
      duration: '22 min',
      objective: 'Decompose any matrix and understand how SVD powers recommendations and compression.',
      blocks: [
        { type: 'paragraph', text: 'Singular Value Decomposition breaks any matrix into three parts: A = UΣVᵀ. This is the workhorse behind image compression, latent semantic analysis, and recommender systems.' },
        { type: 'formula', expression: 'A = U × Σ × Vᵀ', note: 'U and V are orthogonal matrices, Σ contains singular values (importance).' },
        { type: 'playground', code: 'import numpy as np\nA = np.array([[1, 2], [3, 4], [5, 6]])\nU, S, Vt = np.linalg.svd(A, full_matrices=False)\nprint(f"Singular values: {S}")\nreconstructed = U @ np.diag(S) @ Vt\nprint(f"Reconstructed:\n{reconstructed}")', expectedOutput: 'Singular values: [9.52551809 0.51430058]\nReconstructed:\n[[1. 2.]\n [3. 4.]\n [5. 6.]]' },
        { type: 'bullets', items: [
          'Keeping only the top-k singular values gives a compressed approximation.',
          'Truncated SVD is used for topic modeling in NLP.',
          'SVD is more general than eigendecomposition — works on any matrix shape.',
          'L2 regularization connects to singular values through the nuclear norm.',
        ] },
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
