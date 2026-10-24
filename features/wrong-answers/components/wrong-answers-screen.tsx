import { wrongAnswers } from "../data/wrong-answers";
import { WrongAnswerNotebook } from "./wrong-answer-notebook";
import styles from "../wrong-answers.module.css";

export function WrongAnswersScreen() {
  return <main className={styles.page}><div className={styles.container}>
    <header className={styles.header}><div><p className={styles.eyebrow}>EVERY MISTAKE IS A STEP FORWARD</p><h1>오답노트<span>.</span></h1><p className={styles.description}>틀렸던 문제를 돌아보며, 부족한 부분을 확실한 실력으로.</p></div><span className={styles.examBadge}><span />정보처리기사 필기</span></header>
    <WrongAnswerNotebook answers={wrongAnswers} />
    <p className={styles.notice}>ⓘ 직접 작성한 예시 문제를 사용하는 화면 미리보기입니다. 이해 완료 상태는 새로고침 시 초기화됩니다.</p>
  </div></main>;
}
