"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import InputText from "@/components/InputText";
import Button from "@/components/Button";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { AxiosError } from 'axios'
import BlurBack from "@/components/BlurBack";
import router from "next/router";

const ERROR_MSG = {
  user_error:
    "ตรวจสอบข้อมูลและลองอีกครั้ง ติดต่อฝ่ายสนับสนุนหากต้องการความช่วยเหลือ",
  server_error: "ลองใหม่ภายหลัง ติดต่อฝ่ายสนับสนุนหากปัญหายังคงอยู่",
};

function page() {

  const [visiblePass, setVisiblePass] = useState(false);
  const [OldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passed, setPassed] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setLoading] = useState(false);
  const axiosAuth = useAxiosAuth();
  

  const handleSendRequest = async () => {
    setLoading(true);
    try {
      const { status } = await axiosAuth.put(
        `/api/change-password`,
        {
          newPassword: password, currentPassword: OldPassword
        }
      );
      if (status >= 200 && status < 300) {
        router.push('/')
      }
    } catch (error) {
      const e: AxiosError = error;
      if (e.response?.status && e.response.status === 500) {
        setError(ERROR_MSG.server_error);
      } else {
        setError(ERROR_MSG.user_error);
      }
    }
    setLoading(false);
  };
  
  useEffect(() => {
    if(password === confirm && password.length >= 8){
        setPassed(true)
    }else{
        setPassed(false)
    }
}, [confirm, password])

  return (
    <>
      {isLoading && (
        <div className="">
          <BlurBack open />
          <div className=" absolute w-[100px] mx-auto top-1/2 left-1/2 -translate-x-1/2  z-[100]">
            <canvas className=" absolute loader w-[100px] mx-auto"></canvas>
          </div>
        </div>
      )}
      <div className="container my-28 relative w-[21rem] md:w-[42rem] bg-[#F3F3F3] mx-auto flex flex-col gap-[10rem] py-[3rem] px-[3rem] md:px-[7rem] rounded-[0.625rem] shadow-[10px_10px_10px_0px_rgba(0,0,0,0.25)]">
        <Image
          src={"/images/logo/idektep-192.png"}
          alt="logo-idektep"
          width={64}
          height={64}
          className=" absolute left-[1rem] top-[1rem] hidden md:flex"
        />
        <div className="text-center">
          <h1 className=" text-[2.25rem] font-medium">เปลี่ยนรหัสผ่าน</h1>
          <p>โปรดกรอกรหัสผ่านใหม่ของท่านให้ถูกต้องตามเงื่อนไข</p>
        </div>
        {error && (
          <p className="text-[#D64F4F] absolute top-[13.5rem] font-semibold w-[15rem] md:w-[25rem]">
            {error}
          </p>
        )}
        <div className="flex flex-col gap-[2rem]">
          <div className="รหัสผ่านเก่า relative flex flex-col gap-[0.35rem]">
            <div
              className=" cursor-pointer z-[100]"
              onClick={() => setVisiblePass((prev) => !prev)}
            >
              <Image
                src={`/images/signIn/input/${
                  visiblePass ? "visible-eye.svg" : "invisible-eye.svg"
                }`}
                width={24}
                height={24}
                alt="visible-eye"
                className=" absolute right-0 top-[1rem]"
              />
            </div>
            <InputText
              name="Old-pass"
              label="รหัสผ่านเดิม"
              type={visiblePass ? "text" : "password"}
              value={OldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <label htmlFor="new-pass" className=" text-sm">
              อย่างน้อยรหัส 8 ตัวขึ้นไป
            </label>
          </div>
          <div className=" relative flex flex-col gap-[0.35rem]">
            <div
              className=" cursor-pointer z-[100]"
              onClick={() => setVisiblePass((prev) => !prev)}
            >
              <Image
                src={`/images/signIn/input/${
                  visiblePass ? "visible-eye.svg" : "invisible-eye.svg"
                }`}
                width={24}
                height={24}
                alt="visible-eye"
                className=" absolute right-0 top-[1rem]"
              />
            </div>
            <InputText
              name="new-pass"
              label="รหัสผ่านใหม่"
              type={visiblePass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="new-pass" className=" text-sm">
              อย่างน้อยรหัส 8 ตัวขึ้นไป
            </label>
          </div>
          <div className=" relative flex flex-col gap-[0.35rem]">
            <InputText
              name="confirm-pass"
              label="ยืนยันรหัสผ่าน"
              type={visiblePass ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <label htmlFor="confirm-pass" className=" text-sm">
              ต้องเหมือนกับรหัสผ่าน
            </label>
          </div>
        </div>
        <div className="mx-auto md:w-full">
          <Button
            label="ยืนยัน"
            style={`${
              passed ? "bg-[#73408A] hover:bg-[#522D62]" : "bg-[#9B9B9B]"
            } px-[4.5rem] py-[0.5rem] text-[#FFFFFF] text-[1.25rem]`}
            disabled={!passed}
            onClick={() => handleSendRequest()}
          />
        </div>
      </div>
    </>
  );
}

export default page;
