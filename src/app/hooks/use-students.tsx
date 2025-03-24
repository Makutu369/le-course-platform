// "use client"
// import { getAllUsersProgressInCourse } from "@/lib/queries/queries"
// import { useEffect, useState } from "react"
// import { useRouter, usePathname } from "next/navigation"

// type Student = {
//   progress: number;
//   userId: string;
//   firstName: string | null;
//   lastName: string | null;
//   email: string;
//   completedSections: number;
//   completed: boolean;
// }

// type UseStudentsProps = {
//   page: number
//   sort: string
//   order: string
//   filter: string
//   courseId: string
//   limit: number
// }

// export function useStudents({ page, sort, order, filter,courseId  }: UseStudentsProps) {
//   const [students, setStudents] = useState<Student[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const router = useRouter()
//   const pathname = usePathname()

//   useEffect(() => {
//     const fetchStudents = async () => {
//       setIsLoading(true)
//       try {
//         const enrolledUsersWithProgress = await getAllUsersProgressInCourse(courseId);
//         setStudents(enrolledUsersWithProgress)
//       } catch (error) {
//         console.error("Error fetching students:", error)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     // Update URL with search params
//     const params = new URLSearchParams()
//     if (page !== 1) params.set("page", page.toString())
//     if (sort !== "name") params.set("sort", sort)
//     if (order !== "asc") params.set("order", order)

//     const url = `${pathname}?${params.toString()}`
//     router.push(url, { scroll: false })

//     fetchStudents()
//   }, [page, sort, order, filter, pathname, router])

//   return { students, isLoading }
// }

"use client";
import { getAllUsersProgressInCourse } from "@/lib/queries/queries";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type Student = {
  progress: number;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  completedSections: number;
  completed: boolean;
};

type UseStudentsProps = {
  page: number;
  sort: string;
  order: string;
  filter: string;
  courseId: string;
  limit: number;
};

export function useStudents({ page, sort, order, filter, courseId, limit }: UseStudentsProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [totalStudents, setTotalStudents] = useState(0); // ✅ Track total students
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        const enrolledUsersWithProgress = await getAllUsersProgressInCourse(courseId);

        // ✅ Count all students before filtering
        setTotalStudents(enrolledUsersWithProgress.length);
        console.log(totalStudents)

        // ✅ Filtering
        const filteredStudents = enrolledUsersWithProgress.filter((student: Student) =>
          student.firstName?.toLowerCase().includes(filter.toLowerCase()) ||
          student.lastName?.toLowerCase().includes(filter.toLowerCase()) ||
          student.email.toLowerCase().includes(filter.toLowerCase())
        );

        // ✅ Sorting
        filteredStudents.sort((a, b) => {
          let fieldA = a[sort as keyof Student];
          let fieldB = b[sort as keyof Student];

          if (typeof fieldA === "string") fieldA = fieldA.toLowerCase();
          if (typeof fieldB === "string") fieldB = fieldB.toLowerCase();

          if (fieldA == null || fieldB == null) return 0;
          if (fieldA < fieldB) return order === "asc" ? -1 : 1;
          if (fieldA > fieldB) return order === "asc" ? 1 : -1;
          return 0;
        });

        // ✅ Pagination (Show `limit` students per page)
        const startIndex = (page - 1) * limit;
        const paginatedStudents = filteredStudents.slice(startIndex, startIndex + limit);

        setStudents(paginatedStudents);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // ✅ Update URL with search params
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    params.set("limit", String(limit));
    params.set("sort", sort);
    params.set("order", order);
    params.set("filter", filter);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    fetchStudents();
  }, [page, sort, order, filter, limit, pathname, router, searchParams, courseId]);

  return { students, isLoading, totalStudents }; // ✅ Return total students
}




