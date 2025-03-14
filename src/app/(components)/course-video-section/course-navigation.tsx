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
    <div className="flex items-center justify-between py-4 border-t border-slate-100 mt-4">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstVideo}
        className="flex items-center gap-1 text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
      >
        <ChevronLeft size={16} />
        Previous
      </Button>

      <div className="text-sm text-slate-500">
        {currentIndex + 1} of {videos.length}
      </div>

      <Button
        onClick={onNext}
        disabled={!canGoNext}
        className="flex items-center gap-1 bg-sky-500 hover:bg-sky-600 text-white"
      >
        Next
        <ChevronRight size={16} />
      </Button>
    </div>
  )
}

