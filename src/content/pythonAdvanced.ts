import { Workflow } from 'lucide-react-native';
import type { CourseModule } from '../types/course';

export const pythonAdvancedCourse: CourseModule = {
  id: 'python-advanced',
  title: 'Python Advanced',
  subtitle: 'OOP, decorators, generators, error handling',
  color: '#6B4C9A',
  accent: '#EDE5F7',
  Icon: Workflow,
  history: {
    founder: 'Guido van Rossum',
    released: '1991',
    summary:
      'Python\'s advanced features — classes, generators, decorators — let you build large, maintainable AI projects. Most ML frameworks are built on these patterns.',
  },
  concepts: [
    'Classes, objects, and __init__',
    'Inheritance and method overriding',
    'Decorators as function wrappers',
    'Generators and yield for lazy iteration',
    'try / except / finally error handling',
    'Context managers (with statement)',
    'Modules and packages',
    'Type hints for documentation',
  ],
  lessons: [
    {
      id: 'pya-oop',
      title: 'Classes and OOP',
      duration: '22 min',
      objective: 'Model real-world entities with classes, attributes, and methods.',
      blocks: [
        {
          type: 'paragraph',
          text: 'A class is a blueprint. An object is a concrete instance of that blueprint. ML models, datasets, and training loops are all commonly organized as classes.',
        },
        {
          type: 'code',
          code: 'class Neuron:\n    def __init__(self, weight, bias):\n        self.weight = weight\n        self.bias = bias\n\n    def forward(self, x):\n        return self.weight * x + self.bias\n\nn = Neuron(0.5, 2)\nprint(n.forward(10))',
        },
        {
          type: 'playground',
          code: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return f"{self.name} says Woof!"\n\ndog = Dog("Rex")\nprint(dog.bark())',
          expectedOutput: 'Rex says Woof!',
        },
        {
          type: 'bullets',
          items: [
            '__init__ runs when you create an object — it sets up initial state.',
            'self refers to the current instance.',
            'Methods are functions that belong to a class.',
            'Inheritance: class Child(Parent) inherits all parent methods.',
          ],
        },
      ],
    },
    {
      id: 'pya-decorators',
      title: 'Decorators and Generators',
      duration: '24 min',
      objective: 'Wrap functions with decorators and produce values lazily with generators.',
      blocks: [
        {
          type: 'paragraph',
          text: 'Decorators modify function behavior without changing the function itself. Generators produce values one at a time, saving memory when working with large datasets.',
        },
        {
          type: 'code',
          code: 'def timer(func):\n    def wrapper(*args):\n        print(f"Calling {func.__name__}")\n        result = func(*args)\n        print("Done")\n        return result\n    return wrapper\n\n@timer\ndef add(a, b):\n    return a + b\n\nprint(add(3, 4))',
        },
        {
          type: 'code',
          code: 'def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\nprint(list(fibonacci(8)))',
        },
        {
          type: 'playground',
          code: 'def squares_gen(n):\n    for i in range(n):\n        yield i ** 2\n\nprint(list(squares_gen(6)))',
          expectedOutput: '[0, 1, 4, 9, 16, 25]',
        },
        {
          type: 'bullets',
          items: [
            '@decorator is syntactic sugar for func = decorator(func).',
            'yield pauses a function and remembers its state.',
            'Generators are memory-efficient for large sequences.',
            'Common in ML: data loaders that yield batches.',
          ],
        },
      ],
    },
    {
      id: 'pya-errors',
      title: 'Error Handling',
      duration: '18 min',
      objective: 'Write robust code that handles failures gracefully.',
      blocks: [
        {
          type: 'paragraph',
          text: 'Production AI systems must handle errors — bad data, missing files, network failures. Python\'s try/except lets you catch and recover from errors.',
        },
        {
          type: 'code',
          code: 'def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "Cannot divide by zero"\n    finally:\n        print("Division attempted")\n\nprint(safe_divide(10, 0))',
        },
        {
          type: 'playground',
          code: 'values = [10, "bad", 30]\ntotal = 0\nfor v in values:\n    try:\n        total += int(v)\n    except ValueError:\n        print(f"Skipping: {v}")\nprint(f"Total: {total}")',
          expectedOutput: 'Skipping: bad\nTotal: 40',
        },
        {
          type: 'bullets',
          items: [
            'Catch specific exceptions, not bare except.',
            'finally always runs — good for cleanup.',
            'raise lets you create your own errors.',
            'Custom exceptions: class MyError(Exception): pass.',
          ],
        },
      ],
    },
    {
      id: 'pya-modules',
      title: 'Modules and Packages',
      duration: '16 min',
      objective: 'Organize code into reusable modules and understand imports.',
      blocks: [
        {
          type: 'paragraph',
          text: 'As projects grow, you split code into modules (files) and packages (folders). Every AI library you import — numpy, pandas, sklearn — is a package.',
        },
        {
          type: 'code',
          code: 'import math\nprint(math.sqrt(144))\nprint(math.pi)\n\nfrom random import randint\nprint(randint(1, 100))',
        },
        {
          type: 'formula',
          expression: 'import module | from module import func | from module import *',
          note: 'Avoid import * in real projects — it pollutes the namespace.',
        },
        {
          type: 'bullets',
          items: [
            'A module is a .py file. A package is a folder with __init__.py.',
            'Use if __name__ == "__main__": to guard script execution.',
            'pip install package_name adds third-party packages.',
            'Virtual environments isolate project dependencies.',
            'Type hints: def greet(name: str) -> str: improve documentation.',
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: 'pya-q1',
      prompt: 'What does __init__ do in a Python class?',
      options: ['Initializes a new object', 'Deletes an object', 'Imports a module', 'Defines a global variable'],
      answerIndex: 0,
      explanation: '__init__ is the constructor — it runs when you create an instance.',
    },
    {
      id: 'pya-q2',
      prompt: 'What does the self parameter refer to?',
      options: ['The current object instance', 'The class itself', 'The parent class', 'A global variable'],
      answerIndex: 0,
      explanation: 'self is a reference to the specific object calling the method.',
    },
    {
      id: 'pya-q3',
      prompt: 'What does yield do in a function?',
      options: ['Pauses and produces a value', 'Ends the function', 'Raises an error', 'Imports a module'],
      answerIndex: 0,
      explanation: 'yield produces a value and suspends the function state until next() is called.',
    },
    {
      id: 'pya-q4',
      prompt: 'What is a decorator?',
      options: ['A function that wraps another function', 'A CSS class', 'A type hint', 'A loop construct'],
      answerIndex: 0,
      explanation: 'Decorators take a function, add behavior, and return a new function.',
    },
    {
      id: 'pya-q5',
      prompt: 'Which block always runs, even if an error occurs?',
      options: ['finally', 'except', 'else', 'try'],
      answerIndex: 0,
      explanation: 'finally runs after try/except regardless of whether an error occurred.',
    },
    {
      id: 'pya-q6',
      prompt: 'What does class Dog(Animal) mean?',
      options: ['Dog inherits from Animal', 'Dog is inside Animal', 'Dog deletes Animal', 'Dog is a module'],
      answerIndex: 0,
      explanation: 'Parentheses after the class name indicate inheritance from the parent class.',
    },
    {
      id: 'pya-q7',
      prompt: 'What makes generators memory-efficient?',
      options: ['They produce values one at a time', 'They compress data', 'They run on GPU', 'They use less disk space'],
      answerIndex: 0,
      explanation: 'Generators yield items lazily instead of storing the entire sequence in memory.',
    },
    {
      id: 'pya-q8',
      prompt: 'How do you catch a specific error type?',
      options: ['except ValueError:', 'catch ValueError:', 'handle ValueError:', 'error ValueError:'],
      answerIndex: 0,
      explanation: 'Python uses "except ErrorType:" to catch specific exception types.',
    },
    {
      id: 'pya-q9',
      prompt: 'What is the purpose of __name__ == "__main__"?',
      options: ['Run code only when the file is executed directly', 'Import all modules', 'Define the main class', 'Set the file name'],
      answerIndex: 0,
      explanation: 'This guard prevents code from running when the file is imported as a module.',
    },
    {
      id: 'pya-q10',
      prompt: 'What does pip install do?',
      options: ['Installs a third-party package', 'Creates a new file', 'Compiles Python to C', 'Starts a web server'],
      answerIndex: 0,
      explanation: 'pip is Python\'s package installer for downloading libraries from PyPI.',
    },
  ],
  practice: [
    {
      id: 'pya-p1',
      title: 'Simple Class',
      prompt: 'Create a Neuron class with forward(x) that computes weight*x + bias.',
      starterCode: 'class Neuron:\n    def __init__(self, weight, bias):\n        self.weight = weight\n        self.bias = bias\n    def forward(self, x):\n        return self.weight * x + self.bias\n\nn = Neuron(0.5, 2)\nprint(n.forward(10))',
      expectedOutput: '7.0',
      hint: 'forward returns self.weight * x + self.bias.',
    },
    {
      id: 'pya-p2',
      title: 'Generator Range',
      prompt: 'Write a generator that yields squares from 0 to n-1.',
      starterCode: 'def squares_gen(n):\n    for i in range(n):\n        yield i ** 2\n\nprint(list(squares_gen(5)))',
      expectedOutput: '[0, 1, 4, 9, 16]',
      hint: 'Use yield inside a for loop.',
    },
    {
      id: 'pya-p3',
      title: 'Safe Division',
      prompt: 'Write a function that handles ZeroDivisionError.',
      starterCode: 'def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "Error"\n\nprint(safe_divide(10, 0))',
      expectedOutput: 'Error',
      hint: 'Wrap the division in try/except ZeroDivisionError.',
    },
    {
      id: 'pya-p4',
      title: 'Inheritance',
      prompt: 'Create Animal and Dog classes where Dog inherits speak().',
      starterCode: 'class Animal:\n    def speak(self):\n        return "..."\n\nclass Dog(Animal):\n    def speak(self):\n        return "Woof!"\n\nprint(Dog().speak())',
      expectedOutput: 'Woof!',
      hint: 'Override the speak method in the Dog class.',
    },
    {
      id: 'pya-p5',
      title: 'Math Module',
      prompt: 'Use the math module to compute the square root of 144.',
      starterCode: 'import math\nprint(math.sqrt(144))',
      expectedOutput: '12.0',
      hint: 'math.sqrt() returns the square root as a float.',
    },
  ],
};
