'use client'

import Button from "@/components/Button";
import InputText from "@/components/InputText";
import { PageProps } from "@/types/next-general";
import React, { useState } from "react";
import axios from "@/lib/axios";
import { AxiosError } from "axios";
import BlurBack from "@/components/BlurBack";
import PopupEmail from "@/components/Verify/PopupEmail";
import Image from "next/image";

const ForgotPage = (props: PageProps) => {
  const [email,setEmail] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [passed, setPassed] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const { status } =  await axios.post(`/api/users/password/forgot/${email}`)
      if(status >= 200){ 
        setPassed(true)
      }
    } catch (error) {
      const e: AxiosError = error;
      const msg = handleError(e.response?.status)
      console.error(msg)
      setError(msg)
    }
    setLoading(false)
  }

  const handleError = (status?: number) => {
    if(status && status >= 400){
      return 'อีเมลไม่ตรงกับที่อยู่ในระบบ โปรดกรอกอีเมลอีกครั้ง'
    }else{
      return 'เกิดข้อผิดพลาดขึ้น โปรดลองอีกครั้งภายหลัง'
    }
  }

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
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {passed ? (
        <PopupEmail 
          image="/images/verify/mail.png"
          label="Please verify your email"
          description={
            <div className="flex flex-col gap-[2rem]">
              <p className="text-sm text-center leading-relaxed">
                A verification email has been sent to your email <span className=" font-bold text-[#73408A]">{email}</span> Please check your email and click the link provided in the email to complete your account registration.
              </p>
              <p className=" text-xs text-center">
                if you do not receive the email within 5 minutes, use the button below to resend verification email.
              </p>
            </div>
          }
          function={
            {
              name: "Resend Verification",
              fn: () => handleSubmit()
            }
          }
        />
      ) : (
          <div className="container relative w-[21rem] md:w-[42rem] mx-auto bg-[#F3F3F3] rounded-md flex flex-col gap-[8rem] py-[3rem] px-[1.25rem] md:px-[7rem]">
            <Image 
              src={'/images/logo/idektep-192.png'}
              width={64}
              height={64}
              alt="logo-idektep"
              className=" absolute top-[1rem] left-[1rem] hidden md:flex"
            />
            <div className="flex flex-col gap-[1rem]">
                <h1 className=" text-[2.25rem] text-center">การยืนยันตัวตน</h1>
                <p className="text-center text-sm">
                  ทางเราจะส่งคำเเนะนำในการเปลี่ยนรหัสผ่านของคุณไปยังอีเมลของท่านโปรดตรวจสอบในกล่องข้อความหรือโฟลเดอร์สเเปม
                </p>
            </div>
            {error && (
              <p className=" absolute top-[14.5rem] md:top-[13.5rem] md:mx-[1rem] mx-[0.75rem] text-[#D64F4F] text-sm my-[1rem]">
                {error}
              </p>
            )}
            <div className="flex flex-col gap-[1.75rem]">
                  <div className="px-[1rem]">
                    <InputText
                        label="อีเมล"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                  </div>
                  <p className=" text-sm px-[0.75rem] text-center">
                  โปรดกรอกอีเมลของคุณเพื่อดำเนินการยืนยันตัวตนของท่าน{" "}
                  </p>
              </div>
            <div className="mx-auto md:w-full">
              <Button label="ยืนยัน" onClick={() => handleSubmit()} disabled={email.length < 1} style={`${email.length < 1 ? 'bg-[#9B9B9B]' : 'bg-[#73408A] hover:bg-[#522D62]'} px-[4.5rem] py-[0.5rem] text-[#FFFFFF]`}/>
            </div>
          </div>
        )}
    </div>
    </>
  );
};

export default ForgotPage;
