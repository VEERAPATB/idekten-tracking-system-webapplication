"use client";

import Image from "next/image";
import React from "react";
import Button from "../Button";

type ButtonProps = {
  name: string;
  onClick: () => void;
  disabled?: boolean
};

const Popup = (props: {
  label: string;
  description: string;
  buttonFunction: ButtonProps[];
  optionalDisplay?: React.ReactNode;
  onClose: () => void
}) => {
  return (
    <div className="w-full">
      <button onClick={props.onClose} className="absolute right-[1rem] top-[1rem]">
        <Image
          src={"/images/cross-line.svg"}
          alt="cross-line"
          width={24}
          height={24}
        />
      </button>
      <div className="px-[1rem] py-[3rem] bg-[#ffffff] w-[21.5rem] lg:w-[34rem] h-[36.5rem] flex flex-col justify-between rounded-[0.625rem]">
        <div className="flex flex-col gap-[1.5rem]">
          <h5 className=" text-lg font-medium">{props.label}</h5>
          <p className=" text-sm">
            {props.description}
          </p>
          <div>{props.optionalDisplay && props.optionalDisplay}</div>
        </div>
        <div className="grid grid-cols-2 gap-[2.5rem]">
          <div>
            <Button
              label={props.buttonFunction[0].name}
              onClick={(e) => {
                e.preventDefault()
                props.buttonFunction[0].onClick()
              }}
              style="text-[#73408A] hover:border-[#522D62] hover:text-[#522D62] py-[0.5rem]"
              disabled={props.buttonFunction[0].disabled !== undefined ? !props.buttonFunction[0].disabled : false}
              border={true}
            />
          </div>
          <div>
            <Button
              label={props.buttonFunction[1].name}
              onClick={(e) => {
                e.preventDefault()
                props.buttonFunction[1].onClick()
              }}
              border
              disabled={props.buttonFunction[1].disabled !== undefined ? !props.buttonFunction[1].disabled : false}
              style={`${(props.buttonFunction[1].disabled !== undefined ? props.buttonFunction[1].disabled : true) ? "bg-[#73408A] hover:bg-[#522D62]" : "bg-[#9B9B9B]"} text-[#F3F3F3] py-[0.5rem]`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
