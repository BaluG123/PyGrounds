import type { MathLab } from '../../../types/mathLabs';

export const lab4AttentionTransformers: MathLab = {
  id: 'lab4-attention-transformers',
  phaseId: 'phase4-transformersLLMs',
  title: 'Attention & Transformers',
  description: 'Scaled dot-product attention in NumPy and multi-head attention in PyTorch.',
  snippets: [
    {
      id: 'lab4-scaled-attention',
      title: 'Scaled Dot-Product Attention (NumPy)',
      intro: 'Compute attention scores, apply optional masking, softmax-normalize, and weight values — the core transformer operation.',
      relatedFormula: '\\text{Attention}(Q, K, V) = \\text{softmax}\\!\\left(\\frac{QK^{\\mathsf T}}{\\sqrt{d_k}}\\right) V',
      code: `import numpy as np

def scaled_dot_product_attention(Q, K, V, mask=None):
    d_k = Q.shape[-1]
    scores = Q @ K.transpose(-2, -1) / np.sqrt(d_k) if hasattr(K, 'transpose') else None
    if mask is not None:
        scores = scores + mask * -1e9
    attention_weights = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
    attention_weights = attention_weights / np.sum(attention_weights, axis=-1, keepdims=True)
    output = attention_weights @ V
    return output, attention_weights`,
      expectedOutputNote: 'Returns attended output and attention weight matrix.',
    },
    {
      id: 'lab4-multihead-attention',
      title: 'Multi-Head Attention (PyTorch)',
      intro: 'Split d_model into num_heads parallel attention operations, then project back with W_O.',
      code: `import torch, torch.nn as nn

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        self.d_model = d_model; self.num_heads = num_heads; self.d_k = d_model // num_heads
        self.W_q = nn.Linear(d_model, d_model); self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model); self.W_o = nn.Linear(d_model, d_model)

    def scaled_dot_product_attention(self, Q, K, V):
        scores = torch.matmul(Q, K.transpose(-2, -1)) / torch.sqrt(torch.tensor(self.d_k, dtype=torch.float32))
        attention_weights = torch.softmax(scores, dim=-1)
        return torch.matmul(attention_weights, V), attention_weights

    def forward(self, Q, K, V):
        batch_size = Q.size(0)
        Q = self.W_q(Q); K = self.W_k(K); V = self.W_v(V)
        Q = Q.view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = K.view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = V.view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        output, _ = self.scaled_dot_product_attention(Q, K, V)
        output = output.transpose(1, 2).contiguous().view(batch_size, -1, self.d_model)
        return self.W_o(output)`,
      expectedOutputNote: 'Input shape (batch, seq_len, d_model) → same shape output.',
    },
  ],
};
