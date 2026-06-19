import { Cpu } from 'lucide-react-native';
import type { CourseModule } from '../types/course';

export const aiEngineeringCourse: CourseModule = {
  id: 'ai-engineering',
  title: 'AI Engineering',
  subtitle: 'MLOps, deployment, monitoring, evals, safety, cost control',
  color: '#183B56',
  accent: '#E5EEF5',
  Icon: Cpu,
  history: {
    founder: 'Software, data, ML, and reliability engineering communities',
    released: '2010s MLOps era, 2020s LLMOps era',
    summary:
      'AI engineering turns models into reliable products. It combines data pipelines, APIs, evaluation, monitoring, safety, privacy, observability, and cost control.',
  },
  concepts: [
    'Reproducible experiments and model registry',
    'Data versioning and feature stores',
    'Batch vs real-time inference',
    'Model APIs, latency, throughput, caching',
    'Monitoring drift, quality, safety, and cost',
    'LLMOps: prompts, evals, traces, guardrails',
    'Privacy, security, red teaming, compliance',
    'Deployment playbooks and incident response',
  ],
  lessons: [
    {
      id: 'aie-production-stack',
      title: 'The Production AI Stack',
      duration: '26 min',
      objective: 'Understand the parts of a reliable AI product.',
      blocks: [
        { type: 'heading', text: 'Models Are Only One Layer' },
        {
          type: 'paragraph',
          text: 'A production AI system needs more than a trained model. It needs data contracts, repeatable training, deployment, monitoring, feedback loops, security, and rollback plans.',
        },
        {
          type: 'stepByStep',
          title: 'Production Stack',
          steps: [
            { title: 'Data Layer', description: 'Collect, validate, version, and protect data.' },
            { title: 'Training Layer', description: 'Run repeatable experiments and track metrics.' },
            { title: 'Serving Layer', description: 'Expose models through APIs, batch jobs, or edge devices.' },
            { title: 'Monitoring Layer', description: 'Watch drift, latency, cost, failures, and user outcomes.' },
          ],
        },
      ],
    },
    {
      id: 'aie-evals',
      title: 'Evaluation Systems',
      duration: '28 min',
      objective: 'Build evaluation habits for ML and LLM products.',
      blocks: [
        { type: 'heading', text: 'You Cannot Improve What You Do Not Measure' },
        {
          type: 'paragraph',
          text: 'AI apps need offline test sets and online monitoring. For LLM systems, evaluation includes correctness, groundedness, refusal quality, format reliability, latency, and cost.',
        },
        {
          type: 'table',
          headers: ['System', 'Offline Eval', 'Online Monitor'],
          rows: [
            ['ML model', 'Test metrics, calibration', 'Drift, errors, latency'],
            ['RAG chatbot', 'Answer quality, citations', 'Retrieval hit rate, hallucination reports'],
            ['Agent', 'Task success rate', 'Tool errors, cost, unsafe actions'],
          ],
        },
        {
          type: 'callout',
          variant: 'remember',
          title: 'Golden Dataset',
          body: 'Maintain a small, high-quality set of real examples with expected answers. Run it before every release.',
        },
      ],
    },
    {
      id: 'aie-safety-launch',
      title: 'Launch Readiness',
      duration: '24 min',
      objective: 'Prepare AI features for real users.',
      blocks: [
        { type: 'heading', text: 'Release Like an Engineer' },
        {
          type: 'paragraph',
          text: 'Before launch, check data privacy, model limitations, fallback paths, support channels, abuse cases, cost ceilings, logs, alerts, and human escalation.',
        },
        {
          type: 'playground',
          code: 'checks = ["evals", "privacy", "monitoring", "rollback", "support"]\nfor item in checks:\n    print(f"Launch check: {item}")',
          expectedOutput: 'Launch check: evals\nLaunch check: privacy\nLaunch check: monitoring\nLaunch check: rollback\nLaunch check: support',
        },
        {
          type: 'bullets',
          items: [
            'Ship behind a feature flag when possible.',
            'Log enough to debug, but never leak private data.',
            'Define what the system must refuse to do.',
            'Have a rollback path before public release.',
          ],
        },
      ],
    },
  ],
  quiz: [
    { id: 'aie-q1', prompt: 'What does model drift mean?', options: ['Real-world data changes from training data', 'A button changes color', 'A prompt gets shorter', 'A chart is exported'], answerIndex: 0, explanation: 'Drift happens when production data no longer matches training assumptions.' },
    { id: 'aie-q2', prompt: 'Why keep a golden dataset?', options: ['To run repeatable release evaluations', 'To delete metrics', 'To avoid testing', 'To store app icons'], answerIndex: 0, explanation: 'Golden datasets help catch regressions before release.' },
    { id: 'aie-q3', prompt: 'Which matters for LLMOps?', options: ['Prompts, evals, traces, guardrails', 'Only screen size', 'Only image width', 'No monitoring'], answerIndex: 0, explanation: 'LLM products need prompt management, evaluation, observability, and safety controls.' },
  ],
  practice: [
    { id: 'aie-p1', title: 'Latency Budget', prompt: 'Check whether latency is under a 1000 ms budget.', starterCode: 'latency_ms = 850\nbudget_ms = 1000\n# Your code here:', expectedOutput: 'Within budget: True', hint: 'Compare latency_ms <= budget_ms.' },
    { id: 'aie-p2', title: 'Launch Checklist', prompt: 'Count launch checks that are passing.', starterCode: 'checks = {"evals": True, "privacy": True, "monitoring": False}\n# Your code here:', expectedOutput: 'Passed: 2/3', hint: 'sum(checks.values()).' },
  ],
};
