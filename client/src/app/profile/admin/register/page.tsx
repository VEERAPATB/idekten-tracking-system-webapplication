"use client";

import BlurBack from "@/components/BlurBack";
import Button from "@/components/Button";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

const page = () => {
  const axiosAuth = useAxiosAuth()
  const textStudentRef = useRef<HTMLInputElement | null>(null);
  const textEmployeeRef = useRef<HTMLInputElement | null>(null);
  const [isCopy, setCopy] = useState(false);
  const [isLoading, setLoading] = useState(false)

  const copyToClipboard = (
    ref: React.MutableRefObject<HTMLInputElement | null>
  ) => {
    if (ref.current === null) return;

    const copyText = ref.current.value;
    ref.current.select()
    navigator.clipboard.writeText(copyText);

    setCopy(true);
    setTimeout(() => {
        setCopy(false)
    }, 500);
  };

  const fetchNewURL = async (role: string, e: React.MouseEvent) => {
    if(!textEmployeeRef.current || !textStudentRef.current) return
    
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axiosAuth.get(`/api/link/${role}`)
      if(role === 'st'){
        textStudentRef.current.value = data.link.toString()
      }else{
        textEmployeeRef.current.value = data.link.toString()
      }
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  };

  return (
    <>
      {isLoading && (
          <>
            <BlurBack open />
            <div className="">
              <div className=" absolute w-[100px] mx-auto top-1/2 left-1/2 -translate-x-1/2  z-[100]">
                <canvas className=" absolute loader w-[100px] mx-auto"></canvas>
              </div>
            </div>
          </>
        )}
      <div className=" mx-[1rem] md:container md:mx-auto mt-[5rem] bg-[#FFFFFF] px-[1.5rem] py-[3rem] rounded-[0.625rem] flex flex-col gap-[2rem]">
        <div
          className={`absolute top-[4rem] left-1/2 -translate-x-1/2 bg-[#F3F3F3] px-[1rem] py-[0.5rem] z-[100] rounded-lg transition-all ${isCopy ? 'opacity-100' : 'opacity-0'}`}
        >
          <p className="">ทำการคัดลอดแล้ว!</p>
        </div>
        <div>
          <h1 className=" text-[2.25rem] text-left">
            สร้างลิงก์
            <br className="md:hidden" />
            ในการสมัคร
          </h1>
          <p className=" text-sm">
            ลิ้งที่ได้ทำการสร้างจะสามารถใช้ได้ <br /> ภายใน 1 ชั่วโมง
            หลังจากได้ทำการสร้างขึ้นมา
          </p>
        </div>
        <div className="flex flex-col gap-[1rem]">
          <div className="student w-full border-2 border-[#b8b8b8] py-[1rem] px-[0.5rem] flex flex-col gap-[1.25rem] rounded-md">
              <div className="flex justify-between">
              <div className="flex items-center gap-[1rem] font-medium">
                  <Image
                  className="w-[50px] h-[50px]"
                  src={"/images/signup/student-icon.svg"}
                  width={0}
                  height={0}
                  alt="student-icon"
                  />
                  <h3 className=" text-xl">นักเรียน</h3>
              </div>
              <button className="px-[1rem] py-[1rem] bg-[#73408A] text-white rounded" onClick={(e) => fetchNewURL('st',e)}>
                  สร้างลิงก์
              </button>
              </div>
              <div
              onClick={(e) => copyToClipboard(textStudentRef)}
              className=" flex bg-[#d6d6d6] justify-between items-center px-[0.5rem] rounded-md cursor-pointer"
              >
              <input
                  id="copy"
                  ref={textStudentRef}
                  type="text"
                  defaultValue={"ลิ้งในการสมัครของนักเรียน"}
                  readOnly
                  value={textStudentRef.current?.value}
                  className=" py-[0.5rem] outline-none w-full bg-inherit cursor-pointer text-[#757575]"
              />
              <Image
                  className={`h-[25px] w-[25px] hover:h-[30px] hover:w-[30px] transition-all`}
                  height={0}
                  width={0}
                  src={"/images/signup/copy-to-clipboard.svg"}
                  alt="copy"
              />
              </div>
          </div>
          <div className="employee w-full border-2 border-[#b8b8b8] py-[1rem] px-[0.5rem] flex flex-col gap-[1.25rem] rounded-md">
              <div className="flex justify-between">
              <div className="flex items-center gap-[1rem] font-medium py-[0.25rem] px-[0.5rem]">
                  <Image
                  className="w-[50px] h-[50px]"
                  src={"/images/signup/employee-icon.svg"}
                  width={0}
                  height={0}
                  alt="student-icon"
                  />
                  <h3 className=" text-xl">พนักงาน</h3>
              </div>
              <button className="px-[1rem] bg-[#73408A] text-white rounded" onClick={(e) => fetchNewURL('em',e)}>
                  สร้างลิงก์
              </button>
              </div>
              <div
              onClick={(e) => copyToClipboard(textEmployeeRef)}
              className=" flex bg-[#d6d6d6] justify-between items-center px-[0.5rem] rounded-md cursor-pointer"
              >
              <input
                  id="copy"
                  ref={textEmployeeRef}
                  type="text"
                  defaultValue={'ลิ้งในการสมัครของพนักงาน'}
                  readOnly
                  value={textEmployeeRef.current?.value}
                  className=" py-[0.5rem] outline-none w-full bg-inherit cursor-pointer text-[#757575]"
              />
              <Image
                  className={`h-[25px] w-[25px] hover:h-[30px] hover:w-[30px] transition-all`}
                  height={0}
                  width={0}
                  src={"/images/signup/copy-to-clipboard.svg"}
                  alt="copy"
              />
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
