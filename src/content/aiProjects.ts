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
        { type: 'heading', text: 'Beyond model.fit()' },
        {
          type: 'paragraph',
          text: 'A real ML project involves much more than just training a model. It is a continuous loop of data collection, cleaning, feature engineering, model selection, training, evaluation, and deployment.',
        },
        {
          type: 'stepByStep',
          title: 'The Standard ML Pipeline',
          steps: [
            { title: 'Collect & Clean', description: 'Gather raw data, handle missing values, and remove duplicates.' },
            { title: 'Feature Engineering', description: 'Create new meaningful columns. This often yields higher performance gains than switching algorithms.' },
            { title: 'Split Data', description: 'Separate data into Train, Validation, and Test sets to prevent data leakage.' },
            { title: 'Train & Tune', description: 'Train multiple baseline models, select the best, and tune hyperparameters.' },
            { title: 'Deploy', description: 'Serve the model via an API and monitor its real-world performance.' },
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'Establishing a Baseline' },
        {
          type: 'playground',
          code: 'steps = [\n    "1. Collect data",\n    "2. Explore & clean",\n    "3. Engineer features",\n    "4. Train/test split",\n    "5. Train baseline",\n    "6. Evaluate metrics",\n    "7. Tune hyperparameters",\n    "8. Deploy & monitor"\n]\nfor step in steps:\n    print(step)',
          expectedOutput: '1. Collect data\n2. Explore & clean\n3. Engineer features\n4. Train/test split\n5. Train baseline\n6. Evaluate metrics\n7. Tune hyperparameters\n8. Deploy & monitor',
        },
        {
          type: 'callout',
          variant: 'remember',
          title: 'The 80/20 Rule of AI',
          body: 'Data scientists spend 80% of their time finding, cleaning, and organizing data, and only 20% of their time actually building and tuning models.',
        },
      ],
    },
    {
      id: 'aip-evaluation',
      title: 'Model Evaluation Deep Dive',
      duration: '24 min',
      objective: 'Diagnose overfitting, underfitting, and choose the right model.',
      blocks: [
        { type: 'heading', text: 'The Generalization Gap' },
        {
          type: 'paragraph',
          text: 'A model that perfectly memorizes the training data (overfitting) fails completely when it sees new data. A model that is too simple (underfitting) fails on everything. The goal is to find the sweet spot in between.',
        },
        {
          type: 'table',
          headers: ['Diagnosis', 'Train Score', 'Test Score', 'The Fix'],
          rows: [
            ['Underfitting', 'Low', 'Low', 'More complex model, more features'],
            ['Overfitting', 'High', 'Low', 'More data, simpler model, regularization'],
            ['Good Fit', 'High', 'High', 'Deploy to production!'],
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'Automated Diagnosis' },
        {
          type: 'playground',
          code: 'train_acc = 0.99\ntest_acc = 0.65\n\ngap = train_acc - test_acc\n\nif gap > 0.15:\n    diagnosis = "Overfitting (Memorizing noise)"\nelif train_acc < 0.70:\n    diagnosis = "Underfitting (Too simple)"\nelse:\n    diagnosis = "Good fit"\n\nprint(f"Train: {train_acc}, Test: {test_acc}")\nprint(f"Diagnosis: {diagnosis}")',
          expectedOutput: 'Train: 0.99, Test: 0.65\nDiagnosis: Overfitting (Memorizing noise)',
        },
      ],
    },
    {
      id: 'aip-responsible',
      title: 'Responsible AI',
      duration: '20 min',
      objective: 'Build AI systems that are fair, transparent, and accountable.',
      blocks: [
        { type: 'heading', text: 'Ethical Artificial Intelligence' },
        {
          type: 'paragraph',
          text: 'AI models can rapidly amplify biases present in historical data. A resume-screening model trained on historically biased hiring data will actively discriminate. Responsible AI requires rigorous awareness, testing, and mitigation.',
        },
        {
          type: 'analogy',
          text: 'Imagine training a dog to fetch a newspaper by exclusively practicing in the living room. If you move to the backyard, the dog gets confused. AI acts identically—if it only trains on one specific demographic (the living room), it fails completely when deployed to others (the backyard).',
        },
        {
          type: 'table',
          headers: ['Pillar', 'Description', 'Mitigation'],
          rows: [
            ['Fairness', 'Equal accuracy across groups', 'Audit data representation'],
            ['Transparency', 'Understanding model logic', 'Use SHAP or simple models'],
            ['Privacy', 'Protecting user data', 'Anonymization, GDPR rules'],
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'The Deployment Checklist' },
        {
          type: 'playground',
          code: 'checks = {\n    "Data demographic audit": True,\n    "Bias testing on subgroups": True,\n    "Explainability tools active": False,\n    "Human oversight protocol": True,\n    "Privacy & GDPR review": True\n}\n\npassed = sum(checks.values())\ntotal = len(checks)\nprint(f"Responsible AI Checklist: {passed}/{total}\\n")\n\nfor check, done in checks.items():\n    status = "✓" if done else "✗"\n    print(f"[{status}] {check}")',
          expectedOutput: 'Responsible AI Checklist: 4/5\n\n[✓] Data demographic audit\n[✓] Bias testing on subgroups\n[✗] Explainability tools active\n[✓] Human oversight protocol\n[✓] Privacy & GDPR review',
        },
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
