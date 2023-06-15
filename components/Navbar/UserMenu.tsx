"use client";

import { AiOutlineMenu } from "react-icons/ai";

import React, { useCallback, useState } from "react";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

const UserMenu = () => {
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
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className=" absolute rounded-xl shadow-md  md:w-3/4 bg-white overflow-hidden  top-12 text-sm w-fit">
          <div className=" flex flex-col cursor-pointer  left-0">
            <>
              <MenuItem onClick={() => {}} label="Login" />
              <MenuItem onClick={() => {}} label="Sign Up" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
