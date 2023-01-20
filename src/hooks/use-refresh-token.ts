import axios from "../api/axios";
import useAuth from "./use-auth";

export default function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post(
      "auth/refresh-token",
      {},
      { withCredentials: true }
    );

    const { accessToken, username, roles } = response.data;
    setAuth({ accessToken, roles, username });
    return accessToken;
  };
  return refresh;
}
