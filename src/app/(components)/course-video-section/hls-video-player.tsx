"use client";

import { useEffect, useRef, useState } from "react";
import ReactHlsPlayer from "react-hls-player";
import { Maximize, Minimize, Pause, Play, RotateCcw } from "lucide-react";
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
  const playerRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const storageKey = `video-progress-${courseId ? courseId + "-" : ""}${
    section?.id
  }`;

  // Load saved progress from localStorage
  useEffect(() => {
    if (saveProgress && playerRef.current) {
      const savedProgress = localStorage.getItem(storageKey);
      if (savedProgress) {
        const time = parseFloat(savedProgress);
        playerRef.current.currentTime = time;
        setCurrentTime(time);
      }
    }
  }, [saveProgress, storageKey]);

  // Handle video events
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const handleTimeUpdate = () => {
      const current = player.currentTime;
      setCurrentTime(current);

      if (saveProgress) {
        localStorage.setItem(storageKey, current.toString());
      }

      const progressPercent = (current / player.duration) * 100;
      setProgress(progressPercent);

      // Check if video is near completion (within 2 seconds)
      if (
        onComplete &&
        player.duration > 0 &&
        (player.duration - current <= 2 || current >= player.duration)
      ) {
        setIsCompleted(true);
        onComplete();
      }
    };

    const handleDurationChange = () => {
      setDuration(player.duration);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    player.addEventListener("timeupdate", handleTimeUpdate);
    player.addEventListener("durationchange", handleDurationChange);
    player.addEventListener("play", handlePlay);
    player.addEventListener("pause", handlePause);

    return () => {
      player.removeEventListener("timeupdate", handleTimeUpdate);
      player.removeEventListener("durationchange", handleDurationChange);
      player.removeEventListener("play", handlePlay);
      player.removeEventListener("pause", handlePause);
    };
  }, [onComplete, saveProgress, storageKey]);

  // Handle fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
    }
  };

  const seekBackward = () => {
    if (playerRef.current) {
      playerRef.current.currentTime = Math.max(
        0,
        playerRef.current.currentTime - backwardSeekSeconds
      );
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !playerRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentClicked = (clickX / rect.width) * 100;

    // Only allow seeking backward
    const targetTime = (percentClicked / 100) * duration;
    if (targetTime < currentTime) {
      playerRef.current.currentTime = targetTime;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div
      ref={playerContainerRef}
      className="relative w-full bg-black  overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 p-4 z-10 bg-gradient-to-b from-black/70 to-transparent">
        <h3 className="text-white font-medium">{section?.title}</h3>
      </div>
      <ReactHlsPlayer
        src={section?.videoUrl ?? ""}
        autoPlay={false}
        controls={false}
        width="100%"
        height="auto"
        playerRef={playerRef as React.RefObject<HTMLVideoElement>}
        muted={muted}
        className="w-full aspect-video"
        onEnded={() => setIsCompleted(true)}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        {/* Progress bar */}
        <div
          ref={progressBarRef}
          className="w-full h-1 bg-gray-600 rounded-full mb-4 cursor-pointer"
          onClick={handleProgressBarClick}
        >
          <div
            className="h-full bg-white rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="text-white hover:text-gray-300 transition"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <button
              onClick={seekBackward}
              className="text-white hover:text-gray-300 transition"
              aria-label={`Rewind ${backwardSeekSeconds} seconds`}
            >
              <RotateCcw size={20} />
            </button>

            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <button
            onClick={toggleFullscreen}
            className="text-white hover:text-gray-300 transition"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div>
        <CompletionDialog
          open={isCompleted}
          onOpenChange={() => setIsCompleted((prev) => !prev)}
          courseId={courseId ?? ""}
          sectionId={section?.id ?? ""}
        />
      </div>
    </div>
  );
}
