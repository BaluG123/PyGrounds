import { Brain } from 'lucide-react-native';
import type { CourseModule } from '../types/course';

export const deepLearningCourse: CourseModule = {
  id: 'deep-learning',
  title: 'Deep Learning Intro',
  subtitle: 'Neural networks, backprop, PyTorch basics',
  color: '#E44D6E',
  accent: '#FCEEF1',
  Icon: Brain,
  history: {
    founder: 'Rosenblatt, Hinton, LeCun, Bengio',
    released: '1958 (Perceptron) - 2010s (Deep Learning Boom)',
    summary:
      'Deep learning uses artificial neural networks to learn representations from data. After decades of being computationally impractical, GPUs and large datasets made it the dominant approach for vision, audio, and language.',
  },
  concepts: [
    'Neurons and the Perceptron',
    'Activation functions (ReLU, Sigmoid, Softmax)',
    'The Forward Pass (matrix multiplication)',
    'Loss functions (MSE, Cross-Entropy)',
    'Gradient Descent and Learning Rates',
    'Backpropagation (the Chain Rule)',
    'Tensors and Autograd (PyTorch/TensorFlow concepts)',
    'Epochs and Batches',
  ],
  lessons: [
    {
      id: 'dl-neuron',
      title: 'The Artificial Neuron',
      duration: '20 min',
      objective: 'Understand how a single neuron computes an output.',
      blocks: [
        { type: 'heading', text: 'Meet the Perceptron' },
        {
          type: 'paragraph',
          text: 'The fundamental building block of all modern AI is the artificial neuron, originally proposed as the Perceptron. A neuron is a mathematical processor that mimics the biological brain: it receives input signals, weights their importance, aggregates them, and decides whether to send an output signal.',
        },
        {
          type: 'analogy',
          text: 'Think of an artificial neuron like a committee deciding whether to approve a project. Each member (input) gives a vote, but some members have more seniority (weights). If the combined weighted vote exceeds a certain hurdle (bias), the project is approved (fires).',
        },
        {
          type: 'diagram',
          title: 'Information Flow in a Single Neuron',
          boxes: [
            { id: 'inputs', x: 10, y: 70, width: 80, height: 50, label: 'Inputs (X)', color: '#2B6CB0' },
            { id: 'neuron', x: 120, y: 70, width: 80, height: 50, label: 'Sum (W·X + b)', color: '#E44D6E' },
            { id: 'act', x: 230, y: 70, width: 80, height: 50, label: 'Activation', color: '#1D7A57' },
          ],
          arrows: [
            { from: 'inputs', to: 'neuron', label: 'w_i' },
            { from: 'neuron', to: 'act', label: 'z' },
          ],
          height: 180,
        },
        { type: 'divider' },
        { type: 'heading', text: 'The Mathematical Formula' },
        {
          type: 'paragraph',
          text: 'Mathematically, we take the dot product of our inputs and weights, add a constant bias to shift the activation point, and pass the sum through an activation function.',
        },
        {
          type: 'formula',
          expression: 'z = \\sum_{i=1}^n w_i x_i + b = W \\cdot X + b',
          note: 'The weighted sum plus bias.',
        },
        {
          type: 'formula',
          expression: 'y = \\text{activation}(z)',
          note: 'This final step determines the output intensity.',
        },
        {
          type: 'callout',
          variant: 'remember',
          title: 'Why Bias Matters',
          body: 'The bias term (b) shifts the activation function to the left or right. Without a bias, the neuron output would always be 0 when inputs are 0, severely limiting the patterns it can represent.',
        },
        { type: 'divider' },
        { type: 'heading', text: 'Implementation in Code' },
        {
          type: 'playground',
          code: 'import numpy as np\n\nx = np.array([1.5, 2.0]) # Inputs\nw = np.array([0.8, -0.2]) # Weights\nbias = 0.5\n\n# Weighted sum\nz = np.dot(x, w) + bias\n\n# ReLU activation: max(0, z)\na = max(0, z)\nprint(f"Sum (z): {z:.2f}")\nprint(f"Activated Output (a): {a:.2f}")',
          expectedOutput: 'Sum (z): 1.30\nActivated Output (a): 1.30',
        },
        {
          type: 'stepByStep',
          title: 'Computing a Neuron Output',
          steps: [
            { title: 'Receive Inputs (X)', description: 'Values represent raw data features (e.g., pixel intensities, token frequencies).' },
            { title: 'Apply Weights (W)', description: 'Multiply each input by its weight (strength of connection).' },
            { title: 'Add Bias (b)', description: 'Add a scalar bias value to aggregate the shifted sum.' },
            { title: 'Apply Activation Function', description: 'Introduce non-linearity (e.g., ReLU) to get the final fired output.' },
          ],
        },
        {
          type: 'bullets',
          items: [
            'Weights (W) determine the scaling factor of incoming signals.',
            'Bias (b) shifts the activation response up or down.',
            'Activation functions introduce critical non-linearity.',
          ],
        },
      ],
    },
    {
      id: 'dl-activations',
      title: 'Activation Functions',
      duration: '22 min',
      objective: 'Learn why networks need non-linearity and which functions to use.',
      blocks: [
        { type: 'heading', text: 'The Secret Ingredient: Non-Linearity' },
        {
          type: 'paragraph',
          text: 'If we stack multiple neural layers without activation functions, the entire system collapses mathematically into a single linear regression. Activation functions give the network its superpowers by introducing curves and complex decision boundaries.',
        },
        {
          type: 'analogy',
          text: 'Think of activation functions as gates on a highway. A linear gate lets traffic pass in direct proportion to input. A non-linear gate (like ReLU) blocks all negative traffic completely while letting positive traffic stream through untouched.',
        },
        {
          type: 'table',
          headers: ['Function', 'Formula', 'Range', 'Best For'],
          rows: [
            ['ReLU', 'max(0, x)', '[0, ∞)', 'Hidden Layers (Standard)'],
            ['Sigmoid', '1 / (1 + e^-x)', '(0, 1)', 'Binary Classification Output'],
            ['Tanh', 'tanh(x)', '(-1, 1)', 'Recurrent Networks (RNNs)'],
            ['Softmax', 'e^xi / sum(e^xj)', '[0, 1]', 'Multi-Class Output Layer'],
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'Interactive Activation Function Test' },
        {
          type: 'playground',
          code: 'import numpy as np\n\ndef relu(x): return np.maximum(0, x)\ndef sigmoid(x): return 1 / (1 + np.exp(-x))\n\nz = np.array([-2.5, 0.0, 2.5])\nprint(f"Inputs: {z}")\nprint(f"ReLU: {relu(z)}")\nprint(f"Sigmoid: {np.round(sigmoid(z), 3)}")',
          expectedOutput: 'Inputs: [-2.5  0.   2.5]\nReLU: [0.  0.  2.5]\nSigmoid: [0.076 0.5   0.924]',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Vanishing Gradients',
          body: 'Sigmoid and Tanh saturate for extremely large or small values, causing their derivatives to become almost 0. This "freezes" training. ReLU solves this by maintaining a constant slope of 1 for all positive inputs.',
        },
        {
          type: 'bullets',
          items: [
            'ReLU is computationally fast to evaluate and optimize.',
            'Sigmoid squashes outputs into a [0, 1] range, perfect for probabilities.',
            'Softmax ensures the outputs of all output nodes sum exactly to 1.0.',
          ],
        },
      ],
    },
    {
      id: 'dl-forward',
      title: 'The Forward Pass',
      duration: '24 min',
      objective: 'Stack neurons into layers to build a multi-layer network.',
      blocks: [
        { type: 'heading', text: 'Scaling Up: Neural Layers' },
        {
          type: 'paragraph',
          text: 'In practice, we never compute one neuron at a time. We group neurons into parallel layers. Stacking inputs as matrices and weights as matrices allows us to compute hundreds of neurons simultaneously in a single, lightning-fast matrix multiplication.',
        },
        {
          type: 'image',
          title: 'Data transformations through function processing pipelines',
          imageType: 'function-flow',
        },
        {
          type: 'diagram',
          title: 'Architecture of a 2-Layer Neural Network',
          boxes: [
            { id: 'i1', x: 20, y: 30, width: 60, height: 35, label: 'Input 1', color: '#2B6CB0' },
            { id: 'i2', x: 20, y: 90, width: 60, height: 35, label: 'Input 2', color: '#2B6CB0' },
            { id: 'h1', x: 130, y: 30, width: 60, height: 35, label: 'Hidden 1', color: '#E44D6E' },
            { id: 'h2', x: 130, y: 90, width: 60, height: 35, label: 'Hidden 2', color: '#E44D6E' },
            { id: 'out', x: 240, y: 60, width: 60, height: 35, label: 'Output', color: '#1D7A57' },
          ],
          arrows: [
            { from: 'i1', to: 'h1' },
            { from: 'i1', to: 'h2' },
            { from: 'i2', to: 'h1' },
            { from: 'i2', to: 'h2' },
            { from: 'h1', to: 'out' },
            { from: 'h2', to: 'out' },
          ],
          height: 160,
        },
        { type: 'divider' },
        { type: 'heading', text: 'Matrix Math in Python' },
        {
          type: 'paragraph',
          text: 'Let\'s represent a simple layer with 2 inputs and 3 hidden neurons using matrix multiplication.',
        },
        {
          type: 'formula',
          expression: 'H = \\text{ReLU}(X \\cdot W + B)',
          note: 'Standard representation of a neural network forward pass step.',
        },
        {
          type: 'playground',
          code: 'import numpy as np\n\n# 1 sample, 2 features\nx = np.array([[1.0, 2.0]]) \n\n# Weights: 2 features -> 3 hidden neurons\nW = np.array([[0.1, -0.2, 0.3], \n              [0.4,  0.5, 0.6]])\n\nb = np.array([0.1, 0.1, 0.1])\n\n# Dot product plus bias\nz = np.dot(x, W) + b\na = np.maximum(0, z) # ReLU activation\n\nprint(f"Pre-activation (z): {z}")\nprint(f"Layer Output (a): {a}")',
          expectedOutput: 'Pre-activation (z): [[0.9 0.9 1.6]]\nLayer Output (a): [[0.9 0.9 1.6]]',
        },
        {
          type: 'callout',
          variant: 'remember',
          title: 'Dimension Matching',
          body: 'For matrix dot product A @ B to succeed, the column size of A must match the row size of B. If your inputs are (BatchSize, Features), your weights MUST have dimensions (Features, OutputNeurons).',
        },
      ],
    },
    {
      id: 'dl-backprop',
      title: 'Training: Loss and Backprop',
      duration: '26 min',
      objective: 'Understand how a network updates its weights to learn.',
      blocks: [
        { type: 'heading', text: 'Feedback Loops: How AI Learns' },
        {
          type: 'paragraph',
          text: 'Computing outputs is only half the battle. To learn, the network needs a way to evaluate its performance (Loss Function) and a mathematically sound method to update weights to perform better next time (Backpropagation via the Chain Rule).',
        },
        {
          type: 'analogy',
          text: 'Imagine a factory assembly line creating complex machines. If the machine turns out wrong (high loss), a supervisor traces the errors backwards from the final output, identifying which workstation (weights) made the biggest errors, and tuning their tools accordingly.',
        },
        {
          type: 'stepByStep',
          title: 'The Neural Network Training Cycle',
          steps: [
            { title: 'Forward Pass', description: 'Process input data through layers to generate predictions.' },
            { title: 'Calculate Loss', description: 'Compute a penalty value indicating prediction discrepancy (e.g., Mean Squared Error).' },
            { title: 'Backward Pass (Backprop)', description: 'Use calculus chain rule to compute gradients (slopes of error) for each weight.' },
            { title: 'Weight Update', description: 'Adjust weights slightly in the direction that lowers the overall loss.' },
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'Gradient Descent Weight Update' },
        {
          type: 'playground',
          code: 'w = 0.50 # Current weight\ngradient = -0.25 # Slope of error curve\nlr = 0.1 # Learning rate\n\n# Adjust weight opposite to gradient\nnew_w = w - (lr * gradient)\nprint(f"Old weight: {w:.2f}")\nprint(f"Weight updated: {new_w:.2f}")',
          expectedOutput: 'Old weight: 0.50\nWeight updated: 0.53',
        },
        {
          type: 'formula',
          expression: 'W_{new} = W_{old} - \\eta \\cdot \\nabla L',
          note: 'Gradient descent weight update formula where eta is the learning rate.',
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Learning Rate Selection',
          body: 'If the learning rate (eta) is too small, training will take forever. If it is too large, the weight updates will bounce around wildly, overshoot the optimum, and completely fail to converge.',
        },
        {
          type: 'bullets',
          items: [
            'Loss functions measure prediction accuracy.',
            'Epoch represents one complete pass through all training data.',
            'Batch size divides datasets to perform incremental updates.',
          ],
        },
      ],
    },
  ],
  quiz: [
    { id: 'dl-q1', prompt: 'What does a single artificial neuron do?', options: ['Computes a weighted sum of inputs plus bias, then applies an activation', 'Stores data in a SQL database', 'Sorts an array', 'Generates random text'], answerIndex: 0, explanation: 'A neuron performs a dot product and passes it through an activation function.' },
    { id: 'dl-q2', prompt: 'Why do we need activation functions?', options: ['To introduce non-linearity so the network can learn complex patterns', 'To make the math run faster on CPU', 'To reduce memory usage', 'To convert text to numbers'], answerIndex: 0, explanation: 'Without non-linear activations, stacking multiple layers would collapse into a single linear transformation.' },
    { id: 'dl-q3', prompt: 'What does the ReLU function do?', options: ['Returns x if x > 0, else 0', 'Smashes all values between 0 and 1', 'Returns the square root of x', 'Adds 1 to x'], answerIndex: 0, explanation: 'ReLU (Rectified Linear Unit) is simply max(0, x).' },
    { id: 'dl-q4', prompt: 'In a forward pass, how do we compute a whole layer at once?', options: ['Matrix multiplication', 'A for-loop over every neuron', 'Random sampling', 'Sorting'], answerIndex: 0, explanation: 'Matrix multiplication (dot product) computes all neuron outputs simultaneously, which GPUs excel at.' },
    { id: 'dl-q5', prompt: 'What is a Loss Function?', options: ['A measure of how wrong the network\'s predictions are', 'The function that turns inputs to outputs', 'A way to compress data', 'The learning rate schedule'], answerIndex: 0, explanation: 'Loss (or Cost) tells the network the difference between its prediction and the true label.' },
    { id: 'dl-q6', prompt: 'What is Backpropagation?', options: ['Using the chain rule to compute gradients for every weight', 'Sending data backwards over the internet', 'A type of activation function', 'Initializing weights randomly'], answerIndex: 0, explanation: 'Backprop efficiently calculates how much each weight contributed to the error.' },
    { id: 'dl-q7', prompt: 'What does the Learning Rate control?', options: ['The step size taken during weight updates', 'How fast the code compiles', 'The number of layers in the network', 'The batch size'], answerIndex: 0, explanation: 'It multiplies the gradient to determine how aggressively to change the weights.' },
    { id: 'dl-q8', prompt: 'What happens if the learning rate is too high?', options: ['The model might overshoot the minimum and fail to converge', 'The model will train too perfectly', 'It will require more memory', 'The network becomes a decision tree'], answerIndex: 0, explanation: 'A massive learning rate causes the weights to bounce around wildly (divergence).' },
    { id: 'dl-q9', prompt: 'What is an Epoch?', options: ['One complete pass through the entire training dataset', 'One weight update', 'A single forward pass', 'The initialization phase'], answerIndex: 0, explanation: 'Training usually requires multiple epochs (passes over the full dataset).' },
    { id: 'dl-q10', prompt: 'Which activation is best for the final layer of a multi-class classification network?', options: ['Softmax', 'ReLU', 'Linear', 'Step'], answerIndex: 0, explanation: 'Softmax turns a vector of raw scores (logits) into a probability distribution that sums to 1.' },
  ],
  practice: [
    { id: 'dl-p1', title: 'Neuron Calculation', prompt: 'Calculate the output of a neuron with inputs [2.0, 1.0], weights [0.5, -0.5], bias 0.1, and ReLU activation.', starterCode: 'import numpy as np\nx = np.array([2.0, 1.0])\nw = np.array([0.5, -0.5])\nb = 0.1\n# Your code here: calc z, then relu', expectedOutput: 'Output: 0.6', hint: 'z = np.dot(x, w) + b\noutput = max(0, z)' },
    { id: 'dl-p2', title: 'ReLU Function', prompt: 'Write a ReLU function and apply it to [-5, 0, 5].', starterCode: 'import numpy as np\ndef relu(x):\n    pass # your code here\nprint(relu(np.array([-5, 0, 5])))', expectedOutput: '[0 0 5]', hint: 'return np.maximum(0, x)' },
    { id: 'dl-p3', title: 'Sigmoid Function', prompt: 'Write a sigmoid function and apply it to 0.', starterCode: 'import numpy as np\ndef sigmoid(x):\n    pass # your code here\nprint(sigmoid(0))', expectedOutput: '0.5', hint: 'return 1 / (1 + np.exp(-x))' },
    { id: 'dl-p4', title: 'Layer Output Shape', prompt: 'If input is (100, 20) and weights are (20, 50), what is the output shape?', starterCode: 'import numpy as np\nx = np.zeros((100, 20))\nw = np.zeros((20, 50))\noutput = np.dot(x, w)\nprint(output.shape)', expectedOutput: '(100, 50)', hint: 'Matrix math: (m×k) @ (k×n) -> (m×n)' },
    { id: 'dl-p5', title: 'Weight Update', prompt: 'Update a weight (w = 0.5) using gradient (-0.2) and learning rate (0.1).', starterCode: 'w = 0.5\ngradient = -0.2\nlr = 0.1\n# Your code here', expectedOutput: 'New w: 0.52', hint: 'w = w - (lr * gradient)' },
  ],
};
