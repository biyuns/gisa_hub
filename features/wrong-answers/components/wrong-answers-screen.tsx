import { practicalExams } from "@/features/past-exams/data/practical-exams";
import { PracticalStudyNotebook } from "@/features/study-records/practical-study-notebook";
import styles from "../wrong-answers.module.css";

export function WrongAnswersScreen() {
  return <main className={styles.page}><div className={styles.container}>
    <header className={styles.header}><div><p className={styles.eyebrow}>EVERY MISTAKE IS A STEP FORWARD</p><h1>오답노트<span>.</span></h1><p className={styles.description}>틀렸던 문제를 돌아보며, 부족한 부분을 확실한 실력으로.</p></div><span className={styles.examBadge}><span />정보처리기사 실기</span></header>
    <PracticalStudyNotebook exams={practicalExams} mode="wrong-answers" />
    <p className={styles.notice}>ⓘ 학습 기록은 현재 브라우저에 저장됩니다. 브라우저 데이터를 삭제하면 기록도 삭제됩니다.</p>
  </div></main>;
}
