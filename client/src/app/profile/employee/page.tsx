"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

type StudentData = {
  LineID: String;
  birthday: String;
  nameEN: String;
  nameTH: String;
  nicknameEN: String;
  nicknameTH: String;
  telephone: String;
  department: String;
};

function Page() {
  const [IndexPages, setIndexPages] = useState(0);
  const axiosAuth = useAxiosAuth();
  const [data, setData] = useState<StudentData>();
  const [imageData, setImageData] = useState<string>("/images/default-profile.jpg");

  useEffect(() => {
    const handleClick = async () => {
      try {
        const result = await axiosAuth.get(`/api/profile/employee`);
        console.log(result.data);
        setData({ ...result.data });

        // Fetch image data
        const imageResponse = await axiosAuth.get(`/api/image/employee`, {
          responseType: 'blob' // Ensure the response is treated as a blob
        });
  
        // Convert Blob to Data URL
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            setImageData(reader.result);
            console.log(reader.result)
          }
        };
        reader.readAsDataURL(imageResponse.data);
  
      } catch (error) {
        console.log(error);
      }
    };
    handleClick();
  }, []);

  return (
    <section className=" w-full">
      <div className="bg-[#5D5D5D] text-[#FFFFFF] opacity-50 relative -z-10">
        <p className=" pl-[1.5rem] pt-[0.313rem] pb-[0.188rem] lg:text-xl lg:pl-[7.813rem]">
          ข้อมูลส่วนตัว
        </p>
      </div>
      <div className=" all flex flex-col lg:flex-row lg:justify-center ">
        <div
          className={` layout-Information mt-8 lg:flex lg:gap-[46px] lg:mt-[2.375rem] lg:justify-center }`}
        >
          <div
            className={`relative z-10 flex flex-col items-center rounded-[0.625rem] bg-white mx-6
            mb-[1.813rem] lg:mr-0 gap-5 drop-shadow-[10px_10px_10px_rgba(0,0,0,0.25)] 
            ${IndexPages == 1 ? "hidden lg:flex" : "block"}`}
          >
            <a
              href="/profile/editEmployee"
              className=" absolute flex self-end mr-2 mt-2 "
            >
              <Image
                alt=""
                src="/images/edit.svg"
                objectFit="cover"
                width={48}
                height={48}
                className=" rounded-full overflow-hidden "
              />
            </a>
            <div className=" PFP w-[158px] h-[158px] lg:w-[334px] lg:h-[334px] mt-7 ">
              <Image
                alt=""
                src={imageData}
                objectFit="cover"
                width={334}
                height={334}
                className=" rounded-full overflow-hidden "
              />
            </div>
            <div className="Name grid grid-col-1 justify-items-center md:gap-2 lg:gap-[1rem] lg:mt-9 lg:pr-[4.813rem] lg:pl-[4.375rem]">
              <p className="text-xl lg:text-3xl">
                {data?.nameTH}&nbsp;
                {data?.nicknameTH}
              </p>
              <p className="text-xs md:text-base lg:text-lg opacity-75">
                {data?.nameEN}&nbsp;
                {data?.nicknameEN}
              </p>
              <p className="text-xs md:text-base lg:text-lg mt-[1rem] ">
                แผนก:&nbsp;{data?.department}
              </p>
            </div>
            <div className="mt-[1.5rem] w-[255px] lg:w-[486px] lg:pr-[3.688rem] lg:pl-[3.25rem]">
              <Image
                alt=""
                src="/images/line.png"
                objectFit="cover"
                width={486}
                height={0}
                className="rounded-full overflow-hidden"
              />
            </div>
            <div className="flex justify-center mb-6 mt-6 gap-[0.563rem] lg:pl-[4.813rem] lg:pr-[4.313rem]">
              <div className="flex gap-[2px]">
                <p className="ml-[2.75rem] text-xs md:text-base lg:text-lg">
                  เบอร์โทรศัพท์:&nbsp;
                </p>
                <p className="text-xs md:text-base font-light lg:text-lg">
                  {data?.telephone}
                </p>
              </div>
              <div className="flex gap-[2px]">
                <p className="text-xs md:text-base lg:text-lg">วันเกิด:&nbsp;</p>
                <p className="mr-[2.688rem] text-xs md:text-base font-light lg:text-lg">
                  {data?.birthday}
                </p>
              </div>
            </div>
            <div className="line mb-10 lg:mb-24">
              <div className="flex gap-[2px]">
                <p className=" text-xs md:text-base lg:text-lg">
                  ID Line:&nbsp;
                </p>
                <p className="text-xs md:text-base font-light lg:text-lg">
                  {data?.LineID}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
