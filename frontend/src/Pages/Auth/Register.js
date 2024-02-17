import React, { useState } from "react";
import "./Login.css";
import Layout from "../../Component/Layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register(props) {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [phone, SetPhone] = useState("");
  const [address, SetAdress] = useState("");
  const [answer, SetAnswer] = useState("");
  const navigate = useNavigate();

//form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name, email, password, phone, address);
    // toast("Registered Successfully");
    try {
      const res = await axios.post("/api/register", {
        name,
        email,
        password,
        phone,
        address,
        answer
      });
      if (res && res.data.success) {
        toast.success( res && res.data.message,{
          autoClose: 10000,
        });
        navigate("/register");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //   console.log(process.env.REACT_APP_API);
  return (
    <>
      <Layout title={"Register-Dial2shop"}>
        <div className="auth-form-container">
          <div className="login_name">
            <h2> Register</h2>
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            <label className="loginlabel" htmlFor="Full Name">
              Name
            </label>
            <input
              className="logininput"
              value={name}
              onChange={(e) => SetName(e.target.value)}
              type="name"
              placeholder="Aman"
              id="name"
              name="name"
              required
            />
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
              placeholder="xyz"
              id="password"
              name="password"
              required
            ></input>
            <label className="loginlabel" htmlFor="Phone">
              Phone
            </label>
            <input
              className="logininput"
              value={phone}
              onChange={(e) => SetPhone(e.target.value)}
              type=""
              placeholder="78xxxxxx56"
              id="phone"
              name="phone"
              required
            />
            <label className="loginlabel" htmlFor="Address">
              Address
            </label>
            <input
              className="logininput"
              value={address}
              onChange={(e) => SetAdress(e.target.value)}
              type="address"
              placeholder="Address"
              id="address"
              name="address"
              required
            />
            <label className="loginlabel" htmlFor="Address">
              Sports
            </label>
            <input
              className="logininput"
              value={answer}
              onChange={(e) => SetAnswer(e.target.value)}
              type="sports"
              placeholder="Favourite Sport"
              id="sports"
              required
            />
            <button className="loginbutton">Register</button>
          </form>
          <button
            className="link-btn"
            onClick={() => props.onFormSwitch("Login")}
          >
            Already have an account?{" "}
            <span style={{ color: "#cf3231" }}>Login here.</span>
          </button>
        </div>
      </Layout>
    </>
  );
}

export default Register;
