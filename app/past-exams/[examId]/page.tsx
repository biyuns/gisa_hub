import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPracticalExam, practicalExams } from "@/features/past-exams/data/practical-exams";
import { PracticalExamScreen } from "@/features/past-exams/components/practical-exam-screen";

type Props = { params: Promise<{ examId: string }> };

export function generateStaticParams() {
  return practicalExams.map(exam => ({ examId: exam.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { examId } = await params;
  const exam = getPracticalExam(examId);
  return { title: exam ? `${exam.title} | Gisa Hub` : "기출문제 | Gisa Hub" };
}

export default async function PracticalExamPage({ params }: Props) {
  const { examId } = await params;
  const exam = getPracticalExam(examId);
  if (!exam) notFound();
  return <PracticalExamScreen exam={exam} />;
}
