'use client'

import Image from "next/image";
import React from "react";

const Button = (props: {
  label: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  border?: boolean;
  style?: string;
  images?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button
      type={props.type ? props.type : "button"}
      className={`relative w-full flex gap-[0.5rem] justify-center font-medium rounded ${props.border && "border-[#73408A] border-2"} ${props.style}`}
      onClick={props.onClick}
      disabled={props.disabled || false}
    >
      {props.label}
      {props.images && (
        <Image 
          src={props.images}
          alt="logo-button"
          width={24}
          height={24}
        />
      )}
    </button>
  );
};

export default Button;
