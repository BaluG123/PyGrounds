import type { AcademicTrack } from '../../../types/academic';

export const trackAIEngineering: AcademicTrack = {
  id: 'track-ai-engineering',
  title: 'AI Engineering',
  subtitle: 'Production ML systems, LLMOps, and responsible deployment',
  levelBadge: 'Deploy · Monitor · Ship safely',
  courseIds: ['ai-engineering'],
  color: '#183B56',
  accent: '#E3EEF9',
  termLabel: 'Term 7',
  modules: [
    {
      id: 'mod-eng-mlops',
      title: 'MLOps & LLMOps',
      subtitle: 'Ship, monitor, and evaluate models in production',
      topics: [
        {
          id: 'ac-eng-mlops-lifecycle',
          title: 'The MLOps Lifecycle',
          estMinutes: 45,
          objective:
            'Map the end-to-end ML lifecycle from data versioning through CI/CD, model registry, and production serving with reproducibility and rollback guarantees.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'Training a model in a notebook is the easy part. MLOps ensures experiments are reproducible, deployments are auditable, and production systems degrade gracefully — the difference between a demo and a product.',
            },
            { type: 'heading', level: 2, text: 'The ML System Lifecycle' },
            {
              type: 'paragraph',
              text: 'Production ML spans data engineering, feature pipelines, training orchestration, model validation, deployment, monitoring, and retraining triggers. Unlike traditional software, ML systems fail silently when data distributions shift.',
            },
            {
              type: 'list',
              items: [
                'Data: ingestion, labeling, validation, and versioned datasets (DVC, Delta Lake)',
                'Training: experiment tracking, hyperparameter search, distributed jobs',
                'Registry: model artifacts, metadata, stage promotion (dev → staging → prod)',
                'Serving: batch vs. online inference, autoscaling, latency SLOs',
                'Monitoring: data drift, prediction drift, performance decay',
              ],
            },
            { type: 'heading', level: 3, text: 'CI/CD for ML' },
            {
              type: 'paragraph',
              text: 'ML CI/CD extends software pipelines with data and model tests. Continuous training (CT) retriggers pipelines when fresh data or drift thresholds are met. Immutable artifacts and containerized environments ensure "works on my machine" never reaches production.',
            },
            {
              type: 'inlineFormulaParagraph',
              segments: [
                { text: 'A model promotion gate might require validation accuracy ' },
                { latex: '\\geq A_{\\min}' },
                { text: ', latency ' },
                { latex: 'p_{99} \\leq L_{\\max}' },
                { text: ', and no regression on a golden evaluation set.' },
              ],
            },
            { type: 'heading', level: 2, text: 'Feature Stores & Serving' },
            {
              type: 'paragraph',
              text: 'Feature stores unify offline training features and online serving features, preventing training-serving skew. Batch features power nightly retrains; low-latency online features feed real-time inference with point-in-time correctness.',
            },
            {
              type: 'note',
              variant: 'warning',
              text: 'Training-serving skew — when live features differ from training features — is a top cause of silent production failures. Always log feature values at inference time.',
            },
            { type: 'heading', level: 2, text: 'Pipeline Skeleton' },
            {
              type: 'codeblock',
              language: 'python',
              code: `# mlflow + sklearn example — track experiment and register model
import mlflow
import mlflow.sklearn
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier

with mlflow.start_run(run_name="churn-v3"):
    pipeline = Pipeline([
        ("model", RandomForestClassifier(n_estimators=200, max_depth=8)),
    ])
    pipeline.fit(X_train, y_train)
    accuracy = pipeline.score(X_val, y_val)

    mlflow.log_param("n_estimators", 200)
    mlflow.log_metric("val_accuracy", accuracy)
    mlflow.sklearn.log_model(pipeline, artifact_path="model", registered_model_name="churn-classifier")`,
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'Treat datasets, code commits, and model artifacts as a single versioned bundle. When debugging production incidents, you must reconstruct exactly what was deployed.',
            },
          ],
        },
        {
          id: 'ac-eng-llmops-evals',
          title: 'LLMOps, Evals & Monitoring',
          estMinutes: 45,
          objective:
            'Design evaluation harnesses, observability stacks, and guardrails for LLM applications in production environments.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'LLM applications are non-deterministic, prompt-sensitive, and expensive at scale. LLMOps adds prompt versioning, automated evals, cost tracking, and safety filters on top of classical MLOps practices.',
            },
            { type: 'heading', level: 2, text: 'LLM Application Stack' },
            {
              type: 'list',
              items: [
                'Prompt management: versioned templates, A/B tests, environment-specific configs',
                'Orchestration: chains, agents, retrieval pipelines with tracing',
                'Inference: model routing, caching, batching, fallback models',
                'Observability: token usage, latency, error rates, user feedback',
              ],
            },
            { type: 'heading', level: 3, text: 'Evaluation Frameworks' },
            {
              type: 'paragraph',
              text: 'LLM evals combine reference-based metrics (exact match, ROUGE, BERTScore) with model-based judges (LLM-as-judge) and human rubrics. Build golden datasets from real user failures — not only happy-path examples.',
            },
            {
              type: 'list',
              items: [
                'Unit evals: single-turn correctness on curated prompts',
                'Regression suites: block deploys when scores drop below thresholds',
                'Adversarial evals: jailbreak attempts, prompt injection, PII leakage',
                'Online evals: thumbs-up/down, implicit signals (task completion rate)',
              ],
            },
            {
              type: 'formula',
              latex: '\\text{Faithfulness} = \\frac{|\\text{claims supported by context}|}{|\\text{total claims}|}',
              caption: 'RAG faithfulness — fraction of generated claims grounded in retrieved evidence',
            },
            { type: 'heading', level: 2, text: 'Production Monitoring' },
            {
              type: 'paragraph',
              text: 'Monitor input/output distributions, refusal rates, toxicity scores, and retrieval quality. Alert on latency spikes, cost anomalies, and embedding index staleness. Structured logging with trace IDs links user sessions to prompt versions and retrieved documents.',
            },
            {
              type: 'inlineFormulaParagraph',
              segments: [
                { text: 'Cost per request: ' },
                { latex: 'C = n_{\\text{in}} p_{\\text{in}} + n_{\\text{out}} p_{\\text{out}}' },
                { text: ' for input/output tokens and per-token pricing ' },
                { latex: 'p' },
                { text: '. Track ' },
                { latex: 'p_{95}' },
                { text: ' and ' },
                { latex: 'p_{99}' },
                { text: ' latency alongside spend.' },
              ],
            },
            { type: 'heading', level: 2, text: 'Eval Harness Pattern' },
            {
              type: 'codeblock',
              language: 'python',
              code: `from dataclasses import dataclass

@dataclass
class EvalCase:
    prompt: str
    reference: str
    tags: list[str]

def exact_match(pred: str, ref: str) -> float:
    return float(pred.strip().lower() == ref.strip().lower())

cases = [
    EvalCase("Capital of France?", "Paris", ["geo"]),
    EvalCase("2 + 2 = ?", "4", ["math"]),
]

def run_eval(generate_fn, cases):
    scores = [exact_match(generate_fn(c.prompt), c.reference) for c in cases]
    return sum(scores) / len(scores)

# assert run_eval(my_app, cases) >= 0.95 before deploy`,
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'Run evals in CI on every prompt or model change. Pair automated scores with periodic human review — LLM judges drift too.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-eng-responsible',
      title: 'Responsible AI Engineering',
      subtitle: 'Fairness, safety, and governance in deployed systems',
      topics: [
        {
          id: 'ac-eng-responsible-ai',
          title: 'Responsible AI & Governance',
          estMinutes: 40,
          objective:
            'Apply fairness auditing, safety controls, and governance frameworks to AI systems that affect real users and regulated domains.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'Deployed AI can amplify bias, leak private data, and cause harm at scale. Responsible AI engineering embeds ethics, compliance, and safety into the same pipelines that ship features — not as an afterthought.',
            },
            { type: 'heading', level: 2, text: 'Fairness & Bias' },
            {
              type: 'paragraph',
              text: 'Models trained on historical data inherit societal biases. Audit performance across demographic and geographic slices. Fairness is not one metric — equalized odds, demographic parity, and calibration each capture different notions of equity.',
            },
            {
              type: 'list',
              items: [
                'Representation bias: skewed training data under-represents groups',
                'Measurement bias: labels reflect human prejudice or proxy variables',
                'Deployment bias: product design steers usage patterns unequally',
                'Mitigation: reweighting, adversarial debiasing, human-in-the-loop review',
              ],
            },
            {
              type: 'formula',
              latex: 'P(\\hat{Y}=1 \\mid A=a) \\approx P(\\hat{Y}=1 \\mid A=b)',
              caption: 'Demographic parity — equal positive prediction rates across groups A, B',
            },
            { type: 'heading', level: 3, text: 'Privacy & Security' },
            {
              type: 'paragraph',
              text: 'Apply data minimization, differential privacy for aggregates, and PII redaction in logs. Guard against prompt injection, model extraction, and membership inference. Align with GDPR, HIPAA, or sector-specific regulations as applicable.',
            },
            { type: 'heading', level: 2, text: 'Safety Controls for LLMs' },
            {
              type: 'list',
              items: [
                'Input filters: block jailbreaks, malicious URLs, credential patterns',
                'Output filters: toxicity, self-harm, medical/legal overreach',
                'Grounding: require citations in RAG; refuse when evidence is insufficient',
                'Human escalation: high-stakes decisions route to expert review',
              ],
            },
            {
              type: 'note',
              variant: 'warning',
              text: 'Safety classifiers and refusals reduce but do not eliminate risk. Document known failure modes and maintain incident response playbooks.',
            },
            { type: 'heading', level: 2, text: 'Governance & Documentation' },
            {
              type: 'paragraph',
              text: 'Model cards and system cards document intended use, limitations, training data, and evaluation results. Risk tiering (low / medium / high impact) determines review depth, testing requirements, and approval workflows before launch.',
            },
            {
              type: 'list',
              items: [
                'Model card: architecture, data sources, metrics, ethical considerations',
                'Data sheet: provenance, collection method, known gaps',
                'Impact assessment: stakeholders affected, failure scenarios, rollback plan',
                'Audit trail: who approved deployment, which eval gates passed',
              ],
            },
            { type: 'heading', level: 2, text: 'Fairness Audit Checklist' },
            {
              type: 'codeblock',
              language: 'text',
              code: `Pre-deployment responsible AI checklist:
[ ] Slice metrics computed for protected attributes (where legal/ethical)
[ ] Worst-group performance meets minimum threshold
[ ] PII scrubbed from logs and training exports
[ ] Red-team results documented with mitigations
[ ] Model card published in internal registry
[ ] Rollback procedure tested in staging`,
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'Engage domain experts and affected communities early. Technical fairness metrics cannot substitute for stakeholder impact analysis.',
            },
          ],
        },
      ],
    },
  ],
};
