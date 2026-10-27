import { pastExams } from "../data/exams";
import { practicalExams } from "../data/practical-exams";
import { ExamCatalog } from "./exam-catalog";
import styles from "../past-exams.module.css";

export function PastExamsScreen() {
  const questionCount = practicalExams.reduce((total, exam) => total + exam.questions.length, 0);
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}><div><p className={styles.eyebrow}>PRACTICE MAKES PROGRESS</p><h1>기출 모의고사<span>.</span></h1><p className={styles.description}>기출문제로 출제 흐름을 익히고, 합격에 한 걸음 더 가까이.</p></div><span className={styles.subjectBadge}><span />정보처리기사 필기·실기</span></header>
        <aside className={styles.guide} aria-label="모의고사 안내"><div className={styles.guideIcon} aria-hidden="true">✧</div><div><strong>실전 감각은, 기출에서부터.</strong><p>실기 임시 데이터 {practicalExams.length}개 회차, {questionCount}문항을 풀어보고 정답과 해설을 확인해보세요.</p></div><span className={styles.guideLabel}>차근차근, 나만의 속도로</span></aside>
        <ExamCatalog exams={pastExams} />
        <p className={styles.notice}>ⓘ 실기는 회차별 임시 데이터입니다. 필기는 예시 목록이며, 응시 기록 저장은 아직 지원하지 않습니다.</p>
      </div>
    </main>
  );
}
