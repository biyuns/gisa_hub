import Link from "next/link";
import type { PracticalExam } from "../types";
import { PracticalExamSession } from "./practical-exam-session";
import styles from "../past-exams.module.css";
import practicalStyles from "../practical-exam.module.css";

export function PracticalExamScreen({ exam }: { exam: PracticalExam }) {
  return <main className={styles.page}>
    <div className={styles.container}>
      <Link className={practicalStyles.backLink} href="/past-exams">← 기출 목록으로</Link>
      <header className={styles.header}>
        <div><p className={styles.eyebrow}>PRACTICE MAKES PROGRESS</p><h1>{exam.year}년 제{exam.round}회 실기<span>.</span></h1><p className={styles.description}>총 {exam.questions.length}문항 · 답을 직접 작성하고, 정답과 비교해보세요.</p></div>
        <span className={styles.subjectBadge}><span />정보처리기사 실기</span>
      </header>
      <aside className={styles.guide}>
        <div className={styles.guideIcon} aria-hidden="true">✧</div>
        <div><strong>먼저 생각하고, 답을 확인해보세요.</strong><p>여러 답은 번호나 줄바꿈으로 구분하세요. 정답을 확인하고 직접 채점하면 오답과 복습 기록이 이 브라우저에 저장됩니다.</p></div>
      </aside>
      <PracticalExamSession exam={exam} />
      <p className={styles.notice}>ⓘ {exam.year}년 {exam.round}회 실기 임시 데이터입니다.</p>
    </div>
  </main>;
}
