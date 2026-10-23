import { mockExams, mockExamSubjects } from "../data/mock-exams";
import { MockExamCatalog } from "./mock-exam-catalog";
import styles from "../mock-exams.module.css";

export function MockExamsScreen() {
  return <main className={styles.page}><div className={styles.container}>
    <header className={styles.header}><div><p className={styles.eyebrow}>BUILD YOUR CONFIDENCE</p><h1>전체 모의고사<span>.</span></h1><p className={styles.description}>실전처럼 풀어보고, 나에게 필요한 연습을 찾아보세요.</p></div><span className={styles.examBadge}><span />정보처리기사 필기</span></header>
    <aside className={styles.guide} aria-label="모의고사 안내"><span className={styles.guideIcon} aria-hidden="true">✧</span><div><strong>한 번의 도전이, 더 단단한 실력으로.</strong><p>종합 모의고사로 실전을 준비하고, 과목별 모의고사로 기본기를 채워보세요.</p></div></aside>
    <MockExamCatalog exams={mockExams} subjects={mockExamSubjects} />
    <p className={styles.notice}>ⓘ 화면 확인용 예시 데이터입니다. 실제 문제 풀이와 응시 기록 저장은 추후 제공됩니다.</p>
  </div></main>;
}
