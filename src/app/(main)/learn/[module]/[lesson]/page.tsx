import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireEnrollment } from "@/lib/access";
import { courseLessons, findLesson, maskPhone, videoKeyFor } from "@/lib/courseContent";
import { getSignedVideoUrl } from "@/lib/videoStorage";
import LessonPlayer from "./LessonPlayer";

interface LessonPageProps {
  params: Promise<{ module: string; lesson: string }>;
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { module, lesson } = await params;
  const found = findLesson(module, Number.parseInt(lesson, 10));
  return {
    title: found ? `${found.lesson.title} | My Course` : "My Course | Creators College",
    robots: { index: false, follow: false },
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { module, lesson } = await params;
  const { enrollment } = await requireEnrollment();

  const found = findLesson(module, Number.parseInt(lesson, 10));
  if (!found) notFound();

  const videoUrl = await getSignedVideoUrl(
    videoKeyFor(found.lesson.moduleNumber, found.lesson.lessonIndex)
  );
  const moduleLessonCount = courseLessons.filter(
    (item) => item.moduleNumber === found.lesson.moduleNumber
  ).length;

  return (
    <LessonPlayer
      lesson={{
        id: found.lesson.id,
        title: found.lesson.title,
        moduleNumber: found.lesson.moduleNumber,
        moduleTitle: found.lesson.moduleTitle,
        sectionTitle: found.lesson.sectionTitle,
        lessonIndex: found.lesson.lessonIndex,
      }}
      videoUrl={videoUrl}
      orderId={enrollment.order_id}
      watermark={maskPhone(enrollment.phone)}
      previous={found.previous ? { href: found.previous.href, title: found.previous.title } : null}
      next={found.next ? { href: found.next.href, title: found.next.title } : null}
      totalLessons={courseLessons.length}
      moduleLessonCount={moduleLessonCount}
    />
  );
}
