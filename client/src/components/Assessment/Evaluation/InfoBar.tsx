'use client'

import { StudentContext } from "@/lib/context/StudentContext";
import { PageProps } from "@/types/next-general";
import React, { useContext, useEffect, useState } from "react";

const InfoBar = (props: PageProps) => {
  const { state } = useContext(StudentContext) 
  const [isClient, setIsClient] = useState(false)

  const assessmentPage = Number(props.searchParams?.p || 1)
  const studentIdt = Number(props.searchParams?.idt)
  const interestStudent = state.studentSelected.find(val => val.id === studentIdt)
  const totalStudents = state.studentSelected.length

  const assessmentName = decodeURI(String(props.searchParams?.n))

  useEffect(() => {
    setIsClient(true)
  },[])

  return (
    <>
      <div className="pagination w-full h-[0.375rem] flex justify-center gap-2">
        {isClient && totalStudents > 0 && state.studentSelected.map((_,i) => (
          <div key={i} className={`${assessmentPage-1 === i ? "bg-[#73408A]" : "bg-[#9B9B9B]"} w-8 h-[0.375rem]`}></div>
        ))}
      </div>
      <div className="topic flex flex-col gap-[0.5rem] bg-[#73408A] container mx-auto mt-6 text-white py-4 px-2 text-sm leading-snug">
        <h3 className=" text-lg">
          {assessmentName}
        </h3>
        {isClient && (
          <p className=" text-lg font-medium">
            นักเรียน: IDT-{interestStudent?.id} | {interestStudent?.nicknameTH} {" "}
            ({interestStudent?.nameTH}){" "}
          </p>
        )}
      </div>
    </>
  );
};

export default InfoBar;
