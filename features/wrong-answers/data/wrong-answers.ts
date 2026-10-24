import type { WrongAnswer } from "../types";

// 화면 확인용으로 직접 작성한 예시 문제이며 실제 기출문제가 아닙니다.
export const wrongAnswers: readonly WrongAnswer[] = [
  {
    id: "design-srp", subject: "소프트웨어 설계", source: "종합 모의고사 01", questionNumber: 12,
    question: "객체지향 설계의 단일 책임 원칙(SRP)에 대한 설명으로 가장 적절한 것은?",
    options: ["클래스는 가능한 많은 기능을 담당해야 한다.", "클래스가 변경되어야 하는 이유는 하나여야 한다.", "모든 클래스는 같은 인터페이스를 구현해야 한다.", "상속을 통해 모든 코드 중복을 제거해야 한다."],
    selectedIndex: 0, correctIndex: 1,
    explanation: "단일 책임 원칙은 클래스가 하나의 책임을 갖도록 하는 원칙입니다. 서로 다른 이유로 변경되는 기능을 분리하면 변경의 영향을 줄이고 응집도를 높일 수 있습니다.",
  },
  {
    id: "development-boundary", subject: "소프트웨어 개발", source: "종합 모의고사 01", questionNumber: 31,
    question: "입력값이 1부터 100까지의 정수일 때, 경계값 분석에 적합한 테스트 데이터는?",
    options: ["25, 50, 75", "10, 20, 30", "0, 1, 2, 99, 100, 101", "50만 반복하여 테스트"],
    selectedIndex: 0, correctIndex: 2,
    explanation: "경계값 분석은 입력 범위의 경계와 경계 바로 안팎의 값을 확인합니다. 이 경우 최솟값 1과 최댓값 100 및 각각의 인접 값이 테스트 대상입니다.",
  },
  {
    id: "database-normalization", subject: "데이터베이스 구축", source: "종합 모의고사 02", questionNumber: 45,
    question: "관계형 데이터베이스에서 정규화를 수행하는 주요 목적은?",
    options: ["모든 테이블을 하나로 합치기 위해", "중복을 줄이고 삽입·삭제·갱신 이상을 방지하기 위해", "기본키를 없애기 위해", "모든 조회를 항상 빠르게 만들기 위해"],
    selectedIndex: 3, correctIndex: 1,
    explanation: "정규화는 함수적 종속 관계에 따라 테이블을 분해하여 데이터 중복과 이상 현상을 줄입니다. 정규화가 모든 조회의 성능 향상을 보장하는 것은 아닙니다.",
  },
  {
    id: "programming-thread", subject: "프로그래밍 언어 활용", source: "종합 모의고사 02", questionNumber: 68,
    question: "같은 프로세스에 속한 스레드의 자원에 대한 설명으로 옳은 것은?",
    options: ["각 스레드는 코드와 힙을 모두 독립적으로 갖는다.", "모든 스레드는 하나의 스택만 공유한다.", "코드·데이터·힙은 공유하고 스택은 각각 갖는다.", "스레드는 프로세스 자원에 접근할 수 없다."],
    selectedIndex: 1, correctIndex: 2,
    explanation: "같은 프로세스의 스레드는 코드, 데이터, 힙 영역을 공유합니다. 각 스레드는 독립적인 실행 흐름을 위해 자신의 스택과 레지스터 상태를 가집니다.",
  },
  {
    id: "system-least-privilege", subject: "정보시스템 구축 관리", source: "종합 모의고사 03", questionNumber: 87,
    question: "정보보안에서 최소 권한 원칙에 해당하는 것은?",
    options: ["모든 사용자에게 관리자 권한을 부여한다.", "업무 수행에 필요한 최소한의 권한만 부여한다.", "권한을 부여한 뒤에는 변경하지 않는다.", "접근 통제를 편의를 위해 생략한다."],
    selectedIndex: 2, correctIndex: 1,
    explanation: "최소 권한 원칙은 업무에 필요한 범위의 권한만 부여하는 것입니다. 불필요한 접근을 제한하여 실수나 계정 탈취로 인한 피해 범위를 줄입니다.",
  },
];
