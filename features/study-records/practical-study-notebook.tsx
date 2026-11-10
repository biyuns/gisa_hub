"use client";

import Link from "next/link";
import { useState } from "react";
import type { PracticalExam, PracticalQuestion } from "@/features/past-exams/types";
import { PracticalQuestionCard } from "@/features/past-exams/components/practical-question-card";
import { StudyMarkdown } from "@/features/past-exams/components/study-markdown";
import { retryQuestion, useStudyRecords, type QuestionRecord } from "./use-study-records";
import styles from "@/features/wrong-answers/wrong-answers.module.css";
import studyStyles from "@/features/past-exams/practical-exam.module.css";

type Status = "전체" | "학습 필요" | "복습 완료";

export function PracticalStudyNotebook({ exams, mode }: { exams: readonly PracticalExam[]; mode: "wrong-answers" | "review" }) {
  const { records, ready, error } = useStudyRecords();
  const [examId, setExamId] = useState("");
  const [status, setStatus] = useState<Status>("전체");
  const [query, setQuery] = useState("");
  const entries = exams.flatMap(exam => exam.questions.filter(question => records[question.id]?.wrong).map(question => ({ exam, question, record: records[question.id] })));
  const completed = entries.filter(entry => entry.record.reviewed).length;
  const normalizedQuery = query.replace(/\s/g, "").toLowerCase();
  const filtered = entries.filter(({ exam, question, record }) => {
    const text = `${exam.year}년${exam.round}회실기${question.number}번${question.promptMarkdown}`.replace(/\s/g, "").toLowerCase();
    return (!examId || examId === exam.id)
      && (status === "전체" || (status === "복습 완료" ? record.reviewed : !record.reviewed))
      && text.includes(normalizedQuery);
  });
  const isFiltered = Boolean(examId || query || status !== "전체");

  function resetFilters() {
    setExamId("");
    setStatus("전체");
    setQuery("");
  }

  return <>
    {error && <p className={studyStyles.storageError} role="alert">{error}</p>}
    <section className={styles.summary} aria-label={mode === "review" ? "실기 복습 현황" : "실기 오답 현황"}>
      {[{ label: "전체 오답", value: entries.length, note: "틀렸다고 표시한 실기 문제" }, { label: "학습 필요", value: entries.length - completed, note: "다시 풀어볼 나의 오답" }, { label: "복습 완료", value: completed, note: "다시 풀고 맞았다고 표시한 문제" }].map(item => <article key={item.label}><div><p>{item.label}</p><strong>{ready ? item.value : "—"}<span>문제</span></strong><small>{item.note}</small></div></article>)}
    </section>
    <aside className={styles.guide}><span aria-hidden="true">✧</span><div><strong>{mode === "review" ? "다시 풀어보고, 내 실력으로 만들어보세요." : "내가 틀린 문제에서, 다음 학습을 시작해요."}</strong><p>{mode === "review" ? "복습 시작을 누르면 새 답안으로 도전할 수 있어요. 맞았다고 채점하면 복습 완료로 기록됩니다." : "실기 기출에서 ‘틀렸어요’를 선택한 문제가 모입니다. 정답과 해설을 확인하고 복습 메뉴에서 다시 도전해보세요."}</p></div></aside>
    <section aria-labelledby="practical-notebook-title">
      <div className={styles.sectionHeading}><div><h2 id="practical-notebook-title">{mode === "review" ? "다시 풀어볼 실기 문제" : "나의 실기 오답 문제"} <span>{entries.length}</span></h2><p>회차별로 살펴보고, 부족했던 개념을 하나씩 채워보세요.</p></div><Link className={studyStyles.backLink} href={mode === "review" ? "/wrong-answers" : "/review"}>{mode === "review" ? "오답노트 보기 →" : "복습하러 가기 →"}</Link></div>
      <div className={styles.filterArea}>
        <div className={styles.tabs} role="group" aria-label="실기 학습 상태">{(["전체", "학습 필요", "복습 완료"] as const).map(item => <button key={item} aria-pressed={status === item} onClick={() => setStatus(item)}>{item}</button>)}</div>
        <div className={styles.filterRow}>
          <label className={styles.subjectFilter}>회차<select value={examId} onChange={event => setExamId(event.target.value)}><option value="">전체 회차</option>{exams.map(exam => <option key={exam.id} value={exam.id}>{exam.year}년 {exam.round}회 실기</option>)}</select></label>
          <label className={styles.search}><span aria-hidden="true">⌕</span><input type="search" aria-label="실기 오답 검색" placeholder="문제, 연도 또는 회차 검색" value={query} onChange={event => setQuery(event.target.value)} /></label>
        </div>
      </div>
      <div className={styles.results}><p role="status">{ready ? <>총 <strong>{filtered.length}</strong>개의 문제 · 복습 완료 {completed}개</> : "학습 기록을 불러오고 있어요."}</p><button disabled={!isFiltered} onClick={resetFilters}>↻ 필터 초기화</button></div>
      <div className={studyStyles.questionList}>{filtered.map(({ exam, question, record }) => <div key={question.id}>
        <p className={studyStyles.sourceHeading}><Link href={`/past-exams/${exam.id}#${question.id}`}>{exam.year}년 {exam.round}회 실기 · {question.number}번 ↗</Link><span>{record.reviewed ? "✓ 복습 완료" : "학습 필요"}</span></p>
        {mode === "review" ? <ReviewEntry examId={exam.id} question={question} record={record} /> : <PracticalQuestionCard examId={exam.id} question={question} />}
      </div>)}</div>
      {ready && !filtered.length && <div className={styles.empty}>
        <h3>{entries.length ? "조건에 맞는 문제가 없습니다" : "아직 저장된 실기 오답이 없습니다"}</h3>
        <p>{entries.length ? "다른 회차나 학습 상태를 선택해보세요." : "기출문제를 풀고 ‘틀렸어요’를 선택하면 이곳에서 이어서 공부할 수 있어요."}</p>
        {isFiltered ? <button onClick={resetFilters}>전체 문제 보기</button> : <Link className={studyStyles.emptyLink} href="/past-exams">기출문제 풀러 가기 →</Link>}
      </div>}
    </section>
  </>;
}

function ReviewEntry({ examId, question, record }: { examId: string; question: PracticalQuestion; record: QuestionRecord }) {
  const [started, setStarted] = useState(false);
  if (started || record.grade === null) return <PracticalQuestionCard examId={examId} question={question} />;

  return <article className={styles.card} aria-labelledby={`${question.id}-preview`}>
    <div className={studyStyles.questionHeading}><h3 id={`${question.id}-preview`}>Q{String(question.number).padStart(2, "0")}</h3><span className={styles.subjectTag}>실기 복습</span></div>
    <StudyMarkdown content={question.promptMarkdown} />
    <div className={studyStyles.actions}><span>{record.reviewed ? "복습을 완료한 문제도 다시 도전할 수 있어요." : "새 답안을 작성하고, 정답과 비교해보세요."}</span><button className={styles.outlineButton} type="button" onClick={() => { retryQuestion(question.id); setStarted(true); }}>{record.reviewed ? "다시 복습하기" : "복습 시작"} ↗</button></div>
  </article>;
}
