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
import { SignUpForm } from "./sign-up-form";
import { useAuthStore } from "@/store/authStore";

export default function AuthDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const { user, logout } = useAuthStore()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {user?.firstName && user.firstName !== "" ? (  <div className="flex items-center gap-4">
          <span>Welcome, {user!.firstName}!</span>
          <Button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </Button>
        </div>):(<Button>Sign In</Button>)}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "signin" ? "Sign In" : "Create an Account"}
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
          <SignUpForm onToggleMode={() => setMode("signin")} />
        )}
      </DialogContent>
    </Dialog>
  );
}
