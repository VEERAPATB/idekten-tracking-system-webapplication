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
    <nav className={`${isChangePasswordPage ? "hidden" : "block"} flex justify-between items-center w-full h-auto bg-[#5a5a5a] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] `}>
      <div className="sidebar+logo flex bg-[#5a5a5a] items-center">
        <Sidebar/> 
        <div className=" w-7 h-auto ml-6 sm:w-10 md:w-14 lg:w-20 ">
          <Image 
            alt=""
            src="/images/logo-idektep.png"
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
      </div>

      <LogoutButton />
      
    </nav>
  );
};

export default Navbar;
