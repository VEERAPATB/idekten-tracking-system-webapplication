
import Error from "@/components/Error";
import RegisterEmployee from "@/components/Signup/RegisterEmployee";
import RegisterStudent from "@/components/Signup/RegisterStudent";
import ForgotPage from "@/components/Verify/ForgotPage";
import ResetPage from "@/components/Verify/ResetPage";
import VerifyMail from "@/components/Verify/VerifyMail";
import { PageProps } from "@/types/next-general";

const page = (props: PageProps) => {

  const email = props.searchParams?.m
  const token = props.searchParams?.t
  const error = props.searchParams?.error
  const role = props.searchParams?.r

  switch(error){
    case "resetpass": 
      if(email && token) return <ResetPage {...props} />
      return <ForgotPage {...props} />
    case "verifymail": 
      if(email && token) return <VerifyMail {...props} />
    case "signup":
      if(!role || !token) return <Error />
      if(role === 'st') return <RegisterStudent {...props} />
      return <RegisterEmployee {...props} />
    default: return <Error />
  };
};

export default page;
