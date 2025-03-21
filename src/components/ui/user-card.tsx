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

async function UserCard(props: { userId: string; sessionId: string }) {
  const user = await getUser(props.userId);

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="w-32  flex items-center gap-x-4">
            <Avatar className="">
              <AvatarImage src={user?.profilePicture ?? ""} alt="@shadcn" />
              <AvatarFallback className="size-9">
                {user?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>{user?.lastName}</div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <SignOut />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserCard;
