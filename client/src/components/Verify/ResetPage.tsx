'use client'

import Button from '@/components/Button'
import InputText from '@/components/InputText'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import BlurBack from '@/components/BlurBack'
import PopupEmail from '@/components/Verify/PopupEmail'
import { AxiosError } from 'axios'
import axios from '@/lib/axios'
import { PageProps } from '@/types/next-general'
import { useRouter } from 'next/navigation'

const ERROR_MSG = {
    user_error: "ตรวจสอบข้อมูลและลองอีกครั้ง ติดต่อฝ่ายสนับสนุนหากต้องการความช่วยเหลือ",
    server_error: "ลองใหม่ภายหลัง ติดต่อฝ่ายสนับสนุนหากปัญหายังคงอยู่"
}

const ResetPage = (props: PageProps) => {
    const router = useRouter()

    const [visiblePass, setVisiblePass] = useState(false)
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [passed, setPassed] = useState(false)
    const [error, setError] = useState<string | undefined>()
    const [isLoading, setLoading] = useState(false)
    const [statusPass, setStatus] = useState(false)

    const handleSendRequest =  async () => {
        setLoading(true)
        try {
            const { status } = await axios.put(`/api/users/password/reset/${props.searchParams?.m}/${props.searchParams?.t}`, {
                password: password
            }) 
            if(status >= 200 && status < 300){
                setStatus(true)
            }
        } catch (error) {
            const e: AxiosError = error
            if(e.response?.status && e.response.status === 500){
                setError(ERROR_MSG.server_error)
            }else{
                setError(ERROR_MSG.user_error)
            }
            setStatus(false)
        }
        setLoading(false)
    }

    useEffect(() => {
        if(password === confirm && password.length >= 8){
            setPassed(true)
        }else{
            setPassed(false)
        }
    }, [confirm, password])

  return (
    <>
        {isLoading && (
            <div className="">
            <BlurBack open />
            <div className=" absolute w-[100px] mx-auto top-1/2 left-1/2 -translate-x-1/2  z-[100]">
                <canvas className=" absolute loader w-[100px] mx-auto"></canvas>
            </div>
            </div>
        )}
        <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            {statusPass ? (
                <PopupEmail 
                    image='/images/verify/correct-icon.svg'
                    label='Your password has been successfully reset'
                    description={
                        <p className=' text-center'>
                            If you did not request this change, please contact our support team immediately.
                        </p>
                    }
                    function={
                        {
                            name: "Back to login",
                            fn: () => router.push('/auth/signIn')
                        }
                    }
                />
            ) : (
                <div className='container relative w-[21rem] md:w-[42rem] bg-[#F3F3F3] mx-auto flex flex-col gap-[10rem] py-[3rem] px-[3rem] md:px-[7rem] rounded-[0.625rem] shadow-[10px_10px_10px_0px_rgba(0,0,0,0.25)]'>
                    <Image 
                        src={'/images/logo/idektep-192.png'}
                        alt='logo-idektep'
                        width={64}
                        height={64}
                        className=' absolute left-[1rem] top-[1rem] hidden md:flex'
                    />
                    <div className='text-center'>
                        <h1 className=' text-[2.25rem] font-medium'>เปลี่ยนรหัสผ่าน</h1>
                        <p>โปรดกรอกรหัสผ่านใหม่ของท่านให้ถูกต้องตามเงื่อนไข</p>
                    </div>
                    {error && (
                        <p className='text-[#D64F4F] absolute top-[13.5rem] font-semibold w-[15rem] md:w-[25rem]'>
                            {error}
                        </p>
                    )}
                    <div className='flex flex-col gap-[2rem]'>
                        <div className=' relative flex flex-col gap-[0.35rem]'>
                            <div className=' cursor-pointer z-[100]' onClick={() => setVisiblePass(prev => !prev)}>
                                <Image 
                                    src={`/images/signIn/input/${visiblePass ? 'visible-eye.svg' : 'invisible-eye.svg'}`}
                                    width={24}
                                    height={24}
                                    alt='visible-eye'
                                    className=' absolute right-0 top-[1rem]'
                                />
                            </div>
                            <InputText
                                name='new-pass' 
                                label='รหัสผ่านใหม่'
                                type={visiblePass ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="new-pass" className=' text-sm'>อย่างน้อยรหัส 8 ตัวขึ้นไป</label>
                        </div>
                        <div className=' relative flex flex-col gap-[0.35rem]'>
                            <InputText 
                                name='confirm-pass'
                                label='ยืนยันรหัสผ่าน'
                                type={visiblePass ? "text" : "password"}
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                            />
                            <label htmlFor="confirm-pass" className=' text-sm'>ต้องเหมือนกับรหัสผ่าน</label>
                        </div>
                    </div>
                    <div className='mx-auto md:w-full'>
                        <Button 
                            label='ยินยัน'
                            style={`${passed ? "bg-[#73408A] hover:bg-[#522D62]" : "bg-[#9B9B9B]"} px-[4.5rem] py-[0.5rem] text-[#FFFFFF] text-[1.25rem]`}
                            disabled={!passed}
                            onClick={() => handleSendRequest()}
                        />
                    </div>
                </div>
            )}
        </div>
    </>
  )
}

export default ResetPage