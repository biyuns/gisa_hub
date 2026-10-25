"use client";

import { useState } from "react";
import type { WrongAnswer } from "@/features/wrong-answers/types";
import { ReviewQuestion } from "./review-question";
import styles from "@/features/wrong-answers/wrong-answers.module.css";
import reviewStyles from "../review.module.css";

const statuses = ["전체", "복습 전", "복습 완료"] as const;
type ReviewStatus = (typeof statuses)[number];

export function ReviewNotebook({ answers }: { answers: readonly WrongAnswer[] }) {
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState<ReviewStatus>("전체");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Record<string, number>>({});
  const subjects = [...new Set(answers.map(answer => answer.subject))];
  const completed = answers.filter(answer => results[answer.id] !== undefined).length;
  const correct = answers.filter(answer => results[answer.id] === answer.correctIndex).length;
  const normalizedQuery = query.replace(/\s/g, "").toLowerCase();
  const filtered = answers.filter(answer => {
    const reviewed = results[answer.id] !== undefined;
    const text = `${answer.question}${answer.subject}${answer.source}`.replace(/\s/g, "").toLowerCase();
    return (!subject || answer.subject === subject)
      && (status === "전체" || (status === "복습 완료" ? reviewed : !reviewed))
      && text.includes(normalizedQuery);
  });
  const isFiltered = Boolean(subject || query || status !== "전체");
  const summaries = [
    { label: "복습할 문제", value: answers.length - completed, unit: "문제", note: "한 문제씩, 차근차근 시작해요", icon: "▤" },
    { label: "복습 완료", value: completed, unit: "문제", note: "다시 풀어보며 다진 나의 실력", icon: "✓" },
    { label: "복습 정답률", value: completed ? Math.round(correct / completed * 100) : "—", unit: completed ? "%" : "", note: completed ? `${completed}문제 중 ${correct}문제 정답` : "문제를 풀면 정답률이 표시돼요", icon: "↗" },
  ];

  function resetFilters() {
    setSubject("");
    setStatus("전체");
    setQuery("");
  }

  return <>
    <section className={styles.summary} aria-label="복습 현황">
      {summaries.map(item => <article key={item.label}>
        <div><p>{item.label}</p><strong>{item.value}<span>{item.unit}</span></strong><small>{item.note}</small></div>
        <span className={styles.summaryIcon} aria-hidden="true">{item.icon}</span>
      </article>)}
    </section>
    <aside className={styles.guide}>
      <span aria-hidden="true">✧</span>
      <div><strong>기억이 흐려지기 전에, 한 번 더.</strong><p>정답을 보지 않고 다시 풀어보세요. 답을 확인한 뒤에는 해설로 개념을 정리할 수 있어요.</p></div>
    </aside>
    <section aria-labelledby="review-title">
      <div className={styles.sectionHeading}>
        <div><h2 id="review-title">다시 풀어볼 문제 <span>{answers.length}</span></h2><p>헷갈렸던 문제를 다시 만나고, 배운 내용을 확실히 기억해보세요.</p></div>
        <span className={styles.sampleBadge}>예시 문제</span>
      </div>
      <div className={reviewStyles.progressHeading}><span>복습 진행도</span><span>{completed} / {answers.length}문제</span></div>
      <progress className={reviewStyles.progress} aria-label="복습 진행도" value={completed} max={answers.length || 1} />
      <div className={styles.filterArea}>
        <div className={styles.tabs} role="group" aria-label="복습 상태">
          {statuses.map(item => <button key={item} aria-pressed={status === item} onClick={() => setStatus(item)}>{item}</button>)}
        </div>
        <div className={styles.filterRow}>
          <label className={styles.subjectFilter}>과목<select value={subject} onChange={event => setSubject(event.target.value)}><option value="">전체 과목</option>{subjects.map(item => <option key={item}>{item}</option>)}</select></label>
          <label className={styles.search}><span aria-hidden="true">⌕</span><input type="search" aria-label="복습 문제 검색" placeholder="문제, 과목 또는 모의고사명 검색" value={query} onChange={event => setQuery(event.target.value)} /></label>
        </div>
      </div>
      <div className={styles.results}>
        <p role="status">총 <strong>{filtered.length}</strong>개의 문제 · 복습 완료 {completed}개</p>
        <button disabled={!isFiltered} onClick={resetFilters}>↻ 필터 초기화</button>
      </div>
      <div className={styles.list}>{filtered.map(answer => <ReviewQuestion key={answer.id} answer={answer} submittedIndex={results[answer.id]} onSubmit={index => setResults(previous => ({ ...previous, [answer.id]: index }))} onRetry={() => setResults(previous => {
        const next = { ...previous };
        delete next[answer.id];
        return next;
      })} />)}</div>
      {!filtered.length && <div className={styles.empty}>
        <h3>{!isFiltered ? "복습할 문제가 없습니다" : status === "복습 전" && completed === answers.length ? "모든 문제를 복습했어요" : "조건에 맞는 문제가 없습니다"}</h3>
        <p>{status === "복습 전" && completed === answers.length ? "전체 목록에서 결과와 해설을 다시 확인해보세요." : "다른 과목이나 복습 상태를 선택해보세요."}</p>
        {isFiltered && <button onClick={resetFilters}>전체 문제 보기</button>}
      </div>}
    </section>
  </>;
}
