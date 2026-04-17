"use client";

import { useEffect, useState } from "react";
import { getCourses } from "@/lib/queries/queries";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Loading courses...</p>
        </div>
      </div>
    );

  return (
    <div className="p-6 sm:p-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-3 mb-12 pb-8 border-b-2 border-border">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Dashboard</p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">Admin Panel</h1>
        <p className="text-muted-foreground/70 text-sm">Manage your course content and student progress.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link href={`/admin/course/${course.id}`} key={course.id} className="group">
            <Card className="overflow-hidden transition-all duration-300 hover:border-primary/50 h-full">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={
                    course.imageUrl || "/placeholder.svg?height=480&width=640"
                  }
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute top-3 right-3 size-8 bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors tracking-tight leading-snug">
                  {course.title}
                </h3>
                {course.description && (
                  <p className="text-sm text-muted-foreground/70 line-clamp-2 mb-4 leading-relaxed">
                    {course.description}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t-2 border-border">
                  <span className="text-[10px] font-bold px-3 py-1.5 bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors uppercase tracking-wider">
                    Edit Course
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
