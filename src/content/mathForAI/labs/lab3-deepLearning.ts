import type { MathLab } from '../../../types/mathLabs';

export const lab3DeepLearning: MathLab = {
  id: 'lab3-deep-learning',
  phaseId: 'phase3-deepLearning',
  title: 'Deep Learning',
  description: 'NumPy neural network with backprop and a PyTorch module skeleton.',
  snippets: [
    {
      id: 'lab3-numpy-nn',
      title: 'NumPy Neural Network with Backprop',
      intro: 'A fully connected network with ReLU hidden layers and softmax output — forward and backward passes implemented in pure NumPy.',
      relatedFormula: '\\frac{\\partial \\mathcal{L}}{\\partial W} = \\frac{1}{m} A_{\\text{prev}}^{\\mathsf T} \\, dA',
      code: `import numpy as np

class NeuralNetwork:
    def __init__(self, layer_sizes):
        self.params = {}; self.cache = {}
        for i in range(len(layer_sizes) - 1):
            self.params[f'W{i+1}'] = np.random.randn(layer_sizes[i], layer_sizes[i+1]) * 0.01
            self.params[f'b{i+1}'] = np.zeros((1, layer_sizes[i+1]))

    def relu(self, z): return np.maximum(0, z)
    def relu_derivative(self, z): return (z > 0).astype(float)
    def softmax(self, z):
        exp_z = np.exp(z - np.max(z, axis=1, keepdims=True))
        return exp_z / np.sum(exp_z, axis=1, keepdims=True)

    def forward(self, X):
        self.cache['A0'] = X; A = X
        for i in range(1, len(self.params) // 2):
            Z = A @ self.params[f'W{i}'] + self.params[f'b{i}']
            A = self.relu(Z)
            self.cache[f'Z{i}'] = Z; self.cache[f'A{i}'] = A
        i = len(self.params) // 2
        Z = A @ self.params[f'W{i}'] + self.params[f'b{i}']
        A = self.softmax(Z)
        self.cache[f'Z{i}'] = Z; self.cache[f'A{i}'] = A
        return A

    def backward(self, Y, learning_rate=0.01):
        m = Y.shape[0]; num_layers = len(self.params) // 2
        dA = self.cache[f'A{num_layers}'] - Y
        for i in range(num_layers, 0, -1):
            A_prev = self.cache[f'A{i-1}']
            dW = (A_prev.T @ dA) / m
            db = np.sum(dA, axis=0, keepdims=True) / m
            self.params[f'W{i}'] -= learning_rate * dW
            self.params[f'b{i}'] -= learning_rate * db
            if i > 1:
                dA = (dA @ self.params[f'W{i}'].T) * self.relu_derivative(self.cache[f'Z{i-1}'])`,
      expectedOutputNote: 'Train by calling forward(X) then backward(Y) in a loop.',
    },
    {
      id: 'lab3-pytorch-nn',
      title: 'PyTorch Module & Training Loop Setup',
      intro: 'Define a 3-layer MLP with nn.Module, CrossEntropyLoss, and Adam — the standard PyTorch training pattern.',
      code: `import torch, torch.nn as nn, torch.optim as optim

class SimpleNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(10, 16); self.fc2 = nn.Linear(16, 8); self.fc3 = nn.Linear(8, 3)
        self.relu = nn.ReLU()
    def forward(self, x):
        x = self.relu(self.fc1(x)); x = self.relu(self.fc2(x)); return self.fc3(x)

model = SimpleNN()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)`,
      expectedOutputNote: 'Ready for a standard train loop: loss.backward(); optimizer.step().',
    },
  ],
};
