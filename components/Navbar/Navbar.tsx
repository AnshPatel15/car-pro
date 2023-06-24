"use client";
import Link from "next/link";
import Image from "next/image";
import { User } from "@prisma/client";
import { IoMdCart } from "react-icons/io";
import UserMenu from "./UserMenu";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const router = useRouter();
  return (
    <header className={`w-full absolute z-10 transition-all duration-300 `}>
      <div>
        <nav className="max-w-[1440px] mx-auto px-6 py-4 relative">
          <div className="flex justify-between items-center">
            <Link href="/" passHref>
              <Image
                src="/logo.svg"
                alt="Car Show logo"
                width={118}
                height={18}
                className="object-contain"
              />
            </Link>

            <div className="flex justify-between items-center">
              <button
                className=" rounded-3xl bg-white mr-3"
                onClick={() => {
                  router.push("/cartPage");
                }}
              >
                <IoMdCart size={25} className=" m-2" />
              </button>
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
