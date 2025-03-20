"use client";

import { useActionState, useEffect } from "react";
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
  const router = useRouter();
  const updateUserSectionCompleted = updateCourseCompleted.bind(null, {
    courseId: courseId ?? "",
  });

  const [state, formAction, pending] = useActionState(
    updateUserSectionCompleted,
    { data: false }
  );

  useEffect(() => {
    if (state.data) {
      router.refresh();
    }
  }, [state?.data, router]);

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Video Completed</DialogTitle>
          <DialogDescription>
            Youve completed watching this video. Would you like to mark it as
            completed?
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center py-4">
          {state.data && (
            <div className="flex flex-col items-center gap-2 text-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <p className="text-sm text-muted-foreground">
                Progress successfully updated!
              </p>
            </div>
          )}{" "}
          {state.error && (
            <div className="text-center text-destructive text-sm">
              {state.error}
            </div>
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
          <form action={formAction}>
            <Button disabled={pending}>
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
