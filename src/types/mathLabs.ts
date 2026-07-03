export interface CodeSnippet {
  id: string;
  title: string;
  intro?: string;
  relatedFormula?: string;
  code: string;
  expectedOutputNote?: string;
}

export interface MathLab {
  id: string;
  phaseId: string;
  title: string;
  description: string;
  snippets: CodeSnippet[];
}
