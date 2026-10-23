import type { MockExamFilters as Filters } from "../types";
import styles from "../mock-exams.module.css";

type Props = {
  value: Filters;
  subjects: readonly string[];
  counts: Record<Filters["category"], number>;
  onChange: (value: Filters) => void;
};

export function MockExamFilters({ value, subjects, counts, onChange }: Props) {
  return <div className={styles.filterArea}>
    <div className={styles.categories} role="group" aria-label="모의고사 유형">
      {(["전체", "종합", "과목별"] as const).map(category =>
        <button key={category} aria-pressed={value.category === category} onClick={() => onChange({ ...value, category })}>
          {category === "종합" ? "종합 모의고사" : category === "과목별" ? "과목별 모의고사" : "전체"}<span>{counts[category]}</span>
        </button>)}
    </div>
    <div className={styles.filters}>
      <label className={styles.subjectFilter}>과목
        <select value={value.subject} onChange={event => onChange({ ...value, subject: event.target.value })}>
          <option value="">전체 과목</option>
          {subjects.map(subject => <option key={subject}>{subject}</option>)}
        </select>
      </label>
      <label className={styles.search}><span aria-hidden="true">⌕</span><input type="search" aria-label="모의고사 검색" placeholder="모의고사명 또는 과목 검색" value={value.query} onChange={event => onChange({ ...value, query: event.target.value })} /></label>
    </div>
  </div>;
}
