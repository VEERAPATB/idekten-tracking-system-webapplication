"use client";

import { StudentContext, StudentActionKind } from "@/lib/context/StudentContext";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { SearchStudentProps } from "@/types/next-general";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const DEFAULT_IMAGE = "/images/profile/default_profile.png";

const SearchStudent = () => {
  const axiosAuth = useAxiosAuth();
  const { state, dispatch } = useContext(StudentContext)
  const [isClient, setIsClient] = useState(false)

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<SearchStudentProps[] | null>(null);
  const [inputField, setInputField] = useState<string>("");

  const performRemoved = (id: number) => {
    dispatch({
      type: StudentActionKind.DELETE,
      payload: {
        id: id,
        nameTH: ""
      }
    })
  }

  const performSelected = ({id, name, nickname} : {id:number, name:string, nickname: string}) => {
    if(state.studentSelected.length >= 4) return
    const userIsValid = state.studentSelected.find((val) => val.id === id)
    if(userIsValid) return 
    dispatch({
      type: StudentActionKind.ADDED,
      payload: {
        id: id,
        nameTH: name,
        nicknameTH: nickname
      }
    })
  }

  // Fetch student
  const handleSearch = useDebouncedCallback(async () => {
    const data = await fetchStudentData();
    setData(data);
  }, 200);

  useEffect(() => {
    if (!isOpen) return;
    handleSearch();
  }, [inputField]);

  useEffect(() => {
    setIsClient(true)
  }, [isClient])

  const fetchStudentData = async () => {
    try {
      const response = await axiosAuth.get("/api/search/students", {
        params: {
          q: inputField === "" ? undefined : inputField,
        },
      });
      return response.data;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <div className="relative w-full text-white z-[100]">
      <div className=" relative">
        <Image
          className="absolute top-1/2 left-[0.75rem] -translate-y-1/2"
          src={"/images/magnifying_glasses.svg"}
          alt="search-icon"
          width={27}
          height={27}
        />
        <input
          type="text"
          autoComplete="off"
          className=" bg-[#3D3C3C] outline-none w-full px-[2.75rem] py-[0.5rem] rounded"
          placeholder="ค้นหาชื่อ หรือรหัสนักเรียน"
          onFocus={() => {
            setIsOpen(true);
            handleSearch();
          }}
          onBlur={() => setIsOpen(false)}
          value={inputField}
          onChange={(e) => {
            setInputField(e.target.value);
          }}
        />
      </div>
      <div className=" absolute w-full top-[3rem]">
        <ul className="flex flex-col gap-[0.5rem] font-medium text-xl text-[#3D3C3C]">
          {isClient && state.studentSelected.length > 0 &&
            state.studentSelected.map((user) => (
              <li key={user.id} className=" flex p-[0.5rem] justify-between bg-[#F3F3F3] items-center rounded-[0.625rem] shadow-[10px_10px_10px_0px_rgba(0,0,0,0.25)]">
                <div className="flex gap-[1rem] items-center">
                  <Image
                    src={DEFAULT_IMAGE}
                    alt="profile-student"
                    width={35}
                    height={35}
                  />
                  <p className="">{user.nameTH}</p>
                </div>
                <button onClick={() => performRemoved(user.id)}>
                  <Image
                    src={"/images/cross-line.svg"}
                    alt="close"
                    width={24}
                    height={24}
                  />
                </button>
              </li>
            ))}
        </ul>
      </div>
      <ul
        className={`absolute w-full bg-[#3D3C3C] rounded ${
          !isOpen && "hidden"
        }`}
      >
        {data &&
          data.length > 0 &&
          data.map((opt, i) => (
            i < 6 && (
              <div
                key={opt.id}
                className="flex gap-[1rem] px-[1.5rem] py-[0.25rem] items-center cursor-pointer hover:bg-slate-500"
                onMouseDown={() =>
                  performSelected({id: opt.id, name: opt.nameTH, nickname: opt.nicknameTH})
                }
              >
                <Image
                  src={DEFAULT_IMAGE}
                  alt="profile-student"
                  width={29}
                  height={29}
                />
                <li className="">{opt.nameTH}</li>
              </div>
            )
          ))}
      </ul>
    </div>
  );
};

export default SearchStudent;
