export type AcademicQuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  tag?: string;
};

export type AcademicTrackQuiz = {
  trackId: string;
  title: string;
  subtitle: string;
  questions: AcademicQuizQuestion[];
};
