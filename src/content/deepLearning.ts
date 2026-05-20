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
        { type: 'paragraph', text: 'A neuron takes inputs, multiplies them by weights, adds a bias, and passes the sum through an activation function to decide if it should "fire".' },
        { type: 'formula', expression: 'y = activation(w₁x₁ + w₂x₂ + ... + wₙxₙ + b)', note: 'This is just a dot product plus a bias.' },
        { type: 'playground', code: 'import numpy as np\nx = np.array([1.5, 2.0])\nw = np.array([0.8, -0.2])\nbias = 0.5\nz = np.dot(x, w) + bias\n# ReLU activation: max(0, z)\na = max(0, z)\nprint(f"Neuron output: {a:.2f}")', expectedOutput: 'Neuron output: 1.30' },
        { type: 'bullets', items: [
          'Weights (w) control the strength of each input.',
          'Bias (b) shifts the activation threshold.',
          'Without activation functions, a neural net is just linear regression.',
        ] },
      ],
    },
    {
      id: 'dl-activations',
      title: 'Activation Functions',
      duration: '22 min',
      objective: 'Learn why networks need non-linearity and which functions to use.',
      blocks: [
        { type: 'paragraph', text: 'Activation functions introduce non-linearity. This allows neural networks to learn complex, curved boundaries instead of just straight lines.' },
        { type: 'formula', expression: 'ReLU(x) = max(0, x)', note: 'The default choice for hidden layers.' },
        { type: 'formula', expression: 'Sigmoid(x) = 1 / (1 + e⁻ˣ)', note: 'Squashes values between 0 and 1. Good for binary classification output.' },
        { type: 'playground', code: 'import numpy as np\ndef relu(x): return np.maximum(0, x)\ndef sigmoid(x): return 1 / (1 + np.exp(-x))\nz = np.array([-2.0, 0.0, 2.0])\nprint(f"ReLU: {relu(z)}")\nprint(f"Sigmoid: {np.round(sigmoid(z), 2)}")', expectedOutput: 'ReLU: [0. 0. 2.]\nSigmoid: [0.12 0.5  0.88]' },
        { type: 'bullets', items: [
          'ReLU is fast and avoids the "vanishing gradient" problem.',
          'Softmax converts a vector of numbers into a probability distribution (summing to 1) — used for multi-class output.',
        ] },
      ],
    },
    {
      id: 'dl-forward',
      title: 'The Forward Pass',
      duration: '24 min',
      objective: 'Stack neurons into layers to build a multi-layer network.',
      blocks: [
        { type: 'paragraph', text: 'A layer is just a collection of neurons. The inputs connect to every neuron in the layer. We compute the whole layer at once using matrix multiplication.' },
        { type: 'formula', expression: 'Layer Output = Activation(Input @ Weights + Biases)', note: 'This is why GPUs are essential for Deep Learning (they are great at matrix math).' },
        { type: 'playground', code: 'import numpy as np\nx = np.array([[1.0, 2.0]]) # 1 sample, 2 features\n# Layer with 3 neurons\nW = np.array([[0.1, -0.2, 0.3], \n              [0.4,  0.5, 0.6]])\nb = np.array([0.1, 0.1, 0.1])\nz = np.dot(x, W) + b\na = np.maximum(0, z) # ReLU\nprint(f"Layer output: {np.round(a, 2)}")', expectedOutput: 'Layer output: [[1.  0.9 1.6]]' },
        { type: 'bullets', items: [
          'A "Deep" network just has multiple hidden layers (Output = L3(L2(L1(Input)))).',
          'Shapes must align: If Input is (Batch, Features), Weights must be (Features, Neurons).',
        ] },
      ],
    },
    {
      id: 'dl-backprop',
      title: 'Training: Loss and Backprop',
      duration: '26 min',
      objective: 'Understand how a network updates its weights to learn.',
      blocks: [
        { type: 'paragraph', text: 'To train, we need to know how wrong the network is (Loss). We then use Calculus (the Chain Rule) to figure out how to adjust every weight to make the loss smaller (Backpropagation).' },
        { type: 'formula', expression: 'New Weight = Old Weight - (Learning Rate × Gradient)', note: 'Gradient Descent algorithm.' },
        { type: 'bullets', items: [
          'Loss functions: MSE (Regression), Cross-Entropy (Classification).',
          'Gradient: The direction that increases the loss. We go the opposite way.',
          'Learning Rate: How big of a step to take. Too big = unstable, too small = slow.',
          'Epoch: One full pass over the training data.',
          'Batch Size: Updating weights after looking at a small chunk of data (Stochastic Gradient Descent).',
        ] },
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
