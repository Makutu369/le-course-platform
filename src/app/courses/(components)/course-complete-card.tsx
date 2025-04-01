"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trophy, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import ReactConfetti from "react-confetti";

export default function CourseCompletedPage() {
  const [progress, setProgress] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Handle window resize for confetti
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Animate progress bar
    const timer = setTimeout(() => setProgress(100), 300);

    // Hide confetti after 5 seconds
    const confettiTimer = setTimeout(() => setShowConfetti(false), 5000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
      clearTimeout(confettiTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.15}
          colors={["#4F46E5", "#10B981", "#F59E0B", "#EF4444"]}
        />
      )}

      <div className="w-full max-w-md ">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative w-20 h-20 mb-2">
              <div className="absolute inset-0 rounded-full bg-primary/10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Well Done!
              </h1>
              <p className="text-lg text-muted-foreground">
                You have completed the course
              </p>
            </div>

            <div className="w-full space-y-2 py-4">
              <div className="flex justify-between text-sm font-medium">
                <span>Course Progress</span>
                <span>100% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="pt-4 w-full">
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/courses">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
