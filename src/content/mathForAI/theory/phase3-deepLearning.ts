import type { MathPhase } from '../../../types/mathTheory';

export const phase3DeepLearning: MathPhase = {
  id: 'phase3-deepLearning',
  title: 'Deep Learning Math',
  subtitle: 'Neural nets, CNNs, and RNNs',
  topics: [
    {
      id: 'neural-network-fundamentals',
      title: 'Neural Network Fundamentals',
      estMinutes: 40,
      blocks: [
        { type: 'heading', level: 2, text: 'Single Neuron' },
        {
          type: 'formula',
          latex: 'z = \\mathbf{w}^{\\mathsf T} \\mathbf{x} + b, \\quad a = \\sigma(z)',
        },
        { type: 'heading', level: 3, text: 'Activation Functions' },
        {
          type: 'formula',
          latex: '\\text{ReLU}(z) = \\max(0, z)',
        },
        {
          type: 'formula',
          latex: '\\sigma(z) = \\frac{1}{1 + e^{-z}}',
          caption: 'Sigmoid',
        },
        {
          type: 'formula',
          latex: '\\tanh(z) = \\frac{e^z - e^{-z}}{e^z + e^{-z}}',
        },
        {
          type: 'formula',
          latex: '\\text{GELU}(z) = z \\, \\Phi(z)',
        },
        { type: 'heading', level: 3, text: 'Activation Derivatives' },
        {
          type: 'formula',
          latex: "\\text{ReLU}'(z) = \\begin{cases} 1 & z > 0 \\\\ 0 & z \\leq 0 \\end{cases}",
        },
        {
          type: 'formula',
          latex: "\\sigma'(z) = \\sigma(z)\\big(1 - \\sigma(z)\\big)",
        },
        {
          type: 'formula',
          latex: "\\tanh'(z) = 1 - \\tanh^2(z)",
        },
        { type: 'heading', level: 2, text: 'Forward Pass (Matrix Form)' },
        {
          type: 'formula',
          latex: 'Z^{(1)} = X W^{(1)} + b^{(1)}, \\quad A^{(1)} = \\text{ReLU}(Z^{(1)})',
        },
        {
          type: 'formula',
          latex: 'Z^{(2)} = A^{(1)} W^{(2)} + b^{(2)}, \\quad A^{(2)} = \\text{ReLU}(Z^{(2)})',
        },
        {
          type: 'formula',
          latex: 'Z^{(3)} = A^{(2)} W^{(3)} + b^{(3)}, \\quad A^{(3)} = \\text{softmax}(Z^{(3)})',
        },
        { type: 'heading', level: 2, text: 'Backpropagation' },
        {
          type: 'formula',
          latex: '\\frac{\\partial \\mathcal{L}}{\\partial W^{(3)}} = \\frac{1}{m} (A^{(3)} - Y)^{\\mathsf T} A^{(2)}',
          caption: 'Output layer gradient',
        },
        {
          type: 'paragraph',
          text: 'Gradients propagate backward through each layer via the chain rule, multiplying by activation derivatives at each step.',
        },
      ],
    },
    {
      id: 'cnns',
      title: 'Convolutional Networks',
      estMinutes: 30,
      blocks: [
        { type: 'heading', level: 2, text: 'Convolution' },
        {
          type: 'formula',
          latex: 'O[i,j] = \\sum_m \\sum_n I[i+m, j+n] \\cdot K[m, n]',
        },
        {
          type: 'paragraph',
          text: 'Pooling (max or average) downsamples feature maps. In practice, convolution is correlation with a flipped kernel. Padding and stride control output spatial size. Backprop through conv layers uses transposed convolution.',
        },
        {
          type: 'note',
          variant: 'tip',
          text: 'Output height: H_out = floor((H_in + 2P - K) / S) + 1, where P is padding and S is stride.',
        },
      ],
    },
    {
      id: 'rnns',
      title: 'Recurrent Networks & LSTM',
      estMinutes: 35,
      blocks: [
        { type: 'heading', level: 2, text: 'Vanilla RNN' },
        {
          type: 'formula',
          latex: 'h_t = \\tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)',
        },
        {
          type: 'formula',
          latex: 'y_t = W_{hy} h_t + b_y',
        },
        {
          type: 'paragraph',
          text: 'Vanishing gradients: the product of many small Jacobian terms drives gradients toward zero over long sequences, making long-range dependencies hard to learn.',
        },
        {
          type: 'formula',
          latex: '\\frac{\\partial h_T}{\\partial h_0} = \\prod_{t=1}^{T} \\frac{\\partial h_t}{\\partial h_{t-1}}',
          caption: 'Gradient vanishes when each factor is less than 1',
        },
        { type: 'heading', level: 2, text: 'LSTM Gates' },
        {
          type: 'formula',
          latex: 'f_t = \\sigma(W_f [h_{t-1}, x_t] + b_f)',
          caption: 'Forget gate',
        },
        {
          type: 'formula',
          latex: 'i_t = \\sigma(W_i [h_{t-1}, x_t] + b_i)',
          caption: 'Input gate',
        },
        {
          type: 'formula',
          latex: '\\tilde{C}_t = \\tanh(W_c [h_{t-1}, x_t] + b_c)',
          caption: 'Candidate cell state',
        },
        {
          type: 'formula',
          latex: 'C_t = f_t \\odot C_{t-1} + i_t \\odot \\tilde{C}_t',
        },
        {
          type: 'formula',
          latex: 'o_t = \\sigma(W_o [h_{t-1}, x_t] + b_o)',
          caption: 'Output gate',
        },
        {
          type: 'formula',
          latex: 'h_t = o_t \\odot \\tanh(C_t)',
        },
      ],
    },
  ],
};
