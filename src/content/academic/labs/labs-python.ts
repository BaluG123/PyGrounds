import type { AcademicLab } from '../../../types/academic';

export const pythonLabs: AcademicLab[] = [
  {
    id: 'lab-py-foundation',
    trackId: 'track-python-foundation',
    title: 'Core Python Patterns',
    description: 'Variables, control flow, data structures, and OOP — the ',
    snippets: [
      {
        id: 'py-lab-vectors',
        title: 'Lists, Dicts & Comprehensions',
        intro: 'Build feature dictionaries and transform lists — patterns used in every ML data pipeline.',
        code: `# Feature vector as dict — common in tabular ML prep
sample = {"age": 28, "income": 54000, "city": "Pune"}
features = [sample["age"], sample["income"]]

text = "machine learning models learn patterns from data"
words = text.split()
word_counts = {w: words.count(w) for w in set(words)}

scores = [42, 88, 91, 55, 73]
honors = [s for s in scores if s >= 85]`,
        expectedOutputNote: 'Comprehensions replace slow loops; dicts map feature names to values for sklearn.',
      },
      {
        id: 'py-lab-functions',
        title: 'Functions & Type Hints',
        intro: 'Write reusable, testable functions with clear contracts — ',
        code: `def train_test_split(X: list, y: list, test_ratio: float = 0.2):
    """Split data into train and test sets (simple hold-out)."""
    n = len(X)
    split = int(n * (1 - test_ratio))
    return X[:split], X[split:], y[:split], y[split:]

X = list(range(100))
y = [i % 2 for i in X]
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_ratio=0.2)
print(len(X_tr), len(X_te))  # 80, 20`,
        expectedOutputNote: 'Prints 80 20 — foundation of every ML experiment design.',
      },
      {
        id: 'py-lab-oop',
        title: 'Classes for ML Components',
        intro: 'Model objects with fit/predict interface — mirrors scikit-learn and PyTorch design.',
        code: `class LinearModel:
    def __init__(self, learning_rate=0.01):
        self.lr = learning_rate
        self.weights = None

    def fit(self, X, y, epochs=100):
        n_features = len(X[0])
        self.weights = [0.0] * n_features
        for _ in range(epochs):
            for xi, yi in zip(X, y):
                pred = sum(w * x for w, x in zip(self.weights, xi))
                error = yi - pred
                self.weights = [w + self.lr * error * x
                                for w, x in zip(self.weights, xi)]

    def predict(self, X):
        return [sum(w * x for w, x in zip(self.weights, xi)) for xi in X]`,
        expectedOutputNote: 'Demonstrates the fit/predict API pattern used across ML libraries.',
      },
    ],
  },
];
