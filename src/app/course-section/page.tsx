"use client"

import { useState, useEffect } from "react"
import { VideoPlayer } from "../(components)/course-video-section/video-player"
import { CourseSidebar } from "../(components)/course-video-section/course-sidebar"
import { CourseNavigation } from "../(components)/course-video-section/course-navigation"
import { CourseProgressBar } from "../(components)/course-video-section/course-progress-bar"
import type { CourseVideo, CourseProgress } from "../../lib/types/course"

// Sample course data
const courseVideos: CourseVideo[] = [
  {
    id: "1",
    title: "Big Buck Bunny",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png",
    duration: "8:18",
    uploadTime: "May 9, 2011",
    views: "24,969,123",
    author: "Vlc Media Player",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description:
      "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
    subscriber: "25254545 Subscribers",
    isLive: true,
  },
  {
    id: "2",
    title: "The first Blender Open Movie from 2006",
    thumbnailUrl: "https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp",
    duration: "12:18",
    uploadTime: "May 9, 2011",
    views: "24,969,123",
    author: "Blender Inc.",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description:
      "Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series",
    subscriber: "25254545 Subscribers",
    isLive: true,
  },
  {
    id: "3",
    title: "For Bigger Blazes",
    thumbnailUrl: "https://i.ytimg.com/vi/Dr9C2oswZfA/maxresdefault.jpg",
    duration: "8:18",
    uploadTime: "May 9, 2011",
    views: "24,969,123",
    author: "T-Series Regional",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description:
      "Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series",
    subscriber: "25254545 Subscribers",
    isLive: true,
  },
  {
    id: "4",
    title: "For Bigger Escape",
    thumbnailUrl: "https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg",
    duration: "8:18",
    uploadTime: "May 9, 2011",
    views: "24,969,123",
    author: "T-Series Regional",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description:
      " Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
    subscriber: "25254545 Subscribers",
    isLive: false,
  },
  {
    id: "5",
    title: "Big Buck Bunny",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png",
    duration: "8:18",
    uploadTime: "May 9, 2011",
    views: "24,969,123",
    author: "Vlc Media Player",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description:
      "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
    subscriber: "25254545 Subscribers",
    isLive: true,
  },
  {
    id: "6",
    title: "For Bigger Blazes",
    thumbnailUrl: "https://i.ytimg.com/vi/Dr9C2oswZfA/maxresdefault.jpg",
    duration: "8:18",
    uploadTime: "May 9, 2011",
    views: "24,969,123",
    author: "T-Series Regional",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description:
      "Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series",
    subscriber: "25254545 Subscribers",
    isLive: false,
  },
  {
    id: "7",
    title: "For Bigger Escape",
    thumbnailUrl: "https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg",
    duration: "8:18",
    uploadTime: "May 9, 2011",
    views: "24,969,123",
    author: "T-Series Regional",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description:
      " Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
    subscriber: "25254545 Subscribers",
    isLive: true,
  },
  {
    id: "8",
    title: "The first Blender Open Movie from 2006",
    thumbnailUrl: "https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp",
    duration: "12:18",
    uploadTime: "May 9, 2011",
    views: "24,969,123",
    author: "Blender Inc.",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description:
      "Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series",
    subscriber: "25254545 Subscribers",
    isLive: false,
  },
]

export default function CoursePage() {
  // Initialize progress from localStorage or with defaults
  const [progress, setProgress] = useState<CourseProgress>(() => {
    if (typeof window !== "undefined") {
      const savedProgress = localStorage.getItem("courseProgress")
      if (savedProgress) {
        return JSON.parse(savedProgress)
      }
    }
    return {
      completedVideos: [],
      currentVideoId: courseVideos[0].id,
    }
  })

  // Get current video
  const currentVideo = courseVideos.find((video) => video.id === progress.currentVideoId) || courseVideos[0]

  // Save progress to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("courseProgress", JSON.stringify(progress))
    }
  }, [progress])

  // Mark current video as completed
  const handleVideoComplete = () => {
    if (!progress.completedVideos.includes(currentVideo.id)) {
      setProgress((prev) => ({
        ...prev,
        completedVideos: [...prev.completedVideos, currentVideo.id],
      }))
    }
  }

  // Navigate to next video
  const handleNextVideo = () => {
    const currentIndex = courseVideos.findIndex((video) => video.id === currentVideo.id)
    if (currentIndex < courseVideos.length - 1) {
      setProgress((prev) => ({
        ...prev,
        currentVideoId: courseVideos[currentIndex + 1].id,
      }))
    }
  }

  // Navigate to previous video
  const handlePreviousVideo = () => {
    const currentIndex = courseVideos.findIndex((video) => video.id === currentVideo.id)
    if (currentIndex > 0) {
      setProgress((prev) => ({
        ...prev,
        currentVideoId: courseVideos[currentIndex - 1].id,
      }))
    }
  }

  // Select a specific video
  const handleSelectVideo = (videoId: string) => {
    setProgress((prev) => ({
      ...prev,
      currentVideoId: videoId,
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Web Development Masterclass</h1>

        <CourseProgressBar videos={courseVideos} progress={progress} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <VideoPlayer
              video={currentVideo}
              onComplete={handleVideoComplete}
              isCompleted={progress.completedVideos.includes(currentVideo.id)}
            />

            <div>
              <h2 className="text-2xl font-bold mb-2">{currentVideo.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Instructor: {currentVideo.author} • Duration: {currentVideo.duration}
              </p>

              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-sm whitespace-pre-line">{currentVideo.description}</p>
              </div>

              <CourseNavigation
                videos={courseVideos}
                progress={progress}
                onNext={handleNextVideo}
                onPrevious={handlePreviousVideo}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <CourseSidebar videos={courseVideos} progress={progress} onSelectVideo={handleSelectVideo} />
          </div>
        </div>
      </div>
    </div>
  )
}

