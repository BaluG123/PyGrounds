import { MessageCircle } from 'lucide-react-native';
import type { CourseModule } from '../types/course';

export const nlpCourse: CourseModule = {
  id: 'nlp',
  title: 'NLP',
  subtitle: 'Text preprocessing, embeddings, transformers, search, evaluation',
  color: '#2B6CB0',
  accent: '#E6F0FF',
  Icon: MessageCircle,
  history: {
    founder: 'Alan Turing, Noam Chomsky, and modern NLP researchers',
    released: '1950s foundations, transformer era from 2017',
    summary:
      'Natural Language Processing helps computers work with human language. It powers search, translation, sentiment analysis, chatbots, summarization, and modern LLM applications.',
  },
  concepts: [
    'Text cleaning and normalization',
    'Tokenization, stop words, stemming, lemmatization',
    'Bag of Words and TF-IDF',
    'Word embeddings and semantic similarity',
    'Sequence models and attention',
    'Transformers for language understanding',
    'Named entity recognition and sentiment analysis',
    'NLP evaluation and common failure modes',
  ],
  lessons: [
    {
      id: 'nlp-basics',
      title: 'NLP Basics',
      duration: '20 min',
      objective: 'Turn raw text into features that a model can understand.',
      blocks: [
        { type: 'heading', text: 'Text Is Messy Data' },
        {
          type: 'paragraph',
          text: 'Human language contains spelling variation, slang, punctuation, context, ambiguity, and hidden meaning. NLP begins by converting text into a structured representation.',
        },
        {
          type: 'stepByStep',
          title: 'Classic NLP Pipeline',
          steps: [
            { title: 'Normalize', description: 'Lowercase, clean punctuation, and standardize whitespace.' },
            { title: 'Tokenize', description: 'Split text into words, subwords, or characters.' },
            { title: 'Vectorize', description: 'Convert tokens into numeric features.' },
            { title: 'Model', description: 'Train or apply a model for classification, retrieval, or generation.' },
          ],
        },
        {
          type: 'playground',
          code: 'text = "AI agents can read, reason, and act!"\ntokens = text.lower().replace("!", "").replace(",", "").split()\nprint(tokens)',
          expectedOutput: "['ai', 'agents', 'can', 'read', 'reason', 'and', 'act']",
        },
      ],
    },
    {
      id: 'nlp-tfidf',
      title: 'TF-IDF and Search',
      duration: '22 min',
      objective: 'Understand how classic search weighs important words.',
      blocks: [
        { type: 'heading', text: 'Finding Important Words' },
        {
          type: 'paragraph',
          text: 'TF-IDF gives high weight to words that appear often in one document but not everywhere. It is a strong baseline for search, document classification, and keyword extraction.',
        },
        {
          type: 'formula',
          expression: 'TFIDF(t,d) = TF(t,d) \\times IDF(t)',
          note: 'Term frequency multiplied by inverse document frequency.',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Baseline First',
          body: 'Before jumping to an LLM, try a simple TF-IDF or embedding retrieval baseline. It is faster, cheaper, and easier to debug.',
        },
      ],
    },
    {
      id: 'nlp-transformers',
      title: 'Transformers',
      duration: '28 min',
      objective: 'Learn why attention changed NLP.',
      blocks: [
        { type: 'heading', text: 'Attention Is the Breakthrough' },
        {
          type: 'paragraph',
          text: 'Transformers use attention to decide which tokens matter to each other. This allows models to understand long-range relationships and process text in parallel.',
        },
        {
          type: 'diagram',
          title: 'Transformer Thinking',
          boxes: [
            { id: 'tokens', x: 10, y: 65, width: 75, height: 44, label: 'Tokens', color: '#2B6CB0' },
            { id: 'attn', x: 105, y: 65, width: 90, height: 44, label: 'Attention', color: '#7454C4' },
            { id: 'context', x: 215, y: 65, width: 85, height: 44, label: 'Context', color: '#1D7A57' },
          ],
          arrows: [
            { from: 'tokens', to: 'attn' },
            { from: 'attn', to: 'context' },
          ],
          height: 165,
        },
        {
          type: 'bullets',
          items: [
            'Self-attention compares tokens with other tokens in the same sequence.',
            'Embeddings represent token meaning as vectors.',
            'Fine-tuning adapts a pretrained model to a narrower task.',
          ],
        },
      ],
    },
    {
      id: 'nlp-advanced',
      title: 'Advanced NLP Tasks',
      duration: '24 min',
      objective: 'Know the common production NLP tasks.',
      blocks: [
        { type: 'heading', text: 'Tasks You Will Build' },
        {
          type: 'table',
          headers: ['Task', 'Output', 'Example'],
          rows: [
            ['Sentiment', 'Positive/negative/neutral', 'Review analysis'],
            ['NER', 'Entities', 'Find people, places, companies'],
            ['Summarization', 'Shorter text', 'Meeting notes'],
            ['Semantic search', 'Relevant documents', 'RAG retrieval'],
          ],
        },
        {
          type: 'callout',
          variant: 'remember',
          title: 'Evaluate Text Systems',
          body: 'Text models can sound confident while being wrong. Always test with edge cases, noisy text, ambiguous prompts, and real user examples.',
        },
      ],
    },
  ],
  quiz: [
    { id: 'nlp-q1', prompt: 'What does tokenization do?', options: ['Trains a model', 'Splits text into units', 'Deletes all words', 'Builds a database'], answerIndex: 1, explanation: 'Tokenization converts text into words, subwords, or characters.' },
    { id: 'nlp-q2', prompt: 'Why is TF-IDF useful?', options: ['It finds important words', 'It creates images', 'It trains neural networks only', 'It replaces validation'], answerIndex: 0, explanation: 'TF-IDF highlights terms that are important in a document but not common everywhere.' },
    { id: 'nlp-q3', prompt: 'What made transformers powerful for NLP?', options: ['Attention', 'Manual rules only', 'No embeddings', 'Random labels'], answerIndex: 0, explanation: 'Attention lets the model learn relationships between tokens.' },
  ],
  practice: [
    { id: 'nlp-p1', title: 'Tokenize Text', prompt: 'Lowercase and split text into tokens.', starterCode: 'text = "Learn NLP from Zero to Hero"\n# Your code here:', expectedOutput: "['learn', 'nlp', 'from', 'zero', 'to', 'hero']", hint: 'Use text.lower().split().' },
    { id: 'nlp-p2', title: 'Count Words', prompt: 'Count how many times ai appears.', starterCode: 'tokens = ["ai", "python", "ai", "rag"]\n# Your code here:', expectedOutput: 'AI count: 2', hint: 'Use tokens.count("ai").' },
  ],
};
