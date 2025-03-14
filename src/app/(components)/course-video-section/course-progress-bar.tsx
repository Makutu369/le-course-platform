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
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-slate-500">Course Progress</span>
        <span className="font-medium text-slate-700">{Math.round(progressPercentage)}%</span>
      </div>
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  )
}

