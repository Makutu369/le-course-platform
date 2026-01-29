"use server";
import { getCourses } from "@/lib/queries/queries";

import CourseCard from "../(components)/course-video-section/course-card";
import { getSession } from "@/lib/session";

export default async function Page() {
  const [session, courses] = await Promise.all([getSession(), getCourses()]);

  return (
    <div className="min-h-screen flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 w-full bg-background py-8">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Available Courses</h1>
      </div>
      <div className="flex-1">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
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
