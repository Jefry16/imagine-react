import { useState, useCallback } from "react";
import useAxiosPrivate from "./use-axios-private";

const useHttpGet = () => {
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState<number | null>(null);

  const sendRequest = useCallback(
    async (values: {
      url: string;
      onSuccess?: (data: any) => void;
      onError?: (data: any) => void;
    }) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axiosPrivate.get(values.url);

        setStatus(response.status);
        if (values.onSuccess) {
          values.onSuccess(response.data);
        }
      } catch (err: any) {
        if (values.onError) {
          values.onError(err);
        }
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
