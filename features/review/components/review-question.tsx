"use client";

import { useState } from "react";
import type { WrongAnswer } from "@/features/wrong-answers/types";
import styles from "@/features/wrong-answers/wrong-answers.module.css";
import reviewStyles from "../review.module.css";

type Props = {
  answer: WrongAnswer;
  submittedIndex: number | undefined;
  onSubmit: (index: number) => void;
  onRetry: () => void;
};

export function ReviewQuestion({ answer, submittedIndex, onSubmit, onRetry }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const submitted = submittedIndex !== undefined;
  const isCorrect = submittedIndex === answer.correctIndex;
  const questionId = `review-${answer.id}`;

  return <article className={styles.card} aria-labelledby={questionId}>
    <div className={styles.questionRow}>
      <span className={styles.questionNumber}>Q{answer.questionNumber}</span>
      <div className={styles.questionContent}>
        <div className={styles.labels}><span className={styles.subjectTag}>{answer.subject}</span><span>{answer.source}</span><span className={submitted ? styles.completedTag : styles.pendingTag}>{submitted ? "✓ 복습 완료" : "복습 전"}</span></div>
        <h3 id={questionId}>{answer.question}</h3>
      </div>
    </div>
    <form className={reviewStyles.questionBody} onSubmit={event => {
      event.preventDefault();
      if (!submitted && selectedIndex !== undefined) onSubmit(selectedIndex);
    }}>
      <fieldset className={reviewStyles.choices} disabled={submitted}>
        <legend className={reviewStyles.legend}>정답이라고 생각하는 보기를 선택하세요.</legend>
        {answer.options.map((option, index) => {
          const checked = (submitted ? submittedIndex : selectedIndex) === index;
          const resultClass = submitted && index === answer.correctIndex ? reviewStyles.correct : submitted && checked ? reviewStyles.incorrect : "";
          return <label key={index} className={`${reviewStyles.choice} ${resultClass}`}>
            <input type="radio" name={questionId} value={index} checked={checked} onChange={() => setSelectedIndex(index)} />
            <span className={reviewStyles.choiceNumber}>{index + 1}</span><span>{option}</span>
            {submitted && index === answer.correctIndex && <strong>정답</strong>}
            {submitted && checked && !isCorrect && <strong>내 선택</strong>}
          </label>;
        })}
      </fieldset>
      {submitted && <div className={styles.explanation} role="status">
        <h4>{isCorrect ? "✓ 정답이에요. 잘 기억하고 있네요!" : "다시 한번 개념을 정리해볼까요?"}</h4>
        <p>{answer.explanation}</p>
      </div>}
      <div className={reviewStyles.actions}>
        <span>{submitted ? "해설을 읽고, 필요하면 다시 도전해보세요." : "답을 확인하면 정답과 해설이 표시돼요."}</span>
        {submitted ? <button type="button" className={styles.outlineButton} onClick={() => { setSelectedIndex(undefined); onRetry(); }}>↻ 다시 풀기</button> : <button type="submit" className={reviewStyles.submitButton} disabled={selectedIndex === undefined}>정답 확인 <span aria-hidden="true">↗</span></button>}
      </div>
    </form>
  </article>;
}
