"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
const Header = () => {
  const path = usePathname();
  const { user, isSignedIn } = useUser();
  useEffect(() => {
    console.log(path);
  }, []);
  return (
    <div className="p-5 px-10 flex justify-between shadow-sm fixed w-full top-0 z-10 bg-white">
      <div className="flex gap-12 items-center">
        <Image src={"/logo.svg"} width={150} height={150} alt="logo" />
        <ul className="hidden md:flex gap-10">
          <Link href={"/"}>
            <li
              className={`hover:text-primary font-medium text-sm cursor-pointer ${
                path === "/" && "text-primary"
              }`}
            >
              For Sale
            </li>
          </Link>
          <Link href={"/"}>
            <li className="hover:text-primary font-medium text-sm cursor-pointer">
              For Rent
            </li>
          </Link>
          <Link href={"/"}>
            <li className="hover:text-primary font-medium text-sm cursor-pointer">
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
          <UserButton />
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
