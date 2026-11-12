export const PROGRESS_EVENT = "cc-progress-change";

export function progressKey(orderId: string) {
  return `cc_learn_progress_${orderId}`;
}

export function readProgress(orderId: string): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(progressKey(orderId));
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

export function isLessonComplete(orderId: string, lessonId: string) {
  return Boolean(readProgress(orderId)[lessonId]);
}

export function markLessonComplete(orderId: string, lessonId: string) {
  setLessonComplete(orderId, lessonId, true);
}

export function setLessonComplete(orderId: string, lessonId: string, complete: boolean) {
  if (typeof window === "undefined") return;
  const progress = readProgress(orderId);
  if (complete) {
    progress[lessonId] = true;
  } else {
    delete progress[lessonId];
  }
  window.localStorage.setItem(progressKey(orderId), JSON.stringify(progress));
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

export function setLessonsComplete(orderId: string, lessonIds: string[], complete: boolean) {
  if (typeof window === "undefined") return;
  const progress = readProgress(orderId);
  for (const lessonId of lessonIds) {
    if (complete) {
      progress[lessonId] = true;
    } else {
      delete progress[lessonId];
    }
  }
  window.localStorage.setItem(progressKey(orderId), JSON.stringify(progress));
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}
