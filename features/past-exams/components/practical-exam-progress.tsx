"use client";

import Link from "next/link";
import { useStudyRecords } from "@/features/study-records/use-study-records";
import styles from "../practical-exam.module.css";

export function PracticalExamProgress({ examId, questionCount }: { examId: string; questionCount: number }) {
  const { records, positions, ready } = useStudyRecords();
  const graded = Object.entries(records).filter(([id, record]) => id.startsWith(`${examId}-`) && record.grade);
  const lastId = positions[examId];
  // Only create a continuation link for a question belonging to this exam.
  const number = lastId?.startsWith(`${examId}-`) ? Number(lastId.slice(examId.length + 1)) : 0;
  return <div className={styles.cardProgress}>
    <p>{ready ? `채점 완료 ${graded.length} / ${questionCount}문제` : "학습 기록 불러오는 중"}</p>
    {ready && Number.isInteger(number) && number > 0 && number <= questionCount && <Link href={`/past-exams/${examId}#${lastId}`}>{number}번부터 이어 풀기 →</Link>}
    {ready && graded.length > 0 && <Link href={`/past-exams/${examId}/results`}>회차별 결과 보기 →</Link>}
  </div>;
}
