"use server";
import Image from "next/image";
import { getCourses } from "@/lib/queries/queries";
import CourseCard from "../(components)/course-video-section/course-card";
import { getSession } from "@/lib/session";

export default async function Page() {
  const session = await getSession();
  const courses = await getCourses();

  return (
    <div className="h-screen flex flex-col px-4 w-full bg-background">
      <header className="">
        <div className="w-full tracking-tight mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Image src="/logo-black.png" alt="" width={150} height={50} />
          <nav className="hidden gap-6 md:flex"></nav>
        </div>
        <div></div>
      </header>
      <div className="flex-1">
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
