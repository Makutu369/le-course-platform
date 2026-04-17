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
          colors={["#7C3AED", "#10B981", "#F59E0B", "#EF4444"]}
        />
      )}

      <div className="w-full max-w-md border-2 border-border bg-card">
        <CardContent className="p-8 md:p-10">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-primary/10 flex items-center justify-center">
              <Trophy className="w-10 h-10 text-primary" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                Well Done!
              </h1>
              <p className="text-base text-muted-foreground">
                You have completed the course
              </p>
            </div>

            <div className="w-full space-y-2 py-4">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span>Course Progress</span>
                <span className="text-primary">100% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="pt-4 w-full">
              <Button variant="outline" className="w-full border-2" asChild>
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
