export const dynamic = 'force-dynamic';

import { getCourses } from "@/lib/queries/queries";
import CourseCard from "../(components)/course-video-section/course-card";
import { getSession } from "@/lib/session";

export default async function Page() {
  const [session, courses] = await Promise.all([getSession(), getCourses()]);
  return (
    <div className=" h-[cal(100vh-65px)] flex flex-col gap-y-5 px-6 sm:px-9 lg:px-12 w-full bg-background">
      <div className="w-full flex justify-between items-center"></div>
      <div className="flex-1 py-6">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-3">
          {courses.map((course) => (
            <div key={course.id}>
              <CourseCard {...course} userId={session?.userId} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
