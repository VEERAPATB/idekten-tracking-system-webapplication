"use client";

import Image from "next/image";
import React from "react";

const Pagination = (props: {
  totalPage?: number;
  currentPage: number;
  onLeft: () => void;
  onRight: () => void;
  style?: string
}) => {

  return (
    <div className=" relative w-full flex justify-between items-center">
      <p className="hidden md:block" >Row per page: 6</p>
      <div className="flex justify-between md:justify-end w-full md:w-auto gap-[1rem]">
        <div className="flex flex-col gap-[0.75rem] justify-center">
          <p className="">
            <span className=" font-semibold">{props.totalPage ? String(props.currentPage) : "0"}</span> out of <span className="  font-semibold">{props.totalPage ? String(props.totalPage) : "0"}</span>
          </p>
          <p className=" text-sm md:hidden">Row per page: 6</p>
        </div>
        <div className="flex">
          <button
            className="relative w-auto h-auto"
            onClick={props.onLeft}
            disabled={props.currentPage === 1}
          >
            <Image
              className="md:w-[50px] w-[60px]"
              src={"/images/arrow/arrow_left.svg"}
              alt="arrow-left"
              width={0}
              height={0}
            />
          </button>
          <button
            className="relative h-auto w-auto"
            onClick={props.onRight}
            disabled={props.currentPage === props.totalPage || props.totalPage === 0}
          >
            <Image
              className="md:w-[50px] w-[60px]"
              src={"/images/arrow/arrow_right.svg"}
              alt="arrow-left"
              width={0}
              height={0}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
