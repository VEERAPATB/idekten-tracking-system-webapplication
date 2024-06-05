'use client'

import { PageProps } from "@/types/next-general";
import React, { useEffect, useState } from "react";
import PopupEmail from "@/components/Verify/PopupEmail";
import { axiosAuth } from "@/lib/axios";
import { useRouter } from "next/navigation";

const TEXT_DES_VERIFIED = {
  pass: 'Your email was verified. Head back to the original browser window that you signed up through to log in',
  not_pass: 'Your email was invalid. Please resend your email to verify again.',
  resend: "We're sending verification to your email. If you don't receive it in 5 minute, please check your spam or junk folder.",
  waiting: "We will verify your email as soon as possible. Please, don't change your page."
}

const TEXT_HEAD_VERIFIED = {
  pass: 'Email Verification',
  not_pass: 'Email is Not Verified',
  resend: "Email Resent",
  waiting: "Wait for Email Verification..."
}

const VerifyMail = (props: PageProps) => {
  const [isLoading, setLoading] = useState(true)
  const [passed, setPassed] = useState(false)
  const [emailResend, setEmailResend] = useState(false)
  const router = useRouter()

  const emailVerification = async () => {
    try {
      const { status } = await axiosAuth.get(`/api/users/verify-email/${props.searchParams?.m}/${props.searchParams?.t}`)
      setLoading(false)
      if(status >= 200 && status < 300){
        setPassed(true)
      }
    } catch (error) {
      setPassed(false)
      setLoading(false)
      console.error(`Error: ${error}`)
    }
  } 

  const resendEmail = async () => {
    try {
      setLoading(true)
      const { status } = await axiosAuth.post(`/api/users/resend-verification-email/${props.searchParams?.m}`)
      if(status >= 200 && status < 300){
        setEmailResend(true)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(`Error : ${error}`)
    }
  }

  const performResendEmail = () => {
    resendEmail()
  }

  useEffect(() => {
    emailVerification()
  },[])

  return (
      <div className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {isLoading ? (
          <PopupEmail 
            loading={
              <>
                <canvas className="loader w-[100px]"></canvas>
              </>
            }
            label={TEXT_HEAD_VERIFIED.waiting}
            description={
              <p className=" text-center text-sm md:text-base">
                {TEXT_DES_VERIFIED.waiting}
              </p>
            }
          />
        ) : (emailResend ? (
          <PopupEmail 
            image={`/images/verify/mail.png`}
            label={TEXT_HEAD_VERIFIED.resend}
            description={
              <p className=" text-center text-sm md:text-base">
                {TEXT_DES_VERIFIED.resend}
              </p>
            }
          />
        ) : (
          <PopupEmail 
            image={`/images/verify/${passed ? 'correct-icon.svg' : 'incorrect-icon.svg'}`}
            label={passed ? TEXT_HEAD_VERIFIED.pass : TEXT_HEAD_VERIFIED.not_pass}
            description={
              <p className=" text-center text-sm md:text-base">
                {passed ? TEXT_DES_VERIFIED.pass : TEXT_DES_VERIFIED.not_pass}
              </p>
            }
            function={passed ? {
              name: 'Back to Login',
              fn: () => router.push('/auth/signIn')
            } : {
              name: 'Resend your Email',
              fn: () => performResendEmail()
            }}
          />
        ))}
      </div>
  );
};

export default VerifyMail;