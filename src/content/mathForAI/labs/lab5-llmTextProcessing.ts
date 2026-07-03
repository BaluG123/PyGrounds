import type { MathLab } from '../../../types/mathLabs';

export const lab5LlmTextProcessing: MathLab = {
  id: 'lab5-llm-text-processing',
  phaseId: 'phase4-transformersLLMs',
  title: 'LLMs & Text Processing',
  description: 'Build a simple word-level tokenizer with vocabulary mapping and encode/decode.',
  snippets: [
    {
      id: 'lab5-tokenizer',
      title: 'Simple Word-Level Tokenizer',
      intro: 'Build a vocabulary from text frequency, then encode strings to token IDs and decode back — the foundation of all LLM preprocessing.',
      code: `from collections import Counter

class SimpleTokenizer:
    def __init__(self, vocab_size=1000):
        self.vocab_size = vocab_size; self.word_to_id = {}; self.id_to_word = {}

    def build_vocab(self, texts):
        words = []
        for text in texts: words.extend(text.split())
        word_freq = Counter(words)
        top_words = [w for w, _ in word_freq.most_common(self.vocab_size)]
        for i, word in enumerate(top_words):
            self.word_to_id[word] = i; self.id_to_word[i] = word
        self.pad_token_id = self.vocab_size; self.unk_token_id = self.vocab_size + 1

    def encode(self, text, max_len=None):
        tokens = text.split()
        ids = [self.word_to_id.get(t, self.unk_token_id) for t in tokens]
        if max_len:
            ids = ids[:max_len] if len(ids) >= max_len else ids + [self.pad_token_id] * (max_len - len(ids))
        return ids

    def decode(self, ids):
        return ' '.join(self.id_to_word.get(i, '<UNK>') for i in ids)`,
      expectedOutputNote: 'build_vocab on a corpus, then encode/decode sentences to integer sequences.',
    },
  ],
};
