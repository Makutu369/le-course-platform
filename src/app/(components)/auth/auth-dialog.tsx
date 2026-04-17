"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./signup-form";
import { MegaCenter } from "@/db/schema";

interface AuthDialogProps {
  centers: MegaCenter[];
}

export default function AuthDialog({ centers }: AuthDialogProps) {
  const megaCenters = centers;
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-2">Sign In</Button>
      </DialogTrigger>
      <DialogContent className={mode === "signup" ? "sm:max-w-[600px] lg:max-w-[850px]" : "sm:max-w-[425px]"}>
        <DialogHeader>
          <DialogTitle>
            {mode === "signin" ? "Sign In" : "Create Account"}
          </DialogTitle>
          <DialogDescription>
            {mode === "signin"
              ? "Sign in to your account to continue"
              : "Create a new account to get started"}
          </DialogDescription>
        </DialogHeader>
        {mode === "signin" ? (
          <SignInForm onToggleMode={() => setMode("signup")} />
        ) : (
          <SignUpForm
            onToggleMode={() => setMode("signin")}
            megaCenter={megaCenters}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
