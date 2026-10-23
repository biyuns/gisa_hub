import type { MockExam, MockExamFilters } from "../types";

export function filterMockExams(exams: readonly MockExam[], filters: MockExamFilters) {
  const query = filters.query.replace(/\s/g, "").toLowerCase();

  return exams.filter(exam => {
    const searchableText = `${exam.title}${exam.category}${exam.subjects.join("")}`
      .replace(/\s/g, "").toLowerCase();
    return (filters.category === "전체" || exam.category === filters.category)
      && (!filters.subject || exam.subjects.includes(filters.subject))
      && searchableText.includes(query);
  });
}
