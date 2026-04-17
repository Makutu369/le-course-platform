import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleIcon from "./google-icon";
import { useActionState, useEffect } from "react";
import { ActionState } from "@/lib/middleware";
import { signIn } from "@/app/(actions)/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";

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
      <Button variant="secondary" className="relative h-11">
        <GoogleIcon />
        Sign in with Google
      </Button>
      <form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t-2 border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-3 text-muted-foreground font-semibold tracking-wider">
              Or continue with
            </span>
          </div>
        </div>
        <div className="w-full h-full flex-col flex gap-y-4 mt-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="font-semibold text-xs uppercase tracking-wider">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={signInState.data?.email}
              name="email"
              placeholder="m@example.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="font-semibold text-xs uppercase tracking-wider">Password</Label>
            <PasswordInput
              id="password"
              name="password"
              defaultValue={signInState.data?.password}
            />
          </div>
          <Button type="submit" formAction={signInFormActions} className="h-11 mt-1">
            {signInPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <p>Sign In</p>
          </Button>
        </div>
      </form>
      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <button onClick={onToggleMode} className="font-semibold text-primary hover:underline">
          Sign up
        </button>
      </div>
    </div>
  );
}
