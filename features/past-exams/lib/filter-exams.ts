import type { ExamFilters, PastExam } from "../types";

export function filterExams(exams: readonly PastExam[], filters: ExamFilters) {
  const query = filters.query.replace(/\s/g, "").toLowerCase();

  return exams.filter(exam => {
    const title = `정보처리기사${exam.year}년제${exam.round}회${exam.examType === "practical" ? "실기" : "필기"}`;
    return (
      (!filters.year || String(exam.year) === filters.year) &&
      (!filters.round || String(exam.round) === filters.round) &&
      title.includes(query)
    );
  });
}
