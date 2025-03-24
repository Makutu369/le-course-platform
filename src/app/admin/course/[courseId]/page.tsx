import { getAllUsersProgressInCourse } from "@/lib/queries/queries"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const CourseUsersPage = async ({ params }: { params: { courseId?: string } }) => {
  const { courseId } = await params; // Ensure `params` is awaited

  if (!courseId) {
    return <div>Error: Course ID is missing.</div>;
  }

  const enrolledUsersWithProgress = await getAllUsersProgressInCourse(courseId);

  return (
    <div className="w-full bg-white py-8 space-y-6">
      <Card className="bg-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold">Course Participants</CardTitle>
              <p className="text-sm text-muted-foreground">Track student progress and completion status</p>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>{enrolledUsersWithProgress.length} Users</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {enrolledUsersWithProgress.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No users enrolled</h3>
              <p className="text-sm text-muted-foreground mt-1">
                There are currently no participants enrolled in this course.
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Progress</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {enrolledUsersWithProgress.map((user) => {
                      const progressValue = user.progress || 0;
                      return (
                        <tr key={user.userId} className="hover:bg-muted/50 transition-colors">
                          <td className="px-4 py-3 text-sm font-medium">
                            {user.firstName} {user.lastName}
                          </td>
                          <td className="px-4 py-3 text-sm">{user.email}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Progress
                                value={progressValue}
                                className="h-2 w-[100px]"
                                indicatorClassName={
                                  progressValue < 30
                                    ? "bg-red-500"
                                    : progressValue < 70
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                }
                              />
                              <span className="text-xs font-medium">{progressValue}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {user.completed ? (
                              <Badge
                                variant="success"
                                className="flex items-center gap-1 bg-green-100 text-green-800 hover:bg-green-100"
                              >
                                <CheckCircle className="h-3.5 w-3.5" />
                                <span>Completed</span>
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="flex items-center gap-1 bg-gray-100 text-gray-800 hover:bg-gray-100"
                              >
                                <XCircle className="h-3.5 w-3.5" />
                                <span>In Progress</span>
                              </Badge>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseUsersPage;