"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Maximize,
  Minimize,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface CustomVideoPlayerProps {
  currentSection: { id: string; title: string; videoUrl: string };
  onComplete?: () => void;
}

export default function CustomVideoPlayer({
  currentSection,
  onComplete = () => console.log("Video completed!"),
}: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Add these helper functions after the state declarations
  const getLocalStorageKey = useCallback(
    (suffix: string) => {
      return `video-player-${currentSection.id}-${suffix}`;
    },
    [currentSection.id]
  );

  const saveToLocalStorage = useCallback(
    (key: string, value: any) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(getLocalStorageKey(key), JSON.stringify(value));
      }
    },
    [getLocalStorageKey]
  );

  const getFromLocalStorage = useCallback(
     
    (key: string, defaultValue: any) => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(getLocalStorageKey(key));
        return stored ? JSON.parse(stored) : defaultValue;
      }
      return defaultValue;
    },
    [getLocalStorageKey]
  );

  // Initialize video duration and load saved state when metadata is loaded
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);

      // Load saved position and completion status
      const savedTime = getFromLocalStorage("currentTime", 0);
      const savedCompleted = getFromLocalStorage("completed", false);

      // Only set time if it's valid and less than duration
      if (savedTime > 0 && savedTime < video.duration) {
        video.currentTime = savedTime;
        setCurrentTime(savedTime);
      }

      setIsCompleted(savedCompleted);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [getFromLocalStorage]);

  // Update current time as video plays and save to localStorage
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      // Don't save on every frame to avoid performance issues
      // Save every 2 seconds or so
      if (Math.floor(video.currentTime) % 2 === 0) {
        saveToLocalStorage("currentTime", video.currentTime);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [saveToLocalStorage]);

  // Handle video end and save completion status
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setIsPlaying(false);
      setIsCompleted(true);
      setShowCompletionMessage(true);

      // Save completion status to localStorage
      saveToLocalStorage("completed", true);
      saveToLocalStorage("currentTime", video.duration);

      onComplete();

      // Hide completion message after 3 seconds
      setTimeout(() => {
        setShowCompletionMessage(false);
      }, 3000);
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [onComplete, saveToLocalStorage]);

  // Auto-hide controls after inactivity
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);

      // Reset the timeout
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }

      // Hide controls after 3 seconds of inactivity
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("touchstart", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("touchstart", handleMouseMove);
      }

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  // Play/Pause toggle and save state when paused
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      // Save current time when paused
      saveToLocalStorage("currentTime", video.currentTime);
      setShowControls(true);
    } else {
      video.play();
    }

    setIsPlaying(!isPlaying);
  };

  // Rewind 10 seconds and save new position
  const rewind = () => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = Math.max(0, video.currentTime - 10);
    video.currentTime = newTime;
    setCurrentTime(newTime);
    saveToLocalStorage("currentTime", newTime);
  };

  // Handle slider change (only allow going back, not forward) and save position
  const handleSliderChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = value[0];

    // Only allow seeking backward, not forward
    if (newTime <= currentTime) {
      video.currentTime = newTime;
      setCurrentTime(newTime);
      saveToLocalStorage("currentTime", newTime);
    }
  };

  // Add this function before the return statement
  // const resetSavedState = () => {
  //   if (typeof window !== "undefined") {
  //     localStorage.removeItem(getLocalStorageKey("currentTime"));
  //     localStorage.removeItem(getLocalStorageKey("completed"));

  //     const video = videoRef.current;
  //     if (video) {
  //       video.currentTime = 0;
  //       setCurrentTime(0);
  //     }

  //     setIsCompleted(false);
  //   }
  // };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      // Enter fullscreen
      const element = containerRef.current;

      const requestMethod =
        element.requestFullscreen ||
        (element as any).webkitRequestFullscreen ||
        (element as any).mozRequestFullScreen ||
        (element as any).msRequestFullscreen;

      if (requestMethod) {
        requestMethod
          .call(element)
          .then(() => setIsFullscreen(true))
          .catch((err) =>
            console.error(
              `Error attempting to enable fullscreen: ${err.message}`
            )
          );
      }
    } else {
      // Exit fullscreen
      const exitMethod =
        document.exitFullscreen ||
        (document as any).webkitExitFullscreen ||
        (document as any).mozCancelFullScreen ||
        (document as any).msExitFullscreen;

      if (exitMethod) {
        exitMethod
          .call(document)
          .then(() => setIsFullscreen(false))
          .catch((err) =>
            console.error(`Error attempting to exit fullscreen: ${err.message}`)
          );
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isInFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isInFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full    overflow-hidden bg-black [&:fullscreen]:max-w-none [&:fullscreen]:w-screen [&:fullscreen]:h-screen [&:fullscreen_video]:h-full [&:fullscreen_video]:object-contain"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={currentSection.videoUrl}
        className="w-full aspect-video"
        playsInline
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Completion overlay */}
      {showCompletionMessage && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white">
          <div className="flex flex-col items-center gap-2">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <p className="text-xl font-medium">Video Completed!</p>
          </div>
        </div>
      )}

      {/* Play button overlay (shown when paused) */}
      {!isPlaying && !showCompletionMessage && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          <div className="rounded-full bg-black/50 p-4">
            <Play className="h-8 w-8 text-white" />
          </div>
        </div>
      )}

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Progress bar */}
        <div className="mb-2 sm:mb-4 px-1">
          <Slider
            value={[currentTime]}
            min={0}
            max={duration}
            step={0.1}
            onValueChange={handleSliderChange}
            className="[&>span:first-child]:h-1 sm:[&>span:first-child]:h-1.5 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-2.5 sm:[&_[role=slider]]:w-3 [&_[role=slider]]:h-2.5 sm:[&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0"
          />
        </div>

        {/* Control buttons */}
        <div className="flex items-center gap-1 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            className="text-white hover:bg-white/20 h-8 w-8 sm:h-9 sm:w-9"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 sm:h-6 sm:w-6" />
            ) : (
              <Play className="h-4 w-4 sm:h-6 sm:w-6" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={rewind}
            className="text-white hover:bg-white/20 h-8 w-8 sm:h-9 sm:w-9"
          >
            <RotateCcw className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
          </Button>

          {/* Time display */}
          <div className="text-white text-xs sm:text-sm ml-1 sm:ml-2 whitespace-nowrap">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          {/* Fullscreen button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="text-white hover:bg-white/20 ml-auto h-8 w-8 sm:h-9 sm:w-9"
          >
            {isFullscreen ? (
              <Minimize className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
            ) : (
              <Maximize className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
            )}
          </Button>

          {/* Completed indicator */}
          {isCompleted && (
            <div className="hidden sm:flex ml-2 items-center gap-1 text-green-400">
              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">Completed</span>
            </div>
          )}

          {/* Mobile completed indicator (icon only) */}
          {isCompleted && (
            <div className="sm:hidden ml-1 flex items-center text-green-400">
              <CheckCircle className="h-3.5 w-3.5" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
