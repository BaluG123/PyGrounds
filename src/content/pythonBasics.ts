import { Code2 } from 'lucide-react-native';
import type { CourseModule } from '../types/course';

export const pythonBasicsCourse: CourseModule = {
  id: 'python-basics',
  title: 'Python Basics',
  subtitle: 'Variables, control flow, functions, data structures',
  color: '#3776AB',
  accent: '#E0EEFF',
  Icon: Code2,
  history: {
    founder: 'Guido van Rossum',
    released: '1991',
    summary:
      'Python was designed for readability and simplicity. It became the dominant language in AI and data science because of its clean syntax and rich ecosystem.',
  },
  concepts: [
    'Variables and data types (int, float, str, bool)',
    'Operators and expressions',
    'if / elif / else control flow',
    'for and while loops',
    'Functions with parameters and return values',
    'Lists, tuples, dictionaries, and sets',
    'String formatting and methods',
    'File reading and writing',
    'List comprehensions',
    'Importing modules',
  ],
  lessons: [
    {
      id: 'py-variables',
      title: 'Variables and Data Types',
      duration: '15 min',
      objective: 'Understand how Python stores data in variables with types.',
      blocks: [
        { type: 'heading', text: 'What is a Variable?' },
        {
          type: 'paragraph',
          text: 'A variable is a name that refers to a value stored in your computer\'s memory. In Python, you create a variable simply by assigning a value to a name using the = sign. Unlike many other languages, you don\'t need to declare the type — Python figures it out automatically.',
        },
        {
          type: 'analogy',
          text: 'A variable is like a labeled box in a warehouse. The label (variable name) tells you what\'s inside, and you can swap the contents anytime. The box labeled "age" might hold 25 today and 26 next year.',
        },
        {
          type: 'image',
          title: 'Variables store values in labeled memory boxes',
          imageType: 'variable-boxes',
        },
        { type: 'divider' },
        { type: 'heading', text: 'Creating Variables' },
        {
          type: 'paragraph',
          text: 'Python is dynamically typed — you don\'t declare types, you just assign. The interpreter figures out the type from the value you give it.',
        },
        {
          type: 'code',
          code: 'name = "Ada"\\nage = 30\\npi = 3.14159\\nis_student = True\\nprint(type(name), type(age), type(pi))',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Dynamic Typing',
          body: 'You can reassign a variable to a completely different type: x = 5 then x = "hello" is perfectly valid in Python. This flexibility is powerful but requires careful attention.',
        },
        {
          type: 'table',
          headers: ['Type', 'Example', 'Description'],
          rows: [
            ['int', '42', 'Whole numbers (no decimals)'],
            ['float', '3.14', 'Decimal numbers'],
            ['str', '"hello"', 'Text enclosed in quotes'],
            ['bool', 'True / False', 'Logical values'],
            ['NoneType', 'None', 'Absence of a value'],
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'Try It Yourself' },
        {
          type: 'playground',
          code: 'x = 42\\ny = 3.14\\nz = "hello"\\nprint(type(x))\\nprint(type(y))\\nprint(type(z))',
          expectedOutput: "<class 'int'>\n<class 'float'>\n<class 'str'>",
        },
        {
          type: 'stepByStep',
          title: 'How Python Assigns a Variable',
          steps: [
            { title: 'You write x = 42', description: 'Python sees the assignment operator = and prepares to store a value.' },
            { title: 'Python creates the value 42', description: 'The integer 42 is created in memory as an int object.' },
            { title: 'The name x points to it', description: 'The variable name "x" becomes a reference (label) pointing to that 42 in memory.' },
            { title: 'type() checks the label', description: 'Calling type(x) looks at what x points to and tells you it\'s an int.' },
          ],
        },
        {
          type: 'formula',
          expression: 'int → whole numbers | float → decimals | str → text | bool → True/False',
          note: 'Python converts between types automatically in many cases (int + float = float).',
        },
        {
          type: 'callout',
          variant: 'remember',
          title: 'Naming Rules',
          body: 'Variable names are case-sensitive (age ≠ Age). Use snake_case: my_score, not myScore. Names must start with a letter or underscore, never a number.',
        },
        {
          type: 'bullets',
          items: [
            'Variable names are case-sensitive: age ≠ Age.',
            'Use snake_case for variable names: my_score, not myScore.',
            'None represents the absence of a value.',
            'Use type() to check any variable\'s type at runtime.',
          ],
        },
      ],
    },
    {
      id: 'py-control-flow',
      title: 'Control Flow',
      duration: '18 min',
      objective: 'Make decisions and repeat actions with if/else and loops.',
      blocks: [
        { type: 'heading', text: 'Making Decisions' },
        {
          type: 'paragraph',
          text: 'Control flow determines which code runs and how many times. Python uses indentation (not braces) to define blocks. This makes your code visually represent its logical structure.',
        },
        {
          type: 'analogy',
          text: 'Control flow is like a road with forks. At each fork (if statement), you check a sign (condition) and take the matching path. Loops are roundabouts — you keep going around until a condition lets you exit.',
        },
        {
          type: 'image',
          title: 'If/Else creates two execution paths based on a condition',
          imageType: 'if-else-branch',
        },
        {
          type: 'code',
          code: 'score = 85\\nif score >= 90:\\n    grade = "A"\\nelif score >= 80:\\n    grade = "B"\\nelse:\\n    grade = "C"\\nprint(grade)',
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Indentation Matters!',
          body: 'Python uses 4 spaces for indentation (not tabs). Mixing spaces and tabs will cause an IndentationError. Most editors handle this automatically, but be aware!',
        },
        { type: 'divider' },
        { type: 'heading', text: 'Loops — Repeating Actions' },
        {
          type: 'image',
          title: 'A loop repeats the body while the condition is true',
          imageType: 'loop-flow',
        },
        {
          type: 'playground',
          code: 'total = 0\\nfor i in range(1, 6):\\n    total += i\\nprint(total)',
          expectedOutput: '15',
        },
        {
          type: 'stepByStep',
          title: 'How a For Loop Executes',
          steps: [
            { title: 'range(1, 6) creates [1, 2, 3, 4, 5]', description: 'The range function generates numbers from start (1) up to but NOT including stop (6).' },
            { title: 'i = 1, total = 0 + 1 = 1', description: 'First iteration: i takes the value 1, total becomes 1.' },
            { title: 'i = 2, total = 1 + 2 = 3', description: 'Second iteration: i becomes 2, total grows to 3.' },
            { title: '...continues until i = 5', description: 'total = 1+2+3+4+5 = 15. The loop ends when all values are consumed.' },
          ],
        },
        {
          type: 'code',
          code: 'fruits = ["apple", "banana", "cherry"]\\nfor fruit in fruits:\\n    print(fruit.upper())',
        },
        {
          type: 'table',
          headers: ['Keyword', 'Purpose', 'Example'],
          rows: [
            ['if', 'Check a condition', 'if x > 5:'],
            ['elif', 'Additional condition', 'elif x > 3:'],
            ['else', 'Fallback branch', 'else:'],
            ['for', 'Loop over items', 'for i in range(5):'],
            ['while', 'Loop while true', 'while x > 0:'],
            ['break', 'Exit loop early', 'break'],
            ['continue', 'Skip iteration', 'continue'],
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'When to use for vs while',
          body: 'Use "for" when you know how many times to loop (iterating a list, range). Use "while" when you loop until a condition changes (waiting for user input, game loops).',
        },
        {
          type: 'bullets',
          items: [
            'Indentation is mandatory — use 4 spaces consistently.',
            'range(start, stop) excludes the stop value.',
            'while loops repeat until a condition becomes False.',
            'break exits a loop early; continue skips to the next iteration.',
          ],
        },
      ],
    },
    {
      id: 'py-functions',
      title: 'Functions',
      duration: '20 min',
      objective: 'Write reusable blocks of logic with parameters and return values.',
      blocks: [
        { type: 'heading', text: 'Why Functions?' },
        {
          type: 'paragraph',
          text: 'Functions let you name a block of code and call it whenever you need it. They take inputs (parameters) and can return outputs. This is the foundation of writing clean, organized, reusable code.',
        },
        {
          type: 'analogy',
          text: 'A function is like a vending machine. You put in coins (arguments), press a button (call the function), and get a snack (return value). You don\'t need to know the internal mechanics — just what goes in and what comes out.',
        },
        {
          type: 'image',
          title: 'Functions transform inputs into outputs',
          imageType: 'function-flow',
        },
        {
          type: 'code',
          code: 'def greet(name):\\n    return f"Hello, {name}!"\\n\\nprint(greet("Ada"))\\nprint(greet("Alan"))',
        },
        { type: 'divider' },
        { type: 'heading', text: 'Practice: Your First Function' },
        {
          type: 'playground',
          code: 'def square(n):\\n    return n * n\\n\\nresult = square(7)\\nprint(result)',
          expectedOutput: '49',
        },
        {
          type: 'stepByStep',
          title: 'Anatomy of a Function',
          steps: [
            { title: 'def keyword', description: 'Tells Python you\'re defining a new function.' },
            { title: 'Function name (square)', description: 'The name you\'ll use to call it later. Use snake_case.' },
            { title: 'Parameters (n)', description: 'Variables that receive the input values when called.' },
            { title: 'Body (return n * n)', description: 'The code that runs when the function is called.' },
            { title: 'return statement', description: 'Sends a value back to whoever called the function.' },
          ],
        },
        {
          type: 'formula',
          expression: 'def function_name(param1, param2=default): → return value',
          note: 'Default parameters make arguments optional.',
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Arguments vs Parameters',
          body: 'Parameters are the variable names in the function definition (def greet(name)). Arguments are the actual values you pass when calling it (greet("Ada")). They\'re often used interchangeably, but the distinction matters in documentation.',
        },
        {
          type: 'table',
          headers: ['Feature', 'Syntax', 'Use Case'],
          rows: [
            ['Default param', 'def f(x=10)', 'Optional arguments'],
            ['*args', 'def f(*args)', 'Variable positional args'],
            ['**kwargs', 'def f(**kw)', 'Variable keyword args'],
            ['Lambda', 'lambda x: x*2', 'Quick one-liner functions'],
          ],
        },
        {
          type: 'bullets',
          items: [
            'Functions should do one thing well.',
            'Use default parameters for optional arguments.',
            'Lambda functions: square = lambda x: x * x.',
            '*args collects extra positional arguments into a tuple.',
            '**kwargs collects extra keyword arguments into a dictionary.',
          ],
        },
      ],
    },
    {
      id: 'py-data-structures',
      title: 'Lists, Dicts, and Comprehensions',
      duration: '22 min',
      objective: 'Store and transform collections of data efficiently.',
      blocks: [
        { type: 'heading', text: 'Python Collections' },
        {
          type: 'paragraph',
          text: 'Lists are ordered, mutable sequences. Dictionaries map keys to values. Both are fundamental to every Python program and form the backbone of data manipulation.',
        },
        {
          type: 'analogy',
          text: 'A list is like a numbered shelf — items sit in order at positions 0, 1, 2... A dictionary is like a phone book — you look up a name (key) to find a number (value). No positions needed, just labels.',
        },
        {
          type: 'image',
          title: 'Lists store items at numbered index positions',
          imageType: 'list-visualization',
        },
        {
          type: 'code',
          code: 'scores = [85, 92, 78, 95, 88]\\nprint(max(scores))\\nprint(sorted(scores))',
        },
        {
          type: 'code',
          code: 'student = {"name": "Ada", "age": 30, "grade": "A"}\\nprint(student["name"])\\nprint(student.get("gpa", "N/A"))',
        },
        { type: 'divider' },
        { type: 'heading', text: 'List Comprehensions — Power in One Line' },
        {
          type: 'playground',
          code: 'nums = [1, 2, 3, 4, 5]\\nsquares = [x**2 for x in nums]\\nprint(squares)',
          expectedOutput: '[1, 4, 9, 16, 25]',
        },
        {
          type: 'formula',
          expression: '[expression for item in iterable if condition]',
          note: 'List comprehensions replace simple for-loops with one readable line.',
        },
        {
          type: 'table',
          headers: ['Structure', 'Syntax', 'Ordered?', 'Mutable?'],
          rows: [
            ['List', '[1, 2, 3]', 'Yes', 'Yes'],
            ['Tuple', '(1, 2, 3)', 'Yes', 'No'],
            ['Dict', '{"a": 1}', 'Yes (3.7+)', 'Yes'],
            ['Set', '{1, 2, 3}', 'No', 'Yes'],
          ],
        },
        {
          type: 'callout',
          variant: 'remember',
          title: 'When to Use What',
          body: 'Use lists for ordered collections you\'ll modify. Use tuples for fixed data (coordinates, RGB). Use dicts for key-value lookups. Use sets for unique items and fast membership testing.',
        },
        {
          type: 'bullets',
          items: [
            'Lists use [] and are ordered. Dicts use {} with key: value pairs.',
            'Sets use {} without values — they store unique items only.',
            'Tuples use () and are immutable (cannot be changed).',
            'Use .append(), .pop(), .insert() to modify lists.',
            'Dict comprehensions: {k: v for k, v in items}.',
          ],
        },
      ],
    },
    {
      id: 'py-file-io',
      title: 'File I/O and String Methods',
      duration: '16 min',
      objective: 'Read and write files, manipulate strings for data processing.',
      blocks: [
        { type: 'heading', text: 'Working with Files' },
        {
          type: 'paragraph',
          text: 'Reading data from files is the first step in most data science workflows. Python\'s built-in open() and string methods make this straightforward.',
        },
        {
          type: 'analogy',
          text: 'Opening a file is like checking out a library book. You open it (check out), read or write (use it), then close it (return it). The "with" statement is like an auto-return — it closes the file for you even if something goes wrong.',
        },
        {
          type: 'code',
          code: 'with open("data.txt", "w") as f:\\n    f.write("Hello, World!\\n")\\n    f.write("Python is great!")\\n\\nwith open("data.txt", "r") as f:\\n    content = f.read()\\n    print(content)',
        },
        {
          type: 'table',
          headers: ['Mode', 'Symbol', 'Description'],
          rows: [
            ['Read', '"r"', 'Read file contents (default)'],
            ['Write', '"w"', 'Write (creates or overwrites)'],
            ['Append', '"a"', 'Add to end of file'],
            ['Read+Write', '"r+"', 'Both read and write'],
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'String Power Tools' },
        {
          type: 'playground',
          code: 'text = "  Hello, Python World!  "\\nprint(text.strip())\\nprint(text.strip().lower())\\nprint(text.strip().split(", "))',
          expectedOutput: 'Hello, Python World!\nhello, python world!\n[\'Hello\', \'Python World!\']',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Method Chaining',
          body: 'String methods return new strings, so you can chain them: text.strip().lower().split(). Each method transforms the result of the previous one. This is a common Python pattern.',
        },
        {
          type: 'bullets',
          items: [
            'Always use "with" blocks — they close files automatically.',
            '"r" for reading, "w" for writing (overwrites), "a" for appending.',
            'f-strings: f"Value is {variable}" for formatted output.',
            '.strip() removes whitespace, .split() breaks strings into lists.',
            '.join() combines a list into a string: ", ".join(items).',
          ],
        },
      ],
    },
  ],
  quiz: [
    { id: 'pyb-q1', prompt: 'What type is the value 3.14 in Python?', options: ['float', 'int', 'str', 'decimal'], answerIndex: 0, explanation: 'Numbers with decimal points are float type in Python.' },
    { id: 'pyb-q2', prompt: 'What does range(1, 5) produce?', options: ['1, 2, 3, 4', '1, 2, 3, 4, 5', '0, 1, 2, 3, 4', '1, 5'], answerIndex: 0, explanation: 'range(start, stop) includes start but excludes stop.' },
    { id: 'pyb-q3', prompt: 'What keyword defines a function in Python?', options: ['def', 'func', 'function', 'define'], answerIndex: 0, explanation: 'Python uses "def" followed by the function name and parentheses.' },
    { id: 'pyb-q4', prompt: 'What does [x**2 for x in range(4)] produce?', options: ['[0, 1, 4, 9]', '[1, 4, 9, 16]', '[0, 2, 4, 6]', '[1, 2, 3, 4]'], answerIndex: 0, explanation: 'range(4) gives 0,1,2,3 and **2 squares each value.' },
    { id: 'pyb-q5', prompt: 'Which data structure uses key-value pairs?', options: ['Dictionary', 'List', 'Tuple', 'Set'], answerIndex: 0, explanation: 'Dictionaries store data as {key: value} pairs.' },
    { id: 'pyb-q6', prompt: 'What does "with open(file) as f" ensure?', options: ['The file is closed automatically', 'The file is encrypted', 'The file is compressed', 'The file is backed up'], answerIndex: 0, explanation: 'The "with" context manager guarantees the file is closed even if an error occurs.' },
    { id: 'pyb-q7', prompt: 'What is the result of bool(0)?', options: ['False', 'True', '0', 'None'], answerIndex: 0, explanation: 'Zero is falsy in Python. bool(0) returns False.' },
    { id: 'pyb-q8', prompt: 'Which method adds an item to the end of a list?', options: ['append()', 'add()', 'push()', 'insert()'], answerIndex: 0, explanation: 'list.append(item) adds the item to the end. insert() requires an index.' },
    { id: 'pyb-q9', prompt: 'What does "hello".upper() return?', options: ['"HELLO"', '"Hello"', '"hello"', 'Error'], answerIndex: 0, explanation: '.upper() converts all characters to uppercase.' },
    { id: 'pyb-q10', prompt: 'What is the difference between a tuple and a list?', options: ['Tuples are immutable', 'Tuples are faster at appending', 'Lists use ()', 'Tuples allow duplicates but lists do not'], answerIndex: 0, explanation: 'Tuples cannot be modified after creation; lists can.' },
  ],
  practice: [
    { id: 'pyb-p1', title: 'Sum of Squares', prompt: 'Use a list comprehension to create squares of 1-5 and print the sum.', starterCode: 'squares = [x**2 for x in range(1, 6)]\\nprint(sum(squares))', expectedOutput: '55', hint: 'range(1, 6) gives 1,2,3,4,5. Sum of 1+4+9+16+25 = 55.' },
    { id: 'pyb-p2', title: 'Grade Calculator', prompt: 'Write an if/elif/else to assign a letter grade for score = 85.', starterCode: 'score = 85\\nif score >= 90:\\n    grade = "A"\\nelif score >= 80:\\n    grade = "B"\\nelse:\\n    grade = "C"\\nprint(grade)', expectedOutput: 'B', hint: '85 is >= 80 but < 90, so it falls into the elif branch.' },
    { id: 'pyb-p3', title: 'Dictionary Access', prompt: 'Create a student dict and print the name.', starterCode: 'student = {"name": "Ada", "age": 30}\\nprint(student["name"])', expectedOutput: 'Ada', hint: 'Use square brackets with the key string to access dict values.' },
    { id: 'pyb-p4', title: 'Function Return', prompt: 'Write a function that doubles a number and print the result for 21.', starterCode: 'def double(n):\\n    return n * 2\\n\\nprint(double(21))', expectedOutput: '42', hint: 'Return n * 2 from the function.' },
    { id: 'pyb-p5', title: 'String Methods', prompt: 'Strip whitespace and convert to uppercase.', starterCode: 'text = "  hello world  "\\nprint(text.strip().upper())', expectedOutput: 'HELLO WORLD', hint: '.strip() removes spaces, .upper() capitalizes.' },
    { id: 'pyb-p6', title: 'Loop Accumulator', prompt: 'Use a for loop to sum numbers from 1 to 10.', starterCode: 'total = 0\\nfor i in range(1, 11):\\n    total += i\\nprint(total)', expectedOutput: '55', hint: 'range(1, 11) gives 1 through 10.' },
  ],
};
