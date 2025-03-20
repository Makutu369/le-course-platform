"use server";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import AuthDialog from "../app/(components)/auth/auth-dialog";
import { getSession } from "@/lib/session";
import UserCard from "./ui/user-card";

async function Header() {
  const session = await getSession();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full tracking-tight mx-auto px-6 sm:px-9 lg:px-12 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-black.png" alt="" width={150} height={50} />
        </Link>

        <div className="flex items-center gap-x-14">
          {" "}
          <div className="hidden gap-6 md:flex">
            <Link
              href="/courses"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              courses
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Resources
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {session?.userId ? (
              <UserCard userId={session.userId} sessionId={session.id} />
            ) : (
              <AuthDialog />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
