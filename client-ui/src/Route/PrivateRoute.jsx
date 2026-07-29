import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";
import NotFoundPage from "../screens/P404";

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);

  const [auth, setAuth, loadingAuth] = useAuth();

  useEffect(() => {
    if (auth?.token) {
      fetchLoggedUser();
    } else {
      setLoading(false);
      setOk(false);
    }
  }, [auth?.token]);

  const fetchLoggedUser = async () => {
    try {
      const res = await axios.get("/fetch-logged-user", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      console.log("Response:", res.data);

      if (
        res.data?.user &&
        (res.data.user.role.includes("admin") ||
          res.data.user.role.includes("seller"))
      ) {
        setOk(true);
      } else {
        setOk(false);
      }
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);

      localStorage.removeItem("auth");

      setAuth({
        user: "",
        token: "",
        refreshToken: "",
      });

      setOk(false);
    } finally {
      setLoading(false);
    }
  };

  // 👇 Ye yahan hona chahiye
  if (loadingAuth || loading) {
    return <Loader />;
  }

  return ok ? <Outlet /> : <NotFoundPage />;
};

export default PrivateRoute;