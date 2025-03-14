"use client"

import type { CourseVideo, CourseProgress } from "../../../lib/types/course"
import { CheckCircle, Circle, Lock, PlayCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface CourseSidebarProps {
  videos: CourseVideo[]
  progress: CourseProgress
  onSelectVideo: (videoId: string) => void
}

export function CourseSidebar({ videos, progress, onSelectVideo }: CourseSidebarProps) {
  const { completedVideos, currentVideoId } = progress

  const isVideoAccessible = (index: number, videoId: string) => {
    console.log(index, videoId)
    // First video is always accessible
    if (index === 0) return true

    // If the previous video is completed, this video is accessible
    const previousVideoId = videos[index - 1].id
    return completedVideos.includes(previousVideoId)
  }

  return (
    <div className="w-full bg-white shadow-sm rounded-xl overflow-hidden border border-slate-100 transition-all duration-300">
      <div className="p-4 border-b border-slate-100 bg-slate-50">
        <h3 className="font-semibold text-slate-800">Course Content</h3>
        <p className="text-sm text-slate-500">
          {completedVideos.length} of {videos.length} completed
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {videos.map((video, index) => {
          const isCompleted = completedVideos.includes(video.id)
          const isCurrent = currentVideoId === video.id
          const isAccessible = isVideoAccessible(index, video.id)

          return (
            <div
              key={video.id}
              className={cn(
                "p-3 flex items-start gap-3 transition-colors cursor-pointer",
                isCurrent ? "bg-sky-50" : "hover:bg-slate-50",
                !isAccessible && "opacity-60",
              )}
              onClick={() => isAccessible && onSelectVideo(video.id)}
            >
              <div className="mt-1">
                {isCompleted ? (
                  <CheckCircle size={18} className="text-emerald-500" />
                ) : isCurrent ? (
                  <PlayCircle size={18} className="text-sky-500" />
                ) : !isAccessible ? (
                  <Lock size={18} className="text-slate-400" />
                ) : (
                  <Circle size={18} className="text-slate-300" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-2 text-slate-700">{video.title}</h4>
                <p className="text-xs text-slate-500">{video.duration}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

