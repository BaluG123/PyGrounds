import type { Difficulty, MindCategory, MindQuestion } from '../types/mindQuiz';

function q(
  id: string,
  category: MindCategory,
  difficulty: Difficulty,
  question: string,
  rawOptions: number[],
  answer: number,
  explanation: string,
): MindQuestion {
  const uniqueOptions = Array.from(new Set([answer, ...rawOptions])).slice(0, 4);
  while (uniqueOptions.length < 4) {
    uniqueOptions.push(answer + uniqueOptions.length + 1);
  }

  const shift = Math.abs(id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)) % 4;
  const options = [...uniqueOptions.slice(shift), ...uniqueOptions.slice(0, shift)].map(String) as [string, string, string, string];
  return {
    id,
    category,
    difficulty,
    question,
    options,
    answerIndex: options.indexOf(String(answer)),
    explanation,
  };
}

function textQ(
  id: string,
  category: MindCategory,
  difficulty: Difficulty,
  question: string,
  answer: string,
  rawOptions: string[],
  explanation: string,
): MindQuestion {
  const uniqueOptions = Array.from(new Set([answer, ...rawOptions])).slice(0, 4);
  while (uniqueOptions.length < 4) {
    uniqueOptions.push(`Related idea ${uniqueOptions.length + 1}`);
  }

  const shift = Math.abs(id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)) % 4;
  const options = [...uniqueOptions.slice(shift), ...uniqueOptions.slice(0, shift)] as [string, string, string, string];
  return {
    id,
    category,
    difficulty,
    question,
    options,
    answerIndex: options.indexOf(answer),
    explanation,
  };
}

const generatedQuestions: MindQuestion[] = [];

function add(question: MindQuestion) {
  generatedQuestions.push(question);
}

const difficultyOffsets: Record<Difficulty, number> = { easy: 0, medium: 1000, hard: 2000 };

(['easy', 'medium', 'hard'] as Difficulty[]).forEach(difficulty => {
  const offset = difficultyOffsets[difficulty];
  const limit = difficulty === 'easy' ? 45 : difficulty === 'medium' ? 55 : 65;
  const multiplier = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;

  for (let i = 1; i <= 45; i += 1) {
    const a = i + 6 + multiplier;
    const b = (i % 12) + 4 + multiplier;
    const answer = a + b;
    add(q(
      `arith-add-${difficulty}-${i}`,
      'arithmetic',
      difficulty,
      `${a} + ${b} = ?`,
      [answer - 1, answer + 2, answer + 5],
      answer,
      `Add ${a} and ${b}: ${a} + ${b} = ${answer}.`,
    ));
  }

  for (let i = 1; i <= 35; i += 1) {
    const a = offset / 10 + i * (difficulty === 'hard' ? 9 : difficulty === 'medium' ? 6 : 3) + 40;
    const b = (i % limit) + 7;
    const answer = a - b;
    add(q(
      `arith-sub-${difficulty}-${i}`,
      'arithmetic',
      difficulty,
      `${a} - ${b} = ?`,
      [answer - 3, answer + 4, answer + 8],
      answer,
      `Subtract carefully: ${a} - ${b} = ${answer}.`,
    ));
  }

  for (let i = 1; i <= 35; i += 1) {
    const a = (i % 18) + 3 + multiplier;
    const b = (i % 11) + 2 + multiplier;
    const answer = a * b;
    add(q(
      `arith-mul-${difficulty}-${i}`,
      'arithmetic',
      difficulty,
      `${a} x ${b} = ?`,
      [answer - a, answer + b, answer + a + b],
      answer,
      `Multiply ${a} by ${b}: ${a} x ${b} = ${answer}.`,
    ));
  }

  for (let i = 1; i <= 45; i += 1) {
    const start = i + multiplier;
    const step = (i % 7) + 2 + multiplier;
    const answer = start + step * 4;
    add(q(
      `series-linear-${difficulty}-${i}`,
      'series',
      difficulty,
      `${start}, ${start + step}, ${start + step * 2}, ${start + step * 3}, ?`,
      [answer - step, answer + step, answer + 2],
      answer,
      `The pattern adds ${step} each time, so the next number is ${answer}.`,
    ));
  }

  for (let i = 1; i <= 35; i += 1) {
    const start = (i % 4) + 2;
    const factor = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4;
    const answer = start * factor ** 4;
    add(q(
      `series-multiply-${difficulty}-${i}`,
      'series',
      difficulty,
      `${start}, ${start * factor}, ${start * factor ** 2}, ${start * factor ** 3}, ?`,
      [answer / factor, answer + factor, answer - factor],
      answer,
      `Each term is multiplied by ${factor}.`,
    ));
  }

  for (let i = 1; i <= 45; i += 1) {
    const a = (i % 9) + 2 + multiplier;
    const b = (i % 6) + 3;
    const c = (i % 5) + 2;
    const answer = a + b * c;
    add(q(
      `mixed-bodmas-${difficulty}-${i}`,
      'mixed-ops',
      difficulty,
      `${a} + ${b} x ${c} = ?`,
      [(a + b) * c, answer - c, answer + b],
      answer,
      `Use order of operations: multiply first (${b} x ${c}), then add ${a}.`,
    ));
  }

  for (let i = 1; i <= 35; i += 1) {
    const a = (i % 10) + 5 + multiplier;
    const b = (i % 8) + 2;
    const c = (i % 4) + 2;
    const answer = (a - b) * c;
    add(q(
      `mixed-brackets-${difficulty}-${i}`,
      'mixed-ops',
      difficulty,
      `(${a} - ${b}) x ${c} = ?`,
      [a - b * c, answer + c, answer - b],
      answer,
      `Solve brackets first: ${a} - ${b} = ${a - b}, then multiply by ${c}.`,
    ));
  }

  for (let i = 1; i <= 45; i += 1) {
    const a = (i % 20) + 5 + multiplier;
    const b = (i % 13) + 3;
    const answer = difficulty === 'hard' ? a * b : a + b;
    add(q(
      `speed-${difficulty}-${i}`,
      'speed',
      difficulty,
      difficulty === 'hard' ? `${a} x ${b} = ?` : `${a} + ${b} = ?`,
      [answer - 2, answer + 3, answer + 6],
      answer,
      difficulty === 'hard' ? `${a} x ${b} = ${answer}.` : `${a} + ${b} = ${answer}.`,
    ));
  }
});

const aiRecallBank: {
  category: MindCategory;
  difficulty: Difficulty;
  question: string;
  answer: string;
  options: string[];
  explanation: string;
}[] = [
  {
    category: 'ai-foundations',
    difficulty: 'easy',
    question: 'What does a feature mean in machine learning?',
    answer: 'An input variable used by a model',
    options: ['The final app icon', 'Only the target label', 'A random UI color'],
    explanation: 'Features are the input signals a model uses to learn patterns.',
  },
  {
    category: 'ai-foundations',
    difficulty: 'easy',
    question: 'What does the target variable usually represent?',
    answer: 'The value or class the model should predict',
    options: ['The import statement', 'The chart title', 'The app version'],
    explanation: 'The target, often called y, is the expected output during supervised learning.',
  },
  {
    category: 'ai-foundations',
    difficulty: 'easy',
    question: 'Why do AI learners study NumPy?',
    answer: 'For fast arrays and vector math',
    options: ['For mobile navigation only', 'For writing privacy policies', 'For replacing all databases'],
    explanation: 'NumPy gives AI learners efficient numeric arrays and vectorized operations.',
  },
  {
    category: 'ai-foundations',
    difficulty: 'easy',
    question: 'Why do AI learners study Pandas?',
    answer: 'To clean and analyze tabular data',
    options: ['To train robots directly', 'To design icons', 'To make network requests only'],
    explanation: 'Pandas is essential for DataFrames, cleaning, joins, grouping, and analysis.',
  },
  {
    category: 'ai-foundations',
    difficulty: 'medium',
    question: 'What is data leakage?',
    answer: 'Training with information that would not be available in real use',
    options: ['A chart rendering issue', 'A missing semicolon', 'A faster GPU setting'],
    explanation: 'Leakage makes validation look great but causes real-world failure.',
  },
  {
    category: 'ai-foundations',
    difficulty: 'medium',
    question: 'Why split data into train and test sets?',
    answer: 'To estimate performance on unseen data',
    options: ['To reduce font size', 'To delete labels', 'To avoid importing libraries'],
    explanation: 'A test set checks whether the model generalizes beyond the training examples.',
  },
  {
    category: 'ai-foundations',
    difficulty: 'medium',
    question: 'What does standardization usually do?',
    answer: 'Centers features and scales them by spread',
    options: ['Turns labels into images', 'Deletes missing rows always', 'Changes Python syntax'],
    explanation: 'Standardization often makes features mean 0 and standard deviation 1.',
  },
  {
    category: 'ai-foundations',
    difficulty: 'hard',
    question: 'What is the central risk of correlation-based reasoning?',
    answer: 'Correlation can hide confounders and does not prove causation',
    options: ['It always proves causation', 'It removes all noise', 'It replaces experiments'],
    explanation: 'A hidden third factor can create misleading correlations.',
  },
  {
    category: 'ai-foundations',
    difficulty: 'hard',
    question: 'Why does gradient descent need a learning rate?',
    answer: 'To control the size of parameter updates',
    options: ['To choose app language', 'To sort DataFrame columns alphabetically', 'To remove test data'],
    explanation: 'Too small can be slow; too large can overshoot useful minima.',
  },
  {
    category: 'ml-recall',
    difficulty: 'easy',
    question: 'Which ML task predicts a number?',
    answer: 'Regression',
    options: ['Classification', 'Clustering', 'Tokenization'],
    explanation: 'Regression predicts continuous numeric values.',
  },
  {
    category: 'ml-recall',
    difficulty: 'easy',
    question: 'Which ML task predicts a category?',
    answer: 'Classification',
    options: ['Regression', 'Standardization', 'Backpropagation'],
    explanation: 'Classification predicts labels such as spam or not spam.',
  },
  {
    category: 'ml-recall',
    difficulty: 'easy',
    question: 'Which ML task finds groups without labels?',
    answer: 'Clustering',
    options: ['Regression', 'Prompting', 'Compilation'],
    explanation: 'Clustering discovers groups in unlabeled data.',
  },
  {
    category: 'ml-recall',
    difficulty: 'medium',
    question: 'When is recall especially important?',
    answer: 'When missing true positives is costly',
    options: ['When false negatives do not matter', 'When there are no labels', 'When only UI color matters'],
    explanation: 'Recall measures how many actual positives the model catches.',
  },
  {
    category: 'ml-recall',
    difficulty: 'medium',
    question: 'What does overfitting mean?',
    answer: 'The model memorizes training data and fails on new data',
    options: ['The model is too simple for all data', 'The model has no features', 'The app has too many screens'],
    explanation: 'Overfitting shows high train performance but weak generalization.',
  },
  {
    category: 'ml-recall',
    difficulty: 'medium',
    question: 'What does cross-validation improve?',
    answer: 'Reliability of performance estimates across splits',
    options: ['Screen brightness', 'Package installation speed', 'Button radius only'],
    explanation: 'Cross-validation evaluates the model on multiple train/validation splits.',
  },
  {
    category: 'ml-recall',
    difficulty: 'hard',
    question: 'Why use a baseline model?',
    answer: 'To set a minimum performance bar before complex models',
    options: ['To skip evaluation', 'To hide data leakage', 'To avoid all metrics'],
    explanation: 'If a complex model cannot beat a baseline, the approach needs debugging.',
  },
  {
    category: 'ml-recall',
    difficulty: 'hard',
    question: 'What does calibration measure?',
    answer: 'Whether predicted probabilities match real frequencies',
    options: ['Whether code has comments', 'Whether images are square', 'Whether labels are strings'],
    explanation: 'A calibrated 80% prediction should be correct about 80% of the time.',
  },
  {
    category: 'genai-recall',
    difficulty: 'easy',
    question: 'What is an LLM primarily trained to predict?',
    answer: 'Useful next tokens from context',
    options: ['Battery level', 'Screen size', 'Only database rows'],
    explanation: 'Language models generate text by predicting tokens conditioned on context.',
  },
  {
    category: 'genai-recall',
    difficulty: 'easy',
    question: 'What does RAG add to a chatbot?',
    answer: 'Retrieved external context',
    options: ['A bigger button', 'A random timer', 'A hidden image filter'],
    explanation: 'RAG retrieves relevant documents and gives them to the model.',
  },
  {
    category: 'genai-recall',
    difficulty: 'easy',
    question: 'What is a prompt?',
    answer: 'Instructions and context given to a model',
    options: ['Only a password', 'Only a chart type', 'Only a file extension'],
    explanation: 'Prompts steer model behavior with task, context, constraints, and output format.',
  },
  {
    category: 'genai-recall',
    difficulty: 'medium',
    question: 'Why are embeddings useful in RAG?',
    answer: 'They represent meaning for semantic search',
    options: ['They replace all prompts', 'They make code run offline always', 'They remove citations'],
    explanation: 'Embeddings let systems search by semantic similarity, not exact words only.',
  },
  {
    category: 'genai-recall',
    difficulty: 'medium',
    question: 'What is tool calling?',
    answer: 'Letting a model request a structured external action',
    options: ['Changing app theme', 'Deleting all source data', 'Avoiding validation'],
    explanation: 'Tool calling lets LLM apps use APIs, calculators, search, databases, or code.',
  },
  {
    category: 'genai-recall',
    difficulty: 'medium',
    question: 'What makes Agentic RAG different from basic RAG?',
    answer: 'The agent can plan retrieval steps and refine queries',
    options: ['It never retrieves documents', 'It removes evaluation', 'It only changes fonts'],
    explanation: 'Agentic RAG can decide what to search, inspect results, and retrieve again.',
  },
  {
    category: 'genai-recall',
    difficulty: 'hard',
    question: 'What should a grounded RAG answer include?',
    answer: 'An answer supported by retrieved evidence',
    options: ['A confident guess without context', 'No source checking', 'Only random examples'],
    explanation: 'Grounding reduces hallucination by tying answers to retrieved context.',
  },
  {
    category: 'genai-recall',
    difficulty: 'hard',
    question: 'Why run LLM evals before release?',
    answer: 'To catch regressions in quality, safety, format, and grounding',
    options: ['To avoid testing user flows', 'To increase hallucinations', 'To remove logs'],
    explanation: 'Evals protect production apps from silent behavior changes.',
  },
];

(['easy', 'medium', 'hard'] as Difficulty[]).forEach(difficulty => {
  (['ai-foundations', 'ml-recall', 'genai-recall'] as MindCategory[]).forEach(category => {
    const base = aiRecallBank.filter(item => item.category === category);
    const byDifficulty = aiRecallBank.filter(item => item.category === category && item.difficulty === difficulty);
    const pool = byDifficulty.length ? byDifficulty : base;

    for (let i = 0; i < 30; i += 1) {
      const item = pool[i % pool.length];
      add(textQ(
        `${category}-${difficulty}-${i + 1}`,
        category,
        difficulty,
        item.question,
        item.answer,
        item.options,
        item.explanation,
      ));
    }
  });
});

export const mindQuestions: MindQuestion[] = generatedQuestions;

export function getQuestionsByCategory(
  category: MindQuestion['category'],
  difficulty: MindQuestion['difficulty'],
  count = 20,
): MindQuestion[] {
  const filtered = mindQuestions.filter(item => item.category === category && item.difficulty === difficulty);
  return [...filtered]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(count, filtered.length));
}

export function getQuestionCount(category: MindCategory, difficulty: Difficulty): number {
  return mindQuestions.filter(item => item.category === category && item.difficulty === difficulty).length;
}
