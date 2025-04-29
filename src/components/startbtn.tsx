"use client";
import React, { useActionState, useEffect } from "react";
import { Button } from "./ui/button";
import { checkAdditionalInfoAdded } from "@/lib/queries/auth";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const StartButton = () => {
  const [state, action, pending] = useActionState(checkAdditionalInfoAdded, {
    error: "",
  });

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state?.error]);
  return (
    <form>
      <Button formAction={action} size="lg" className="w-full sm:w-auto">
        {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Start Now
      </Button>
    </form>
  );
};

export default StartButton;
