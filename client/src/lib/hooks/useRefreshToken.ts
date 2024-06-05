'use client'

import { useSession } from "next-auth/react"
import { axiosServer } from "../axios";

const useRefreshToken = () => {
    const { data: session, update } = useSession();
    
    const refreshToken = async () => {
        const res = await axiosServer.post('/api/refresh-token',{
            refreshToken: session?.user.refreshToken,
        })
        await update({
            ...session,
            user:{
                ...session?.user,
                accessToken: res.data.accesstoken
            }
        })
        console.log(session)
    }
    return refreshToken;
}

export default useRefreshToken;