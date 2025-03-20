import { signUp } from "@/app/(actions)/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionState } from "@/lib/middleware";
import { Loader2 } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

interface SignUpFormProps {
  onToggleMode: () => void;
}

export function SignUpForm({ onToggleMode }: SignUpFormProps) {
  const [state, action, pending] = useActionState<ActionState, FormData>(
    signUp,
    {
      error: "",
      data: {},
    }
  );

  useEffect(() => {
    if (!pending && state.error) {
      toast.error(state.error);
    }
  }, [pending, state.error]);

  return (
    <div className="grid gap-4">
      <Button variant="secondary" className="relative">
        Sign up with Google
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <form className="flex flex-col gap-y-2">
        <div className="grid gap-2">
          <div className="flex gap-4">
            <div className="grid gap-2 my-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First name"
                defaultValue={state.data?.firstName}
              />
            </div>
            <div className="grid gap-2 my-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                defaultValue={state.data?.lastName}
                type="text"
                placeholder="Last name"
              />
            </div>
          </div>
        </div>
        <div className="grid gap-2 my-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={state.data?.email}
            placeholder="m@example.com"
          />
        </div>
        <div className="grid gap-2 my-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
        </div>
        <div className="grid gap-2 my-2">
          <Label htmlFor="password">Confirm password</Label>
          <Input id="confirmPassword" name="confirmPassword" type="password" />
        </div>

        <Button type="submit" formAction={action} className="mt-3 w-full">
          {pending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <div>Create Account</div>
          )}
        </Button>
      </form>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <button onClick={onToggleMode} className="underline hover:text-primary">
          Sign in
        </button>
      </div>
    </div>
  );
}
