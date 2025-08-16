"use client";

import { useEffect, useState } from "react";
import { getCourses } from "@/lib/queries/queries";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const AdminPanel = () => {
  const [courses, setCourses] = useState<
    { imageUrl: string; title: string; description?: string; id: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesData = await getCourses();

        setCourses(
          coursesData.map((course) => ({
            id: course.id,
            title: course.title,
            description: course.description ?? "",
            imageUrl: course.imageUrl ?? "",
          }))
        );
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-9">
      {courses.map((course) => (
        <Link href={`/admin/course/${course.id}`} key={course.id}>
          <div key={course.id}>
            <Card className="overflow-hidden hover:cursor-pointer sm:size-80 transition-all duration-300 hover:shadow-lg">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={
                    course.imageUrl || "/placeholder.svg?height=480&width=640"
                  }
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  priority
                />
              </div>
              <CardContent className="p-4">
                <div>
                  <h3 className="font-bold text-lg line-clamp-2 mb-1 ">
                    {course.title}
                  </h3>
                </div>
                {course.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {course.description}
                  </p>
                )}
                <p className="text-sm text-muted-foreground mb-1">
                  Love Economy Church
                </p>
              </CardContent>
            </Card>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AdminPanel;
