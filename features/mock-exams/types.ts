export type ExamCategory = "종합" | "과목별";
export type MockExam = {
  id: string;
  title: string;
  description: string;
  category: ExamCategory;
  subjects: readonly string[];
  questionCount: number;
  durationMinutes: number;
};

export type MockExamFilters = {
  category: "전체" | ExamCategory;
  subject: string;
  query: string;
};
