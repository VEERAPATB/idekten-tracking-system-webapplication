"use client";

import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import { axiosAuth } from "../axios";
import useRefreshToken from "./useRefreshToken";

const useAxiosAuth = () => {
  const { data: session } = useSession()
  const refreshToken = useRefreshToken();
  
  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      async (config) => {
        if (!config.headers["Authorization"]) {
          const session = await getSession()
          config.headers["Authorization"] = `Bearer ${session?.user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest._retry) {
          prevRequest._retry = true;
          await refreshToken();
          const session = await getSession()
          prevRequest.headers["Authorization"] = `Bearer ${session?.user.accessToken}`;
          return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken ]);

  return axiosAuth;
};

export default useAxiosAuth;