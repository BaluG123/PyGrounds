import { BarChart3, Braces, Table2 } from 'lucide-react-native';
import type { CourseModule } from '../types/course';

export const courses: CourseModule[] = [
  {
    id: 'numpy',
    title: 'NumPy',
    subtitle: 'Arrays, vector math, broadcasting, linear algebra',
    color: '#1D7A57',
    accent: '#DDF4E8',
    Icon: Braces,
    history: {
      founder: 'Travis Oliphant and the scientific Python community',
      released: '2005',
      summary:
        'NumPy unified earlier array projects into the core numerical engine that most Python AI tools still stand on.',
    },
    concepts: [
      'ndarray shape, dtype, axes, strides',
      'Vectorization instead of slow Python loops',
      'Broadcasting rules for compatible shapes',
      'Boolean masks and fancy indexing',
      'Aggregations across axes',
      'Random sampling with reproducible seeds',
      'Linear algebra: dot products, norms, inverse, eigenvalues',
      'Saving arrays and preparing tensors for ML',
    ],
    lessons: [
      {
        id: 'numpy-arrays',
        title: 'Thinking in Arrays',
        duration: '18 min',
        objective: 'Read and reshape numerical data without losing track of axes.',
        blocks: [
          {
            type: 'paragraph',
            text: 'AI systems learn from numbers. NumPy gives you one fast object, ndarray, for storing those numbers with a shape and dtype.',
          },
          {
            type: 'formula',
            expression: 'shape = (rows, columns), axis 0 = down, axis 1 = across',
            note: 'Most beginner bugs come from mixing up axes.',
          },
          {
            type: 'code',
            code: 'import numpy as np\nx = np.array([[1, 2, 3], [4, 5, 6]])\nprint(x.shape)\nprint(x.mean(axis=0))',
          },
          {
            type: 'bullets',
            items: [
              'Use reshape only when the total element count stays the same.',
              'Use dtype deliberately: float32 for many ML tensors, int64 for ids.',
              'Use axis arguments until they feel automatic.',
            ],
          },
        ],
      },
      {
        id: 'numpy-broadcasting',
        title: 'Broadcasting and Vectorization',
        duration: '22 min',
        objective: 'Replace loops with operations across full arrays.',
        blocks: [
          {
            type: 'paragraph',
            text: 'Broadcasting lets NumPy stretch smaller arrays over larger arrays when dimensions are compatible.',
          },
          {
            type: 'formula',
            expression: '(m, n) + (n,) -> (m, n)',
            note: 'Compare shapes from the right side.',
          },
          {
            type: 'code',
            code: 'import numpy as np\nscores = np.array([[70, 80, 90], [65, 75, 85]])\ncurve = np.array([5, 3, 2])\nprint(scores + curve)',
          },
          {
            type: 'bullets',
            items: [
              'Vectorized code is shorter and usually much faster.',
              'Masks create readable filters: x[x > 0].',
              'Keep dimensions with keepdims=True when a later broadcast needs them.',
            ],
          },
        ],
      },
      {
        id: 'numpy-linear-algebra',
        title: 'Linear Algebra for AI',
        duration: '26 min',
        objective: 'Connect arrays to model weights, dot products, and distances.',
        blocks: [
          {
            type: 'paragraph',
            text: 'Neural networks are built from matrix multiplication, activation functions, and optimization. NumPy is the clearest place to learn those mechanics.',
          },
          {
            type: 'formula',
            expression: 'prediction = XW + b',
          },
          {
            type: 'code',
            code: 'import numpy as np\nX = np.array([[1, 2], [3, 4]])\nW = np.array([0.5, -1.0])\nb = 2\nprint(X @ W + b)',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'np-q1',
        prompt: 'What does axis=0 usually mean for a 2D array?',
        options: ['Operate down rows for each column', 'Operate across columns for each row', 'Flatten first', 'Transpose first'],
        answerIndex: 0,
        explanation: 'axis=0 collapses the row direction, producing one result per column.',
      },
      {
        id: 'np-q2',
        prompt: 'Which shape can broadcast with (4, 3)?',
        options: ['(3,)', '(4, 2)', '(5, 3)', '(2,)'],
        answerIndex: 0,
        explanation: 'Shapes are compared from the right: 3 matches 3, and the missing leading dimension is treated as 1.',
      },
      {
        id: 'np-q3',
        prompt: 'Why is vectorization important?',
        options: ['It pushes loops into optimized native code', 'It removes the need for data', 'It changes Python syntax', 'It only makes plots prettier'],
        answerIndex: 0,
        explanation: 'NumPy operations run in optimized compiled routines instead of slow Python loops.',
      },
      {
        id: 'np-q4',
        prompt: 'What does X @ W commonly represent in ML?',
        options: ['Matrix multiplication', 'String formatting', 'Random sampling', 'File saving'],
        answerIndex: 0,
        explanation: 'The @ operator performs matrix multiplication in Python.',
      },
    ],
    practice: [
      {
        id: 'np-p1',
        title: 'Normalize a Vector',
        prompt: 'Create an array [10, 20, 30], divide by its maximum, and print the result.',
        starterCode: 'import numpy as np\nx = np.array([10, 20, 30])\nprint(x / x.max())',
        expectedOutput: '[0.33333333 0.66666667 1.        ]',
        hint: 'x.max() returns the largest value.',
      },
      {
        id: 'np-p2',
        title: 'Column Means',
        prompt: 'Print the mean of each column in a 2x3 array.',
        starterCode: 'import numpy as np\nx = np.array([[1, 2, 3], [4, 5, 6]])\nprint(x.mean(axis=0))',
        expectedOutput: '[2.5 3.5 4.5]',
        hint: 'Columns survive when you reduce axis=0.',
      },
      {
        id: 'np-p3',
        title: 'Simple Linear Model',
        prompt: 'Use X @ W + b to produce two predictions.',
        starterCode: 'import numpy as np\nX = np.array([[1, 2], [3, 4]])\nW = np.array([0.5, -1.0])\nb = 2\nprint(X @ W + b)',
        expectedOutput: '[0.5 -0.5]',
        hint: 'The @ operator computes the dot product row by row.',
      },
    ],
  },
  {
    id: 'pandas',
    title: 'Pandas',
    subtitle: 'DataFrames, cleaning, grouping, time series',
    color: '#2B6CB0',
    accent: '#E3EEF9',
    Icon: Table2,
    history: {
      founder: 'Wes McKinney',
      released: '2008',
      summary:
        'Pandas was created to make practical data analysis in Python faster, especially for tabular and time-series work.',
    },
    concepts: [
      'Series and DataFrame mental models',
      'Selecting with loc and iloc',
      'Missing values: isna, fillna, dropna',
      'Filtering, sorting, assigning columns',
      'GroupBy split-apply-combine',
      'Merging and joining datasets',
      'Datetime parsing and resampling',
      'Exporting clean features for ML',
    ],
    lessons: [
      {
        id: 'pandas-dataframes',
        title: 'DataFrames as Tables',
        duration: '20 min',
        objective: 'Load, inspect, and select tabular data.',
        blocks: [
          {
            type: 'paragraph',
            text: 'Most AI work starts messy: csv files, labels, missing values, duplicate rows, and mixed types. Pandas is the workbench for turning that into usable data.',
          },
          {
            type: 'code',
            code: "import pandas as pd\ndf = pd.DataFrame({'hours': [1, 2, 3], 'score': [55, 65, 78]})\nprint(df.head())\nprint(df['score'].mean())",
          },
          {
            type: 'bullets',
            items: [
              'Use head, info, describe, and value_counts before modeling.',
              'loc selects by labels; iloc selects by integer position.',
              'A single column is a Series; multiple columns are a DataFrame.',
            ],
          },
        ],
      },
      {
        id: 'pandas-cleaning',
        title: 'Cleaning and Feature Columns',
        duration: '24 min',
        objective: 'Handle missing values and create model-ready columns.',
        blocks: [
          {
            type: 'formula',
            expression: 'clean data -> useful features -> reliable model',
          },
          {
            type: 'code',
            code: "import pandas as pd\ndf = pd.DataFrame({'name': ['Ada', 'Lin'], 'score': [90, None]})\ndf['score'] = df['score'].fillna(df['score'].mean())\nprint(df)",
          },
          {
            type: 'bullets',
            items: [
              'Never fill missing values blindly; understand why they are missing.',
              'Keep a raw copy of important datasets.',
              'Feature leakage happens when a column reveals the answer too directly.',
            ],
          },
        ],
      },
      {
        id: 'pandas-groupby',
        title: 'GroupBy for Insight',
        duration: '24 min',
        objective: 'Summarize patterns by category.',
        blocks: [
          {
            type: 'paragraph',
            text: 'GroupBy lets you split rows into groups, run an aggregation, and combine the result into a new table.',
          },
          {
            type: 'code',
            code: "import pandas as pd\ndf = pd.DataFrame({'team': ['A', 'A', 'B'], 'score': [80, 90, 70]})\nprint(df.groupby('team')['score'].mean())",
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'pd-q1',
        prompt: 'Who created Pandas?',
        options: ['Wes McKinney', 'Travis Oliphant', 'John Hunter', 'Geoffrey Hinton'],
        answerIndex: 0,
        explanation: 'Wes McKinney started Pandas in 2008.',
      },
      {
        id: 'pd-q2',
        prompt: 'Which method is commonly used to replace missing values?',
        options: ['fillna', 'reshape', 'broadcast', 'imshow'],
        answerIndex: 0,
        explanation: 'fillna replaces missing entries with a chosen value or statistic.',
      },
      {
        id: 'pd-q3',
        prompt: 'What does GroupBy implement?',
        options: ['Split-apply-combine', 'Only plotting', 'Only sorting', 'Matrix multiplication'],
        answerIndex: 0,
        explanation: 'Rows are split into groups, a function is applied, and results are combined.',
      },
      {
        id: 'pd-q4',
        prompt: 'When should you inspect data with info() and describe()?',
        options: ['Before modeling', 'Only after deployment', 'Only for images', 'Never'],
        answerIndex: 0,
        explanation: 'Inspection catches types, missing values, ranges, and suspicious columns early.',
      },
    ],
    practice: [
      {
        id: 'pd-p1',
        title: 'Average Score',
        prompt: 'Build a DataFrame with scores and print the mean score.',
        starterCode: "import pandas as pd\ndf = pd.DataFrame({'score': [55, 65, 78]})\nprint(df['score'].mean())",
        expectedOutput: '66.0',
        hint: "Select the 'score' column before calling mean().",
      },
      {
        id: 'pd-p2',
        title: 'Fill Missing Scores',
        prompt: 'Replace a missing score with the column mean.',
        starterCode: "import pandas as pd\ndf = pd.DataFrame({'score': [90, None]})\ndf['score'] = df['score'].fillna(df['score'].mean())\nprint(df)",
        expectedOutput: 'score\n0 90.0\n1 90.0',
        hint: 'Call fillna with df["score"].mean().',
      },
      {
        id: 'pd-p3',
        title: 'Group Mean',
        prompt: 'Print the average score for each team.',
        starterCode: "import pandas as pd\ndf = pd.DataFrame({'team': ['A', 'A', 'B'], 'score': [80, 90, 70]})\nprint(df.groupby('team')['score'].mean())",
        expectedOutput: 'team\nA 85.0\nB 70.0',
        hint: 'Group by team, select score, then call mean.',
      },
    ],
  },
  {
    id: 'matplotlib',
    title: 'Matplotlib',
    subtitle: 'Charts, distributions, model diagnostics',
    color: '#C84D3A',
    accent: '#FBE7E3',
    Icon: BarChart3,
    history: {
      founder: 'John D. Hunter',
      released: '2003',
      summary:
        'Matplotlib brought MATLAB-style plotting to Python and became the base layer for much of Python visualization.',
    },
    concepts: [
      'Figure and axes objects',
      'Line, scatter, bar, histogram, and heatmap charts',
      'Labels, legends, titles, grids, and annotations',
      'Choosing chart types by question',
      'Visualizing distributions and outliers',
      'Plotting training curves and residuals',
      'Saving reproducible figures',
      'Reading charts critically before modeling',
    ],
    lessons: [
      {
        id: 'mpl-figures',
        title: 'Figures and Axes',
        duration: '18 min',
        objective: 'Understand the objects behind every plot.',
        blocks: [
          {
            type: 'paragraph',
            text: 'A figure is the full canvas. Axes are the actual plotting areas. Learning this makes complex layouts much easier.',
          },
          {
            type: 'code',
            code: "import matplotlib.pyplot as plt\nx = [1, 2, 3]\ny = [2, 4, 9]\nplt.plot(x, y)\nplt.title('Growth')\nplt.show()",
          },
          {
            type: 'bullets',
            items: [
              'Label axes so future readers know what changed.',
              'Use scatter plots for relationships and histograms for distributions.',
              'Plot data before training a model.',
            ],
          },
        ],
      },
      {
        id: 'mpl-distributions',
        title: 'Seeing Distributions',
        duration: '20 min',
        objective: 'Use histograms to detect skew, outliers, and scale problems.',
        blocks: [
          {
            type: 'formula',
            expression: 'good visualization = question + chart + honest scale',
          },
          {
            type: 'code',
            code: 'import matplotlib.pyplot as plt\nscores = [55, 65, 67, 70, 92]\nplt.hist(scores, bins=3)\nplt.title("Score distribution")\nplt.show()',
          },
        ],
      },
      {
        id: 'mpl-model-diagnostics',
        title: 'Model Diagnostics',
        duration: '25 min',
        objective: 'Plot learning curves and errors to debug models.',
        blocks: [
          {
            type: 'paragraph',
            text: 'When a model fails, charts often reveal whether the issue is data quality, underfitting, overfitting, or a bad metric.',
          },
          {
            type: 'code',
            code: "import matplotlib.pyplot as plt\nepochs = [1, 2, 3, 4]\nloss = [1.2, 0.8, 0.55, 0.5]\nplt.plot(epochs, loss)\nplt.xlabel('epoch')\nplt.ylabel('loss')\nplt.show()",
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'mpl-q1',
        prompt: 'Who created Matplotlib?',
        options: ['John D. Hunter', 'Wes McKinney', 'Guido van Rossum', 'Yann LeCun'],
        answerIndex: 0,
        explanation: 'John D. Hunter created Matplotlib in 2003.',
      },
      {
        id: 'mpl-q2',
        prompt: 'What is an axes object?',
        options: ['The plotting area inside a figure', 'Only the x-axis line', 'A CSV reader', 'A NumPy dtype'],
        answerIndex: 0,
        explanation: 'Axes contain plotted data, ticks, labels, and scales.',
      },
      {
        id: 'mpl-q3',
        prompt: 'Which chart is best for a distribution?',
        options: ['Histogram', 'Single number', 'Package list', 'Import statement'],
        answerIndex: 0,
        explanation: 'Histograms show how values are distributed across bins.',
      },
      {
        id: 'mpl-q4',
        prompt: 'Why plot loss across epochs?',
        options: ['To debug learning behavior', 'To install Python', 'To merge tables', 'To change array dtype'],
        answerIndex: 0,
        explanation: 'Training curves reveal stagnation, overfitting, and learning-rate issues.',
      },
    ],
    practice: [
      {
        id: 'mpl-p1',
        title: 'Line Plot',
        prompt: 'Plot x=[1,2,3] and y=[2,4,9] with a title.',
        starterCode: "import matplotlib.pyplot as plt\nx = [1, 2, 3]\ny = [2, 4, 9]\nplt.plot(x, y)\nplt.title('Growth')\nplt.show()",
        expectedOutput: 'Plot: line chart with 3 points titled Growth',
        hint: 'Use plt.plot, plt.title, and plt.show.',
      },
      {
        id: 'mpl-p2',
        title: 'Histogram',
        prompt: 'Create a histogram of five scores using three bins.',
        starterCode: 'import matplotlib.pyplot as plt\nscores = [55, 65, 67, 70, 92]\nplt.hist(scores, bins=3)\nplt.show()',
        expectedOutput: 'Plot: histogram with 3 bins',
        hint: 'plt.hist accepts bins=3.',
      },
      {
        id: 'mpl-p3',
        title: 'Training Curve',
        prompt: 'Plot loss values over epochs.',
        starterCode: "import matplotlib.pyplot as plt\nepochs = [1, 2, 3, 4]\nloss = [1.2, 0.8, 0.55, 0.5]\nplt.plot(epochs, loss)\nplt.xlabel('epoch')\nplt.ylabel('loss')\nplt.show()",
        expectedOutput: 'Plot: line chart with labels epoch and loss',
        hint: 'The x-axis should be epochs and the y-axis should be loss.',
      },
    ],
  },
];

export const aiRoadmap = [
  'Python fundamentals and problem solving',
  'NumPy for numerical thinking',
  'Pandas for real datasets',
  'Matplotlib for visual debugging',
  'Statistics: mean, variance, probability, sampling, correlation',
  'Linear algebra: vectors, matrices, dot products, gradients',
  'Machine learning: regression, classification, validation, metrics',
  'Deep learning: tensors, neural networks, PyTorch or TensorFlow',
  'Projects: clean data, train models, explain results, deploy responsibly',
];
