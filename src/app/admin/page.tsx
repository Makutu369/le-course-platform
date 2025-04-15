import StudentsTable from "../(components)/admin/students-table";

async function CourseUsersPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            Student Progress Dashboard
          </h2>
        </div>
        <div className="space-y-4">
          <StudentsTable />
        </div>
      </main>
    </div>
  );
}

export default CourseUsersPage;
