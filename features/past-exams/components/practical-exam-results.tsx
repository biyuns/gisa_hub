"use client";

import Link from "next/link";
import { useState } from "react";
import type { PracticalExam } from "../types";
import { useStudyRecords, type QuestionRecord } from "@/features/study-records/use-study-records";
import { StudyMarkdown } from "./study-markdown";
import pageStyles from "../past-exams.module.css";
import studyStyles from "../practical-exam.module.css";
import styles from "../practical-exam-results.module.css";

const statuses = ["전체", "정답", "오답", "채점 대기", "미응시"] as const;
type Status = (typeof statuses)[number];

function questionStatus(record: QuestionRecord | undefined): Exclude<Status, "전체"> {
  if (record?.grade === "correct") return "정답";
  if (record?.grade === "incorrect") return "오답";
  return record?.answer.trim() ? "채점 대기" : "미응시";
}

export function PracticalExamResults({ exam }: { exam: PracticalExam }) {
  const { records, ready, error } = useStudyRecords();
  const [filter, setFilter] = useState<Status>("전체");
  const entries = exam.questions.map(question => ({ question, record: records[question.id], status: questionStatus(records[question.id]) }));
  const counts = {
    전체: entries.length,
    정답: entries.filter(entry => entry.status === "정답").length,
    오답: entries.filter(entry => entry.status === "오답").length,
    "채점 대기": entries.filter(entry => entry.status === "채점 대기").length,
    미응시: entries.filter(entry => entry.status === "미응시").length,
  };
  const graded = counts.정답 + counts.오답;
  const accuracy = graded ? Math.round(counts.정답 / graded * 100) : null;
  const complete = entries.length > 0 && graded === entries.length;
  const nextQuestion = entries.find(entry => entry.status === "채점 대기") ?? entries.find(entry => entry.status === "미응시");
  const filtered = entries.filter(entry => filter === "전체" || entry.status === filter);
  const examHref = `/past-exams/${exam.id}`;

  return <main className={pageStyles.page}><div className={pageStyles.container}>
    <Link className={studyStyles.backLink} href="/past-exams">← 기출 목록으로</Link>
    <header className={pageStyles.header}>
      <div><p className={pageStyles.eyebrow}>LOOK BACK, MOVE FORWARD</p><h1>회차별 결과<span>.</span></h1><p className={pageStyles.description}>{exam.year}년 제{exam.round}회 정보처리기사 실기 · 전체 {entries.length}문항</p></div>
      <span className={pageStyles.subjectBadge}><span />직접 채점 결과</span>
    </header>
    {error && <p className={studyStyles.storageError} role="alert">{error}</p>}
    {!ready ? <div className={styles.loading} role="status">저장된 학습 결과를 불러오고 있어요.</div> : <>
      <section className={styles.overview} aria-labelledby="result-overview-title">
        <div className={styles.overviewText}>
          <span className={styles.completionBadge}>{complete ? "✓ 전 문항 채점 완료" : graded ? "학습 진행 중" : "채점 전"}</span>
          <h2 id="result-overview-title">{complete ? "한 회차를 끝까지 풀어냈어요." : graded ? "지금까지 쌓은 실력을 확인해보세요." : "첫 문제부터 차근차근 시작해보세요."}</h2>
          <p>{complete ? "틀린 문제는 오답노트에서 확인하고, 복습으로 다시 다져보세요." : `채점 대기 ${counts["채점 대기"]}문항, 미응시 ${counts.미응시}문항이 남아 있어요.`}</p>
          <p className={styles.accuracyBasis}>정답률은 채점한 {graded}문항 중 정답 {counts.정답}문항을 기준으로 계산합니다.</p>
        </div>
        <div className={styles.accuracy}><span>현재 정답률</span><strong>{accuracy === null ? "—" : accuracy}<small>{accuracy === null ? "" : "%"}</small></strong><span>{accuracy === null ? "직접 채점하면 표시돼요" : `${counts.정답} / ${graded}문항 정답`}</span></div>
      </section>
      <section className={styles.summary} aria-label="회차별 문항 현황">{(["정답", "오답", "채점 대기", "미응시"] as const).map(status => <article key={status} data-status={status}><p>{status}</p><strong>{counts[status]}<span>문항</span></strong><small>{status === "정답" ? "맞았다고 표시한 문제" : status === "오답" ? "틀렸다고 표시한 문제" : status === "채점 대기" ? "답안 작성 후 채점하지 않은 문제" : "답안과 채점 기록이 없는 문제"}</small></article>)}</section>
      <div className={studyStyles.sessionProgress}><p role="status">총 {entries.length}문항 중 {graded}문항 채점 완료</p><span>{entries.length ? Math.round(graded / entries.length * 100) : 0}% 진행</span></div>
      <progress className={studyStyles.progress} aria-label="회차 채점 진행도" value={graded} max={entries.length || 1} />
      <div className={styles.actions}>
        <Link className={styles.primaryLink} href={nextQuestion ? `${examHref}#${nextQuestion.question.id}` : examHref}>{nextQuestion ? `${nextQuestion.question.number}번 ${nextQuestion.status === "채점 대기" ? "채점하러 가기" : "이어 풀기"} →` : "전체 문제 다시 보기 →"}</Link>
        <Link className={styles.secondaryLink} href="/wrong-answers">오답노트 보기</Link>
        <Link className={styles.secondaryLink} href="/review">복습하러 가기</Link>
      </div>
      <section aria-labelledby="question-results-title">
        <div className={styles.listHeading}><h2 id="question-results-title">문항별 결과</h2><p>작성한 답안과 채점 결과를 확인하고, 필요한 문제로 돌아가세요.</p></div>
        <div className={styles.filters} role="group" aria-label="문항 결과 필터">{statuses.map(status => <button type="button" key={status} aria-pressed={filter === status} onClick={() => setFilter(status)}>{status} <span>{counts[status]}</span></button>)}</div>
        <p className={styles.resultCount} role="status">{filter} · {filtered.length}문항</p>
        <div className={styles.resultList}>{filtered.map(({ question, record, status }) => <article key={question.id} className={styles.resultCard} aria-labelledby={`${question.id}-result-title`}>
          <div className={styles.cardHeader}><span className={styles.questionNumber}>Q{String(question.number).padStart(2, "0")}</span><span className={styles.statusBadge} data-status={status}>{status}</span><Link href={`${examHref}#${question.id}`}>{status === "채점 대기" ? "채점하기" : status === "미응시" ? "문제 풀기" : "문제로 이동"} ↗</Link></div>
          <h3 id={`${question.id}-result-title`}>{question.promptMarkdown.split("\n")[0]}</h3>
          <div className={styles.myAnswer}><h4>내 답안</h4><p>{record?.answer.trim() ? record.answer : "작성한 답안이 없습니다."}</p></div>
          <details className={styles.details}><summary>문제 {record?.grade ? "· 정답 · 해설" : "본문"} 보기</summary>
            <div className={styles.detailContent}><StudyMarkdown content={question.promptMarkdown} />
              {record?.grade && <><section className={studyStyles.correctAnswer}><h4>정답</h4><StudyMarkdown content={question.answerMarkdown} /></section><section className={styles.explanation}><h4>풀이 및 복습</h4>{question.explanationMarkdown ? <StudyMarkdown content={question.explanationMarkdown} /> : <p>별도 해설이 작성되어 있지 않습니다.</p>}</section></>}
            </div>
          </details>
        </article>)}</div>
        {!filtered.length && <div className={pageStyles.empty}><h3>{filter} 문항이 없습니다</h3><p>다른 결과를 선택해 문항을 확인해보세요.</p><button type="button" onClick={() => setFilter("전체")}>전체 문항 보기</button></div>}
      </section>
      <p className={pageStyles.notice}>ⓘ 현재 브라우저에 저장된 문항별 최신 채점 결과입니다. 문제를 다시 풀거나 채점을 바꾸면 결과도 갱신됩니다.</p>
    </>}
  </div></main>;
}
