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
    // First video is always accessible
    if (index === 0) return true

    // If the previous video is completed, this video is accessible
    const previousVideoId = videos[index - 1].id
    return completedVideos.includes(previousVideoId)
  }

  return (
    <div className="w-full bg-card border rounded-lg overflow-hidden">
      <div className="p-4 border-b bg-muted">
        <h3 className="font-semibold">Course Content</h3>
        <p className="text-sm text-muted-foreground">
          {completedVideos.length} of {videos.length} completed
        </p>
      </div>

      <div className="divide-y">
        {videos.map((video, index) => {
          const isCompleted = completedVideos.includes(video.id)
          const isCurrent = currentVideoId === video.id
          const isAccessible = isVideoAccessible(index, video.id)

          return (
            <div
              key={video.id}
              className={cn(
                "p-3 flex items-start gap-3 hover:bg-muted/50 transition-colors",
                isCurrent && "bg-muted",
                !isAccessible && "opacity-60",
              )}
              onClick={() => isAccessible && onSelectVideo(video.id)}
            >
              <div className="mt-1 text-primary">
                {isCompleted ? (
                  <CheckCircle size={18} className="text-green-500" />
                ) : isCurrent ? (
                  <PlayCircle size={18} />
                ) : !isAccessible ? (
                  <Lock size={18} />
                ) : (
                  <Circle size={18} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-2">{video.title}</h4>
                <p className="text-xs text-muted-foreground">{video.duration}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

