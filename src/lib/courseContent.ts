import { contentCreationModules } from "@/data/contentCreationCourse";

export interface LessonSummary {
  id: string;
  moduleNumber: string;
  moduleTitle: string;
  lessonIndex: number;
  title: string;
  href: string;
}

export interface ModuleSummary {
  number: string;
  title: string;
  lessons: LessonSummary[];
}

const DEFAULT_VIDEO_PREFIX = "courses/content-creation";

function videoPrefix() {
  return (process.env.B2_VIDEO_PREFIX || DEFAULT_VIDEO_PREFIX).replace(/^\/+|\/+$/g, "");
}

export function videoKeyFor(moduleNumber: string, lessonIndex: number) {
  return `${videoPrefix()}/module-${moduleNumber}/lesson-${String(lessonIndex).padStart(2, "0")}.mp4`;
}

function lessonSummary(moduleNumber: string, moduleTitle: string, title: string, lessonIndex: number): LessonSummary {
  return {
    id: `${moduleNumber}-${lessonIndex}`,
    moduleNumber,
    moduleTitle,
    lessonIndex,
    title: title.replace(/^Lesson\s+\d+\s*:\s*/i, ""),
    href: `/learn/${moduleNumber}/${lessonIndex}`,
  };
}

export const courseModules: ModuleSummary[] = contentCreationModules.map((courseModule) => ({
  number: courseModule.number,
  title: courseModule.title,
  lessons: courseModule.lessons.map((title, index) =>
    lessonSummary(courseModule.number, courseModule.title, title, index + 1)
  ),
}));

export const courseLessons: LessonSummary[] = courseModules.flatMap((courseModule) => courseModule.lessons);

export function findLesson(moduleNumber: string, lessonIndex: number) {
  const courseModule = contentCreationModules.find((item) => item.number === moduleNumber);
  if (!courseModule) return null;
  if (!Number.isInteger(lessonIndex) || lessonIndex < 1 || lessonIndex > courseModule.lessons.length) {
    return null;
  }

  const lesson = lessonSummary(
    courseModule.number,
    courseModule.title,
    courseModule.lessons[lessonIndex - 1],
    lessonIndex
  );
  const position = courseLessons.findIndex((item) => item.id === lesson.id);

  return {
    lesson,
    previous: position > 0 ? courseLessons[position - 1] : null,
    next: position >= 0 && position < courseLessons.length - 1 ? courseLessons[position + 1] : null,
  };
}

export function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return "Student";
  return `•••••${digits.slice(-4)}`;
}
