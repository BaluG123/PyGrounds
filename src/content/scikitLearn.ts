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
        { type: 'paragraph', text: 'Machine learning starts with data splitting. You train on one set and test on another to ensure the model generalizes to new data.' },
        { type: 'formula', expression: 'model.fit(X_train, y_train) → model.predict(X_test)', note: 'The universal scikit-learn pattern.' },
        { type: 'playground', code: 'from sklearn.model_selection import train_test_split\nimport numpy as np\nX = np.arange(10).reshape(-1, 1)\ny = np.array([0, 0, 0, 0, 1, 1, 1, 1, 1, 1])\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)\nprint(f"Train size: {len(X_train)}, Test size: {len(X_test)}")', expectedOutput: 'Train size: 7, Test size: 3' },
        { type: 'bullets', items: [
          'X is usually a 2D matrix (features). y is a 1D array (labels/targets).',
          'random_state ensures reproducible splits.',
          'Never train on your test data! This causes "data leakage".',
        ] },
      ],
    },
    {
      id: 'sk-classification',
      title: 'Classification',
      duration: '22 min',
      objective: 'Train a model to categorize data into classes.',
      blocks: [
        { type: 'paragraph', text: 'Classification predicts discrete labels (e.g., spam vs. not spam). Logistic Regression is a simple, powerful baseline model.' },
        { type: 'playground', code: 'from sklearn.linear_model import LogisticRegression\nimport numpy as np\nX_train = np.array([[1], [2], [8], [9]])\ny_train = np.array([0, 0, 1, 1])\nmodel = LogisticRegression().fit(X_train, y_train)\nprint(f"Predict for X=3: {model.predict([[3]])}")\nprint(f"Predict for X=7: {model.predict([[7]])}")', expectedOutput: 'Predict for X=3: [0]\nPredict for X=7: [1]' },
        { type: 'bullets', items: [
          'Logistic Regression uses the sigmoid function to output probabilities.',
          'Decision Trees split data using if/else rules based on features.',
          'Random Forests build many trees and average their predictions.',
          'Always scale features (StandardScaler) for algorithms like SVM or KNN.',
        ] },
      ],
    },
    {
      id: 'sk-metrics',
      title: 'Evaluating Models',
      duration: '24 min',
      objective: 'Choose the right metric beyond simple accuracy.',
      blocks: [
        { type: 'paragraph', text: 'Accuracy can be misleading for imbalanced datasets (e.g., predicting a rare disease). You need precision, recall, and the F1 score.' },
        { type: 'formula', expression: 'Precision = TP / (TP + FP)', note: 'When it predicts positive, how often is it right?' },
        { type: 'formula', expression: 'Recall = TP / (TP + FN)', note: 'Out of all actual positives, how many did it find?' },
        { type: 'playground', code: 'from sklearn.metrics import accuracy_score, precision_score, recall_score\ny_true = [0, 1, 0, 0, 1, 0]\ny_pred = [0, 1, 0, 0, 0, 0]\nprint(f"Accuracy: {accuracy_score(y_true, y_pred):.2f}")\nprint(f"Precision: {precision_score(y_true, y_pred):.2f}")\nprint(f"Recall: {recall_score(y_true, y_pred):.2f}")', expectedOutput: 'Accuracy: 0.83\nPrecision: 1.00\nRecall: 0.50' },
        { type: 'bullets', items: [
          'F1 Score is the harmonic mean of precision and recall.',
          'Confusion Matrix shows TP, FP, TN, FN in a grid.',
          'For regression (predicting continuous values), use Mean Squared Error (MSE) or R².',
        ] },
      ],
    },
    {
      id: 'sk-crossval',
      title: 'Cross-Validation',
      duration: '20 min',
      objective: 'Reliably estimate model performance using K-Fold validation.',
      blocks: [
        { type: 'paragraph', text: 'A single train/test split might get lucky (or unlucky). Cross-validation splits data into K folds, training K models to get a robust average score.' },
        { type: 'playground', code: 'from sklearn.model_selection import cross_val_score\nfrom sklearn.linear_model import LogisticRegression\nimport numpy as np\nX = np.arange(20).reshape(-1, 1)\ny = np.array([0]*10 + [1]*10)\nmodel = LogisticRegression()\nscores = cross_val_score(model, X, y, cv=5)\nprint(f"CV Scores: {scores}")\nprint(f"Average: {scores.mean():.2f}")', expectedOutput: 'CV Scores: [1. 1. 1. 1. 1.]\nAverage: 1.00' },
        { type: 'bullets', items: [
          'cv=5 means 5-fold cross-validation.',
          'GridSearchCV combines cross-validation with hyperparameter tuning.',
          'Hyperparameters are settings you choose (e.g., tree depth), unlike parameters (weights) which the model learns.',
        ] },
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
