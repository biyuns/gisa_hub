import type { PastExam } from "../types";
import { practicalExams } from "./practical-exams";

// 2026년 실기는 회차별 임시 데이터이며, 이전 연도 필기는 예시 목록입니다.
export const pastExams: PastExam[] = [
  ...practicalExams.map(exam => ({
    id: exam.id,
    year: exam.year,
    round: exam.round,
    questionCount: exam.questions.length,
    examType: "practical" as const,
  })),
  ...[2025, 2024, 2023].flatMap(year =>
    [3, 2, 1].map(round => ({
      id: `${year}-${round}`,
      year,
      round,
      questionCount: 100,
      durationMinutes: 150,
    })),
  ),
];

export const examSubjects = [
  "소프트웨어 설계",
  "소프트웨어 개발",
  "데이터베이스 구축",
  "프로그래밍 언어 활용",
  "정보시스템 구축 관리",
];
