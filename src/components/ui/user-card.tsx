"use server";
import React from "react";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./avatar";
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

async function UserCard(props: { userId: string; sessionId: string }) {
  const user = await getUser(props.userId);
  const isAdmin = user?.email === "chelseakowouvi@gmail.com"; 

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="w-32 flex items-center gap-x-4">
            <Avatar>
              <AvatarImage src={user?.profilePicture ?? ""} alt="@shadcn" />
              <AvatarFallback className="size-9">
                {user?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium">
              {user?.lastName} {isAdmin && <span className="text-red-500">(Admin)</span>}
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
