"use client";

import { useSyncExternalStore } from "react";

export type Grade = "correct" | "incorrect";
export type QuestionRecord = {
  answer: string;
  revealed: boolean;
  grade: Grade | null;
  wrong: boolean;
  reviewed: boolean;
  previousAnswer: string;
};
type SavedState = {
  version: 1;
  records: Record<string, QuestionRecord>;
  positions: Record<string, string>;
};
type Snapshot = SavedState & { ready: boolean; error: string };

const storageKey = "gisa-hub:practical-study:v1";
const emptyState: SavedState = { version: 1, records: {}, positions: {} };
const serverSnapshot: Snapshot = { ...emptyState, ready: false, error: "" };
export const emptyRecord: QuestionRecord = {
  answer: "", revealed: false, grade: null, wrong: false, reviewed: false, previousAnswer: "",
};
let snapshot = serverSnapshot;
const listeners = new Set<() => void>();

function decode(value: string | null): SavedState {
  if (!value) return { ...emptyState, records: {}, positions: {} };
  const parsed: unknown = JSON.parse(value);
  if (!parsed || typeof parsed !== "object" || !("version" in parsed) || parsed.version !== 1
    || !("records" in parsed) || !parsed.records || typeof parsed.records !== "object"
    || !("positions" in parsed) || !parsed.positions || typeof parsed.positions !== "object") {
    throw new Error("Invalid study records");
  }
  const records: Record<string, QuestionRecord> = {};
  for (const [id, item] of Object.entries(parsed.records)) {
    if (!item || typeof item !== "object") continue;
    const record = item as Partial<QuestionRecord>;
    if (typeof record.answer !== "string" || typeof record.revealed !== "boolean"
      || (record.grade !== null && record.grade !== "correct" && record.grade !== "incorrect")
      || typeof record.wrong !== "boolean" || typeof record.reviewed !== "boolean") continue;
    records[id] = { ...emptyRecord, ...record, previousAnswer: typeof record.previousAnswer === "string" ? record.previousAnswer : "" } as QuestionRecord;
  }
  const positions = Object.fromEntries(Object.entries(parsed.positions).filter((entry): entry is [string, string] => typeof entry[1] === "string"));
  return { version: 1, records, positions };
}

function emit() {
  listeners.forEach(listener => listener());
}

function loadRecords() {
  try {
    snapshot = { ...decode(window.localStorage.getItem(storageKey)), ready: true, error: "" };
  } catch {
    snapshot = { ...snapshot, ready: true, error: "저장된 학습 기록을 읽을 수 없습니다. 현재 화면에서 작성한 내용은 유지됩니다." };
  }
  emit();
}

function onStorage(event: StorageEvent) {
  if (event.key === storageKey || event.key === null) loadRecords();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    window.addEventListener("storage", onStorage);
    // Re-read when returning to a screen, including after edits in another tab.
    loadRecords();
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size) window.removeEventListener("storage", onStorage);
  };
}

function updateState(change: (state: SavedState) => SavedState) {
  if (!snapshot.ready) return;
  let base: SavedState = snapshot;
  try {
    // A previous failed write remains in memory until the next successful write.
    if (!snapshot.error) base = decode(window.localStorage.getItem(storageKey));
  } catch { /* Keep the in-memory state if storage is unavailable. */ }
  const next = change(base);
  let error = "";
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  } catch {
    error = "브라우저에 기록을 저장하지 못했습니다. 새로고침하면 이번 변경 내용이 사라질 수 있습니다.";
  }
  snapshot = { ...next, ready: true, error };
  emit();
}

function changeRecord(id: string, change: (record: QuestionRecord) => QuestionRecord) {
  updateState(state => ({ ...state, records: { ...state.records, [id]: change(state.records[id] ?? emptyRecord) } }));
}

export function saveAnswer(id: string, answer: string) {
  changeRecord(id, record => ({ ...record, answer, grade: null, reviewed: false, revealed: false }));
}

export function revealAnswer(id: string, revealed: boolean) {
  changeRecord(id, record => ({ ...record, revealed }));
}

export function gradeAnswer(id: string, grade: Grade) {
  changeRecord(id, record => ({ ...record, grade, revealed: true, wrong: record.wrong || grade === "incorrect", reviewed: record.wrong && grade === "correct" }));
}

export function retryQuestion(id: string) {
  changeRecord(id, record => ({ ...record, previousAnswer: record.answer || record.previousAnswer, answer: "", revealed: false, grade: null, reviewed: false }));
}

export function rememberPosition(examId: string, questionId: string) {
  if (snapshot.positions[examId] === questionId) return;
  updateState(state => ({ ...state, positions: { ...state.positions, [examId]: questionId } }));
}

export function useStudyRecords() {
  return useSyncExternalStore(subscribe, () => snapshot, () => serverSnapshot);
}
