import { createContext, ReactNode, useState } from "react";

export interface IAuth {
  accessToken: string;
  username: string;
  id: number;
  roles: string[];
}

export type AuthContextType = {
  auth: IAuth | null;
  updateAuth: (
    accessToken: string,
    username: string,
    id: number,
    roles: string[]
  ) => void;
  clearAuth: () => void;
};
export const AuthContext = createContext<AuthContextType>({
  clearAuth() {},
  updateAuth() {},
  auth: null,
});

export default function AuthProvider(props: { children: ReactNode }) {
  const [auth, setAuth] = useState<IAuth | null>(null);

  function updateAuth(
    accessToken: string,
    username: string,
    id: number,
    roles: string[]
  ) {
    setAuth({ accessToken, username, id, roles });
  }

  function clearAuth() {
    setAuth(null);
  }

  return (
    <AuthContext.Provider value={{ clearAuth, updateAuth, auth }}>
      {props.children}
    </AuthContext.Provider>
  );
}