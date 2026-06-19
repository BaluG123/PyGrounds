import { Sparkles } from 'lucide-react-native';
import type { CourseModule } from '../types/course';

export const genAICourse: CourseModule = {
  id: 'genai',
  title: 'GenAI',
  subtitle: 'LLMs, prompting, chatbots, RAG, agents, Agentic RAG',
  color: '#7454C4',
  accent: '#F0ECFF',
  Icon: Sparkles,
  history: {
    founder: 'Transformer, GPT, diffusion, and agent research communities',
    released: 'Transformer era from 2017, mainstream GenAI from 2022',
    summary:
      'Generative AI creates text, code, images, audio, and structured actions. Modern GenAI apps combine LLMs with tools, retrieval, memory, evaluation, and human-centered product design.',
  },
  concepts: [
    'LLM foundations: tokens, context, parameters',
    'Prompting: instructions, examples, roles, constraints',
    'Chatbot architecture and conversation memory',
    'Embeddings and vector search',
    'RAG: retrieval augmented generation',
    'Tool calling and function calling',
    'AI agents: plan, act, observe, reflect',
    'Agentic RAG, evaluation, safety, and cost control',
  ],
  lessons: [
    {
      id: 'genai-llms',
      title: 'LLM Foundations',
      duration: '26 min',
      objective: 'Understand what an LLM does and what it does not know.',
      blocks: [
        { type: 'heading', text: 'Language Models Predict Tokens' },
        {
          type: 'paragraph',
          text: 'An LLM reads a context window and predicts the next useful tokens. It can reason over text patterns, follow instructions, write code, summarize, and transform information, but it does not automatically know your private data.',
        },
        {
          type: 'table',
          headers: ['Concept', 'Meaning', 'Why It Matters'],
          rows: [
            ['Token', 'Chunk of text', 'Affects cost and context limits'],
            ['Context window', 'Text the model can see', 'Controls memory for a request'],
            ['Temperature', 'Randomness setting', 'Controls creativity vs consistency'],
            ['System prompt', 'High priority instruction', 'Sets behavior and boundaries'],
          ],
        },
        {
          type: 'callout',
          variant: 'remember',
          title: 'LLMs Need Context',
          body: 'For app-specific answers, provide the right context through prompts, tools, retrieval, or memory. Do not expect the model to guess your database.',
        },
      ],
    },
    {
      id: 'genai-prompting',
      title: 'Prompt Engineering',
      duration: '24 min',
      objective: 'Write prompts that produce reliable outputs.',
      blocks: [
        { type: 'heading', text: 'Prompt Like a Product Engineer' },
        {
          type: 'paragraph',
          text: 'A good prompt defines the task, audience, input data, constraints, output format, and failure behavior. For production systems, prompts should be versioned and tested like code.',
        },
        {
          type: 'stepByStep',
          title: 'Reliable Prompt Pattern',
          steps: [
            { title: 'Role', description: 'Define the model behavior needed for the task.' },
            { title: 'Task', description: 'State the exact job and success criteria.' },
            { title: 'Context', description: 'Provide source data and business rules.' },
            { title: 'Output', description: 'Specify format, length, and fields.' },
          ],
        },
        {
          type: 'playground',
          code: 'prompt = """\nRole: AI tutor\nTask: explain linear regression in 3 bullet points\nAudience: beginner\nOutput: concise bullets\n"""\nprint(prompt.strip())',
          expectedOutput: 'Role: AI tutor\nTask: explain linear regression in 3 bullet points\nAudience: beginner\nOutput: concise bullets',
        },
      ],
    },
    {
      id: 'genai-chatbot-rag',
      title: 'Chatbots and RAG',
      duration: '30 min',
      objective: 'Design a chatbot that answers from trusted documents.',
      blocks: [
        { type: 'heading', text: 'Ground the Model' },
        {
          type: 'paragraph',
          text: 'RAG means Retrieval Augmented Generation. The app retrieves relevant chunks from documents, sends them to the LLM with the user question, and asks the model to answer using that evidence.',
        },
        {
          type: 'diagram',
          title: 'RAG Pipeline',
          boxes: [
            { id: 'q', x: 8, y: 65, width: 70, height: 44, label: 'Question', color: '#2B6CB0' },
            { id: 'search', x: 95, y: 65, width: 80, height: 44, label: 'Retrieve', color: '#1D7A57' },
            { id: 'llm', x: 192, y: 65, width: 70, height: 44, label: 'LLM', color: '#7454C4' },
            { id: 'ans', x: 278, y: 65, width: 58, height: 44, label: 'Answer', color: '#E56B5D' },
          ],
          arrows: [
            { from: 'q', to: 'search' },
            { from: 'search', to: 'llm' },
            { from: 'llm', to: 'ans' },
          ],
          height: 170,
        },
        {
          type: 'bullets',
          items: [
            'Chunk documents into meaningful passages.',
            'Create embeddings for each chunk.',
            'Retrieve top matches for the user query.',
            'Ask the model to cite or use only retrieved context.',
          ],
        },
      ],
    },
    {
      id: 'genai-agents',
      title: 'AI Agents and Agentic RAG',
      duration: '32 min',
      objective: 'Understand agents that can use tools and improve retrieval.',
      blocks: [
        { type: 'heading', text: 'From Chat to Action' },
        {
          type: 'paragraph',
          text: 'An AI agent uses an LLM as a reasoning engine plus tools such as search, database queries, calculators, code execution, or APIs. Agentic RAG lets the agent decide what to retrieve, when to refine a query, and when enough evidence exists.',
        },
        {
          type: 'stepByStep',
          title: 'Agent Loop',
          steps: [
            { title: 'Plan', description: 'Break the goal into smaller steps.' },
            { title: 'Act', description: 'Call a tool, retrieve documents, or ask a follow-up.' },
            { title: 'Observe', description: 'Read the tool result and update context.' },
            { title: 'Answer', description: 'Return the final grounded response.' },
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Production Rule',
          body: 'Agents need guardrails: tool permissions, timeouts, cost limits, human review for risky actions, logging, and evaluation datasets.',
        },
      ],
    },
  ],
  quiz: [
    { id: 'genai-q1', prompt: 'What does RAG add to an LLM app?', options: ['Relevant external context', 'Only random outputs', 'A mobile theme', 'A database backup'], answerIndex: 0, explanation: 'RAG retrieves relevant context and gives it to the model before generation.' },
    { id: 'genai-q2', prompt: 'What is an AI agent?', options: ['A model plus tools and a loop', 'Only a PDF', 'Only a chart', 'A fixed if-else script'], answerIndex: 0, explanation: 'Agents use a model to plan and call tools, then observe results.' },
    { id: 'genai-q3', prompt: 'Why specify output format in a prompt?', options: ['To improve reliability', 'To remove all context', 'To increase hallucination', 'To disable instructions'], answerIndex: 0, explanation: 'Output format constraints make responses easier to parse and evaluate.' },
  ],
  practice: [
    { id: 'genai-p1', title: 'Prompt Template', prompt: 'Create a prompt template with role, task, and output format.', starterCode: 'role = "AI tutor"\ntask = "Explain RAG"\nformat = "3 bullets"\n# Your code here:', expectedOutput: 'AI tutor: Explain RAG. Output: 3 bullets', hint: 'Use an f-string.' },
    { id: 'genai-p2', title: 'RAG Steps', prompt: 'Print the four core RAG steps.', starterCode: 'steps = ["chunk", "embed", "retrieve", "generate"]\n# Your code here:', expectedOutput: 'chunk -> embed -> retrieve -> generate', hint: 'Use " -> ".join(steps).' },
  ],
};
