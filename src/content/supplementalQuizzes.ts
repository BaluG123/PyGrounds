import type { CourseModule, QuizQuestion } from '../types/course';

const TARGET_QUIZ_COUNT = 45;

const fallbackConcepts = [
  'data quality',
  'model evaluation',
  'feature engineering',
  'generalization',
  'overfitting',
  'deployment monitoring',
  'responsible AI',
  'human review',
];

const habitAnswers = [
  'Connect the concept to a working example before memorizing definitions.',
  'Skip evaluation and only trust the first output.',
  'Use the most complex model before creating a baseline.',
  'Ignore edge cases until after launch.',
];

function rotateOptions(options: string[], answer: string, seed: string): QuizQuestion['options'] {
  const unique = Array.from(new Set([answer, ...options.filter(option => option !== answer)]));
  while (unique.length < 4) {
    unique.push(`Related concept ${unique.length + 1}`);
  }

  const distractors = unique.filter(option => option !== answer).slice(0, 3);
  const targetIndex = Math.abs(seed.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)) % 4;
  const arranged = [...distractors];
  arranged.splice(targetIndex, 0, answer);
  return arranged.slice(0, 4);
}

function normalizeQuestion(question: QuizQuestion, seed: string): QuizQuestion {
  const answer = question.options[question.answerIndex];
  const options = rotateOptions(question.options, answer, seed);
  return {
    ...question,
    options,
    answerIndex: options.indexOf(answer),
  };
}

function makeQuestion(
  course: CourseModule,
  id: string,
  prompt: string,
  answer: string,
  distractors: string[],
  explanation: string,
): QuizQuestion {
  const options = rotateOptions(distractors, answer, id);
  return {
    id,
    prompt,
    options,
    answerIndex: options.indexOf(answer),
    explanation,
  };
}

function buildSupplementalQuestions(course: CourseModule, count: number): QuizQuestion[] {
  const concepts = course.concepts.length ? course.concepts : fallbackConcepts;
  const otherConcepts = fallbackConcepts.filter(concept => !concepts.includes(concept));
  const questions: QuizQuestion[] = [];

  for (let i = 0; questions.length < count; i += 1) {
    const concept = concepts[i % concepts.length];
    const alt1 = concepts[(i + 1) % concepts.length] ?? fallbackConcepts[0];
    const alt2 = concepts[(i + 2) % concepts.length] ?? fallbackConcepts[1];
    const alt3 = otherConcepts[i % otherConcepts.length] ?? fallbackConcepts[2];
    const round = Math.floor(i / concepts.length);
    const baseId = `${course.id}-mastery-${i + 1}`;

    if (round % 3 === 0) {
      questions.push(makeQuestion(
        course,
        `${baseId}-concept`,
        `Which topic is a core part of ${course.title}?`,
        concept,
        [alt1, alt2, alt3],
        `${concept} is listed as a core concept in ${course.title}.`,
      ));
    } else if (round % 3 === 1) {
      questions.push(makeQuestion(
        course,
        `${baseId}-purpose`,
        `What is the best way to study "${concept}" in ${course.title}?`,
        habitAnswers[0],
        habitAnswers.slice(1),
        'Strong AI learning requires concept understanding, implementation, and evaluation together.',
      ));
    } else {
      questions.push(makeQuestion(
        course,
        `${baseId}-mistake`,
        `What is the riskiest mistake when applying "${concept}"?`,
        'Using it without checking assumptions, data quality, and evaluation results.',
        [
          'Writing a short note before coding.',
          'Comparing it with a simple baseline.',
          'Testing it on unseen examples.',
        ],
        'AI systems fail when learners apply techniques mechanically without validation.',
      ));
    }
  }

  return questions;
}

export function withSupplementalQuizzes(courses: CourseModule[]): CourseModule[] {
  return courses.map(course => {
    const normalizedQuiz = course.quiz.map((question, index) => normalizeQuestion(
      question,
      `${course.id}-existing-${index}`,
    ));
    const missing = Math.max(0, TARGET_QUIZ_COUNT - normalizedQuiz.length);
    const supplemental = buildSupplementalQuestions(course, missing);

    return {
      ...course,
      quiz: [...normalizedQuiz, ...supplemental],
    };
  });
}
