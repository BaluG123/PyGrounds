import type { AcademicLab } from '../../../types/academic';

export const specializationLabs: AcademicLab[] = [
  {
    id: 'lab-spec-nlp-genai',
    trackId: 'track-specializations',
    title: 'NLP, RAG & Agents',
    description: 'CS224N / ',
    snippets: [
      {
        id: 'spec-lab-tokenizer',
        title: 'Word-Level Tokenizer',
        intro: 'Build vocabulary from corpus frequency — foundation of all LLM preprocessing.',
        code: `from collections import Counter

class SimpleTokenizer:
    def __init__(self, vocab_size=1000):
        self.word_to_id = {}; self.id_to_word = {}

    def build_vocab(self, texts):
        words = [w for t in texts for w in t.split()]
        for i, w in enumerate(w for w, _ in Counter(words).most_common(1000)):
            self.word_to_id[w] = i; self.id_to_word[i] = w

    def encode(self, text):
        return [self.word_to_id.get(w, -1) for w in text.split()]`,
        expectedOutputNote: 'Encode returns integer token IDs for each word.',
      },
      {
        id: 'spec-lab-rag',
        title: 'Cosine Retrieval for RAG',
        intro: 'Rank documents by embedding similarity — core RAG retrieval step.',
        relatedFormula: '\\text{cos\\_sim}(\\mathbf{q}, \\mathbf{d}) = \\frac{\\mathbf{q} \\cdot \\mathbf{d}}{\\|\\mathbf{q}\\| \\|\\mathbf{d}\\|}',
        code: `import numpy as np

def cosine_sim(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

query = np.array([0.2, 0.8, 0.1])
docs = [np.array([0.1, 0.9, 0.0]), np.array([0.9, 0.1, 0.5])]
scores = [cosine_sim(query, d) for d in docs]
top_k = np.argsort(scores)[-2:]
print("top docs:", top_k, [scores[i] for i in top_k])`,
        expectedOutputNote: 'Returns indices of most similar documents to the query vector.',
      },
    ],
  },
];

export const engineeringLabs: AcademicLab[] = [
  {
    id: 'lab-eng-mlops',
    trackId: 'track-ai-engineering',
    title: 'MLOps & Evaluation',
    description: 'Production AI patterns: experiment tracking, eval metrics, guardrails.',
    snippets: [
      {
        id: 'eng-lab-eval',
        title: 'Classification Metrics Suite',
        intro: 'Precision, recall, F1 — the metrics ',
        code: `from sklearn.metrics import classification_report, confusion_matrix
import numpy as np

y_true = np.array([1, 0, 1, 1, 0, 0, 1, 0])
y_pred = np.array([1, 0, 0, 1, 0, 1, 1, 0])

print(confusion_matrix(y_true, y_pred))
print(classification_report(y_true, y_pred))`,
        expectedOutputNote: 'Confusion matrix and per-class precision/recall/F1.',
      },
      {
        id: 'eng-lab-prompt-guard',
        title: 'LLM Output Validation',
        intro: 'Basic guardrail: reject empty or overly long model outputs before serving.',
        code: `def validate_llm_output(text: str, max_tokens: int = 2000) -> tuple[bool, str]:
    if not text or not text.strip():
        return False, "empty_response"
    if len(text.split()) > max_tokens:
        return False, "too_long"
    if any(p in text.lower() for p in ["ignore previous", "system prompt"]):
        return False, "injection_detected"
    return True, "ok"

ok, reason = validate_llm_output("Here is your summary of the document.")
print(ok, reason)`,
        expectedOutputNote: 'Returns (True, "ok") for valid responses; flags safety issues.',
      },
    ],
  },
];

export const capstoneLabs: AcademicLab[] = [
  {
    id: 'lab-cap-mnist',
    trackId: 'track-capstone',
    title: 'Capstone: MNIST CNN',
    description: 'End-to-end deep learning project — .Tech / ',
    snippets: [
      {
        id: 'cap-lab-cnn',
        title: 'MNIST Classifier Setup',
        intro: 'Complete PyTorch CNN with DataLoader — the classic capstone computer vision baseline.',
        code: `import torch, torch.nn as nn, torch.optim as optim
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,)),
])
train_dataset = datasets.MNIST('.', train=True, download=True, transform=transform)
train_loader = DataLoader(train_dataset, batch_size=128, shuffle=True)

class CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 32, 3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, 3, padding=1)
        self.fc1 = nn.Linear(64 * 7 * 7, 128)
        self.fc2 = nn.Linear(128, 10)
        self.pool = nn.MaxPool2d(2, 2)
        self.relu = nn.ReLU()
    def forward(self, x):
        x = self.pool(self.relu(self.conv1(x)))
        x = self.pool(self.relu(self.conv2(x)))
        x = x.view(x.size(0), -1)
        return self.fc2(self.relu(self.fc1(x)))

model = CNN()
optimizer = optim.Adam(model.parameters(), lr=0.001)
criterion = nn.CrossEntropyLoss()`,
        expectedOutputNote: 'Train loop over train_loader achieves >99% MNIST accuracy in a few epochs.',
      },
    ],
  },
];
