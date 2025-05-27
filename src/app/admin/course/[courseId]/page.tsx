"use server";
import { getAllUsersProgressInCourse } from "@/lib/queries/queries";
import StudentsTable from "../../../(components)/admin/students-table";
import { Suspense } from "react";

async function CourseUsersPage({
  params,
}: {
  params: Promise<{ courseId?: string }>;
}) {
  const { courseId } = await params;
  const students = getAllUsersProgressInCourse(courseId ?? "");
  if (!courseId) {
    return <div>Error: Course ID is missing.</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            Student Progress Dashboard
          </h2>
        </div>
        <div className="space-y-4">
          <Suspense fallback={<div>Loading...</div>}>
            <StudentsTable courseId={courseId} fetchStudents={students} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default CourseUsersPage;
