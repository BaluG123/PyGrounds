jest.mock('lucide-react-native', () => ({
  BarChart3: 'BarChart3',
  Braces: 'Braces',
  Table2: 'Table2',
}));

import { courses } from '../src/content/courses';
import { runPythonLikeCode } from '../src/services/codeRunner';

test('ships a complete foundation course for every core library', () => {
  expect(courses).toHaveLength(3);

  courses.forEach(course => {
    expect(course.lessons.length).toBeGreaterThanOrEqual(3);
    expect(course.concepts.length).toBeGreaterThanOrEqual(8);
    expect(course.quiz.length).toBeGreaterThanOrEqual(4);
    expect(course.practice.length).toBeGreaterThanOrEqual(3);
    expect(course.history.founder).toBeTruthy();
  });
});

test('runs the built-in offline NumPy exercise', () => {
  const result = runPythonLikeCode(
    'import numpy as np\nx = np.array([10, 20, 30])\nprint(x / x.max())',
  );

  expect(result.output).toContain('0.33333333');
});
