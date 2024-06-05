import React, { useState } from "react";
import Image from "next/image";
import IBS from "./IBS"
import DBS from "./DBS"
import AdminButtonSidebarAssessment from "./AdminButtonSidebarAssessment";
import AdminButtonAdjust from "./AdminButtonAdjust";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };
  return (
    <div className="lg:hidden">
      <button
        onClick={toggleSidebar}
        className={`Menu-button focus:outline-none ml-4 md:m-6 ${isOpen ? "hidden" : "block"}`}
      >
        <Image
          alt=""
          src="/images/menu.png"
          objectFit="cover"
          width={16}
          height={12}
          className=" md:w-[1.5rem] md:h-[1.125rem] overflow-hidden"
        />
      </button>
      {/* z-50 อยุ่บนสุด พื้นหลังดำ อยู่ z-40 */}
      <div className={`z-50 absolute top-0 flex h-[2048px] bg-gray-100 ${isOpen ? "block" : "hidden"} `}>
      {/* Sidebar */}
        <div className="flex flex-col w-[9.125rem] md:w-[13.6875rem] bg-[#5D5D5D]  shadow-xl">
          {/* Sidebar Header */}
          <button
            onClick={toggleSidebar}
            className=" close-button focus:outline-none mt-[0.75rem] ml-[1.125rem]"
          >
            <Image
              alt=""
              src="/images/close.png"
              objectFit="cover"
              width={24}
              height={24}
              className="w-[24px] h-[24px] md:w-6 md:h-6 overflow-hidden"
            />
          </button>
    
          {/* Sidebar Content */}
          <div className="flex flex-col mt-[2rem]">
            <div className="flex mb-[0.563rem] md:mb-[0.8445rem]">
              <div className="ml-[1.438rem] mr-[0.5rem]">
                <IBS/>
                <AdminButtonSidebarAssessment/>
              </div>
            </div>
            <div className="flex ">
              <div className="ml-[1.438rem] mr-[0.5rem]">
                <DBS/>
                <AdminButtonAdjust/>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div onClick={closeSidebar} className={`absolute top-0 w-full h-[2048px] bg-black opacity-20 z-40 ${isOpen ? "block" : "hidden"}`}></div>
    </div>
    
  );
};

export default Sidebar;
