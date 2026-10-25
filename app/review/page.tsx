import type { Metadata } from "next";
import { ReviewScreen } from "@/features/review/components/review-screen";

export const metadata: Metadata = { title: "복습 | Gisa Hub" };

export default function ReviewPage() {
  return <ReviewScreen />;
}
