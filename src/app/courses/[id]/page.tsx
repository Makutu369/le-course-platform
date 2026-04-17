
export const dynamic = 'force-dynamic';

import { db } from "@/db";
import {
  filterSections,
  findUsersCourse,
  getUsersCourseSections,
} from "@/lib/queries/queries";
import { CourseSidebar } from "@/app/(components)/course-video-section/course-sidebar";
import HLSVideoPlayer from "@/app/(components)/course-video-section/hls-video-player";
import CourseCompletedPage from "../(components)/course-complete-card";

export async function generateStaticParams() {
  const courses = await db.query.courses.findMany();
  const courseIds = courses.map((course) => ({ id: course.id }));
  return courseIds;
}

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: courseId } = await params;
  const [usersCourse, currentSection, usersCourseSections] = await Promise.all([
    findUsersCourse(courseId),
    filterSections(courseId),
    getUsersCourseSections({ courseId }),
  ]);
  if (usersCourse && !currentSection && usersCourseSections)
    return <CourseCompletedPage />;

  return (
    <div className="w-full h-[calc(100vh-64px)] flex flex-col">
      <div className="px-4 sm:px-6 lg:px-9 py-4 border-b-2 border-border bg-background">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-1">Now Watching</p>
        <h1 className="text-lg md:text-xl lg:text-2xl font-black tracking-tight">
          {usersCourse?.course.title}
        </h1>
      </div>
      <div className="flex-1 flex w-full flex-col lg:flex-row overflow-hidden">
        {currentSection && (
          <HLSVideoPlayer section={currentSection} courseId={courseId} />
        )}

        <CourseSidebar
          course={usersCourseSections}
          courseId={courseId}
          currentSectionId={currentSection?.id}
        />
      </div>
    </div>
  );
}

export default Page;
