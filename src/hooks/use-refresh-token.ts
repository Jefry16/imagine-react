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
      const { accessToken, id, username } = response.data;
      updateAuth(accessToken, username, id);
      return { accessToken, id, username };
    } catch (error) {
      clearAuth();
    }
  };

  return refresh;
}
