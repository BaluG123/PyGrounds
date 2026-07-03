import type { AcademicTrack } from '../../../types/academic';

export const trackSpecializations: AcademicTrack = {
  id: 'track-specializations',
  title: 'AI Specializations',
  subtitle: 'Domain mastery across NLP, GenAI, vision, and reinforcement learning',
  levelBadge: 'NLP · GenAI · Vision · RL',
  courseIds: ['nlp', 'genai', 'computer-vision', 'reinforcement-learning'],
  color: '#7454C4',
  accent: '#F0ECFF',
  termLabel: 'Term 6',
  modules: [
    {
      id: 'mod-spec-nlp',
      title: 'Natural Language Processing',
      subtitle: 'From tokenization to dense semantic representations',
      topics: [
        {
          id: 'ac-spec-tokenization',
          title: 'Tokenization & Text Preprocessing',
          estMinutes: 35,
          objective:
            'Understand how raw text becomes model-ready token sequences and why preprocessing choices affect downstream NLP performance.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'Every NLP pipeline begins with turning unstructured text into discrete units. Tokenization strategy directly impacts vocabulary size, out-of-vocabulary rates, and the ability to handle morphology, code, and multilingual input.',
            },
            { type: 'heading', level: 2, text: 'The Tokenization Pipeline' },
            {
              type: 'paragraph',
              text: 'Modern NLP systems rarely feed raw strings directly into models. Instead, text passes through normalization (case folding, unicode cleanup), segmentation (word, subword, or byte-level splits), and encoding into integer IDs aligned with a fixed vocabulary.',
            },
            {
              type: 'list',
              items: [
                'Word-level: simple but suffers from large vocabularies and OOV words',
                'Subword (BPE, WordPiece, SentencePiece): balances coverage and efficiency',
                'Byte-level (Byte-Pair Encoding on UTF-8): robust to typos and rare characters',
              ],
            },
            { type: 'heading', level: 3, text: 'Byte-Pair Encoding (BPE)' },
            {
              type: 'paragraph',
              text: 'BPE iteratively merges the most frequent symbol pairs in a corpus until a target vocabulary size is reached. GPT-family models and many open LLMs use BPE variants because they handle rare words via compositional subword units.',
            },
            {
              type: 'inlineFormulaParagraph',
              segments: [
                { text: 'Given corpus ' },
                { latex: 'C' },
                { text: ' and merge budget ' },
                { latex: 'V' },
                { text: ', BPE greedily selects pair ' },
                { latex: '(a, b)' },
                { text: ' maximizing co-occurrence frequency and replaces all instances with a new symbol ' },
                { latex: 'ab' },
                { text: '.' },
              ],
            },
            { type: 'heading', level: 3, text: 'Special Tokens & Padding' },
            {
              type: 'paragraph',
              text: 'Transformer models rely on special tokens: [CLS] for classification, [SEP] for sentence boundaries, padding tokens for batch alignment, and [MASK] for masked language modeling. Attention masks prevent padded positions from contributing to softmax normalization.',
            },
            {
              type: 'formula',
              latex: '\\text{Attention}(Q,K,V) = \\mathrm{softmax}\\!\\left(\\frac{QK^{\\mathsf T}}{\\sqrt{d_k}} + M\\right)V',
              caption: 'Mask M sets padded positions to −∞ before softmax',
            },
            { type: 'heading', level: 2, text: 'Preprocessing in Practice' },
            {
              type: 'codeblock',
              language: 'python',
              code: `from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
text = "Tokenization bridges raw text and neural models."

encoded = tokenizer(
    text,
    return_tensors="pt",
    padding="max_length",
    max_length=32,
    truncation=True,
)
print("input_ids:", encoded["input_ids"])
print("tokens:", tokenizer.convert_ids_to_tokens(encoded["input_ids"][0]))
print("attention_mask:", encoded["attention_mask"])`,
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'Always pair tokenization with the same vocabulary and normalization rules used during pretraining. Mismatched tokenizers silently degrade model quality.',
            },
            {
              type: 'note',
              variant: 'warning',
              text: 'Truncating long documents without sliding windows or hierarchical encoding can discard critical context — especially in legal, medical, and code domains.',
            },
          ],
        },
        {
          id: 'ac-spec-embeddings',
          title: 'Word Embeddings & Contextual Representations',
          estMinutes: 40,
          objective:
            'Contrast static and contextual embeddings and explain how dense vectors encode semantic and syntactic relationships for downstream tasks.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'Embeddings map discrete tokens into continuous vector spaces where geometric relationships reflect meaning. Modern LLMs produce contextual embeddings that change with surrounding text — the foundation of transfer learning in NLP.',
            },
            { type: 'heading', level: 2, text: 'Static Embeddings: Word2Vec & GloVe' },
            {
              type: 'paragraph',
              text: 'Word2Vec learns vectors by predicting context (Skip-gram) or target words (CBOW) from local windows. GloVe factorizes global co-occurrence statistics. Both capture analogies like king − man + woman ≈ queen in vector space.',
            },
            {
              type: 'formula',
              latex: 'P(w_o \\mid w_i) = \\frac{\\exp(\\mathbf{v}_{w_o}^{\\mathsf T} \\mathbf{v}_{w_i})}{\\sum_{w \\in V} \\exp(\\mathbf{v}_w^{\\mathsf T} \\mathbf{v}_{w_i})}',
              caption: 'Skip-gram softmax over vocabulary (often approximated with negative sampling)',
            },
            { type: 'heading', level: 3, text: 'Limitations of Static Embeddings' },
            {
              type: 'paragraph',
              text: 'Static embeddings assign one vector per word type, failing on polysemy ("bank" as river vs. finance) and domain shift. Contextual models resolve this by producing token representations conditioned on the full input sequence.',
            },
            { type: 'heading', level: 2, text: 'Contextual Embeddings from Transformers' },
            {
              type: 'inlineFormulaParagraph',
              segments: [
                { text: 'A transformer layer maps input embeddings ' },
                { latex: 'X \\in \\mathbb{R}^{n \\times d}' },
                { text: ' through self-attention and feed-forward blocks, producing contextualized representations ' },
                { latex: 'H \\in \\mathbb{R}^{n \\times d}' },
                { text: ' where each row depends on all tokens in the sequence.' },
              ],
            },
            {
              type: 'list',
              items: [
                'ELMo: bidirectional LSTM layers stacked for context-dependent vectors',
                'BERT: masked language modeling + next-sentence prediction; [CLS] for sentence-level tasks',
                'GPT: autoregressive pretraining; last-token or mean-pooled hidden states for embeddings',
              ],
            },
            { type: 'heading', level: 3, text: 'Similarity & Retrieval' },
            {
              type: 'formula',
              latex: '\\mathrm{sim}(\\mathbf{u}, \\mathbf{v}) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\, \\|\\mathbf{v}\\|}',
              caption: 'Cosine similarity — standard metric for semantic search and RAG retrieval',
            },
            {
              type: 'paragraph',
              text: 'Sentence and document embeddings power semantic search, clustering, and retrieval-augmented generation. Contrastive training (e.g., SimCSE, E5, BGE) aligns embeddings so paraphrases are nearby and unrelated text is far apart.',
            },
            { type: 'heading', level: 2, text: 'Computing Embeddings' },
            {
              type: 'codeblock',
              language: 'python',
              code: `from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")
sentences = [
    "Transformers produce contextual embeddings.",
    "Neural networks map text to dense vectors.",
]
embeddings = model.encode(sentences, normalize_embeddings=True)

def cosine(a, b):
    return float(np.dot(a, b))

print("similarity:", cosine(embeddings[0], embeddings[1]))`,
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'L2-normalize embedding vectors before cosine similarity search. Many retrieval indexes (FAISS, HNSW) assume or benefit from unit-norm vectors.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-spec-genai',
      title: 'Generative AI',
      subtitle: 'Large language models, retrieval, and agentic systems',
      topics: [
        {
          id: 'ac-spec-llm',
          title: 'Large Language Models & Decoding',
          estMinutes: 45,
          objective:
            'Explain autoregressive language modeling, transformer scaling laws, and decoding strategies that control generation quality and diversity.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'LLMs are the engine behind modern GenAI products. Understanding pretraining objectives, context windows, and decoding algorithms is essential for building reliable text-generation systems.',
            },
            { type: 'heading', level: 2, text: 'Autoregressive Language Modeling' },
            {
              type: 'paragraph',
              text: 'Decoder-only transformers model the joint probability of a token sequence by factorizing it into conditional next-token predictions. Pretraining on web-scale corpora yields general-purpose representations transferable via prompting or fine-tuning.',
            },
            {
              type: 'formula',
              latex: 'P(x_1, \\ldots, x_T) = \\prod_{t=1}^{T} P(x_t \\mid x_{<t}; \\theta)',
              caption: 'Causal language modeling objective',
            },
            { type: 'heading', level: 3, text: 'Scaling Laws' },
            {
              type: 'paragraph',
              text: 'Empirical scaling laws relate model size, dataset size, and compute to loss improvements. Chinchilla-style analysis suggests many models are under-trained relative to their parameter count — optimal compute allocation balances both.',
            },
            {
              type: 'inlineFormulaParagraph',
              segments: [
                { text: 'Training loss often follows power-law decay: ' },
                { latex: 'L(N, D) \\propto N^{-\\alpha} + D^{-\\beta}' },
                { text: ' for parameters ' },
                { latex: 'N' },
                { text: ' and tokens ' },
                { latex: 'D' },
                { text: '.' },
              ],
            },
            { type: 'heading', level: 2, text: 'Decoding Strategies' },
            {
              type: 'list',
              items: [
                'Greedy: pick argmax each step — fast but repetitive',
                'Beam search: maintain top-k partial sequences — better for structured output',
                'Top-k / nucleus (top-p) sampling: truncate probability mass for diversity',
                'Temperature scaling: sharpen or flatten the softmax distribution',
              ],
            },
            {
              type: 'formula',
              latex: 'P(x_i) = \\frac{\\exp(z_i / \\tau)}{\\sum_j \\exp(z_j / \\tau)}',
              caption: 'Temperature τ controls randomness; τ → 0 approaches greedy decoding',
            },
            { type: 'heading', level: 3, text: 'Instruction Tuning & Alignment' },
            {
              type: 'paragraph',
              text: 'Supervised fine-tuning (SFT) on instruction-response pairs teaches models to follow user intent. RLHF and DPO further align outputs with human preferences, reducing harmful or unhelpful completions.',
            },
            { type: 'heading', level: 2, text: 'Generation API' },
            {
              type: 'codeblock',
              language: 'python',
              code: `from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

model_id = "gpt2"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id)

prompt = "The key idea behind transformers is"
inputs = tokenizer(prompt, return_tensors="pt")

with torch.no_grad():
    output = model.generate(
        **inputs,
        max_new_tokens=40,
        do_sample=True,
        top_p=0.9,
        temperature=0.8,
    )
print(tokenizer.decode(output[0], skip_special_tokens=True))`,
            },
            {
              type: 'note',
              variant: 'warning',
              text: 'Low temperature and greedy decoding can cause repetition loops. Always validate generation parameters on representative prompts from your product domain.',
            },
          ],
        },
        {
          id: 'ac-spec-rag-agents',
          title: 'RAG, Tool Use & AI Agents',
          estMinutes: 45,
          objective:
            'Design retrieval-augmented pipelines and agent loops that ground LLM outputs in external knowledge and enable multi-step task execution.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'Pure parametric knowledge in LLMs is static, opaque, and prone to hallucination. RAG injects fresh documents at inference time; agents extend LLMs with planning, memory, and tool execution for complex workflows.',
            },
            { type: 'heading', level: 2, text: 'Retrieval-Augmented Generation (RAG)' },
            {
              type: 'paragraph',
              text: 'RAG retrieves relevant passages from a vector store or search index, prepends them to the prompt, and asks the LLM to answer conditioned on retrieved evidence. This reduces hallucination and enables answers over private, up-to-date corpora.',
            },
            {
              type: 'list',
              items: [
                'Indexing: chunk documents, embed, store in vector DB',
                'Retrieval: dense (embedding) + sparse (BM25) hybrid search',
                'Reranking: cross-encoder rescores top-k candidates for precision',
                'Generation: LLM synthesizes answer with citation to sources',
              ],
            },
            {
              type: 'formula',
              latex: 'P(y \\mid x) \\approx \\sum_{d \\in \\mathrm{TopK}(x)} P(y \\mid x, d) \\, P(d \\mid x)',
              caption: 'RAG marginalizes over retrieved documents d given query x',
            },
            { type: 'heading', level: 3, text: 'Chunking & Evaluation' },
            {
              type: 'paragraph',
              text: 'Chunk size, overlap, and metadata filters strongly affect recall. Evaluate RAG with retrieval metrics (MRR, nDCG) and end-to-end metrics (faithfulness, answer relevance) — not just final BLEU or ROUGE scores.',
            },
            { type: 'heading', level: 2, text: 'Agent Architectures' },
            {
              type: 'paragraph',
              text: 'An AI agent loops: observe state → plan → act (call tools) → observe results → repeat until a stop condition. ReAct interleaves reasoning traces with tool calls; function-calling APIs expose structured schemas for reliable tool invocation.',
            },
            {
              type: 'list',
              items: [
                'Planner: decomposes user goal into subtasks',
                'Memory: short-term (conversation) and long-term (vector store)',
                'Tools: search, code execution, APIs, databases',
                'Critic / verifier: checks outputs before returning to user',
              ],
            },
            { type: 'heading', level: 2, text: 'Minimal RAG Pipeline' },
            {
              type: 'codeblock',
              language: 'python',
              code: `from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

docs = ["PyGrounds teaches ML from first principles.", "RAG grounds LLMs in retrieved facts."]
splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=40)
chunks = splitter.create_documents(docs)

embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
store = FAISS.from_documents(chunks, embeddings)

query = "How does RAG reduce hallucination?"
results = store.similarity_search(query, k=2)
for doc in results:
    print(doc.page_content)`,
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'Start with a simple RAG baseline (fixed chunk size + cosine retrieval) before adding rerankers, query rewriting, or multi-hop retrieval — measure each addition against a held-out QA set.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-spec-cv',
      title: 'Computer Vision',
      subtitle: 'Convolutional networks and object detection',
      topics: [
        {
          id: 'ac-spec-conv-nets',
          title: 'Convolutional Neural Networks',
          estMinutes: 40,
          objective:
            'Understand convolution, pooling, and modern CNN architectures that extract hierarchical visual features for classification and beyond.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'Images are high-dimensional and spatially structured. CNNs exploit translation equivariance and local connectivity to learn efficient visual representations — the backbone of vision systems before and alongside transformers.',
            },
            { type: 'heading', level: 2, text: 'Convolution Operation' },
            {
              type: 'paragraph',
              text: 'A convolution slides learnable filters across an input feature map, producing output activations that detect local patterns (edges, textures, parts). Weight sharing drastically reduces parameters compared to fully connected layers.',
            },
            {
              type: 'formula',
              latex: '(I * K)(i,j) = \\sum_m \\sum_n I(i+m,\\, j+n) \\, K(m,n)',
              caption: '2D discrete convolution of image I with kernel K',
            },
            {
              type: 'inlineFormulaParagraph',
              segments: [
                { text: 'Output spatial size: ' },
                { latex: 'H_{\\text{out}} = \\lfloor (H_{\\text{in}} + 2P - K)/S \\rfloor + 1' },
                { text: ' for padding ' },
                { latex: 'P' },
                { text: ', kernel ' },
                { latex: 'K' },
                { text: ', stride ' },
                { latex: 'S' },
                { text: '.' },
              ],
            },
            { type: 'heading', level: 3, text: 'Pooling & Normalization' },
            {
              type: 'list',
              items: [
                'Max pooling: translation-invariant downsampling, preserves strongest activations',
                'Batch normalization: stabilizes training by normalizing mini-batch statistics',
                'Dropout: regularizes fully connected and convolutional layers',
              ],
            },
            { type: 'heading', level: 2, text: 'Architectural Milestones' },
            {
              type: 'paragraph',
              text: 'AlexNet demonstrated deep CNNs on ImageNet. VGG used stacked 3×3 convolutions. ResNet introduced skip connections enabling 100+ layer networks. EfficientNet scales depth, width, and resolution jointly.',
            },
            {
              type: 'formula',
              latex: '\\mathbf{y} = \\mathcal{F}(\\mathbf{x}) + \\mathbf{x}',
              caption: 'Residual block — identity shortcut eases gradient flow',
            },
            { type: 'heading', level: 2, text: 'Training a Classifier' },
            {
              type: 'codeblock',
              language: 'python',
              code: `import torch
import torch.nn as nn
import torchvision.models as models

model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)
model.fc = nn.Linear(model.fc.in_features, 10)  # 10-class head

criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=1e-4)

# One training step (batch_x, batch_y from DataLoader)
model.train()
logits = model(batch_x)
loss = criterion(logits, batch_y)
loss.backward()
optimizer.step()
optimizer.zero_grad()`,
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'Transfer learning from ImageNet-pretrained weights converges faster and generalizes better on small datasets than training CNNs from scratch.',
            },
          ],
        },
        {
          id: 'ac-spec-detection',
          title: 'Object Detection & Localization',
          estMinutes: 40,
          objective:
            'Compare single-stage and two-stage detectors and explain how models predict bounding boxes and class labels in real images.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'Detection goes beyond classification: models must localize multiple objects per image with varying scale and occlusion. Detection powers autonomous driving, retail analytics, medical imaging, and robotics.',
            },
            { type: 'heading', level: 2, text: 'Problem Formulation' },
            {
              type: 'paragraph',
              text: 'Object detection predicts a set of bounding boxes and class labels. Each box is parameterized by center coordinates, width, height, and an objectness or class confidence score. Evaluation uses IoU-based matching against ground truth.',
            },
            {
              type: 'formula',
              latex: '\\mathrm{IoU}(B_p, B_g) = \\frac{\\mathrm{Area}(B_p \\cap B_g)}{\\mathrm{Area}(B_p \\cup B_g)}',
              caption: 'Intersection over Union — threshold typically 0.5 for a "correct" detection',
            },
            {
              type: 'formula',
              latex: '\\mathrm{mAP} = \\frac{1}{C} \\sum_{c=1}^{C} \\mathrm{AP}_c',
              caption: 'Mean Average Precision averaged over classes',
            },
            { type: 'heading', level: 3, text: 'Two-Stage vs. Single-Stage' },
            {
              type: 'list',
              items: [
                'R-CNN family (Faster R-CNN): region proposals → classify & refine boxes — high accuracy',
                'YOLO / SSD: dense predictions on a grid — real-time inference',
                'DETR: transformer set prediction with bipartite matching loss',
              ],
            },
            { type: 'heading', level: 2, text: 'Anchor Boxes & Loss Functions' },
            {
              type: 'paragraph',
              text: 'Anchor-based detectors predict offsets relative to predefined box shapes at each spatial location. Loss combines classification cross-entropy with box regression (Smooth L1 or GIoU/DIoU variants) and objectness terms.',
            },
            {
              type: 'inlineFormulaParagraph',
              segments: [
                { text: 'YOLO divides an image into an ' },
                { latex: 'S \\times S' },
                { text: ' grid; each cell predicts ' },
                { latex: 'B' },
                { text: ' boxes and class probabilities conditioned on grid cell context.' },
              ],
            },
            { type: 'heading', level: 2, text: 'Inference with a Pretrained Detector' },
            {
              type: 'codeblock',
              language: 'python',
              code: `import torchvision
from torchvision.models.detection import fasterrcnn_resnet50_fpn, FasterRCNN_ResNet50_FPN_Weights

weights = FasterRCNN_ResNet50_FPN_Weights.DEFAULT
model = fasterrcnn_resnet50_fpn(weights=weights)
model.eval()

# batch: list of CHW tensors in [0, 1]
with torch.no_grad():
    predictions = model([image_tensor])

for box, label, score in zip(
    predictions[0]["boxes"],
    predictions[0]["labels"],
    predictions[0]["scores"],
):
    if score > 0.7:
        print(weights.meta["categories"][label], float(score), box.tolist())`,
            },
            {
              type: 'note',
              variant: 'warning',
              text: 'Non-maximum suppression (NMS) is required at inference to remove duplicate boxes. Threshold tuning trades precision for recall — always validate on your deployment domain.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-spec-rl',
      title: 'Reinforcement Learning',
      subtitle: 'Markov decision processes and policy learning',
      topics: [
        {
          id: 'ac-spec-mdp',
          title: 'Markov Decision Processes',
          estMinutes: 40,
          objective:
            'Formalize sequential decision-making with states, actions, rewards, and the Bellman equations that underpin value-based and policy-based RL.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'RL agents learn by trial and error in environments where actions have delayed consequences. The MDP framework provides the mathematical foundation for optimal control, game playing, robotics, and LLM alignment via RLHF.',
            },
            { type: 'heading', level: 2, text: 'MDP Definition' },
            {
              type: 'paragraph',
              text: 'A Markov Decision Process is a tuple (S, A, P, R, γ): states S, actions A, transition dynamics P(s′|s,a), reward function R(s,a), and discount factor γ ∈ [0,1). The Markov property: the future depends only on the current state, not the full history.',
            },
            {
              type: 'formula',
              latex: 'M = (\\mathcal{S}, \\mathcal{A}, P, R, \\gamma)',
              caption: 'Standard finite MDP notation',
            },
            { type: 'heading', level: 3, text: 'Returns & Value Functions' },
            {
              type: 'formula',
              latex: 'G_t = \\sum_{k=0}^{\\infty} \\gamma^k R_{t+k+1}',
              caption: 'Discounted cumulative return from time t',
            },
            {
              type: 'inlineFormulaParagraph',
              segments: [
                { text: 'State-value function: ' },
                { latex: 'V^{\\pi}(s) = \\mathbb{E}_{\\pi}[G_t \\mid S_t = s]' },
                { text: '. Action-value (Q) function: ' },
                { latex: 'Q^{\\pi}(s,a) = \\mathbb{E}_{\\pi}[G_t \\mid S_t=s, A_t=a]' },
                { text: '.' },
              ],
            },
            { type: 'heading', level: 2, text: 'Bellman Equations' },
            {
              type: 'formula',
              latex: 'V^{\\pi}(s) = \\sum_a \\pi(a|s) \\sum_{s\'} P(s\'|s,a) \\big[ R(s,a) + \\gamma V^{\\pi}(s\') \\big]',
              caption: 'Bellman expectation equation for a policy π',
            },
            {
              type: 'formula',
              latex: 'V^{*}(s) = \\max_a \\sum_{s\'} P(s\'|s,a) \\big[ R(s,a) + \\gamma V^{*}(s\') \\big]',
              caption: 'Bellman optimality equation',
            },
            { type: 'heading', level: 3, text: 'Exploration vs. Exploitation' },
            {
              type: 'paragraph',
              text: 'Agents must balance trying new actions (exploration) with using known good actions (exploitation). ε-greedy, softmax sampling, and Upper Confidence Bound (UCB) are classic strategies; intrinsic motivation adds curiosity bonuses for sparse-reward environments.',
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'Discount factor γ near 1 favors long-term planning; lower γ emphasizes immediate rewards. Match γ to the effective horizon of your task.',
            },
          ],
        },
        {
          id: 'ac-spec-qlearning-policy',
          title: 'Q-Learning & Policy Methods',
          estMinutes: 45,
          objective:
            'Implement tabular and deep Q-learning, and contrast with policy gradient methods for continuous action spaces and stochastic policies.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'Value-based methods learn Q-functions and derive policies greedily; policy gradients optimize parameterized policies directly. Deep RL combines neural networks with these ideas to solve high-dimensional control problems.',
            },
            { type: 'heading', level: 2, text: 'Q-Learning' },
            {
              type: 'paragraph',
              text: 'Q-learning is an off-policy temporal-difference algorithm that updates Q(s,a) toward the Bellman target using the max over next-state actions. With sufficient exploration and visits, it converges to Q* in tabular settings.',
            },
            {
              type: 'formula',
              latex: 'Q(s,a) \\leftarrow Q(s,a) + \\alpha \\Big[ r + \\gamma \\max_{a\'} Q(s\', a\') - Q(s,a) \\Big]',
              caption: 'Tabular Q-learning update with learning rate α',
            },
            { type: 'heading', level: 3, text: 'Deep Q-Networks (DQN)' },
            {
              type: 'list',
              items: [
                'Experience replay: decorrelate training samples from a replay buffer',
                'Target network: stabilize bootstrap targets with delayed weight copies',
                'Double DQN: reduce overestimation by decoupling action selection and evaluation',
              ],
            },
            {
              type: 'paragraph',
              text: 'DQN approximates Q(s,a; θ) with a neural network over raw pixels or feature vectors, enabling Atari game playing and other visual control tasks.',
            },
            { type: 'heading', level: 2, text: 'Policy Gradient Methods' },
            {
              type: 'paragraph',
              text: 'Policy gradients optimize a parameterized policy π_θ(a|s) by ascending the expected return gradient. REINFORCE uses Monte Carlo returns; Actor-Critic reduces variance with a learned value baseline.',
            },
            {
              type: 'formula',
              latex: '\\nabla_\\theta J(\\theta) = \\mathbb{E}_{\\pi_\\theta}\\big[ \\nabla_\\theta \\log \\pi_\\theta(a|s) \\, Q^{\\pi_\\theta}(s,a) \\big]',
              caption: 'Policy gradient theorem',
            },
            {
              type: 'list',
              items: [
                'PPO: clipped surrogate objective for stable on-policy updates',
                'SAC: maximum-entropy RL for continuous control with sample efficiency',
                'RLHF: policy gradient fine-tuning of LLMs with learned reward models',
              ],
            },
            { type: 'heading', level: 2, text: 'Tabular Q-Learning Example' },
            {
              type: 'codeblock',
              language: 'python',
              code: `import numpy as np

n_states, n_actions = 16, 4
Q = np.zeros((n_states, n_actions))
alpha, gamma, epsilon = 0.1, 0.99, 0.1

def epsilon_greedy(state):
    if np.random.rand() < epsilon:
        return np.random.randint(n_actions)
    return int(np.argmax(Q[state]))

# One TD update after transition (s, a, r, s_next)
s, a, r, s_next = 0, 1, 1.0, 3
target = r + gamma * np.max(Q[s_next])
Q[s, a] += alpha * (target - Q[s, a])`,
            },
            {
              type: 'note',
              variant: 'warning',
              text: 'Deep RL is sample-inefficient and sensitive to reward design. Sim-to-real gaps and sparse rewards remain open challenges in robotics and industrial control.',
            },
          ],
        },
      ],
    },
  ],
};
