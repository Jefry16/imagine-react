import useAuth from "./use-auth";
import axios from "../api/axios";

export default function useRefreshToken() {
  const { updateAuth, clearAuth } = useAuth();
  const refresh = async () => {
    try {
      const response = await axios.post(
        "/auth/refresh-token",
        {},
        { withCredentials: true }
      );
      const { accessToken, username, roles } = response.data;
      updateAuth(accessToken, username, roles);
      return accessToken;
    } catch (error) {
      clearAuth();
    }
  };

  return refresh;
}



