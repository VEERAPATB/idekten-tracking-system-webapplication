'use client'

import { CellStatusNotApproveProps } from "@/types/next-general";
import React from "react";
import Button from "../Button";
import { useSearchParams } from "next/navigation";

interface FunctionProps {
  name: string;
  disabled?: boolean;
  function: ({ cell }: { cell: CellStatusNotApproveProps | undefined }) => void;
}

const LIMIT_SIZE = 6

const TableApprove = (props: {
  thead: string[];
  children?: CellStatusNotApproveProps[];
  function: FunctionProps[];
  currentPage?: number
}) => {

  const page = Number(props.currentPage || 1)

  return (
    <table className="relative w-full">
      <thead className="bg-[#73408A] text-[#F7F0FA]">
        <tr>
          <th scope="col" className="hidden md:table-cell py-[0.5rem]">
            No.
          </th>
          {props.thead &&
            props.thead.map((col, i) => (
              <th scope="col" key={i}>
                {col}
              </th>
            ))}
        </tr>
      </thead>
      <tbody className=" text-center">
        {props.children &&
          props.children.map((cell, i) => (
            <tr className="border-b-[1px] border-[#73408A]" key={cell.id}>
              <td className="py-[1rem]">{i+1+(LIMIT_SIZE*(page-1))}</td>
              <td>{cell.date}</td>
              <td>{cell.student.name}</td>
              <td>{cell.employee.name}</td>
              <td>{cell.feedback.substring(0, 18)}...</td>
              <td className="md:w-1/6">
                <div className="flex gap-[0.5rem] w-full mx-auto justify-center">
                  <div>
                    <Button
                      label={props.function[0].name}
                      style="text-[#F3F3F3] px-[1rem] bg-[#73408A] py-[0.5rem] hover:bg-[#522D62]"
                      images="/images/status/info.svg"
                      onClick={() => props.function[0].function({ cell })}
                    />
                  </div>
                  <div>
                    <Button
                      label={props.function[1].name}
                      style={`text-[#F3F3F3] px-[1rem] py-[0.5rem] ${
                        props.function[1].disabled
                          ? "bg-[#9B9B9B]"
                          : "bg-[#73408A] hover:bg-[#522D62]"
                      }`}
                      images="/images/status/correct-symbol.svg"
                      onClick={() =>
                        props.function[1].function({ cell })
                      }
                      disabled={props.function[1].disabled}
                    />
                  </div>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TableApprove;
