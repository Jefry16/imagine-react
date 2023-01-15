import { AxiosRequestConfig } from "axios";
import { useMutation, UseMutationOptions, useQuery } from "react-query";
import { axiosPrivate } from "../api/axios";

export function useFetch(url: string, options: any) {
  return useQuery(url, () => axiosPrivate.get(url), {
    ...options
  });
}
export function usePatchtHttp(
  url: string,
  data: any,
  option?: UseMutationOptions
) {
  return useMutation(() => axiosPrivate.patch(url, data), option);
}

export function usePostHttp(
  url: string,
  data: any,
  requestConfig?: AxiosRequestConfig,
  option?: UseMutationOptions
) {
  return useMutation(
    () => axiosPrivate.post(url, data, { ...requestConfig }),
    option
  );
}
