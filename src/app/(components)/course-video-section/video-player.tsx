"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import type { CourseVideo } from "../../../lib/types/course"

interface VideoPlayerProps {
  video: CourseVideo
  onComplete: () => void
  isCompleted: boolean
}

export function VideoPlayer({ video, onComplete, isCompleted }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handleTimeUpdate = () => {
      if (videoElement.currentTime && videoElement.duration) {
        setCurrentTime(videoElement.currentTime)
        setProgress((videoElement.currentTime / videoElement.duration) * 100)

        // Check if video is completed (within 1 second of the end)
        if (videoElement.duration - videoElement.currentTime < 1) {
          onComplete()
        }
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      onComplete()
    }

    videoElement.addEventListener("timeupdate", handleTimeUpdate)
    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata)
    videoElement.addEventListener("ended", handleEnded)

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate)
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata)
      videoElement.removeEventListener("ended", handleEnded)
    }
  }, [onComplete])

  const togglePlay = () => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (isPlaying) {
      videoElement.pause()
    } else {
      videoElement.play()
    }
    setIsPlaying(!isPlaying)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="w-full aspect-video"
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        playsInline
      />

      {/* Custom controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex flex-col gap-2">
          <div className="relative w-full h-1 bg-gray-600 rounded-full">
            <div className="absolute top-0 left-0 h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-white h-8 px-2" onClick={togglePlay}>
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <span className="text-xs text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {isCompleted && <span className="text-xs text-green-400">Completed</span>}
          </div>
        </div>
      </div>

      {/* Prevent seeking */}
      <style jsx>{`
        video::-webkit-media-controls-timeline {
          display: none;
        }
        video::-webkit-media-controls-seek-back-button,
        video::-webkit-media-controls-seek-forward-button {
          display: none;
        }
      `}</style>
    </div>
  )
}

