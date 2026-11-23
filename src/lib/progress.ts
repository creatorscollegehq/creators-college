export const PROGRESS_EVENT = "cc-progress-change";

export function progressKey(orderId: string) {
  return `cc_learn_progress_${orderId}`;
}

function writeProgress(orderId: string, progress: Record<string, boolean>) {
  try {
    window.localStorage.setItem(progressKey(orderId), JSON.stringify(progress));
  } catch {
    // storage can be unavailable in private mode; the server copy still wins
  }
  window.dispatchEvent(new Event(PROGRESS_EVENT));
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

/** Replaces the local cache with the authoritative server copy. */
export function seedProgress(orderId: string, completedLessonIds: string[]) {
  if (typeof window === "undefined") return;
  const progress: Record<string, boolean> = {};
  for (const lessonId of completedLessonIds) {
    if (lessonId) progress[lessonId] = true;
  }
  writeProgress(orderId, progress);
}

export function isLessonComplete(orderId: string, lessonId: string) {
  return Boolean(readProgress(orderId)[lessonId]);
}

function postProgress(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  void fetch("/api/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // the local cache keeps the UI responsive; the next visit resyncs
  });
}

export function setLessonComplete(orderId: string, lessonId: string, complete: boolean) {
  if (typeof window === "undefined") return;
  const progress = readProgress(orderId);
  if (complete) {
    progress[lessonId] = true;
  } else {
    delete progress[lessonId];
  }
  writeProgress(orderId, progress);
}

export function markLessonComplete(orderId: string, lessonId: string) {
  setLessonComplete(orderId, lessonId, true);
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
  writeProgress(orderId, progress);
}

interface ProgressLesson {
  id: string;
  moduleNumber: string;
  lessonIndex: number;
}

export function syncLessonProgress(
  orderId: string,
  lesson: ProgressLesson,
  complete: boolean
) {
  setLessonComplete(orderId, lesson.id, complete);
  postProgress({
    lessonId: lesson.id,
    moduleNumber: lesson.moduleNumber,
    lessonIndex: lesson.lessonIndex,
    watchedSeconds: 0,
    completed: complete,
  });
}

export function syncLessonsProgress(
  orderId: string,
  lessons: ProgressLesson[],
  complete: boolean
) {
  setLessonsComplete(
    orderId,
    lessons.map((lesson) => lesson.id),
    complete
  );
  for (const lesson of lessons) {
    postProgress({
      lessonId: lesson.id,
      moduleNumber: lesson.moduleNumber,
      lessonIndex: lesson.lessonIndex,
      watchedSeconds: 0,
      completed: complete,
    });
  }
}
