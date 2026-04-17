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
      info: "",
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
    if (state.error) {
      toast.error(state.error);
    }
  }, [state.error]);
  return (
    <div className="grid gap-y-2">
      <form className="flex flex-col gap-y-2">
        <div className="grid gap-y-2">
          <div className="flex gap-4">
            <div className="grid gap-2 flex-1">
              <Label htmlFor="firstName" className="font-semibold text-xs uppercase tracking-wider">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First name"
                defaultValue={state.data?.firstName}
              />
            </div>
            <div className="grid gap-2 flex-1">
              <Label htmlFor="lastName" className="font-semibold text-xs uppercase tracking-wider">Last Name</Label>
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

        <div className="grid gap-2 my-1">
          <Label htmlFor="email" className="font-semibold text-xs uppercase tracking-wider">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={state.data?.email}
            placeholder="m@example.com"
          />
        </div>

        <div className="space-y-2 my-1">
          <Label htmlFor="phone" className="font-semibold text-xs uppercase tracking-wider">Phone</Label>
          <div className="relative">
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={contact}
              onChange={handlePhoneChange}
              placeholder="0542349303"
              className="pl-20"
              required
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm">
              +233
            </div>
          </div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/50 px-1">
            10-digit ghanaian number
          </p>
        </div>

        <div className="space-y-2 my-1">
          <Label htmlFor="megaChurch" className="font-semibold text-xs uppercase tracking-wider">
            Mega Church (MC)
          </Label>
          <Select
            value={megaChurch}
            onValueChange={(value) => setMegaChurch(value)}
            required
          >
            <SelectTrigger>
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

        <div className="grid gap-2 my-1">
          <Label htmlFor="password" className="font-semibold text-xs uppercase tracking-wider">Password</Label>
          <PasswordInput id="password" name="password" />
        </div>
        <div className="grid gap-2 my-1">
          <Label htmlFor="confirmPassword" className="font-semibold text-xs uppercase tracking-wider">Confirm Password</Label>
          <PasswordInput id="confirmPassword" name="confirmPassword" />
        </div>

        <Button type="submit" formAction={action} className="mt-3 w-full h-11">
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <div>Create Account</div>
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <button onClick={onToggleMode} className="font-semibold text-primary hover:underline">
          Sign in
        </button>
      </div>
    </div>
  );
}
