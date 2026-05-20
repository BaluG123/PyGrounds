import { BarChart3 } from 'lucide-react-native';
import type { CourseModule } from '../types/course';

export const matplotlibCourse: CourseModule = {
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
    'Subplots and multi-panel layouts',
    'Saving reproducible figures',
  ],
  lessons: [
    {
      id: 'mpl-figures',
      title: 'Figures and Axes',
      duration: '18 min',
      objective: 'Understand the objects behind every plot.',
      blocks: [
        { type: 'paragraph', text: 'A figure is the full canvas. Axes are the actual plotting areas. Learning this makes complex layouts much easier.' },
        { type: 'code', code: "import matplotlib.pyplot as plt\nx = [1, 2, 3]\ny = [2, 4, 9]\nplt.plot(x, y)\nplt.title('Growth')\nplt.show()" },
        { type: 'playground', code: "import matplotlib.pyplot as plt\nx = [1, 2, 3, 4, 5]\ny = [1, 4, 9, 16, 25]\nplt.plot(x, y, marker='o')\nplt.xlabel('x')\nplt.ylabel('x squared')\nplt.title('Quadratic Growth')\nplt.show()", expectedOutput: 'Plot rendered: line chart titled Quadratic Growth' },
        { type: 'bullets', items: [
          'Label axes so future readers know what changed.',
          'Use scatter plots for relationships and histograms for distributions.',
          'Plot data before training a model.',
        ] },
      ],
    },
    {
      id: 'mpl-distributions',
      title: 'Seeing Distributions',
      duration: '20 min',
      objective: 'Use histograms to detect skew, outliers, and scale problems.',
      blocks: [
        { type: 'formula', expression: 'good visualization = question + chart + honest scale' },
        { type: 'code', code: 'import matplotlib.pyplot as plt\nscores = [55, 65, 67, 70, 92]\nplt.hist(scores, bins=3)\nplt.title("Score distribution")\nplt.show()' },
        { type: 'playground', code: 'import matplotlib.pyplot as plt\nimport numpy as np\nnp.random.seed(42)\ndata = np.random.normal(100, 15, 500)\nplt.hist(data, bins=20, color="steelblue", edgecolor="white")\nplt.title("Normal Distribution (μ=100, σ=15)")\nplt.xlabel("Value")\nplt.ylabel("Frequency")\nplt.show()', expectedOutput: 'Plot rendered: histogram with 20 bins titled Normal Distribution' },
      ],
    },
    {
      id: 'mpl-model-diagnostics',
      title: 'Model Diagnostics',
      duration: '25 min',
      objective: 'Plot learning curves and errors to debug models.',
      blocks: [
        { type: 'paragraph', text: 'When a model fails, charts often reveal whether the issue is data quality, underfitting, overfitting, or a bad metric.' },
        { type: 'code', code: "import matplotlib.pyplot as plt\nepochs = [1, 2, 3, 4]\nloss = [1.2, 0.8, 0.55, 0.5]\nplt.plot(epochs, loss)\nplt.xlabel('epoch')\nplt.ylabel('loss')\nplt.show()" },
        { type: 'playground', code: "import matplotlib.pyplot as plt\nepochs = list(range(1, 11))\ntrain_loss = [1.0, 0.7, 0.5, 0.35, 0.25, 0.18, 0.12, 0.08, 0.05, 0.03]\nval_loss = [1.0, 0.75, 0.6, 0.55, 0.53, 0.55, 0.6, 0.65, 0.7, 0.78]\nplt.plot(epochs, train_loss, label='Train')\nplt.plot(epochs, val_loss, label='Validation')\nplt.xlabel('Epoch')\nplt.ylabel('Loss')\nplt.legend()\nplt.title('Overfitting Example')\nplt.show()", expectedOutput: 'Plot rendered: two lines showing overfitting pattern' },
      ],
    },
    {
      id: 'mpl-subplots',
      title: 'Subplots and Layouts',
      duration: '20 min',
      objective: 'Create multi-panel figures to compare data side by side.',
      blocks: [
        { type: 'paragraph', text: 'Subplots let you display multiple charts in a single figure. This is essential for comparing different views of the same dataset.' },
        { type: 'playground', code: "import matplotlib.pyplot as plt\nfig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))\nax1.bar(['A', 'B', 'C'], [30, 50, 40])\nax1.set_title('Sales by Region')\nax2.pie([30, 50, 20], labels=['A', 'B', 'C'])\nax2.set_title('Market Share')\nplt.tight_layout()\nplt.show()", expectedOutput: 'Plot rendered: 2 subplots - bar chart and pie chart' },
        { type: 'bullets', items: [
          'fig, axes = plt.subplots(rows, cols) creates a grid.',
          'Each ax object has its own plot, title, and labels.',
          'plt.tight_layout() prevents overlapping labels.',
          'figsize=(width, height) controls the overall figure size.',
        ] },
      ],
    },
    {
      id: 'mpl-heatmaps',
      title: 'Heatmaps and Annotations',
      duration: '18 min',
      objective: 'Visualize correlation matrices and confusion matrices as heatmaps.',
      blocks: [
        { type: 'paragraph', text: 'Heatmaps use color intensity to show values in a matrix. They are the standard way to visualize correlation matrices and confusion matrices in ML.' },
        { type: 'playground', code: "import matplotlib.pyplot as plt\nimport numpy as np\ndata = np.array([[1.0, 0.8, 0.2], [0.8, 1.0, 0.5], [0.2, 0.5, 1.0]])\nlabels = ['Feature A', 'Feature B', 'Feature C']\nplt.imshow(data, cmap='Blues')\nplt.colorbar()\nplt.xticks([0,1,2], labels, rotation=45)\nplt.yticks([0,1,2], labels)\nplt.title('Correlation Matrix')\nplt.show()", expectedOutput: 'Plot rendered: heatmap correlation matrix' },
        { type: 'bullets', items: [
          'cmap controls the color scheme: Blues, Reds, viridis, coolwarm.',
          'plt.colorbar() adds a legend showing value-to-color mapping.',
          'Use plt.annotate() to add text labels on specific points.',
          'Seaborn (built on Matplotlib) makes heatmaps even easier.',
        ] },
      ],
    },
  ],
  quiz: [
    { id: 'mpl-q1', prompt: 'Who created Matplotlib?', options: ['John D. Hunter', 'Wes McKinney', 'Guido van Rossum', 'Yann LeCun'], answerIndex: 0, explanation: 'John D. Hunter created Matplotlib in 2003.' },
    { id: 'mpl-q2', prompt: 'What is an axes object?', options: ['The plotting area inside a figure', 'Only the x-axis line', 'A CSV reader', 'A NumPy dtype'], answerIndex: 0, explanation: 'Axes contain plotted data, ticks, labels, and scales.' },
    { id: 'mpl-q3', prompt: 'Which chart is best for a distribution?', options: ['Histogram', 'Single number', 'Package list', 'Import statement'], answerIndex: 0, explanation: 'Histograms show how values are distributed across bins.' },
    { id: 'mpl-q4', prompt: 'Why plot loss across epochs?', options: ['To debug learning behavior', 'To install Python', 'To merge tables', 'To change array dtype'], answerIndex: 0, explanation: 'Training curves reveal stagnation, overfitting, and learning-rate issues.' },
    { id: 'mpl-q5', prompt: 'What does plt.subplots(2, 3) create?', options: ['A figure with 6 axes in a 2×3 grid', 'A single large plot', '23 separate figures', 'An error'], answerIndex: 0, explanation: 'subplots(rows, cols) creates a grid of individual plotting areas.' },
    { id: 'mpl-q6', prompt: 'Which plot type is best for showing correlation between features?', options: ['Scatter plot', 'Pie chart', 'Bar chart', 'Line chart'], answerIndex: 0, explanation: 'Scatter plots reveal the relationship pattern between two continuous variables.' },
    { id: 'mpl-q7', prompt: 'What does plt.tight_layout() do?', options: ['Adjusts spacing to prevent overlapping labels', 'Makes the figure smaller', 'Removes gridlines', 'Changes the colormap'], answerIndex: 0, explanation: 'tight_layout() automatically adjusts subplot parameters for clean spacing.' },
    { id: 'mpl-q8', prompt: 'What is a heatmap commonly used for in ML?', options: ['Visualizing confusion matrices and correlations', 'Training neural networks', 'Loading CSV files', 'Optimizing hyperparameters'], answerIndex: 0, explanation: 'Color-coded matrices clearly show patterns in confusion matrices and correlation tables.' },
    { id: 'mpl-q9', prompt: 'If validation loss increases while training loss decreases, what is happening?', options: ['Overfitting', 'Underfitting', 'Perfect generalization', 'Data leakage'], answerIndex: 0, explanation: 'This divergence pattern is the classic sign of overfitting.' },
    { id: 'mpl-q10', prompt: 'What does the cmap parameter control?', options: ['The color scheme of the plot', 'The camera angle', 'The chart margins', 'The file format'], answerIndex: 0, explanation: 'cmap (colormap) sets the color palette used to represent values.' },
  ],
  practice: [
    { id: 'mpl-p1', title: 'Line Plot', prompt: 'Plot x=[1,2,3] and y=[2,4,9] with a title.', starterCode: "import matplotlib.pyplot as plt\nx = [1, 2, 3]\ny = [2, 4, 9]\nplt.plot(x, y)\nplt.title('Growth')\nplt.show()", expectedOutput: 'Plot: line chart with 3 points titled Growth', hint: 'Use plt.plot, plt.title, and plt.show.' },
    { id: 'mpl-p2', title: 'Histogram', prompt: 'Create a histogram of five scores using three bins.', starterCode: 'import matplotlib.pyplot as plt\nscores = [55, 65, 67, 70, 92]\nplt.hist(scores, bins=3)\nplt.show()', expectedOutput: 'Plot: histogram with 3 bins', hint: 'plt.hist accepts bins=3.' },
    { id: 'mpl-p3', title: 'Training Curve', prompt: 'Plot loss values over epochs.', starterCode: "import matplotlib.pyplot as plt\nepochs = [1, 2, 3, 4]\nloss = [1.2, 0.8, 0.55, 0.5]\nplt.plot(epochs, loss)\nplt.xlabel('epoch')\nplt.ylabel('loss')\nplt.show()", expectedOutput: 'Plot: line chart with labels epoch and loss', hint: 'The x-axis should be epochs and the y-axis should be loss.' },
    { id: 'mpl-p4', title: 'Scatter Plot', prompt: 'Create a scatter plot of hours vs scores.', starterCode: "import matplotlib.pyplot as plt\nhours = [1, 2, 3, 4, 5]\nscores = [50, 60, 65, 80, 90]\nplt.scatter(hours, scores, color='green')\nplt.xlabel('Hours')\nplt.ylabel('Score')\nplt.title('Study vs Score')\nplt.show()", expectedOutput: 'Plot: scatter plot titled Study vs Score', hint: 'plt.scatter(x, y) creates a scatter plot.' },
    { id: 'mpl-p5', title: 'Bar Chart', prompt: 'Create a bar chart of category sales.', starterCode: "import matplotlib.pyplot as plt\ncategories = ['A', 'B', 'C']\nvalues = [30, 50, 40]\nplt.bar(categories, values, color='coral')\nplt.title('Sales by Category')\nplt.show()", expectedOutput: 'Plot: bar chart titled Sales by Category', hint: 'plt.bar(labels, values) creates vertical bars.' },
    { id: 'mpl-p6', title: 'Two Subplots', prompt: 'Create a figure with 2 side-by-side plots.', starterCode: "import matplotlib.pyplot as plt\nfig, (ax1, ax2) = plt.subplots(1, 2)\nax1.plot([1,2,3], [1,4,9])\nax1.set_title('Quadratic')\nax2.bar(['X','Y'], [10, 20])\nax2.set_title('Categories')\nplt.tight_layout()\nplt.show()", expectedOutput: 'Plot: 2 subplots side by side', hint: 'plt.subplots(1, 2) creates 1 row, 2 columns.' },
  ],
};
