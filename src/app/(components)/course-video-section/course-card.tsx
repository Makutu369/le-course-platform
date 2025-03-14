import Image from "next/image"
import Link from "next/link"
import { PlayCircle, Clock, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Course } from "../../../lib/types/course-catalogue"

interface CourseCardProps {
  course: Course
  className?: string
}

export function CourseCard({ course, className }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md",
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={course.thumbnailUrl || "/placeholder.svg"}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {course.isFeatured && (
          <div className="absolute top-2 right-2 rounded-full bg-sky-500 px-2 py-0.5 text-xs font-medium text-white">
            Featured
          </div>
        )}
        {course.progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200">
            <div className="h-full bg-emerald-500" style={{ width: `${course.progress}%` }} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
            {course.level}
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
            {course.category}
          </span>
        </div>

        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-slate-800 group-hover:text-sky-600">
          {course.title}
        </h3>

        <p className="mb-4 line-clamp-2 flex-1 text-sm text-slate-600">{course.description}</p>

        <div className="mt-auto flex items-center justify-between text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{course.duration}</span>
          </div>

          <div className="flex items-center gap-1">
            <BookOpen size={14} />
            <span>{course.lessonsCount} lessons</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
          <div className="text-sm font-medium text-slate-700">{course.instructor}</div>

          <div className="ml-auto flex items-center gap-1 text-sm font-medium text-sky-600">
            <PlayCircle size={16} />
            <span>Start Learning</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

