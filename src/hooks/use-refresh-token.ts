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
      const { accessToken, id, username, roles } = response.data;
      updateAuth(accessToken, username, id, roles);
      return { accessToken, id, username, roles };
    } catch (error) {
      clearAuth();
    }
  };

  return refresh;
}
