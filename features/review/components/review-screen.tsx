import { practicalExams } from "@/features/past-exams/data/practical-exams";
import { PracticalStudyNotebook } from "@/features/study-records/practical-study-notebook";
import styles from "@/features/wrong-answers/wrong-answers.module.css";

export function ReviewScreen() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>MAKE IT STICK, ONE MORE TIME</p>
            <h1>복습<span>.</span></h1>
            <p className={styles.description}>다시 풀어보는 한 문제가, 오래 기억하는 실력이 되도록.</p>
          </div>
          <span className={styles.examBadge}><span />정보처리기사 실기</span>
        </header>
        <PracticalStudyNotebook exams={practicalExams} mode="review" />
        <p className={styles.notice}>ⓘ 복습 결과는 현재 브라우저에 저장됩니다. 여러 기기 간 기록 동기화는 지원하지 않습니다.</p>
      </div>
    </main>
  );
}
