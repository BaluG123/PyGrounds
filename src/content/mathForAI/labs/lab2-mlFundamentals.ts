import type { MathLab } from '../../../types/mathLabs';

export const lab2MlFundamentals: MathLab = {
  id: 'lab2-ml-fundamentals',
  phaseId: 'phase2-coreML',
  title: 'ML Fundamentals',
  description: 'Implement loss functions and the Adam optimizer from scratch in NumPy.',
  snippets: [
    {
      id: 'lab2-regression-losses',
      title: 'MSE, MAE & Huber Loss',
      intro: 'Three regression losses with different sensitivity to outliers — MSE penalizes large errors quadratically, MAE linearly, Huber smoothly transitions between both.',
      relatedFormula: '\\mathcal{L}_{\\text{Huber}} = \\begin{cases} \\frac{1}{2}e^2 & |e| \\leq \\delta \\\\ \\delta(|e| - \\frac{\\delta}{2}) & \\text{otherwise} \\end{cases}',
      code: `import numpy as np

def mse_loss(y_true, y_pred):
    return np.mean((y_true - y_pred) ** 2)

def mae_loss(y_true, y_pred):
    return np.mean(np.abs(y_true - y_pred))

def huber_loss(y_true, y_pred, delta=1.0):
    error = y_true - y_pred
    return np.mean(np.where(np.abs(error) <= delta,
                             0.5 * error ** 2,
                             delta * (np.abs(error) - 0.5 * delta)))`,
      expectedOutputNote: 'Returns scalar loss values; Huber behaves like MSE for small errors, MAE for large ones.',
    },
    {
      id: 'lab2-classification-losses',
      title: 'Binary & Categorical Cross-Entropy',
      intro: 'Classification losses derived from maximum likelihood — clip predictions to avoid log(0).',
      relatedFormula: '\\mathcal{L}_{\\text{BCE}} = -\\big[y \\log \\hat{y} + (1-y) \\log(1-\\hat{y})\\big]',
      code: `def binary_cross_entropy(y_true, y_pred):
    epsilon = 1e-15
    y_pred = np.clip(y_pred, epsilon, 1 - epsilon)
    return -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))

def categorical_cross_entropy(y_true, y_pred):
    epsilon = 1e-15
    y_pred = np.clip(y_pred, epsilon, 1)
    return -np.mean(np.sum(y_true * np.log(y_pred), axis=1))`,
      expectedOutputNote: 'Lower loss when predictions match one-hot labels.',
    },
    {
      id: 'lab2-adam',
      title: 'Adam Optimizer from Scratch',
      intro: 'Adam combines momentum and adaptive learning rates using first and second moment estimates of the gradient.',
      relatedFormula: 'w \\leftarrow w - \\eta \\frac{\\hat{m}}{\\sqrt{\\hat{v}} + \\epsilon}',
      code: `# Adam optimizer implemented from scratch
class Adam:
    def __init__(self, x_init, learning_rate=0.01, beta1=0.9, beta2=0.999, epsilon=1e-8):
        self.x = x_init.copy(); self.learning_rate = learning_rate
        self.beta1 = beta1; self.beta2 = beta2; self.epsilon = epsilon
        self.m = np.zeros_like(x_init); self.v = np.zeros_like(x_init); self.t = 0

    def step(self, gradient):
        self.t += 1
        self.m = self.beta1 * self.m + (1 - self.beta1) * gradient
        self.v = self.beta2 * self.v + (1 - self.beta2) * (gradient ** 2)
        m_hat = self.m / (1 - self.beta1 ** self.t)
        v_hat = self.v / (1 - self.beta2 ** self.t)
        self.x = self.x - self.learning_rate * m_hat / (np.sqrt(v_hat) + self.epsilon)`,
      expectedOutputNote: 'Call .step(gradient) each iteration to update self.x toward a minimum.',
    },
  ],
};
