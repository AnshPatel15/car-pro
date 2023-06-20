"use client";
import Link from "next/link";
import Image from "next/image";
import { User } from "@prisma/client";

import UserMenu from "./UserMenu";
import React, { useEffect, useState } from "react";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
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

            <div>
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
