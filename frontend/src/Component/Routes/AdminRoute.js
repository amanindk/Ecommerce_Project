import { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinners from "../Spinners";
export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authcheck = async () => {
      const res = await axios.get("/api/admin-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authcheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinners path=" " />;
}
// export default PrivateRoute;
