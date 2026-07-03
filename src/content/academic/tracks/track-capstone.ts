import type { AcademicTrack } from '../../../types/academic';

export const trackCapstone: AcademicTrack = {
  id: 'track-capstone',
  title: 'Capstone Projects',
  subtitle: 'Scope, build, and ship portfolio-ready AI systems',
  levelBadge: 'Build · Evaluate · Showcase',
  courseIds: ['ai-projects'],
  color: '#E56B5D',
  accent: '#FEF2F0',
  termLabel: 'Capstone',
  modules: [
    {
      id: 'mod-cap-project',
      title: 'End-to-End AI Project',
      subtitle: 'From problem definition to deployed portfolio piece',
      topics: [
        {
          id: 'ac-cap-scoping',
          title: 'Scoping & Problem Definition',
          estMinutes: 35,
          objective:
            'Define a capstone project with clear success criteria, feasible scope, and alignment between user needs, data availability, and evaluation methodology.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'Most capstone failures happen before a single line of model code is written — unclear goals, unavailable data, or impossible timelines. Rigorous scoping separates portfolio-worthy projects from abandoned notebooks.',
            },
            { type: 'heading', level: 2, text: 'Choosing a Problem' },
            {
              type: 'paragraph',
              text: 'Start with a user or stakeholder pain point, not a model architecture. Strong capstones solve a concrete task: classify medical images, summarize support tickets, recommend study paths, or detect anomalies in sensor streams. The best projects have a measurable "before vs. after."',
            },
            {
              type: 'list',
              items: [
                'User story: who benefits and what decision or action changes?',
                'Baseline: what is the current manual or rule-based approach?',
                'Data audit: do you have enough labeled examples? What is the label quality?',
                'Constraints: latency, cost, privacy, offline vs. online requirements',
              ],
            },
            { type: 'heading', level: 3, text: 'SMART Success Criteria' },
            {
              type: 'paragraph',
              text: 'Define Specific, Measurable, Achievable, Relevant, Time-bound goals. "Build a good chatbot" is not a capstone goal. "Reduce tier-1 support resolution time by 20% on FAQ queries with ≥90% user satisfaction in a 2-week pilot" is.',
            },
            {
              type: 'inlineFormulaParagraph',
              segments: [
                { text: 'Primary metric example: ' },
                { latex: 'F_1' },
                { text: ' on held-out test set with ' },
                { latex: 'F_1 \\geq 0.85' },
                { text: '. Secondary: inference latency ' },
                { latex: 'p_{95} < 500\\,\\text{ms}' },
                { text: ', cost per query ' },
                { latex: '< \\$0.01' },
                { text: '.' },
              ],
            },
            { type: 'heading', level: 2, text: 'Scope Management' },
            {
              type: 'paragraph',
              text: 'Capstone timelines typically span 8–12 weeks. Use an MVP ladder: Week 1–2 data + baseline, Week 3–5 model iteration, Week 6–8 integration + eval, Week 9+ polish + deployment. Cut features before cutting evaluation rigor.',
            },
            {
              type: 'list',
              items: [
                'MVP: simplest model that runs end-to-end (logistic regression, small LLM prompt)',
                'V1: improved accuracy with error analysis-driven iterations',
                'V2: production features (API, UI, monitoring) if time permits',
              ],
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'Write a one-page project charter before coding: problem, users, data, metrics, risks, and weekly milestones. Review it with a mentor.',
            },
            {
              type: 'note',
              variant: 'warning',
              text: 'Avoid "Kaggle competition clones" with no deployment story unless you extend them with novel data, domain integration, or production constraints.',
            },
          ],
        },
        {
          id: 'ac-cap-end-to-end',
          title: 'Building End-to-End Systems',
          estMinutes: 50,
          objective:
            'Architect and implement a complete AI pipeline spanning data ingestion, training, inference API, and user-facing interface with proper testing and documentation.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'Employers and graduate committees evaluate capstones as systems, not isolated models. An end-to-end build demonstrates you can ship — data pipelines, APIs, error handling, and user experience included.',
            },
            { type: 'heading', level: 2, text: 'System Architecture' },
            {
              type: 'paragraph',
              text: 'A typical capstone architecture layers data storage, a training/offline pipeline, a model artifact registry, an inference service, and a client (web app, mobile screen, or CLI). Draw the diagram before writing code — identify bottlenecks early.',
            },
            {
              type: 'list',
              items: [
                'Data layer: raw storage, processed features, train/val/test splits (versioned)',
                'Training: reproducible scripts, config files, experiment logs',
                'Serving: REST or gRPC API, batch endpoint for offline jobs',
                'Client: minimal UI that exercises the full path a user would take',
              ],
            },
            { type: 'heading', level: 3, text: 'Error Analysis Loop' },
            {
              type: 'paragraph',
              text: 'Inspect failures systematically: confusion matrices for classification, worst-case examples for generation, slice analysis by metadata. Each iteration should be hypothesis-driven — "errors spike on low-light images" → augment or collect targeted data.',
            },
            {
              type: 'formula',
              latex: '\\text{Error rate on slice } S = \\frac{|\\{ i \\in S : \\hat{y}_i \\neq y_i \\}|}{|S|}',
              caption: 'Slice-level error — never rely on aggregate accuracy alone',
            },
            { type: 'heading', level: 2, text: 'Testing Strategy' },
            {
              type: 'list',
              items: [
                'Unit tests: preprocessing, feature transforms, postprocessing',
                'Contract tests: API request/response schemas, auth boundaries',
                'Model tests: golden-file inputs with expected outputs within tolerance',
                'Load smoke tests: basic latency under expected concurrency',
              ],
            },
            { type: 'heading', level: 2, text: 'Minimal FastAPI Inference Service' },
            {
              type: 'codeblock',
              language: 'python',
              code: `from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI(title="Capstone Inference API")
model = joblib.load("artifacts/model.joblib")

class PredictRequest(BaseModel):
    features: list[float]

class PredictResponse(BaseModel):
    label: str
    confidence: float

@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    proba = model.predict_proba([req.features])[0]
    idx = int(proba.argmax())
    return PredictResponse(
        label=model.classes_[idx],
        confidence=float(proba[idx]),
    )`,
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'Keep training and serving preprocessing in a shared module. Copy-pasted preprocessing is the #1 source of capstone demo failures.',
            },
          ],
        },
        {
          id: 'ac-cap-portfolio',
          title: 'Portfolio, Deployment & Demo',
          estMinutes: 40,
          objective:
            'Package the capstone for recruiters and reviewers with deployed demos, clear documentation, and a compelling narrative of impact and technical decisions.',
          blocks: [
            {
              type: 'note',
              variant: 'why',
              text: 'A capstone only matters if people can see and understand it. Deployment, documentation, and storytelling turn months of work into interview leverage and evidence of production-ready skills.',
            },
            { type: 'heading', level: 2, text: 'Deployment Options' },
            {
              type: 'list',
              items: [
                'Static demo: Hugging Face Spaces, Gradio, Streamlit — fastest path to shareable URL',
                'Cloud API: Railway, Fly.io, AWS Lambda + API Gateway for backend services',
                'Mobile: ONNX/TFLite export for on-device inference in PyGrounds-style apps',
                'Container: Docker image with health checks for reproducible deployment',
              ],
            },
            {
              type: 'paragraph',
              text: 'Choose deployment depth matched to your project. A RAG assistant needs a live endpoint; a computer vision classifier can demo via a static Space with uploaded images. Always include a fallback when APIs are unavailable during interviews.',
            },
            { type: 'heading', level: 3, text: 'Documentation That Recruiters Read' },
            {
              type: 'paragraph',
              text: 'Structure your README as: Problem → Approach → Results (with numbers) → Demo link → Architecture diagram → How to reproduce locally. Lead with impact, not implementation trivia.',
            },
            {
              type: 'list',
              items: [
                'Hero metric: one number that proves the project worked',
                'Architecture diagram: boxes for data, model, API, UI',
                'Trade-offs section: what you tried, what failed, what you chose and why',
                'Repro instructions: clone, env setup, one command to run demo',
              ],
            },
            { type: 'heading', level: 2, text: 'Demo & Interview Narrative' },
            {
              type: 'paragraph',
              text: 'Prepare a 3-minute live demo script and a 10-minute deep-dive. Show the happy path first, then one failure case and how the system handles it. Connect decisions to course concepts: "We used RAG here because the knowledge base updates weekly."',
            },
            {
              type: 'note',
              variant: 'tip',
              text: 'Record a 2-minute Loom or screen capture as backup. Live demos fail — a video link in your README saves interviews.',
            },
            { type: 'heading', level: 2, text: 'Portfolio README Template' },
            {
              type: 'codeblock',
              language: 'text',
              code: `# Project Title — One-line impact statement

**Demo:** https://your-demo-url.example
**Metrics:** F1 0.87 | p95 latency 320ms | 1.2k users in pilot

## Problem
Support agents spent 12 min/ticket on repetitive FAQ lookups.

## Solution
RAG pipeline over internal docs + intent classifier for routing.

## Architecture
[Insert diagram: ingest → embed → FAISS → LLM → API → React UI]

## Results
- 34% reduction in median handle time (n=400 tickets)
- 91% answer faithfulness on golden eval set

## Reproduce
python -m venv .venv && pip install -r requirements.txt
python train.py && uvicorn serve:app --reload`,
            },
            {
              type: 'note',
              variant: 'warning',
              text: 'Never deploy with open API keys, unauthenticated admin endpoints, or real user PII in public demos. Use synthetic data for portfolio deployments.',
            },
          ],
        },
      ],
    },
  ],
};
