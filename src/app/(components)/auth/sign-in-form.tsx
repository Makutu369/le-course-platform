import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleIcon from "./google-icon";
import { useActionState, useEffect } from "react";
import { ActionState } from "@/lib/middleware";
import { signIn } from "@/app/(actions)/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SignInFormProps {
  onToggleMode: () => void;
}

export function SignInForm({ onToggleMode }: SignInFormProps) {
  const router = useRouter();
  const [signInState, signInFormActions, signInPending] = useActionState<
    ActionState,
    FormData
  >(signIn, {});
  useEffect(() => {
    if (!signInPending && signInState.error) {
      toast.error(signInState.error);
    }
  }, [signInPending, signInState.error]);

  useEffect(() => {
    if (signInState.success) {
      router.push("courses");
    }
  }, [signInState.success, router]);
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
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
        </div>
        <Button type="submit" formAction={signInFormActions}>
          Sign In
        </Button>
      </form>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <button
          formAction={onToggleMode}
          className="underline hover:text-primary"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
