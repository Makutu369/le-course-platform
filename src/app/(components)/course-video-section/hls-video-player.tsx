"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import {
  Loader2,
  Play,
  Pause,
  RotateCcw,
  Maximize,
  Minimize,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { CompletionDialog } from "./completion-dialog";

interface HLSVideoPlayerProps {
  src: string;
  poster?: string;
  muted?: boolean;
  backwardSeekSeconds?: number;
  onComplete?: () => void;
  saveProgress?: boolean;
  courseId?: string;
}

export default function HLSVideoPlayer({
  src,
  poster = "",
  muted = false,
  backwardSeekSeconds = 10,
  onComplete,
  saveProgress = true,
  courseId,
}: HLSVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const lastAllowedTimeRef = useRef(0);

  const storageKey = `hls-player-progress-${hashString(src)}`;

  function hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(36);
  }

  const saveVideoProgress = useCallback(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const progressData = {
      currentTime: video.currentTime,
      duration: video.duration,
      lastUpdated: new Date().getTime(),
    };

    try {
      // Only save if we've watched more than 5 seconds and less than 95% of the video
      if (video.currentTime > 5 && video.currentTime < video.duration * 0.95) {
        localStorage.setItem(storageKey, JSON.stringify(progressData));
      }
    } catch (e) {
      console.error("Failed to save progress to localStorage:", e);
    }
  }, [storageKey, videoRef]);

  // Load saved progress from localStorage
  const loadVideoProgress = useCallback((): number | null => {
    if (!saveProgress) return null;

    try {
      const savedData = localStorage.getItem(storageKey);
      if (!savedData) return null;

      const progressData = JSON.parse(savedData);

      // Check if the saved data is valid and not too old (30 days)
      const now = new Date().getTime();
      const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

      if (
        progressData.currentTime &&
        progressData.duration &&
        now - progressData.lastUpdated < thirtyDaysInMs
      ) {
        // Only restore if we're not at the end of the video
        if (progressData.currentTime < progressData.duration * 0.95) {
          return progressData.currentTime;
        }
      }

      return null;
    } catch (e) {
      console.error("Failed to load progress from localStorage:", e);
      return null;
    }
  }, [storageKey, saveProgress]);

  // Clear saved progress
  const clearSavedProgress = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {
      console.error("Failed to clear progress from localStorage:", e);
    }
  }, [storageKey]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    const setupHls = () => {
      setIsLoading(true);
      setError(null);

      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Native HLS support (Safari)
        video.src = src;
      } else if (Hls.isSupported()) {
        // Use hls.js for other browsers
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
        });

        hls.loadSource(src);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          // Video is ready to play
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                setError("Network error, trying to recover...");
                hls?.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                setError("Media error, trying to recover...");
                hls?.recoverMediaError();
                break;
              default:
                setError("Fatal error: " + data.details);
                hls?.destroy();
                break;
            }
          }
        });
      } else {
        setError("Your browser doesn't support HLS playback");
      }
    };

    setupHls();

    const handleLoadedData = () => {
      setIsLoading(false);
      setDuration(video.duration);

      // Restore progress if available
      const savedTime = loadVideoProgress();
      if (savedTime !== null) {
        video.currentTime = savedTime;
        lastAllowedTimeRef.current = savedTime;
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
      lastAllowedTimeRef.current = video.currentTime;

      // Save progress periodically (throttled)
      if (saveProgress && !saveTimeoutRef.current) {
        saveTimeoutRef.current = setTimeout(() => {
          saveVideoProgress();
          saveTimeoutRef.current = null;
        }, 2000); // Save every 2 seconds
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
      // Save progress immediately when paused
      if (saveProgress) {
        saveVideoProgress();
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);

      // Clear saved progress when video ends
      if (saveProgress) {
        clearSavedProgress();
      }

      // Show completion dialog
      setShowCompletionDialog(true);

      // Call onComplete callback if provided
      if (onComplete) {
        onComplete();
      }
    };

    // Prevent seeking forward by monitoring timeupdate
    const handleSeeking = () => {
      if (video.currentTime > lastAllowedTimeRef.current) {
        video.currentTime = lastAllowedTimeRef.current;
      }
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("seeking", handleSeeking);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("seeking", handleSeeking);

      // Clear any pending save timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      if (hls) {
        hls.destroy();
      }
    };
  }, [
    src,
    onComplete,
    saveProgress,
    storageKey,
    videoRef,
    setIsLoading,
    setError,
    setDuration,
    setCurrentTime,
    setProgress,
    setIsPlaying,
    setShowCompletionDialog,
    loadVideoProgress,
    saveVideoProgress,
    clearSavedProgress,
    lastAllowedTimeRef,
    saveTimeoutRef,
  ]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch((err) => {
        console.error("Play failed:", err);
      });
    }
  }, [isPlaying, videoRef]);

  // Handle click on video to toggle play/pause
  const handleVideoClick = (e: React.MouseEvent) => {
    // Prevent click from triggering if user clicked on controls
    if (e.target === videoRef.current) {
      togglePlay();
    }
  };

  // Handle keyboard events (spacebar)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if spacebar is pressed and the container is focused or contains the active element
      if (
        e.code === "Space" &&
        (document.activeElement === container ||
          container.contains(document.activeElement))
      ) {
        e.preventDefault(); // Prevent page scrolling
        togglePlay();
      }
    };

    // Make the container focusable
    container.tabIndex = 0;

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [togglePlay]);

  // Handle fullscreen change events
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement === container ||
          // @ts-expect-error - Safari prefixed version
          document.webkitFullscreenElement === container ||
          // @ts-expect-error - Firefox prefixed version
          document.mozFullScreenElement === container ||
          // @ts-expect-error - IE/Edge prefixed version
          document.msFullscreenElement === container
      );
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

  const seekBackward = () => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = Math.max(0, video.currentTime - backwardSeekSeconds);
    video.currentTime = newTime;
    lastAllowedTimeRef.current = newTime;
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    try {
      if (!isFullscreen) {
        if (container.requestFullscreen) {
          container.requestFullscreen();
        } else if ((container as any).webkitRequestFullscreen) {
          // Safari
          (container as any).webkitRequestFullscreen();
        } else if ((container as any).mozRequestFullScreen) {
          // Firefox
          (container as any).mozRequestFullScreen();
        } else if ((container as any).msRequestFullscreen) {
          // IE/Edge
          (container as any).msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          // Safari
          (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          // Firefox
          (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          // IE/Edge
          (document as any).msExitFullscreen();
        }
      }
    } catch (error) {
      console.error("Fullscreen API error:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleProgressChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (value[0] / 100) * duration;

    // Only allow seeking backward
    if (newTime <= lastAllowedTimeRef.current) {
      video.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(value[0]);
    } else {
      // Reset to last allowed time if trying to seek forward
      setProgress((lastAllowedTimeRef.current / duration) * 100);
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className={`relative w-full h-auto  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${
          isFullscreen ? "bg-black" : ""
        }`}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <div className="text-white text-center p-4">
              <p className="text-red-400 font-medium">Error</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          className="w-full h-auto  cursor-pointer"
          poster={poster}
          muted={muted}
          playsInline
          onClick={handleVideoClick}
        />

        {/* Custom controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex flex-col gap-2">
            {/* Progress bar */}
            <div className="w-full px-1" ref={progressRef}>
              <Slider
                value={[progress]}
                min={0}
                max={100}
                step={0.1}
                onValueChange={handleProgressChange}
                className="[&>span:first-child]:h-1.5 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-primary [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                variant="ghost"
                onClick={togglePlay}
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>

              <Button
                size="icon"
                variant="ghost"
                onClick={seekBackward}
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <RotateCcw className="h-5 w-5" />
              </Button>

              <div className="text-xs text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>

              {/* Fullscreen toggle button */}
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleFullscreen}
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white ml-auto"
              >
                {isFullscreen ? (
                  <Minimize className="h-5 w-5" />
                ) : (
                  <Maximize className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Dialog */}
      <CompletionDialog
        open={showCompletionDialog}
        onOpenChange={setShowCompletionDialog}
        courseId={courseId}
      />
    </>
  );
}
