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
            <Avatar className="h-9 w-9 ">
              <AvatarImage src={user?.profilePicture ?? ""} alt={user?.firstName ?? "User"} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm rounded-full">
                {user?.lastName?.charAt(0) ?? user?.firstName?.charAt(0) ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm font-semibold hidden sm:block tracking-tight">
              {user?.firstName} {isAdmin && <span className="text-primary text-[10px] ml-1 uppercase tracking-wider font-bold">Admin</span>}
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-2">
          <DropdownMenuLabel className="font-bold text-xs uppercase tracking-wider">My Account</DropdownMenuLabel>
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
