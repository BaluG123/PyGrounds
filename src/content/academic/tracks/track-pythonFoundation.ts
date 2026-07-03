import type { AcademicTrack } from '../../../types/academic';

export const trackPythonFoundation: AcademicTrack = {
  id: 'track-python-foundation',
  title: 'Python Programming Foundations',
  subtitle: 'From first variables to production-ready Python',
  levelBadge: 'Syntax · Logic · Clean code habits',
  courseIds: ['python-basics', 'python-advanced'],
  color: '#1D7A57',
  accent: '#DDF4E8',
  termLabel: 'Term 1',
  modules: [
    {
      id: 'ac-py-module-core',
      title: 'Core Python',
      subtitle: 'Syntax, control flow, and the built-in data structures every AI engineer relies on',
      topics: [
        {
          id: 'ac-py-computational-thinking',
          title: 'Computational Thinking & Python Syntax',
          estMinutes: 30,
          objective:
            'Translate problems into step-by-step programs using variables, types, and core Python syntax — the foundation of every introductory programming assignment.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'Python is the lingua franca of AI research and industry. Its readable syntax lets you focus on algorithms and data rather than boilerplate — the same reason ',
            },
            { type: 'heading', level: 2, text: 'What Is Computational Thinking?' },
            {
              type: 'paragraph',
              text: 'Computational thinking is the discipline of formulating a problem so a computer can solve it. You decompose the task into smaller steps, identify patterns, abstract away irrelevant detail, and design an algorithm — a finite sequence of instructions that always terminates with a correct result.',
            },
            {
              type: 'list',
              items: [
                'Decomposition — break a large problem into manageable subproblems.',
                'Pattern recognition — notice recurring structures (e.g. "for each item, do X").',
                'Abstraction — hide complexity behind a name (variable, function, class).',
                'Algorithm design — specify precise steps with no ambiguity.',
              ],
            },
            { type: 'heading', level: 2, text: 'Variables, Assignment, and Names' },
            {
              type: 'paragraph',
              text: 'A variable is a name bound to an object in memory. Python uses dynamic typing: the name does not declare a type; the object does. Assignment creates a reference, not a copy.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `# Assignment binds a name to an object
x = 42
message = "Hello, world"
pi = 3.14159

# Rebinding — x now refers to a different object
x = x + 1
print(x)  # 43

# Multiple assignment (tuple unpacking)
a, b, c = 1, 2, 3
x, y = y, x  # swap without a temp variable`,
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'Use descriptive snake_case names (learning_rate, num_epochs). Single-letter names are fine for short loop indices (i, j) but hurt readability in longer code.',
            },
            { type: 'heading', level: 3, text: 'Core Built-in Types' },
            {
              type: 'paragraph',
              text: 'Every value in Python has a type. The built-in types you will use daily in AI work include int, float, bool, str, list, dict, set, and tuple. The type() function reveals an object\'s class at runtime.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `n = 1000                    # int — arbitrary precision
lr = 0.001                  # float — IEEE 754 double
is_training = True          # bool
label = "cat"               # str — immutable Unicode sequence

print(type(n), type(lr), type(is_training), type(label))

# Type conversion (casting)
count = int("42")
ratio = float(7)
text = str(3.14)`,
            },
            {
              type: 'inlineFormulaParagraph',
              segments: [
                { text: 'Integers in Python have unbounded magnitude; floats follow IEEE 754 with roughly ' },
                { latex: '15{-}16' },
                { text: ' decimal digits of precision. For financial or scientific work requiring exact rationals, use the ' },
                { text: 'decimal' },
                { text: ' module — but for ML tensors, float64 is standard.' },
              ],
            },
            { type: 'heading', level: 2, text: 'Expressions and Operator Precedence' },
            {
              type: 'formula',
              latex: '\\text{result} = \\text{operand}_1 \\; \\mathsf{op} \\; \\text{operand}_2',
              caption: 'An expression evaluates to a single value',
            },
            {
              type: 'paragraph',
              text: 'Python evaluates expressions using standard mathematical precedence: parentheses, exponentiation (**), unary operators, multiplication/division/modulo, addition/subtraction, then comparisons and Boolean logic. The // operator performs floor division; % is the remainder (modulo).',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `# Arithmetic
print(7 // 3)    # 2 — floor division
print(7 % 3)     # 1 — remainder
print(2 ** 10)   # 1024 — exponentiation

# Comparisons return bool
print(3.14 > 3)          # True
print("abc" < "abd")     # True — lexicographic on strings

# Chained comparisons (Python idiom)
x = 5
print(1 < x < 10)        # True — equivalent to (1 < x) and (x < 10)`,
            },
            { type: 'heading', level: 3, text: 'Strings and f-Strings' },
            {
              type: 'paragraph',
              text: 'Strings are immutable sequences of Unicode characters. f-strings (formatted string literals) embed expressions inside curly braces — the preferred way to build readable output in modern Python.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `name = "Ada"
epoch = 42
loss = 0.0314

# f-string formatting
print(f"Epoch {epoch}: loss = {loss:.4f}")
print(f"Hello, {name}!")

# Multiline strings for docstrings and prompts
system_prompt = """
You are a helpful assistant.
Respond concisely.
"""`,
            },
            { type: 'heading', level: 2, text: 'Why Python for AI?' },
            {
              type: 'paragraph',
              text: 'Python\'s ecosystem — NumPy for numerics, PyTorch and TensorFlow for deep learning, Hugging Face for LLMs — is unmatched. The language prioritizes readability (significant whitespace), rapid prototyping (REPL and notebooks), and seamless C/Fortran extensions for performance-critical kernels.',
            },
            {
              type: 'list',
              items: [
                'Readable syntax lowers the cost of experimenting with new architectures.',
                'Dynamic typing accelerates research iteration; type hints add safety when needed.',
                'Rich standard library plus PyPI packages cover data, viz, and deployment.',
                'Industry and academia share the same tools — skills transfer directly.',
              ],
            },
            {
              type: 'note',
              variant: 'warning',
              text: 'Python is interpreted and single-threaded for CPU-bound loops due to the GIL. Vectorized NumPy/PyTorch operations and GPU kernels handle the heavy lifting in AI — write Python for orchestration, not inner loops.',
            },
          ],
        },
        {
          id: 'ac-py-control-flow',
          title: 'Control Flow & Functions',
          estMinutes: 32,
          objective:
            'Write programs that branch, iterate, and decompose logic into reusable functions with correct variable scope.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'Control flow turns static scripts into adaptive programs. Functions are the primary unit of abstraction in Python — every PyTorch nn.Module method and every data-pipeline step is ultimately built from functions.',
            },
            { type: 'heading', level: 2, text: 'Conditional Execution' },
            {
              type: 'paragraph',
              text: 'The if / elif / else statement evaluates Boolean conditions top-to-bottom and executes the first branch whose condition is True. Python treats empty collections, zero, None, and empty strings as falsy; everything else is truthy.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `def classify_score(score: float) -> str:
    """Return a letter grade for a numeric score."""
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    else:
        return "F"

# Ternary expression (compact if-else)
status = "pass" if score >= 60 else "fail"

# Guard clause pattern — early return reduces nesting
def safe_divide(a: float, b: float) -> float | None:
    if b == 0:
        return None
    return a / b`,
            },
            { type: 'heading', level: 2, text: 'Loops: for and while' },
            {
              type: 'paragraph',
              text: 'A for loop iterates over any iterable — lists, strings, ranges, file lines, or dataset batches. A while loop repeats until its condition becomes False. Prefer for when you know the iteration structure; use while for open-ended conditions.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `# for loop over a range
total = 0
for i in range(1, 101):      # 1..100 inclusive
    total += i
print(total)                   # 5050

# enumerate — index + value
fruits = ["apple", "banana", "cherry"]
for idx, fruit in enumerate(fruits):
    print(f"{idx}: {fruit}")

# while loop with break / continue
n = 1
while n < 1000:
    n *= 2
    if n == 256:
        continue   # skip this iteration
    if n >= 512:
        break      # exit loop early`,
            },
            {
              type: 'inlineFormulaParagraph',
              segments: [
                { text: 'The sum ' },
                { latex: '\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}' },
                { text: ' is Gauss\'s formula — the loop above verifies it for ' },
                { latex: 'n = 100' },
                { text: '. Loops that accumulate sums appear constantly in loss computation and metric aggregation.' },
              ],
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'Use range(n) for 0..n-1, range(start, stop) for start..stop-1, and range(start, stop, step) for custom strides. range objects are lazy — they do not materialize the full sequence in memory.',
            },
            { type: 'heading', level: 2, text: 'Defining Functions' },
            {
              type: 'paragraph',
              text: 'A function packages a reusable computation. def creates a function object; return sends a value back to the caller. Parameters can have default values; *args collects extra positional arguments into a tuple; **kwargs collects extra keyword arguments into a dict.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `import math

def softmax(logits: list[float], temperature: float = 1.0) -> list[float]:
    """Numerically stable softmax over a list of logits."""
    scaled = [x / temperature for x in logits]
    max_val = max(scaled)
    exps = [math.exp(x - max_val) for x in scaled]
    total = sum(exps)
    return [e / total for e in exps]

def log_metrics(epoch, *losses, **metadata):
    avg = sum(losses) / len(losses)
    print(f"Epoch {epoch}: avg_loss={avg:.4f}, meta={metadata}")

log_metrics(1, 0.5, 0.3, 0.4, lr=0.001, model="gpt")`,
            },
            {
              type: 'formula',
              latex: '\\text{softmax}(z_i) = \\frac{e^{z_i / T}}{\\sum_j e^{z_j / T}}',
              caption: 'Softmax converts logits to a probability distribution; T is temperature',
            },
            { type: 'heading', level: 3, text: 'Scope: LEGB Rule' },
            {
              type: 'paragraph',
              text: 'Python resolves names using the LEGB rule: Local (inside the current function), Enclosing (nested functions), Global (module level), Built-in (preloaded names like len and print). Assigning to a name inside a function creates a local variable unless declared global or nonlocal.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `counter = 0  # global

def increment():
    global counter
    counter += 1

def make_multiplier(factor):
    def multiply(x):
        return x * factor   # factor from enclosing scope
    return multiply

double = make_multiplier(2)
print(double(5))  # 10`,
            },
            {
              type: 'note',
              variant: 'warning',
              text: 'Avoid mutable default arguments (def f(items=[]):). The default list is created once and shared across calls. Use def f(items=None): items = items or [] instead.',
            },
            {
              type: 'list',
              items: [
                'Functions should do one thing well — single-responsibility aids testing.',
                'Type hints (score: float -> str) document intent; they are not enforced at runtime.',
                'Docstrings (triple-quoted strings as the first statement) become help(f) output.',
                'Pure functions (no side effects) are easier to reason about and parallelize.',
              ],
            },
          ],
        },
        {
          id: 'ac-py-data-structures',
          title: 'Data Structures',
          estMinutes: 35,
          objective:
            'Choose and manipulate lists, dicts, sets, and tuples efficiently, with intuition for time-complexity trade-offs.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'Data structures are how programs organize information. Choosing the right one — list vs. dict vs. set — can mean the difference between O(1) lookup and O(n) scanning, a distinction that matters at dataset scale.',
            },
            { type: 'heading', level: 2, text: 'Lists: Ordered, Mutable Sequences' },
            {
              type: 'paragraph',
              text: 'A list is an ordered, heterogeneous, dynamically sized array of references. Indexing is O(1); append is amortized O(1); insertion or deletion at the front is O(n) because elements shift.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `batch = [0.12, 0.45, 0.33, 0.78]
batch.append(0.91)
batch.extend([0.05, 0.22])

# Slicing creates a shallow copy
first_half = batch[:len(batch) // 2]
batch[0] = 0.99

# List comprehension — concise construction
squares = [x ** 2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]`,
            },
            {
              type: 'formula',
              latex: 'T_{\\text{append}} = O(1) \\text{ amortized}, \\quad T_{\\text{insert}(0)} = O(n)',
              caption: 'List operation time complexities',
            },
            { type: 'heading', level: 3, text: 'Dictionaries: Hash Maps' },
            {
              type: 'paragraph',
              text: 'A dict maps hashable keys to values with average O(1) lookup, insertion, and deletion. Keys must be immutable (str, int, tuple of immutables). Dicts preserve insertion order since Python 3.7.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `# Word frequency counter — classic dict pattern
text = "the cat sat on the mat the cat"
freq: dict[str, int] = {}
for word in text.split():
    freq[word] = freq.get(word, 0) + 1

# Dict comprehension
vocab = {word: idx for idx, word in enumerate(sorted(freq))}

# Iterating keys, values, or items
for word, count in freq.items():
    print(f"{word}: {count}")`,
            },
            {
              type: 'inlineFormulaParagraph',
              segments: [
                { text: 'Average-case lookup in a hash table is ' },
                { latex: 'O(1)' },
                { text: '; worst-case (all keys collide) degrades to ' },
                { latex: 'O(n)' },
                { text: '. Python\'s dict uses open addressing with perturbed probing — robust in practice.' },
              ],
            },
            { type: 'heading', level: 3, text: 'Sets: Unordered Unique Elements' },
            {
              type: 'paragraph',
              text: 'A set stores unique, hashable elements with O(1) average membership testing. Sets support mathematical operations: union (|), intersection (&), difference (-), symmetric difference (^).',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `train_ids = {101, 102, 103, 104, 105}
val_ids = {104, 105, 106, 107}

overlap = train_ids & val_ids       # {104, 105} — data leakage!
train_only = train_ids - val_ids    # {101, 102, 103}

# Fast membership test
if 103 in train_ids:
    print("found")

# Remove duplicates from a list
unique_labels = list(set(["cat", "dog", "cat", "bird"]))`,
            },
            { type: 'heading', level: 3, text: 'Tuples: Immutable Sequences' },
            {
              type: 'paragraph',
              text: 'Tuples are fixed-size, immutable sequences. Because they cannot change, tuples are hashable (when their elements are) and serve as dict keys, function return bundles, and coordinates. Immutability prevents accidental mutation bugs.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `# Tuple unpacking — multiple return values
def min_max(values: list[float]) -> tuple[float, float]:
    return min(values), max(values)

lo, hi = min_max([1.2, 3.4, 0.5])

# Named tuples for readable field access
from collections import namedtuple
Point = namedtuple("Point", ["x", "y"])
origin = Point(0, 0)
print(origin.x, origin.y)`,
            },
            { type: 'heading', level: 2, text: 'Big-O Intuition for AI Workloads' },
            {
              type: 'paragraph',
              text: 'Big-O notation describes how runtime or memory grows with input size n. Constant O(1), logarithmic O(log n), linear O(n), and quadratic O(n²) are the tiers you will encounter most. Nested loops over datasets are the most common source of accidental O(n²) code.',
            },
            {
              type: 'formula',
              latex: 'O(g(n)) = \\{ f(n) \\mid \\exists\\, c, n_0 : \\forall n \\ge n_0,\\; 0 \\le f(n) \\le c \\cdot g(n) \\}',
              caption: 'Formal definition — f grows no faster than g asymptotically',
            },
            {
              type: 'list',
              items: [
                'list[i], dict[key], set membership — O(1) average.',
                'list.index(x), x in list — O(n) linear scan.',
                'sorted(list) — O(n log n).',
                'Nested for loops over n items — O(n²) unless inner body is O(1) with a hash map.',
              ],
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'When you need "have I seen this before?" inside a loop, use a set for O(1) lookups instead of scanning a list. This pattern appears in deduplication, graph visited tracking, and vocabulary building.',
            },
            {
              type: 'note',
              variant: 'why',
              text: 'Tokenization pipelines build dicts mapping words to indices; batch collation uses lists of tensors; hyperparameter grids use tuples. Mastering these four structures covers 90% of data-wrangling in ML code.',
            },
          ],
        },
      ],
    },
    {
      id: 'ac-py-module-advanced',
      title: 'Advanced Python for AI',
      subtitle: 'Object-oriented design, functional idioms, and production-grade engineering habits',
      topics: [
        {
          id: 'ac-py-oop-design',
          title: 'Object-Oriented Design',
          estMinutes: 30,
          objective:
            'Model domain concepts with classes, inheritance, and dunder methods — the same patterns used in PyTorch nn.Module and Hugging Face model classes.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'Every PyTorch layer, Hugging Face PreTrainedModel, and scikit-learn estimator is a class. Understanding OOP lets you read, extend, and debug the libraries that power modern AI.',
            },
            { type: 'heading', level: 2, text: 'Classes and Instances' },
            {
              type: 'paragraph',
              text: 'A class is a blueprint; an instance is a concrete object created from that blueprint. __init__ initializes instance state (attributes); methods are functions bound to the instance with self as the first parameter.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `class LinearLayer:
    """A simplified linear transformation: y = Wx + b."""

    def __init__(self, in_features: int, out_features: int):
        self.in_features = in_features
        self.out_features = out_features
        self.weight = [[0.0] * in_features for _ in range(out_features)]
        self.bias = [0.0] * out_features

    def forward(self, x: list[float]) -> list[float]:
        output = []
        for row_w, b in zip(self.weight, self.bias):
            dot = sum(w * xi for w, xi in zip(row_w, x))
            output.append(dot + b)
        return output

    def __repr__(self) -> str:
        return f"LinearLayer({self.in_features}, {self.out_features})"

layer = LinearLayer(3, 2)
print(layer)
print(layer.forward([1.0, 2.0, 3.0]))`,
            },
            { type: 'heading', level: 3, text: 'Encapsulation and Properties' },
            {
              type: 'paragraph',
              text: 'Encapsulation hides internal state behind a public interface. Python uses naming conventions (_protected, __mangled) rather than strict access control. The @property decorator turns a method into a getter, enabling validation on assignment.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `class LearningRateScheduler:
    def __init__(self, initial_lr: float):
        self._lr = initial_lr

    @property
    def lr(self) -> float:
        return self._lr

    @lr.setter
    def lr(self, value: float):
        if value <= 0:
            raise ValueError("Learning rate must be positive")
        self._lr = value

    def step(self, epoch: int):
        self.lr = self._lr * (0.95 ** epoch)`,
            },
            { type: 'heading', level: 2, text: 'Inheritance and Method Resolution' },
            {
              type: 'paragraph',
              text: 'Inheritance lets a subclass reuse and specialize a parent class. super() calls the parent\'s method — essential for extending __init__ without duplicating setup logic. Python uses the C3 linearization (MRO) to resolve method lookup in multiple inheritance.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `import random

class Module:
    def __init__(self):
        self.training = True

    def train(self, mode: bool = True):
        self.training = mode

class Dropout(Module):
    def __init__(self, p: float = 0.5):
        super().__init__()
        self.p = p

    def forward(self, x: list[float]) -> list[float]:
        if not self.training:
            return x
        # simplified: zero random elements
        return [0.0 if random.random() < self.p else v for v in x]`,
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'Prefer composition over deep inheritance hierarchies. Many PyTorch modules hold sub-modules as attributes (self.attention = MultiHeadAttention(...)) rather than inheriting dozens of levels deep.',
            },
            { type: 'heading', level: 2, text: 'Dunder (Magic) Methods' },
            {
              type: 'paragraph',
              text: 'Double-underscore methods define how objects interact with Python syntax. __repr__ and __str__ control printing; __len__, __getitem__, __iter__ make objects behave like built-in containers; __call__ makes instances callable like functions.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `class MiniDataset:
    def __init__(self, data: list[tuple]):
        self._data = data

    def __len__(self) -> int:
        return len(self._data)

    def __getitem__(self, idx: int):
        return self._data[idx]

    def __iter__(self):
        return iter(self._data)

ds = MiniDataset([("img1", 0), ("img2", 1), ("img3", 0)])
print(len(ds))       # 3
print(ds[1])         # ('img2', 1)
for sample in ds:
    print(sample)`,
            },
            {
              type: 'list',
              items: [
                '__init__ — constructor; __repr__ — unambiguous debug string.',
                '__getitem__ / __len__ — enable indexing and len(obj).',
                '__call__ — makes obj(...) invoke obj.__call__(...); used by nn.Module.',
                '__enter__ / __exit__ — context manager protocol (with statement).',
              ],
            },
            {
              type: 'note',
              variant: 'why',
              text: 'PyTorch DataLoader expects __len__ and __getitem__ on your Dataset. Hugging Face Tokenizer implements __call__ so you can write tokenizer("Hello"). Implementing dunders makes your classes feel native.',
            },
          ],
        },
        {
          id: 'ac-py-functional-patterns',
          title: 'Functional Patterns',
          estMinutes: 28,
          objective:
            'Apply decorators, generators, and comprehensions to write concise, memory-efficient Python — idioms common in ML training loops and data pipelines.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'Functional patterns reduce boilerplate and memory use. Generators stream data without loading everything into RAM; decorators add logging, timing, and caching with zero changes to core logic.',
            },
            { type: 'heading', level: 2, text: 'List, Dict, and Set Comprehensions' },
            {
              type: 'paragraph',
              text: 'Comprehensions provide a declarative syntax for building collections from iterables. They are often faster and more readable than equivalent for loops with append.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `# List comprehension
tokens = ["Hello", "World", "AI"]
lower = [t.lower() for t in tokens]

# With filter condition
long_tokens = [t for t in tokens if len(t) > 3]

# Dict comprehension — invert a mapping
word_to_id = {"the": 0, "cat": 1, "sat": 2}
id_to_word = {v: k for k, v in word_to_id.items()}

# Set comprehension — unique character bigrams
bigrams = {s[i:i+2] for s in tokens for i in range(len(s) - 1)}`,
            },
            {
              type: 'inlineFormulaParagraph',
              segments: [
                { text: 'A comprehension over ' },
                { latex: 'n' },
                { text: ' items runs in ' },
                { latex: 'O(n)' },
                { text: ' time and ' },
                { latex: 'O(n)' },
                { text: ' space (materialized). Generator expressions use ' },
                { latex: 'O(1)' },
                { text: ' extra space because they yield one element at a time.' },
              ],
            },
            { type: 'heading', level: 2, text: 'Generators and yield' },
            {
              type: 'paragraph',
              text: 'A generator function uses yield to produce a lazy sequence. Execution pauses at each yield and resumes on the next call to next(). This is ideal for streaming files, infinite sequences, and batching data without materializing the full dataset.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `def batch_iterator(data, batch_size: int):
    """Yield successive batches from a list."""
    for i in range(0, len(data), batch_size):
        yield data[i : i + batch_size]

samples = list(range(10))
for batch in batch_iterator(samples, batch_size=3):
    print(batch)  # [0,1,2], [3,4,5], [6,7,8], [9]

# Generator expression (lazy)
total = sum(x ** 2 for x in range(1_000_000))  # no list allocated`,
            },
            {
              type: 'formula',
              latex: '\\text{Memory}_{\\text{generator}} = O(1), \\quad \\text{Memory}_{\\text{list}} = O(n)',
              caption: 'Generators trade random access for constant memory',
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'itertools (chain, islice, groupby) and functools (reduce, lru_cache) extend functional patterns. For ML, torch.utils.data.IterableDataset uses generators to stream from disk.',
            },
            { type: 'heading', level: 2, text: 'Decorators' },
            {
              type: 'paragraph',
              text: 'A decorator is a function that wraps another function, adding behavior before or after the call. The @syntax is syntactic sugar for reassigning the function to the wrapper. functools.wraps preserves the original function\'s metadata.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `import functools
import time

def timing_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timing_decorator
def train_epoch(model, data):
    # ... training logic ...
    time.sleep(0.1)  # placeholder
    return 0.42

loss = train_epoch(None, [])  # prints timing automatically`,
            },
            {
              type: 'list',
              items: [
                '@property — computed attribute with optional setter.',
                '@staticmethod — function in a class namespace; no self.',
                '@classmethod — receives the class (cls) as first argument.',
                '@functools.lru_cache — memoize pure functions with hashable args.',
              ],
            },
            {
              type: 'note',
              variant: 'warning',
              text: 'Decorators that change a function\'s signature can break introspection tools. Always use @functools.wraps on wrapper functions. Parameterized decorators (@retry(max_attempts=3)) require an extra nesting level.',
            },
          ],
        },
        {
          id: 'ac-py-robust-code',
          title: 'Robust Code',
          estMinutes: 25,
          objective:
            'Handle failures gracefully with exceptions, organize code into modules, and adopt a testing mindset suitable for research reproducibility and production deployment.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'AI systems fail in messy ways — corrupt data files, GPU OOM, API timeouts. Robust Python code anticipates failure, isolates concerns in modules, and verifies behavior with tests. This is the difference between a notebook hack and reproducible research.',
            },
            { type: 'heading', level: 2, text: 'Exception Handling' },
            {
              type: 'paragraph',
              text: 'Exceptions interrupt normal flow when an error occurs. try / except catches specific exception types; else runs if no exception occurred; finally always runs (cleanup). Raise your own exceptions to signal contract violations.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `def load_config(path: str) -> dict:
    try:
        with open(path, "r") as f:
            import json
            config = json.load(f)
    except FileNotFoundError:
        raise FileNotFoundError(f"Config not found: {path}") from None
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON in {path}: {e}") from e
    else:
        print(f"Loaded config from {path}")
    finally:
        pass  # file handle closed by 'with'
    return config

# EAFP — "Easier to Ask Forgiveness than Permission"
def safe_int(value):
    try:
        return int(value)
    except (ValueError, TypeError):
        return None`,
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'Python culture prefers EAFP (try/except) over LBYL (if os.path.exists). In concurrent code, a check-then-act pattern can race; try/except is atomic with respect to the operation.',
            },
            { type: 'heading', level: 2, text: 'Modules and Package Structure' },
            {
              type: 'paragraph',
              text: 'A module is a .py file; a package is a directory with __init__.py. import loads a module once and caches it in sys.modules. Organize AI projects as src/model/, src/data/, src/train/ with clear public APIs.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `# project/
#   src/
#     mymodel/
#       __init__.py      # exposes public API
#       model.py
#       dataset.py
#       train.py

# In train.py:
# from mymodel.model import Transformer
# from mymodel.dataset import TextDataset

# __init__.py — control what "from mymodel import *" exposes
__all__ = ["Transformer", "TextDataset"]

# Relative import within package
# from .model import Transformer`,
            },
            {
              type: 'list',
              items: [
                'One module, one concern — model architecture separate from training loop.',
                'Use if __name__ == "__main__": to guard script-only code.',
                'Virtual environments (venv, conda) isolate dependencies per project.',
                'requirements.txt or pyproject.toml pin versions for reproducibility.',
              ],
            },
            { type: 'heading', level: 2, text: 'Testing Mindset' },
            {
              type: 'paragraph',
              text: 'Tests verify that code behaves as intended. Unit tests check individual functions in isolation; integration tests check components working together. Even in research, testing data loaders, loss functions, and metric computations catches bugs before expensive GPU runs.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `# test_softmax.py — pytest style
import math

def softmax(logits: list[float]) -> list[float]:
    max_val = max(logits)
    exps = [math.exp(x - max_val) for x in logits]
    total = sum(exps)
    return [e / total for e in exps]

def test_softmax_sums_to_one():
    result = softmax([1.0, 2.0, 3.0])
    assert abs(sum(result) - 1.0) < 1e-9

def test_softmax_ordering_preserved():
    result = softmax([1.0, 2.0, 3.0])
    assert result[2] > result[1] > result[0]

def test_softmax_empty_raises():
    try:
        softmax([])
        assert False, "Expected ValueError"
    except ValueError:
        pass`,
            },
            {
              type: 'inlineFormulaParagraph',
              segments: [
                { text: 'A softmax output satisfies ' },
                { latex: '\\sum_i p_i = 1' },
                { text: ' and ' },
                { latex: 'p_i > 0' },
                { text: '. Asserting these invariants in tests catches numerical bugs before they corrupt training.' },
              ],
            },
            {
              type: 'note',
              variant: 'why',
              text: '',
            },
            {
              type: 'note',
              variant: 'warning',
              text: 'Never use bare except: — it catches KeyboardInterrupt and SystemExit. Catch specific exceptions (ValueError, FileNotFoundError) and let unexpected errors propagate with full tracebacks.',
            },
          ],
        },
      ],
    },
  ],
};
