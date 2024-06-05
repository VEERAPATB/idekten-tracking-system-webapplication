'use client'

import Image from "next/image";
import React, { ChangeEvent } from "react";

const SearchBar = (props: {
  onSelect: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}) => {

  return (
    <div className="relative w-full text-[#3D3C3C] border-[1px] border-[#3D3C3C] rounded-[0.625rem]">
      <div className="relative">
        <Image
          className="absolute top-1/2 left-[0.75rem] -translate-y-1/2"
          src={"/images/assessment/mag_glasses.svg"}
          alt="search-icon"
          width={27}
          height={27}
        />
        <input
          onChange={props.onSelect}
          type="text"
          autoComplete="off"
          className=" bg-[#F3F3F3] outline-none w-full px-[2.75rem] py-[0.5rem] rounded-[0.625rem]"
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
};

export default SearchBar;
