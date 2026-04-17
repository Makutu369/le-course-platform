"use client";
import { terminateSession } from "@/lib/session";
import { Loader2 } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const SignOut = () => {
  const [state, action, pending] = useActionState(terminateSession, {
    error: "",
  });

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state.error]);
  return (
    <form action="">
      <button
        formAction={action}
        className="px-2 py-2 mt-1 text-sm flex items-center hover:cursor-pointer font-medium hover:text-primary transition-colors w-full"
      >
        {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign out
      </button>
    </form>
  );
};

export default SignOut;
