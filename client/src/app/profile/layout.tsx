"use client";

import Navbar from "@/components/Profile/Navbar";
import { SessionProvider } from "next-auth/react";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <div className="">
        <div className="relative z-50">
          <Navbar />
        </div>
        <div className="">
          <div className="content w-full">{children}</div>
        </div>
      </div>
    </SessionProvider>
  );
};

export default layout;
