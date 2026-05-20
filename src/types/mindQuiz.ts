export type MindCategory = 'arithmetic' | 'series' | 'mixed-ops' | 'speed';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type MindQuestion = {
  id: string;
  category: MindCategory;
  difficulty: Difficulty;
  question: string;
  options: [string, string, string, string];
  answerIndex: number;
  explanation: string;
};

export type MindQuizResult = {
  category: MindCategory;
  difficulty: Difficulty;
  score: number;
  total: number;
  streak: number;
  bestStreak: number;
  timeMs: number;
};

export const CATEGORY_META: Record<MindCategory, {
  title: string;
  emoji: string;
  color: string;
  accent: string;
  description: string;
}> = {
  arithmetic: {
    title: 'Quick Arithmetic',
    emoji: '⚡',
    color: '#E56B5D',
    accent: '#FDEDEA',
    description: 'Addition, subtraction, multiplication & division',
  },
  series: {
    title: 'Number Series',
    emoji: '🔢',
    color: '#2B6CB0',
    accent: '#E3EEF9',
    description: 'Find the pattern and predict the next number',
  },
  'mixed-ops': {
    title: 'Mixed Operations',
    emoji: '🧩',
    color: '#7454C4',
    accent: '#EDE8F5',
    description: 'BODMAS / PEMDAS order of operations',
  },
  speed: {
    title: 'Speed Round',
    emoji: '🏁',
    color: '#1D7A57',
    accent: '#DDF4E8',
    description: 'Rapid-fire — how fast can you go?',
  },
};
