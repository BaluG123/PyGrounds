import type { MathPhase } from '../../../types/mathTheory';

export const phase6ScalingOptimization: MathPhase = {
  id: 'phase6-scalingOptimization',
  title: 'Scaling & Optimization',
  subtitle: 'Distributed training and numerical stability',
  topics: [
    {
      id: 'distributed-training',
      title: 'Distributed Training',
      estMinutes: 30,
      blocks: [
        { type: 'heading', level: 2, text: 'Data Parallelism' },
        {
          type: 'paragraph',
          text: 'Each GPU computes gradients on its shard of the batch, then AllReduce averages gradients across workers before the weight update.',
        },
        {
          type: 'formula',
          latex: 'w \\leftarrow w - \\eta \\cdot \\frac{1}{G} \\sum_{g=1}^{G} \\nabla_w \\mathcal{L}_g',
          caption: 'G = number of GPUs',
        },
        { type: 'heading', level: 2, text: 'Model & Pipeline Parallelism' },
        {
          type: 'paragraph',
          text: 'When a model exceeds single-GPU memory, layers are split across devices (pipeline parallelism) or individual weight matrices are sharded (tensor parallelism).',
        },
      ],
    },
    {
      id: 'numerical-stability',
      title: 'Numerical Stability',
      estMinutes: 28,
      blocks: [
        { type: 'heading', level: 2, text: 'Gradient Clipping' },
        {
          type: 'formula',
          latex: 'g \\leftarrow g \\cdot \\min\\!\\left(1, \\; \\frac{\\tau}{\\|g\\|}\\right)',
          caption: 'Clip gradient norm to threshold τ',
        },
        { type: 'heading', level: 2, text: 'Mixed Precision Training' },
        {
          type: 'paragraph',
          text: 'Forward and backward passes run in FP16 for speed; loss scaling prevents gradient underflow; master weights stay in FP32 for accuracy. Typically 2–3× speedup with minimal accuracy loss.',
        },
        {
          type: 'list',
          items: [
            'Compute in FP16/BF16 for throughput',
            'Scale loss before backward to preserve small gradients',
            'Update FP32 master copy of weights',
            'Copy master weights back to FP16 for next forward pass',
          ],
        },
      ],
    },
  ],
};
