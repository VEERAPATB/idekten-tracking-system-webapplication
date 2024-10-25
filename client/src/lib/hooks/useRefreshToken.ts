'use client'

<<<<<<< HEAD
import { useSession } from "next-auth/react"
import { axiosServer } from "../axios";

const useRefreshToken = () => {
    const { data: session, update } = useSession();
    
    const refreshToken = async () => {
        const res = await axiosServer.post('/api/refresh-token',{
=======
import { getSession, useSession } from "next-auth/react"
import { axiosServer } from "../axios";

const useRefreshToken = () => {
    const {update} = useSession();
    
    const refreshToken = async () => {
        const session = await getSession()
        
        console.log(session)
        
        const res = await axiosServer.post('/api/refresh',{
>>>>>>> ec15a70d18bfe0735af068359504e08f579627bd
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