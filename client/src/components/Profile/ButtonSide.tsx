import Image from "next/image";
import React from "react";

const ButtonSide = (props: { text: string; icon: string }) => {
  return (
    <button className="flex-grow-0 flex-shrink-0 w-[100%] h-[53px] relative rounded-lg">
      <div className="w-[100%] h-[5rem]">
        <div className="icon-img w-[50px] h-[50px] absolute left-[5.5px] top-[6.5px] object-cover">
          <Image src={props.icon} alt="icon" fill />
        </div>
        <p className="relative w-[2rem] left-[5rem] pt-[1rem] my-auto text-[1.2rem] font-bold text-left text-[#80408b]">
          {props.text}
        </p>
      </div>
    </button>
  );
};

export default ButtonSide;
