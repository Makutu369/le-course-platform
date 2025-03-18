"use server";
import { db } from "@/db";
import { getCourseSections } from "@/lib/queries/queries";
import { CourseSidebar } from "@/app/(components)/course-video-section/course-sidebar";
import { VideoPlayer } from "@/app/(components)/course-video-section/video-player";

export async function generateStaticParams() {
  const courses = await db.query.courses.findMany();
  const courseIds = courses.map((course) => ({ id: course.id }));
  return courseIds;
}

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: courseId } = await params;
  const course = await getCourseSections({
    courseId,
  });

  return (
    <div className="w-full h-screen px-9 flex">
      <div className="h-[60%] flex w-full gap-x-3">
        <VideoPlayer videoUrl={course?.sections[0].videoUrl ?? ""} />
        <CourseSidebar sections={course?.sections ?? []} courseId={courseId} />
      </div>
    </div>
  );
}

export default Page;
