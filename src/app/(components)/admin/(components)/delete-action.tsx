"use client";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteUserById } from "@/lib/queries/queries";
import { Loader2, TriangleAlert } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export function DeleteDialog(props: { userId: string; courseId: string }) {
  const deleteWithId = deleteUserById.bind(null, {
    id: props.userId,
    courseId: props.courseId,
  });
  const [state, formAction, pending] = useActionState(deleteWithId, {
    data: "",
    error: false,
  });

  useEffect(() => {
    if (state.error) {
      toast.error("An error occurred while deleting the user.");
    } else if (state.data && !state.error) {
      toast.success(state.data);
    }
  }, [state.data, state.error]);

  return (
    <>
      <DialogTrigger asChild className="cursor-pointer">
        <div className="grow text-red-500 px-2 text-sm ">Delete User</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TriangleAlert />
            <span>This action cannot be undone.</span>
          </DialogTitle>
          <DialogDescription>
            <span>Are you sure you want to delete the user user?</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form action={formAction}>
            <Button variant={"destructive"} disabled={pending}>
              {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete User
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </>
  );
}
