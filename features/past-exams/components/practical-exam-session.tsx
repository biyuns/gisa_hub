"use client";

import Link from "next/link";
import type { PracticalExam } from "../types";
import { useStudyRecords, rememberPosition } from "@/features/study-records/use-study-records";
import { PracticalQuestionCard } from "./practical-question-card";
import styles from "../practical-exam.module.css";
import sharedStyles from "@/features/wrong-answers/wrong-answers.module.css";

export function PracticalExamSession({ exam }: { exam: PracticalExam }) {
  const { records, positions, ready, error } = useStudyRecords();
  const graded = exam.questions.filter(question => records[question.id]?.grade);
  const correct = graded.filter(question => records[question.id].grade === "correct").length;
  const lastQuestion = exam.questions.find(question => question.id === positions[exam.id]);

  return <>
    {error && <p className={styles.storageError} role="alert">{error}</p>}
    <section className={sharedStyles.summary} aria-label="회차 학습 현황">
      {[{ label: "채점 완료", value: graded.length, note: `전체 ${exam.questions.length}문항` }, { label: "정답", value: correct, note: "직접 채점한 결과" }, { label: "다시 학습", value: graded.length - correct, note: "오답노트에서 이어서 복습" }].map(item => <article key={item.label}><div><p>{item.label}</p><strong>{ready ? item.value : "—"}<span>문제</span></strong><small>{item.note}</small></div></article>)}
    </section>
    <div className={styles.sessionProgress}>
      <p role="status">{ready ? `${exam.questions.length}문제 중 ${graded.length}문제 채점 완료` : "저장된 답안을 불러오고 있어요."}</p>
      {ready && lastQuestion && <a href={`#${lastQuestion.id}`}>마지막으로 보던 {lastQuestion.number}번 이어 풀기 →</a>}
      <Link href={`/past-exams/${exam.id}/results`}>회차별 결과 보기 →</Link>
    </div>
    <progress className={styles.progress} value={graded.length} max={exam.questions.length || 1} aria-label="채점 진행도" />
    <nav className={styles.questionNavigation} aria-label="문항 바로가기">{exam.questions.map(question => {
      const record = records[question.id];
      const label = record?.grade === "correct" ? "정답" : record?.grade === "incorrect" ? "오답" : record?.answer.trim() ? "작성 중" : "미응시";
      return <a key={question.id} href={`#${question.id}`} data-grade={record?.grade ?? ""} aria-label={`${question.number}번 ${label}`} onClick={() => rememberPosition(exam.id, question.id)}>{question.number}</a>;
    })}</nav>
    <div className={styles.questionList}>{exam.questions.map(question => <PracticalQuestionCard key={question.id} question={question} examId={exam.id} />)}</div>
    <div className={styles.sessionProgress}><p>{ready && graded.length === exam.questions.length ? "모든 문항을 채점했어요. 결과를 확인해보세요." : "현재까지의 채점 결과를 확인할 수 있어요."}</p><Link className={styles.emptyLink} href={`/past-exams/${exam.id}/results`}>{ready && graded.length === exam.questions.length ? "회차별 결과 보기 →" : "중간 결과 보기 →"}</Link></div>
  </>;
}
