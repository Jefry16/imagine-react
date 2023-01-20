import { useContext } from "react";
import AuthContext, { IAuth } from "../contexts/auth-provider";

const useAuth = () => {
  return useContext(AuthContext) as IAuth;
};

export default useAuth;
