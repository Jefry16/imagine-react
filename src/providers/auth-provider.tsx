import { createContext, ReactNode, useState } from "react";

const AuthContext = createContext<{ auth: {}; setAuth: Function }>({
  auth: {},
  setAuth: Function,
});

export const AuthProvider = (props: { children: ReactNode }) => {
  const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
