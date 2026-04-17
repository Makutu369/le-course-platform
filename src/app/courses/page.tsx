"use server";
import { getCourses } from "@/lib/queries/queries";

import CourseCard from "../(components)/course-video-section/course-card";
import { getSession } from "@/lib/session";

export default async function Page() {
  const [session, courses] = await Promise.all([getSession(), getCourses()]);

  return (
    <div className="min-h-screen flex flex-col gap-y-10 px-4 sm:px-6 lg:px-12 w-full bg-background py-12">
      <div className="w-full flex flex-col gap-3 pb-8 border-b-2 border-border">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Browse</p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">Available Courses</h1>
        <p className="text-muted-foreground/70 max-w-2xl text-sm">
          Deepen your spiritual understanding with our curated selection of transformative courses.
        </p>
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
