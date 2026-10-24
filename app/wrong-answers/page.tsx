import type { Metadata } from "next";
import { WrongAnswersScreen } from "@/features/wrong-answers/components/wrong-answers-screen";

export const metadata: Metadata = { title: "오답노트 | Gisa Hub" };

export default function WrongAnswersPage() {
  return <WrongAnswersScreen />;
}
