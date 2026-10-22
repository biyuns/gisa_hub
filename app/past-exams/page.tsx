import type { Metadata } from "next";
import { PastExamsScreen } from "@/features/past-exams/components/past-exams-screen";

export const metadata: Metadata = { title: "기출 모의고사 | Gisa Hub" };

export default function PastExamsPage() {
  return <PastExamsScreen />;
}
