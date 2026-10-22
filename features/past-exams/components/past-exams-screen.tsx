import { pastExams } from "../data/exams";
import { ExamCatalog } from "./exam-catalog";
import styles from "../past-exams.module.css";

export function PastExamsScreen() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}><div><p className={styles.eyebrow}>PRACTICE MAKES PROGRESS</p><h1>기출 모의고사<span>.</span></h1><p className={styles.description}>기출문제로 출제 흐름을 익히고, 합격에 한 걸음 더 가까이.</p></div><span className={styles.subjectBadge}><span />정보처리기사 필기</span></header>
        <aside className={styles.guide} aria-label="모의고사 안내"><div className={styles.guideIcon} aria-hidden="true">✧</div><div><strong>실전 감각은, 기출에서부터.</strong><p>5개 과목, 100문항을 실제 시험 시간에 맞춰 연습해보세요.</p></div><span className={styles.guideLabel}>차근차근, 나만의 속도로</span></aside>
        <ExamCatalog exams={pastExams} />
        <p className={styles.notice}>ⓘ 현재 목록은 화면 확인용 예시 데이터입니다. 실제 문제 풀이와 응시 기록 저장은 추후 제공됩니다.</p>
      </div>
    </main>
  );
}
