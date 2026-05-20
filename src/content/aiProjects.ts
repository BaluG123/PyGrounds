import { Rocket } from 'lucide-react-native';
import type { CourseModule } from '../types/course';

export const aiProjectsCourse: CourseModule = {
  id: 'ai-projects',
  title: 'AI Projects',
  subtitle: 'End-to-end pipelines, evaluation, responsible AI',
  color: '#1DB954',
  accent: '#E0F7EA',
  Icon: Rocket,
  history: {
    founder: 'The global AI community',
    released: '2010s–present',
    summary:
      'Knowing libraries is not enough — you need to build complete projects. This module ties everything together: loading data, training models, evaluating results, and deploying responsibly.',
  },
  concepts: [
    'End-to-end ML pipeline',
    'Feature engineering',
    'Model selection and comparison',
    'Overfitting vs underfitting',
    'Hyperparameter tuning',
    'Model interpretation and explainability',
    'Bias, fairness, and ethical AI',
    'Deploying models to production',
  ],
  lessons: [
    {
      id: 'aip-pipeline',
      title: 'The ML Pipeline',
      duration: '22 min',
      objective: 'Build a complete workflow from raw data to trained model.',
      blocks: [
        { type: 'paragraph', text: 'A real ML project is not just model.fit(). It involves data collection, cleaning, feature engineering, model selection, training, evaluation, and deployment. Each stage has pitfalls.' },
        { type: 'formula', expression: 'Raw Data → Clean → Features → Split → Train → Evaluate → Deploy', note: 'The standard ML pipeline. Most time is spent in the first three steps.' },
        { type: 'playground', code: 'steps = [\n    "1. Collect data",\n    "2. Explore & clean",\n    "3. Engineer features",\n    "4. Train/test split",\n    "5. Train model",\n    "6. Evaluate metrics",\n    "7. Tune hyperparameters",\n    "8. Deploy & monitor"\n]\nfor step in steps:\n    print(step)', expectedOutput: '1. Collect data\n2. Explore & clean\n3. Engineer features\n4. Train/test split\n5. Train model\n6. Evaluate metrics\n7. Tune hyperparameters\n8. Deploy & monitor' },
        { type: 'bullets', items: [
          '80% of time goes into data preparation, not modeling.',
          'Feature engineering often matters more than algorithm choice.',
          'Always establish a baseline (e.g., majority class predictor) before building complex models.',
          'Version your data and your models.',
        ] },
      ],
    },
    {
      id: 'aip-evaluation',
      title: 'Model Evaluation Deep Dive',
      duration: '24 min',
      objective: 'Diagnose overfitting, underfitting, and choose the right model.',
      blocks: [
        { type: 'paragraph', text: 'A model that memorizes the training data (overfitting) fails on new data. A model that is too simple (underfitting) fails on everything. The goal is the sweet spot in between.' },
        { type: 'formula', expression: 'Overfitting: Train accuracy ≫ Test accuracy', note: 'The model has memorized noise in the training data.' },
        { type: 'formula', expression: 'Underfitting: Both train and test accuracy are low', note: 'The model is too simple to capture the pattern.' },
        { type: 'playground', code: 'train_acc = 0.99\ntest_acc = 0.65\ngap = train_acc - test_acc\nif gap > 0.15:\n    diagnosis = "Overfitting"\nelif train_acc < 0.70:\n    diagnosis = "Underfitting"\nelse:\n    diagnosis = "Good fit"\nprint(f"Train: {train_acc}, Test: {test_acc}")\nprint(f"Diagnosis: {diagnosis}")', expectedOutput: 'Train: 0.99, Test: 0.65\nDiagnosis: Overfitting' },
        { type: 'bullets', items: [
          'Fix overfitting: more data, regularization (L1/L2), dropout, simpler model.',
          'Fix underfitting: more features, more complex model, train longer.',
          'Learning curves (loss vs epochs) are the best diagnostic tool.',
          'Compare multiple models: Logistic Regression vs Random Forest vs Neural Net.',
        ] },
      ],
    },
    {
      id: 'aip-responsible',
      title: 'Responsible AI',
      duration: '20 min',
      objective: 'Build AI systems that are fair, transparent, and accountable.',
      blocks: [
        { type: 'paragraph', text: 'AI models can amplify biases present in training data. A hiring model trained on biased historical data will discriminate. Responsible AI requires awareness, testing, and mitigation.' },
        { type: 'bullets', items: [
          'Bias: If training data underrepresents a group, the model will perform poorly on that group.',
          'Fairness: Equal accuracy across demographic groups.',
          'Transparency: Can you explain why the model made a prediction?',
          'Privacy: Anonymize personal data. Follow GDPR and similar regulations.',
          'Accountability: Who is responsible when the model makes a harmful mistake?',
        ] },
        { type: 'paragraph', text: 'Practical steps: audit training data for imbalances, test model performance across subgroups, provide explanations for predictions, and establish human oversight for high-stakes decisions.' },
        { type: 'playground', code: 'checks = {\n    "Data audit": True,\n    "Bias testing": True,\n    "Explainability": False,\n    "Human oversight": True,\n    "Privacy review": True\n}\npassed = sum(checks.values())\ntotal = len(checks)\nprint(f"Responsible AI Checklist: {passed}/{total}")\nfor check, done in checks.items():\n    status = "✓" if done else "✗"\n    print(f"  {status} {check}")', expectedOutput: 'Responsible AI Checklist: 4/5\n  ✓ Data audit\n  ✓ Bias testing\n  ✗ Explainability\n  ✓ Human oversight\n  ✓ Privacy review' },
      ],
    },
  ],
  quiz: [
    { id: 'aip-q1', prompt: 'Which step typically takes the most time in an ML project?', options: ['Data preparation and cleaning', 'Choosing the algorithm', 'Training the model', 'Deploying to production'], answerIndex: 0, explanation: 'Data cleaning and feature engineering consume roughly 80% of project time.' },
    { id: 'aip-q2', prompt: 'What is overfitting?', options: ['Model memorizes training data but fails on new data', 'Model is too simple to learn patterns', 'Model takes too long to train', 'Model uses too much memory'], answerIndex: 0, explanation: 'Overfitting means high training accuracy but poor generalization.' },
    { id: 'aip-q3', prompt: 'How do you fix underfitting?', options: ['Use a more complex model or add features', 'Remove training data', 'Reduce the learning rate to zero', 'Use fewer epochs'], answerIndex: 0, explanation: 'Underfitting means the model cannot capture the underlying pattern.' },
    { id: 'aip-q4', prompt: 'What is a baseline model?', options: ['A simple model to compare against (e.g., always predict majority class)', 'The first neural network you train', 'A model that uses every feature', 'A model with perfect accuracy'], answerIndex: 0, explanation: 'Baselines set the minimum bar. If your complex model cannot beat a simple one, something is wrong.' },
    { id: 'aip-q5', prompt: 'Why is explainability important in AI?', options: ['Users and regulators need to understand why decisions are made', 'It makes models run faster', 'It reduces code size', 'It replaces the need for testing'], answerIndex: 0, explanation: 'In healthcare, finance, and law, unexplainable AI decisions are unacceptable.' },
    { id: 'aip-q6', prompt: 'What is AI bias?', options: ['Systematic unfairness due to skewed training data', 'A type of activation function', 'The bias term in y = wx + b', 'A testing framework'], answerIndex: 0, explanation: 'Bias in ML often refers to societal biases embedded in historical data.' },
    { id: 'aip-q7', prompt: 'L2 regularization helps prevent:', options: ['Overfitting by penalizing large weights', 'Underfitting', 'Slow training', 'Data leakage'], answerIndex: 0, explanation: 'L2 adds a penalty proportional to the sum of squared weights, discouraging complexity.' },
    { id: 'aip-q8', prompt: 'What should you always do before building a complex model?', options: ['Establish a simple baseline', 'Build the most complex model possible', 'Skip data exploration', 'Use all available features without checking'], answerIndex: 0, explanation: 'A baseline gives you a reference point to measure improvement.' },
    { id: 'aip-q9', prompt: 'What does "version your data" mean?', options: ['Track changes to datasets over time', 'Convert data to the latest Python version', 'Use the newest data format', 'Delete old data'], answerIndex: 0, explanation: 'Data versioning ensures reproducibility and tracks how data changes affect model performance.' },
    { id: 'aip-q10', prompt: 'Feature engineering is:', options: ['Creating new input variables from raw data to improve model performance', 'Removing all features', 'A type of neural network layer', 'The same as hyperparameter tuning'], answerIndex: 0, explanation: 'Good features often have more impact than choosing a fancier algorithm.' },
  ],
  practice: [
    { id: 'aip-p1', title: 'Diagnose Fit', prompt: 'Given train=0.99 and test=0.65, diagnose the model.', starterCode: 'train_acc = 0.99\ntest_acc = 0.65\ngap = train_acc - test_acc\nif gap > 0.15:\n    print("Overfitting")\nelse:\n    print("Good fit")', expectedOutput: 'Overfitting', hint: 'A large gap between train and test accuracy indicates overfitting.' },
    { id: 'aip-p2', title: 'Checklist Counter', prompt: 'Count how many items are True in a checklist dict.', starterCode: 'checklist = {"data": True, "bias": False, "privacy": True}\npassed = sum(checklist.values())\nprint(f"Passed: {passed}/{len(checklist)}")', expectedOutput: 'Passed: 2/3', hint: 'True counts as 1 and False as 0 in sum().' },
    { id: 'aip-p3', title: 'Pipeline Steps', prompt: 'Print all 5 pipeline steps using a loop.', starterCode: 'steps = ["Collect", "Clean", "Train", "Evaluate", "Deploy"]\nfor i, step in enumerate(steps, 1):\n    print(f"{i}. {step}")', expectedOutput: '1. Collect\n2. Clean\n3. Train\n4. Evaluate\n5. Deploy', hint: 'enumerate(list, 1) starts counting from 1.' },
    { id: 'aip-p4', title: 'Compare Models', prompt: 'Print which model is better based on accuracy.', starterCode: 'models = {"LogReg": 0.82, "RandomForest": 0.88, "SVM": 0.85}\nbest = max(models, key=models.get)\nprint(f"Best: {best} ({models[best]})")', expectedOutput: 'Best: RandomForest (0.88)', hint: 'max() with key=models.get finds the key with the highest value.' },
    { id: 'aip-p5', title: 'Train/Test Gap', prompt: 'Calculate the gap and recommend an action.', starterCode: 'train = 0.55\ntest = 0.50\ngap = train - test\nif train < 0.70:\n    action = "Try a more complex model"\nelse:\n    action = "Model looks okay"\nprint(f"Gap: {gap:.2f}, Action: {action}")', expectedOutput: 'Gap: 0.05, Action: Try a more complex model', hint: 'Low train accuracy = underfitting = need more capacity.' },
  ],
};
