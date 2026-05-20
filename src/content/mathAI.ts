import { Sigma } from 'lucide-react-native';
import type { CourseModule } from '../types/course';

export const mathAICourse: CourseModule = {
  id: 'math-ai',
  title: 'Math for AI',
  subtitle: 'Statistics, probability, Bayes, distributions',
  color: '#D4A843',
  accent: '#FFF5DC',
  Icon: Sigma,
  history: {
    founder: 'Centuries of mathematicians',
    released: 'Ancient–Modern',
    summary:
      'Statistics and probability are the mathematical spine of AI. From Bayes\' theorem (1763) to modern gradient descent, every ML algorithm rests on these ideas.',
  },
  concepts: [
    'Mean, median, mode — measures of center',
    'Variance and standard deviation — spread',
    'Probability rules: P(A and B), P(A or B)',
    'Conditional probability and Bayes\' theorem',
    'Correlation vs causation',
    'Normal, uniform, and binomial distributions',
    'Expected value and law of large numbers',
    'Sampling and the Central Limit Theorem',
  ],
  lessons: [
    {
      id: 'math-central',
      title: 'Mean, Median, and Variance',
      duration: '20 min',
      objective: 'Summarize datasets with center and spread statistics.',
      blocks: [
        {
          type: 'paragraph',
          text: 'Before any model can learn, you must understand your data. Mean tells you the center, variance tells you how spread out values are, and standard deviation puts spread back into original units.',
        },
        {
          type: 'formula',
          expression: 'mean = Σxᵢ / n',
          note: 'Sum all values and divide by count.',
        },
        {
          type: 'formula',
          expression: 'variance = Σ(xᵢ - mean)² / n',
          note: 'Average squared distance from the mean.',
        },
        {
          type: 'formula',
          expression: 'std = √variance',
          note: 'Standard deviation is variance in original units.',
        },
        {
          type: 'playground',
          code: 'import numpy as np\ndata = np.array([4, 8, 6, 5, 3, 7, 9])\nprint(f"Mean: {data.mean():.2f}")\nprint(f"Std: {data.std():.2f}")\nprint(f"Median: {np.median(data):.2f}")',
          expectedOutput: 'Mean: 6.00\nStd: 1.90\nMedian: 6.00',
        },
        {
          type: 'bullets',
          items: [
            'Median is robust to outliers — use it when data is skewed.',
            'High variance means the model needs more data or regularization.',
            'Always check spread before training — features on different scales cause problems.',
          ],
        },
      ],
    },
    {
      id: 'math-probability',
      title: 'Probability Basics',
      duration: '22 min',
      objective: 'Reason about uncertain events using probability rules.',
      blocks: [
        {
          type: 'paragraph',
          text: 'AI models output probabilities. Understanding how to combine, condition, and interpret probabilities is essential for building classifiers and making predictions.',
        },
        {
          type: 'formula',
          expression: 'P(A) = favorable outcomes / total outcomes',
          note: 'Probability is always between 0 (impossible) and 1 (certain).',
        },
        {
          type: 'formula',
          expression: 'P(A or B) = P(A) + P(B) - P(A and B)',
          note: 'Subtract the overlap to avoid double-counting.',
        },
        {
          type: 'formula',
          expression: 'P(A and B) = P(A) × P(B)  [if independent]',
        },
        {
          type: 'playground',
          code: 'p_rain = 0.3\np_umbrella = 0.6\np_both = 0.25\np_either = p_rain + p_umbrella - p_both\nprint(f"P(rain or umbrella) = {p_either}")',
          expectedOutput: 'P(rain or umbrella) = 0.65',
        },
        {
          type: 'bullets',
          items: [
            'Independent events: one doesn\'t affect the other\'s probability.',
            'Mutually exclusive: P(A and B) = 0, so P(A or B) = P(A) + P(B).',
            'Complement: P(not A) = 1 - P(A).',
            'ML classifiers output P(class | features) — conditional probability.',
          ],
        },
      ],
    },
    {
      id: 'math-bayes',
      title: 'Bayes\' Theorem',
      duration: '25 min',
      objective: 'Update beliefs with evidence using Bayes\' rule.',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bayes\' theorem is the engine behind spam filters, medical diagnosis models, and Bayesian neural networks. It tells you how to update your belief when new evidence arrives.',
        },
        {
          type: 'formula',
          expression: 'P(A|B) = P(B|A) × P(A) / P(B)',
          note: 'Posterior = Likelihood × Prior / Evidence.',
        },
        {
          type: 'paragraph',
          text: 'Example: A test is 95% accurate. The disease affects 1% of people. If you test positive, what is the actual probability you have the disease?',
        },
        {
          type: 'playground',
          code: 'p_disease = 0.01\np_positive_given_disease = 0.95\np_positive_given_healthy = 0.05\np_positive = p_positive_given_disease * p_disease + p_positive_given_healthy * (1 - p_disease)\np_disease_given_positive = (p_positive_given_disease * p_disease) / p_positive\nprint(f"P(disease | positive) = {p_disease_given_positive:.3f}")',
          expectedOutput: 'P(disease | positive) = 0.161',
        },
        {
          type: 'bullets',
          items: [
            'The prior P(A) is your belief before seeing data.',
            'The likelihood P(B|A) is how probable the evidence is given the hypothesis.',
            'The posterior P(A|B) is your updated belief after seeing evidence.',
            'Even a 95% accurate test gives only 16% certainty for a rare disease — base rates matter!',
          ],
        },
      ],
    },
    {
      id: 'math-correlation',
      title: 'Correlation and Covariance',
      duration: '20 min',
      objective: 'Measure relationships between variables.',
      blocks: [
        {
          type: 'paragraph',
          text: 'Correlation tells you if two variables move together. It ranges from -1 (perfectly opposite) to +1 (perfectly together). 0 means no linear relationship.',
        },
        {
          type: 'formula',
          expression: 'r = Σ(xᵢ - x̄)(yᵢ - ȳ) / √[Σ(xᵢ - x̄)² × Σ(yᵢ - ȳ)²]',
          note: 'Pearson correlation coefficient.',
        },
        {
          type: 'playground',
          code: 'import numpy as np\nhours = np.array([1, 2, 3, 4, 5])\nscores = np.array([50, 60, 65, 80, 90])\ncorrelation = np.corrcoef(hours, scores)[0, 1]\nprint(f"Correlation: {correlation:.3f}")',
          expectedOutput: 'Correlation: 0.986',
        },
        {
          type: 'bullets',
          items: [
            'Correlation ≠ causation — ice cream sales correlate with drownings (both rise in summer).',
            'Covariance measures joint variability but isn\'t normalized.',
            'Feature selection in ML often starts by checking correlations.',
            'Highly correlated features (multicollinearity) can hurt linear models.',
          ],
        },
      ],
    },
    {
      id: 'math-distributions',
      title: 'Distributions',
      duration: '22 min',
      objective: 'Recognize and use normal, uniform, and binomial distributions.',
      blocks: [
        {
          type: 'paragraph',
          text: 'Distributions describe the shape of data. The normal distribution (bell curve) appears everywhere in nature and is assumed by many ML algorithms.',
        },
        {
          type: 'formula',
          expression: 'Normal: f(x) = (1/σ√2π) × e^(-(x-μ)²/2σ²)',
          note: 'μ is the mean (center), σ is the standard deviation (width).',
        },
        {
          type: 'formula',
          expression: '68-95-99.7 rule: 68% within 1σ, 95% within 2σ, 99.7% within 3σ',
        },
        {
          type: 'playground',
          code: 'import numpy as np\nnp.random.seed(42)\nsamples = np.random.normal(loc=100, scale=15, size=1000)\nprint(f"Mean: {samples.mean():.1f}")\nprint(f"Std: {samples.std():.1f}")\nwithin_1_std = np.sum(np.abs(samples - samples.mean()) < samples.std()) / len(samples)\nprint(f"Within 1 std: {within_1_std:.1%}")',
          expectedOutput: 'Mean: 99.8\nStd: 15.1\nWithin 1 std: 68.4%',
        },
        {
          type: 'bullets',
          items: [
            'Uniform: all outcomes equally likely (e.g., a fair die).',
            'Binomial: number of successes in n trials (e.g., coin flips).',
            'Normal: most natural phenomena (heights, errors, scores).',
            'Standardization: z = (x - μ) / σ converts to standard normal.',
            'The Central Limit Theorem: sample means tend toward normal regardless of original distribution.',
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: 'math-q1',
      prompt: 'What does standard deviation measure?',
      options: ['Spread of data from the mean', 'The most common value', 'The middle value', 'The range of data'],
      answerIndex: 0,
      explanation: 'Standard deviation quantifies how much values deviate from the mean.',
    },
    {
      id: 'math-q2',
      prompt: 'What is P(not A) if P(A) = 0.3?',
      options: ['0.7', '0.3', '1.3', '0.0'],
      answerIndex: 0,
      explanation: 'P(not A) = 1 - P(A) = 1 - 0.3 = 0.7.',
    },
    {
      id: 'math-q3',
      prompt: 'In Bayes\' theorem, what is the "prior"?',
      options: ['Your belief before seeing evidence', 'The probability of the evidence', 'The test accuracy', 'The sample size'],
      answerIndex: 0,
      explanation: 'The prior P(A) represents your initial belief before new data.',
    },
    {
      id: 'math-q4',
      prompt: 'A correlation of -0.9 means:',
      options: ['Strong negative linear relationship', 'No relationship', 'Strong positive relationship', 'Causation is proven'],
      answerIndex: 0,
      explanation: 'Values near -1 indicate a strong inverse linear relationship.',
    },
    {
      id: 'math-q5',
      prompt: 'What percentage of data falls within 2 standard deviations of the mean in a normal distribution?',
      options: ['95%', '68%', '99.7%', '50%'],
      answerIndex: 0,
      explanation: 'The 68-95-99.7 rule: ~95% falls within 2σ of the mean.',
    },
    {
      id: 'math-q6',
      prompt: 'Why is median preferred over mean for skewed data?',
      options: ['It is not affected by outliers', 'It is easier to compute', 'It is always larger', 'It works only with integers'],
      answerIndex: 0,
      explanation: 'Outliers pull the mean but don\'t affect the median.',
    },
    {
      id: 'math-q7',
      prompt: 'What does "correlation does not imply causation" mean?',
      options: ['Two variables can move together without one causing the other', 'Correlation is always zero', 'Causation cannot be measured', 'You need more data'],
      answerIndex: 0,
      explanation: 'A hidden third variable (confound) can make unrelated variables appear correlated.',
    },
    {
      id: 'math-q8',
      prompt: 'What distribution models the number of heads in 10 coin flips?',
      options: ['Binomial', 'Normal', 'Uniform', 'Exponential'],
      answerIndex: 0,
      explanation: 'Binomial distribution models the count of successes in fixed independent trials.',
    },
    {
      id: 'math-q9',
      prompt: 'What does the Central Limit Theorem state?',
      options: ['Sample means approach a normal distribution', 'All data is normal', 'Larger samples are always better', 'Mean equals median'],
      answerIndex: 0,
      explanation: 'Regardless of the population shape, sample means tend toward normal as sample size grows.',
    },
    {
      id: 'math-q10',
      prompt: 'If variance is 25, what is the standard deviation?',
      options: ['5', '25', '625', '12.5'],
      answerIndex: 0,
      explanation: 'Standard deviation = √variance = √25 = 5.',
    },
  ],
  practice: [
    {
      id: 'math-p1',
      title: 'Compute Mean and Std',
      prompt: 'Calculate mean and standard deviation of a dataset.',
      starterCode: 'import numpy as np\ndata = np.array([4, 8, 6, 5, 3, 7, 9])\nprint(f"Mean: {data.mean():.2f}")\nprint(f"Std: {data.std():.2f}")',
      expectedOutput: 'Mean: 6.00\nStd: 1.90',
      hint: 'Use .mean() and .std() on a NumPy array.',
    },
    {
      id: 'math-p2',
      title: 'Probability Union',
      prompt: 'Calculate P(A or B) given P(A), P(B), and P(A and B).',
      starterCode: 'p_a = 0.4\np_b = 0.5\np_both = 0.2\nprint(f"P(A or B) = {p_a + p_b - p_both}")',
      expectedOutput: 'P(A or B) = 0.7',
      hint: 'P(A or B) = P(A) + P(B) - P(A and B).',
    },
    {
      id: 'math-p3',
      title: 'Bayes Calculator',
      prompt: 'Compute the posterior probability using Bayes\' theorem.',
      starterCode: 'p_disease = 0.01\np_pos_disease = 0.95\np_pos_healthy = 0.05\np_pos = p_pos_disease * p_disease + p_pos_healthy * (1 - p_disease)\nposterior = (p_pos_disease * p_disease) / p_pos\nprint(f"Posterior: {posterior:.3f}")',
      expectedOutput: 'Posterior: 0.161',
      hint: 'Apply Bayes: P(D|+) = P(+|D)*P(D) / P(+).',
    },
    {
      id: 'math-p4',
      title: 'Correlation',
      prompt: 'Compute the Pearson correlation between hours and scores.',
      starterCode: 'import numpy as np\nhours = np.array([1, 2, 3, 4, 5])\nscores = np.array([50, 60, 65, 80, 90])\nr = np.corrcoef(hours, scores)[0, 1]\nprint(f"r = {r:.3f}")',
      expectedOutput: 'r = 0.986',
      hint: 'np.corrcoef returns a matrix; [0,1] gives the correlation.',
    },
    {
      id: 'math-p5',
      title: 'Normal Samples',
      prompt: 'Generate normal samples and check what fraction is within 1 std.',
      starterCode: 'import numpy as np\nnp.random.seed(0)\ndata = np.random.normal(50, 10, 1000)\nwithin = np.sum(np.abs(data - data.mean()) < data.std()) / len(data)\nprint(f"Within 1 std: {within:.1%}")',
      expectedOutput: 'Within 1 std: 68.8%',
      hint: 'About 68% of normal data falls within 1 standard deviation.',
    },
    {
      id: 'math-p6',
      title: 'Z-Score',
      prompt: 'Standardize a value: compute its z-score.',
      starterCode: 'mean = 100\nstd = 15\nvalue = 130\nz = (value - mean) / std\nprint(f"Z-score: {z:.2f}")',
      expectedOutput: 'Z-score: 2.00',
      hint: 'z = (x - mean) / std. A z of 2 means 2 std above the mean.',
    },
  ],
};
