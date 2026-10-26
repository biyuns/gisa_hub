"use client";

import { useState } from "react";
import Link from "next/link";
import type { PastExam } from "../types";
import { examSubjects } from "../data/exams";
import styles from "../past-exams.module.css";

export function ExamCard({ exam }: { exam: PastExam }) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = `exam-details-${exam.id}`;
  const practical = exam.examType === "practical";

  return (
    <article className={styles.card}>
      <div className={styles.cardTop}><span className={styles.examTag}>정기 기사 · {practical ? "실기" : "필기 예시"}</span><span className={styles.round}>{String(exam.round).padStart(2, "0")}회</span></div>
      <div className={styles.documentIcon} aria-hidden="true"><svg width="25" height="28" viewBox="0 0 25 28" fill="none"><path d="M6 2h9l5 5v18H5V2h1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M14 2v6h6M9 13h7M9 17h7M9 21h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
      <h3>{exam.year}년 제{exam.round}회</h3>
      <p className={styles.cardSubtitle}>{practical ? `${exam.year}년 ${exam.round}회 실기 임시 데이터` : "정보처리기사 기출 모의고사"}</p>
      <div className={styles.examMeta}><span>{practical ? "답안 직접 입력" : `${examSubjects.length}과목`}</span><span>{exam.questionCount}문항</span>{exam.durationMinutes && <span>{exam.durationMinutes}분</span>}</div>
      {practical ? <Link className={styles.cardButton} style={{ textDecoration: "none" }} href={`/past-exams/${exam.id}`}>문제 풀어보기<span aria-hidden="true">↗</span></Link> : <button className={styles.cardButton} aria-expanded={expanded} aria-controls={detailsId} onClick={() => setExpanded(!expanded)}>시험 구성 {expanded ? "접기" : "보기"}<span aria-hidden="true">{expanded ? "−" : "↗"}</span></button>}
      {expanded && <div id={detailsId} className={styles.details}><strong>과목별 20문항</strong><ul>{examSubjects.map(subject => <li key={subject}>{subject}</li>)}</ul><p>문제 풀이 기능은 준비 중입니다.</p></div>}
    </article>
  );
}
