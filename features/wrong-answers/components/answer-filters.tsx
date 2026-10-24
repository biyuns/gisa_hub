import type { AnswerFilters as Filters } from "../types";
import styles from "../wrong-answers.module.css";

type Props = { value: Filters; subjects: readonly string[]; onChange: (value: Filters) => void };

export function AnswerFilters({ value, subjects, onChange }: Props) {
  return <div className={styles.filterArea}>
    <div className={styles.tabs} role="group" aria-label="학습 상태">{(["전체", "학습 필요", "이해 완료"] as const).map(status =>
      <button key={status} aria-pressed={value.status === status} onClick={() => onChange({ ...value, status })}>{status}</button>)}
    </div>
    <div className={styles.filterRow}>
      <label className={styles.subjectFilter}>과목<select value={value.subject} onChange={event => onChange({ ...value, subject: event.target.value })}><option value="">전체 과목</option>{subjects.map(subject => <option key={subject}>{subject}</option>)}</select></label>
      <label className={styles.search}><span aria-hidden="true">⌕</span><input type="search" aria-label="오답 문제 검색" placeholder="문제, 과목 또는 모의고사명 검색" value={value.query} onChange={event => onChange({ ...value, query: event.target.value })} /></label>
    </div>
  </div>;
}
