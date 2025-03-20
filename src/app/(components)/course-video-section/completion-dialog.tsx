"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { updateCourseCompleted } from "@/lib/queries/queries";
import { useRouter } from "next/navigation";
interface CompletionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId?: string;
}

export function CompletionDialog({
  open,
  onOpenChange,
  courseId,
}: CompletionDialogProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const handleUpdateProgress = async () => {
    try {
      setIsUpdating(true);
      setError(null);
      if (courseId) {
        await updateCourseCompleted({ courseId });
      }
      setIsUpdated(true);
    } catch (err) {
      console.error("Failed to update progress:", err);
      setError("Failed to update progress. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (isUpdated) {
      router.refresh();
    }
  }, [isUpdated, router]);

  const handleClose = () => {
    onOpenChange(false);
    // Reset state when dialog closes
    setTimeout(() => {
      setIsUpdated(false);
      setError(null);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Video Completed</DialogTitle>
          <DialogDescription>
            Youve completed watching this video. Would you like to
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center py-4">
          {isUpdated && (
            <div className="flex flex-col items-center gap-2 text-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <p className="text-sm text-muted-foreground">
                Progress successfully updated!
              </p>
            </div>
          )}{" "}
          {error && (
            <div className="text-center text-destructive text-sm">{error}</div>
          )}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Marking this video as completed will move you to the next session
            </p>
          </div>
        </div>

        <DialogFooter className="flex sm:justify-between">
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>

          {!isUpdated && (
            <Button
              onClick={handleUpdateProgress}
              disabled={isUpdating || isUpdated}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Progress"
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
