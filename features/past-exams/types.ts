export type PastExam = {
  id: string;
  year: number;
  round: number;
  questionCount: number;
  durationMinutes?: number;
  examType?: "written" | "practical";
};

export type ExamFilters = { year: string; round: string; query: string };

export type PracticalQuestion = {
  id: string;
  number: number;
  promptMarkdown: string;
  answerMarkdown: string;
  explanationMarkdown: string;
};

export type PracticalExam = {
  id: string;
  title: string;
  year: number;
  round: number;
  examType: string;
  questions: PracticalQuestion[];
};
