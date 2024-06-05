import { axiosServer } from "@/lib/axios";
import { JWTUserBackend } from "@/types/next-general";
import { verify } from "jsonwebtoken";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        //Fetch refresh token and access token

        const res = await axiosServer.post(`/api/login`, {
          email: credentials?.username,
          password: credentials?.password,
        });

        if (res.status === 200)
          return {
            ...res.data
          };

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60 * 7,
  },
  pages:{
    signIn: '/auth/signIn',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ user, token, trigger , session}) {
      const secret = process.env.NEXT_ACCESS_TOKEN_SECRET

      if(user && user.accessToken && secret){        
        const decodedToken = <JWTUserBackend>verify(user.accessToken, secret)
        token.id = decodedToken.id
        token.role = decodedToken.role
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token
    },
    async session({ session, token }) {

      if(token){
        session.user.id = token.id
        session.user.role = token.role
        session.user.accessToken = token.accessToken
        session.user.refreshToken = token.refreshToken
      }
      return session;
    },
  },
};