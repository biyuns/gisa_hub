import styles from "../wrong-answers.module.css";

export function AnswerSummary({ total, completed }: { total: number; completed: number }) {
  const items = [
    { label: "전체 오답", value: total, note: "다시 살펴볼 나의 학습 기록", icon: "▤" },
    { label: "학습 필요", value: total - completed, note: "헷갈린 개념을 차근차근", icon: "↻" },
    { label: "이해 완료", value: completed, note: "오늘 쌓아가는 확실한 이해", icon: "✓" },
  ];
  return <section className={styles.summary} aria-label="오답 학습 현황">{items.map(item =>
    <article key={item.label}><div><p>{item.label}</p><strong>{item.value}<span>문제</span></strong><small>{item.note}</small></div><span className={styles.summaryIcon} aria-hidden="true">{item.icon}</span></article>)}
  </section>;
}
