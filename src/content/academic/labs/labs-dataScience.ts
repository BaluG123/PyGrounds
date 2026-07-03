import type { AcademicLab } from '../../../types/academic';

export const dataScienceLabs: AcademicLab[] = [
  {
    id: 'lab-ds-numpy-pandas',
    trackId: 'track-data-science',
    title: 'NumPy & Pandas Workflow',
    description: '',
    snippets: [
      {
        id: 'ds-lab-ndarray',
        title: 'Broadcasting & Vectorization',
        intro: 'Normalize a feature matrix column-wise without Python loops.',
        relatedFormula: 'X_{\\text{norm}} = \\frac{X - \\mu}{\\sigma}',
        code: `import numpy as np

X = np.random.randn(1000, 5)
col_mean = X.mean(axis=0)
col_std = X.std(axis=0, ddof=1)
X_norm = (X - col_mean) / col_std
print(X_norm.mean(axis=0).round(6))  # ~0 for each column`,
        expectedOutputNote: 'Column means near zero after standardization.',
      },
      {
        id: 'ds-lab-pandas',
        title: 'GroupBy & Merge Pipeline',
        intro: 'Aggregate sales by region and join customer metadata — typical analytics workflow.',
        code: `import pandas as pd

sales = pd.DataFrame({
    "region": ["North", "South", "North", "South"],
    "revenue": [100, 80, 120, 90],
})
meta = pd.DataFrame({"region": ["North", "South"], "manager": ["A", "B"]})

summary = sales.groupby("region")["revenue"].agg(["sum", "mean"])
report = pd.merge(summary, meta, left_index=True, right_on="region")
print(report)`,
        expectedOutputNote: 'Merged report with per-region revenue stats and manager names.',
      },
      {
        id: 'ds-lab-viz',
        title: 'EDA Scatter & Histogram',
        intro: 'Visual sanity check before modeling — catch outliers and skew early.',
        code: `import matplotlib.pyplot as plt
import numpy as np

rng = np.random.default_rng(0)
x = rng.normal(0, 1, 500)
y = 2 * x + rng.normal(0, 0.5, 500)

fig, axes = plt.subplots(1, 2, figsize=(10, 4))
axes[0].hist(x, bins=30, density=True, alpha=0.7)
axes[1].scatter(x, y, alpha=0.4, s=10)
axes[1].set_xlabel("x"); axes[1].set_ylabel("y")
fig.tight_layout()`,
        expectedOutputNote: 'Two-panel EDA figure: distribution shape and linear relationship.',
      },
    ],
  },
];
