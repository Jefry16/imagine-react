import { createContext, ReactNode, useState } from "react";

const AuthContext = createContext({});

type Auth = { username: string; accessToken: string; roles: string[] };

export type IAuth = {
  auth: Auth;
  setAuth: (value: Auth | null) => void;
};

export const AuthProvider = (props: { children: ReactNode }) => {
  const [auth, setAuth] = useState<Auth>();

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
