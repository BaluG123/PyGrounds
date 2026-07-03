import type { LibraryId } from './course';

export type ContentBlock =
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'formula'; latex: string; caption?: string }
  | { type: 'inlineFormulaParagraph'; segments: Array<{ text: string } | { latex: string }> }
  | { type: 'codeblock'; language: 'python' | 'text'; code: string }
  | { type: 'note'; variant: 'tip' | 'why' | 'warning'; text: string }
  | { type: 'list'; items: string[] };

export interface AcademicTopic {
  id: string;
  title: string;
  estMinutes: number;
  objective?: string;
  blocks: ContentBlock[];
}

export interface AcademicModule {
  id: string;
  title: string;
  subtitle: string;
  topics: AcademicTopic[];
}

export interface AcademicTrack {
  id: string;
  title: string;
  subtitle: string;
  /** Short skill-level tagline shown on track cards */
  levelBadge: string;
  courseIds: LibraryId[];
  color: string;
  accent: string;
  termLabel: string;
  modules: AcademicModule[];
}

export interface CodeSnippet {
  id: string;
  title: string;
  intro?: string;
  relatedFormula?: string;
  code: string;
  expectedOutputNote?: string;
}

export interface AcademicLab {
  id: string;
  trackId: string;
  moduleId?: string;
  title: string;
  description: string;
  snippets: CodeSnippet[];
}

// Legacy aliases used by mathForAI content
export type MathTopic = AcademicTopic;
export type MathPhase = AcademicModule;
export type MathLab = AcademicLab & { phaseId: string };
