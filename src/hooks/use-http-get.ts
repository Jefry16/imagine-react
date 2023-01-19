import { useState, useCallback } from "react";
import {axiosPrivate} from "../api/axios";

const useHttpGet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (url: string, applyData: Function) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosPrivate.get(url);
      applyData(response.data);
    } catch (err: any) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttpGet;
