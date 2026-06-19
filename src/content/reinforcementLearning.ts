import { Brain } from 'lucide-react-native';
import type { CourseModule } from '../types/course';

export const reinforcementLearningCourse: CourseModule = {
  id: 'reinforcement-learning',
  title: 'Reinforcement Learning',
  subtitle: 'Agents, rewards, policies, Q-learning, decision systems',
  color: '#D4A843',
  accent: '#FFF5DC',
  Icon: Brain,
  history: {
    founder: 'Richard Sutton, Andrew Barto, and control theory researchers',
    released: '1980s modern foundations, deep RL boom from 2013',
    summary:
      'Reinforcement learning studies agents that learn by acting in an environment and receiving rewards. It powers game-playing AI, robotics, recommendation strategies, and sequential decision systems.',
  },
  concepts: [
    'Agent, environment, state, action, reward',
    'Policy, value function, and return',
    'Exploration vs exploitation',
    'Markov decision processes',
    'Q-learning and Bellman updates',
    'Policy gradients and actor-critic ideas',
    'Reward shaping and sparse rewards',
    'RL evaluation, safety, and simulation limits',
  ],
  lessons: [
    {
      id: 'rl-loop',
      title: 'The Agent Loop',
      duration: '22 min',
      objective: 'Understand how an RL agent learns from interaction.',
      blocks: [
        { type: 'heading', text: 'Learning by Acting' },
        {
          type: 'paragraph',
          text: 'In supervised learning, the model learns from labeled examples. In reinforcement learning, an agent takes actions, observes rewards, and gradually improves its policy.',
        },
        {
          type: 'diagram',
          title: 'RL Interaction Loop',
          boxes: [
            { id: 'agent', x: 35, y: 50, width: 90, height: 46, label: 'Agent', color: '#7454C4' },
            { id: 'env', x: 190, y: 50, width: 100, height: 46, label: 'Environment', color: '#1D7A57' },
            { id: 'reward', x: 112, y: 120, width: 100, height: 42, label: 'Reward', color: '#D4A843' },
          ],
          arrows: [
            { from: 'agent', to: 'env', label: 'action' },
            { from: 'env', to: 'reward', label: 'state' },
            { from: 'reward', to: 'agent' },
          ],
          height: 190,
        },
      ],
    },
    {
      id: 'rl-q-learning',
      title: 'Q-Learning',
      duration: '28 min',
      objective: 'Learn the intuition behind value-based RL.',
      blocks: [
        { type: 'heading', text: 'Learning Action Values' },
        {
          type: 'paragraph',
          text: 'Q-learning estimates how good an action is in a state. The agent updates its Q-values using reward plus the best future value it expects from the next state.',
        },
        {
          type: 'formula',
          expression: 'Q(s,a) \\leftarrow Q(s,a) + \\alpha [r + \\gamma \\max Q(s\\prime,a\\prime) - Q(s,a)]',
          note: 'The Bellman update for Q-learning.',
        },
        {
          type: 'playground',
          code: 'q_old = 0.4\nreward = 1.0\nbest_next = 0.8\nalpha = 0.1\ngamma = 0.9\nq_new = q_old + alpha * (reward + gamma * best_next - q_old)\nprint(f"Updated Q: {q_new:.3f}")',
          expectedOutput: 'Updated Q: 0.532',
        },
      ],
    },
    {
      id: 'rl-production',
      title: 'RL in Real Systems',
      duration: '24 min',
      objective: 'Know where RL is powerful and where it is risky.',
      blocks: [
        { type: 'heading', text: 'Reward Design Is Everything' },
        {
          type: 'paragraph',
          text: 'RL systems optimize exactly what the reward function says, not what humans hoped it meant. Poor reward design can produce unsafe or useless behavior.',
        },
        {
          type: 'table',
          headers: ['Use Case', 'Why RL Helps', 'Risk'],
          rows: [
            ['Robotics', 'Learns sequential control', 'Unsafe exploration'],
            ['Games', 'Clear reward signal', 'May not transfer to reality'],
            ['Recommendations', 'Optimizes long-term engagement', 'Can amplify harmful loops'],
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Simulation First',
          body: 'Train and evaluate RL agents in simulation before letting them affect real users, machines, or money.',
        },
      ],
    },
  ],
  quiz: [
    { id: 'rl-q1', prompt: 'What does an RL agent receive after acting?', options: ['Reward and next state', 'Only CSS', 'A fixed label always', 'A PDF'], answerIndex: 0, explanation: 'The agent observes feedback from the environment.' },
    { id: 'rl-q2', prompt: 'What is exploration?', options: ['Trying actions to learn', 'Deleting data', 'Only using the best-known action', 'Formatting text'], answerIndex: 0, explanation: 'Exploration tries uncertain actions to discover better strategies.' },
    { id: 'rl-q3', prompt: 'Why is reward design important?', options: ['The agent optimizes the reward exactly', 'It changes app icons', 'It removes testing', 'It avoids simulation'], answerIndex: 0, explanation: 'Bad rewards create bad behavior even if the algorithm works.' },
  ],
  practice: [
    { id: 'rl-p1', title: 'Epsilon Decision', prompt: 'Print explore when random_value is below epsilon.', starterCode: 'epsilon = 0.2\nrandom_value = 0.1\n# Your code here:', expectedOutput: 'explore', hint: 'if random_value < epsilon.' },
    { id: 'rl-p2', title: 'Discounted Reward', prompt: 'Compute reward + gamma * future_value.', starterCode: 'reward = 2\nfuture_value = 5\ngamma = 0.9\n# Your code here:', expectedOutput: 'Return: 6.5', hint: 'reward + gamma * future_value.' },
  ],
};
