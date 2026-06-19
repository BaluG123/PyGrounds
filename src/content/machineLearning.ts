import { Workflow } from 'lucide-react-native';
import type { CourseModule } from '../types/course';

export const machineLearningCourse: CourseModule = {
  id: 'machine-learning',
  title: 'Machine Learning',
  subtitle: 'Regression, classification, clustering, features, validation',
  color: '#0F8B8D',
  accent: '#DDF7F6',
  Icon: Workflow,
  history: {
    founder: 'Arthur Samuel and the statistical learning community',
    released: '1959 term, modern boom from the 1990s onward',
    summary:
      'Machine learning teaches computers to discover patterns from examples instead of being programmed with every rule. It is the bridge from Python and math into practical AI systems.',
  },
  concepts: [
    'What ML learns: features, labels, patterns',
    'Supervised vs unsupervised learning',
    'Regression for predicting numbers',
    'Classification for predicting categories',
    'Clustering for discovering groups',
    'Feature engineering and scaling',
    'Overfitting, underfitting, bias, variance',
    'Model selection, validation, and leakage',
  ],
  lessons: [
    {
      id: 'ml-map',
      title: 'The ML Map',
      duration: '18 min',
      objective: 'Understand the main families of machine learning and when to use each.',
      blocks: [
        { type: 'heading', text: 'From Data to Decisions' },
        {
          type: 'paragraph',
          text: 'Machine learning starts with examples. A model looks at inputs called features, learns a reusable pattern, and produces predictions for new data. The goal is not to memorize the training set; the goal is to generalize.',
        },
        {
          type: 'table',
          headers: ['Family', 'Question', 'Example'],
          rows: [
            ['Regression', 'How much?', 'Predict house price or sales'],
            ['Classification', 'Which class?', 'Spam vs inbox, churn vs active'],
            ['Clustering', 'What groups exist?', 'Customer segments'],
          ],
        },
        {
          type: 'callout',
          variant: 'remember',
          title: 'Core Vocabulary',
          body: 'X means input features, y means target labels, model means the learned function, and prediction means the output for new examples.',
        },
        {
          type: 'diagram',
          title: 'Machine Learning Flow',
          boxes: [
            { id: 'data', x: 10, y: 70, width: 75, height: 44, label: 'Data', color: '#2B6CB0' },
            { id: 'features', x: 105, y: 70, width: 85, height: 44, label: 'Features', color: '#0F8B8D' },
            { id: 'model', x: 210, y: 70, width: 85, height: 44, label: 'Model', color: '#7454C4' },
          ],
          arrows: [
            { from: 'data', to: 'features' },
            { from: 'features', to: 'model' },
          ],
          height: 170,
        },
      ],
    },
    {
      id: 'ml-regression',
      title: 'Regression',
      duration: '22 min',
      objective: 'Use regression when the output is a continuous number.',
      blocks: [
        { type: 'heading', text: 'Predicting Numbers' },
        {
          type: 'paragraph',
          text: 'Regression models estimate numeric values: price, demand, marks, temperature, time, revenue, or risk score. Linear regression is the first baseline because it is simple, fast, and interpretable.',
        },
        {
          type: 'formula',
          expression: '\\hat{y} = w_1x_1 + w_2x_2 + ... + b',
          note: 'A regression model combines feature values with learned weights.',
        },
        {
          type: 'playground',
          code: 'from sklearn.linear_model import LinearRegression\nimport numpy as np\n\nhours = np.array([[1], [2], [3], [4], [5]])\nmarks = np.array([35, 45, 55, 65, 75])\n\nmodel = LinearRegression().fit(hours, marks)\nprint(f"Predicted marks for 6 hours: {model.predict([[6]])[0]:.0f}")',
          expectedOutput: 'Predicted marks for 6 hours: 85',
        },
        {
          type: 'bullets',
          items: [
            'Use MAE when you want average absolute error.',
            'Use MSE/RMSE when large mistakes should be punished more.',
            'Use R-squared to understand explained variance.',
          ],
        },
      ],
    },
    {
      id: 'ml-classification',
      title: 'Classification',
      duration: '24 min',
      objective: 'Understand binary and multiclass prediction.',
      blocks: [
        { type: 'heading', text: 'Predicting Classes' },
        {
          type: 'paragraph',
          text: 'Classification predicts a label. The output can be binary, such as fraud or not fraud, or multiclass, such as beginner, intermediate, or expert.',
        },
        {
          type: 'table',
          headers: ['Metric', 'Meaning', 'Use When'],
          rows: [
            ['Accuracy', 'Overall correct rate', 'Classes are balanced'],
            ['Precision', 'Predicted positives are correct', 'False alarms are costly'],
            ['Recall', 'Actual positives are found', 'Missing positives is costly'],
            ['F1', 'Balance of precision and recall', 'Classes are imbalanced'],
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Accuracy Can Lie',
          body: 'For rare events like fraud, a model can look accurate while missing almost every important case. Always inspect class balance and the confusion matrix.',
        },
      ],
    },
    {
      id: 'ml-clustering',
      title: 'Clustering',
      duration: '20 min',
      objective: 'Discover structure when labels are not available.',
      blocks: [
        { type: 'heading', text: 'Learning Without Labels' },
        {
          type: 'paragraph',
          text: 'Clustering is unsupervised learning. There is no y label. The model groups similar examples using distance, density, or probability patterns.',
        },
        {
          type: 'playground',
          code: 'from sklearn.cluster import KMeans\nimport numpy as np\n\nX = np.array([[1, 1], [1, 2], [8, 8], [9, 8]])\nmodel = KMeans(n_clusters=2, random_state=0, n_init=10).fit(X)\nprint(f"Cluster labels: {model.labels_.tolist()}")',
          expectedOutput: 'Cluster labels: [1, 1, 0, 0]',
        },
        {
          type: 'bullets',
          items: [
            'Scale features before distance-based clustering.',
            'Choose k with domain sense, elbow plots, or silhouette score.',
            'Use clustering for exploration, not final truth.',
          ],
        },
      ],
    },
  ],
  quiz: [
    { id: 'ml-q1', prompt: 'Which ML task predicts a continuous number?', options: ['Classification', 'Regression', 'Clustering', 'Tokenization'], answerIndex: 1, explanation: 'Regression predicts numeric values such as price, time, or demand.' },
    { id: 'ml-q2', prompt: 'What is unsupervised learning?', options: ['Learning with labels', 'Learning without target labels', 'Only deep learning', 'Only text analysis'], answerIndex: 1, explanation: 'Unsupervised learning finds structure when there is no target y.' },
    { id: 'ml-q3', prompt: 'Which metric is useful when missing positives is costly?', options: ['Recall', 'MSE', 'R-squared', 'Silhouette score'], answerIndex: 0, explanation: 'Recall measures how many actual positives were found.' },
    { id: 'ml-q4', prompt: 'What is data leakage?', options: ['A syntax error', 'Using future or target information during training', 'A missing package', 'A small batch size'], answerIndex: 1, explanation: 'Leakage makes validation look better than real-world performance.' },
  ],
  practice: [
    { id: 'ml-p1', title: 'Fit Linear Regression', prompt: 'Train a LinearRegression model and predict for x=10.', starterCode: 'from sklearn.linear_model import LinearRegression\nimport numpy as np\nX = np.array([[1], [2], [3]])\ny = np.array([2, 4, 6])\n# Your code here:', expectedOutput: 'Prediction: 20.0', hint: 'Fit the model, then call predict([[10]]).' },
    { id: 'ml-p2', title: 'Choose a Metric', prompt: 'Print recall for a binary classifier.', starterCode: 'from sklearn.metrics import recall_score\ny_true = [1, 1, 1, 0]\ny_pred = [1, 0, 1, 0]\n# Your code here:', expectedOutput: 'Recall: 0.67', hint: 'Use recall_score(y_true, y_pred).' },
  ],
};
