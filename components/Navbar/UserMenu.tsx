"use client";

import { AiOutlineMenu } from "react-icons/ai";

import React, { useCallback, useState } from "react";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className=" relative">
      <div className=" flex flex-row items-center gap-3 w-28">
        <div
          onClick={toggleOpen}
          className=" py-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition -- text-primary-blue bg-white w-20"
        >
          <AiOutlineMenu />
          <div className=" hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className=" absolute rounded-xl shadow-md md:ml-[-20px]  md:w-32 bg-white overflow-hidden  top-12 text-sm w-fit">
          <div className=" flex flex-col cursor-pointer  left-0">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My Cart" />
                <MenuItem onClick={() => {}} label="Contact Us" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Log Out" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
