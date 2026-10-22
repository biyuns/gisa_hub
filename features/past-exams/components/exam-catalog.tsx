"use client";

import { useState } from "react";
import type { ExamFilters as Filters, PastExam } from "../types";
import { filterExams } from "../lib/filter-exams";
import { ExamFilters } from "./exam-filters";
import { ExamCard } from "./exam-card";
import styles from "../past-exams.module.css";

const initialFilters: Filters = { year: "", round: "", query: "" };

export function ExamCatalog({ exams }: { exams: readonly PastExam[] }) {
  const [filters, setFilters] = useState(initialFilters);
  const filteredExams = filterExams(exams, filters);
  const years = [...new Set(exams.map(exam => exam.year))].sort((a, b) => b - a);

  return (
    <section aria-labelledby="catalog-title" className={styles.catalog}>
      <div className={styles.catalogHeading}><div><h2 id="catalog-title">기출 모의고사 목록 <span>{exams.length}</span></h2><p>풀고 싶은 연도와 회차를 선택해보세요.</p></div><span className={styles.sortLabel}>최신 연도순 ↓</span></div>
      <ExamFilters years={years} value={filters} onChange={setFilters} />
      <div className={styles.results}><p role="status">총 <strong>{filteredExams.length}</strong>개의 모의고사</p><button onClick={() => setFilters(initialFilters)} disabled={!filters.year && !filters.round && !filters.query}>↻ 필터 초기화</button></div>
      {filteredExams.length ? <div className={styles.grid}>{filteredExams.map(exam => <ExamCard key={exam.id} exam={exam} />)}</div> : <div className={styles.empty}><span aria-hidden="true">⌕</span><h3>검색 결과가 없습니다</h3><p>다른 검색어를 입력하거나 필터를 변경해보세요.</p><button onClick={() => setFilters(initialFilters)}>전체 목록 보기</button></div>}
    </section>
  );
}
