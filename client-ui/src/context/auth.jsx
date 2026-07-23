import { useState, useEffect, useContext, createContext } from "react";

import axios from "axios";
import apis from '../config/apis'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: "",
    token: "",
    refreshToken: "",
  });

  useEffect(() => {
    const userAuth = localStorage.getItem("auth");
    if (userAuth) {
      setAuth(JSON.parse(userAuth));
    }
  }, []);

  axios.defaults.baseURL = apis[0];
  axios.defaults.headers.common["Authorization"] = auth?.token;
  axios.defaults.headers.common["refresh_token"] = auth?.refreshToken;

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);

export default AuthProvider; 