import type { ExamFilters as Filters } from "../types";
import styles from "../past-exams.module.css";

type Props = {
  years: number[];
  value: Filters;
  onChange: (filters: Filters) => void;
};

export function ExamFilters({ years, value, onChange }: Props) {
  return (
    <div className={styles.filters}>
      <div className={styles.selects}>
        <label>연도<select value={value.year} onChange={event => onChange({ ...value, year: event.target.value })}>
          <option value="">전체 연도</option>
          {years.map(year => <option key={year} value={year}>{year}년</option>)}
        </select></label>
        <label>회차<select value={value.round} onChange={event => onChange({ ...value, round: event.target.value })}>
          <option value="">전체 회차</option>
          {[1, 2, 3].map(round => <option key={round} value={round}>{round}회</option>)}
        </select></label>
      </div>
      <label className={styles.search}><span aria-hidden="true">⌕</span><input type="search" aria-label="기출 모의고사 검색" placeholder="연도, 회차 또는 시험명 검색" value={value.query} onChange={event => onChange({ ...value, query: event.target.value })} /></label>
    </div>
  );
}
