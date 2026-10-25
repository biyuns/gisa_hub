import { wrongAnswers } from "@/features/wrong-answers/data/wrong-answers";
import { ReviewNotebook } from "./review-notebook";
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
          <span className={styles.examBadge}><span />정보처리기사 필기</span>
        </header>
        <ReviewNotebook answers={wrongAnswers} />
        <p className={styles.notice}>ⓘ 오답노트와 같은 예시 문제로 연습하는 화면입니다. 실제 학습 기록과 연결되지 않으며, 복습 결과는 새로고침 시 초기화됩니다.</p>
      </div>
    </main>
  );
}
