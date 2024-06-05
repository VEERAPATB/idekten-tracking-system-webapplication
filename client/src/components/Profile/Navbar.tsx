"use client";

import React from "react";
import Image from "next/image";
import Sidebar from "@/components/Profile/Sidebar";
import InformationButton from "@/components/Profile/InformationButton"
import DashboardButton from "@/components/Profile/DashboardButton"
import AdminButton from "@/components/Profile/AdminButton"
import LogoutButton from "./LogoutButton";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const isChangePasswordPage = pathname === "/profile/changepassword";
  return (
    <nav className={`${isChangePasswordPage ? "hidden" : "block"} flex justify-between items-center w-full h-auto bg-[#3D3C3C] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] `}>
      <div className="sidebar+logo flex bg-[#3D3C3C] items-center">
        <Sidebar/> 
        <div className=" w-7 h-auto ml-6 sm:w-10 md:w-14 lg:w-20 ">
          <Image 
            alt=""
            src="/images/logo-idektep.png"
            objectFit="cover"
            width={80}
            height={80}
            className='rounded-full my-1 overflow-hidden'
          />
        </div>
      </div>
      <div className="mid-button hidden lg:flex lg:items-center">
        <InformationButton />
        <DashboardButton />
        <AdminButton/>
        {/* <div className="inform-div flex items-center "> 
          <div className=" w-10 h-10 ">
          <Image 
            alt=""
            src="/images/icon-information.svg"
            objectFit="cover"
            width={72}
            height={72}
            className='rounded-full overflow-hidden filter brightness-0 invert '//filter brightness-0 invert
          />
          </div>
          <div className="">
            <a href="/" className=" text-white  hover:text-[#D29F48]">ข้อมูลส่วนตัว</a>
          </div>
        </div>*/}
        {/* <div className="dashboard-div flex items-center ml-16">
          <div className=" w-10 h-10 ">
            <Image 
              alt=""
              src="/images/overall-y.svg"
              objectFit="cover"
              width={72}
              height={72}
              className='rounded-full overflow-hidden filter brightness-0 invert '//filter brightness-0 invert
            />
          </div>
          <div className="">
            <a href="/profile/dashboard" className="text-white hover:text-[#D29F48]">ภาพรวม</a>
          </div>
        </div>*/}
        {/*<a href="/profile/dashboard" className="flex items-center ml-16 text-white hover:text-[#D29F48]">
            <Image 
              alt=""
              src="/images/overall.svg"
              objectFit="cover"
              width={72}
              height={72}
              className='w-10 h-10 rounded-full overflow-hidden '//filter brightness-0 invert
            />
            ภาพรวม
        </a>*/}
      </div>

      <LogoutButton />
      
    </nav>
  );
};

export default Navbar;
