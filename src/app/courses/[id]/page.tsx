"use server";
import { db } from "@/db";
import {
  filterSections,
  findUsersCourse,
  getUsersCourseSections,
} from "@/lib/queries/queries";
import { CourseSidebar } from "@/app/(components)/course-video-section/course-sidebar";
import VideoPlayer from "@/app/(components)/course-video-section/video-player";

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
    <div className="w-full h-screen flex flex-col lg:px-9 py-9 ">
      <div className="text-3xl py-3">{usersCourse?.course.title}</div>
      <div className="lg:h-[80%] flex w-full flex-col lg:flex-row">
        {currentSection && <VideoPlayer currentSection={currentSection} />}
        <CourseSidebar course={usersCourseSections} courseId={courseId} />
      </div>
    </div>
  );
}

export default Page;
