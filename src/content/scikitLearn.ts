import { Cpu } from 'lucide-react-native';
import type { CourseModule } from '../types/course';

export const scikitLearnCourse: CourseModule = {
  id: 'scikit-learn',
  title: 'Scikit-Learn',
  subtitle: 'Classical ML, classification, regression, metrics',
  color: '#F89939',
  accent: '#FEF0E1',
  Icon: Cpu,
  history: {
    founder: 'David Cournapeau',
    released: '2007',
    summary:
      'Scikit-learn democratized machine learning. By providing a consistent API (.fit, .predict, .score) for dozens of algorithms, it became the gold standard for traditional ML.',
  },
  concepts: [
    'Train/Test split and validation',
    'Linear & Logistic Regression',
    'Decision Trees & Random Forests',
    'K-Nearest Neighbors (KNN)',
    'Support Vector Machines (SVM)',
    'Classification metrics: Accuracy, Precision, Recall, F1',
    'Regression metrics: MSE, MAE, R²',
    'Cross-validation and Hyperparameter tuning',
  ],
  lessons: [
    {
      id: 'sk-basics',
      title: 'The ML Workflow',
      duration: '18 min',
      objective: 'Understand the standard scikit-learn API: fit, predict, score.',
      blocks: [
        { type: 'heading', text: 'Democratizing Machine Learning' },
        {
          type: 'paragraph',
          text: 'The power of Scikit-Learn lies in its brilliant, extremely consistent design. Regardless of whether you are training a simple Linear Regression or a complex Random Forest, the exact same three methods form the heartbeat of every pipeline: `.fit()`, `.predict()`, and `.score()`.',
        },
        {
          type: 'analogy',
          text: 'Using Scikit-Learn is like driving modern cars. Even though the internal mechanics of a gas car and an electric car are completely different, they all use a steering wheel, accelerator, and brake. Once you learn the universal controls, you can drive any vehicle.',
        },
        {
          type: 'diagram',
          title: 'The Standard Machine Learning Pipeline',
          boxes: [
            { id: 'split', x: 10, y: 70, width: 85, height: 45, label: 'Train/Test Split', color: '#2B6CB0' },
            { id: 'fit', x: 115, y: 70, width: 85, height: 45, label: 'model.fit()', color: '#F89939' },
            { id: 'pred', x: 220, y: 70, width: 85, height: 45, label: 'model.predict()', color: '#1D7A57' },
          ],
          arrows: [
            { from: 'split', to: 'fit', label: 'Data' },
            { from: 'fit', to: 'pred', label: 'Weights' },
          ],
          height: 180,
        },
        { type: 'divider' },
        { type: 'heading', text: 'Splitting the Dataset' },
        {
          type: 'paragraph',
          text: 'To build a robust model, you must split your data into a Training Set (to learn patterns) and a Testing Set (to evaluate performance). Never evaluate a model on the same data it was trained on — it will cheat by simply memorizing the inputs.',
        },
        {
          type: 'formula',
          expression: 'X_{train}, X_{test}, y_{train}, y_{test} = \\text{split}(X, y)',
          note: 'The fundamental data partition.',
        },
        {
          type: 'playground',
          code: 'from sklearn.model_selection import train_test_split\nimport numpy as np\n\nX = np.arange(10).reshape(-1, 1)\ny = np.array([0, 0, 0, 0, 1, 1, 1, 1, 1, 1])\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.3, random_state=42\n)\n\nprint(f"Train samples (X_train):\\n{X_train.ravel()}")\nprint(f"Test samples (X_test):\\n{X_test.ravel()}")',
          expectedOutput: 'Train samples (X_train):\n[7 2 9 4 3 6 8]\nTest samples (X_test):\n[8 1 5]',
        },
        {
          type: 'callout',
          variant: 'remember',
          title: 'Dimensions of ML Matrices',
          body: 'Features matrix (X) must always be 2D (Samples × Features), even if you have only one feature. The target array (y) is usually 1D containing labels.',
        },
        {
          type: 'stepByStep',
          title: 'Three Universal Scikit-Learn Operations',
          steps: [
            { title: 'model.fit(X_train, y_train)', description: 'The training phase where the model discovers and learns mathematical relationships.' },
            { title: 'model.predict(X_test)', description: 'The inference phase where the model outputs predictions for new, unseen feature sets.' },
            { title: 'model.score(X_test, y_test)', description: 'The evaluation phase that compares predictions to actual ground-truth targets.' },
          ],
        },
      ],
    },
    {
      id: 'sk-classification',
      title: 'Classification',
      duration: '22 min',
      objective: 'Train a model to categorize data into classes.',
      blocks: [
        { type: 'heading', text: 'Continuous vs. Discrete Prediction' },
        {
          type: 'paragraph',
          text: 'Classification is the process of predicting categorical labels (e.g. spam/inbox, fraudulent/legitimate). Logistic Regression, despite its confusing name, is the most robust and widely used baseline model for binary classification.',
        },
        {
          type: 'analogy',
          text: 'Classification is like sorting letters at the post office. Continuous regression would predict the physical weight of each letter; classification drops each letter into distinct destination bins.',
        },
        {
          type: 'table',
          headers: ['Algorithm', 'Concept', 'Pros', 'Cons'],
          rows: [
            ['Logistic Regression', 'Uses sigmoid curve', 'Fast, interpretable', 'Only linear limits'],
            ['Decision Trees', 'Nested if-else splits', 'No scaling needed', 'Prone to overfitting'],
            ['Random Forests', 'Ensemble of trees', 'Highly accurate', 'Slow, hard to read'],
            ['KNN', 'Closeness to neighbors', 'Simple, non-parametric', 'Heavy memory cost'],
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'Fitting a Logistic Regression Model' },
        {
          type: 'playground',
          code: 'from sklearn.linear_model import LogisticRegression\nimport numpy as np\n\n# Train on simple 1D scores\nX_train = np.array([[1], [2], [8], [9]])\ny_train = np.array([0, 0, 1, 1]) # Class 0 or 1\n\nmodel = LogisticRegression().fit(X_train, y_train)\n\nprint(f"Prediction for X=3 (Low Score): {model.predict([[3]])}")\nprint(f"Prediction for X=7 (High Score): {model.predict([[7]])}")',
          expectedOutput: 'Prediction for X=3 (Low Score): [0]\nPrediction for X=7 (High Score): [1]',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Scaling is Key!',
          body: 'Distance-based algorithms (like KNN and SVM) perform terribly if your features have wildly different scales. Always scale features first using `StandardScaler`.',
        },
        {
          type: 'bullets',
          items: [
            'Logistic Regression outputs the probability of class membership.',
            'Decision Trees partition features to minimize impurity.',
            'Random Forests reduce variance by averaging independent trees.',
          ],
        },
      ],
    },
    {
      id: 'sk-metrics',
      title: 'Evaluating Models',
      duration: '24 min',
      objective: 'Choose the right metric beyond simple accuracy.',
      blocks: [
        { type: 'heading', text: 'The Illusion of Accuracy' },
        {
          type: 'paragraph',
          text: 'Accuracy is often a dangerous metric. In heavily imbalanced datasets (e.g., credit card fraud where only 0.1% of transactions are fraudulent), a dumb model that predicts "always legitimate" achieves a stellar 99.9% accuracy — but fails completely to catch any fraud.',
        },
        {
          type: 'analogy',
          text: 'Accuracy is like measuring a teacher\'s performance by checking if they graded all tests (easy). Precision and Recall measure if they actually noticed and corrected the spelling mistakes (valuable).',
        },
        {
          type: 'formula',
          expression: '\\text{Precision} = \\frac{TP}{TP + FP}',
          note: 'When the model predicts positive, how reliable is it?',
        },
        {
          type: 'formula',
          expression: '\\text{Recall} = \\frac{TP}{TP + FN}',
          note: 'Out of all actual positive occurrences, how many did it capture?',
        },
        { type: 'divider' },
        { type: 'heading', text: 'Metric Calculation in Action' },
        {
          type: 'playground',
          code: 'from sklearn.metrics import accuracy_score, precision_score, recall_score\n\ny_true = [0, 1, 0, 0, 1, 0] # Ground truth\ny_pred = [0, 1, 0, 0, 0, 0] # Model prediction\n\nprint(f"Accuracy:  {accuracy_score(y_true, y_pred):.2f}")\nprint(f"Precision: {precision_score(y_true, y_pred):.2f}")\nprint(f"Recall:    {recall_score(y_true, y_pred):.2f}")',
          expectedOutput: 'Accuracy:  0.83\nPrecision: 1.00\nRecall:    0.50',
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'The Precision-Recall Tradeoff',
          body: 'Increasing your model\'s confidence threshold will increase precision (fewer false alerts) but decrease recall (misses more items). The F1 Score represents the harmonic mean balancing both metrics.',
        },
      ],
    },
  ],
  quiz: [
    { id: 'sk-q1', prompt: 'What is the purpose of train_test_split?', options: ['To evaluate model generalization on unseen data', 'To make the dataset smaller', 'To speed up training', 'To shuffle the columns'], answerIndex: 0, explanation: 'We split data to ensure the model learns patterns rather than just memorizing the training set.' },
    { id: 'sk-q2', prompt: 'Which metric measures: "Out of all actual positives, how many were found?"', options: ['Recall', 'Precision', 'Accuracy', 'R-squared'], answerIndex: 0, explanation: 'Recall (or sensitivity) is True Positives / (True Positives + False Negatives).' },
    { id: 'sk-q3', prompt: 'What is the shape of X in scikit-learn?', options: ['2D array (samples × features)', '1D array (samples)', '3D tensor', 'A list of strings'], answerIndex: 0, explanation: 'X is expected to be a 2D matrix where rows are samples and columns are features.' },
    { id: 'sk-q4', prompt: 'What does cross-validation help prevent?', options: ['Overfitting to a specific train/test split', 'Syntax errors', 'Missing values', 'Data leakage'], answerIndex: 0, explanation: 'By evaluating across multiple splits, CV provides a more robust performance estimate.' },
    { id: 'sk-q5', prompt: 'Which algorithm is used for Classification?', options: ['Logistic Regression', 'Linear Regression', 'Mean Squared Error', 'PCA'], answerIndex: 0, explanation: 'Despite its name, Logistic Regression is used for discrete classification tasks.' },
    { id: 'sk-q6', prompt: 'What does a Confusion Matrix show?', options: ['True Positives, False Positives, True Negatives, False Negatives', 'The learning rate curve', 'Feature importances', 'The dataset schema'], answerIndex: 0, explanation: 'It is a table showing correct and incorrect predictions broken down by class.' },
    { id: 'sk-q7', prompt: 'Why scale features before using algorithms like SVM or KNN?', options: ['They rely on distance calculations', 'To make the data fit in memory', 'To remove negative numbers', 'To convert text to numbers'], answerIndex: 0, explanation: 'Distance-based algorithms give undue weight to features with larger numeric scales.' },
    { id: 'sk-q8', prompt: 'What is a hyperparameter?', options: ['A configuration set before training (e.g., max depth)', 'A learned weight matrix', 'The target variable y', 'The learning curve'], answerIndex: 0, explanation: 'Hyperparameters govern the training process itself and are not learned from data.' },
    { id: 'sk-q9', prompt: 'If your dataset is 99% normal and 1% fraud, why is Accuracy a bad metric?', options: ['A model predicting "always normal" gets 99% accuracy but catches no fraud', 'Accuracy cannot be computed', 'It requires floating point numbers', 'It takes too long to calculate'], answerIndex: 0, explanation: 'Accuracy hides poor performance on minority classes. F1 score or Recall is better here.' },
    { id: 'sk-q10', prompt: 'What is the correct scikit-learn method order?', options: ['model.fit(X, y) -> model.predict(X_new)', 'model.predict(X) -> model.fit(y)', 'model.train() -> model.test()', 'model.load(X) -> model.run()'], answerIndex: 0, explanation: 'The standard API requires fitting the model to data first, then predicting on new data.' },
  ],
  practice: [
    { id: 'sk-p1', title: 'Data Split', prompt: 'Split X and y into 80% train, 20% test.', starterCode: 'from sklearn.model_selection import train_test_split\nimport numpy as np\nX, y = np.arange(100).reshape(50,2), np.zeros(50)\n# Your code here:', expectedOutput: 'Train length: 40, Test length: 10', hint: 'Use train_test_split(X, y, test_size=0.2)' },
    { id: 'sk-p2', title: 'Train a Classifier', prompt: 'Train a LogisticRegression model and predict for X=15.', starterCode: 'from sklearn.linear_model import LogisticRegression\nimport numpy as np\nX_train = np.array([[5], [10], [20], [30]])\ny_train = np.array([0, 0, 1, 1])\n# Your code here:', expectedOutput: 'Prediction: [0]', hint: 'model = LogisticRegression().fit(X_train, y_train)' },
    { id: 'sk-p3', title: 'Calculate Precision', prompt: 'Calculate precision for these predictions.', starterCode: 'from sklearn.metrics import precision_score\ny_true = [1, 0, 1, 1, 0]\ny_pred = [1, 0, 0, 1, 1]\n# Your code here:', expectedOutput: 'Precision: 0.67', hint: 'print(f"Precision: {precision_score(y_true, y_pred):.2f}")' },
    { id: 'sk-p4', title: 'Calculate Recall', prompt: 'Calculate recall for the same predictions.', starterCode: 'from sklearn.metrics import recall_score\ny_true = [1, 0, 1, 1, 0]\ny_pred = [1, 0, 0, 1, 1]\n# Your code here:', expectedOutput: 'Recall: 0.67', hint: 'print(f"Recall: {recall_score(y_true, y_pred):.2f}")' },
    { id: 'sk-p5', title: 'Cross Validation', prompt: 'Get 3-fold cross-validation scores.', starterCode: 'from sklearn.model_selection import cross_val_score\nfrom sklearn.linear_model import LogisticRegression\nimport numpy as np\nX = np.arange(30).reshape(-1, 1)\ny = np.array([0]*15 + [1]*15)\nmodel = LogisticRegression()\n# Your code here:', expectedOutput: 'Average CV Score: 1.00', hint: 'scores = cross_val_score(model, X, y, cv=3)\nprint(f"Average CV Score: {scores.mean():.2f}")' },
  ],
};
