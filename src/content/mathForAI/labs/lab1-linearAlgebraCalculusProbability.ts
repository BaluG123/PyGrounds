import type { MathLab } from '../../../types/mathLabs';

export const lab1LinearAlgebraCalculusProbability: MathLab = {
  id: 'lab1-linear-algebra-calculus-probability',
  phaseId: 'phase1-foundations',
  title: 'Linear Algebra, Calculus & Probability',
  description: 'Hands-on NumPy, PyTorch, and scipy snippets for vectors, matrices, derivatives, and information theory.',
  snippets: [
    {
      id: 'lab1-cosine-similarity',
      title: 'Vectors, Norms & Cosine Similarity',
      intro: 'Compute dot products, L2 norms, normalization, and cosine similarity — the building blocks of embedding search and attention scores.',
      relatedFormula: '\\cos(\\theta) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\, \\|\\mathbf{v}\\|}',
      code: `import numpy as np

v1 = np.array([1, 2, 3]); v2 = np.array([4, 5, 6])
dot_product = np.dot(v1, v2)
norm_l2 = np.linalg.norm(v1)
normalized = v1 / norm_l2
cosine_sim = np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))`,
      expectedOutputNote: 'Prints dot product (32), L2 norm, normalized vector, and cosine similarity (~0.975).',
    },
    {
      id: 'lab1-matrix-ops',
      title: 'Matrix Operations & Eigendecomposition',
      intro: 'Matrix multiply, transpose, inverse, determinant, and eigenvalues — core operations behind every neural network layer.',
      code: `A = np.array([[1, 2], [3, 4]]); B = np.array([[5, 6], [7, 8]])
C = A @ B
A_T = A.T
A_inv = np.linalg.inv(A)
det = np.linalg.det(A)
eigenvalues, eigenvectors = np.linalg.eig(A)`,
      expectedOutputNote: 'C is the 2×2 product; det(A)=−2; eigenvalues [−0.37, 5.37].',
    },
    {
      id: 'lab1-svd',
      title: 'SVD & Low-Rank Approximation',
      intro: 'Singular Value Decomposition compresses a matrix by keeping only the top-k singular values — the math behind PCA and embedding compression.',
      relatedFormula: 'A \\approx U_k \\Sigma_k V_k^{\\mathsf T}',
      code: `A = np.array([[1, 2, 3], [4, 5, 6]])
U, S, Vt = np.linalg.svd(A)
k = 1
S_truncated = np.zeros_like(S); S_truncated[:k] = S[:k]
A_approx = U @ np.diag(np.concatenate([S_truncated, [0]])) @ Vt`,
      expectedOutputNote: 'A_approx is a rank-1 approximation of the original 2×3 matrix.',
    },
    {
      id: 'lab1-numerical-derivative',
      title: 'Numerical vs Analytical Derivative',
      intro: 'Compare finite-difference approximation to the analytical derivative of f(x) = x² at x = 3.',
      relatedFormula: "f'(x) = 2x",
      code: `def f(x):
    return x ** 2

def numerical_derivative(func, x, h=1e-5):
    return (func(x + h) - func(x - h)) / (2 * h)

x = 3.0
numerical_grad = numerical_derivative(f, x)
analytical_grad = 2 * x`,
      expectedOutputNote: 'Both numerical and analytical gradients equal 6.0 at x=3.',
    },
    {
      id: 'lab1-pytorch-autograd',
      title: 'PyTorch Automatic Differentiation',
      intro: 'PyTorch tracks operations and applies the chain rule via .backward() to compute exact gradients.',
      relatedFormula: '\\frac{dy}{dx} = 2x',
      code: `import torch
x = torch.tensor(3.0, requires_grad=True)
y = x ** 2
y.backward()
print(x.grad)  # dy/dx = 2x = 6`,
      expectedOutputNote: 'Prints tensor(6.).',
    },
    {
      id: 'lab1-gradient-descent',
      title: 'Gradient Descent from Scratch',
      intro: 'Iteratively minimize f(x) = x² by stepping opposite to the gradient until convergence near x = 0.',
      relatedFormula: 'x \\leftarrow x - \\eta \\cdot 2x',
      code: `def gradient_descent(learning_rate=0.01, iterations=100):
    x = 5.0
    history = [x]
    for i in range(iterations):
        gradient = 2 * x
        x = x - learning_rate * gradient
        history.append(x)
    return x, history

optimal_x, history = gradient_descent(learning_rate=0.1, iterations=100)`,
      expectedOutputNote: 'optimal_x converges close to 0 from starting value 5.0.',
    },
    {
      id: 'lab1-entropy-crossentropy',
      title: 'Entropy & Cross-Entropy',
      intro: 'Measure uncertainty with Shannon entropy and compute classification loss with cross-entropy.',
      relatedFormula: 'H(P, Q) = -\\sum_x P(x) \\log Q(x)',
      code: `import numpy as np
from scipy.stats import norm

def entropy(p):
    p = np.array(p); p = p[p > 0]
    return -np.sum(p * np.log2(p))

p_uniform = [0.25, 0.25, 0.25, 0.25]
p_peaked = [0.7, 0.2, 0.05, 0.05]

def cross_entropy_loss(y_true, y_pred):
    return -np.sum(y_true * np.log(y_pred))

y_true = np.array([1, 0, 0]); y_pred = np.array([0.7, 0.2, 0.1])
loss = cross_entropy_loss(y_true, y_pred)`,
      expectedOutputNote: 'Uniform entropy = 2 bits; peaked entropy is lower; cross-entropy loss ≈ 0.36.',
    },
    {
      id: 'lab1-bayes',
      title: "Bayes' Theorem — Medical Test",
      intro: 'Even with a 95% accurate test, a rare disease (1% prevalence) yields surprisingly low posterior probability of disease given a positive test.',
      relatedFormula: 'P(A \\mid B) = \\frac{P(B \\mid A) \\, P(A)}{P(B)}',
      code: `# Bayes' theorem: medical test example
p_disease = 0.01; p_no_disease = 0.99
p_test_pos_given_disease = 0.95
p_test_pos_given_no_disease = 0.10
p_test_positive = (p_test_pos_given_disease * p_disease +
                    p_test_pos_given_no_disease * p_no_disease)
p_disease_given_test_positive = (p_test_pos_given_disease * p_disease) / p_test_positive`,
      expectedOutputNote: 'Posterior P(disease | positive) ≈ 0.087 — much lower than 95%.',
    },
  ],
};
