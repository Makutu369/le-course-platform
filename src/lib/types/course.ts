export interface CourseVideo {
    id: string
    title: string
    thumbnailUrl: string
    duration: string
    uploadTime: string
    views: string
    author: string
    videoUrl: string
    description: string
    subscriber: string
    isLive: boolean
  }
  
  export interface CourseProgress {
    completedVideos: string[]
    currentVideoId: string
  }
  
  