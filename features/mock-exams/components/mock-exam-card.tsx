"use client";

import { useState } from "react";
import type { MockExam } from "../types";
import styles from "../mock-exams.module.css";

export function MockExamCard({ exam }: { exam: MockExam }) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = `mock-exam-${exam.id}`;

  return <article className={styles.card}>
    <div className={styles.cardTop}><span className={exam.category === "종합" ? styles.comprehensiveTag : styles.subjectTag}>{exam.category} 모의고사</span><span className={styles.preview}>미리보기</span></div>
    <div className={exam.category === "종합" ? styles.purpleIcon : styles.greenIcon} aria-hidden="true">
      <svg width="25" height="27" viewBox="0 0 25 27" fill="none"><rect x="4" y="2" width="17" height="23" rx="3" stroke="currentColor" strokeWidth="1.5"/><path d="M9 8h7M9 13h7M9 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
    </div>
    <h3>{exam.title}</h3><p className={styles.cardDescription}>{exam.description}</p>
    <div className={styles.meta}><span>{exam.subjects.length}과목</span><span>{exam.questionCount}문항</span><span>{exam.durationMinutes}분</span></div>
    <button className={styles.cardButton} aria-expanded={expanded} aria-controls={detailsId} onClick={() => setExpanded(!expanded)}>시험 구성 {expanded ? "접기" : "보기"}<span aria-hidden="true">{expanded ? "−" : "↗"}</span></button>
    {expanded && <div className={styles.details} id={detailsId}><strong>과목별 20문항으로 구성돼요</strong><ul>{exam.subjects.map(subject => <li key={subject}>{subject}</li>)}</ul><p>현재는 화면 미리보기입니다. 문제 풀이는 추후 제공됩니다.</p></div>}
  </article>;
}
