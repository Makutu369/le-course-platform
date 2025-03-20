"use server";
import { db } from "@/db";
import {
  filterSections,
  findUsersCourse,
  getUsersCourseSections,
} from "@/lib/queries/queries";
import { CourseSidebar } from "@/app/(components)/course-video-section/course-sidebar";
import { userSections } from "@/db/schema";
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

  console.log("user", userSections);
  console.log("current section", currentSection?.videoUrl);
  return (
    <div className="w-full h-screen flex flex-col py-9 ">
      <div className="text-3xl lg:px-9 py-3">{usersCourse?.course.title}</div>
      <div className="lg:h-[80%] flex w-full flex-col lg:flex-row">
        {currentSection && (
          <HLSVideoPlayer src={currentSection.videoUrl} courseId={courseId} />
        )}
        <CourseSidebar course={usersCourseSections} courseId={courseId} />
      </div>
    </div>
  );
}

export default Page;
