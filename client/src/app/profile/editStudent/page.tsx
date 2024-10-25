"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  const [imageData, setImageData] = useState<string>(
    "/images/default-profile.jpg"
  );
  const [userData, setUserData] = useState<{
    gender: string;
    nameTH: string;
    nicknameTH: string;
    nameEN: string;
    nicknameEN: string;
    citizen: string;
    birthday: string;
    telephone: string;
  }>({
    gender: "",
    nameTH: "",
    nicknameTH: "",
    nameEN: "",
    nicknameEN: "",
    citizen: "",
    birthday: "",
    telephone: "",
  });

  // get profile information
  useEffect(() => {
    const handleClick = async () => {
      try {
        const result = await axiosAuth.get(`/api/edit-profile/student`);
        console.log(result.data);
        setUserData({
          ...userData,
          nameTH: result.data.nameTH,
          nameEN: result.data.nameEN,
          nicknameTH: result.data.nicknameTH,
          nicknameEN: result.data.nicknameEN,
          gender: result.data.gender,
          citizen: result.data.citizen,
          birthday: result.data.birthday,
          telephone: result.data.telephone,
        });
      } catch (error) {
        console.log(error);
      }
    };
    handleClick();
  }, []);
  // get image
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch image data
        const imageResponse = await axiosAuth.get(`/api/image/student`, {
          responseType: "blob", // Ensure the response is treated as a blob
        });

        // Convert Blob to Data URL
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            setImageData(reader.result);
            console.log(reader.result);
          }
        };
        reader.readAsDataURL(imageResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts
  }, []);

  // edit picture handle
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // Create FormData object
        const formData = new FormData();
        formData.append("file", file); // Append the selected file to the FormData object

        // Make PUT request to upload the file
        const response = await axiosAuth.put(
          "/api/edit-image/student",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
            },
            responseType: "blob",
          }
        );

        if (response.status === 200) {
          // Assuming you want to update the image data state upon successful upload
          setImageData(response.data.imageUrl); // Update imageData state with the new image URL
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === "string") {
              setImageData(reader.result);
              console.log(reader.result);
            }
          };
          reader.readAsDataURL(response.data);
        } else {
          throw new Error("Failed to update image");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };
  // handle submit button
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // API
      console.log(userData);
      const response = await axiosAuth.put(
        `/api/edit-profile/student`,
        userData
      );

      if (response.status === 200) {
        
        console.log(userData);
      } else {
        throw new Error("Failed to update profile");
      }
      console.log({ ...userData });
      router.push("/profile/student");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="bg-[#5D5D5D] text-[#FFFFFF] opacity-50 relative -z-10">
        <p className=" pl-[1.5rem] pt-[0.313rem] pb-[0.188rem] lg:text-xl lg:pl-[7.813rem]">
          จัดการบัญชี {">"} นักเรียน {">"} แก้ไขข้อมูล
        </p>
      </div>
      <div className="z-10 relative mx-5 lg:mx-7">
        <div className=" mt-8 px-4 lg:pb-4 flex flex-col white-box rounded-[0.625rem] bg-white drop-shadow-[10px_10px_10px_rgba(0,0,0,0.25)]">
          <span className=" text-black mx-auto my-4 text-lg">
            ข้อมูลบัญชีนักเรียน
          </span>
          <div className="edit-topic p-2 border-2 border-black bg-[#D9D9D9] ">
            <span className="text-black text-lg lg:text-xl lg:ml-4">
              แก้ไขข้อมูลส่วนตัว
            </span>
          </div>
          <div className="edit-form flex flex-col border-2 border-black bg-[#F3F3F3] ">
            <div className="flex flex-col lg:flex-row lg:items-center">
              <Image
                alt=""
                src={imageData}
                objectFit="cover"
                width={334}
                height={334}
                className=" my-4 self-center w-[158px] h-[158px] lg:w-[100px] lg:h-[100px] lg:ml-10 rounded-full overflow-hidden "
              />
              <label htmlFor="" className="self-center text-red-700 mb-4 lg:mb-0 lg:ml-4">ขนาดไฟล์ไม่เกิน 1MB</label>
              <label className="bg-[#73408A] rounded-2xl mb-4 w-max p-3 self-center lg:ml-5 lg:w-32 lg:h-10 lg:items-center lg:flex lg:justify-center lg:mb-0 cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <p className="text-white">แก้ไขโปรไฟล์</p>
              </label>
            </div>
            <div className="student form relative w-full items-center  justify-center flex">
              <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
                <div className="relative flex flex-col items-center h-[38.3125rem] lg:h-fit lg:items-start lg:ml-10">
                  <div className="department w-[15.875rem] flex flex-col items-center justify-between">
                    <div className={`flex-col items-center gap-10 w-full `}>
                      <div className="Sex relative w-full flex">
                        <div className="flex items-center justify-center w-[5.0625rem] gap-2">
                          <input
                            type="radio"
                            value={"male"}
                            name="Gus"
                            checked={userData.gender === "male"}
                            className="w-4 h-4 ring-1 ring-[#73408A] rounded-full text-[#73408A] focus:ring-[#73408A] focus:ring-2 appearance-none checked:bg-[#73408A] checked:border-white checked:border-2"
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                gender: e.target.value,
                              })
                            }
                          />
                          <label
                            htmlFor=""
                            className="ms-2 font-medium text-[#313131]"
                          >
                            ชาย
                          </label>
                        </div>
                        <div className="flex items-center justify-center w-[5.0625rem] gap-2">
                          <input
                            type="radio"
                            value={"female"}
                            name="Gus"
                            checked={userData.gender === "female"}
                            className="w-4 h-4 ring-1 ring-[#73408A] rounded-full text-[#73408A] focus:ring-[#73408A] focus:ring-2 appearance-none checked:bg-[#73408A] checked:border-white checked:border-2"
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                gender: e.target.value,
                              })
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
                                setUserData({
                                  ...userData,
                                  nameTH: e.target.value,
                                })
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
                                setUserData({
                                  ...userData,
                                  nicknameTH: e.target.value,
                                })
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
                                setUserData({
                                  ...userData,
                                  nameEN: e.target.value,
                                })
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
                                setUserData({
                                  ...userData,
                                  nicknameEN: e.target.value,
                                })
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
                                setUserData({
                                  ...userData,
                                  citizen: e.target.value,
                                })
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
                              pattern="\d{1,2}/\d{1,2}/\d{4}"
                              value={userData.birthday}
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  birthday: e.target.value,
                                })
                              }
                            />
                            <label className="lg:text-lg xl:text-xl absolute duration-300 transform text-[#5D5D5D] -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#73408A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[#5D5D5D] peer-focus:text-blue peer-focus:scale-75 peer-focus:font-medium peer-focus:-translate-y-5">
                              วัน/เดือน/ปี (วันเกิด)
                            </label>
                          </div>
                        </div>

                        <div className="relative z-0 w-full">
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
                    <a href="/profile/changepassword" className="lg:w-[212px] xl:ml-[850px] lg:my-6 lg:h-10 lg:relative lg:ml-[600px] bg-[#73408A] rounded-2xl my-4 w-max p-3 lg:justify-center lg:items-center lg:flex">
                      <p className="text-white">แก้ไขรหัสผ่าน</p>
                    </a>
                  </div>
                  <button
                    type="submit"
                    className={`bg-[#73408A] lg:self-end py-2 lg:py-1 lg:m-3 text-white text-lg w-5/6 lg:w-[212px] rounded-2xl 
            `}
                  >
                    เสร็จสิ้น
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
