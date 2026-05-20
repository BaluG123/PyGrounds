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
        { type: 'heading', text: 'The Anatomy of a Plot' },
        {
          type: 'paragraph',
          text: 'In Matplotlib, a plot is built like a painting. The `Figure` is the blank canvas (the entire window), and the `Axes` are the individual paintings (the coordinate grids) attached to that canvas.',
        },
        {
          type: 'diagram',
          title: 'Figure Hierarchy',
          boxes: [
            { id: 'fig', x: 20, y: 30, width: 90, height: 40, label: 'Figure Canvas', color: '#C84D3A' },
            { id: 'ax', x: 150, y: 15, width: 80, height: 35, label: 'Axes (Plot 1)', color: '#2D8CFF' },
            { id: 'ax2', x: 150, y: 65, width: 80, height: 35, label: 'Axes (Plot 2)', color: '#1D7A57' },
          ],
          arrows: [
            { from: 'fig', to: 'ax', label: 'Contains' },
            { from: 'fig', to: 'ax2', label: 'Contains' },
          ],
          height: 120,
        },
        {
          type: 'stepByStep',
          title: 'The State-Machine Workflow',
          steps: [
            { title: 'Create Plot', description: 'Call `plt.plot()` to plot data. Matplotlib automatically creates a Figure and Axes if they don\'t exist.' },
            { title: 'Add Details', description: 'Call `plt.title()`, `plt.xlabel()`, etc. These commands modify the current active Axes.' },
            { title: 'Display', description: 'Call `plt.show()` to render the completed canvas to the screen.' },
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'Plotting Quadratic Growth' },
        {
          type: 'playground',
          code: "import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4, 5]\ny = [1, 4, 9, 16, 25]\n\n# Plot line with circle markers\nplt.plot(x, y, marker='o', color='crimson')\n\n# Add metadata\nplt.xlabel('x')\nplt.ylabel('x squared')\nplt.title('Quadratic Growth')\nplt.grid(True)\n\nplt.show()",
          expectedOutput: 'Plot rendered: line chart titled Quadratic Growth',
        },
        {
          type: 'callout',
          variant: 'remember',
          title: 'Never Skip Labels!',
          body: 'A plot without labeled axes is completely meaningless to anyone else (and to you in 3 months). Always label your X and Y axes.',
        },
      ],
    },
    {
      id: 'mpl-distributions',
      title: 'Seeing Distributions',
      duration: '20 min',
      objective: 'Use histograms to detect skew, outliers, and scale problems.',
      blocks: [
        { type: 'heading', text: 'The Mighty Histogram' },
        {
          type: 'paragraph',
          text: 'Before feeding data into a machine learning model, you must check its distribution. Are most values clustered together? Are there extreme outliers? A histogram groups values into "bins" and counts them to reveal the shape of the data.',
        },
        {
          type: 'analogy',
          text: 'Imagine tossing 100 ping pong balls off a building into a row of buckets below. A histogram is just a bar chart showing how many balls landed in each bucket.',
        },
        {
          type: 'playground',
          code: 'import matplotlib.pyplot as plt\nimport numpy as np\n\n# Generate 500 fake test scores\nnp.random.seed(42)\nscores = np.random.normal(75, 10, 500)\n\n# Plot histogram with 20 bins\nplt.hist(scores, bins=20, color="steelblue", edgecolor="white")\nplt.title("Exam Score Distribution")\nplt.xlabel("Score")\nplt.ylabel("Number of Students")\nplt.show()',
          expectedOutput: 'Plot rendered: histogram with 20 bins titled Exam Score Distribution',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Choosing Bins',
          body: 'The `bins` parameter dictates how granular your histogram is. Too few bins (e.g., 2) hides the shape of the data. Too many bins (e.g., 200) makes the plot noisy. Usually, 10-30 bins is the sweet spot.',
        },
      ],
    },
    {
      id: 'mpl-model-diagnostics',
      title: 'Model Diagnostics',
      duration: '25 min',
      objective: 'Plot learning curves and errors to debug models.',
      blocks: [
        { type: 'heading', text: 'Visualizing Overfitting' },
        {
          type: 'paragraph',
          text: 'The single most important plot in deep learning is the Training Curve. By plotting loss across epochs (passes through the data), you can visually diagnose underfitting and overfitting.',
        },
        {
          type: 'table',
          headers: ['Curve Pattern', 'Diagnosis', 'Solution'],
          rows: [
            ['Train loss flat / high', 'Underfitting', 'Bigger model, lower learning rate'],
            ['Val loss goes UP', 'Overfitting', 'Stop training early, add dropout'],
            ['Both drop smoothly', 'Good Fit', 'Save the model!'],
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'Plotting Training Curves' },
        {
          type: 'playground',
          code: "import matplotlib.pyplot as plt\n\nepochs = list(range(1, 9))\ntrain_loss = [1.0, 0.7, 0.5, 0.35, 0.25, 0.18, 0.12, 0.08]\nval_loss = [1.0, 0.75, 0.6, 0.55, 0.55, 0.65, 0.8, 1.05]\n\n# Plot both curves on the same axes\nplt.plot(epochs, train_loss, label='Training Loss', color='blue')\nplt.plot(epochs, val_loss, label='Validation Loss', color='red', linestyle='dashed')\n\nplt.xlabel('Epoch')\nplt.ylabel('Loss')\nplt.legend() # Displays the labels\nplt.title('Classic Overfitting Pattern')\nplt.show()",
          expectedOutput: 'Plot rendered: two lines showing overfitting pattern',
        },
      ],
    },
    {
      id: 'mpl-subplots',
      title: 'Subplots and Layouts',
      duration: '20 min',
      objective: 'Create multi-panel figures to compare data side by side.',
      blocks: [
        { type: 'heading', text: 'Building Dashboards' },
        {
          type: 'paragraph',
          text: 'Often, you need to compare two different charts side-by-side. Matplotlib\'s `subplots` function allows you to slice your figure canvas into a grid of independent plotting axes.',
        },
        {
          type: 'formula',
          expression: 'fig, (ax1, ax2) = plt.subplots(rows, cols)',
          note: 'This creates the Figure and all Axes instantly in a structured tuple.',
        },
        {
          type: 'playground',
          code: "import matplotlib.pyplot as plt\n\n# Create 1 row, 2 columns grid\nfig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))\n\n# Left plot: Bar Chart\nax1.bar(['Cat', 'Dog', 'Bird'], [30, 50, 40], color='orange')\nax1.set_title('Pet Counts')\n\n# Right plot: Scatter\nax2.scatter([1, 2, 3], [5, 2, 8], color='purple')\nax2.set_title('Random Scatter')\n\n# Prevent label overlaps\nplt.tight_layout()\nplt.show()",
          expectedOutput: 'Plot rendered: 2 subplots side by side',
        },
      ],
    },
    {
      id: 'mpl-heatmaps',
      title: 'Heatmaps and Annotations',
      duration: '18 min',
      objective: 'Visualize correlation matrices and confusion matrices as heatmaps.',
      blocks: [
        { type: 'heading', text: 'Color-Coded Matrices' },
        {
          type: 'paragraph',
          text: 'Heatmaps use color intensity to represent values in a matrix. In AI, they are heavily used to visualize Confusion Matrices (how many dogs were misclassified as cats) or Correlation Matrices (which features move together).',
        },
        {
          type: 'playground',
          code: "import matplotlib.pyplot as plt\nimport numpy as np\n\n# 3x3 Correlation Matrix\ndata = np.array([\n    [1.0, 0.8, 0.1], \n    [0.8, 1.0, 0.5], \n    [0.1, 0.5, 1.0]\n])\n\nlabels = ['Age', 'Salary', 'Height']\n\nplt.imshow(data, cmap='Blues') # Blue color scale\nplt.colorbar() # Shows color-value legend\n\n# Add tick labels\nplt.xticks([0,1,2], labels)\nplt.yticks([0,1,2], labels)\n\nplt.title('Correlation Heatmap')\nplt.show()",
          expectedOutput: 'Plot rendered: heatmap correlation matrix',
        },
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
