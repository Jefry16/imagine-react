import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/use-auth";

export default function RequireAuth(props: { roles: string[] }) {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles.find((roles: string) => props.roles.includes(roles)) ? (
    <Outlet />
  ) : auth?.id ? (
    <Navigate to="/no-autorizado" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
