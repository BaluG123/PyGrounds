import type { MathPhase } from '../../../types/mathTheory';

export const phase4TransformersLLMs: MathPhase = {
  id: 'phase4-transformersLLMs',
  title: 'Transformers & LLM Math',
  subtitle: 'Attention, architecture, embeddings, and training',
  topics: [
    {
      id: 'attention-mechanism',
      title: 'Attention Mechanism',
      estMinutes: 38,
      blocks: [
        { type: 'heading', level: 2, text: 'Scaled Dot-Product Attention' },
        {
          type: 'formula',
          latex: '\\text{Attention}(Q, K, V) = \\text{softmax}\\!\\left(\\frac{QK^{\\mathsf T}}{\\sqrt{d_k}}\\right) V',
        },
        {
          type: 'list',
          items: [
            'Step 1: query-key product forms a similarity matrix',
            'Step 2: Scale by 1/√d_k to prevent softmax saturation',
            'Step 3: Softmax converts scores to probabilities per row',
            'Step 4: Multiply by V to produce weighted value combinations',
          ],
        },
        { type: 'heading', level: 2, text: 'Multi-Head Attention' },
        {
          type: 'formula',
          latex: '\\text{head}_i = \\text{Attention}(Q W_i^Q, \\; K W_i^K, \\; V W_i^V)',
        },
        {
          type: 'formula',
          latex: '\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, \\ldots, \\text{head}_h) \\, W^O',
        },
        {
          type: 'paragraph',
          text: 'Multiple heads let the model attend to different relationship types simultaneously — syntax, semantics, and long-range dependencies.',
        },
        {
          type: 'paragraph',
          text: 'Example: batch=2, seq_len=10, d_model=512, 8 heads with d_k=64 each. QKᵀ has shape (2, 8, 10, 10); softmax over the last dim; multiply by V → (2, 8, 10, 64); concat heads → (2, 10, 512).',
        },
      ],
    },
    {
      id: 'transformer-architecture',
      title: 'Transformer Architecture',
      estMinutes: 32,
      blocks: [
        { type: 'heading', level: 2, text: 'Attention Variants' },
        {
          type: 'paragraph',
          text: 'Self-attention: Q, K, V all from the same sequence. Cross-attention: Q from decoder, K and V from encoder. Masked self-attention sets future positions to −∞ before softmax to preserve causality.',
        },
        { type: 'heading', level: 2, text: 'Positional Encoding' },
        {
          type: 'formula',
          latex: 'PE_{(\\text{pos},\\, 2i)} = \\sin\\!\\left(\\frac{\\text{pos}}{10000^{2i/d_{\\text{model}}}}\\right)',
        },
        {
          type: 'formula',
          latex: 'PE_{(\\text{pos},\\, 2i+1)} = \\cos\\!\\left(\\frac{\\text{pos}}{10000^{2i/d_{\\text{model}}}}\\right)',
        },
        { type: 'heading', level: 2, text: 'Feed-Forward & LayerNorm' },
        {
          type: 'formula',
          latex: '\\text{FFN}(x) = \\max(0, \\; x W_1 + b_1) \\, W_2 + b_2',
          caption: 'Applied position-wise; typically d_ff = 4 × d_model',
        },
        {
          type: 'formula',
          latex: '\\text{LN}(x) = \\gamma \\cdot \\frac{x - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}} + \\beta',
        },
      ],
    },
    {
      id: 'token-embeddings',
      title: 'Token Embeddings',
      estMinutes: 22,
      blocks: [
        {
          type: 'paragraph',
          text: 'An embedding matrix E has shape (V × d), where V is vocabulary size and d is embedding dimension. Token t maps to row E[t, :].',
        },
        {
          type: 'formula',
          latex: '\\mathbf{e}_t = E[t, \\ :] \\in \\mathbb{R}^d',
        },
        {
          type: 'paragraph',
          text: 'Subword tokenization (BPE, WordPiece) merges frequent character pairs to balance vocabulary size against handling rare words — critical for open-vocabulary LLMs.',
        },
      ],
    },
    {
      id: 'language-model-training',
      title: 'Language Model Training',
      estMinutes: 28,
      blocks: [
        { type: 'heading', level: 2, text: 'Causal Language Modeling' },
        {
          type: 'paragraph',
          text: 'Predict the next token at each position. Loss at position t uses cross-entropy between logits and the true next token.',
        },
        {
          type: 'formula',
          latex: '\\mathcal{L}_t = \\text{CrossEntropy}(\\text{logits}_t, \\; \\text{target}_t)',
        },
        {
          type: 'formula',
          latex: '\\mathcal{L} = \\frac{1}{T} \\sum_{t=1}^{T} \\mathcal{L}_t',
        },
        { type: 'heading', level: 2, text: 'Inference & Perplexity' },
        {
          type: 'formula',
          latex: 'P(x_{t+1}) = \\text{softmax}(\\text{logits}_{-1, :})',
        },
        {
          type: 'formula',
          latex: '\\text{Perplexity} = \\exp(\\mathcal{L}_{\\text{CE}})',
          caption: 'Lower perplexity = better language model',
        },
      ],
    },
  ],
};
