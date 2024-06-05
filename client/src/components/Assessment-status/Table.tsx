"use client";

import React from "react";
import { StatusProps } from "@/types/next-general";
import Button from "../Button";
interface FunctionProps {
  name: string;
  function: (id: number, classId: number) => void;
}

const LIMIT_SIZE = 6;

const Table = (props: {
  thead: string[];
  children?: StatusProps[];
  function?: FunctionProps[];
  hasFunction: boolean;
  currentPage?: number;
}) => {
  const page = props.currentPage || 1;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-max lg:w-full">
        <thead className="bg-[#73408A] text-[#F7F0FA]">
          <tr>
            <th scope="col" className="table-cell py-[0.5rem] px-[0.5rem]">
              No.
            </th>
            <th scope="col" className=" hidden md:table-cell">
              สาขา
            </th>
            <th scope="col" className="px-[0.5rem]">
              วิชา
            </th>
            <th scope="col">
              สัปดาห์
            </th>
            <th scope="col" className="px-[0.5rem]">
              ยังไม่อนุมัติ
            </th>
            <th scope="col" className="px-[0.5rem]">
              ขาดส่งประเมิน
            </th>
            <th scope="col">
            </th>
          </tr>
        </thead>
        <tbody className=" text-center">
          {props.children &&
            props.children.map((cell, i) => (
              <tr className="border-b-[1px] border-[#73408A]" key={cell.id}>
                <td className="py-[1rem]">{i + 1 + LIMIT_SIZE * (page - 1)}</td>
                <td className=" hidden md:table-cell">{cell.branch}</td>
                <td className=" px-[1rem]">{cell.topic}</td>
                <td className=" px-[1rem]">{cell.week}</td>
                <td className=" px-[0.5rem]">{cell.apporveFeedbackCount || 0}</td>
                <td className=" text-[#D64F4F] px-[0.5rem]">{cell.Missing}</td>
                {props.hasFunction && (
                  <td className=" md:w-1/6 px-[0.5rem]">
                    <div className="flex gap-[0.5rem] w-full mx-auto justify-center">
                      <div className="">
                        <Button
                          label={props.function ? props.function[0].name : ""}
                          style="text-[#F3F3F3] px-[1rem] bg-[#73408A] py-[0.5rem] hover:bg-[#522D62]"
                          images="/images/status/info.svg"
                          onClick={() =>
                            props.function &&
                            props.function[0].function(cell.id, cell.class)
                          }
                        />
                      </div>
                      <div className="">
                        <Button
                          label={props.function ? props.function[1].name : ""}
                          style="text-[#F3F3F3] px-[1rem] bg-[#73408A] py-[0.5rem] hover:bg-[#522D62]"
                          images="/images/status/report-correct.svg"
                          onClick={() =>
                            props.function &&
                            props.function[1].function(cell.id, cell.class)
                          }
                        />
                      </div>
                    </div>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
