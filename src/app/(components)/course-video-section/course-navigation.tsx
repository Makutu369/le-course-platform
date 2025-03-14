"use client"

import { Button } from "@/components/ui/button"
import type { CourseVideo, CourseProgress } from "../../../lib/types/course"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CourseNavigationProps {
  videos: CourseVideo[]
  progress: CourseProgress
  onNext: () => void
  onPrevious: () => void
}

export function CourseNavigation({ videos, progress, onNext, onPrevious }: CourseNavigationProps) {
  const { completedVideos, currentVideoId } = progress

  const currentIndex = videos.findIndex((video) => video.id === currentVideoId)
  const isFirstVideo = currentIndex === 0
  const isLastVideo = currentIndex === videos.length - 1

  const isCurrentVideoCompleted = completedVideos.includes(currentVideoId)
  const canGoNext = isCurrentVideoCompleted && !isLastVideo

  return (
    <div className="flex items-center justify-between py-4 border-t mt-4">
      <Button variant="outline" onClick={onPrevious} disabled={isFirstVideo} className="flex items-center gap-1">
        <ChevronLeft size={16} />
        Previous
      </Button>

      <div className="text-sm text-muted-foreground">
        {currentIndex + 1} of {videos.length}
      </div>

      <Button onClick={onNext} disabled={!canGoNext} className="flex items-center gap-1">
        Next
        <ChevronRight size={16} />
      </Button>
    </div>
  )
}

