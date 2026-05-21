import type { Difficulty, MindCategory, MindQuestion } from '../types/mindQuiz';

function q(
  id: string,
  category: MindCategory,
  difficulty: Difficulty,
  question: string,
  rawOptions: number[],
  answer: number,
  explanation: string,
): MindQuestion {
  const uniqueOptions = Array.from(new Set([answer, ...rawOptions])).slice(0, 4);
  while (uniqueOptions.length < 4) {
    uniqueOptions.push(answer + uniqueOptions.length + 1);
  }

  const shift = Math.abs(id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)) % 4;
  const options = [...uniqueOptions.slice(shift), ...uniqueOptions.slice(0, shift)].map(String) as [string, string, string, string];
  return {
    id,
    category,
    difficulty,
    question,
    options,
    answerIndex: options.indexOf(String(answer)),
    explanation,
  };
}

const generatedQuestions: MindQuestion[] = [];

function add(question: MindQuestion) {
  generatedQuestions.push(question);
}

const difficultyOffsets: Record<Difficulty, number> = { easy: 0, medium: 1000, hard: 2000 };

(['easy', 'medium', 'hard'] as Difficulty[]).forEach(difficulty => {
  const offset = difficultyOffsets[difficulty];
  const limit = difficulty === 'easy' ? 45 : difficulty === 'medium' ? 55 : 65;
  const multiplier = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;

  for (let i = 1; i <= 45; i += 1) {
    const a = i + 6 + multiplier;
    const b = (i % 12) + 4 + multiplier;
    const answer = a + b;
    add(q(
      `arith-add-${difficulty}-${i}`,
      'arithmetic',
      difficulty,
      `${a} + ${b} = ?`,
      [answer - 1, answer + 2, answer + 5],
      answer,
      `Add ${a} and ${b}: ${a} + ${b} = ${answer}.`,
    ));
  }

  for (let i = 1; i <= 35; i += 1) {
    const a = offset / 10 + i * (difficulty === 'hard' ? 9 : difficulty === 'medium' ? 6 : 3) + 40;
    const b = (i % limit) + 7;
    const answer = a - b;
    add(q(
      `arith-sub-${difficulty}-${i}`,
      'arithmetic',
      difficulty,
      `${a} - ${b} = ?`,
      [answer - 3, answer + 4, answer + 8],
      answer,
      `Subtract carefully: ${a} - ${b} = ${answer}.`,
    ));
  }

  for (let i = 1; i <= 35; i += 1) {
    const a = (i % 18) + 3 + multiplier;
    const b = (i % 11) + 2 + multiplier;
    const answer = a * b;
    add(q(
      `arith-mul-${difficulty}-${i}`,
      'arithmetic',
      difficulty,
      `${a} x ${b} = ?`,
      [answer - a, answer + b, answer + a + b],
      answer,
      `Multiply ${a} by ${b}: ${a} x ${b} = ${answer}.`,
    ));
  }

  for (let i = 1; i <= 45; i += 1) {
    const start = i + multiplier;
    const step = (i % 7) + 2 + multiplier;
    const answer = start + step * 4;
    add(q(
      `series-linear-${difficulty}-${i}`,
      'series',
      difficulty,
      `${start}, ${start + step}, ${start + step * 2}, ${start + step * 3}, ?`,
      [answer - step, answer + step, answer + 2],
      answer,
      `The pattern adds ${step} each time, so the next number is ${answer}.`,
    ));
  }

  for (let i = 1; i <= 35; i += 1) {
    const start = (i % 4) + 2;
    const factor = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4;
    const answer = start * factor ** 4;
    add(q(
      `series-multiply-${difficulty}-${i}`,
      'series',
      difficulty,
      `${start}, ${start * factor}, ${start * factor ** 2}, ${start * factor ** 3}, ?`,
      [answer / factor, answer + factor, answer - factor],
      answer,
      `Each term is multiplied by ${factor}.`,
    ));
  }

  for (let i = 1; i <= 45; i += 1) {
    const a = (i % 9) + 2 + multiplier;
    const b = (i % 6) + 3;
    const c = (i % 5) + 2;
    const answer = a + b * c;
    add(q(
      `mixed-bodmas-${difficulty}-${i}`,
      'mixed-ops',
      difficulty,
      `${a} + ${b} x ${c} = ?`,
      [(a + b) * c, answer - c, answer + b],
      answer,
      `Use order of operations: multiply first (${b} x ${c}), then add ${a}.`,
    ));
  }

  for (let i = 1; i <= 35; i += 1) {
    const a = (i % 10) + 5 + multiplier;
    const b = (i % 8) + 2;
    const c = (i % 4) + 2;
    const answer = (a - b) * c;
    add(q(
      `mixed-brackets-${difficulty}-${i}`,
      'mixed-ops',
      difficulty,
      `(${a} - ${b}) x ${c} = ?`,
      [a - b * c, answer + c, answer - b],
      answer,
      `Solve brackets first: ${a} - ${b} = ${a - b}, then multiply by ${c}.`,
    ));
  }

  for (let i = 1; i <= 45; i += 1) {
    const a = (i % 20) + 5 + multiplier;
    const b = (i % 13) + 3;
    const answer = difficulty === 'hard' ? a * b : a + b;
    add(q(
      `speed-${difficulty}-${i}`,
      'speed',
      difficulty,
      difficulty === 'hard' ? `${a} x ${b} = ?` : `${a} + ${b} = ?`,
      [answer - 2, answer + 3, answer + 6],
      answer,
      difficulty === 'hard' ? `${a} x ${b} = ${answer}.` : `${a} + ${b} = ${answer}.`,
    ));
  }
});

export const mindQuestions: MindQuestion[] = generatedQuestions;

export function getQuestionsByCategory(
  category: MindQuestion['category'],
  difficulty: MindQuestion['difficulty'],
  count = 20,
): MindQuestion[] {
  const filtered = mindQuestions.filter(item => item.category === category && item.difficulty === difficulty);
  return [...filtered]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(count, filtered.length));
}

export function getQuestionCount(category: MindCategory, difficulty: Difficulty): number {
  return mindQuestions.filter(item => item.category === category && item.difficulty === difficulty).length;
}
