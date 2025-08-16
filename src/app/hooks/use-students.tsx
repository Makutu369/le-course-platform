import { getAllUsersProgressInCourse } from "@/lib/queries/queries";
import { useState, useEffect } from "react";

export type Student = {
  progress: number;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  completedSections: number;
  completed: boolean;
  courseCompleted: boolean;
  megaCenterName: string | null;
  contactNumber: string | null;
};

type UseStudentsProps = {
  courseId: string;
};

export function useStudents({ courseId }: UseStudentsProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        const enrolledUsersWithProgress = await getAllUsersProgressInCourse(
          courseId
        );
        setStudents(enrolledUsersWithProgress);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [courseId]);
  return { students, isLoading };
}
