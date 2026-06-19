import type { CourseModule } from '../types/course';
import { pythonBasicsCourse } from './pythonBasics';
import { pythonAdvancedCourse } from './pythonAdvanced';
import { numpyCourse } from './numpyCourse';
import { pandasCourse } from './pandasCourse';
import { matplotlibCourse } from './matplotlibCourse';
import { mathAICourse } from './mathAI';
import { linearAlgebraCourse } from './linearAlgebra';
import { machineLearningCourse } from './machineLearning';
import { scikitLearnCourse } from './scikitLearn';
import { deepLearningCourse } from './deepLearning';
import { nlpCourse } from './nlpCourse';
import { genAICourse } from './genAICourse';
import { computerVisionCourse } from './computerVision';
import { reinforcementLearningCourse } from './reinforcementLearning';
import { aiEngineeringCourse } from './aiEngineering';
import { aiProjectsCourse } from './aiProjects';
import { withSupplementalQuizzes } from './supplementalQuizzes';

const baseCourses: CourseModule[] = [
  pythonBasicsCourse,
  pythonAdvancedCourse,
  numpyCourse,
  pandasCourse,
  matplotlibCourse,
  mathAICourse,
  linearAlgebraCourse,
  machineLearningCourse,
  scikitLearnCourse,
  deepLearningCourse,
  nlpCourse,
  genAICourse,
  computerVisionCourse,
  reinforcementLearningCourse,
  aiEngineeringCourse,
  aiProjectsCourse,
];

export const courses: CourseModule[] = withSupplementalQuizzes(baseCourses);

export const aiRoadmap = [
  {
    phase: 'Term 1',
    title: 'Programming Foundations',
    outcome: 'Write reliable Python and think in data structures, functions, modules, and debugging workflows.',
    topics: [
      'Python syntax, loops, functions, collections, files',
      'Advanced Python: OOP, decorators, generators, exceptions',
      'Problem solving patterns and clean coding habits',
    ],
  },
  {
    phase: 'Term 2',
    title: 'Data Science Prerequisites',
    outcome: 'Load, clean, transform, visualize, and reason about real datasets.',
    topics: [
      'NumPy arrays, broadcasting, vector math',
      'Pandas DataFrames, joins, missing values, groupby',
      'Matplotlib charts, distributions, diagnostic plots',
    ],
  },
  {
    phase: 'Term 3',
    title: 'Mathematics for AI',
    outcome: 'Understand the math behind learning algorithms instead of memorizing library calls.',
    topics: [
      'Probability, Bayes, distributions, sampling',
      'Statistics, hypothesis thinking, correlation vs causation',
      'Linear algebra: vectors, matrices, dot products, eigenvalues, SVD',
      'Optimization intuition: loss, gradients, learning rates',
    ],
  },
  {
    phase: 'Term 4',
    title: 'Classical Machine Learning',
    outcome: 'Build and evaluate supervised and unsupervised ML models with scientific discipline.',
    topics: [
      'Regression, classification, clustering',
      'Feature engineering, scaling, leakage prevention',
      'Train/validation/test splits, cross-validation, metrics',
      'Scikit-learn pipelines, tuning, model comparison',
    ],
  },
  {
    phase: 'Term 5',
    title: 'Deep Learning',
    outcome: 'Understand neural networks, tensors, training loops, and representation learning.',
    topics: [
      'Neurons, activation functions, forward pass',
      'Loss functions, backpropagation, gradient descent',
      'Batches, epochs, regularization, optimization',
      'CNNs, sequence models, transformers',
    ],
  },
  {
    phase: 'Term 6',
    title: 'Specializations',
    outcome: 'Build domain-specific AI systems across language, vision, and decision making.',
    topics: [
      'NLP: tokenization, TF-IDF, embeddings, transformers',
      'Computer vision: CNNs, detection, segmentation',
      'Reinforcement learning: agents, rewards, policies, Q-learning',
      'GenAI: LLMs, prompting, chatbots, RAG, agents, Agentic RAG',
    ],
  },
  {
    phase: 'Term 7',
    title: 'AI Engineering and Responsible Launch',
    outcome: 'Ship AI features safely with evaluation, monitoring, privacy, and cost control.',
    topics: [
      'MLOps and LLMOps: experiments, registries, prompts, evals',
      'Deployment: APIs, latency, caching, batch and real-time inference',
      'Monitoring: drift, hallucination, quality, safety, cost',
      'Responsible AI: fairness, transparency, human escalation',
    ],
  },
  {
    phase: 'Capstone',
    title: 'Portfolio Projects',
    outcome: 'Prove mastery through end-to-end systems that a user can actually use.',
    topics: [
      'Tabular ML project with evaluation and explainability',
      'NLP or RAG assistant with citations and guardrails',
      'Vision or multimodal demo with metrics',
      'Production checklist, README, demo video, and deployment notes',
    ],
  },
];
