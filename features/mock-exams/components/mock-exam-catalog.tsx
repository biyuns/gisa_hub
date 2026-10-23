"use client";

import { useState } from "react";
import type { MockExam, MockExamFilters } from "../types";
import { filterMockExams } from "../lib/filter-mock-exams";
import { MockExamFilters as FilterControls } from "./mock-exam-filters";
import { MockExamCard } from "./mock-exam-card";
import styles from "../mock-exams.module.css";

const initialFilters: MockExamFilters = { category: "전체", subject: "", query: "" };

export function MockExamCatalog({ exams, subjects }: { exams: readonly MockExam[]; subjects: readonly string[] }) {
  const [filters, setFilters] = useState(initialFilters);
  const filtered = filterMockExams(exams, filters);
  const counts = {
    전체: exams.length,
    종합: exams.filter(exam => exam.category === "종합").length,
    과목별: exams.filter(exam => exam.category === "과목별").length,
  };
  const isFiltered = filters.category !== "전체" || Boolean(filters.subject || filters.query);

  return <section aria-labelledby="mock-catalog-title">
    <div className={styles.catalogHeading}><div><h2 id="mock-catalog-title">모의고사 둘러보기 <span>{exams.length}</span></h2><p>전체 실력을 점검하거나, 필요한 과목에 집중해보세요.</p></div><span className={styles.sampleBadge}>예시 시험 목록</span></div>
    <FilterControls value={filters} subjects={subjects} counts={counts} onChange={setFilters} />
    <div className={styles.results}><p role="status">총 <strong>{filtered.length}</strong>개의 모의고사</p><button disabled={!isFiltered} onClick={() => setFilters(initialFilters)}>↻ 필터 초기화</button></div>
    {filtered.length > 0 ? <div className={styles.grid}>{filtered.map(exam => <MockExamCard key={exam.id} exam={exam} />)}</div> : <div className={styles.empty}><h3>검색 결과가 없습니다</h3><p>검색어나 선택한 과목을 변경해보세요.</p><button onClick={() => setFilters(initialFilters)}>전체 목록 보기</button></div>}
  </section>;
}
