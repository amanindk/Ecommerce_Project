import React, { useState } from "react";
import "./Login.css";
import Layout from "../../Component/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/auth";

function Login(props) {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Please Register now ");
    }
  };
  return (
    <>
      <Layout title={"Login-Dial2shop"}>
        <div className="auth-form-container">
          <div className="login_name">
            <h2> Login</h2>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <label className="loginlabel" htmlFor="email">
              Email Id
            </label>

            <input
              className="logininput"
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
              type="email"
              placeholder="deep@rgshine"
              id="email"
              name="email"
              required
            ></input>

            <label className="loginlabel" htmlFor="password">
              Password
            </label>
            <input
              className="logininput"
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
              type="password"
              placeholder=""
              id="password"
              name="password"
              required
            ></input>

            <button className="loginbutton">Login</button>
            <p
              style={{ marginTop: "10px", cursor: "pointer", color: "#0073c7" }}
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </p>
          </form>
          <button
            className="link-btn"
            onClick={() => props.onFormSwitch("register")}
          >
            Don't have an account?{" "}
            <span style={{ color: "#cf3231" }}>Register here.</span>
          </button>
        </div>
      </Layout>
    </>
  );
}

export default Login;
