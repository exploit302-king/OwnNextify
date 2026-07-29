import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import apis from "../config/apis";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({
    user: "",
    token: "",
    refreshToken: "",
  });

  const [loadingAuth, setLoadingAuth] = useState(true);

  // Load auth from localStorage
  useEffect(() => {
    const userAuth = localStorage.getItem("auth");

    if (userAuth) {
      setAuth(JSON.parse(userAuth));
    }

    setLoadingAuth(false);
  }, []);

  axios.defaults.baseURL = apis[0];

  axios.defaults.headers.common["Authorization"] =
    auth?.token ? `Bearer ${auth.token}` : "";

  axios.defaults.headers.common["refresh_token"] =
    auth?.refreshToken || "";

  // Verify logged in user
  useEffect(() => {

    const verifyUser = async () => {

      if (!auth?.token) return;

      try {

        const { data } = await axios.get("/fetch-logged-user");

        if (data?.user) {
          setAuth(data);
          localStorage.setItem("auth", JSON.stringify(data));
        }

      } catch (error) {

        console.log("Session Expired");

        setAuth({
          user: "",
          token: "",
          refreshToken: "",
        });

        localStorage.removeItem("auth");
      }
    };

    verifyUser();

  }, [auth?.token]);

  return (
    <AuthContext.Provider value={[auth, setAuth, loadingAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;