"use client";

import type { PracticalQuestion } from "../types";
import { emptyRecord, gradeAnswer, rememberPosition, retryQuestion, revealAnswer, saveAnswer, useStudyRecords } from "@/features/study-records/use-study-records";
import { StudyMarkdown } from "./study-markdown";
import sharedStyles from "@/features/wrong-answers/wrong-answers.module.css";
import styles from "../practical-exam.module.css";

export function PracticalQuestionCard({ question, examId }: { question: PracticalQuestion; examId: string }) {
  const { records, ready } = useStudyRecords();
  const record = records[question.id] ?? emptyRecord;
  const { answer, revealed, grade } = record;
  const answerId = `${question.id}-answer`;

  return <article id={question.id} className={`${sharedStyles.card} ${styles.question}`} aria-labelledby={`${question.id}-title`} onFocusCapture={() => rememberPosition(examId, question.id)}>
    <div className={styles.questionHeading}><h2 id={`${question.id}-title`}>Q{String(question.number).padStart(2, "0")}</h2><span className={sharedStyles.subjectTag}>실기 기출</span><span className={grade === "correct" ? styles.correctStatus : styles.pendingStatus}>{!ready ? "기록 불러오는 중" : grade === "correct" ? "✓ 정답" : grade === "incorrect" ? "다시 학습" : answer.trim() ? "작성 중" : "미응시"}</span></div>
    {record.previousAnswer && <details className={styles.previousAnswer}><summary>이전 답안 보기</summary><p>{record.previousAnswer}</p></details>}
    <StudyMarkdown content={question.promptMarkdown} />
    <label className={styles.answerLabel} htmlFor={`${question.id}-input`}>내 답안</label>
    <textarea id={`${question.id}-input`} className={styles.answerInput} rows={3} value={answer} disabled={!ready} onChange={event => saveAnswer(question.id, event.target.value)} placeholder="답안을 입력하세요. 여러 답은 번호 또는 줄바꿈으로 구분할 수 있어요." />
    <div className={styles.actions}><span>정답과 비교한 뒤 직접 채점해주세요.</span><button className={sharedStyles.outlineButton} disabled={!ready} type="button" aria-expanded={revealed} aria-controls={answerId} onClick={() => revealAnswer(question.id, !revealed)}>정답·해설 {revealed ? "접기" : "보기"}<span aria-hidden="true">{revealed ? "−" : "+"}</span></button></div>
    {revealed && <div id={answerId} className={styles.answerPanel}>
      <section className={styles.correctAnswer} aria-label="정답"><h3>정답</h3><StudyMarkdown content={question.answerMarkdown} /></section>
      <section className={sharedStyles.explanation} aria-label="해설"><h3>풀이 및 복습</h3>{question.explanationMarkdown ? <StudyMarkdown content={question.explanationMarkdown} /> : <p>별도 해설이 작성되어 있지 않습니다.</p>}</section>
      <div className={styles.gradeActions} role="group" aria-label={`문제 ${question.number} 직접 채점`}>
        <button type="button" disabled={!ready} aria-pressed={grade === "correct"} onClick={() => gradeAnswer(question.id, "correct")}>✓ 맞았어요</button>
        <button type="button" disabled={!ready} aria-pressed={grade === "incorrect"} onClick={() => gradeAnswer(question.id, "incorrect")}>↻ 틀렸어요</button>
      </div>
      <p className={styles.feedback} role="status">{grade === "incorrect" ? "오답노트에 저장했어요. 복습 메뉴에서 다시 풀어보세요." : grade === "correct" && record.wrong ? "복습 완료로 기록했어요. 오답노트에서 다시 확인할 수 있어요." : grade === "correct" ? "정답으로 기록했어요." : "답을 쓰지 못했어도 ‘틀렸어요’를 선택해 복습할 수 있어요."}</p>
    </div>}
    {ready && (answer || grade || revealed) && <button type="button" className={styles.retryButton} onClick={() => retryQuestion(question.id)}>↻ 답안 비우고 다시 풀기</button>}
  </article>;
}
