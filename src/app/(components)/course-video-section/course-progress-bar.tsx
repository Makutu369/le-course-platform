import type { CourseVideo, CourseProgress } from "../../../lib/types/course"
interface CourseProgressBarProps {
  videos: CourseVideo[]
  progress: CourseProgress
}

export function CourseProgressBar({ videos, progress }: CourseProgressBarProps) {
  const { completedVideos } = progress
  const progressPercentage = (completedVideos.length / videos.length) * 100

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-muted-foreground">Course Progress</span>
        <span className="font-medium">{Math.round(progressPercentage)}%</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  )
}

