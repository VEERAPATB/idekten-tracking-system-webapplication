'use client'

import { AssessmentResultProvider } from "@/lib/context/AssessmentResultContext";
import { StudentProvider } from "@/lib/context/StudentContext";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AssessmentResultProvider>
      <StudentProvider>
        <div className="">
          {children}
        </div>
      </StudentProvider>
    </AssessmentResultProvider>
  );
};

export default layout;
