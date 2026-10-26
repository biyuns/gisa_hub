import roundOne from "./practical-2026-1.json";
import roundTwo from "./practical-2026-2.json";
import type { PracticalExam } from "../types";

export const practicalExams: readonly PracticalExam[] = [roundTwo, roundOne];

export function getPracticalExam(id: string) {
  return practicalExams.find(exam => exam.id === id);
}
