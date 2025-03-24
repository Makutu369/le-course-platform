
import  StudentsTable  from "../../../(components)/admin/students-table"
import { Suspense } from "react"
import { TableSkeleton } from "../../../(components)/admin/table-skeleton"

const CourseUsersPage = async ({ params }: { params: { courseId?: string } }) => {
  const { courseId } = await params;

  if (!courseId) {
    return <div>Error: Course ID is missing.</div>;
  }


  return (
    <div className="flex min-h-screen w-full flex-col">
  
    <main className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Student Progress Dashboard</h2>
      </div>
      <div className="space-y-4"> 
        <Suspense fallback={<TableSkeleton />}>
          <StudentsTable courseId= {courseId} />
        </Suspense>
      </div>
    </main>
  </div>
  );
};

export default CourseUsersPage;