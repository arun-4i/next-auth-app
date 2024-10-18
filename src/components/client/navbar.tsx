"use client";

import Link from "next/link";
import { Squirrel, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { userDetails } from "@/actions/login";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

interface UserData {
  name: string;
  email: string;
  sub: string;
  iat: number;
  exp: number;
  jti: string;
}

export default function Navbar() {
  const [userData, setUserData] = useState<UserData|null>({});

useEffect(() => {
  const fetchUserData = async () => {
    const response:UserData = await userDetails();
    setUserData(response);
    // console.log("response: ", response);
  }
  fetchUserData();
},[]);

  useEffect(() => {
    // console.log("Updated userData:", userData);
  }, [userData]);


  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center space-x-2">
          <Squirrel className="h-6 w-6 " />
          <span className="font-bold text-xl">NextJS App</span>
        </Link>
      </div>
      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 border-none rounded-full"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback>{userData?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userData?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userData?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/profile"} className="flex">
              <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button onClick={() => signOut({callbackUrl: "/"
              })} variant={"ghost"}>Log out</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ModeToggle />
      </div>
    </nav>
  );
}
