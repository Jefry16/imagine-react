import { useState, useCallback } from "react";
import useAxiosPrivate from "./use-axios-private";

const useHttpGet = () => {
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState<number | null>(null);

  const sendRequest = useCallback(
    async (url: string, applyData: (data: any) => void) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axiosPrivate.get(url);

        setStatus(response.status);
        applyData(response.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
    status,
  };
};

export default useHttpGet;
