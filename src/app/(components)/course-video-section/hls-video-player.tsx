"use client";

import type React from "react";
import { useRef, useState, useEffect, useMemo } from "react";
import ReactHlsPlayer from "react-hls-player";
import {
  Play,
  Pause,
  RotateCcw,
  Maximize,
  Minimize,
  PictureInPicture2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompletionDialog } from "./completion-dialog";

interface HLSVideoPlayerProps {
  section?: {
    id: string;
    title: string;
    videoUrl: string;
  };
  muted?: boolean;
  backwardSeekSeconds?: number;
  onComplete?: () => void;
  saveProgress?: boolean;
  courseId?: string;
}

export default function HLSVideoPlayer({
  section,
  muted = false,
  backwardSeekSeconds = 10,
  onComplete,
  saveProgress = true,
  courseId,
}: HLSVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPipActive, setIsPipActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);

  const localStorageKey = useMemo(() => `key-${section?.id}`, [section?.id]);

  // Load saved progress from localStorage
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (!section?.id) return;
      const savedProgress = localStorage.getItem(localStorageKey);
      if (savedProgress) {
        const progress = Number.parseFloat(savedProgress);
        if (!isNaN(progress) && progress < video.duration) {
          video.currentTime = progress;
          setCurrentTime(progress);
        }
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [section?.id]);

  // Save progress to localStorage
  useEffect(() => {
    if (saveProgress && currentTime > 0) {
      localStorage.setItem(localStorageKey, currentTime.toString());
    }
  }, [currentTime, saveProgress, localStorageKey]);

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
    };
  }, [onComplete]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);

      // Check if video is about to complete (2s before the end)
      if (video.duration - video.currentTime <= 2) {
        setIsCompleted(true);
        onComplete?.();
      }
    };

    const handleEnded = () => {
      onComplete?.();
      setIsCompleted(true);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [onComplete]);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Handle PiP changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePipChange = () => {
      setIsPipActive(document.pictureInPictureElement === video);
    };

    video.addEventListener("enterpictureinpicture", handlePipChange);
    video.addEventListener("leavepictureinpicture", handlePipChange);

    return () => {
      video.removeEventListener("enterpictureinpicture", handlePipChange);
      video.removeEventListener("leavepictureinpicture", handlePipChange);
    };
  }, []);

  // Play/Pause toggle
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Rewind functionality
  const handleRewind = () => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = Math.max(0, video.currentTime - backwardSeekSeconds);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    const container = playerContainerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Toggle Picture-in-Picture
  const togglePip = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } catch (error) {
      console.error("PiP error:", error);
    }
  };

  // Format time (seconds to MM:SS)
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="relative lg:w-[80%] w-full h-auto" ref={playerContainerRef}>
      <div className="relative aspect-video bg-black overflow-hidden">
        <ReactHlsPlayer
          playerRef={videoRef as React.RefObject<HTMLVideoElement>}
          src={section?.videoUrl ?? ""}
          controls={false}
          autoPlay={false}
          muted={muted}
          width="100%"
          height="auto"
          className="w-full h-full object-contain"
        />

        <div className="absolute bottom-0 left-0 right-0 text-white p-2 flex flex-col gap-2">
          <div
            className="w-full h-1 bg-gray-600 cursor-pointer"
            onClick={(e) => {
              if (!videoRef.current) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = (e.clientX - rect.left) / rect.width;
              const newTime = pos * duration;
              videoRef.current.currentTime = newTime;
              setCurrentTime(newTime);
            }}
          >
            <div
              className="h-full bg-primary"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Play/Pause button */}
              <Button
                variant={"ghost"}
                onClick={togglePlay}
                className=" rounded-full"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </Button>

              {/* Rewind button */}
              <Button
                variant="ghost"
                onClick={handleRewind}
                className=" rounded-full"
                aria-label={`Rewind ${backwardSeekSeconds} seconds`}
              >
                <RotateCcw size={20} />
              </Button>
              {/* Time display */}
              <div className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* PiP button */}
              <Button
                onClick={togglePip}
                variant={"ghost"}
                className=" rounded-full"
                aria-label={
                  isPipActive
                    ? "Exit Picture-in-Picture"
                    : "Enter Picture-in-Picture"
                }
              >
                <PictureInPicture2 size={20} />
              </Button>

              {/* Fullscreen button */}
              <Button
                variant={"ghost"}
                onClick={toggleFullscreen}
                className=" rounded-full"
                aria-label={
                  isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"
                }
              >
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </Button>
            </div>
          </div>
          <CompletionDialog
            open={isCompleted}
            onOpenChange={() => setIsCompleted((prev) => !prev)}
            courseId={courseId ?? ""}
            sectionId={section?.id ?? ""}
          />
        </div>
      </div>
    </div>
  );
}
