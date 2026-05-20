import { Table2 } from 'lucide-react-native';
import type { CourseModule } from '../types/course';

export const pandasCourse: CourseModule = {
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
        { type: 'heading', text: 'DataFrames: The Interactive Spreadsheets' },
        {
          type: 'paragraph',
          text: 'In pure Python, handling tabular data (like CSV or SQL rows) requires complex nested lists or dictionaries. Pandas introduces the `DataFrame`, a highly optimized two-dimensional table structure with labeled axes (rows and columns) that acts like a turbocharged Excel spreadsheet inside your code.',
        },
        {
          type: 'analogy',
          text: 'A Series is like a single column in a spreadsheet. A DataFrame is the entire spreadsheet itself, containing multiple named columns side-by-side that all share the same row index.',
        },
        {
          type: 'diagram',
          title: 'DataFrame Axis and Selection Structure',
          boxes: [
            { id: 'df', x: 10, y: 30, width: 90, height: 50, label: 'DataFrame', color: '#2B6CB0' },
            { id: 'rows', x: 120, y: 15, width: 80, height: 35, label: 'Row Index', color: '#1D7A57' },
            { id: 'cols', x: 120, y: 65, width: 80, height: 35, label: 'Col Labels', color: '#E44D6E' },
          ],
          arrows: [
            { from: 'df', to: 'rows', label: 'Index' },
            { from: 'df', to: 'cols', label: 'Columns' },
          ],
          height: 120,
        },
        { type: 'divider' },
        { type: 'heading', text: 'Accessing Cells: loc vs iloc' },
        {
          type: 'paragraph',
          text: 'Pandas provides two main methods to select rows and columns: `.loc` (label-based selection) and `.iloc` (integer index-based selection). Understanding their difference is crucial to avoiding lookup bugs.',
        },
        {
          type: 'table',
          headers: ['Method', 'Lookup Type', 'Example Row', 'Example Col'],
          rows: [
            ['.loc', 'By label / name', "df.loc['row_3']", "df.loc[:, 'age']"],
            ['.iloc', 'By numeric position', 'df.iloc[3]', 'df.iloc[:, 1]'],
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'Describing Your Data' },
        {
          type: 'playground',
          code: "import pandas as pd\n\ndata = {\n    'name': ['Ada', 'Bob', 'Cat'],\n    'age': [30, 25, 35],\n    'score': [90, 85, 92]\n}\ndf = pd.DataFrame(data)\n\n# Generate descriptive statistics\nprint(df.describe())",
          expectedOutput: '             age      score\ncount   3.000000   3.000000\nmean   30.000000  89.000000\nstd     5.000000   3.605551\nmin    25.000000  85.000000\n25%    27.500000  87.500000\n50%    30.000000  90.000000\n75%    32.500000  91.000000\nmax    35.000000  92.000000',
        },
        {
          type: 'callout',
          variant: 'remember',
          title: 'Sanity Checking',
          body: 'Always call `.head()`, `.info()`, and `.describe()` immediately after loading new data. These methods quickly reveal missing values, incorrect column data types, and scaling issues.',
        },
      ],
    },
    {
      id: 'pandas-cleaning',
      title: 'Cleaning and Feature Columns',
      duration: '24 min',
      objective: 'Handle missing values and create model-ready columns.',
      blocks: [
        { type: 'heading', text: 'Wrangling Messy Datasets' },
        {
          type: 'paragraph',
          text: 'Real-world data is extremely messy, filled with missing entries (NaN), incorrect text casing, and stray characters. In machine learning, clean data is the single most important factor determining model accuracy.',
        },
        {
          type: 'analogy',
          text: 'Cleaning data is like preparing ingredients before cooking. If you throw unwashed, unpeeled vegetables (raw, messy data) directly into a pot (machine learning model), the soup will taste terrible, no matter how good the recipe is.',
        },
        {
          type: 'stepByStep',
          title: 'Standard Data Cleaning Pipeline',
          steps: [
            { title: 'Detect Missing Entries', description: 'Use `.isna().sum()` to calculate the exact count of missing values per column.' },
            { title: 'Choose Strategy', description: 'Decide whether to drop rows with `.dropna()` or impute values with `.fillna()`.' },
            { title: 'Impute Values', description: 'Replace NaNs with robust statistical measures like the column mean or median.' },
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'Imputing Missing Scores' },
        {
          type: 'playground',
          code: "import pandas as pd\n\ndf = pd.DataFrame({'name': ['Ada', 'Lin', 'Bob'], 'score': [90, None, 80]})\n\n# Fill missing entries with column average\nmean_score = df['score'].mean()\ndf['score'] = df['score'].fillna(mean_score)\nprint(df)",
          expectedOutput: '  name  score\n0  Ada   90.0\n1  Lin   85.0\n2  Bob   80.0',
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Data Leakage Alert!',
          body: 'When calculating imputation values (like column means), compute them using ONLY your training set and broadcast them to the test set. Computing means across the entire dataset causes information to "leak" from the future, invalidating evaluation scores.',
        },
      ],
    },
    {
      id: 'pandas-groupby',
      title: 'GroupBy for Insight',
      duration: '24 min',
      objective: 'Summarize patterns by category.',
      blocks: [
        { type: 'heading', text: 'The Split-Apply-Combine Workflow' },
        {
          type: 'paragraph',
          text: 'When analyzing features, you often want to aggregate statistics across categories (e.g. average salary by department, or survival rates by passenger class). Pandas uses the highly optimized `GroupBy` design to accomplish this.',
        },
        {
          type: 'analogy',
          text: 'Imagine sorting a drawer of scattered marbles. You first group them by color (Split), count the quantity in each group (Apply), and write down a neat list showing total counts per color (Combine).',
        },
        {
          type: 'diagram',
          title: 'GroupBy Processing Flow',
          boxes: [
            { id: 's', x: 20, y: 70, width: 70, height: 40, label: '1. Split', color: '#E44D6E' },
            { id: 'a', x: 125, y: 70, width: 70, height: 40, label: '2. Apply', color: '#F89939' },
            { id: 'c', x: 230, y: 70, width: 70, height: 40, label: '3. Combine', color: '#1D7A57' },
          ],
          arrows: [
            { from: 's', to: 'a', label: 'Groups' },
            { from: 'a', to: 'c', label: 'Aggs' },
          ],
          height: 150,
        },
        { type: 'divider' },
        { type: 'heading', text: 'Grouping Department Salaries' },
        {
          type: 'playground',
          code: "import pandas as pd\n\ndata = {\n    'dept': ['Sales', 'Sales', 'Eng', 'Eng'],\n    'salary': [50, 60, 80, 90]\n}\ndf = pd.DataFrame(data)\n\n# Split by dept, aggregate mean and max salaries\nresult = df.groupby('dept')['salary'].agg(['mean', 'max'])\nprint(result)",
          expectedOutput: '       mean  max\ndept              \nEng    85.0   90\nSales  55.0   60',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Multi-indexing',
          body: 'Grouping by multiple columns: `df.groupby(["country", "year"])` creates a hierarchical index (multi-index). Use `.reset_index()` to flatten it back into a standard DataFrame.',
        },
      ],
    },
  ],
  quiz: [
    { id: 'pd-q1', prompt: 'Who created Pandas?', options: ['Wes McKinney', 'Travis Oliphant', 'John Hunter', 'Geoffrey Hinton'], answerIndex: 0, explanation: 'Wes McKinney started Pandas in 2008.' },
    { id: 'pd-q2', prompt: 'Which method replaces missing values?', options: ['fillna', 'reshape', 'broadcast', 'imshow'], answerIndex: 0, explanation: 'fillna replaces missing entries with a chosen value or statistic.' },
    { id: 'pd-q3', prompt: 'What does GroupBy implement?', options: ['Split-apply-combine', 'Only plotting', 'Only sorting', 'Matrix multiplication'], answerIndex: 0, explanation: 'Rows are split into groups, a function is applied, and results are combined.' },
    { id: 'pd-q4', prompt: 'When should you inspect data with info() and describe()?', options: ['Before modeling', 'Only after deployment', 'Only for images', 'Never'], answerIndex: 0, explanation: 'Inspection catches types, missing values, ranges, and suspicious columns early.' },
    { id: 'pd-q5', prompt: 'What does pd.merge() do?', options: ['Combines two DataFrames on a shared key', 'Deletes duplicate rows', 'Sorts the DataFrame', 'Creates a new column'], answerIndex: 0, explanation: 'merge() is like a SQL JOIN — it combines tables based on matching key columns.' },
    { id: 'pd-q6', prompt: 'What is the difference between loc and iloc?', options: ['loc uses labels, iloc uses integer positions', 'loc is faster', 'iloc uses labels', 'There is no difference'], answerIndex: 0, explanation: 'loc selects by row/column labels; iloc selects by integer index positions.' },
    { id: 'pd-q7', prompt: 'What does df.isna().sum() return?', options: ['Count of missing values per column', 'Sum of all values', 'Total rows', 'A boolean mask'], answerIndex: 0, explanation: 'isna() creates a boolean mask, and sum() counts True values per column.' },
    { id: 'pd-q8', prompt: 'What does pd.to_datetime() do?', options: ['Converts strings to datetime objects', 'Formats numbers as dates', 'Deletes date columns', 'Creates a timer'], answerIndex: 0, explanation: 'to_datetime() parses date strings into proper datetime objects for time operations.' },
    { id: 'pd-q9', prompt: 'What happens in a left join when a key has no match?', options: ['The right columns get NaN values', 'The row is deleted', 'An error is raised', 'The row is duplicated'], answerIndex: 0, explanation: 'Left join keeps all left table rows and fills unmatched right columns with NaN.' },
    { id: 'pd-q10', prompt: 'What does df.value_counts() show?', options: ['Frequency of each unique value', 'Mean of all values', 'Data types', 'Column names'], answerIndex: 0, explanation: 'value_counts() shows how many times each unique value appears.' },
  ],
  practice: [
    { id: 'pd-p1', title: 'Average Score', prompt: 'Build a DataFrame with scores and print the mean score.', starterCode: "import pandas as pd\ndf = pd.DataFrame({'score': [55, 65, 78]})\nprint(df['score'].mean())", expectedOutput: '66.0', hint: "Select the 'score' column before calling mean()." },
    { id: 'pd-p2', title: 'Fill Missing Scores', prompt: 'Replace a missing score with the column mean.', starterCode: "import pandas as pd\ndf = pd.DataFrame({'score': [90, None]})\ndf['score'] = df['score'].fillna(df['score'].mean())\nprint(df)", expectedOutput: 'score\n0 90.0\n1 90.0', hint: 'Call fillna with df["score"].mean().' },
    { id: 'pd-p3', title: 'Group Mean', prompt: 'Print the average score for each team.', starterCode: "import pandas as pd\ndf = pd.DataFrame({'team': ['A', 'A', 'B'], 'score': [80, 90, 70]})\nprint(df.groupby('team')['score'].mean())", expectedOutput: 'team\nA 85.0\nB 70.0', hint: 'Group by team, select score, then call mean.' },
    { id: 'pd-p4', title: 'Merge Tables', prompt: 'Merge a students table with a scores table on id.', starterCode: "import pandas as pd\nstudents = pd.DataFrame({'id': [1, 2], 'name': ['Ada', 'Bob']})\nscores = pd.DataFrame({'id': [1, 2], 'score': [90, 85]})\nprint(pd.merge(students, scores, on='id'))", expectedOutput: '   id name  score\n0   1  Ada     90\n1   2  Bob     85', hint: "Use pd.merge(left, right, on='key')." },
    { id: 'pd-p5', title: 'Count Missing', prompt: 'Count missing values in each column.', starterCode: "import pandas as pd\ndf = pd.DataFrame({'a': [1, None, 3], 'b': [None, None, 6]})\nprint(df.isna().sum())", expectedOutput: 'a    1\nb    2\ndtype: int64', hint: 'isna() marks missing values, sum() counts them.' },
    { id: 'pd-p6', title: 'Filter Rows', prompt: 'Filter the DataFrame to keep only rows where score > 80.', starterCode: "import pandas as pd\ndf = pd.DataFrame({'name': ['Ada', 'Bob', 'Cat'], 'score': [90, 75, 85]})\nprint(df[df['score'] > 80])", expectedOutput: '  name  score\n0  Ada     90\n2  Cat     85', hint: "Use boolean indexing: df[df['column'] > value]." },
  ],
};
