import type { AcademicTrack } from '../../../types/academic';

export const trackDataScience: AcademicTrack = {
  id: 'track-data-science',
  title: 'Data Science Prerequisites',
  subtitle: 'NumPy, Pandas, and scientific visualization',
  levelBadge: 'Arrays · DataFrames · Visual insights',
  courseIds: ['numpy', 'pandas', 'matplotlib'],
  color: '#2B6CB0',
  accent: '#E3EEF9',
  termLabel: 'Term 2',
  modules: [
    {
      id: 'ac-ds-module-numpy',
      title: 'Numerical Computing with NumPy',
      subtitle: 'Arrays, broadcasting, linear algebra, and vectorized computation',
      topics: [
        {
          id: 'ac-ds-ndarray-broadcasting',
          title: 'ndarray & Broadcasting',
          estMinutes: 28,
          objective:
            'Understand NumPy ndarray memory layout, dtype semantics, reshaping, and broadcasting rules for element-wise operations.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'Nearly every ML pipeline stores data as ndarrays. Broadcasting lets you write clean, fast code without explicit loops — the same pattern used in ',
            },
            { type: 'heading', level: 2, text: 'The ndarray Abstraction' },
            {
              type: 'paragraph',
              text: 'A NumPy ndarray is a homogeneous, fixed-size array stored in a contiguous block of memory. Unlike Python lists, all elements share one dtype (e.g. float64, int32), enabling vectorized C-level operations and predictable memory use.',
            },
            {
              type: 'formula',
              latex: '\\text{Memory size} = \\prod_{i=1}^{d} n_i \\times \\text{sizeof}(\\text{dtype})',
              caption: 'Total bytes for a d-dimensional array with shape (n₁, …, n_d)',
            },
            {
              type: 'inlineFormulaParagraph',
              segments: [
                { text: 'Shape ' },
                { latex: '(n_1, n_2, \\ldots, n_d)' },
                { text: ' describes dimensions; stride ' },
                { latex: 's_i' },
                { text: ' is the byte offset to advance one step along axis ' },
                { latex: 'i' },
                { text: '. Reshaping changes shape without copying when the array is C-contiguous.' },
              ],
            },
            { type: 'heading', level: 3, text: 'Creating and Inspecting Arrays' },
            {
              type: 'codeblock',
              language: 'python',
              code: `import numpy as np

a = np.array([[1, 2, 3], [4, 5, 6]], dtype=np.float64)
print("shape:", a.shape)      # (2, 3)
print("ndim:", a.ndim)        # 2
print("strides (bytes):", a.strides)
print("C-contiguous:", a.flags.c_contiguous)

zeros = np.zeros((3, 4))
ones = np.ones(5)
arange = np.arange(0, 10, 2)   # [0, 2, 4, 6, 8]
linspace = np.linspace(0, 1, 5)  # evenly spaced`,
            },
            { type: 'heading', level: 3, text: 'Indexing and Slicing' },
            {
              type: 'paragraph',
              text: 'Basic indexing returns views (not copies) when possible. Advanced indexing with integer arrays or boolean masks returns copies. Slicing along axis 0 selects rows; axis 1 selects columns.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `M = np.arange(12).reshape(3, 4)
row1 = M[1, :]           # 1-D view of row 1
col2 = M[:, 2]           # 1-D view of column 2
sub = M[0:2, 1:3]        # 2×2 submatrix view
mask = M[M[:, 0] > 4]    # fancy indexing → copy`,
            },
            { type: 'heading', level: 2, text: 'Broadcasting Rules' },
            {
              type: 'paragraph',
              text: 'When operands have different shapes, NumPy compares dimensions from the trailing axis backward. Two dimensions are compatible if they are equal or one of them is 1.',
            },
            {
              type: 'formula',
              latex: '\\text{shape}(A) = (\\ldots, m, 1) \\;\\text{and}\\; \\text{shape}(B) = (\\ldots, 1, n) \\;\\Rightarrow\\; \\text{shape}(A + B) = (\\ldots, m, n)',
              caption: 'Classic outer-style broadcast',
            },
            {
              type: 'list',
              items: [
                'Align shapes on the right; prepend 1s to the shorter shape.',
                'For each dimension: equal sizes, or one size is 1 → broadcast that axis.',
                'Incompatible shapes raise ValueError.',
              ],
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `# vector + matrix: (3,) broadcasts to (3, 1) then to (3, 4)
v = np.array([1, 2, 3])
M = np.ones((3, 4))
result = v[:, np.newaxis] + M   # shape (3, 4)

# scalar broadcast
normalized = (M - M.mean()) / M.std()

# explicit broadcast with np.broadcast_to (read-only view)
b = np.broadcast_to(np.array([10, 20, 30]), (2, 3))`,
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'Use v[:, np.newaxis] or np.expand_dims(v, axis=1) to turn a 1-D vector into a column for row-wise operations. np.newaxis is an alias for None.',
            },
            {
              type: 'note',
              variant: 'warning',
              text: 'Broadcasting creates views, not copies — assigning through a broadcast slice can silently write to the underlying array. Call .copy() when you need an independent buffer.',
            },
          ],
        },
        {
          id: 'ac-ds-linear-algebra-numpy',
          title: 'Linear Algebra in NumPy',
          estMinutes: 32,
          objective:
            'Apply np.linalg operations for dot products, matrix decompositions, and solving linear systems — the computational backbone of regression and PCA.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'Least-squares regression, PCA, and neural-network forward passes all reduce to matrix multiplication and linear algebra. NumPy wraps optimized BLAS/LAPACK routines used in production ML stacks.',
            },
            { type: 'heading', level: 2, text: 'Dot Products and Matrix Multiply' },
            {
              type: 'formula',
              latex: '\\mathbf{a} \\cdot \\mathbf{b} = \\sum_{i=1}^{n} a_i b_i = \\mathbf{a}^{\\mathsf T} \\mathbf{b}',
            },
            {
              type: 'formula',
              latex: 'C = AB, \\quad C_{ij} = \\sum_{k=1}^{n} A_{ik} B_{kj}',
              caption: 'Matrix multiply: (m×n)(n×p) → (m×p)',
            },
            {
              type: 'inlineFormulaParagraph',
              segments: [
                { text: 'For vectors ' },
                { latex: '\\mathbf{x}, \\mathbf{w} \\in \\mathbb{R}^n' },
                { text: ', a linear model prediction is ' },
                { latex: '\\hat{y} = \\mathbf{w}^{\\mathsf T} \\mathbf{x} + b' },
                { text: ' — one dot product per sample.' },
              ],
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `import numpy as np

a = np.array([1.0, 2.0, 3.0])
b = np.array([4.0, 5.0, 6.0])
print(np.dot(a, b))        # 32.0
print(a @ b)               # equivalent

A = np.array([[1, 2], [3, 4]], dtype=float)
B = np.array([[5, 6], [7, 8]], dtype=float)
C = A @ B                  # prefer @ over np.dot for matrices
print(C)`,
            },
            { type: 'heading', level: 3, text: 'Norms and Distances' },
            {
              type: 'formula',
              latex: '\\|\\mathbf{v}\\|_2 = \\sqrt{\\sum_i v_i^2}, \\quad \\|\\mathbf{v}\\|_1 = \\sum_i |v_i|, \\quad \\|A\\|_F = \\sqrt{\\sum_{i,j} A_{ij}^2}',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `v = np.array([3.0, 4.0])
print(np.linalg.norm(v))           # 5.0 — L2
print(np.linalg.norm(v, ord=1))    # 7.0 — L1
print(np.linalg.norm(A, 'fro'))    # Frobenius norm of matrix`,
            },
            { type: 'heading', level: 2, text: 'Solving Linear Systems' },
            {
              type: 'paragraph',
              text: 'Given A x = b, the solution x = A⁻¹b is numerically unstable when A is ill-conditioned. Prefer np.linalg.solve or least-squares for overdetermined systems.',
            },
            {
              type: 'formula',
              latex: '\\mathbf{x}^* = \\arg\\min_{\\mathbf{x}} \\| A\\mathbf{x} - \\mathbf{b} \\|_2^2 = (A^{\\mathsf T} A)^{-1} A^{\\mathsf T} \\mathbf{b}',
              caption: 'Normal equations for ordinary least squares (use lstsq in practice)',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `A = np.array([[2, 1], [1, 3]], dtype=float)
b = np.array([8, 13], dtype=float)
x = np.linalg.solve(A, b)
print("solution:", x)    # [3., 2.]

# Overdetermined: more rows than columns
X = np.random.randn(100, 3)
y = X @ np.array([1, -2, 0.5]) + 0.1 * np.random.randn(100)
coef, residuals, rank, s = np.linalg.lstsq(X, y, rcond=None)
print("coefficients:", coef)`,
            },
            { type: 'heading', level: 2, text: 'Eigendecomposition and SVD' },
            {
              type: 'formula',
              latex: 'A \\mathbf{v} = \\lambda \\mathbf{v}',
              caption: 'Eigenvalue equation — PCA uses eigenvectors of the covariance matrix',
            },
            {
              type: 'formula',
              latex: 'A = U \\Sigma V^{\\mathsf T}',
              caption: 'Singular Value Decomposition — stable alternative for rank-deficient matrices',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `# Eigendecomposition (square matrices)
eigenvalues, eigenvectors = np.linalg.eig(A)

# SVD — works for any m×n matrix
U, s, Vt = np.linalg.svd(A, full_matrices=False)
# low-rank approximation: A ≈ U[:, :k] @ np.diag(s[:k]) @ Vt[:k, :]`,
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'np.linalg.eigh is faster and guarantees real eigenvalues for symmetric matrices (covariance, Hessians). Use SVD for PCA on tall-skinny data matrices.',
            },
            {
              type: 'note',
              variant: 'why',
              text: 'Condition number κ(A) = σ_max/σ_min from SVD tells you how sensitive solutions are to noise — a key diagnostic in ',
            },
          ],
        },
        {
          id: 'ac-ds-vectorization-performance',
          title: 'Vectorization & Performance',
          estMinutes: 25,
          objective:
            'Replace Python loops with ufuncs and axis reductions; understand when copies hurt performance and how to profile ndarray code.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'A single vectorized pass can be 10–100× faster than a Python for-loop because NumPy dispatches to SIMD-optimized C loops. This is the first optimization taught in ',
            },
            { type: 'heading', level: 2, text: 'Universal Functions (ufuncs)' },
            {
              type: 'paragraph',
              text: 'Ufuncs apply element-wise operations with broadcasting. Common examples: np.add, np.exp, np.log, np.sqrt. They support an optional out= argument to write results in-place.',
            },
            {
              type: 'formula',
              latex: 'f(\\mathbf{x}) = \\bigl(f(x_1), f(x_2), \\ldots, f(x_n)\\bigr)^{\\mathsf T}',
              caption: 'Element-wise application of scalar function f',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `import numpy as np

x = np.linspace(-2, 2, 5)
y = np.exp(-x**2)              # Gaussian bump — no loop
z = np.log1p(x)                # log(1+x), stable for small x

# Custom ufunc via np.frompyfunc (slower — use only when necessary)
def sigmoid(t):
    return 1 / (1 + np.exp(-t))
vec_sigmoid = np.frompyfunc(sigmoid, 1, 1)
probs = vec_sigmoid(x.astype(float))`,
            },
            { type: 'heading', level: 2, text: 'Axis Reductions' },
            {
              type: 'paragraph',
              text: 'Aggregations collapse dimensions: axis=0 operates down columns (per-column stats), axis=1 operates across rows. Omitting axis reduces the entire array to a scalar.',
            },
            {
              type: 'formula',
              latex: '\\bar{x}_j = \\frac{1}{n} \\sum_{i=1}^{n} X_{ij}, \\quad \\sigma_j^2 = \\frac{1}{n} \\sum_{i=1}^{n} (X_{ij} - \\bar{x}_j)^2',
              caption: 'Column-wise mean and variance (population form)',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `X = np.random.randn(1000, 5)

col_mean = X.mean(axis=0)
col_std = X.std(axis=0, ddof=1)   # sample std (Bessel correction)
row_sum = X.sum(axis=1, keepdims=True)  # shape (1000, 1) for broadcasting

# Standardize columns — vectorized, no loop
X_norm = (X - col_mean) / col_std`,
            },
            { type: 'heading', level: 2, text: 'Loop vs Vectorized: A Concrete Comparison' },
            {
              type: 'codeblock',
              language: 'python',
              code: `import time

n = 500_000
a = np.random.rand(n)
b = np.random.rand(n)

# Slow: Python loop
start = time.perf_counter()
out_loop = np.empty(n)
for i in range(n):
    out_loop[i] = a[i] * b[i] + np.sin(a[i])
t_loop = time.perf_counter() - start

# Fast: vectorized
start = time.perf_counter()
out_vec = a * b + np.sin(a)
t_vec = time.perf_counter() - start

print(f"loop: {t_loop:.4f}s, vectorized: {t_vec:.4f}s")`,
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'Use keepdims=True when subtracting per-axis statistics so broadcasting shapes align automatically. np.einsum offers readable tensor contractions when @ gets unwieldy.',
            },
            { type: 'heading', level: 3, text: 'Avoiding Hidden Copies' },
            {
              type: 'list',
              items: [
                'Fancy indexing (a[indices]) always copies.',
                'Transposing non-contiguous arrays before passing to C extensions may copy.',
                'np.asarray(x, dtype=float) avoids copy if dtype already matches.',
                'In-place ops (a *= 2) save memory on large arrays.',
              ],
            },
            {
              type: 'note',
              variant: 'warning',
              text: '+= between arrays of different memory layout can trigger a temporary copy. Profile with %timeit (Jupyter) or time.perf_counter before micro-optimizing.',
            },
          ],
        },
      ],
    },
    {
      id: 'ac-ds-module-pandas-viz',
      title: 'Data Analysis & Visualization',
      subtitle: 'Tabular data manipulation, cleaning pipelines, and exploratory plotting',
      topics: [
        {
          id: 'ac-ds-pandas-dataframes',
          title: 'Pandas DataFrames & Indexing',
          estMinutes: 30,
          objective:
            'Construct DataFrames, navigate MultiIndex hierarchies, and select subsets with loc, iloc, and boolean filtering — the core API of ',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'Real-world datasets arrive as tables with missing values, mixed types, and hierarchical labels. Pandas DataFrames are the standard in-memory representation before modeling or visualization.',
            },
            { type: 'heading', level: 2, text: 'Series and DataFrame Structure' },
            {
              type: 'paragraph',
              text: 'A Series is a labeled 1-D array; a DataFrame is a dict-like container of aligned Series sharing a row Index. Columns can have distinct dtypes (int, float, object, category).',
            },
            {
              type: 'formula',
              latex: 'X \\in \\mathbb{R}^{n \\times p}, \\quad X_{ij} = \\text{value of feature } j \\text{ for observation } i',
              caption: 'Statistical view: n rows (observations), p columns (features)',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "name": ["Ada", "Grace", "Katherine"],
    "score": [98, 95, 97],
    "year": [1843, 1906, 1918],
})
print(df.dtypes)
print(df.shape)   # (3, 3)

# From ndarray + column names
arr = np.random.randn(4, 2)
df2 = pd.DataFrame(arr, columns=["x", "y"], index=["a", "b", "c", "d"])`,
            },
            { type: 'heading', level: 3, text: 'loc vs iloc' },
            {
              type: 'paragraph',
              text: 'loc selects by label; iloc selects by integer position. Slices with loc are inclusive on both ends; iloc follows standard Python half-open slicing.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `df = pd.DataFrame(
    {"A": [1, 2, 3], "B": [4, 5, 6]},
    index=["row0", "row1", "row2"],
)

df.loc["row1", "A"]       # scalar: 2
df.loc["row0":"row1", :]  # inclusive label slice
df.iloc[0:2, 1]           # rows 0–1, column index 1
df.loc[df["A"] > 1, ["A", "B"]]  # boolean filter + column select`,
            },
            { type: 'heading', level: 2, text: 'MultiIndex and Hierarchical Data' },
            {
              type: 'paragraph',
              text: 'MultiIndex (hierarchical index) enables panel data: e.g. (country, year) rows with metric columns. Use .loc with tuples or pd.IndexSlice for cross-sections.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `idx = pd.MultiIndex.from_product(
    [["US", "IN"], [2022, 2023]],
    names=["country", "year"],
)
panel = pd.DataFrame(
    {"gdp": np.random.rand(4) * 1e13, "pop": np.random.randint(1e8, 4e8, 4)},
    index=idx,
)
print(panel.loc["US"])
print(panel.xs(2023, level="year"))`,
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'After filtering, call .reset_index(drop=True) to get a clean 0…n-1 index before merges or train/test splits. Setting index with set_index("col") is reversible via reset_index().',
            },
            {
              type: 'note',
              variant: 'why',
              text: 'Alignment by index (not position) is Pandas\' superpower: operations between Series/DataFrames join on labels automatically, surfacing missing-key NaNs instead of silent misalignment.',
            },
          ],
        },
        {
          id: 'ac-ds-data-cleaning',
          title: 'Data Cleaning & Feature Tables',
          estMinutes: 35,
          objective:
            'Handle missing data, type coercion, groupby aggregations, and merge/join operations to produce analysis-ready feature tables.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: '',
            },
            { type: 'heading', level: 2, text: 'Missing Values and Imputation' },
            {
              type: 'paragraph',
              text: 'Pandas represents missing data as NaN (float columns) or pd.NA (nullable integer/string dtypes). Distinguish MCAR, MAR, and MNAR missingness before choosing a strategy.',
            },
            {
              type: 'formula',
              latex: '\\tilde{x}_j = \\frac{1}{|\\{i : x_{ij} \\text{ observed}\\}|} \\sum_{i: x_{ij} \\text{ obs}} x_{ij}',
              caption: 'Mean imputation for column j (use with caution — shrinks variance)',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `import pandas as pd
import numpy as np

df = pd.DataFrame({"age": [22, np.nan, 31, 28], "score": [88, 91, np.nan, 85]})
print(df.isna().sum())
print(df.dropna())                    # drop any row with NaN
print(df.fillna({"age": df["age"].median(), "score": df["score"].mean()}))

# Nullable integer dtype preserves NA without float conversion
df["age"] = df["age"].astype("Int64")`,
            },
            { type: 'heading', level: 2, text: 'GroupBy and Aggregations' },
            {
              type: 'paragraph',
              text: 'Split-apply-combine: partition rows by key columns, compute per-group statistics, combine into a summary table. The grouped object supports .agg with multiple functions per column.',
            },
            {
              type: 'formula',
              latex: '\\bar{y}_g = \\frac{1}{|g|} \\sum_{i \\in g} y_i, \\quad \\text{where } g \\text{ is a group defined by key columns}',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `df = pd.DataFrame({
    "dept": ["CS", "CS", "EE", "EE", "CS"],
    "salary": [120, 130, 110, 115, 125],
    "years": [2, 5, 3, 4, 1],
})
summary = df.groupby("dept").agg(
    avg_salary=("salary", "mean"),
    headcount=("salary", "count"),
    max_years=("years", "max"),
)
print(summary)`,
            },
            { type: 'heading', level: 2, text: 'Merge, Join, and Feature Engineering' },
            {
              type: 'paragraph',
              text: 'pd.merge aligns tables on key columns (inner, left, right, outer). Feature engineering creates derived columns — ratios, bins, one-hot encodings — stored alongside raw fields in the feature table.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `students = pd.DataFrame({"id": [1, 2, 3], "name": ["Ana", "Bo", "Cy"]})
scores = pd.DataFrame({"id": [1, 2, 4], "midterm": [90, 85, 88]})

merged = pd.merge(students, scores, on="id", how="left")
merged["midterm"] = merged["midterm"].fillna(0)

# Derived feature
merged["honors"] = merged["midterm"] >= 90

# pd.cut for binning continuous variables
merged["grade_band"] = pd.cut(
    merged["midterm"], bins=[0, 70, 85, 100], labels=["C", "B", "A"]
)`,
            },
            {
              type: 'note',
              variant: 'warning',
              text: 'Inner joins silently drop non-matching rows. Always check merged.shape and null counts after joins. Document your grain: one row per user, per session, or per event?',
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'Use .assign(col=expr) for chained transformations. pd.get_dummies converts categorical columns to binary indicator columns for sklearn pipelines.',
            },
          ],
        },
        {
          id: 'ac-ds-eda-matplotlib',
          title: 'Exploratory Data Analysis with Matplotlib',
          estMinutes: 22,
          objective:
            'Build histograms, scatter plots, and labeled figures with Matplotlib to validate distributions, relationships, and outliers before modeling.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'EDA is hypothesis generation, not confirmation. Visual inspection catches data-entry errors, skew, and nonlinear relationships that summary statistics alone hide — a core skill in Data 100 project workflows.',
            },
            { type: 'heading', level: 2, text: 'Anatomy of a Matplotlib Figure' },
            {
              type: 'paragraph',
              text: 'Figure is the top-level canvas; Axes are individual plots. Prefer the object-oriented API (fig, ax = plt.subplots()) over pyplot state machine for reproducible, composable code.',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(6, 4))
x = np.linspace(0, 2 * np.pi, 200)
ax.plot(x, np.sin(x), label="sin(x)")
ax.set_xlabel("x")
ax.set_ylabel("y")
ax.set_title("Sine wave")
ax.legend()
fig.tight_layout()
# fig.savefig("sine.png", dpi=150)`,
            },
            { type: 'heading', level: 2, text: 'Histograms and Distribution Shape' },
            {
              type: 'paragraph',
              text: 'Histograms estimate the probability density of a continuous variable. Choose bin width carefully: too few bins hide structure; too many amplify noise.',
            },
            {
              type: 'formula',
              latex: '\\hat{f}(x) = \\frac{n_i}{N \\cdot h}, \\quad x \\in \\text{bin}_i',
              caption: 'Histogram density estimate with bin width h, count n_i, total N',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `import pandas as pd
import matplotlib.pyplot as plt

rng = np.random.default_rng(42)
df = pd.DataFrame({"height": rng.normal(170, 10, 500)})

fig, ax = plt.subplots()
ax.hist(df["height"], bins=30, density=True, alpha=0.7, edgecolor="white")
ax.axvline(df["height"].mean(), color="red", linestyle="--", label="mean")
ax.set_xlabel("Height (cm)")
ax.set_ylabel("Density")
ax.legend()`,
            },
            { type: 'heading', level: 2, text: 'Scatter Plots and Correlation' },
            {
              type: 'formula',
              latex: 'r = \\frac{\\sum_i (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum_i (x_i - \\bar{x})^2 \\sum_i (y_i - \\bar{y})^2}}',
              caption: 'Pearson correlation coefficient',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `df = pd.DataFrame({
    "study_hrs": rng.uniform(1, 10, 200),
})
df["exam_score"] = 50 + 4 * df["study_hrs"] + rng.normal(0, 8, 200)

fig, ax = plt.subplots()
ax.scatter(df["study_hrs"], df["exam_score"], alpha=0.6, s=20)
ax.set_xlabel("Study hours")
ax.set_ylabel("Exam score")
r = df["study_hrs"].corr(df["exam_score"])
ax.set_title(f"Study vs score (r = {r:.2f})")`,
            },
            { type: 'heading', level: 3, text: 'Subplots and Pandas Plotting' },
            {
              type: 'codeblock',
              language: 'python',
              code: `fig, axes = plt.subplots(1, 2, figsize=(10, 4))
df["study_hrs"].plot.hist(ax=axes[0], bins=20, title="Study hours")
df.plot.scatter(x="study_hrs", y="exam_score", ax=axes[1], alpha=0.5)
fig.suptitle("EDA Dashboard", y=1.02)
fig.tight_layout()`,
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'Always label axes with units. Use alpha transparency for overplotted scatter points. sns.pairplot (seaborn) extends Matplotlib for quick multivariate EDA when you need it.',
            },
            {
              type: 'note',
              variant: 'warning',
              text: 'Correlation ≠ causation. A strong scatter pattern warrants further investigation — confounders and nonlinearity require domain knowledge and additional plots (residuals, box plots by category).',
            },
          ],
        },
      ],
    },
  ],
};
