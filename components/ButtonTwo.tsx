"use client";

import { ButtonTwoProps } from "@/types";
import React from "react";
import { IconType } from "react-icons";

const ButtonTwo = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}: ButtonTwoProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={` relative disabled disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full 
            ${outline ? "bg-white" : "bg-blue-600"}
            ${outline ? "border-black" : "border-blue-600"}
            ${outline ? "text-black" : "text-white"}
            ${small ? "py-1" : "py-3"}
            ${small ? "text-sm" : "text-md"}
            ${small ? "font-light" : "font-semibold"}
            ${small ? "border-[1px]" : "border-2"}
            `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default ButtonTwo;
