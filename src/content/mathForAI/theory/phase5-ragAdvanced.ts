import type { MathPhase } from '../../../types/mathTheory';

export const phase5RagAdvanced: MathPhase = {
  id: 'phase5-ragAdvanced',
  title: 'RAG & Advanced Topics',
  subtitle: 'Embeddings, fine-tuning, and interpretability',
  topics: [
    {
      id: 'embeddings-vector-spaces',
      title: 'Embeddings & Vector Spaces',
      estMinutes: 35,
      blocks: [
        { type: 'heading', level: 2, text: 'Similarity Metrics' },
        {
          type: 'formula',
          latex: '\\text{cos\\_sim}(\\mathbf{u}, \\mathbf{v}) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\, \\|\\mathbf{v}\\|}',
        },
        {
          type: 'formula',
          latex: 'd_{\\text{Euclidean}} = \\sqrt{\\sum_i (u_i - v_i)^2}',
        },
        {
          type: 'formula',
          latex: 'd_{\\text{Manhattan}} = \\sum_i |u_i - v_i|',
        },
        { type: 'heading', level: 2, text: 'Vector Search' },
        {
          type: 'paragraph',
          text: 'Exact k-NN is O(n). Approximate methods (FAISS, Annoy, HNSW) trade small accuracy loss for much faster search — index build ~O(n log n), query O(log n) to O(n).',
        },
        { type: 'heading', level: 2, text: 'RAG Pipeline' },
        {
          type: 'list',
          items: [
            'Query → embedding model → query embedding',
            'Similarity search: rank documents by cosine similarity',
            'Retrieve top-k documents and concatenate as context',
            'Prompt: "Context: {context}\\nQuestion: {query}"',
            'LLM generates a grounded response',
          ],
        },
        {
          type: 'formula',
          latex: '\\text{BM25}(D, Q) = \\sum_{q_i \\in Q} \\text{IDF}(q_i) \\cdot \\frac{f(q_i, D) \\,(k_1 + 1)}{f(q_i, D) + k_1 \\big(1 - b + b \\cdot \\frac{|D|}{\\text{avgdl}}\\big)}',
          caption: 'Lexical retrieval score',
        },
      ],
    },
    {
      id: 'fine-tuning-math',
      title: 'Fine-Tuning Mathematics',
      estMinutes: 32,
      blocks: [
        {
          type: 'paragraph',
          text: 'Full fine-tuning updates all weights (e.g. 7B parameters). LoRA adds low-rank adapters with far fewer trainable parameters.',
        },
        {
          type: 'formula',
          latex: 'Y = X W + \\alpha \\, (X A B)',
          caption: 'LoRA forward pass: A ∈ ℝ^{d_in × r}, B ∈ ℝ^{r × d_out}, r ≪ min(d_in, d_out)',
        },
        {
          type: 'paragraph',
          text: 'Trainable params ≈ r(d_in + d_out) ≪ d_in · d_out. Example: 7B model → ~20M trainable (~0.3%). QLoRA quantizes the base model to 4-bit while training LoRA adapters — e.g. 48 GB → 16 GB for a 7B model.',
        },
        { type: 'heading', level: 2, text: 'Knowledge Distillation' },
        {
          type: 'formula',
          latex: '\\mathcal{L} = \\alpha \\, \\mathcal{L}_{\\text{sup}}(S, \\text{labels}) + (1 - \\alpha) \\, \\mathcal{L}_{\\text{KL}}(S, T)',
        },
        {
          type: 'formula',
          latex: '\\mathcal{L}_{\\text{KL}} = \\sum_i p_T(i) \\log \\frac{p_T(i)}{p_S(i)}',
        },
      ],
    },
    {
      id: 'interpretability',
      title: 'Interpretability',
      estMinutes: 25,
      blocks: [
        { type: 'heading', level: 2, text: 'Gradient-Based Attribution' },
        {
          type: 'formula',
          latex: '\\text{attribution}_i = \\frac{\\partial \\, \\text{output}}{\\partial \\, \\text{input}_i}',
        },
        { type: 'heading', level: 2, text: 'Perturbation-Based (SHAP-style)' },
        {
          type: 'formula',
          latex: '\\text{importance}(x_i) = \\mathbb{E}\\big[f(\\mathbf{x}) - f(\\mathbf{x}_{\\setminus i})\\big]',
        },
        {
          type: 'paragraph',
          text: 'Attention visualization inspects the (seq_len × seq_len) weight matrix to see which tokens attend to which — useful but not always faithful to model reasoning.',
        },
      ],
    },
  ],
};
