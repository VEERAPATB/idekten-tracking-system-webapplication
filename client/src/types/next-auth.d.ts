// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"
import { GoogleProfile } from "next-auth/providers/google"
import { DefaultDeserializer } from "v8"

declare module "next-auth" {
    interface Session {
        user: {
            username: string | undefined,
            id: string | undefined,
            role: string | undefined,
            accessToken: string | undefined,
            refreshToken: string | undefined
        } & DefaultSession
    } 

    interface User extends DefaultUser {
        role: string,
        username: string | undefined,
        accessToken: string | undefined,
        refreshToken: string | undefined
    }
}

declare module "next-auth/jwt" {
    
    interface JWT{
        id: string | undefined,
        role: string | undefined,
        accessToken: string | undefined,
        refreshToken: string | undefined,
        accessTokenExpires: number
    }
}