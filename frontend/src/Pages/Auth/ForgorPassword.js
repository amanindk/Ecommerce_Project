import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Layout from "../../Component/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgorPassword() {
  const [email, SetEmail] = useState("");
  const [newPassword, SetNewPassword] = useState("");
  const [answer, SetAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/register");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Forgot Password Dial2Shop"}>
      <div className="auth-form-container">
        <div className="login_name">
          <h2> RESET PASSWORD</h2>
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
            placeholder="xyz@gmail.com"
            id="email"
            name="email"
            required
          ></input>
          <label className="loginlabel" htmlFor="email">
            Sports
          </label>
          <input
            className="logininput"
            value={answer}
            onChange={(e) => SetAnswer(e.target.value)}
            placeholder="Favorite Sports"
            required
          ></input>

          <label className="loginlabel" htmlFor="password">
            Password
          </label>
          <input
            className="logininput"
            value={newPassword}
            onChange={(e) => SetNewPassword(e.target.value)}
            type="password"
            placeholder=""
            id="password"
            name="password"
            required
          ></input>

          <button
            className="loginbutton"
            style={{ marginTop: "15px" }}
            onClick={() => navigate("/forgot-password")}
          >
            Reset
          </button>
        </form>
        <Link className="link-btn" to="/register">
          Go to <span style={{ color: "#cf3231" }}>Login here.</span>
        </Link>
      </div>
    </Layout>
  );
}

export default ForgorPassword;
