import { notFound } from "next/navigation";
import { LessonScreen } from "@/components/lesson-screen";
import { getLesson, lessons } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const lesson = getLesson((await params).lessonId);
  if (!lesson) notFound();
  return <LessonScreen lesson={lesson} />;
}
