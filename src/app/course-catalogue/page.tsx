"use client"

import { useState, useEffect } from "react"
import { CourseCard } from "../(components)/course-video-section/course-card"
import  Link  from "next/link"
import Image from "next/image"
import { CourseFilter } from "../(components)/course-video-section/course-filter"
import type { Course, CourseCategory } from "../../lib/types/course-catalogue"

// Sample course data
const courses: Course[] = [
  {
    id: "1",
    title: "Spiritual Growth Series",
    slug: "spiritual-growth-series",
    description:
      "A comprehensive series on spiritual growth, covering topics from being born again to the work of the Holy Spirit in the church.",
    thumbnailUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1470&auto=format&fit=crop",
    instructor: "Pastor John Davis",
    duration: "8 hours",
    lessonsCount: 8,
    category: "Spiritual Growth",
    level: "All Levels",
    isFeatured: true,
    progress: 25,
  },
  {
    id: "2",
    title: "Understanding the Bible",
    slug: "understanding-the-bible",
    description:
      "Learn how to study and interpret the Bible effectively, with practical methods for personal and group study.",
    thumbnailUrl: "https://images.unsplash.com/photo-1507131924971-8b4b3a901d5b?q=80&w=1470&auto=format&fit=crop",
    instructor: "Dr. Sarah Williams",
    duration: "10 hours",
    lessonsCount: 12,
    category: "Bible Study",
    level: "Beginner",
    isFeatured: false,
  },
  {
    id: "3",
    title: "Prayer and Fasting",
    slug: "prayer-and-fasting",
    description:
      "Discover the power of prayer and fasting in your spiritual journey, with practical guidance and biblical foundations.",
    thumbnailUrl: "https://images.unsplash.com/photo-1492176273113-2d51f47b23b0?q=80&w=1470&auto=format&fit=crop",
    instructor: "Pastor Michael Johnson",
    duration: "6 hours",
    lessonsCount: 7,
    category: "Spiritual Disciplines",
    level: "Intermediate",
    isFeatured: false,
    progress: 75,
  },
  {
    id: "4",
    title: "Marriage and Family",
    slug: "marriage-and-family",
    description:
      "Biblical principles for building strong marriages and families, with practical applications for daily life.",
    thumbnailUrl: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?q=80&w=1469&auto=format&fit=crop",
    instructor: "Dr. Robert & Mary Wilson",
    duration: "9 hours",
    lessonsCount: 10,
    category: "Relationships",
    level: "All Levels",
    isFeatured: true,
  },
  {
    id: "5",
    title: "Evangelism Essentials",
    slug: "evangelism-essentials",
    description:
      "Learn effective methods for sharing your faith and leading others to Christ with confidence and compassion.",
    thumbnailUrl: "https://images.unsplash.com/photo-1531547255897-f400dc1b7de2?q=80&w=1374&auto=format&fit=crop",
    instructor: "Evangelist David Thompson",
    duration: "7 hours",
    lessonsCount: 8,
    category: "Evangelism",
    level: "Beginner",
    isFeatured: false,
  },
  {
    id: "6",
    title: "Leadership in Ministry",
    slug: "leadership-in-ministry",
    description:
      "Develop essential leadership skills for ministry contexts, based on biblical principles and practical experience.",
    thumbnailUrl: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1471&auto=format&fit=crop",
    instructor: "Bishop Thomas Anderson",
    duration: "12 hours",
    lessonsCount: 14,
    category: "Leadership",
    level: "Advanced",
    isFeatured: false,
  },
  {
    id: "7",
    title: "Worship and Music Ministry",
    slug: "worship-and-music-ministry",
    description: "Explore the theology of worship and practical aspects of leading music ministry in the church.",
    thumbnailUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1470&auto=format&fit=crop",
    instructor: "Minister James Wilson",
    duration: "8 hours",
    lessonsCount: 9,
    category: "Worship",
    level: "Intermediate",
    isFeatured: false,
  },
  {
    id: "8",
    title: "Christian Counseling Basics",
    slug: "christian-counseling-basics",
    description: "Learn foundational principles and techniques for providing biblical counseling and pastoral care.",
    thumbnailUrl: "https://images.unsplash.com/photo-1573497491765-55d5e4564001?q=80&w=1470&auto=format&fit=crop",
    instructor: "Dr. Elizabeth Chen",
    duration: "11 hours",
    lessonsCount: 12,
    category: "Counseling",
    level: "Advanced",
    isFeatured: false,
  },
  {
    id: "9",
    title: "Church History",
    slug: "church-history",
    description:
      "A survey of church history from the early church to modern times, highlighting key figures and movements.",
    thumbnailUrl: "https://images.unsplash.com/photo-1548625361-58a9b86aa83b?q=80&w=1470&auto=format&fit=crop",
    instructor: "Professor Alan Richards",
    duration: "14 hours",
    lessonsCount: 16,
    category: "History",
    level: "Intermediate",
    isFeatured: false,
  },
  {
    id: "10",
    title: "Apologetics: Defending the Faith",
    slug: "apologetics-defending-the-faith",
    description: "Equip yourself to defend Christian beliefs with logical arguments and evidence-based reasoning.",
    thumbnailUrl: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1470&auto=format&fit=crop",
    instructor: "Dr. William Lewis",
    duration: "10 hours",
    lessonsCount: 12,
    category: "Apologetics",
    level: "Advanced",
    isFeatured: true,
  },
]

// Generate categories from courses
const categories: CourseCategory[] = [
  { id: "spiritual-growth", name: "Spiritual Growth", count: 1 },
  { id: "bible-study", name: "Bible Study", count: 1 },
  { id: "spiritual-disciplines", name: "Spiritual Disciplines", count: 1 },
  { id: "relationships", name: "Relationships", count: 1 },
  { id: "evangelism", name: "Evangelism", count: 1 },
  { id: "leadership", name: "Leadership", count: 1 },
  { id: "worship", name: "Worship", count: 1 },
  { id: "counseling", name: "Counseling", count: 1 },
  { id: "history", name: "History", count: 1 },
  { id: "apologetics", name: "Apologetics", count: 1 },
]

export default function CourseCatalogue() {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses)
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([])
  const [inProgressCourses, setInProgressCourses] = useState<Course[]>([])

  useEffect(() => {
    // Get featured courses
    setFeaturedCourses(courses.filter((course) => course.isFeatured))

    // Get in-progress courses
    setInProgressCourses(courses.filter((course) => course.progress !== undefined && course.progress > 0))
  }, [])

  const handleFilterChange = (filters: { search: string; category: string; level: string }) => {
    let filtered = [...courses]

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm) ||
          course.description.toLowerCase().includes(searchTerm) ||
          course.instructor.toLowerCase().includes(searchTerm),
      )
    }

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter((course) => course.category.toLowerCase() === filters.category.toLowerCase())
    }

    // Filter by level
    if (filters.level) {
      filtered = filtered.filter((course) => course.level === filters.level)
    }

    setFilteredCourses(filtered)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="sticky top-0 z-50 w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl tracking-tight mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Image src="/logo-black.png" alt="" width={150} height={50} />
          <nav className="hidden gap-6 md:flex">
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Available Courses
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              My Learning
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Resources
            </Link>
          </nav>
          
        </div>
      </header>
      <div className="container mx-auto py-8 px-4">

        {inProgressCourses.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-semibold text-slate-800">Continue Learning</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {inProgressCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>
        )}

        {featuredCourses.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-semibold text-slate-800">Featured Courses</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-4 text-xl font-semibold text-slate-800">All Courses</h2>
          <CourseFilter categories={categories} onFilterChange={handleFilterChange} />

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
              <h3 className="text-lg font-medium text-slate-800">No courses found</h3>
              <p className="mt-2 text-slate-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

