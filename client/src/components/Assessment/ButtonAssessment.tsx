import Image from "next/image";
import React from "react";

const Button = (props: {
  label: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  border?: boolean;
  style?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button
      type={props.type ? props.type : "button"}
      className={` relative bg-[#73408A] my-[0.5rem] py-[0.5rem] px-[1.5rem] mx-auto flex gap-[0.5rem] font-medium hover:bg-[#522D62] rounded ${props.border && "border-[#73408A] border-2"} ${props.style}`}
      onClick={props.onClick}
      disabled={props.disabled || false}
    >
      {props.label}
      <Image 
        src={'/images/assessment/report.svg'}
        alt="report"
        width={24}
        height={24}
      />
    </button>
  );
};

export default Button;
