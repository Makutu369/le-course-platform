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

  const storageKey = `video-progress-${courseId ? courseId + "-" : ""}${section?.id
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
        player.duration > 0 &&
        (player.duration - current <= 2 || current >= player.duration)
      ) {
        setIsCompleted(true);
        onComplete?.();
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
      className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center group"
    >
      <div className="absolute top-0 left-0 right-0 p-5 z-10 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 bg-primary" />
          <h3 className="text-white font-bold text-sm uppercase tracking-wider">{section?.title}</h3>
        </div>
      </div>

      <ReactHlsPlayer
        src={section?.videoUrl ?? ""}
        autoPlay={false}
        controls={false}
        width="100%"
        height="auto"
        playerRef={playerRef as React.RefObject<HTMLVideoElement>}
        muted={muted}
        className="w-full max-h-full object-contain"
        onEnded={() => {
          if (!isCompleted) {
            setIsCompleted(true);
          }
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 pt-12">
        {/* Progress bar */}
        <div
          ref={progressBarRef}
          className="w-full h-1 bg-white/10 mb-5 cursor-pointer relative group/progress"
          onClick={handleProgressBarClick}
        >
          <div
            className="h-full bg-primary relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white scale-0 group-hover/progress:scale-100 transition-transform" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button
              onClick={togglePlay}
              className="text-white hover:text-primary transition-all active:scale-90"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={26} fill="currentColor" /> : <Play size={26} fill="currentColor" />}
            </button>

            <button
              onClick={seekBackward}
              className="text-white/70 hover:text-white transition-all active:rotate-[-45deg]"
              aria-label={`Rewind ${backwardSeekSeconds} seconds`}
            >
              <RotateCcw size={20} />
            </button>

            <div className="text-white/80 text-xs font-mono tracking-tight">
              {formatTime(currentTime)} <span className="text-white/30 mx-1">/</span> {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleFullscreen}
              className="text-white/70 hover:text-white transition-all hover:scale-110"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
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
  );
}
