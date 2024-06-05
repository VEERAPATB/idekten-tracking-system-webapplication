"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InputText from "@/components/InputText";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePickerCustom";
import { axiosServer } from "@/lib/axios";
import Image from "next/image";
import Dropdown from "@/components/Dropdown";
import BlurBack from "@/components/BlurBack";
import { PageProps } from "@/types/next-general";
import PopupEmail from "../Verify/PopupEmail";

const BANK_LIST = [
  "Promtpay - พร้อมเพย์",
  "KBANK - กสิการ",
  "SCB - ไทยพาณิชย์",
  "BAY - กรุงศรีอยุธยา",
  "UOB - ยูโอบี",
];

const AddEmployee = (props: PageProps) => {
  const router = useRouter();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    gender: "",
    nameTH: "",
    nicknameTH: "",
    nameEN: "",
    nicknameEN: "",
    citizenID: "",
    birthDate: "",
    LineID: "",
    branch: "",
    cellPhoneNumber: "",
    bankName: "",
    bankNumber: "",
    department: "",
  });
  const [indexForm, setIndexForm] = useState(0);
  const [buttonState, setButtonState] = useState(false);
  const [buttonSubmit, setButtonSubmit] = useState(false);
  const [isValidEmail, setValidEmail] = useState(false);
  const [preparedData, setPreparedData] = useState<{
    branch: string[];
    role: string[];
  }>();
  const [confirmPass, setConfirmPass] = useState("");
  const [passVisible, setPassVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API
      const newBirthDate = userData.birthDate;
      const defaultPhoneNumber = userData.cellPhoneNumber.replaceAll("-", "");
      const defaultCitizenId = userData.citizenID.replaceAll("-", "");
      const defaultBirthDate = `${newBirthDate.slice(
        8,
        10
      )}/${newBirthDate.slice(5, 7)}/${newBirthDate.slice(0, 4)}`;

      const response = await axiosServer.post("/api/register/employee", {
        ...userData,
        cellPhoneNumber: defaultPhoneNumber,
        citizenID: defaultCitizenId,
        birthDate: defaultBirthDate,
      });
      setSuccessful(true);
    } catch (error) {
      alert(`Something went wrong, contact support or try again later.`);
      console.error(`Error: ${error}`);
    }
    setLoading(false);
  };

  const fetchPreparedData = async () => {
    setLoading(true);
    try {
      const data = await axiosServer.get("/api/register/employee");
      setPreparedData({
        branch: data.data?.Branch,
        role: data.data?.Role,
      });
    } catch (error) {
      alert(`Something went wrong, contact support or try again later.`);
      console.error(`Error: ${error}`);
    }
    setLoading(false);
  };

  // Handle Form information
  const regexNumber = (value: string) => value.replace(/\D/g, "");
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const token = props.searchParams?.t;

  axiosServer.interceptors.request.use((conf) => {
    conf.headers.Authorization = `Bearer ${token}`;
    return conf;
  });

  const formatCitizenId = (value: string) => {
    const formatId = regexNumber(value);

    if (formatId.length < 2) return formatId;

    if (formatId.length < 6)
      return `${formatId.slice(0, 1)}-${formatId.slice(1)}`;

    if (formatId.length < 11)
      return `${formatId.slice(0, 1)}-${formatId.slice(1, 5)}-${formatId.slice(
        5
      )}`;

    if (formatId.length < 13)
      return `${formatId.slice(0, 1)}-${formatId.slice(1, 5)}-${formatId.slice(
        5,
        10
      )}-${formatId.slice(10)}`;

    return `${formatId.slice(0, 1)}-${formatId.slice(1, 5)}-${formatId.slice(
      5,
      10
    )}-${formatId.slice(10, 12)}-${formatId.slice(12, 13)}`;
  };

  // Handle phone number
  const formatPhoneNumber = (value: string) => {
    const formatNumber = regexNumber(value);

    if (formatNumber.length < 4) return formatNumber;

    if (formatNumber.length < 7) {
      return `${formatNumber.slice(0, 3)}-${formatNumber.slice(3)}`;
    }
    return `${formatNumber.slice(0, 3)}-${formatNumber.slice(
      3,
      6
    )}-${formatNumber.slice(6, 10)}`;
  };

  useEffect(() => {
    fetchPreparedData();
  }, []);

  useEffect(() => {
    const validEmail = regexEmail.test(userData.email);
    setValidEmail(validEmail);
  }, [userData.email]);

  useEffect(() => {
    setUserData({
      ...userData,
      cellPhoneNumber: formatPhoneNumber(userData.cellPhoneNumber),
    });
  }, [userData.cellPhoneNumber]);

  useEffect(() => {
    setUserData({
      ...userData,
      citizenID: formatCitizenId(userData.citizenID),
    });
  }, [userData.citizenID]);

  useEffect(() => {
    setUserData({
      ...userData,
      bankNumber: regexNumber(userData.bankNumber),
    });
  }, [userData.bankNumber]);

  useEffect(() => {
    const defaultCitizenId = userData.citizenID.replaceAll("-", "");
    const defaultPhoneNumber = userData.cellPhoneNumber.replaceAll("-", "");

    var first: boolean = Boolean(
      userData.email &&
        userData.password &&
        confirmPass &&
        isValidEmail &&
        userData.department &&
        userData.password.length >= 7 &&
        userData.password === confirmPass
    );
    var second: boolean = Boolean(
      userData.gender &&
        userData.nameEN &&
        userData.nameTH &&
        userData.nicknameEN &&
        userData.nicknameTH
    );
    var third: boolean = Boolean(
      userData.citizenID &&
        defaultCitizenId.length === 13 &&
        userData.birthDate &&
        userData.LineID &&
        userData.cellPhoneNumber &&
        defaultPhoneNumber.length === 10
    );
    var forth = Boolean(
      userData.bankName &&
        userData.bankNumber &&
        userData.bankNumber.length >= 10 &&
        userData.branch
    );

    if (
      (first && indexForm == 0) ||
      (second && indexForm == 1) ||
      (third && indexForm == 2) ||
      (forth && indexForm == 3)
    ) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }

    if (first && second && third && forth) {
      setButtonSubmit(true);
    } else {
      setButtonSubmit(false);
    }
  }, [userData, indexForm, confirmPass]);

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
      <div className=" absolute mt-[3rem] left-1/2 -translate-x-1/2">
        {!successful ? (
          <form
            className="relative rounded-[0.625rem] h-[42.25rem] w-[22rem] md:w-[42rem] bg-white shadow-[10px_10px_10px_0px_rgba(0,0,0,0.25)] mb-[3rem]"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="relative flex flex-col pt-6 items-center h-full">
              <div className="pagination mb-10 w-full flex h-[0.375rem] justify-center gap-2">
                <div
                  className={`${
                    indexForm == 0 ? "bg-[#73408A]" : "bg-[#9B9B9B]"
                  } w-7`}
                ></div>
                <div
                  className={`${
                    indexForm == 1 ? "bg-[#73408A]" : "bg-[#9B9B9B]"
                  } w-7`}
                ></div>
                <div
                  className={`${
                    indexForm == 2 ? "bg-[#73408A]" : "bg-[#9B9B9B]"
                  } w-7`}
                ></div>
                <div
                  className={`${
                    indexForm == 3 ? "bg-[#73408A]" : "bg-[#9B9B9B]"
                  } w-7`}
                ></div>
              </div>
              <div className="">
                <div className="department w-[15.875rem] md:w-[28rem] flex flex-col items-center justify-between">
                  <div className="text-center">
                    <h1 className="text-5xl">ลงทะเบียน</h1>
                    <h4 className="text-2xl">ข้อมูลบัญชี</h4>
                  </div>
                  <div
                    className={`change-step flex-col gap-10 flex mt-[2rem] ${
                      indexForm == 0 ? "flex" : "hidden"
                    } w-full`}
                  >
                    <div className="information flex flex-col gap-[2.5rem]">
                      <Dropdown
                        label="เลือกแผนก..."
                        children={preparedData ? preparedData?.role : []}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                          setUserData({
                            ...userData,
                            department: e.target.value,
                          })
                        }
                        hiddenFirst={true}
                        styleOption="bg-[#F3F3F3]"
                      />
                      <InputText
                        label="อีเมล"
                        type="email"
                        value={userData.email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
                      />
                      <div className="flex flex-col gap-[3rem]">
                        <div className=" relative flex flex-col gap-[0.5rem]">
                          <InputText
                            label="รหัสผ่าน"
                            type={`${!passVisible ? "password" : "text"}`}
                            value={userData.password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              setUserData({
                                ...userData,
                                password: e.target.value,
                              })
                            }
                          />
                          <p className=" text-xs text-[#73408A]">
                            อย่างน้อยรหัส 8 ตัวขึ้นไป
                          </p>
                          <div
                            className=" absolute right-0 top-1/2 -translate-y-[1.2rem] cursor-pointer"
                            onClick={(e) => setPassVisible((prev) => !prev)}
                          >
                            <Image
                              src={`/images/signIn/input/${
                                !passVisible
                                  ? "invisible-eye.svg"
                                  : "visible-eye.svg"
                              }`}
                              width={24}
                              height={24}
                              alt="close-eye"
                            />
                          </div>
                        </div>
                        <div className=" relative flex flex-col gap-[0.5rem]">
                          <InputText
                            label="ยืนยันรหัสผ่าน"
                            type={`${!confirmVisible ? "password" : "text"}`}
                            value={confirmPass}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              setConfirmPass(e.target.value)
                            }
                          />
                          <p className=" text-xs text-[#73408A]">
                            อย่างน้อยรหัส 8 ตัวขึ้นไป
                          </p>
                          <div
                            className=" absolute right-0 top-1/2 -translate-y-[1.2rem] cursor-pointer"
                            onClick={(e) => setConfirmVisible((prev) => !prev)}
                          >
                            <Image
                              src={`/images/signIn/input/${
                                !confirmVisible
                                  ? "invisible-eye.svg"
                                  : "visible-eye.svg"
                              }`}
                              width={24}
                              height={24}
                              alt="close-eye"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`flex-col items-center gap-[2rem] w-full ${
                      indexForm == 1 ? "flex" : "hidden"
                    }`}
                  >
                    <div className="relative w-full md:w-[16rem] flex justify-between text-lg mt-[2rem]">
                      <div className="flex items-center w-[5.0625rem] gap-2">
                        <input
                          type="radio"
                          value={"Male"}
                          name="radio-gender"
                          id="radio-gender"
                          className="w-[1.25rem] h-[1.25rem] text-blue-600 focus:ring-2 focus:ring-blue-500 outline-none"
                          onChange={(e) =>
                            setUserData({ ...userData, gender: e.target.value })
                          }
                        />
                        <label
                          htmlFor="radio-gender"
                          className="ms-2 font-medium text-[#313131]"
                        >
                          ชาย
                        </label>
                      </div>
                      <div className="flex items-center justify-center w-[5.0625rem] gap-2">
                        <input
                          type="radio"
                          value={"Female"}
                          name="radio-gender"
                          id="radio-gender-female"
                          className=" w-[1.25rem] h-[1.25rem] focus:ring-blue-500 focus:ring-2 outline-none"
                          onChange={(e) =>
                            setUserData({ ...userData, gender: e.target.value })
                          }
                        />
                        <label
                          htmlFor="radio-gender-female"
                          className=" ms-2 font-medium text-[#313131] outline-none "
                        >
                          หญิง
                        </label>
                      </div>
                    </div>
                    <div className="relative w-full information flex flex-col gap-[2.5rem]">
                      <InputText
                        label="ชื่อ-นามสกุล (ไทย)"
                        type="text"
                        value={userData.nameTH}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setUserData({ ...userData, nameTH: e.target.value })
                        }
                      />
                      <InputText
                        label="ชื่อเล่น (ไทย)"
                        type="text"
                        value={userData.nicknameTH}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setUserData({
                            ...userData,
                            nicknameTH: e.target.value,
                          })
                        }
                      />
                      <InputText
                        label="ชื่อ-นามสกุล (อังกฤษ)"
                        type="text"
                        value={userData.nameEN}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setUserData({ ...userData, nameEN: e.target.value })
                        }
                      />
                      <InputText
                        label="ชื่อเล่น (อังกฤษ)"
                        type="text"
                        value={userData.nicknameEN}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setUserData({
                            ...userData,
                            nicknameEN: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div
                    className={`flex flex-col mt-[2rem] w-full ${
                      indexForm == 2 ? "flex" : "hidden"
                    }`}
                  >
                    <div className="relative w-full information flex flex-col gap-[2.5rem]">
                      <InputText
                        label="เลขบัตรประชาชน"
                        type="text"
                        value={userData.citizenID}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setUserData({
                            ...userData,
                            citizenID: e.target.value,
                          })
                        }
                      />
                      <DatePicker
                        date={userData.birthDate}
                        label="วันเกิด (เดือน/วัน/ปี)"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setUserData({
                            ...userData,
                            birthDate: e.target.value,
                          })
                        }
                      />
                      <InputText
                        label="ไอดีไลน์"
                        type="text"
                        value={userData.LineID}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setUserData({ ...userData, LineID: e.target.value })
                        }
                      />
                      <InputText
                        label="เบอร์โทรศัพท์"
                        type="text"
                        value={userData.cellPhoneNumber}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setUserData({
                            ...userData,
                            cellPhoneNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div
                    className={`flex flex-col mt-[2rem] w-full ${
                      indexForm == 3 ? "flex" : "hidden"
                    }`}
                  >
                    <div className="relative w-full information flex flex-col gap-[2.5rem]">
                      <Dropdown
                        label="เลือกธนาคาร"
                        children={BANK_LIST}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                          setUserData({ ...userData, bankName: e.target.value })
                        }
                        hiddenFirst={true}
                        styleOption="bg-[#F3F3F3] py-[1rem]"
                      />
                      <InputText
                        label="เลขบัญชีธนาคาร"
                        type="text"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setUserData({
                            ...userData,
                            bankNumber: e.target.value,
                          })
                        }
                        value={userData.bankNumber}
                      />
                      <Dropdown
                        label="สาขาที่ทำงาน..."
                        children={preparedData ? preparedData?.branch : []}
                        onChange={(e) => {
                          setUserData({ ...userData, branch: e.target.value });
                        }}
                        hiddenFirst={true}
                        styleOption="bg-[#F3F3F3] py-[1rem]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`button-group absolute bottom-[3.5rem] w-[16rem] grid md:w-full md:px-[7.3rem] ${
                  indexForm == 0 ? "grid-cols-1" : "grid-cols-2"
                } gap-4 text-white`}
              >
                <Button
                  label="ย้อนกลับ"
                  style={`${
                    indexForm !== 0 ? "" : "hidden"
                  } text-[#522D62] hover:border-[#73408A] hover:text-[#73408A] py-[0.7rem]`}
                  disabled={indexForm === 0}
                  border={true}
                  onClick={() => setIndexForm(indexForm - 1)}
                />
                <Button
                  label="ต่อไป"
                  onClick={() => setIndexForm(indexForm + 1)}
                  disabled={!buttonState}
                  border={true}
                  style={`${
                    buttonState
                      ? "hover:bg-[#522D62] bg-[#73408A] border-[#73408A]"
                      : "bg-[#9B9B9B] border-[#9B9B9B]"
                  } ${indexForm !== 3 ? "" : "hidden"}  py-[0.7rem]`}
                />
                <Button
                  label="ลงทะเบียน"
                  type="submit"
                  disabled={!buttonState}
                  border={true}
                  style={`${
                    buttonSubmit
                      ? "hover:bg-[#522D62] bg-[#73408A] border-[#73408A]"
                      : "bg-[#9B9B9B] border-[#9B9B9B]"
                  } ${indexForm == 3 ? "" : "hidden"}  py-[0.7rem]`}
                />
              </div>
            </div>
          </form>
        ) : (
          <PopupEmail
            image="/images/verify/mail.png"
            label="Please verify your email"
            description={
              <div className="flex flex-col gap-[2rem]">
                <p className="text-sm text-center leading-relaxed">
                  A verification email has been sent to your email{" "}
                  <span className=" font-bold text-[#73408A]">
                    {userData.email}
                  </span>{" "}
                  Please check your email and click the link provided in the
                  email to complete your account registration.
                </p>
                <p className=" text-xs text-center">
                  if you do not receive the email within 5 minutes, Please
                  contact support.
                </p>
              </div>
            }
          />
        )}
      </div>
    </>
  );
};

export default AddEmployee;
