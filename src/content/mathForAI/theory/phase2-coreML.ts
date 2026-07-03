import type { MathPhase } from '../../../types/mathTheory';

export const phase2CoreML: MathPhase = {
  id: 'phase2-coreML',
  title: 'Core ML Math',
  subtitle: 'Loss functions, optimization, and statistical learning theory',
  topics: [
    {
      id: 'loss-functions-optimization',
      title: 'Loss Functions & Optimization',
      estMinutes: 35,
      blocks: [
        { type: 'heading', level: 2, text: 'Classification Losses' },
        {
          type: 'formula',
          latex: '\\mathcal{L}_{\\text{BCE}} = -\\big[ y \\log \\hat{y} + (1 - y) \\log(1 - \\hat{y}) \\big]',
          caption: 'Binary cross-entropy',
        },
        {
          type: 'formula',
          latex: '\\mathcal{L}_{\\text{CE}} = -\\sum_i y_i \\log \\hat{y}_i',
          caption: 'Multi-class cross-entropy (y one-hot)',
        },
        {
          type: 'formula',
          latex: '\\mathcal{L}_{\\text{focal}} = -\\alpha_t (1 - p_t)^{\\gamma} \\log(p_t)',
          caption: 'Focal loss — down-weights easy examples',
        },
        { type: 'heading', level: 2, text: 'Regression Losses' },
        {
          type: 'formula',
          latex: '\\mathcal{L}_{\\text{MSE}} = \\frac{1}{n} \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2',
        },
        {
          type: 'formula',
          latex: '\\mathcal{L}_{\\text{MAE}} = \\frac{1}{n} \\sum_{i=1}^{n} |y_i - \\hat{y}_i|',
        },
        {
          type: 'formula',
          latex: '\\mathcal{L}_{\\text{Huber}} = \\begin{cases} \\frac{1}{2}(y - \\hat{y})^2 & \\text{if } |y - \\hat{y}| \\leq \\delta \\\\ \\delta \\big(|y - \\hat{y}| - \\frac{\\delta}{2}\\big) & \\text{otherwise} \\end{cases}',
          caption: 'Robust to outliers',
        },
        { type: 'heading', level: 2, text: 'Optimizers' },
        {
          type: 'formula',
          latex: 'w \\leftarrow w - \\eta \\, \\nabla_w \\mathcal{L}',
          caption: 'SGD',
        },
        {
          type: 'formula',
          latex: 'v \\leftarrow \\beta v + \\nabla_w \\mathcal{L}, \\quad w \\leftarrow w - \\eta v',
          caption: 'Momentum',
        },
        {
          type: 'formula',
          latex: 'm \\leftarrow \\beta_1 m + (1 - \\beta_1) g, \\quad v \\leftarrow \\beta_2 v + (1 - \\beta_2) g^2, \\quad w \\leftarrow w - \\eta \\frac{m}{\\sqrt{v} + \\epsilon}',
          caption: 'Adam',
        },
        {
          type: 'formula',
          latex: 'v \\leftarrow \\rho v + (1 - \\rho) g^2, \\quad w \\leftarrow w - \\eta \\frac{g}{\\sqrt{v} + \\epsilon}',
          caption: 'RMSprop',
        },
      ],
    },
    {
      id: 'statistical-learning-theory',
      title: 'Statistical Learning Theory',
      estMinutes: 28,
      blocks: [
        { type: 'heading', level: 2, text: 'Bias–Variance Decomposition' },
        {
          type: 'formula',
          latex: '\\text{Total Error} = \\text{Bias}^2 + \\text{Variance} + \\text{Irreducible Error}',
        },
        {
          type: 'paragraph',
          text: 'High bias → underfitting (model too simple). High variance → overfitting (model too complex). Regularization trades bias for lower variance.',
        },
        { type: 'heading', level: 2, text: 'Regularization' },
        {
          type: 'formula',
          latex: '\\mathcal{L}_{\\text{total}} = \\mathcal{L} + \\lambda \\sum_i |w_i|',
          caption: 'L1 (Lasso) — promotes sparsity',
        },
        {
          type: 'formula',
          latex: '\\mathcal{L}_{\\text{total}} = \\mathcal{L} + \\lambda \\sum_i w_i^2',
          caption: 'L2 (Ridge) — shrinks weights',
        },
        {
          type: 'paragraph',
          text: 'Elastic Net combines L1 and L2 penalties. Dropout randomly zeros neurons with probability p during training, acting as an ensemble regularizer. Early stopping halts training when validation loss rises.',
        },
        {
          type: 'formula',
          latex: 'h_i^{\\text{drop}} = \\begin{cases} 0 & \\text{with prob. } p \\\\ \\frac{h_i}{1-p} & \\text{otherwise} \\end{cases}',
          caption: 'Inverted dropout scaling',
        },
      ],
    },
  ],
};
