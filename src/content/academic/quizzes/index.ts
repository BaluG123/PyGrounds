import type { AcademicTrackQuiz } from '../../../types/academicQuiz';

export const ACADEMIC_TRACK_QUIZZES: AcademicTrackQuiz[] = [
  {
    trackId: 'track-python-foundation',
    title: 'Python Foundations Quiz',
    subtitle: 'Variables, control flow, data structures, and OOP',
    questions: [
      { id: 'py-q1', tag: 'Basics', prompt: 'Which type is mutable in Python?', options: ['tuple', 'list', 'str', 'int'], answerIndex: 1, explanation: 'Lists are mutable—you can append, remove, and reassign elements in place.' },
      { id: 'py-q2', tag: 'Functions', prompt: 'What does `return` do inside a function?', options: ['Prints a value', 'Sends a value back to the caller', 'Stops the entire program', 'Imports a module'], answerIndex: 1, explanation: 'return exits the function and passes a value back to whoever called it.' },
      { id: 'py-q3', tag: 'Data', prompt: 'Which structure maps keys to values?', options: ['list', 'set', 'dict', 'tuple'], answerIndex: 2, explanation: 'Dictionaries store key-value pairs—ideal for feature names → values in ML pipelines.' },
      { id: 'py-q4', tag: 'OOP', prompt: 'In a class, `self` refers to…', options: ['The parent class', 'The current instance', 'A global variable', 'The module name'], answerIndex: 1, explanation: 'self is the instance receiving the method call—the object whose state you are updating.' },
      { id: 'py-q5', tag: 'Patterns', prompt: 'List comprehensions are preferred over loops when…', options: ['You need side effects', 'You are building a new list from an iterable', 'You modify global state', 'You use break/continue'], answerIndex: 1, explanation: 'Comprehensions express transform-and-filter logic concisely and run faster than manual loops.' },
      { id: 'py-q6', tag: 'Errors', prompt: 'try/except is used to…', options: ['Speed up code', 'Handle runtime errors gracefully', 'Define classes', 'Import packages'], answerIndex: 1, explanation: 'Exception handling lets your program recover from bad input or network failures instead of crashing.' },
    ],
  },
  {
    trackId: 'track-data-science',
    title: 'Data Science Quiz',
    subtitle: 'NumPy, Pandas, and exploratory analysis',
    questions: [
      { id: 'ds-q1', tag: 'NumPy', prompt: 'Broadcasting allows…', options: ['Only same-shape arrays to operate', 'Smaller arrays to expand to match larger ones', 'Strings to become numbers', 'GPU training'], answerIndex: 1, explanation: 'NumPy aligns trailing dimensions and repeats size-1 axes so element-wise ops work without loops.' },
      { id: 'ds-q2', tag: 'NumPy', prompt: 'A @ B in NumPy performs…', options: ['Element-wise multiply', 'Matrix multiplication', 'Concatenation', 'Transpose'], answerIndex: 1, explanation: '@ is matrix multiply—inner dimensions must match: (m×n)(n×p) → (m×p).' },
      { id: 'ds-q3', tag: 'Pandas', prompt: 'df.loc selects by…', options: ['Integer position only', 'Label/index', 'Random sampling', 'SQL query'], answerIndex: 1, explanation: 'loc uses row/column labels; iloc uses integer positions.' },
      { id: 'ds-q4', tag: 'Cleaning', prompt: 'Data leakage in ML often happens when…', options: ['You use too many epochs', 'Test-set information influences training preprocessing', 'You pick Python over R', 'You plot histograms'], answerIndex: 1, explanation: 'Fitting scalers or encoders on the full dataset before splitting leaks future information into training.' },
      { id: 'ds-q5', tag: 'Viz', prompt: 'A histogram shows…', options: ['Correlation between two variables', 'Distribution of one variable', 'Network architecture', 'Loss over time'], answerIndex: 1, explanation: 'Histograms bin a single variable to reveal skew, outliers, and multimodal patterns.' },
      { id: 'ds-q6', tag: 'Stats', prompt: 'Standardizing features means…', options: ['Replacing NaN with zero', 'Subtract mean and divide by std per column', 'One-hot encoding', 'Log transform only'], answerIndex: 1, explanation: 'Z-score scaling puts features on comparable scales—critical before distance-based or gradient methods.' },
    ],
  },
  {
    trackId: 'track-math-for-ai',
    title: 'Math for AI Quiz',
    subtitle: 'Linear algebra, calculus, and probability',
    questions: [
      { id: 'math-q1', tag: 'LA', prompt: 'The dot product measures…', options: ['Matrix inverse', 'Alignment / similarity of vectors', 'Determinant', 'Rank'], answerIndex: 1, explanation: 'Dot product is high when vectors point the same direction—core to attention and cosine similarity.' },
      { id: 'math-q2', tag: 'LA', prompt: 'det(A) = 0 means…', options: ['A is identity', 'A has no inverse', 'A is orthogonal', 'A is diagonal'], answerIndex: 1, explanation: 'Zero determinant → singular matrix → no unique inverse.' },
      { id: 'math-q3', tag: 'Calc', prompt: 'The gradient points…', options: ['Toward steepest ascent', 'Always to zero', 'Randomly', 'Along the x-axis only'], answerIndex: 0, explanation: '∇f points uphill; gradient descent moves opposite to reduce loss.' },
      { id: 'math-q4', tag: 'Calc', prompt: 'Backpropagation is…', options: ['A data augmentation trick', 'Chain rule applied through layers', 'A type of CNN', 'Batch normalization'], answerIndex: 1, explanation: 'Gradients flow backward by multiplying local derivatives through the computation graph.' },
      { id: 'math-q5', tag: 'Prob', prompt: "Bayes' theorem updates…", options: ['Learning rate', 'Prior beliefs with evidence', 'Weight matrices only', 'Batch size'], answerIndex: 1, explanation: 'P(A|B) combines prior P(A) with likelihood P(B|A) to form a posterior.' },
      { id: 'math-q6', tag: 'Info', prompt: 'Cross-entropy loss in classification measures…', options: ['L2 weight penalty', 'Mismatch between predicted and true distributions', 'GPU memory', 'Learning rate decay'], answerIndex: 1, explanation: 'CE penalizes confident wrong predictions heavily—standard for softmax outputs.' },
    ],
  },
  {
    trackId: 'track-machine-learning',
    title: 'Machine Learning Quiz',
    subtitle: 'Supervised learning, evaluation, and regularization',
    questions: [
      { id: 'ml-q1', tag: 'Basics', prompt: 'Supervised learning uses…', options: ['Only unlabeled data', 'Labeled input-output pairs', 'Random rewards', 'No data'], answerIndex: 1, explanation: 'Supervised methods learn f(x) → y from labeled examples.' },
      { id: 'ml-q2', tag: 'Metrics', prompt: 'High accuracy can mislead when…', options: ['Classes are balanced', 'Classes are imbalanced', 'Data is clean', 'Features are scaled'], answerIndex: 1, explanation: 'A majority-class classifier gets high accuracy but fails on rare positive cases—use precision/recall/F1.' },
      { id: 'ml-q3', tag: 'Bias-Var', prompt: 'Overfitting means…', options: ['High training error', 'Low training error, high validation error', 'Both errors high', 'Perfect generalization'], answerIndex: 1, explanation: 'The model memorizes training noise and fails on unseen data.' },
      { id: 'ml-q4', tag: 'Reg', prompt: 'L2 regularization tends to…', options: ['Zero out weights entirely', 'Shrink weights toward zero', 'Increase model capacity', 'Remove the bias term'], answerIndex: 1, explanation: 'Ridge penalty λΣw² discourages large weights and reduces variance.' },
      { id: 'ml-q5', tag: 'Eval', prompt: 'Why use a validation set?', options: ['To train faster', 'To tune hyperparameters without touching the test set', 'To replace training data', 'To deploy models'], answerIndex: 1, explanation: 'Validation estimates generalization during development; test set is the final unbiased check.' },
      { id: 'ml-q6', tag: 'Pipelines', prompt: 'sklearn Pipeline prevents leakage by…', options: ['Using deep learning', 'Fitting preprocessors inside each CV fold', 'Removing labels', 'Doubling batch size'], answerIndex: 1, explanation: 'Each fold fits StandardScaler etc. only on training split.' },
    ],
  },
  {
    trackId: 'track-deep-learning',
    title: 'Deep Learning Quiz',
    subtitle: 'Neurons, backprop, CNNs, and transformers',
    questions: [
      { id: 'dl-q1', tag: 'Neurons', prompt: 'ReLU activation is…', options: ['max(0, z)', '1/(1+e^-z)', 'tanh(z)', 'softmax(z)'], answerIndex: 0, explanation: 'ReLU zeroes negative inputs—sparse, fast, and avoids saturation on the positive side.' },
      { id: 'dl-q2', tag: 'Training', prompt: 'A mini-batch is…', options: ['The full dataset', 'A small subset per gradient step', 'One epoch', 'The test set'], answerIndex: 1, explanation: 'Mini-batches balance noise and speed—standard for SGD-based training.' },
      { id: 'dl-q3', tag: 'Backprop', prompt: 'Vanishing gradients in RNNs happen because…', options: ['Learning rate is too high', 'Repeated small Jacobian products shrink signal', 'ReLU always outputs 1', 'Batch norm is disabled'], answerIndex: 1, explanation: 'Long unrolled graphs multiply many values <1, driving gradients toward zero.' },
      { id: 'dl-q4', tag: 'CNN', prompt: 'Convolution layers exploit…', options: ['Translation equivariance in spatial data', 'Sequential memory only', 'Tree structures', 'Tabular joins'], answerIndex: 0, explanation: 'Shared filters detect patterns regardless of position—key for images.' },
      { id: 'dl-q5', tag: 'Attention', prompt: 'Scaled dot-product attention divides by √d_k to…', options: ['Increase parameters', 'Prevent softmax saturation for large dimensions', 'Add positional info', 'Compute loss'], answerIndex: 1, explanation: 'Scaling keeps dot products in a range where softmax gradients remain useful.' },
      { id: 'dl-q6', tag: 'Optim', prompt: 'Adam combines…', options: ['Only momentum', 'Momentum and adaptive per-parameter learning rates', 'Dropout and batch norm', 'SVM and k-NN'], answerIndex: 1, explanation: 'Adam tracks first and second moment estimates of gradients for robust adaptive steps.' },
    ],
  },
  {
    trackId: 'track-specializations',
    title: 'AI Specializations Quiz',
    subtitle: 'NLP, GenAI, vision, and reinforcement learning',
    questions: [
      { id: 'spec-q1', tag: 'NLP', prompt: 'Tokenization splits text into…', options: ['Images', 'Smaller units (words/subwords)', 'GPU tensors only', 'SQL rows'], answerIndex: 1, explanation: 'Models operate on token IDs; subword tokenizers handle rare words efficiently.' },
      { id: 'spec-q2', tag: 'GenAI', prompt: 'RAG adds external knowledge by…', options: ['Deleting the prompt', 'Retrieving relevant docs and injecting them into context', 'Disabling the LLM', 'Using only random weights'], answerIndex: 1, explanation: 'Retrieval grounds answers in your data instead of relying on parametric memory alone.' },
      { id: 'spec-q3', tag: 'GenAI', prompt: 'Temperature in LLM sampling controls…', options: ['Model size', 'Randomness of outputs', 'Context window bytes', 'GPU count'], answerIndex: 1, explanation: 'Higher temperature → more diverse tokens; lower → more deterministic.' },
      { id: 'spec-q4', tag: 'CV', prompt: 'Max pooling…', options: ['Adds parameters', 'Downsamples by taking regional maximum', 'Replaces conv layers', 'Trains the LLM'], answerIndex: 1, explanation: 'Pooling reduces spatial size and adds translation tolerance.' },
      { id: 'spec-q5', tag: 'RL', prompt: 'In an MDP, the agent maximizes…', options: ['Training loss only', 'Expected cumulative reward', 'Dataset size', 'Batch norm stats'], answerIndex: 1, explanation: 'RL optimizes long-term return, balancing exploration and exploitation.' },
      { id: 'spec-q6', tag: 'Agents', prompt: 'Tool-calling agents…', options: ['Only generate text', 'Invoke external APIs/functions to act in the world', 'Replace databases', 'Skip planning'], answerIndex: 1, explanation: 'Agents combine reasoning with actions—search, code execution, API calls.' },
    ],
  },
  {
    trackId: 'track-ai-engineering',
    title: 'AI Engineering Quiz',
    subtitle: 'Deployment, monitoring, and responsible AI',
    questions: [
      { id: 'eng-q1', tag: 'MLOps', prompt: 'Model registry stores…', options: ['Only raw data', 'Versioned models with metadata and lineage', 'User passwords', 'CSS files'], answerIndex: 1, explanation: 'Registries track which model is in staging vs production and enable rollbacks.' },
      { id: 'eng-q2', tag: 'LLMOps', prompt: 'LLM evals should measure…', options: ['Only token count', 'Quality, safety, latency, and cost', 'Screen brightness', 'Keyboard layout'], answerIndex: 1, explanation: 'Production LLM apps need multi-dimensional evaluation—not just fluency.' },
      { id: 'eng-q3', tag: 'Monitor', prompt: 'Data drift means…', options: ['Input distribution changed vs training', 'GPU overheated', 'Code compiled', 'Learning rate increased'], answerIndex: 0, explanation: 'When live data diverges from training data, model performance often degrades silently.' },
      { id: 'eng-q4', tag: 'Safety', prompt: 'Prompt injection tries to…', options: ['Speed up inference', 'Override system instructions via user input', 'Improve accuracy', 'Compress weights'], answerIndex: 1, explanation: 'Attackers embed instructions in user content to bypass guardrails.' },
      { id: 'eng-q5', tag: 'Fairness', prompt: 'Disparate impact occurs when…', options: ['All groups have equal outcomes', 'A model harms a protected group disproportionately', 'Accuracy is 100%', 'Batch size is 32'], answerIndex: 1, explanation: 'Fairness audits compare error rates and outcomes across demographic slices.' },
      { id: 'eng-q6', tag: 'Cost', prompt: 'Caching LLM responses helps…', options: ['Increase hallucinations', 'Reduce latency and API cost for repeated queries', 'Remove embeddings', 'Disable auth'], answerIndex: 1, explanation: 'Semantic or exact caches avoid redundant expensive inference.' },
    ],
  },
  {
    trackId: 'track-capstone',
    title: 'Capstone Quiz',
    subtitle: 'Scoping, building, and shipping AI projects',
    questions: [
      { id: 'cap-q1', tag: 'Scope', prompt: 'A good capstone problem is…', options: ['Vague and unlimited', 'Specific, measurable, and feasible in weeks', 'Secret with no metrics', 'Only a slideshow'], answerIndex: 1, explanation: 'Clear success criteria (accuracy, latency, user task completion) keep projects shippable.' },
      { id: 'cap-q2', tag: 'Data', prompt: 'Before modeling, you should…', options: ['Skip EDA', 'Profile data quality, leakage, and label noise', 'Deploy immediately', 'Ignore missing values'], answerIndex: 1, explanation: 'Garbage in → garbage out. EDA catches label errors and bias early.' },
      { id: 'cap-q3', tag: 'Build', prompt: 'An end-to-end AI app includes…', options: ['Only a Jupyter notebook', 'Data → model → API/UI → evaluation', 'Only marketing copy', 'Random scripts'], answerIndex: 1, explanation: 'Portfolio projects demonstrate the full pipeline, not just offline metrics.' },
      { id: 'cap-q4', tag: 'Eval', prompt: 'A test set should be…', options: ['Used for hyperparameter tuning daily', 'Held out until final evaluation', 'Merged into training for speed', 'Deleted'], answerIndex: 1, explanation: 'Touching the test set during development optimistically biases your reported performance.' },
      { id: 'cap-q5', tag: 'Deploy', prompt: 'A README for your project should explain…', options: ['Nothing', 'Problem, approach, how to run, and results', 'Only your hobbies', 'Stock prices'], answerIndex: 1, explanation: 'Recruiters and collaborators need reproducible setup and honest limitations.' },
      { id: 'cap-q6', tag: 'Iterate', prompt: 'After v1 ships, the next step is…', options: ['Never touch it again', 'Monitor, gather feedback, and iterate', 'Delete all code', 'Hide metrics'], answerIndex: 1, explanation: 'Real products improve through user feedback, error analysis, and retraining cycles.' },
    ],
  },
];

export function getTrackQuiz(trackId: string) {
  return ACADEMIC_TRACK_QUIZZES.find(q => q.trackId === trackId);
}
