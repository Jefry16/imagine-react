import axios from "../api/axios";
import useAuth from "./use-auth";

export const useLogout = () => {
  const { clearAuth } = useAuth();
  const logOut = async () => {
    const logout = await axios.post("/auth/logout", {}, { withCredentials: true });
    clearAuth();
  };

  return logOut;
};
