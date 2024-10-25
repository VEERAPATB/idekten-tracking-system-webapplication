"use client";

import { useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";
import Sidebar from "@/components/Profile/Sidebar";

const Navbar = () => {
  const session = useSession();

  return (
    <nav className='lg:flex lg:justify-between lg:bg-[#5D5D5D] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-full'>
      <div className="flex bg-[#5D5D5D] justify-between lg:justify-normal ">
        <Sidebar/>
        {/*<div className="my-[1rem] ml-[1.125rem]">
            <Image 
              alt=""
              src="/images/menu.png"
              objectFit="cover"
              width={16}
              height={12}
              className=' overflow-hidden'
            />
          </div>*/}
        <div className="Navcard-profile flex mr-[1.5rem] items-center md:my-[0.5rem] lg:justify-start lg:ml-[2rem]">
          <div className="Name grid justify-items-end">
            <p className="Name text-[#F2F2F2] text-[0.813rem] md:text-[1.2195rem] lg:text-[1rem]">IDEKTEP</p>
            <p className="Name-Th text-[#F3F3F3] text-[0.438rem] md:text-[0.657rem] lg:text-[0.7rem]">ไอเด็กเทพ</p>
          </div>
          <div className="w-[39px] h-[39px] lg:w-[60px] lg:h-[60px] overflow-hidden">
            <Image 
              alt=""
              src="/images/logo-idektep.png"
              objectFit="cover"
              width={68}
              height={68}
              className='rounded-full overflow-hidden'
            />
          </div>
        </div>
      </div>
      <button className="hidden lg:flex lg:items-center lg:mr-[1.969rem] lg:text-l lg:text-[#F3F3F3] lg:focus:text-[#D29F48] font-normal">
          ออกจากระบบ
      </button>
    </nav>
  );
};

export default Navbar;
