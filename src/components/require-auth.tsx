import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/use-auth";

export default function RequireAuth(props: { roles: string[] }) {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles.find((role: string) => props.roles.includes(role)) ? (
    <Outlet />
  ) : auth?.username ? (
    <Navigate to="/no-autorizado" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
