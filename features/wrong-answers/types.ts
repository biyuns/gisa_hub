export type WrongAnswer = {
  id: string;
  subject: string;
  source: string;
  questionNumber: number;
  question: string;
  options: readonly string[];
  selectedIndex: number;
  correctIndex: number;
  explanation: string;
};

export type AnswerFilters = {
  subject: string;
  status: "전체" | "학습 필요" | "이해 완료";
  query: string;
};
