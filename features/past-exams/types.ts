export type PastExam = {
  id: string;
  year: number;
  round: number;
  questionCount: number;
  durationMinutes: number;
};

export type ExamFilters = { year: string; round: string; query: string };
