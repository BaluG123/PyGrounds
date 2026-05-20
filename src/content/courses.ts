import type { CourseModule } from '../types/course';
import { pythonBasicsCourse } from './pythonBasics';
import { pythonAdvancedCourse } from './pythonAdvanced';
import { numpyCourse } from './numpyCourse';
import { pandasCourse } from './pandasCourse';
import { matplotlibCourse } from './matplotlibCourse';
import { mathAICourse } from './mathAI';
import { linearAlgebraCourse } from './linearAlgebra';
import { scikitLearnCourse } from './scikitLearn';
import { deepLearningCourse } from './deepLearning';
import { aiProjectsCourse } from './aiProjects';

export const courses: CourseModule[] = [
  pythonBasicsCourse,
  pythonAdvancedCourse,
  numpyCourse,
  pandasCourse,
  matplotlibCourse,
  mathAICourse,
  linearAlgebraCourse,
  scikitLearnCourse,
  deepLearningCourse,
  aiProjectsCourse,
];

export const aiRoadmap = [
  'Python fundamentals: variables, loops, functions, data structures',
  'Python advanced: OOP, decorators, generators, error handling',
  'NumPy for fast numerical computation',
  'Pandas for real-world data wrangling',
  'Matplotlib for visual debugging and communication',
  'Statistics: mean, variance, probability, Bayes, distributions',
  'Linear algebra: vectors, matrices, dot products, eigenvalues, SVD',
  'Machine learning with scikit-learn: regression, classification, metrics',
  'Deep learning: neurons, forward pass, backpropagation, training loops',
  'AI projects: end-to-end pipelines, evaluation, responsible AI',
  'Specialize: NLP, Computer Vision, Reinforcement Learning, or GenAI',
  'Build a portfolio: Kaggle competitions, open-source contributions, blog posts',
];
