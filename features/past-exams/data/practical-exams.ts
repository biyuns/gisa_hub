import roundOne from "./practical-2026-1.json";
import roundTwo from "./practical-2026-2.json";
import round2025One from "./practical-2025-1.json";
import round2025Two from "./practical-2025-2.json";
import round2025Three from "./practical-2025-3.json";
import type { PracticalExam } from "../types";

export const practicalExams: readonly PracticalExam[] = [
  roundTwo,
  roundOne,
  round2025Three,
  round2025Two,
  round2025One,
];

export function getPracticalExam(id: string) {
  return practicalExams.find(exam => exam.id === id);
}
