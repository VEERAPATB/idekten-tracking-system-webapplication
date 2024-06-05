import React from "react";
import Image from "next/image";

interface FunctionProps{
  name: string,
  fn: () => void
}

const PopupDetail = (props: {
  component?: React.ReactNode;
  function?: FunctionProps
  onClose: () => void;
}) => {
  return (
    <div className="w-5/6 md:w-2/3 lg:w-1/2 relative bg-[#FFFFFF] md:px-[4.25rem] px-8 py-[50px] md:py-[2.5rem] flex flex-col rounded-[0.625rem]">
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
      {/* <h1 className="text-[2.25rem] text-center pt-3 border-t-2 border-black border-x-2">{props.label}</h1> */}
      {props.component}
    </div>
  );
};

export default PopupDetail;