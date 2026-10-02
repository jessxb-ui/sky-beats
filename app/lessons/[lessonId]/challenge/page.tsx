import { notFound } from "next/navigation";
import { ChallengeScreen } from "@/components/challenge-screen";
import { getLesson, lessons } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return lessons.filter((lesson) => lesson.playable).map((lesson) => ({ lessonId: lesson.id }));
}

export default async function ChallengePage({ params }: { params: Promise<{ lessonId: string }> }) {
  const lesson = getLesson((await params).lessonId);
  if (!lesson?.playable) notFound();
  return <ChallengeScreen lesson={lesson} />;
}
