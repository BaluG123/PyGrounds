import type { AcademicLab } from '../../../types/academic';

export const mlLabs: AcademicLab[] = [
  {
    id: 'lab-ml-fundamentals',
    trackId: 'track-machine-learning',
    title: 'ML from Scratch',
    description: '',
    snippets: [
      {
        id: 'ml-lab-losses',
        title: 'MSE, MAE & Cross-Entropy',
        intro: 'Implement core losses to understand what sklearn and PyTorch optimize under the hood.',
        code: `import numpy as np

def mse(y_true, y_pred):
    return np.mean((y_true - y_pred) ** 2)

def binary_ce(y_true, y_pred, eps=1e-15):
    y_pred = np.clip(y_pred, eps, 1 - eps)
    return -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))

y = np.array([1, 0, 1, 1])
p = np.array([0.9, 0.1, 0.8, 0.7])
print("BCE:", binary_ce(y, p))`,
        expectedOutputNote: 'Lower BCE when predictions match labels.',
      },
      {
        id: 'ml-lab-sklearn',
        title: 'Sklearn Pipeline Pattern',
        intro: 'Scale features, train a model, and evaluate — the production ML baseline.',
        code: `from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score
import numpy as np

X = np.random.randn(200, 4)
y = (X[:, 0] + X[:, 1] > 0).astype(int)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

pipe = Pipeline([
    ("scaler", StandardScaler()),
    ("clf", LogisticRegression(max_iter=1000)),
])
pipe.fit(X_tr, y_tr)
print("accuracy:", accuracy_score(y_te, pipe.predict(X_te)))`,
        expectedOutputNote: 'Pipeline prevents data leakage by fitting scaler only on train data.',
      },
    ],
  },
];

export const dlLabs: AcademicLab[] = [
  {
    id: 'lab-dl-pytorch',
    trackId: 'track-deep-learning',
    title: 'Deep Learning Training Loop',
    description: '',
    snippets: [
      {
        id: 'dl-lab-training-loop',
        title: 'Mini-Batch Training Loop',
        intro: 'The canonical pattern every deep learning course teaches — epoch, batch, backward, step.',
        code: `import torch, torch.nn as nn, torch.optim as optim

class MLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(10, 32), nn.ReLU(),
            nn.Linear(32, 3),
        )
    def forward(self, x):
        return self.net(x)

model = MLP()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=1e-3)

X = torch.randn(64, 10)
y = torch.randint(0, 3, (64,))

optimizer.zero_grad()
loss = criterion(model(X), y)
loss.backward()
optimizer.step()
print("loss:", loss.item())`,
        expectedOutputNote: 'Single training step — extend with DataLoader for full epochs.',
      },
    ],
  },
];
