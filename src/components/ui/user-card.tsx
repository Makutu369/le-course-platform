"use server";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { getUser } from "@/lib/queries/queries";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./dropdown-menu";
import SignOut from "../sign-out";
import Link from "next/link";
import { ADMIN_EMAILS } from "@/lib/utils";

async function UserCard(props: { userId: string; sessionId: string }) {
  const user = await getUser(props.userId);
  const isAdmin = ADMIN_EMAILS.includes(user?.email ?? "");

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <div className="flex items-center gap-x-3 cursor-pointer">
            <Avatar className="h-9 w-9 border border-border">
              <AvatarImage src={user?.profilePicture ?? ""} alt={user?.firstName ?? "User"} />
              <AvatarFallback>
                {user?.lastName?.charAt(0) ?? user?.firstName?.charAt(0) ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium hidden sm:block">
              {user?.firstName} {isAdmin && <span className="text-red-500 text-xs ml-1">(Admin)</span>}
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {isAdmin && <DropdownMenuItem><Link href={'/admin'}>Admin Panel</Link></DropdownMenuItem>}
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <SignOut />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserCard;
