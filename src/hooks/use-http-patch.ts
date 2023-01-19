import { useState, useCallback } from "react";
import { axiosPrivate } from "../api/axios";

const useHttpPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState<number | null>(null);

  const sendRequest = useCallback(
    async (options: { url: string; data: any }, applyData: Function) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axiosPrivate.patch(options.url, options.data);
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

export default useHttpPost;
