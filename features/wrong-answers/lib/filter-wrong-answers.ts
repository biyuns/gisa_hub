import type { AnswerFilters, WrongAnswer } from "../types";

export function filterWrongAnswers(
  answers: readonly WrongAnswer[],
  filters: AnswerFilters,
  completedIds: readonly string[],
) {
  const query = filters.query.replace(/\s/g, "").toLowerCase();
  return answers.filter(answer => {
    const completed = completedIds.includes(answer.id);
    const matchesStatus = filters.status === "전체"
      || (filters.status === "이해 완료" ? completed : !completed);
    const text = `${answer.question}${answer.subject}${answer.source}`.replace(/\s/g, "").toLowerCase();
    return (!filters.subject || filters.subject === answer.subject)
      && matchesStatus && text.includes(query);
  });
}
