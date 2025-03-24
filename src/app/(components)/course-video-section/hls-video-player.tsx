"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { useRef } from "react";
import ReactHlsPlayer from "react-hls-player";

interface HLSVideoPlayerProps {
  section: {
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

export default function HLSVideoPlayer({ section }: HLSVideoPlayerProps) {
  const videoRef = useRef<any>(null);

  return (
    <>
      <div className="w-[80%]">
        <ReactHlsPlayer
          playerRef={videoRef}
          src={section.videoUrl}
          controls={true}
          autoPlay={true}
          width="100%"
          height="auto"
        />
      </div>
    </>
  );
}
