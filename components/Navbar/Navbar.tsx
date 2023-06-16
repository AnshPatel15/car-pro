"use client";
import Link from "next/link";
import Image from "next/image";
import { User } from "@prisma/client";

import CustomButton from "../CustomButton";
import UserMenu from "./UserMenu";
import React from "react";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div>
      <header className=" w-full absolute z-10">
        <nav className=" max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
          <Link href="/" className="flex justify-center items-center">
            <Image
              src="/logo.svg"
              alt="Car Show logo"
              width={118}
              height={18}
              className="object-contain"
            />
          </Link>

          {/* <CustomButton
            title="Sign In"
            btnType="button"
            containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
            onClick={() => {}}
          /> */}
          <UserMenu currentUser={currentUser} />
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
