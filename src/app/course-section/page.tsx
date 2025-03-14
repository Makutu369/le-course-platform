"use client"

import { useState, useEffect } from "react"
import { VideoPlayer } from "../(components)/course-video-section/video-player"
import { CourseSidebar } from "../(components)/course-video-section/course-sidebar"
import { CourseNavigation } from "../(components)/course-video-section/course-navigation"
import { CourseProgressBar } from "../(components)/course-video-section/course-progress-bar"
import type { CourseVideo, CourseProgress } from "../../lib/types/course"

// Replace the courseVideos array with this updated version that has gospel-themed content
const courseVideos: CourseVideo[] = [
  {
    id: "1",
    title: "Born Again",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png",
    duration: "8:18",
    uploadTime: "May 9, 2023",
    views: "24,969",
    author: "Pastor John Davis",
    videoUrl: "https://youtu.be/3AqS0G1DGpo",
    description:
      "In this powerful message, Pastor John explores the concept of being born again as described in John 3. What does it mean to be spiritually reborn? How does this transformation impact our daily lives and our relationship with God? This foundational teaching will help both new believers and seasoned Christians understand the miracle of spiritual rebirth.\n\nScripture references: John 3:1-21, 2 Corinthians 5:17, 1 Peter 1:23",
    subscriber: "125,450 Subscribers",
    isLive: false,
  },
  {
    id: "2",
    title: "The Holy Spirit",
    thumbnailUrl: "https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp",
    duration: "12:18",
    uploadTime: "June 15, 2023",
    views: "18,742",
    author: "Dr. Sarah Williams",
    videoUrl: "https://www.youtube.com/watch?v=n0ovdfWiQXM&t=2111s&pp=ygUYYmlzaG9wIGlzYWFjIG90aSBib2F0ZW5n",
    description:
      "Who is the Holy Spirit and what role does He play in the life of a believer? Dr. Williams provides a comprehensive biblical understanding of the third person of the Trinity. Learn about the gifts, fruits, and baptism of the Holy Spirit, and how to cultivate a deeper relationship with Him in your daily walk.\n\nScripture references: John 14:15-17, Acts 1:8, Galatians 5:22-23, 1 Corinthians 12:4-11",
    subscriber: "98,325 Subscribers",
    isLive: false,
  },
  {
    id: "3",
    title: "Your Walk with God",
    thumbnailUrl: "https://i.ytimg.com/vi/Dr9C2oswZfA/maxresdefault.jpg",
    duration: "8:18",
    uploadTime: "July 3, 2023",
    views: "15,632",
    author: "Pastor Michael Johnson",
    videoUrl: "https://www.youtube.com/watch?v=8UjkRgRdWx0",
    description:
      "Developing a consistent and meaningful relationship with God is essential for spiritual growth. Pastor Michael shares practical insights on establishing a daily devotional life, prayer habits, and Bible study techniques that will transform your walk with God. This message includes testimonies of transformed lives and practical steps for spiritual disciplines.\n\nScripture references: Psalm 119:105, James 4:8, Hebrews 4:12, Philippians 4:6-7",
    subscriber: "87,210 Subscribers",
    isLive: false,
  },
  {
    id: "4",
    title: "Working with God",
    thumbnailUrl: "https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg",
    duration: "8:18",
    uploadTime: "August 12, 2023",
    views: "12,845",
    author: "Rev. Elizabeth Chen",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description:
      "God invites us to be co-laborers in His kingdom work. Rev. Chen explores how we can partner with God in fulfilling His purposes on earth. This inspiring message covers topics such as discovering your spiritual gifts, finding your ministry calling, and understanding how God works through ordinary people to accomplish extraordinary things.\n\nScripture references: 1 Corinthians 3:9, Ephesians 2:10, Philippians 2:12-13, 2 Timothy 1:9",
    subscriber: "76,540 Subscribers",
    isLive: false,
  },
  {
    id: "5",
    title: "The Holy Spirit Working on Your Character",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png",
    duration: "8:18",
    uploadTime: "September 5, 2023",
    views: "10,723",
    author: "Pastor John Davis",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description:
      "Character transformation is a lifelong process led by the Holy Spirit. In this follow-up message, Pastor John examines how the Holy Spirit works to develop Christ-like character in believers. Learn about the fruit of the Spirit, overcoming character flaws, and cooperating with God's refining process in your life.\n\nScripture references: Galatians 5:22-23, Romans 8:29, 2 Corinthians 3:18, Philippians 1:6",
    subscriber: "125,450 Subscribers",
    isLive: false,
  },
  {
    id: "6",
    title: "Soul Winning",
    thumbnailUrl: "https://i.ytimg.com/vi/Dr9C2oswZfA/maxresdefault.jpg",
    duration: "8:18",
    uploadTime: "October 18, 2023",
    views: "9,587",
    author: "Evangelist David Thompson",
    videoUrl: "https://www.youtube.com/watch?v=X3-RTgcEPBc&pp=ygUYYmlzaG9wIGlzYWFjIG90aSBib2F0ZW5n",
    description:
      "Sharing the gospel effectively is both an art and a spiritual discipline. Evangelist Thompson provides practical tools and biblical principles for sharing your faith with confidence and compassion. This message includes real-life examples, conversation starters, and approaches for different contexts and relationships.\n\nScripture references: Matthew 28:19-20, Acts 1:8, Romans 10:14-15, 1 Peter 3:15",
    subscriber: "65,320 Subscribers",
    isLive: false,
  },
  {
    id: "7",
    title: "Marriage Conference",
    thumbnailUrl: "https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg",
    duration: "8:18",
    uploadTime: "November 7, 2023",
    views: "14,256",
    author: "Dr. Robert & Mary Wilson",
    videoUrl: "https://www.youtube.com/watch?v=5ROpenhnx9M&pp=ygUYYmlzaG9wIGlzYWFjIG90aSBib2F0ZW5n",
    description:
      "Building a Christ-centered marriage requires intentionality and biblical wisdom. In this special conference session, Dr. Robert and Mary Wilson share principles for healthy communication, conflict resolution, and spiritual intimacy in marriage. Whether you're preparing for marriage or have been married for decades, this message offers practical insights for strengthening your relationship.\n\nScripture references: Ephesians 5:21-33, 1 Corinthians 13:4-7, Genesis 2:24, Colossians 3:18-19",
    subscriber: "92,780 Subscribers",
    isLive: false,
  },
  {
    id: "8",
    title: "The Holy Spirit and the Church",
    thumbnailUrl: "https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp",
    duration: "12:18",
    uploadTime: "December 12, 2023",
    views: "8,934",
    author: "Bishop Thomas Anderson",
    videoUrl: "https://www.youtube.com/watch?v=5I1thNOdZlY&pp=ygUYYmlzaG9wIGlzYWFjIG90aSBib2F0ZW5n",
    description:
      "The Holy Spirit empowers the church to fulfill its mission in the world. Bishop Anderson examines the vital relationship between the Holy Spirit and the body of Christ throughout church history and in the present day. This teaching covers topics such as corporate worship, spiritual gifts in the church context, and the Spirit's role in unity and diversity within the congregation.\n\nScripture references: Acts 2:1-47, 1 Corinthians 12:12-31, Ephesians 4:1-16, Revelation 2-3",
    subscriber: "103,450 Subscribers",
    isLive: false,
  },
]

// Update the page title to reflect gospel content
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-slate-800">Welcome to God&apos;s Family</h1>

        <CourseProgressBar videos={courseVideos} progress={progress} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <VideoPlayer
              video={currentVideo}
              onComplete={handleVideoComplete}
              isCompleted={progress.completedVideos.includes(currentVideo.id)}
            />

            <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-2 text-slate-800">{currentVideo.title}</h2>
              <p className="text-sm text-slate-500 mb-4">
                Speaker: {currentVideo.author} • Duration: {currentVideo.duration}
              </p>

              <div className="bg-slate-50 rounded-lg p-5 border border-slate-100">
                <h3 className="font-semibold mb-2 text-slate-700">Description</h3>
                <p className="text-sm whitespace-pre-line text-slate-600">{currentVideo.description}</p>
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

