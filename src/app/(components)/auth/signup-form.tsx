"use client";

import { signUp } from "@/app/(actions)/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { ActionState } from "@/lib/middleware";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

type MegaCenter = {
  id: string;
  name: string;
};

interface SignUpFormProps {
  onToggleMode: () => void;
  megaCenter: MegaCenter[];
}

export function SignUpForm({ onToggleMode, megaCenter }: SignUpFormProps) {
  const [state, action, pending] = useActionState<ActionState, FormData>(
    signUp,
    {
      error: "",
      data: {},
    }
  );

  const [megaChurch, setMegaChurch] = useState("");
  const [contact, setContact] = useState("");

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value.replace(/\D/g, ""); // only numbers
    state.data.phone = input;
    setContact(input);
  }

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

        <div className="space-y-2">
          <div className="flex items-center space-x-2 mb-1.5">
            <Label htmlFor="phone">Phone</Label>
          </div>
          <div className="relative">
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={contact}
              onChange={handlePhoneChange}
              placeholder="0542349303"
              className="pl-20 transition-all border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary/20"
              required
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              +233
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Enter your 10-digit phone number
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 mb-1.5">
            <Label htmlFor="megaChurch" className="font-medium">
              Mega Church (MC)
            </Label>
          </div>
          <Select
            value={megaChurch}
            onValueChange={(value) => setMegaChurch(value)}
            required
          >
            <SelectTrigger className="...">
              <SelectValue placeholder="Select your Mega Church" />
            </SelectTrigger>
            <SelectContent>
              {megaCenter.map((mc) => (
                <SelectItem key={mc.id} value={mc.id}>
                  {mc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <input type="hidden" name="megaCenters" value={megaChurch} />
        </div>

        <div className="grid gap-2 my-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput id="password" name="password" />
        </div>
        <div className="grid gap-2 my-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <PasswordInput id="confirmPassword" name="confirmPassword" />
        </div>

        <Button type="submit" formAction={action} className="mt-3 w-full">
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <div>Create Account</div>
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
