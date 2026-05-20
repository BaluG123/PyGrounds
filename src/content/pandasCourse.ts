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
        { type: 'paragraph', text: 'Most AI work starts messy: csv files, labels, missing values, duplicate rows, and mixed types. Pandas is the workbench for turning that into usable data.' },
        { type: 'code', code: "import pandas as pd\ndf = pd.DataFrame({'hours': [1, 2, 3], 'score': [55, 65, 78]})\nprint(df.head())\nprint(df['score'].mean())" },
        { type: 'playground', code: "import pandas as pd\ndf = pd.DataFrame({'name': ['Ada', 'Bob', 'Cat'], 'age': [30, 25, 35], 'score': [90, 85, 92]})\nprint(df.describe())", expectedOutput: '             age      score\ncount   3.000000   3.000000\nmean   30.000000  89.000000\nstd     5.000000   3.605551\nmin    25.000000  85.000000\n25%    27.500000  87.500000\n50%    30.000000  90.000000\n75%    32.500000  91.000000\nmax    35.000000  92.000000' },
        { type: 'bullets', items: [
          'Use head, info, describe, and value_counts before modeling.',
          'loc selects by labels; iloc selects by integer position.',
          'A single column is a Series; multiple columns are a DataFrame.',
        ] },
      ],
    },
    {
      id: 'pandas-cleaning',
      title: 'Cleaning and Feature Columns',
      duration: '24 min',
      objective: 'Handle missing values and create model-ready columns.',
      blocks: [
        { type: 'formula', expression: 'clean data -> useful features -> reliable model' },
        { type: 'code', code: "import pandas as pd\ndf = pd.DataFrame({'name': ['Ada', 'Lin'], 'score': [90, None]})\ndf['score'] = df['score'].fillna(df['score'].mean())\nprint(df)" },
        { type: 'playground', code: "import pandas as pd\ndf = pd.DataFrame({'a': [1, None, 3], 'b': [None, 5, 6]})\nprint(f'Missing values:\n{df.isna().sum()}')\ndf_clean = df.dropna()\nprint(f'\nAfter dropna:\n{df_clean}')", expectedOutput: 'Missing values:\na    1\nb    1\ndtype: int64\n\nAfter dropna:\n     a    b\n2  3.0  6.0' },
        { type: 'bullets', items: [
          'Never fill missing values blindly; understand why they are missing.',
          'Keep a raw copy of important datasets.',
          'Feature leakage happens when a column reveals the answer too directly.',
        ] },
      ],
    },
    {
      id: 'pandas-groupby',
      title: 'GroupBy for Insight',
      duration: '24 min',
      objective: 'Summarize patterns by category.',
      blocks: [
        { type: 'paragraph', text: 'GroupBy lets you split rows into groups, run an aggregation, and combine the result into a new table.' },
        { type: 'code', code: "import pandas as pd\ndf = pd.DataFrame({'team': ['A', 'A', 'B'], 'score': [80, 90, 70]})\nprint(df.groupby('team')['score'].mean())" },
        { type: 'playground', code: "import pandas as pd\ndf = pd.DataFrame({'dept': ['Sales', 'Sales', 'Eng', 'Eng'], 'salary': [50, 60, 80, 90]})\nresult = df.groupby('dept')['salary'].agg(['mean', 'max'])\nprint(result)", expectedOutput: '       mean  max\ndept              \nEng    85.0   90\nSales  55.0   60' },
      ],
    },
    {
      id: 'pandas-merge',
      title: 'Merging DataFrames',
      duration: '20 min',
      objective: 'Combine datasets using joins like a SQL database.',
      blocks: [
        { type: 'paragraph', text: 'Real projects spread data across multiple tables. Merging lets you combine them on a shared key — just like SQL JOINs.' },
        { type: 'playground', code: "import pandas as pd\nstudents = pd.DataFrame({'id': [1, 2, 3], 'name': ['Ada', 'Bob', 'Cat']})\nscores = pd.DataFrame({'id': [1, 2, 3], 'score': [90, 85, 92]})\nmerged = pd.merge(students, scores, on='id')\nprint(merged)", expectedOutput: '   id name  score\n0   1  Ada     90\n1   2  Bob     85\n2   3  Cat     92' },
        { type: 'bullets', items: [
          'inner join: only rows with matching keys in both tables.',
          'left join: all rows from the left table, NaN for missing right matches.',
          'pd.concat() stacks DataFrames vertically or horizontally.',
          'Always check for duplicates after merging.',
        ] },
      ],
    },
    {
      id: 'pandas-datetime',
      title: 'DateTime and Resampling',
      duration: '18 min',
      objective: 'Parse dates and aggregate time-series data.',
      blocks: [
        { type: 'paragraph', text: 'Time-series data is everywhere: stock prices, sensor readings, user activity logs. Pandas has excellent datetime support for parsing, indexing, and resampling.' },
        { type: 'playground', code: "import pandas as pd\ndates = pd.date_range('2024-01-01', periods=6, freq='M')\ndf = pd.DataFrame({'date': dates, 'sales': [100, 120, 90, 150, 130, 160]})\ndf['month'] = df['date'].dt.month_name()\nprint(df[['month', 'sales']])", expectedOutput: '      month  sales\n0   January    100\n1  February    120\n2     March     90\n3     April    150\n4       May    130\n5      June    160' },
        { type: 'bullets', items: [
          'pd.to_datetime() parses strings into datetime objects.',
          '.dt accessor gives you year, month, day, hour, etc.',
          '.resample() groups by time intervals (daily, weekly, monthly).',
          'Set the date column as index for time-series operations.',
        ] },
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
