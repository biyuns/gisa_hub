import type { Metadata } from "next";
import { MockExamsScreen } from "@/features/mock-exams/components/mock-exams-screen";

export const metadata: Metadata = { title: "전체 모의고사 | Gisa Hub" };

export default function MockExamsPage() {
  return <MockExamsScreen />;
}
