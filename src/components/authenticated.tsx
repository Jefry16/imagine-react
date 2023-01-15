import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/use-auth";

export default function Authenticated() {
  const { auth } = useAuth();
  const location = useLocation();

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
