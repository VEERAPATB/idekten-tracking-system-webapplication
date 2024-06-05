"use client";

import { signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BlurBack from "@/components/BlurBack";
import InputText from "@/components/InputText";

const SignIn = () => {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    username: "" as string,
    password: "" as string,
  });
  const [clickable, setClickable] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("" as string);
  const [onLoading, setOnLoading] = useState(false)
  const [isClient, setCLient] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    // Protect refresh from html
    e.preventDefault();
    setOnLoading(true)

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: formValues.username,
        password: formValues.password,
      });
      if (res?.error) {
        setOnLoading(false)
        return setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      }
      router.push("/profile");
    } catch (error: any) {
      setError(error);
    }
    setOnLoading(false)
  };

  useEffect(() => {
    if (formValues.username && formValues.password) {
      setClickable(false);
    } else {
      setClickable(true);
    }
  }, [formValues]);

  useEffect(() => {
    if(!isClient){
      setCLient(true)
    }
  }, [])

  return (
    <div className="md:container md:mx-auto mx-[1.5rem] h-[100vh] flex flex-col overflow-hidden justify-center items-center">
      {onLoading && (
        <div className="">
        <BlurBack open />
        <div className=" absolute w-[100px] mx-auto top-1/2 left-1/2 -translate-x-1/2  z-[100]">
          <canvas className=" absolute loader w-[100px] mx-auto"></canvas>
        </div>
      </div>
      )}
      <div className="main flex flex-col items-center md:mx-auto rounded-[0.625rem] md:shadow-[10px_10px_10px_0px_rgba(0,0,0,0.25)] bg-[#F3F3F3] w-full md:w-[668px] md:h-[728px]">
        <div className="box md:mx-auto flex flex-col justify-center items-center md:w-[28rem] m-[5rem] gap-[7rem] relative">
          <Image 
            src='/images/logo/idektep-192.png'
            height={216}
            width={216}
            alt=""
            />
          {error && <p className=" text-[#D64F4F] font-semibold absolute top-[17rem]">{error}</p>}
          <form
            onSubmit={onSubmit}
            className="relative flex flex-col gap-[3.88rem] w-[18rem] md:w-[28rem]"
          >
            <div className="flex flex-col gap-[3.5rem] relative">
              <InputText 
                label="อีเมล"
                type="email"
                required
                value={formValues.username}
                onChange={(e) => setFormValues({...formValues, username: e.target.value})}
              />
              <div className=" relative">
                <Image 
                  src={`/images/signIn/input/${passwordVisible ? 'visible-eye.svg' : 'invisible-eye.svg'}`}
                  alt="visible-eye"
                  width={24}
                  height={24}
                  className=" absolute right-0 top-[0.5rem] cursor-pointer z-[40]"
                  onClick={() => setPasswordVisible(prev => !prev)}
                />
                <InputText 
                  label="รหัสผ่าน"
                  type={`${passwordVisible ? 'text' : 'password'}`}
                  required
                  value={formValues.password}
                  onChange={(e) => setFormValues({...formValues, password: e.target.value})}
                />
                <div className="forgot-pass mt-[1rem] text-right text-sm text-[#0099FF]">
                  <Link href="/auth/error?error=resetpass">ลืมรหัสผ่าน?</Link>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button type="submit" className={`font-medium text-[#F3F3F3] py-[0.8rem] rounded-2xl max-w-[12rem] w-full ${!clickable ? 'bg-[#73408A] hover:bg-[#522D62]' : 'bg-[#9B9B9B]'}`} disabled={clickable}>เข้าสู่ระบบ</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
