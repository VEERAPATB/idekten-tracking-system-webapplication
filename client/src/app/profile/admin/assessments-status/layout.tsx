import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="bg-[#5D5D5D] text-[#FFFFFF] opacity-50 relative -z-10">
        <p className=" pl-[1.5rem] pt-[0.313rem] pb-[0.188rem] lg:text-xl lg:pl-[7.813rem]">
          ระบบติดตามการประเมิน
        </p>
      </div>
      {children}
    </div>
  );
};

export default layout;
