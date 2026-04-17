"use server";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getSession } from "@/lib/session";
import UserCard from "./ui/user-card";
import { cn } from "@/lib/utils";
import AuthDialogWrapper from "@/app/(components)/auth/auth-dialog-wrapper";

async function Header() {
  const session = await getSession();
  return (
    <header
      className={cn(
        "w-full border-b-2 border-border bg-background/90 backdrop-blur-xl sticky top-0 z-50"
      )}
    >
      <div className="w-full tracking-tight mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-black.png" alt="" width={140} height={46} />
        </Link>
        <div className="flex items-center gap-x-8">
          <div className="hidden gap-8 md:flex">
            <Link
              href="/courses"
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary uppercase tracking-wider"
            >
              Courses
            </Link>
            <Link
              href="#"
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary uppercase tracking-wider"
            >
              Resources
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {session?.userId ? (
              <UserCard userId={session.userId} sessionId={session.id} />
            ) : (
              <AuthDialogWrapper />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
