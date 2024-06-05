"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

type StudentData ={
  LineID: String
  birthDate: String
  nameEN: String
  nameTH: String
  nicknameEN: String
  nicknameTH: String
  tel: String
  Student: {
    school_name: String
  }
}

function Page() {

  const [IndexPages, setIndexPages] = useState(0);
  const [IndexLevel, setIndexLevel] = useState(0);
  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  const [data, setData] = useState<StudentData>();
  const [isFirst, setFirst] = useState<boolean>(true);

  const handleButton = async () => {
    try {
      const result = await axiosAuth(`/api/profileSt`);
      console.log(result);
      setData({...result.data});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClick = async () => {
      try {
        const result = await axiosAuth.get(`/api/profileSt`);
        console.log(result.data)
        setData({...result.data});
      } catch (error) {
        console.log(error);
      }
    };
    handleClick()
  }, []);

  return (
    <div>page</div>
  )
}

export default page