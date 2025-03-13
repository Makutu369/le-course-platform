import {
    ChevronLeft,
    ChevronRight,
    FileText,
    HelpCircle,
    Layout,
    List,
    MessageSquare,
    Monitor,
    PlayCircle,
  } from "lucide-react"
  import Link from "next/link"
  
  export default function CourseVideoPage() {
    return (
      <div className="flex h-screen flex-col bg-slate-100">
        {/* Header */}
        <header className="flex h-12 items-center justify-between bg-blue-900 px-4 text-white">
          <div className="flex items-center space-x-2">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm">My Classroom</span>
            <span className="text-sm">|</span>
            <span className="text-sm">course - Course Classroom</span>
            <span className="text-sm">|</span>
            <span className="text-sm">Edureka</span>
          </div>
          <div className="flex items-center space-x-4">
            <Monitor className="h-5 w-5" />
            <MessageSquare className="h-5 w-5" />
            <span className="text-sm">...</span>
          </div>
        </header>
  
        {/* Sub Header */}
        <div className="flex h-10 items-center bg-blue-800 px-4 text-white">
          <span className="text-sm">My Classroom</span>
          <ChevronRight className="mx-2 h-4 w-4" />
          <span className="text-sm">Web Developer Certification Training Course</span>
        </div>
  
        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 overflow-y-auto  bg-white">
            <div className=" p-4">
              <div className="flex items-center">
                <ChevronLeft className="h-5 w-5 text-gray-500" />
                <h2 className="ml-2 text-sm font-medium text-blue-800">Web Developer Certification Training</h2>
              </div>
            </div>
  
            <div className=" p-4">
              <div className="flex items-center">
                <List className="h-5 w-5 text-gray-500" />
                <span className="ml-2 text-sm font-medium">Course Content</span>
              </div>
            </div>
  
            <div className="space-y-1 p-2">
              {/* Course modules */}
              <div className="flex items-center rounded p-2 text-sm text-gray-700">
                <FileText className="mr-2 h-4 w-4 text-gray-500" />
                <span>Module 4 - Presentation</span>
              </div>
  
              <div className="flex items-center rounded p-2 text-sm text-gray-700">
                <FileText className="mr-2 h-4 w-4 text-gray-500" />
                <span>Module 4 - Quiz</span>
              </div>
  
              <div className="flex items-center rounded p-2 text-sm text-gray-700">
                <FileText className="mr-2 h-4 w-4 text-gray-500" />
                <span>Module 4 - Assignment</span>
              </div>
  
              <div className="flex items-center rounded p-2 text-sm text-gray-700">
                <FileText className="mr-2 h-4 w-4 text-gray-500" />
                <span>Pre-work for Module 5</span>
              </div>
  
              <div className="flex items-center rounded bg-blue-50 p-2 text-sm font-medium text-blue-600">
                <PlayCircle className="mr-2 h-4 w-4 text-blue-500" />
                <span>Class 4 Recording</span>
              </div>
  
              <div className="flex items-center rounded p-2 text-sm text-gray-700">
                <FileText className="mr-2 h-4 w-4 text-gray-500" />
                <span>Handling events with JavaScript</span>
              </div>
  
              <div className="flex items-center rounded p-2 text-sm text-gray-700">
                <FileText className="mr-2 h-4 w-4 text-gray-500" />
                <span>Twitter Bootstrap 3</span>
              </div>
            </div>
  
            <div className=" p-4">
              <div className="flex items-center">
                <Layout className="h-5 w-5 text-gray-500" />
                <span className="ml-2 text-sm font-medium">Personal Library</span>
              </div>
            </div>
          </div>
  
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h1 className="mb-4 text-xl font-medium text-gray-800">
                Module 4 - CSS3 effects and animations • Class 4 Recording
              </h1>
  
              {/* Video Player */}
              <div className="mb-6 overflow-hidden rounded-lg  bg-black shadow-sm">
                <div className="aspect-video bg-gray-900">
                  {/* This would be your actual video player */}
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center text-white">
                      <PlayCircle className="mx-auto h-16 w-16 opacity-70" />
                      <p className="mt-2">Click to play video</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 p-2">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-4">
                      <PlayCircle className="h-5 w-5" />
                      <span>00:00 / 45:30</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span>HD</span>
                      <span>1x</span>
                      <span>CC</span>
                      <span>⋮</span>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Overview Section */}
              <div className="mb-6 rounded-lg border bg-white p-4 shadow-sm">
                <h2 className="mb-3 text-lg font-medium text-gray-800">Overview</h2>
                <p className="text-gray-600">
                  In this class recording, we cover CSS3 effects and animations. Youll learn how to create engaging user
                  interfaces using modern CSS techniques including transitions, transforms, and keyframe animations. This
                  session builds on the fundamentals covered in previous modules and prepares you for more advanced web
                  development concepts.
                </p>
              </div>
  
              {/* Resources Section */}
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <h2 className="mb-3 text-lg font-medium text-gray-800">Resources</h2>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="flex items-center text-blue-600 hover:underline">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>CSS3 Effects Cheat Sheet.pdf</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center text-blue-600 hover:underline">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Animation Examples.zip</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center text-blue-600 hover:underline">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Class 4 Slides.pptx</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center text-blue-600 hover:underline">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Practice Exercise.html</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
  
        {/* Footer */}
        <div className="border-t bg-white p-3 text-center text-sm text-gray-500">
          <div className="flex items-center justify-center">
            <HelpCircle className="mr-1 h-4 w-4" />
            <span>Have a doubt? Raise a query.</span>
          </div>
        </div>
      </div>
    )
  }
  
  