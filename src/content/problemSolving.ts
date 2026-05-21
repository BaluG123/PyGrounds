export type ProblemDifficulty = 'Basics' | 'Loops' | 'Arrays' | 'Strings' | 'Logic' | 'Advanced';

export type ProblemLesson = {
  id: string;
  title: string;
  minutes: string;
  summary: string;
  points: string[];
};

export type ProblemConcept = {
  title: string;
  body: string;
  pattern: string;
};

export type ProblemQuestion = {
  id: string;
  title: string;
  difficulty: ProblemDifficulty;
  prompt: string;
  focus: string;
  hint: string;
  starterCode: string;
};

export const problemLessons: ProblemLesson[] = [
  {
    id: 'ps-read-trace',
    title: 'Read, Trace, Then Code',
    minutes: '8 min',
    summary: 'Strong programmers do not rush into typing. They slow the problem down until the steps are obvious.',
    points: [
      'Circle the inputs, expected output, and hidden rule.',
      'Write two tiny examples before writing code.',
      'Trace each variable after every important line.',
    ],
  },
  {
    id: 'ps-accumulator',
    title: 'Accumulator Thinking',
    minutes: '10 min',
    summary: 'Many problems ask you to build an answer little by little: sum, count, max, min, product, or merged text.',
    points: [
      'Create a starting value before the loop.',
      'Update it only when the current item matters.',
      'Print the final value after the loop ends.',
    ],
  },
  {
    id: 'ps-conditions',
    title: 'Decision Patterns',
    minutes: '9 min',
    summary: 'Conditions let the program choose. Most beginner bugs happen because the condition is too wide or too narrow.',
    points: [
      'Translate English carefully: at least means >=, below means <.',
      'Test boundary values like 0, 1, equal values, and empty lists.',
      'Keep each condition focused on one idea.',
    ],
  },
  {
    id: 'ps-indexes',
    title: 'Index and Neighbor Problems',
    minutes: '12 min',
    summary: 'Indexes help compare current, previous, and next values. This unlocks gaps, trends, peaks, and window problems.',
    points: [
      'Start at index 1 when you need the previous item.',
      'Use len(list) - 1 when you need the next item.',
      'Write the first three loop values on paper.',
    ],
  },
  {
    id: 'ps-strings',
    title: 'String Reasoning',
    minutes: '11 min',
    summary: 'Strings are sequences. Treat characters like list items and many text problems become normal loop problems.',
    points: [
      'Normalize text with lower() when case should not matter.',
      'Build a new answer string when filtering characters.',
      'Count letters, vowels, digits, or spaces with one condition at a time.',
    ],
  },
  {
    id: 'ps-debugging',
    title: 'Debugging Without Panic',
    minutes: '10 min',
    summary: 'Debugging is not failure. It is the skill of making invisible program state visible.',
    points: [
      'Print the loop variable and answer variable together.',
      'Run with a smaller input before using the full data.',
      'Change one line at a time so you know what fixed the bug.',
    ],
  },
];

export const problemConcepts: ProblemConcept[] = [
  {
    title: 'Accumulator',
    body: 'Use this when the answer grows across a loop.',
    pattern: 'total = 0 -> loop -> total += value',
  },
  {
    title: 'Counter',
    body: 'Use this when you need how many items match a rule.',
    pattern: 'count = 0 -> if rule -> count += 1',
  },
  {
    title: 'Running Best',
    body: 'Use this when you need max, min, best score, or earliest winner.',
    pattern: 'best = first_item -> compare each item -> update best',
  },
  {
    title: 'Two Pointers',
    body: 'Use this when you compare both ends or move through sorted data.',
    pattern: 'left = 0, right = len(items) - 1',
  },
  {
    title: 'Frequency Map',
    body: 'Use this when repeated values matter: letters, words, votes, or scores.',
    pattern: 'counts[item] = counts.get(item, 0) + 1',
  },
  {
    title: 'Break Into Cases',
    body: 'Use this when one rule has multiple outcomes.',
    pattern: 'if case_a -> elif case_b -> else fallback',
  },
];

const pools = {
  numbers: [
    [4, 7, 10, 13, 18],
    [2, 5, 8, 11, 14],
    [9, 3, 6, 12, 15],
    [1, 4, 9, 16, 25],
    [30, 12, 45, 18, 27],
    [5, 10, 15, 20, 25],
    [17, 22, 29, 34, 41],
    [6, 1, 8, 2, 10],
  ],
  words: [
    ['python', 'ai', 'data', 'loop', 'function'],
    ['code', 'debug', 'run', 'test', 'ship'],
    ['array', 'map', 'stack', 'queue', 'tree'],
    ['logic', 'brain', 'skill', 'focus', 'learn'],
    ['model', 'train', 'clean', 'score', 'deploy'],
  ],
};

const templates: Array<{
  difficulty: ProblemDifficulty;
  title: string;
  focus: string;
  hint: string;
  make: (index: number) => { prompt: string; starterCode: string };
}> = [
  {
    difficulty: 'Basics',
    title: 'Add a bonus',
    focus: 'Variables and arithmetic',
    hint: 'Create a new variable from the two given values, then print it.',
    make: index => {
      const base = 20 + index;
      const bonus = (index % 5) + 3;
      return {
        prompt: `A score is ${base}. Add a bonus of ${bonus} and print the final score.`,
        starterCode: `score = ${base}\nbonus = ${bonus}\n\n# create final_score here\npass\n\nprint(final_score)`,
      };
    },
  },
  {
    difficulty: 'Basics',
    title: 'Convert minutes',
    focus: 'Arithmetic and naming',
    hint: 'There are 60 seconds in one minute.',
    make: index => {
      const minutes = index + 3;
      return {
        prompt: `Convert ${minutes} minutes into seconds and print the result.`,
        starterCode: `minutes = ${minutes}\n\n# calculate seconds\npass\n\nprint(seconds)`,
      };
    },
  },
  {
    difficulty: 'Loops',
    title: 'Sum even numbers',
    focus: 'Loop, modulo, accumulator',
    hint: 'An even number has remainder 0 when divided by 2.',
    make: index => {
      const nums = pools.numbers[index % pools.numbers.length];
      return {
        prompt: 'Print the sum of all even numbers in the list.',
        starterCode: `numbers = [${nums.join(', ')}]\n\ntotal = 0\nfor number in numbers:\n    # add only even numbers\n    pass\n\nprint(total)`,
      };
    },
  },
  {
    difficulty: 'Loops',
    title: 'Count values above limit',
    focus: 'Condition and counter',
    hint: 'Increase count only inside the if block.',
    make: index => {
      const nums = pools.numbers[index % pools.numbers.length];
      const limit = 10 + (index % 8);
      return {
        prompt: `Count how many numbers are greater than ${limit}.`,
        starterCode: `numbers = [${nums.join(', ')}]\nlimit = ${limit}\n\ncount = 0\nfor number in numbers:\n    # count numbers greater than limit\n    pass\n\nprint(count)`,
      };
    },
  },
  {
    difficulty: 'Arrays',
    title: 'Find the largest number',
    focus: 'Running maximum',
    hint: 'Start with the first item, then replace it when a bigger item appears.',
    make: index => {
      const nums = pools.numbers[index % pools.numbers.length];
      return {
        prompt: 'Print the largest number in the list.',
        starterCode: `numbers = [${nums.join(', ')}]\n\nlargest = numbers[0]\nfor number in numbers:\n    # update largest when number is bigger\n    pass\n\nprint(largest)`,
      };
    },
  },
  {
    difficulty: 'Arrays',
    title: 'Largest neighbor gap',
    focus: 'Indexes and comparison',
    hint: 'Compare numbers[index] with numbers[index - 1].',
    make: index => {
      const nums = pools.numbers[index % pools.numbers.length];
      return {
        prompt: 'Print the biggest difference between neighboring values.',
        starterCode: `numbers = [${nums.join(', ')}]\n\nlargest_gap = 0\nfor index in range(1, len(numbers)):\n    gap = numbers[index] - numbers[index - 1]\n    # update largest_gap\n    pass\n\nprint(largest_gap)`,
      };
    },
  },
  {
    difficulty: 'Strings',
    title: 'Count short words',
    focus: 'Strings and length',
    hint: 'Use len(word) to check each word.',
    make: index => {
      const words = pools.words[index % pools.words.length];
      return {
        prompt: 'Count how many words have fewer than five letters.',
        starterCode: `words = [${words.map(word => `"${word}"`).join(', ')}]\n\ncount = 0\nfor word in words:\n    # count short words\n    pass\n\nprint(count)`,
      };
    },
  },
  {
    difficulty: 'Strings',
    title: 'Count matching first letters',
    focus: 'String indexing',
    hint: 'The first character is word[0].',
    make: index => {
      const words = pools.words[index % pools.words.length];
      const letter = words[0][0];
      return {
        prompt: `Count words that start with "${letter}".`,
        starterCode: `words = [${words.map(word => `"${word}"`).join(', ')}]\nletter = "${letter}"\n\ncount = 0\nfor word in words:\n    # check the first letter\n    pass\n\nprint(count)`,
      };
    },
  },
  {
    difficulty: 'Logic',
    title: 'Label the score',
    focus: 'if / elif / else',
    hint: 'Check the highest grade first.',
    make: index => {
      const score = 45 + ((index * 7) % 55);
      return {
        prompt: 'Print "high", "medium", or "low" based on the score.',
        starterCode: `score = ${score}\n\nif score >= 80:\n    label = "high"\nelif score >= 60:\n    # set medium label\n    pass\nelse:\n    # set low label\n    pass\n\nprint(label)`,
      };
    },
  },
  {
    difficulty: 'Advanced',
    title: 'Track best day',
    focus: 'State tracking with indexes',
    hint: 'Store both the best value and its position.',
    make: index => {
      const nums = pools.numbers[index % pools.numbers.length];
      return {
        prompt: 'Print the highest value and the day number where it happened.',
        starterCode: `values = [${nums.join(', ')}]\n\nbest_value = values[0]\nbest_day = 1\n\nfor index in range(len(values)):\n    # update best_value and best_day\n    pass\n\nprint(best_value)\nprint(best_day)`,
      };
    },
  },
  {
    difficulty: 'Advanced',
    title: 'Build a filtered list',
    focus: 'Lists, append, filtering',
    hint: 'Use selected.append(number) when the rule is true.',
    make: index => {
      const nums = pools.numbers[index % pools.numbers.length];
      const limit = 12 + (index % 6);
      return {
        prompt: `Build and print a list of numbers greater than ${limit}.`,
        starterCode: `numbers = [${nums.join(', ')}]\nlimit = ${limit}\n\nselected = []\nfor number in numbers:\n    # append values above limit\n    pass\n\nprint(selected)`,
      };
    },
  },
  {
    difficulty: 'Advanced',
    title: 'Calculate average of matches',
    focus: 'Combined accumulator and counter',
    hint: 'Track both total and count, then divide after the loop.',
    make: index => {
      const nums = pools.numbers[index % pools.numbers.length];
      return {
        prompt: 'Print the average of even numbers in the list.',
        starterCode: `numbers = [${nums.join(', ')}]\n\ntotal = 0\ncount = 0\nfor number in numbers:\n    # add and count only even numbers\n    pass\n\naverage = total / count\nprint(average)`,
      };
    },
  },
];

export const problemQuestions: ProblemQuestion[] = Array.from({ length: 240 }, (_, index) => {
  const template = templates[index % templates.length];
  const round = Math.floor(index / templates.length) + 1;
  const made = template.make(index);

  return {
    id: `problem-${index + 1}`,
    title: `${template.title} ${round}`,
    difficulty: template.difficulty,
    prompt: made.prompt,
    focus: template.focus,
    hint: template.hint,
    starterCode: made.starterCode,
  };
});

export const problemDifficulties: Array<'All' | ProblemDifficulty> = [
  'All',
  'Basics',
  'Loops',
  'Arrays',
  'Strings',
  'Logic',
  'Advanced',
];
