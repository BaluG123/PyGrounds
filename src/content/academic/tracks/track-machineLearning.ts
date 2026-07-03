import type { AcademicTrack } from '../../../types/academic';

export const trackMachineLearning: AcademicTrack = {
  id: 'track-machine-learning',
  title: 'Classical Machine Learning',
  subtitle: 'Supervised learning theory, evaluation, regularization, and scikit-learn pipelines',
  levelBadge: 'Models · Metrics · Generalization',
  courseIds: ['machine-learning', 'scikit-learn'],
  color: '#0F8B8D',
  accent: '#DDF7F6',
  termLabel: 'Term 4',
  modules: [
    {
      id: 'mod-ac-ml-learning-foundations',
      title: 'Learning Foundations',
      subtitle: 'Hypothesis classes, risk minimization, and rigorous evaluation',
      topics: [
        {
          id: 'ac-ml-supervised-theory',
          title: 'Supervised Learning Theory',
          estMinutes: 40,
          objective:
            'Formalize the supervised learning problem as empirical risk minimization over a hypothesis class.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: '',
            },
            { type: 'heading', level: 2, text: 'The Supervised Learning Setup' },
            {
              type: 'paragraph',
              text: 'We observe a training set drawn i.i.d. from an unknown joint distribution over inputs and labels. The learner selects a hypothesis from a class H and hopes it generalizes to new draws from the same distribution. .i.d. assumption is the silent contract behind every accuracy report.',
            },
            {
              type: 'formula',
              latex: '\\mathcal{D} = \\{(\\mathbf{x}^{(i)}, y^{(i)})\\}_{i=1}^{m} \\sim P(\\mathbf{x}, y)',
              caption: 'Training data as i.i.d. samples from P',
            },
            {
              type: 'inlineFormulaParagraph',
              segments: [
                { text: 'A hypothesis ' },
                { latex: 'h : \\mathcal{X} \\to \\mathcal{Y}' },
                { text: ' maps features to predictions. In classification, ' },
                { latex: '\\mathcal{Y}' },
                { text: ' is discrete; in regression, ' },
                { latex: '\\mathcal{Y} = \\mathbb{R}' },
                { text: '.' },
              ],
            },
            { type: 'heading', level: 2, text: 'Empirical vs. True Risk' },
            {
              type: 'formula',
              latex: 'R(h) = \\mathbb{E}_{(\\mathbf{x}, y) \\sim P}\\big[\\ell(h(\\mathbf{x}), y)\\big]',
              caption: 'True (population) risk',
            },
            {
              type: 'formula',
              latex: '\\hat{R}(h) = \\frac{1}{m} \\sum_{i=1}^{m} \\ell\\big(h(\\mathbf{x}^{(i)}), y^{(i)}\\big)',
              caption: 'Empirical risk — what we can compute',
            },
            {
              type: 'paragraph',
              text: 'Empirical Risk Minimization (ERM) picks ĥ = argmin_{h∈H} R̂(h). learning theory shows that when H is finite and m is large enough, ERM yields low true risk with high probability—a PAC-style guarantee. The gap R(ĥ) − R̂(ĥ) is the generalization gap we measure on a held-out set.',
            },
            { type: 'heading', level: 2, text: 'Linear Models as a Baseline Hypothesis Class' },
            {
              type: 'formula',
              latex: 'h_{\\boldsymbol{\\theta}}(\\mathbf{x}) = \\boldsymbol{\\theta}^{\\mathsf T} \\mathbf{x} + b',
              caption: 'Linear hypothesis (regression or score for classification)',
            },
            {
              type: 'formula',
              latex: 'P(y=1 \\mid \\mathbf{x}) = \\sigma(\\boldsymbol{\\theta}^{\\mathsf T} \\mathbf{x} + b), \\quad \\sigma(z) = \\frac{1}{1 + e^{-z}}',
              caption: 'Logistic regression — linear boundary in feature space',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_breast_cancer

X, y = load_breast_cancer(return_X_y=True)
# ERM via scikit-learn: minimize average log-loss on training data
model = LogisticRegression(max_iter=1000)
model.fit(X, y)
train_risk = 1 - model.score(X, y)  # misclassification rate as empirical risk proxy
print(f"Training error (empirical risk proxy): {train_risk:.3f}")`,
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'Before chasing deep models, verify that a linear baseline underfits (high bias) or overfits (high variance). strong ML courses often requires this sanity check.',
            },
          ],
        },
        {
          id: 'ac-ml-evaluation-metrics',
          title: 'Model Evaluation & Metrics',
          estMinutes: 35,
          objective:
            'Choose evaluation metrics aligned with business costs and report confidence via cross-validation.',
          blocks: [
            {
              type: 'paragraph',
              text: '',
            },
            { type: 'heading', level: 2, text: 'Confusion Matrix & Derived Metrics' },
            {
              type: 'formula',
              latex: '\\text{Precision} = \\frac{TP}{TP + FP}, \\quad \\text{Recall} = \\frac{TP}{TP + FN}',
            },
            {
              type: 'formula',
              latex: 'F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}',
              caption: 'Harmonic mean — punishes extreme precision/recall trade-offs',
            },
            {
              type: 'formula',
              latex: '\\text{AUC-ROC} = P\\big(\\hat{s}(\\mathbf{x}^+) > \\hat{s}(\\mathbf{x}^-)\\big)',
              caption: 'Probability a random positive scores higher than a random negative',
            },
            { type: 'heading', level: 2, text: 'Regression Metrics' },
            {
              type: 'formula',
              latex: '\\text{MSE} = \\frac{1}{n}\\sum_{i=1}^{n}(y_i - \\hat{y}_i)^2, \\quad \\text{RMSE} = \\sqrt{\\text{MSE}}',
            },
            {
              type: 'formula',
              latex: 'R^2 = 1 - \\frac{\\sum_i (y_i - \\hat{y}_i)^2}{\\sum_i (y_i - \\bar{y})^2}',
              caption: 'Coefficient of determination — fraction of variance explained',
            },
            { type: 'heading', level: 2, text: 'Cross-Validation' },
            {
              type: 'paragraph',
              text: 'k-fold cross-validation partitions data into k folds, trains on k−1, validates on the held-out fold, and averages scores. ',
            },
            {
              type: 'formula',
              latex: '\\widehat{\\text{CV}} = \\frac{1}{k}\\sum_{j=1}^{k} \\mathcal{L}\\big(\\mathcal{D}_{\\text{test}}^{(j)}, h^{(-j)}\\big)',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `from sklearn.model_selection import cross_validate, StratifiedKFold
from sklearn.metrics import make_scorer, f1_score, roc_auc_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_breast_cancer

X, y = load_breast_cancer(return_X_y=True)
model = RandomForestClassifier(n_estimators=100, random_state=42)
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

scores = cross_validate(
    model, X, y, cv=cv,
    scoring={'f1': make_scorer(f1_score),
             'auc': make_scorer(roc_auc_score)},
    return_train_score=True,
)
print(f"CV F1:  {scores['test_f1'].mean():.3f} ± {scores['test_f1'].std():.3f}")
print(f"CV AUC: {scores['test_auc'].mean():.3f} ± {scores['test_auc'].std():.3f}")`,
            },
            {
              type: 'note',
              variant: 'warning',
              text: 'Never tune hyperparameters on the same fold you use for final reporting. Use nested cross-validation or a three-way train/validation/test split.',
            },
          ],
        },
        {
          id: 'ac-ml-generalization',
          title: 'Generalization & Decision Boundaries',
          estMinutes: 32,
          objective:
            'Connect hypothesis complexity to overfitting and interpret linear vs. non-linear decision boundaries.',
          blocks: [
            {
              type: 'paragraph',
              text: 'A key result: increasing model capacity reduces training error but can inflate the generalization gap. ',
            },
            { type: 'heading', level: 2, text: 'VC Dimension Intuition' },
            {
              type: 'paragraph',
              text: 'The VC dimension measures the richest labeling a hypothesis class can shatter. Higher VC dimension implies greater capacity to fit noise. You need not compute VC dim in practice, but the intuition—that richer H demands more data—guides regularization choices.',
            },
            {
              type: 'formula',
              latex: 'R(h) \\leq \\hat{R}(h) + O\\!\\left(\\sqrt{\\frac{d \\log(m/d) + \\log(1/\\delta)}{m}}\\right)',
              caption: 'Simplified PAC bound — d relates to hypothesis complexity',
            },
            { type: 'heading', level: 2, text: 'Non-Linear Boundaries via Feature Maps' },
            {
              type: 'formula',
              latex: 'h(\\mathbf{x}) = \\operatorname{sign}\\!\\left(\\sum_{i=1}^{m} \\alpha_i y^{(i)} K(\\mathbf{x}^{(i)}, \\mathbf{x}) + b\\right)',
              caption: 'Kernel SVM — linear separator in implicit feature space',
            },
            {
              type: 'formula',
              latex: 'K(\\mathbf{x}, \\mathbf{z}) = \\exp\\!\\left(-\\gamma \\|\\mathbf{x} - \\mathbf{z}\\|^2\\right)',
              caption: 'RBF (Gaussian) kernel',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.datasets import make_moons

X, y = make_moons(n_samples=300, noise=0.25, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

linear_svm = SVC(kernel='linear').fit(X_train, y_train)
rbf_svm = SVC(kernel='rbf', gamma=2).fit(X_train, y_train)

for name, model in [('Linear SVM', linear_svm), ('RBF SVM', rbf_svm)]:
    train_acc = accuracy_score(y_train, model.predict(X_train))
    test_acc = accuracy_score(y_test, model.predict(X_test))
    print(f"{name}: train={train_acc:.3f}, test={test_acc:.3f}")`,
            },
            {
              type: 'note',
              variant: 'why',
              text: 'When train accuracy ≫ test accuracy, you are witnessing high variance (overfitting). When both are low, the model is underfitting—add features or increase capacity before tuning regularization.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-ac-ml-practical-pipelines',
      title: 'Regularization & Practical Pipelines',
      subtitle: 'Bias–variance trade-offs, scikit-learn workflows, and feature engineering',
      topics: [
        {
          id: 'ac-ml-bias-variance-regularization',
          title: 'Bias, Variance & Regularization',
          estMinutes: 38,
          objective:
            'Decompose prediction error and apply L1/L2 regularization to control model complexity.',
          blocks: [
            {
              type: 'paragraph',
              text: '',
            },
            { type: 'heading', level: 2, text: 'Bias–Variance Decomposition' },
            {
              type: 'formula',
              latex: '\\mathbb{E}\\big[(y - \\hat{f}(\\mathbf{x}))^2\\big] = \\text{Bias}^2(\\hat{f}) + \\text{Var}(\\hat{f}) + \\sigma^2',
              caption: 'Irreducible noise σ² cannot be removed by any model',
            },
            {
              type: 'list',
              items: [
                'High bias: model too simple (underfitting). Example: linear boundary on moons data.',
                'High variance: model too flexible (overfitting). Example: depth-20 decision tree on 50 samples.',
                'Goal: find complexity where total error is minimized on validation data.',
              ],
            },
            { type: 'heading', level: 2, text: 'Regularized Objectives' },
            {
              type: 'formula',
              latex: 'J(\\boldsymbol{\\theta}) = \\frac{1}{m}\\sum_{i=1}^{m}\\ell\\big(h_{\\boldsymbol{\\theta}}(\\mathbf{x}^{(i)}), y^{(i)}\\big) + \\lambda \\|\\boldsymbol{\\theta}\\|_2^2',
              caption: 'L2 (Ridge) — shrinks all weights smoothly',
            },
            {
              type: 'formula',
              latex: 'J(\\boldsymbol{\\theta}) = \\frac{1}{m}\\sum_{i=1}^{m}\\ell\\big(h_{\\boldsymbol{\\theta}}(\\mathbf{x}^{(i)}), y^{(i)}\\big) + \\lambda \\|\\boldsymbol{\\theta}\\|_1',
              caption: 'L1 (Lasso) — promotes sparse feature selection',
            },
            {
              type: 'formula',
              latex: 'J(\\boldsymbol{\\theta}) = \\mathcal{L} + \\lambda_1 \\|\\boldsymbol{\\theta}\\|_1 + \\lambda_2 \\|\\boldsymbol{\\theta}\\|_2^2',
              caption: 'Elastic Net — combines L1 and L2',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `import numpy as np
from sklearn.linear_model import Ridge, Lasso, ElasticNet
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.model_selection import validation_curve
from sklearn.datasets import fetch_california_housing

X, y = fetch_california_housing(return_X_y=True)
pipe = Pipeline([('scale', StandardScaler()), ('ridge', Ridge())])

alphas = np.logspace(-2, 3, 20)
train_scores, val_scores = validation_curve(
    pipe, X, y, param_name='ridge__alpha', param_range=alphas, cv=5, scoring='neg_mean_squared_error'
)
best_idx = val_scores.mean(axis=1).argmax()
print(f"Best alpha: {alphas[best_idx]:.4f}")
print(f"Val MSE:  {-val_scores.mean(axis=1)[best_idx]:.4f}")`,
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'Always scale features before L1/L2 penalties. Unscaled features make λ meaningless because penalty magnitude depends on feature units.',
            },
          ],
        },
        {
          id: 'ac-ml-sklearn-pipelines',
          title: 'Scikit-Learn Pipelines & Model Selection',
          estMinutes: 36,
          objective:
            'Build leak-free preprocessing pipelines and tune hyperparameters with GridSearchCV.',
          blocks: [
            {
              type: 'paragraph',
              text: '',
            },
            { type: 'heading', level: 2, text: 'The Estimator API' },
            {
              type: 'list',
              items: [
                'fit(X, y) — learn parameters from training data',
                'predict(X) — generate predictions on new data',
                'transform(X) — apply learned preprocessing (scalers, encoders)',
                'Pipeline chains steps; ColumnTransformer applies different transforms per column',
              ],
            },
            { type: 'heading', level: 2, text: 'Pipeline + Grid Search' },
            {
              type: 'codeblock',
              language: 'python',
              code: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import GridSearchCV, StratifiedKFold
from sklearn.datasets import load_breast_cancer

X, y = load_breast_cancer(return_X_y=True)

pipe = Pipeline([
    ('impute', SimpleImputer(strategy='median')),
    ('scale', StandardScaler()),
    ('clf', GradientBoostingClassifier(random_state=42)),
])

param_grid = {
    'clf__n_estimators': [50, 100],
    'clf__max_depth': [2, 3, 5],
    'clf__learning_rate': [0.05, 0.1],
}

search = GridSearchCV(
    pipe, param_grid, cv=StratifiedKFold(5, shuffle=True, random_state=42),
    scoring='roc_auc', n_jobs=-1,
)
search.fit(X, y)
print(f"Best AUC: {search.best_score_:.3f}")
print(f"Best params: {search.best_params_}")`,
            },
            {
              type: 'note',
              variant: 'why',
              text: 'Prefix hyperparameters with step name and double underscore (clf__max_depth) so GridSearchCV knows which estimator to tune inside the pipeline.',
            },
            { type: 'heading', level: 2, text: 'Model Persistence' },
            {
              type: 'codeblock',
              language: 'python',
              code: `import joblib

# After search.fit(...)
joblib.dump(search.best_estimator_, 'best_model.joblib')
loaded = joblib.load('best_model.joblib')
# loaded.predict(X_new) applies impute → scale → classify in one call`,
            },
          ],
        },
        {
          id: 'ac-ml-feature-engineering',
          title: 'Feature Engineering',
          estMinutes: 34,
          objective:
            'Transform raw inputs into informative features using encoding, scaling, and domain-aware constructs.',
          blocks: [
            {
              type: 'paragraph',
              text: '',
            },
            { type: 'heading', level: 2, text: 'Numeric Transformations' },
            {
              type: 'formula',
              latex: 'x\' = \\frac{x - \\mu}{\\sigma}',
              caption: 'Standardization — zero mean, unit variance',
            },
            {
              type: 'formula',
              latex: 'x\' = \\log(1 + x)',
              caption: 'Log transform — compresses heavy-tailed distributions',
            },
            {
              type: 'formula',
              latex: '\\phi_{ij} = x_i \\cdot x_j',
              caption: 'Polynomial interaction feature',
            },
            { type: 'heading', level: 2, text: 'Categorical Encoding' },
            {
              type: 'paragraph',
              text: 'One-hot encoding creates binary columns per category. Target encoding replaces categories with smoothed mean response—powerful but prone to leakage unless computed inside cross-validation folds. ',
            },
            {
              type: 'codeblock',
              language: 'python',
              code: `import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder, PolynomialFeatures
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor

df = pd.DataFrame({
    'sqft': [800, 1200, 1500, 900],
    'bedrooms': [2, 3, 4, 2],
    'city': ['Austin', 'Boston', 'Boston', 'Austin'],
    'price': [320000, 510000, 620000, 350000],
})

X = df.drop('price', axis=1)
y = df['price']

preprocessor = ColumnTransformer([
    ('num', PolynomialFeatures(degree=2, include_bias=False), ['sqft', 'bedrooms']),
    ('cat', OneHotEncoder(handle_unknown='ignore'), ['city']),
])

pipe = Pipeline([
    ('prep', preprocessor),
    ('model', RandomForestRegressor(n_estimators=100, random_state=42)),
])
pipe.fit(X, y)
print(f"R² on training data: {pipe.score(X, y):.3f}")`,
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'Tree-based models (Random Forest, Gradient Boosting) are invariant to monotonic transforms of individual features but still benefit from thoughtful missing-value handling and encoded categoricals.',
            },
          ],
        },
      ],
    },
  ],
};
