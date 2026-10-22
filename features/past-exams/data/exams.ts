import type { PastExam } from "../types";

// 화면 구성을 위한 예시 데이터입니다. 실제 기출문제는 아직 연결되지 않았습니다.
export const pastExams: PastExam[] = [2025, 2024, 2023].flatMap(year =>
  [3, 2, 1].map(round => ({
    id: `${year}-${round}`,
    year,
    round,
    questionCount: 100,
    durationMinutes: 150,
  })),
);

export const examSubjects = [
  "소프트웨어 설계",
  "소프트웨어 개발",
  "데이터베이스 구축",
  "프로그래밍 언어 활용",
  "정보시스템 구축 관리",
];
