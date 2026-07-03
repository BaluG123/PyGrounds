import type { AcademicQuizQuestion } from '../../../types/academicQuiz';

/** Extra mastery questions merged into each track quiz at runtime. */
export const EXTRA_TRACK_QUESTIONS: Record<string, AcademicQuizQuestion[]> = {
  'track-python-foundation': [
    { id: 'py-q7', tag: 'Types', prompt: 'What does `isinstance(x, list)` check?', options: ['Whether x is a list', 'List length', 'List memory', 'List sort order'], answerIndex: 0, explanation: 'isinstance verifies the runtime type of an object.' },
    { id: 'py-q8', tag: 'Scope', prompt: 'A variable defined inside a function is…', options: ['Local to that function', 'Always global', 'Always a class attribute', 'A module constant'], answerIndex: 0, explanation: 'Function-local variables are not visible outside unless returned or declared global.' },
    { id: 'py-q9', tag: 'Iterators', prompt: 'What does `for item in iterable` use under the hood?', options: ['The iterator protocol', 'Only while loops', 'Recursion only', 'SQL cursors'], answerIndex: 0, explanation: 'for loops call iter() and next() until StopIteration.' },
    { id: 'py-q10', tag: 'Modules', prompt: 'Why use `if __name__ == "__main__"`?', options: ['Run code only when file is executed directly', 'Import faster', 'Hide variables', 'Enable GPU'], answerIndex: 0, explanation: 'Prevents test/demo code from running on import.' },
    { id: 'py-q11', tag: 'Comprehensions', prompt: '[x*2 for x in range(3)] equals…', options: ['[0, 2, 4]', '[1, 2, 3]', '[2, 4, 6]', '[0, 1, 2]'], answerIndex: 0, explanation: 'range(3) is 0,1,2; doubled gives [0,2,4].' },
    { id: 'py-q12', tag: 'OOP', prompt: 'Inheritance allows a child class to…', options: ['Reuse and extend parent behavior', 'Delete parent files', 'Skip __init__ always', 'Remove methods'], answerIndex: 0, explanation: 'Subclasses inherit attributes and methods from the parent class.' },
  ],
  'track-data-science': [
    { id: 'ds-q7', tag: 'NumPy', prompt: 'NumPy broadcasting avoids…', options: ['Explicit Python loops for element-wise ops', 'All memory use', 'Importing pandas', 'Using floats'], answerIndex: 0, explanation: 'Vectorized ops are faster than Python loops over arrays.' },
    { id: 'ds-q8', tag: 'Pandas', prompt: 'groupby().mean() computes…', options: ['Mean per group', 'Global mean only', 'Row count only', 'Random sample'], answerIndex: 0, explanation: 'Split-apply-combine: aggregate within each group key.' },
    { id: 'ds-q9', tag: 'Missing', prompt: 'fillna(0) replaces…', options: ['Missing values with zero', 'Zeros with NaN', 'All strings', 'Column names'], answerIndex: 0, explanation: 'fillna imputes missing entries with a chosen value.' },
    { id: 'ds-q10', tag: 'Joins', prompt: 'A merge on shared keys is like SQL…', options: ['JOIN', 'DROP', 'ALTER', 'GRANT'], answerIndex: 0, explanation: 'pd.merge combines DataFrames on key columns like SQL joins.' },
    { id: 'ds-q11', tag: 'Viz', prompt: 'A scatter plot is best for…', options: ['Relationship between two numeric variables', 'Single category counts', 'Time series only', 'Text tokenization'], answerIndex: 0, explanation: 'Scatter plots reveal correlation and outliers between x and y.' },
    { id: 'ds-q12', tag: 'Performance', prompt: 'Vectorization in NumPy is faster because…', options: ['Ops run in optimized C loops', 'It uses more Python', 'It skips memory', 'It disables types'], answerIndex: 0, explanation: 'NumPy executes bulk operations in compiled code, not Python per element.' },
  ],
  'track-math-for-ai': [
    { id: 'math-q7', tag: 'LA', prompt: 'Matrix transpose swaps…', options: ['Rows and columns', 'Sign of all entries', 'Eigenvalues only', 'Vector length'], answerIndex: 0, explanation: 'Transpose flips dimensions: (m×n) → (n×m).' },
    { id: 'math-q8', tag: 'LA', prompt: 'SVD decomposes a matrix into…', options: ['U Σ Vᵀ', 'Only eigenvalues', 'A scalar', 'Two vectors only'], answerIndex: 0, explanation: 'SVD factors any matrix into rotation-scaling-rotation form.' },
    { id: 'math-q9', tag: 'Calc', prompt: 'The chain rule is essential for…', options: ['Backpropagation', 'Sorting arrays', 'Plotting histograms', 'File I/O'], answerIndex: 0, explanation: 'Gradients propagate through composed functions via the chain rule.' },
    { id: 'math-q10', tag: 'Prob', prompt: 'Expected value E[X] is…', options: ['Weighted average of outcomes', 'Maximum outcome', 'Variance', 'Standard error only'], answerIndex: 0, explanation: 'E[X] = Σ x·P(x) for discrete random variables.' },
    { id: 'math-q11', tag: 'Stats', prompt: 'Standard deviation measures…', options: ['Spread around the mean', 'Central location only', 'Correlation', 'Sample size'], answerIndex: 0, explanation: 'σ quantifies how far values typically deviate from μ.' },
    { id: 'math-q12', tag: 'Optim', prompt: 'Learning rate too high often causes…', options: ['Divergent or unstable training', 'Perfect convergence', 'Zero gradients always', 'More data'], answerIndex: 0, explanation: 'Oversized steps overshoot minima and oscillate or explode.' },
  ],
  'track-machine-learning': [
    { id: 'ml-q7', tag: 'Features', prompt: 'One-hot encoding converts…', options: ['Categories to binary columns', 'Floats to integers only', 'Labels to loss', 'Images to text'], answerIndex: 0, explanation: 'Each category gets a column with 1 for active category, 0 otherwise.' },
    { id: 'ml-q8', tag: 'Metrics', prompt: 'Precision measures…', options: ['True positives / predicted positives', 'All correct / all samples', 'False positives only', 'Training speed'], answerIndex: 0, explanation: 'Precision = TP / (TP + FP) — quality of positive predictions.' },
    { id: 'ml-q9', tag: 'CV', prompt: 'K-fold cross-validation…', options: ['Rotates train/val splits K times', 'Uses test set each fold', 'Removes labels', 'Trains once only'], answerIndex: 0, explanation: 'Each fold holds out a different validation chunk for robust estimates.' },
    { id: 'ml-q10', tag: 'Trees', prompt: 'Random forests reduce variance by…', options: ['Averaging many decorrelated trees', 'Using one deep tree', 'Removing features', 'Skipping bootstrap'], answerIndex: 0, explanation: 'Bagging + feature randomness lowers overfitting vs single trees.' },
    { id: 'ml-q11', tag: 'SVM', prompt: 'SVMs find a hyperplane that…', options: ['Maximizes margin between classes', 'Minimizes data size', 'Always uses softmax', 'Ignores support vectors'], answerIndex: 0, explanation: 'Support vectors define the maximum-margin decision boundary.' },
    { id: 'ml-q12', tag: 'Leakage', prompt: 'Target leakage means…', options: ['Future/target info enters training features', 'Slow inference', 'Small dataset', 'Wrong file path'], answerIndex: 0, explanation: 'Leakage inflates metrics because the model sees what it should predict.' },
  ],
  'track-deep-learning': [
    { id: 'dl-q7', tag: 'Loss', prompt: 'MSE loss is common for…', options: ['Regression', 'Multi-class labels only', 'Clustering IDs', 'Tokenization'], answerIndex: 0, explanation: 'Mean squared error penalizes continuous prediction error.' },
    { id: 'dl-q8', tag: 'Reg', prompt: 'Dropout during training…', options: ['Randomly disables neurons to reduce co-adaptation', 'Removes all weights', 'Freezes gradients', 'Doubles batch size'], answerIndex: 0, explanation: 'Dropout acts as ensemble regularization across subnetworks.' },
    { id: 'dl-q9', tag: 'CNN', prompt: 'Stride in convolution…', options: ['Controls step size of the filter', 'Sets learning rate', 'Adds labels', 'Computes loss'], answerIndex: 0, explanation: 'Larger stride downsamples spatial dimensions faster.' },
    { id: 'dl-q10', tag: 'RNN', prompt: 'LSTM gates help…', options: ['Capture long-range dependencies', 'Remove all memory', 'Skip backprop', 'Replace attention'], answerIndex: 0, explanation: 'Gated cells retain or forget information across time steps.' },
    { id: 'dl-q11', tag: 'Transformers', prompt: 'Self-attention lets each token…', options: ['Weight all other tokens in the sequence', 'Ignore context', 'Run only on CPU', 'Skip embeddings'], answerIndex: 0, explanation: 'Attention computes relevance scores between all pairs of positions.' },
    { id: 'dl-q12', tag: 'Train', prompt: 'An epoch is…', options: ['One full pass through the training set', 'One batch update', 'One validation run only', 'Model export'], answerIndex: 0, explanation: 'Training loops iterate batches until all training data is seen once.' },
  ],
  'track-specializations': [
    { id: 'spec-q7', tag: 'NLP', prompt: 'TF-IDF upweights words that are…', options: ['Frequent in a doc but rare globally', 'Always stop words', 'Only numbers', 'Random tokens'], answerIndex: 0, explanation: 'TF-IDF highlights distinctive terms for a document vs corpus.' },
    { id: 'spec-q8', tag: 'GenAI', prompt: 'Embeddings map text to…', options: ['Dense vectors in continuous space', 'Only integers 0-9', 'PDF pages', 'SQL tables'], answerIndex: 0, explanation: 'Similar meanings cluster nearby in embedding space.' },
    { id: 'spec-q9', tag: 'RAG', prompt: 'Chunk size in RAG affects…', options: ['Retrieval precision and context length', 'GPU brand', 'App icon', 'Keyboard layout'], answerIndex: 0, explanation: 'Too large chunks add noise; too small lose context.' },
    { id: 'spec-q10', tag: 'CV', prompt: 'Transfer learning uses…', options: ['Pretrained weights as a starting point', 'Only random init', 'No labels ever', 'Text tokenizers'], answerIndex: 0, explanation: 'Fine-tuning pretrained CNNs saves data and training time.' },
    { id: 'spec-q11', tag: 'RL', prompt: 'Exploration vs exploitation trade-off means…', options: ['Try new actions vs use known good ones', 'Train vs test split', 'CPU vs GPU', 'Loss vs accuracy'], answerIndex: 0, explanation: 'Agents must balance discovering rewards and using best-known policy.' },
    { id: 'spec-q12', tag: 'Agents', prompt: 'ReAct-style agents interleave…', options: ['Reasoning traces and tool actions', 'Only random outputs', 'Database backups', 'Image pixels only'], answerIndex: 0, explanation: 'Thought → action → observation loops improve tool use reliability.' },
  ],
  'track-ai-engineering': [
    { id: 'eng-q7', tag: 'Deploy', prompt: 'Model serving latency includes…', options: ['Preprocessing + inference + postprocessing', 'Only training time', 'Git push time', 'PDF download'], answerIndex: 0, explanation: 'Production latency covers the full request path, not just forward pass.' },
    { id: 'eng-q8', tag: 'Monitor', prompt: 'Concept drift is when…', options: ['The meaning of inputs changes over time', 'GPU temperature rises', 'Code compiles', 'Users increase'], answerIndex: 0, explanation: 'Models trained on old concepts degrade when real-world definitions shift.' },
    { id: 'eng-q9', tag: 'LLMOps', prompt: 'Golden-set evals are…', options: ['Fixed benchmark prompts with expected criteria', 'Random user chats only', 'Unlabeled logs', 'Marketing copy'], answerIndex: 0, explanation: 'Curated eval sets track quality regressions across prompt/model changes.' },
    { id: 'eng-q10', tag: 'Safety', prompt: 'PII redaction before logging prevents…', options: ['Storing sensitive user data in logs', 'All model errors', 'Slow networks', 'High accuracy'], answerIndex: 0, explanation: 'Scrub emails, phones, and IDs from telemetry for privacy compliance.' },
    { id: 'eng-q11', tag: 'Cost', prompt: 'Batch inference is often cheaper because…', options: ['GPU utilization is higher per request', 'It skips models', 'It removes evals', 'It uses smaller prompts always'], answerIndex: 0, explanation: 'Amortizing GPU setup over many inputs lowers cost per prediction.' },
    { id: 'eng-q12', tag: 'Versioning', prompt: 'Prompt versioning helps…', options: ['Reproduce and compare LLM behavior over time', 'Delete user accounts', 'Remove datasets', 'Disable auth'], answerIndex: 0, explanation: 'Track prompt changes like code for rollback and A/B testing.' },
  ],
  'track-capstone': [
    { id: 'cap-q7', tag: 'Metrics', prompt: 'A baseline model is important because…', options: ['It sets a minimum performance reference', 'It replaces evaluation', 'It removes test data', 'It skips EDA'], answerIndex: 0, explanation: 'Simple baselines prove your complex model adds real value.' },
    { id: 'cap-q8', tag: 'Demo', prompt: 'A portfolio demo should show…', options: ['Working end-to-end flow with honest limits', 'Only perfect results', 'Hidden test labels', 'No README'], answerIndex: 0, explanation: 'Recruiters trust demos that explain failure modes and setup steps.' },
    { id: 'cap-q9', tag: 'Ethics', prompt: 'Documenting dataset bias helps…', options: ['Set user expectations and mitigation plans', 'Increase hallucinations', 'Skip validation', 'Remove metrics'], answerIndex: 0, explanation: 'Transparent limitations build trust and guide responsible use.' },
    { id: 'cap-q10', tag: 'API', prompt: 'A minimal ML API exposes…', options: ['Health check + predict endpoint + schema', 'Only training code', 'Raw database passwords', 'Unused endpoints'], answerIndex: 0, explanation: 'Production APIs need observability, contracts, and error handling.' },
    { id: 'cap-q11', tag: 'CI', prompt: 'CI for ML projects should run…', options: ['Tests, lint, and smoke evals on changes', 'Only manual checks', 'Nothing automated', 'Only marketing builds'], answerIndex: 0, explanation: 'Automated gates catch broken pipelines before release.' },
    { id: 'cap-q12', tag: 'Ship', prompt: 'A v1 release should prioritize…', options: ['Core user value with monitoring hooks', 'Every possible feature', 'No documentation', 'Ignoring feedback'], answerIndex: 0, explanation: 'Ship a narrow, reliable slice; iterate from real usage data.' },
  ],
};
