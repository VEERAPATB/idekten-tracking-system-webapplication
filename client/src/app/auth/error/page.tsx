
import ForgotPage from "@/components/Verify/ForgotPage";
import ResetPage from "@/components/Verify/ResetPage";
import VerifyMail from "@/components/Verify/VerifyMail";
import { PageProps } from "@/types/next-general";
import { NextResponse } from "next/server";

const page = (props: PageProps) => {

  const email = props.searchParams?.m
  const token = props.searchParams?.t
  const error = props.searchParams?.error
  
  switch(error){
    case "resetpass": 
      if(email && token) return <ResetPage {...props} />
      return <ForgotPage {...props} />
    case "verifymail": 
      if(email && token) return <VerifyMail {...props} />
    default: return NextResponse.error()
  }
};

export default page;
