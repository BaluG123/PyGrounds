jest.mock('lucide-react-native', () => ({
  BarChart3: 'BarChart3',
  Brain: 'Brain',
  Braces: 'Braces',
  Code2: 'Code2',
  Grid3x3: 'Grid3x3',
  MessageCircle: 'MessageCircle',
  Sigma: 'Sigma',
  Sparkles: 'Sparkles',
  Table2: 'Table2',
  Workflow: 'Workflow',
  Cpu: 'Cpu',
  Rocket: 'Rocket',
}));

import { courses } from '../src/content/courses';
import { getQuestionCount } from '../src/content/mindQuestions';
import { runPythonLikeCode } from '../src/services/codeRunner';
import { CATEGORY_META } from '../src/types/mindQuiz';
import type { Difficulty, MindCategory } from '../src/types/mindQuiz';

test('ships a complete foundation course for every core library', () => {
  expect(courses.map(course => course.id)).toEqual(expect.arrayContaining([
    'python-basics',
    'python-advanced',
    'numpy',
    'pandas',
    'matplotlib',
    'math-ai',
    'machine-learning',
    'scikit-learn',
    'deep-learning',
    'nlp',
    'genai',
    'computer-vision',
    'reinforcement-learning',
    'ai-engineering',
    'ai-projects',
  ]));

  courses.forEach(course => {
    expect(course.lessons.length).toBeGreaterThanOrEqual(3);
    expect(course.concepts.length).toBeGreaterThanOrEqual(8);
    expect(course.quiz.length).toBeGreaterThanOrEqual(30);
    expect(new Set(course.quiz.map(question => question.answerIndex)).size).toBeGreaterThan(1);
    expect(course.practice.length).toBeGreaterThanOrEqual(2);
    expect(course.history.founder).toBeTruthy();
  });
});

test('refresh mind has enough questions across every category and difficulty', () => {
  const categories = Object.keys(CATEGORY_META) as MindCategory[];
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  categories.forEach(category => {
    difficulties.forEach(difficulty => {
      expect(getQuestionCount(category, difficulty)).toBeGreaterThanOrEqual(30);
    });
  });
});

test('runs the built-in offline NumPy exercise', () => {
  const result = runPythonLikeCode(
    'import numpy as np\nx = np.array([10, 20, 30])\nprint(x / x.max())',
  );

  expect(result.output).toContain('0.33333333');
});
