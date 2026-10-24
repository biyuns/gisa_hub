"use client";

import { useState } from "react";
import type { WrongAnswer } from "../types";
import styles from "../wrong-answers.module.css";

type Props = { answer: WrongAnswer; completed: boolean; onToggleCompleted: (id: string) => void };

export function WrongAnswerCard({ answer, completed, onToggleCompleted }: Props) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = `answer-${answer.id}`;
  return <article className={styles.card}>
    <div className={styles.questionRow}>
      <span className={styles.questionNumber}>Q{answer.questionNumber}</span>
      <div className={styles.questionContent}><div className={styles.labels}><span className={styles.subjectTag}>{answer.subject}</span><span>{answer.source}</span><span className={completed ? styles.completedTag : styles.pendingTag}>{completed ? "✓ 이해 완료" : "학습 필요"}</span></div><h3>{answer.question}</h3><p className={styles.selectedAnswer}>내가 선택한 답 <span>{answer.selectedIndex + 1}번</span></p></div>
      <button className={styles.outlineButton} aria-expanded={expanded} aria-controls={detailsId} onClick={() => setExpanded(!expanded)}>정답·해설 {expanded ? "접기" : "보기"}<span aria-hidden="true">{expanded ? "−" : "+"}</span></button>
    </div>
    {expanded && <div className={styles.answerPanel} id={detailsId}>
      <ol className={styles.options}>{answer.options.map((option, index) => <li key={option} className={index === answer.correctIndex ? styles.correctOption : index === answer.selectedIndex ? styles.wrongOption : undefined}><span className={styles.optionNumber}>{index + 1}</span><span>{option}</span>{index === answer.correctIndex && <strong>정답</strong>}{index === answer.selectedIndex && <strong>내 선택</strong>}</li>)}</ol>
      <div className={styles.explanation}><h4>해설</h4><p>{answer.explanation}</p></div>
      <button className={styles.completeButton} aria-pressed={completed} onClick={() => onToggleCompleted(answer.id)}>{completed ? "이해 완료 취소" : "✓ 이해 완료로 표시"}</button>
    </div>}
  </article>;
}
