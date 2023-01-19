import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./use-auth";
import useRefreshToken from "./use-refresh-token";

export default function useAxiosPrivate() {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers!.Authorization) {
          config.headers!.Authorization = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const previousRequest = error?.config;
        if (error?.response?.status === 403 && !previousRequest?.sent) {
          previousRequest.sent = true;
          const { accessToken } = (await refresh()) as {
            accessToken: string;
          };
          previousRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axiosPrivate(previousRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);

  return axiosPrivate;
}
