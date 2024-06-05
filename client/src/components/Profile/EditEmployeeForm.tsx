"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

const AddEmployee = () => {
  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  const [userData, setUserData] = useState({
    password: "",
    gender: "",
    nameTH: "",
    nicknameTH: "",
    nameEN: "",
    nicknameEN: "",
    citizen: "",
    birthday: "",
    telephone: "",
    bank:"",
    id_bank:"",
    id_line:"",
  });

  useEffect(() => {
    const handleClick = async () => {
      try {
        const result = await axiosAuth.get(`/api/edit-profile/employee`);
        console.log(result.data);
        setUserData({ ...userData,  
          nameTH:result.data.user.nameTH ,
          nameEN:result.data.user.nameEN,
          nicknameTH:result.data.user.nicknameTH,
          nicknameEN:result.data.user.nicknameEN,
          gender:result.data.user.gender,
          citizen:result.data.user.citizen,
          birthday:result.data.user.birthday,
          telephone:result.data.user.telephone,
          bank:result.data.user.bank,
          id_bank:result.data.user.id_bank,
          id_line:result.data.user.id_line,
          
        });
        
      } catch (error) {
        console.log(error);
      }
    };
    handleClick();
  }, []);

  const [indexForm, setIndexForm] = useState(0);
  const [buttonState, setButtonState] = useState(false);
  const [buttonSubmit, setButtonSubmit] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // API
      console.log({ ...userData });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Form information
  useEffect(() => {
    var second: boolean = Boolean(
      userData.gender &&
        userData.nameEN &&
        userData.nameTH &&
        userData.nicknameEN &&
        userData.nicknameTH
    );
    var third: boolean = Boolean(
      userData.citizen &&
        userData.birthday &&
        userData.id_line &&
        userData.telephone
    );

    if (
      (second && indexForm == 1) ||
      (third && indexForm == 2)
    ) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }

    if ( second && third) {
      setButtonSubmit(true);
    } else {
      setButtonSubmit(false);
    }
  }, [userData, indexForm]);

  // Handle re-checked password

  return (
    <div className=" relative w-full items-center justify-center flex">
      <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
        <div className="relative flex flex-col items-center h-[38.3125rem] lg:h-fit lg:items-start lg:ml-10">
          <div className="department w-[15.875rem] flex flex-col items-center justify-between">
            <div className={`flex-col items-center gap-10 w-full `}>
              <div className="Sex relative w-full flex">
                <div className="flex items-center justify-center w-[5.0625rem] gap-2">
                  <input
                    type="radio"
                    value={"Male"}
                    name="Gus"
                    className="w-4 h-4 ring-1 ring-[#73408A] rounded-full text-[#73408A] focus:ring-[#73408A] focus:ring-2 appearance-none checked:bg-[#73408A] checked:border-white checked:border-2"
                    onChange={(e) =>
                      setUserData({ ...userData, gender: e.target.value })
                    }
                  />
                  <label htmlFor="" className="ms-2 font-medium text-[#313131]">
                    ชาย
                  </label>
                </div>
                <div className="flex items-center justify-center w-[5.0625rem] gap-2">
                  <input
                    type="radio"
                    value={"Female"}
                    name="Gus"
                    className="w-4 h-4 ring-1 ring-[#73408A] rounded-full text-[#73408A] focus:ring-[#73408A] focus:ring-2 appearance-none checked:bg-[#73408A] checked:border-white checked:border-2"
                    onChange={(e) =>
                      setUserData({ ...userData, gender: e.target.value })
                    }
                  />
                  <label
                    htmlFor=""
                    className=" ms-2 font-medium text-[#313131]"
                  >
                    หญิง
                  </label>
                </div>
              </div>
              <div className=" information relative w-full mt-4 flex flex-col gap-6 lg:mt-8">
                <div className="lg:flex lg:flex-row lg:gap-[218px] xl:gap-[400px] lg:w-full flex flex-col gap-6">
                  <div className="relative z-0 w-full ">
                    <input
                      type="text"
                      className="block pt-[0.8rem] px-0 w-full text-[1rem] bg-transparent text-border-0 border-b-[1px] 
                      border-[#313131] appearance-none focus:outline-none focus:ring-0 focus:border-[#73408A] peer lg:w-[400px] xl:w-[490px]"
                      placeholder=""
                      required
                      value={userData.nameTH}
                      onChange={(e) =>
                        setUserData({ ...userData, nameTH: e.target.value })
                      }
                    />
                    <label
                      className="absolute duration-300 transform text-[#5D5D5D] -translate-y-6 
                    scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#73408A] 
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[#5D5D5D]
                    peer-focus:text-blue peer-focus:scale-75 peer-focus:font-medium peer-focus:-translate-y-5 lg:text-lg xl:text-xl"
                    >
                      ชื่อ-นามสกุล (ไทย)
                    </label>
                  </div>
                  <div className="relative z-0 w-full">
                    <input
                      type="text"
                      className="block pt-[0.8rem] px-0 w-full text-[1rem] bg-transparent text-border-0 border-b-[1px]
                       border-[#313131] appearance-none focus:outline-none focus:ring-0 focus:border-[#73408A] peer lg:w-[400px] xl:w-[490px]"
                      placeholder=""
                      required
                      value={userData.nicknameTH}
                      onChange={(e) =>
                        setUserData({ ...userData, nicknameTH: e.target.value })
                      }
                    />
                    <label className=" absolute duration-300 transform text-[#5D5D5D] -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#73408A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[#5D5D5D] peer-focus:text-blue peer-focus:scale-75 peer-focus:font-medium peer-focus:-translate-y-5 lg:text-lg xl:text-xl">
                      ชื่อเล่น (ไทย)
                    </label>
                  </div>
                </div>
                <div className="lg:flex lg:flex-row lg:gap-[218px] xl:gap-[400px] lg:w-full flex flex-col gap-6">
                  <div className="relative z-0 w-full">
                    <input
                      type="text"
                      className="lg:w-[400px] xl:w-[490px] block pt-[0.8rem] px-0 w-full text-[1rem] bg-transparent text-border-0 border-b-[1px] border-[#313131] appearance-none focus:outline-none focus:ring-0 focus:border-[#73408A] peer"
                      placeholder=""
                      required
                      value={userData.nameEN}
                      onChange={(e) =>
                        setUserData({ ...userData, nameEN: e.target.value })
                      }
                    />
                    <label className=" lg:text-lg xl:text-xl absolute duration-300 transform text-[#5D5D5D] -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#73408A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[#5D5D5D] peer-focus:text-blue peer-focus:scale-75 peer-focus:font-medium peer-focus:-translate-y-5">
                      ชื่อ-นามสกุล (อังกฤษ)
                    </label>
                  </div>
                  <div className="relative z-0 w-full">
                    <input
                      type="text"
                      className="lg:w-[400px] xl:w-[490px] block pt-[0.8rem] px-0 w-full text-[1rem] bg-transparent text-border-0 border-b-[1px] border-[#313131] appearance-none focus:outline-none focus:ring-0 focus:border-[#73408A] peer"
                      placeholder=""
                      required
                      value={userData.nicknameEN}
                      onChange={(e) =>
                        setUserData({ ...userData, nicknameEN: e.target.value })
                      }
                    />
                    <label className="lg:text-lg xl:text-xl absolute duration-300 transform text-[#5D5D5D] -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#73408A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[#5D5D5D] peer-focus:text-blue peer-focus:scale-75 peer-focus:font-medium peer-focus:-translate-y-5">
                      ชื่อเล่น (อังกฤษ)
                    </label>
                  </div>
                </div>
                <div className="lg:flex lg:flex-row lg:gap-[218px] xl:gap-[400px] lg:w-full flex flex-col gap-6">
                  <div className="relative z-0 w-full">
                    <input
                      type="text"
                      className="lg:w-[400px] xl:w-[490px] block pt-[0.8rem] px-0 w-full text-[1rem] bg-transparent text-border-0 border-b-[1px] border-[#313131] appearance-none focus:outline-none focus:ring-0 focus:border-[#73408A] peer"
                      placeholder=""
                      required
                      value={userData.citizen}
                      onChange={(e) =>
                        setUserData({ ...userData, citizen: e.target.value })
                      }
                    />
                    <label className="lg:text-lg xl:text-xl  absolute duration-300 transform text-[#5D5D5D] -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#73408A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[#5D5D5D] peer-focus:text-blue peer-focus:scale-75 peer-focus:font-medium peer-focus:-translate-y-5">
                      เลขบัตรประชาชน
                    </label>
                  </div>
                  <div className="relative z-0 w-full">
                    <input
                      type="date"
                      className="lg:w-[400px] xl:w-[490px] block pt-[0.8rem] px-0 w-full text-[1rem] bg-transparent text-border-0 border-b-[1px] border-[#313131] appearance-none focus:outline-none focus:ring-0 focus:border-[#73408A] peer"
                      placeholder=""
                      required
                      value={userData.birthday}
                      onChange={(e) =>
                        setUserData({ ...userData, birthday: e.target.value })
                      }
                    />
                    <label className="lg:text-lg xl:text-xl absolute duration-300 transform text-[#5D5D5D] -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#73408A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[#5D5D5D] peer-focus:text-blue peer-focus:scale-75 peer-focus:font-medium peer-focus:-translate-y-5">
                      วัน/เดือน/ปี (วันเกิด)
                    </label>
                  </div>
                </div>

                <div className="relative z-0 w-full lg:mb-6">
                  <input
                    type="text"
                    className="lg:w-[400px] xl:w-[490px] block pt-[0.8rem] px-0 w-full text-[1rem] bg-transparent text-border-0 border-b-[1px] border-[#313131] appearance-none focus:outline-none focus:ring-0 focus:border-[#73408A] peer"
                    placeholder=""
                    required
                    value={userData.telephone}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        telephone: e.target.value,
                      })
                    }
                  />
                  <label className="lg:text-lg xl:text-xl absolute duration-300 transform text-[#5D5D5D] -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#73408A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[#5D5D5D] peer-focus:text-blue peer-focus:scale-75 peer-focus:font-medium peer-focus:-translate-y-5">
                    เบอร์มือถือ
                  </label>
                </div>
              </div>
            </div>
            {/* <button className="lg:w-[212px] xl:ml-[850px] lg:my-6 lg:h-10 lg:p-0 lg:relative lg:ml-[600px] bg-[#73408A] rounded-2xl my-4 w-max p-3 ">
              <p className="text-white">แก้ไขรหัสผ่าน</p>
            </button> */}
          </div>
          {/* <button
            type="submit"
            className={` lg:self-end py-2 lg:py-1 lg:m-3 text-white text-lg w-5/6 lg:w-[212px] rounded-2xl ${
              buttonSubmit ? "hover:bg-[#522D62] bg-[#73408A]" : "bg-[#9B9B9B]"
            }`}
            disabled={!buttonSubmit}
          >
            เสร็จสิ้น
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
