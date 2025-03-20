"use server";
import { db } from "@/db";
import {
  filterSections,
  findUsersCourse,
  getUsersCourseSections,
} from "@/lib/queries/queries";
import { CourseSidebar } from "@/app/(components)/course-video-section/course-sidebar";
import HLSVideoPlayer from "@/app/(components)/course-video-section/hls-video-player";

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

  return (
    <div className="w-full h-[calc(100vh-64px)]  flex flex-col py-3 ">
      <div className="lg:text-3xl text-xl md:text-2xl lg:text-start text-center lg:px-9 px-3 py-3">
        {usersCourse?.course.title}
      </div>
      <div className="lg:h-[90%] flex w-full flex-col lg:flex-row">
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
