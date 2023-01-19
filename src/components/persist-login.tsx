import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import useRefreshToken from "../hooks/use-refresh-token";

export default function PersistLogin() {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setLoading(false);
  }, []);

  useEffect(() => {
    console.log(`loading ${loading}`);
    console.log(`at ${auth?.accessToken}`);
  }, [loading]);

  return <>{loading ? <p>loading...</p> : <Outlet />}</>;
}
