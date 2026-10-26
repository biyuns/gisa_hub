"use client";

import { useState } from "react";
import type { PracticalQuestion } from "../types";
import { StudyMarkdown } from "./study-markdown";
import sharedStyles from "@/features/wrong-answers/wrong-answers.module.css";
import styles from "../practical-exam.module.css";

export function PracticalQuestionCard({ question }: { question: PracticalQuestion }) {
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const answerId = `${question.id}-answer`;

  return <article id={question.id} className={`${sharedStyles.card} ${styles.question}`} aria-labelledby={`${question.id}-title`}>
    <div className={styles.questionHeading}><h2 id={`${question.id}-title`}>Q{String(question.number).padStart(2, "0")}</h2><span className={sharedStyles.subjectTag}>실기 기출</span></div>
    <StudyMarkdown content={question.promptMarkdown} />
    <label className={styles.answerLabel} htmlFor={`${question.id}-input`}>내 답안</label>
    <textarea id={`${question.id}-input`} className={styles.answerInput} rows={3} value={answer} onChange={event => setAnswer(event.target.value)} placeholder="답안을 입력하세요. 여러 답은 번호 또는 줄바꿈으로 구분할 수 있어요." />
    <div className={styles.actions}><span>답안을 작성한 뒤 정답과 비교해보세요.</span><button className={sharedStyles.outlineButton} type="button" aria-expanded={revealed} aria-controls={answerId} onClick={() => setRevealed(previous => !previous)}>정답·해설 {revealed ? "접기" : "보기"}<span aria-hidden="true">{revealed ? "−" : "+"}</span></button></div>
    {revealed && <div id={answerId} className={styles.answerPanel}>
      <section className={styles.correctAnswer} aria-label="정답"><h3>정답</h3><StudyMarkdown content={question.answerMarkdown} /></section>
      <section className={sharedStyles.explanation} aria-label="해설"><h3>풀이 및 복습</h3>{question.explanationMarkdown ? <StudyMarkdown content={question.explanationMarkdown} /> : <p>별도 해설이 작성되어 있지 않습니다.</p>}</section>
    </div>}
  </article>;
}
