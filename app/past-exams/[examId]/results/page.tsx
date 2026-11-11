import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPracticalExam, practicalExams } from "@/features/past-exams/data/practical-exams";
import { PracticalExamResults } from "@/features/past-exams/components/practical-exam-results";

type Props = { params: Promise<{ examId: string }> };

export function generateStaticParams() {
  return practicalExams.map(exam => ({ examId: exam.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { examId } = await params;
  const exam = getPracticalExam(examId);
  return { title: exam ? `${exam.year}년 ${exam.round}회 실기 결과 | Gisa Hub` : "학습 결과 | Gisa Hub" };
}

export default async function PracticalExamResultsPage({ params }: Props) {
  const { examId } = await params;
  const exam = getPracticalExam(examId);
  if (!exam) notFound();
  return <PracticalExamResults exam={exam} />;
}
