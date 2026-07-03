import type { AcademicTrack } from '../../../types/academic';

export const trackDeepLearning: AcademicTrack = {
  id: 'track-deep-learning',
  title: 'Deep Learning',
  subtitle: 'Neural computation, backpropagation, and modern architectures from CNNs to transformers',
  levelBadge: 'Neural nets · Training · Architectures',
  courseIds: ['deep-learning'],
  color: '#E44D6E',
  accent: '#FCEEF1',
  termLabel: 'Term 5',
  modules: [
    {
      id: 'mod-ac-dl-neural-foundations',
      title: 'Neural Computation & Training',
      subtitle: 'Perceptrons, backpropagation, and optimization in high dimensions',
      topics: [
        {
          id: 'ac-dl-neural-computation',
          title: 'Neural Computation',
          estMinutes: 42,
          objective:
            'Express neural networks as composable layers of affine transforms and non-linear activations.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: '',
            },
            { type: 'heading', level: 2, text: 'The Artificial Neuron' },
            {
              type: 'paragraph',
              text: 'A single neuron computes a weighted sum of inputs, adds a bias, and passes the result through an activation function. Stacking neurons into layers lets the network approximate complex functions—a fact made precise by the Universal Approximation Theorem for sufficiently wide networks.',
            },
            {
              type: 'formula',
              latex: 'z = \\mathbf{w}^{\\mathsf T}\\mathbf{x} + b, \\quad a = \\sigma(z)',
              caption: 'Pre-activation z and post-activation a',
            },
            {
              type: 'formula',
              latex: '\\mathbf{h}^{(l)} = \\sigma\\!\\left(\\mathbf{W}^{(l)} \\mathbf{h}^{(l-1)} + \\mathbf{b}^{(l)}\\right)',
              caption: 'Layer l — batch form uses matrix H instead of vector h',
            },
            { type: 'heading', level: 2, text: 'Activation Functions' },
            {
              type: 'formula',
              latex: '\\text{ReLU}(z) = \\max(0, z)',
            },
            {
              type: 'formula',
              latex: '\\text{GELU}(z) = z \\cdot \\Phi(z)',
              caption: 'Gaussian Error Linear Unit — used in BERT, GPT',
            },
            {
              type: 'formula',
              latex: '\\text{Softmax}(z_i) = \\frac{e^{z_i}}{\\sum_j e^{z_j}}',
              caption: 'Maps logits to a probability simplex',
            },
            {
              type: 'inlineFormulaParagraph',
              segments: [
                { text: ': ReLU avoids vanishing gradients of sigmoid/tanh for ' },
                { latex: 'z > 0' },
                { text: ', but dead ReLU units (always off) require careful initialization and learning rates.' },
              ],
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `import torch
import torch.nn as nn

# A 2-layer MLP: R^784 -> R^128 -> R^10 (MNIST-style)
model = nn.Sequential(
    nn.Linear(784, 128),
    nn.ReLU(),
    nn.Linear(128, 10),
)

x = torch.randn(32, 784)  # batch of 32 images flattened
logits = model(x)           # shape (32, 10)
probs = torch.softmax(logits, dim=1)
print(f"Output shape: {logits.shape}, row sums to 1: {probs[0].sum():.4f}")`,
            },
          ],
        },
        {
          id: 'ac-dl-backprop-training',
          title: 'Backpropagation & Training',
          estMinutes: 45,
          objective:
            'Derive gradients via the chain rule and implement the forward/backward training loop.',
          blocks: [
            {
              type: 'paragraph',
              text: 'Backpropagation is efficient application of the chain rule through the computational graph. spends a full lecture on manual derivatives before trusting autograd—because debugging NaN losses requires understanding which gate killed the gradient.',
            },
            { type: 'heading', level: 2, text: 'Loss Functions' },
            {
              type: 'formula',
              latex: '\\mathcal{L}_{\\text{CE}} = -\\sum_{c=1}^{C} y_c \\log \\hat{y}_c',
              caption: 'Cross-entropy for one-hot labels',
            },
            {
              type: 'formula',
              latex: '\\mathcal{L}_{\\text{MSE}} = \\frac{1}{n}\\sum_{i=1}^{n}\\|y_i - \\hat{y}_i\\|^2',
              caption: 'Mean squared error for regression heads',
            },
            { type: 'heading', level: 2, text: 'The Chain Rule in Layers' },
            {
              type: 'formula',
              latex: '\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{W}^{(l)}} = \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{h}^{(l)}} \\left(\\frac{\\partial \\mathbf{h}^{(l)}}{\\partial \\mathbf{W}^{(l)}}\\right)^{\\mathsf T}',
            },
            {
              type: 'formula',
              latex: "\\delta^{(l)} = \\big(\\mathbf{W}^{(l+1)}\\big)^{\\mathsf T} \\delta^{(l+1)} \\odot \\sigma'(\\mathbf{z}^{(l)})",
              caption: 'Error signal backpropagated through layer l',
            },
            {
              type: 'paragraph',
              text: '',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `import torch
import torch.nn as nn
import torch.optim as optim

torch.manual_seed(0)
X = torch.randn(64, 20)
y = (X @ torch.randn(20, 1) + 0.5 * torch.randn(64, 1)).squeeze()

model = nn.Sequential(nn.Linear(20, 64), nn.ReLU(), nn.Linear(64, 1))
criterion = nn.MSELoss()
optimizer = optim.SGD(model.parameters(), lr=0.01)

for epoch in range(100):
    optimizer.zero_grad()
    pred = model(X).squeeze()
    loss = criterion(pred, y)
    loss.backward()       # autograd computes all partial derivatives
    optimizer.step()

print(f"Final MSE: {loss.item():.4f}")`,
            },
            {
              type: 'note',
              variant: 'warning',
              text: 'Always call optimizer.zero_grad() before backward(), or gradients accumulate across iterations—a common bug in custom training loops.',
            },
          ],
        },
        {
          id: 'ac-dl-optimization',
          title: 'Optimization for Deep Networks',
          estMinutes: 38,
          objective:
            'Apply SGD variants, learning-rate schedules, and initialization schemes that stabilize training.',
          blocks: [
            {
              type: 'paragraph',
              text: 'Deep networks create ill-conditioned loss landscapes. , adaptive methods, and warmup schedules enable training of hundred-layer networks.',
            },
            { type: 'heading', level: 2, text: 'SGD with Momentum' },
            {
              type: 'formula',
              latex: 'v_t = \\beta v_{t-1} + \\nabla_{\\theta} \\mathcal{L}, \\quad \\theta_t = \\theta_{t-1} - \\eta v_t',
            },
            { type: 'heading', level: 2, text: 'Adam Optimizer' },
            {
              type: 'formula',
              latex: 'm_t = \\beta_1 m_{t-1} + (1-\\beta_1)g_t, \\quad v_t = \\beta_2 v_{t-1} + (1-\\beta_2)g_t^2',
            },
            {
              type: 'formula',
              latex: '\\theta_t = \\theta_{t-1} - \\eta \\frac{\\hat{m}_t}{\\sqrt{\\hat{v}_t} + \\epsilon}',
              caption: 'Bias-corrected Adam update',
            },
            { type: 'heading', level: 2, text: 'Weight Initialization' },
            {
              type: 'formula',
              latex: 'W \\sim \\mathcal{N}\\!\\left(0, \\frac{2}{n_{\\text{in}}}\\right)',
              caption: 'He initialization for ReLU networks',
            },
            {
              type: 'formula',
              latex: 'W \\sim \\mathcal{N}\\!\\left(0, \\frac{1}{n_{\\text{in}}}\\right)',
              caption: 'Xavier initialization for tanh/sigmoid',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `import torch
import torch.nn as nn
from torch.optim.lr_scheduler import CosineAnnealingLR

model = nn.Sequential(
    nn.Linear(512, 256), nn.ReLU(),
    nn.Linear(256, 128), nn.ReLU(),
    nn.Linear(128, 10),
)

def init_he(m):
    if isinstance(m, nn.Linear):
        nn.init.kaiming_normal_(m.weight, nonlinearity='relu')
        nn.init.zeros_(m.bias)

model.apply(init_he)
optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4, weight_decay=0.01)
scheduler = CosineAnnealingLR(optimizer, T_max=100)

# Training step ...
loss = model(torch.randn(16, 512)).sum()  # placeholder
loss.backward()
optimizer.step()
scheduler.step()
print(f"LR after step 1: {scheduler.get_last_lr()[0]:.6f}")`,
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'AdamW decouples weight decay from the adaptive gradient—preferred over Adam+L2 for transformers and large language models.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-ac-dl-architectures',
      title: 'Convolutional, Recurrent & Transformer Architectures',
      subtitle: 'Inductive biases for vision, sequences, and attention-based models',
      topics: [
        {
          id: 'ac-dl-cnns',
          title: 'Convolutional Neural Networks',
          estMinutes: 40,
          objective:
            'Understand local receptive fields, parameter sharing, and pooling for spatial data.',
          blocks: [
            {
              type: 'paragraph',
              text: 'CNNs exploit translation equivariance: a cat detector should fire regardless of position. ',
            },
            { type: 'heading', level: 2, text: 'Convolution Operation' },
            {
              type: 'formula',
              latex: '(\\mathbf{I} * \\mathbf{K})_{i,j} = \\sum_{m}\\sum_{n} I_{i+m,\\,j+n} \\, K_{m,n}',
              caption: '2D discrete convolution',
            },
            {
              type: 'formula',
              latex: 'H_{\\text{out}} = \\left\\lfloor \\frac{H_{\\text{in}} + 2P - K}{S} \\right\\rfloor + 1',
              caption: 'Output height given padding P, kernel K, stride S',
            },
            { type: 'heading', level: 2, text: 'Typical CNN Stack' },
            {
              type: 'list',
              items: [
                'Conv → BatchNorm → ReLU blocks extract hierarchical features',
                'Pooling (max or average) reduces spatial resolution',
                'Global average pooling + linear head for classification',
                'Data augmentation (flips, crops) acts as implicit regularization',
              ],
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `import torch
import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.MaxPool2d(2),
        )
        self.classifier = nn.Sequential(
            nn.AdaptiveAvgPool2d(1),
            nn.Flatten(),
            nn.Linear(64, num_classes),
        )

    def forward(self, x):
        return self.classifier(self.features(x))

model = SimpleCNN()
x = torch.randn(8, 3, 32, 32)  # CIFAR-10 batch
print(f"Logits shape: {model(x).shape}")  # (8, 10)`,
            },
          ],
        },
        {
          id: 'ac-dl-rnns',
          title: 'Recurrent Neural Networks',
          estMinutes: 38,
          objective:
            'Model sequential dependencies with RNNs, LSTMs, and understand vanishing gradients.',
          blocks: [
            {
              type: 'paragraph',
              text: 'Sequences—text, speech, time series—require memory of past inputs. Vanilla RNNs maintain a hidden state updated at each timestep. -layer computational graph, making gradient flow fragile.',
            },
            { type: 'heading', level: 2, text: 'Vanilla RNN' },
            {
              type: 'formula',
              latex: '\\mathbf{h}_t = \\tanh(\\mathbf{W}_{hh}\\mathbf{h}_{t-1} + \\mathbf{W}_{xh}\\mathbf{x}_t + \\mathbf{b})',
            },
            {
              type: 'formula',
              latex: '\\mathbf{y}_t = \\mathbf{W}_{hy}\\mathbf{h}_t + \\mathbf{c}',
              caption: 'Output at each timestep (many-to-many) or final h_T (many-to-one)',
            },
            { type: 'heading', level: 2, text: 'LSTM Gating' },
            {
              type: 'formula',
              latex: '\\mathbf{f}_t = \\sigma(\\mathbf{W}_f [\\mathbf{h}_{t-1}, \\mathbf{x}_t] + \\mathbf{b}_f)',
              caption: 'Forget gate',
            },
            {
              type: 'formula',
              latex: '\\mathbf{c}_t = \\mathbf{f}_t \\odot \\mathbf{c}_{t-1} + \\mathbf{i}_t \\odot \\tilde{\\mathbf{c}}_t',
              caption: 'Cell state — additive path mitigates vanishing gradients',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `import torch
import torch.nn as nn

batch, seq_len, input_size, hidden_size = 16, 20, 50, 128
x = torch.randn(batch, seq_len, input_size)

lstm = nn.LSTM(input_size, hidden_size, num_layers=2, batch_first=True, dropout=0.2)
gru = nn.GRU(input_size, hidden_size, batch_first=True)

out_lstm, (h_n, c_n) = lstm(x)
out_gru, h_gru = gru(x)

print(f"LSTM output: {out_lstm.shape}, final hidden: {h_n.shape}")
print(f"GRU output:  {out_gru.shape}, final hidden: {h_gru.shape}")`,
            },
            {
              type: 'note',
              variant: 'why',
              text: 'Transformers largely replaced RNNs for NLP, but LSTMs remain strong baselines for small datasets, streaming signals, and embedded systems with tight latency budgets.',
            },
          ],
        },
        {
          id: 'ac-dl-transformers-intro',
          title: 'Introduction to Transformers',
          estMinutes: 44,
          objective:
            'Understand self-attention, multi-head attention, and the encoder block that powers modern LLMs.',
          blocks: [
            {
              type: 'paragraph',
              text: 'The Transformer (the original Transformer paper) replaced recurrence with self-attention, enabling parallel training on long contexts. and ',
            },
            { type: 'heading', level: 2, text: 'Scaled Dot-Product Attention' },
            {
              type: 'formula',
              latex: '\\text{Attention}(Q, K, V) = \\text{softmax}\\!\\left(\\frac{QK^{\\mathsf T}}{\\sqrt{d_k}}\\right) V',
            },
            {
              type: 'inlineFormulaParagraph',
              segments: [
                { text: 'Queries ' },
                { latex: 'Q' },
                { text: ', keys ' },
                { latex: 'K' },
                { text: ', and values ' },
                { latex: 'V' },
                { text: ' are linear projections of the input. Scaling by ' },
                { latex: '\\sqrt{d_k}' },
                { text: ' prevents softmax saturation for large dimensions.' },
              ],
            },
            { type: 'heading', level: 2, text: 'Multi-Head Attention' },
            {
              type: 'formula',
              latex: '\\text{MultiHead}(Q,K,V) = \\text{Concat}(\\text{head}_1, \\ldots, \\text{head}_h) W^O',
            },
            {
              type: 'formula',
              latex: '\\text{head}_i = \\text{Attention}(Q W_i^Q, K W_i^K, V W_i^V)',
              caption: 'Each head learns a different relational pattern',
            },
            { type: 'heading', level: 2, text: 'Transformer Encoder Block' },
            {
              type: 'formula',
              latex: "\\mathbf{x}' = \\text{LayerNorm}\\big(\\mathbf{x} + \\text{MultiHead}(\\mathbf{x})\\big)",
              caption: 'Pre-norm variant (common in modern LLMs)',
            },
            {
              type: 'formula',
              latex: '\\text{FFN}(\\mathbf{x}) = \\max(0, \\mathbf{x} W_1 + b_1) W_2 + b_2',
              caption: 'Position-wise feed-forward network',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `import torch
import torch.nn as nn

class TransformerEncoderBlock(nn.Module):
    def __init__(self, d_model=512, n_heads=8, d_ff=2048, dropout=0.1):
        super().__init__()
        self.attn = nn.MultiheadAttention(d_model, n_heads, dropout=dropout, batch_first=True)
        self.ffn = nn.Sequential(
            nn.Linear(d_model, d_ff),
            nn.GELU(),
            nn.Dropout(dropout),
            nn.Linear(d_ff, d_model),
        )
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x):
        attn_out, _ = self.attn(x, x, x, need_weights=False)
        x = self.norm1(x + self.dropout(attn_out))
        x = self.norm2(x + self.dropout(self.ffn(x)))
        return x

x = torch.randn(2, 10, 512)  # (batch, seq_len, d_model)
block = TransformerEncoderBlock()
print(f"Encoder output shape: {block(x).shape}")`,
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'Positional encodings (sinusoidal or learned) inject order information because self-attention alone is permutation-invariant over sequence positions.',
            },
          ],
        },
      ],
    },
  ],
};
