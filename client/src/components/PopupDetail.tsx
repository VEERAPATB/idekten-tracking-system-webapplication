'use client'

import React from "react";
import Button from "./Button";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface FunctionProps {
  name: string;
  disabled?: boolean
  function: () => void;
}

const PopupDetail = (props: {
  label: string;
  component?: React.ReactNode;
  function?: FunctionProps;
  onClose: () => void;
}) => {
  const searchParams = useSearchParams();
  const approvePage = searchParams.get("nav");

  return (
    <div className="w-full relative bg-[#FFFFFF] px-[4.25rem] py-[2.5rem] flex flex-col gap-[1rem] rounded-[0.625rem]">
      <div
        className=" absolute right-[1rem] top-[1rem] cursor-pointer"
        onClick={props.onClose}
      >
        <Image
          src={"/images/cross-line.svg"}
          alt="exit"
          width={24}
          height={24}
        />
      </div>
      <h1 className="text-[2.25rem] text-center">{props.label}</h1>
      {props.component}
      <div className="flex gap-[1rem]">
        <Button
          label="ย้อนกลับ"
          border
          style="rounded-lg py-[0.25rem] text-[#73408A] hover:border-[#522D62] hover:text-[#522D62]"
          onClick={props.onClose}
        />
        <Button
          label="อนุมัติ"
          disabled={props.function?.disabled}
          border={!props.function?.disabled}
          style={`rounded-lg bg-[#73408A] text-[#FFFFFF] py-[0.25rem] ${
            props.function?.disabled
                          ? "bg-[#9B9B9B]"
                          : "bg-[#73408A] hover:bg-[#522D62]"
                      }`}
          onClick={props.function?.function}
        />
      </div>
    </div>
  );
};

export default PopupDetail;
