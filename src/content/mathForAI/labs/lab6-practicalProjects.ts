import type { MathLab } from '../../../types/mathLabs';

export const lab6PracticalProjects: MathLab = {
  id: 'lab6-practical-projects',
  phaseId: 'phase3-deepLearning',
  title: 'Practical Project — MNIST CNN',
  description: 'End-to-end PyTorch CNN for MNIST digit classification.',
  snippets: [
    {
      id: 'lab6-mnist-cnn',
      title: 'MNIST CNN Classifier',
      intro: 'A two-layer CNN with max pooling and fully connected head — a complete training setup for the MNIST benchmark.',
      code: `import torch, torch.nn as nn, torch.optim as optim
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

transform = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.1307,), (0.3081,))])
train_dataset = datasets.MNIST('.', train=True, download=True, transform=transform)
train_loader = DataLoader(train_dataset, batch_size=128, shuffle=True)

class CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.fc1 = nn.Linear(64 * 7 * 7, 128); self.fc2 = nn.Linear(128, 10)
        self.pool = nn.MaxPool2d(2, 2); self.relu = nn.ReLU()
    def forward(self, x):
        x = self.pool(self.relu(self.conv1(x)))
        x = self.pool(self.relu(self.conv2(x)))
        x = x.view(x.size(0), -1)
        x = self.relu(self.fc1(x))
        return self.fc2(x)

model = CNN()
optimizer = optim.Adam(model.parameters(), lr=0.001)
criterion = nn.CrossEntropyLoss()`,
      expectedOutputNote: 'Standard train loop over train_loader achieves >99% accuracy on MNIST within a few epochs.',
    },
  ],
};
