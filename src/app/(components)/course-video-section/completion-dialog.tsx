"use client";

import { useActionState, useEffect } from "react";
import { Loader2 } from "lucide-react";
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
  courseId: string;
  sectionId: string;
}

export function CompletionDialog({
  open,
  onOpenChange,
  courseId,
  sectionId,
}: CompletionDialogProps) {
  const router = useRouter();
  const updateUserSectionCompleted = updateCourseCompleted.bind(null, {
    courseId: courseId ?? "",
    sectionId: sectionId ?? "",
  });

  const [state, formAction, pending] = useActionState(
    updateUserSectionCompleted,
    { data: false }
  );

  const handleClose = () => {
    onOpenChange(false);
  };

  useEffect(() => {
    if (state.data) {
      handleClose();
    }
  }, [state?.data, router, handleClose]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center w-14 h-14 bg-primary/10 mx-auto mb-4">
            <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <DialogTitle className="text-xl">Video Completed</DialogTitle>
          <DialogDescription className="mt-2">
            You&apos;ve completed watching this video. Would you like to mark it as
            completed?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-4">
          {state.error && (
            <div className="text-center text-destructive text-sm mb-2 font-medium">
              {state.error}
            </div>
          )}
          <div className="text-center text-xs text-muted-foreground uppercase tracking-wider font-semibold">
            <p>Move to the next session</p>
          </div>
        </div>

        <DialogFooter className="flex justify-center sm:justify-end mt-2">
          <form action={!state.data ? formAction : undefined}>
            <Button disabled={pending} className="w-full sm:w-auto">
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Progress"
              )}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
