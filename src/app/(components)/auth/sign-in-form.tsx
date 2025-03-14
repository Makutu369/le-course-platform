import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleIcon from "./google-icon";
import { ActionState } from "@/lib/middleware";
import { signIn } from "@/app/(actions)/login";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

interface SignInFormProps {
  onToggleMode: () => void;
}

export function SignInForm({ onToggleMode }: SignInFormProps) {
  const { setUser } = useAuthStore();
  const [state, action, pending] = useActionState<ActionState, FormData>(
     signIn,
     {
       error: "",
       data: {},
     }
   );
 
   useEffect(() => {
     if (!pending && state.error) {
       toast.error(state.error);
     } else if (!pending && state.data) {
       toast.success("Logged In successfully.");
       setUser(state.data);
       console.log("Logged In successfully.", state.data);
     }
   }, [pending, state.error, state.data, setUser]);

  return (
    <div className="grid gap-4">
      <Button variant="secondary" className="relative">
        <GoogleIcon />
        Sign in with Google
      </Button>
      <form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid gap-2 my-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email"
            name="email"
            type="email"
            defaultValue={state.data?.email}
            placeholder="m@example.com"
          />
        </div>
        <div className="grid gap-2 my-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" 
          />
        </div>
        <Button type="submit" formAction={action} className="w-full">Sign In</Button>
      </form>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <button onClick={onToggleMode} className="underline hover:text-primary">
          Sign up
        </button>
      </div>
    </div>
  );
}
