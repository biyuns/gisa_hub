"use client";

import { useState } from "react";
import type { AnswerFilters as Filters, WrongAnswer } from "../types";
import { filterWrongAnswers } from "../lib/filter-wrong-answers";
import { AnswerSummary } from "./answer-summary";
import { AnswerFilters } from "./answer-filters";
import { WrongAnswerCard } from "./wrong-answer-card";
import styles from "../wrong-answers.module.css";

const initialFilters: Filters = { subject: "", status: "전체", query: "" };

export function WrongAnswerNotebook({ answers }: { answers: readonly WrongAnswer[] }) {
  const [filters, setFilters] = useState(initialFilters);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const subjects = [...new Set(answers.map(answer => answer.subject))];
  const filtered = filterWrongAnswers(answers, filters, completedIds);
  const isFiltered = Boolean(filters.subject || filters.query || filters.status !== "전체");

  function toggleCompleted(id: string) {
    setCompletedIds(previous => previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id]);
  }

  return <>
    <AnswerSummary total={answers.length} completed={completedIds.length} />
    <aside className={styles.guide}><span aria-hidden="true">✧</span><div><strong>틀린 이유를 이해하면, 다음에는 맞힐 수 있어요.</strong><p>정답과 해설을 살펴본 뒤, 이해한 문제는 완료로 표시해보세요.</p></div></aside>
    <section aria-labelledby="notebook-title"><div className={styles.sectionHeading}><div><h2 id="notebook-title">나의 오답 문제 <span>{answers.length}</span></h2><p>헷갈렸던 개념을 하나씩 내 것으로 만들어보세요.</p></div><span className={styles.sampleBadge}>예시 문제</span></div>
      <AnswerFilters value={filters} subjects={subjects} onChange={setFilters} />
      <div className={styles.results}><p role="status" aria-live="polite">총 <strong>{filtered.length}</strong>개의 문제 · 이해 완료 {completedIds.length}개</p><button disabled={!isFiltered} onClick={() => setFilters(initialFilters)}>↻ 필터 초기화</button></div>
      <div className={styles.list}>{filtered.map(answer => <WrongAnswerCard key={answer.id} answer={answer} completed={completedIds.includes(answer.id)} onToggleCompleted={toggleCompleted} />)}</div>
      {!filtered.length && <div className={styles.empty}><h3>조건에 맞는 문제가 없습니다</h3><p>다른 과목이나 학습 상태를 선택해보세요.</p><button onClick={() => setFilters(initialFilters)}>전체 문제 보기</button></div>}
    </section>
  </>;
}
