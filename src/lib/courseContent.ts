import { contentCreationModules, type CourseModule } from "@/data/contentCreationCourse";

export interface LessonSummary {
  id: string;
  moduleNumber: string;
  moduleTitle: string;
  sectionTitle?: string;
  lessonIndex: number;
  title: string;
  href: string;
}

export interface ModuleSectionSummary {
  title: string;
  lessons: LessonSummary[];
}

export interface ModuleSummary {
  number: string;
  title: string;
  lessons: LessonSummary[];
  sections?: ModuleSectionSummary[];
}

const DEFAULT_VIDEO_PREFIX = "courses/content-creation";

function videoPrefix() {
  return (process.env.B2_VIDEO_PREFIX || DEFAULT_VIDEO_PREFIX).replace(/^\/+|\/+$/g, "");
}

export function videoKeyFor(moduleNumber: string, lessonIndex: number) {
  return `${videoPrefix()}/module-${moduleNumber}/lesson-${String(lessonIndex).padStart(3, "0")}.mp4`;
}

function lessonSummary(
  moduleNumber: string,
  moduleTitle: string,
  title: string,
  lessonIndex: number,
  sectionTitle?: string
): LessonSummary {
  return {
    id: `${moduleNumber}-${lessonIndex}`,
    moduleNumber,
    moduleTitle,
    sectionTitle,
    lessonIndex,
    title: title.replace(/^Lesson\s+\d+\s*:\s*/i, ""),
    href: `/learn/${moduleNumber}/${lessonIndex}`,
  };
}

function moduleEntries(courseModule: CourseModule) {
  if (courseModule.sections?.length) {
    return courseModule.sections.flatMap((section) =>
      section.lessons.map((title) => ({ title, sectionTitle: section.title }))
    );
  }
  return courseModule.lessons.map((title) => ({ title, sectionTitle: undefined }));
}

export const courseModules: ModuleSummary[] = contentCreationModules.map((courseModule) => {
  const entries = moduleEntries(courseModule);

  if (courseModule.sections?.length) {
    let lessonIndex = 0;
    const sections = courseModule.sections.map((section) => ({
      title: section.title,
      lessons: section.lessons.map((title) =>
        lessonSummary(courseModule.number, courseModule.title, title, ++lessonIndex, section.title)
      ),
    }));

    return {
      number: courseModule.number,
      title: courseModule.title,
      lessons: sections.flatMap((section) => section.lessons),
      sections,
    };
  }

  return {
    number: courseModule.number,
    title: courseModule.title,
    lessons: entries.map((entry, index) =>
      lessonSummary(courseModule.number, courseModule.title, entry.title, index + 1)
    ),
  };
});

export const courseLessons: LessonSummary[] = courseModules.flatMap((courseModule) => courseModule.lessons);

export function findLesson(moduleNumber: string, lessonIndex: number) {
  const courseModule = contentCreationModules.find((item) => item.number === moduleNumber);
  if (!courseModule) return null;
  const entries = moduleEntries(courseModule);
  if (!Number.isInteger(lessonIndex) || lessonIndex < 1 || lessonIndex > entries.length) {
    return null;
  }

  const entry = entries[lessonIndex - 1];
  const lesson = lessonSummary(
    courseModule.number,
    courseModule.title,
    entry.title,
    lessonIndex,
    entry.sectionTitle
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
