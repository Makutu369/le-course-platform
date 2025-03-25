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
      router.refresh();
      handleClose();
    }
  }, [state?.data, router, handleClose]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl">Video Completed</DialogTitle>
          <DialogDescription className="mt-2">
            Youve completed watching this video. Would you like to mark it as
            completed?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6">
          {state.error && (
            <div className="text-center text-destructive text-sm mb-2">
              {state.error}
            </div>
          )}
          <div className="text-center text-sm text-muted-foreground">
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
