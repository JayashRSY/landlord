// @ts-nocheck
"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Header = () => {
  const path = usePathname();
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-5 px-10 flex justify-between shadow-sm fixed w-full top-0 z-10 bg-white">
      <div className="flex gap-12 items-center">
        <Image src={"/logo.svg"} width={150} height={150} alt="logo" />
        <ul className="hidden md:flex gap-10">
          <Link href={"/"}>
            <li
              className={`hover:text-primary font-medium text-sm cursor-pointer ${
                path === "/" && "text-purple-500"
              }`}
            >
              For Sell
            </li>
          </Link>
          <Link href={"/rent"}>
            <li
              className={`hover:text-primary font-medium text-sm cursor-pointer ${
                path === "/rent" && "text-purple-500"
              }`}
            >
              For Rent
            </li>
          </Link>
          <Link href={"/agents"}>
            <li
              className={`hover:text-primary font-medium text-sm cursor-pointer ${
                path === "/agents" && "text-purple-500"
              }`}
            >
              Agent Finder
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex gap-2">
        <Link href={"/add-new-listing"}>
          <Button className="flex gap-2">
            <Plus />
            Post your Ad
          </Button>
        </Link>
        {isSignedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={user.imageUrl}
                width={35}
                height={35}
                className="rounded-full"
                alt=""
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/user"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/my-listings"}>My Listings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SignOutButton>Logout</SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={"/sign-in"}>
            <Button variant="outline">login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Header;
