import type { MathPhase } from '../../../types/mathTheory';

export const phase1Foundations: MathPhase = {
  id: 'phase1-foundations',
  title: 'Foundations',
  subtitle: 'Linear algebra, calculus, and probability for AI',
  topics: [
    {
      id: 'linear-algebra',
      title: 'Linear Algebra',
      estMinutes: 40,
      blocks: [
        {
          type: 'note',
          variant: 'why',
          text: 'Neural networks are matrix operations; data is represented as vectors and matrices; transformations in deep learning use linear algebra throughout.',
        },
        { type: 'heading', level: 2, text: 'Vectors, Matrices & Tensors' },
        {
          type: 'paragraph',
          text: 'A vector is an ordered list of numbers. A matrix is a 2D grid. A tensor generalizes this to any number of dimensions — a batch of images is typically a 4D tensor (batch, height, width, channels).',
        },
        {
          type: 'formula',
          latex: '\\mathbf{v} = \\begin{bmatrix} 1 \\\\ 2 \\\\ 3 \\end{bmatrix}',
          caption: 'Column vector with three components',
        },
        {
          type: 'formula',
          latex: 'M = \\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{bmatrix}',
          caption: 'A 2 × 3 matrix',
        },
        { type: 'heading', level: 3, text: 'Dot Product & Matrix Multiplication' },
        {
          type: 'formula',
          latex: '\\mathbf{v}_1 \\cdot \\mathbf{v}_2 = \\sum_{i=1}^{n} v_{1,i} \\, v_{2,i}',
        },
        {
          type: 'inlineFormulaParagraph',
          segments: [
            { text: 'Matrix multiply: if ' },
            { latex: 'A \\in \\mathbb{R}^{m \\times n}' },
            { text: ' and ' },
            { latex: 'B \\in \\mathbb{R}^{n \\times p}' },
            { text: ', then ' },
            { latex: 'C = AB \\in \\mathbb{R}^{m \\times p}' },
            { text: '.' },
          ],
        },
        { type: 'heading', level: 3, text: 'Transpose, Determinant & Inverse' },
        {
          type: 'inlineFormulaParagraph',
          segments: [
            { text: 'Transpose: ' },
            { latex: 'A^{\\mathsf T}' },
            { text: ' flips rows and columns. Determinant ' },
            { latex: '\\det(A)' },
            { text: ' measures volume scaling. Inverse ' },
            { latex: 'A^{-1}' },
            { text: ' exists only when ' },
            { latex: '\\det(A) \\neq 0' },
            { text: '.' },
          ],
        },
        {
          type: 'formula',
          latex: 'A^{-1} \\text{ exists} \\iff \\det(A) \\neq 0',
        },
        { type: 'heading', level: 3, text: 'Rank' },
        {
          type: 'paragraph',
          text: 'The rank of a matrix is the number of linearly independent rows (or columns). Low-rank approximations power compression, recommendation systems, and LoRA fine-tuning.',
        },
        {
          type: 'formula',
          latex: '\\operatorname{rank}(A) = \\dim(\\operatorname{col}(A)) = \\dim(\\operatorname{row}(A))',
        },
        { type: 'heading', level: 3, text: 'Eigenvalues & Eigenvectors' },
        {
          type: 'paragraph',
          text: 'Eigenvectors are directions unchanged by a linear transformation; eigenvalues are the stretch factors along those directions. PCA finds principal directions via eigendecomposition of the covariance matrix.',
        },
        {
          type: 'formula',
          latex: 'A \\mathbf{v} = \\lambda \\mathbf{v}',
          caption: 'Eigenvalue equation',
        },
        { type: 'heading', level: 3, text: 'Singular Value Decomposition (SVD)' },
        {
          type: 'paragraph',
          text: 'SVD decomposes any matrix into rotations and scaling. It underlies PCA, latent semantic analysis, and low-rank embedding compression.',
        },
        {
          type: 'formula',
          latex: 'A = U \\Sigma V^{\\mathsf T}',
          caption: 'U and V are orthogonal; Σ holds singular values',
        },
        { type: 'heading', level: 3, text: 'Matrix Norms' },
        {
          type: 'formula',
          latex: '\\|A\\|_F = \\sqrt{\\sum_{i,j} A_{ij}^2}',
          caption: 'Frobenius norm — used in weight regularization',
        },
        {
          type: 'formula',
          latex: '\\|\\mathbf{v}\\|_2 = \\sqrt{\\sum_i v_i^2}',
          caption: 'L2 (Euclidean) vector norm',
        },
        {
          type: 'note',
          variant: 'why',
          text: 'Forward pass = matrix multiplications. Backpropagation = chain rule with matrix derivatives. Attention = matrix operations on embedding matrices.',
        },
        { type: 'heading', level: 2, text: 'NumPy Linear Algebra' },
        {
          type: 'codeblock',
          language: 'python',
          code: `import numpy as np

v1 = np.array([1, 2, 3])
v2 = np.array([4, 5, 6])
dot_product = np.dot(v1, v2)

A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
C = A @ B
A_transpose = A.T

eigenvalues, eigenvectors = np.linalg.eig(A)
print("dot:", dot_product)
print("C:\\n", C)
print("eigenvalues:", eigenvalues)`,
        },
        {
          type: 'note',
          variant: 'tip',
          text: 'Use @ for matrix multiply. np.linalg.eig, np.linalg.svd, and np.linalg.norm cover most ML linear algebra needs.',
        },
      ],
    },
    {
      id: 'calculus',
      title: 'Calculus',
      estMinutes: 35,
      blocks: [
        {
          type: 'note',
          variant: 'why',
          text: 'Gradient descent is the core optimizer; backpropagation is the chain rule applied repeatedly; derivatives inform learning-rate tuning.',
        },
        { type: 'heading', level: 2, text: 'Derivatives & Partial Derivatives' },
        {
          type: 'formula',
          latex: 'f(x) = x^2 \\quad \\Rightarrow \\quad f\'(x) = 2x',
        },
        {
          type: 'paragraph',
          text: 'For multivariate functions, we take partial derivatives with respect to each input variable.',
        },
        {
          type: 'formula',
          latex: 'f(x, y) = x^2 + 3xy + y^2',
        },
        {
          type: 'formula',
          latex: '\\frac{\\partial f}{\\partial x} = 2x + 3y, \\quad \\frac{\\partial f}{\\partial y} = 3x + 2y',
        },
        { type: 'heading', level: 3, text: 'Gradient' },
        {
          type: 'formula',
          latex: '\\nabla f = \\left[ \\frac{\\partial f}{\\partial x}, \\; \\frac{\\partial f}{\\partial y} \\right]^{\\mathsf T}',
          caption: 'Points in the direction of steepest ascent',
        },
        { type: 'heading', level: 2, text: 'Chain Rule' },
        {
          type: 'inlineFormulaParagraph',
          segments: [
            { text: 'If ' },
            { latex: 'y = f(g(x))' },
            { text: ', then ' },
            { latex: '\\frac{dy}{dx} = \\frac{df}{dg} \\cdot \\frac{dg}{dx}' },
            { text: '.' },
          ],
        },
        {
          type: 'formula',
          latex: '\\frac{\\partial \\mathcal{L}}{\\partial w} = \\frac{\\partial \\mathcal{L}}{\\partial z_3} \\cdot \\frac{\\partial z_3}{\\partial z_2} \\cdot \\frac{\\partial z_2}{\\partial z_1} \\cdot \\frac{\\partial z_1}{\\partial w}',
          caption: 'Backpropagation through a 4-layer network',
        },
        { type: 'heading', level: 2, text: 'Gradient Descent' },
        {
          type: 'paragraph',
          text: 'Batch gradient descent uses the full dataset; stochastic (SGD) uses one sample; mini-batch is the practical default. Taylor series approximates functions locally — useful for understanding optimizer behavior near a minimum.',
        },
        {
          type: 'formula',
          latex: 'w_{t+1} = w_t - \\eta \\, \\nabla_w \\mathcal{L}(w_t)',
        },
        {
          type: 'paragraph',
          text: 'Adam, RMSprop, and SGD with momentum are first-order methods. The Hessian (matrix of second derivatives) enables second-order methods like Newton\'s method but is expensive at scale.',
        },
        { type: 'heading', level: 2, text: 'PyTorch Autodiff' },
        {
          type: 'codeblock',
          language: 'python',
          code: `import torch

x = torch.tensor([2.0, 3.0], requires_grad=True)
y = (x ** 2).sum() + (3 * x[0] * x[1])
y.backward()
print(x.grad)

learning_rate = 0.01
with torch.no_grad():
    x -= learning_rate * x.grad`,
        },
        {
          type: 'note',
          variant: 'tip',
          text: 'PyTorch builds a computation graph automatically. .backward() applies the chain rule to populate .grad on all leaf tensors with requires_grad=True.',
        },
      ],
    },
    {
      id: 'probability-statistics',
      title: 'Probability & Statistics',
      estMinutes: 38,
      blocks: [
        {
          type: 'note',
          variant: 'why',
          text: 'Loss functions are grounded in probability theory; statistics helps understand overfitting and regularization; Bayesian reasoning underlies modern neural networks.',
        },
        { type: 'heading', level: 2, text: 'Probability Basics' },
        {
          type: 'formula',
          latex: 'P(X = x) \\quad \\text{— likelihood of event}',
        },
        {
          type: 'formula',
          latex: 'P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}',
          caption: 'Conditional probability',
        },
        {
          type: 'formula',
          latex: 'P(A \\mid B) = \\frac{P(B \\mid A) \\, P(A)}{P(B)}',
          caption: "Bayes' theorem",
        },
        { type: 'heading', level: 2, text: 'Common Distributions' },
        {
          type: 'list',
          items: [
            'Normal (Gaussian): N(μ, σ²)',
            'Bernoulli: P(X = 1) = p',
            'Categorical: one-hot over K classes',
            'Exponential and Uniform for modeling waiting times and bounded ranges',
          ],
        },
        {
          type: 'formula',
          latex: 'X \\sim \\mathcal{N}(\\mu, \\sigma^2) \\quad \\Rightarrow \\quad f(x) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} \\exp\\!\\left(-\\frac{(x-\\mu)^2}{2\\sigma^2}\\right)',
        },
        { type: 'heading', level: 2, text: 'Information Theory' },
        {
          type: 'formula',
          latex: 'H(X) = -\\sum_x P(x) \\log P(x)',
          caption: 'Entropy — average surprise',
        },
        {
          type: 'formula',
          latex: 'H(P, Q) = -\\sum_x P(x) \\log Q(x)',
          caption: 'Cross-entropy — training loss for classification',
        },
        {
          type: 'formula',
          latex: 'D_{\\mathrm{KL}}(P \\| Q) = \\sum_x P(x) \\log \\frac{P(x)}{Q(x)}',
          caption: 'KL divergence — measures distribution mismatch',
        },
        {
          type: 'paragraph',
          text: 'Maximum Likelihood Estimation (MLE) finds parameters that maximize the probability of observed data. Bayesian inference updates prior beliefs with observed evidence via Bayes\' rule.',
        },
        { type: 'heading', level: 2, text: 'Cross-Entropy in Code' },
        {
          type: 'codeblock',
          language: 'python',
          code: `import numpy as np
from scipy.stats import norm

x = np.linspace(-4, 4, 100)
y = norm.pdf(x, 0, 1)

y_true = np.array([1, 0, 0])
y_pred = np.array([0.7, 0.2, 0.1])
cross_entropy = -np.sum(y_true * np.log(y_pred))
print("cross-entropy:", cross_entropy)`,
        },
      ],
    },
  ],
};
