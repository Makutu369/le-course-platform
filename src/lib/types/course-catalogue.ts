export interface Course {
    id: string
    title: string
    slug: string
    description: string
    thumbnailUrl: string
    instructor: string
    duration: string
    lessonsCount: number
    category: string
    level: "Beginner" | "Intermediate" | "Advanced" | "All Levels"
    isFeatured: boolean
    progress?: number
  }
  
  export interface CourseCategory {
    id: string
    name: string
    count: number
  }
  
  