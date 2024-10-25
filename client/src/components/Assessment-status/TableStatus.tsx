"use client";

import { StudentStatusNotSendProps } from "@/types/next-general";
import Image from "next/image";
import React from "react";

const LIMIT_SIZE = 6

const TableStatus = (props: {
  thead: string[];
  children?: StudentStatusNotSendProps[];
  page?: string;
  currentPage?: number
}) => {

  const currentPage = props.currentPage || 1 
  
  return (
    <table className="relative w-full">
      <thead className="bg-[#73408A] text-[#F7F0FA]">
        <tr>
          <th scope="col" className="hidden md:table-cell py-[0.5rem]">
            No.
          </th>
          {props.thead &&
            props.thead.map((col, i) => (
              <th scope="col" className=" min-w-[10rem]" key={i}>
                {col}
              </th>
            ))}
        </tr>
      </thead>
      <tbody className=" text-center">
        {props.children &&
          props.children.map((cell, i) => (
            <tr className="border-b-[1px] border-[#73408A]" key={cell.id}>
              <td className="py-[1rem]">{i+1+(LIMIT_SIZE*(currentPage-1))}</td>
              <td>IDT-{cell.id}</td>
              <td>{cell.nameTH}</td>
              <td>{cell.nicknameTH}</td>
              <td className="md:w-1/6">
                <div className="w-[2rem] mx-auto">
                  {props.page === 'all' ? (
                    <Image
                      src={`/images/status/${
                        cell.hasAnswers
                          ? "correct-circle.svg"
                          : "cross-circle.svg"
                      }`}
                      alt="has-answer"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <>
                      {props.page === 'yes' && (
                        <Image
                          src={`/images/status/correct-circle.svg`}
                          alt="has-answer"
                          width={32}
                          height={32}
                        />
                      )}
                      {props.page === 'no' && (
                        <Image
                          src={`/images/status/cross-circle.svg`}
                          alt="has-answer"
                          width={32}
                          height={32}
                        />
                      )}
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TableStatus;
