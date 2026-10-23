import type { MockExam } from "../types";

export const mockExamSubjects = [
  "소프트웨어 설계",
  "소프트웨어 개발",
  "데이터베이스 구축",
  "프로그래밍 언어 활용",
  "정보시스템 구축 관리",
] as const;

// 화면 확인을 위한 예시 목록. 실제 시험 및 학습 기록과는 연결되지 않습니다.
export const mockExams: readonly MockExam[] = [
  ...[1, 2, 3].map(round => ({
    id: `comprehensive-${round}`,
    title: `실전 종합 모의고사 ${String(round).padStart(2, "0")}`,
    description: "전 과목을 한 번에, 실제 시험처럼 연습해요.",
    category: "종합" as const,
    subjects: mockExamSubjects,
    questionCount: 100,
    durationMinutes: 150,
  })),
  ...mockExamSubjects.map((subject, index) => ({
    id: `subject-${index + 1}`,
    title: subject,
    description: "한 과목에 집중하며 기본기를 다져보세요.",
    category: "과목별" as const,
    subjects: [subject],
    questionCount: 20,
    durationMinutes: 30,
  })),
];
