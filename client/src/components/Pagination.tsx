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
      <p>Row per page: 6</p>
      <div className="flex justify-center items-center gap-[1rem]">
        <p>
          <span className=" font-semibold">{props.totalPage ? String(props.currentPage) : "0"}</span> out of <span className="  font-semibold">{props.totalPage ? String(props.totalPage) : "0"}</span>
        </p>
        <div className="flex">
          <button
            className="relative w-auto h-auto"
            onClick={props.onLeft}
            disabled={props.currentPage === 1}
          >
            <Image
              className="w-[50px]"
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
              className="w-[50px]"
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
