import React, { useEffect, useState } from "react";
import Layout from "../../Component/Layout/Layout";
import UserMenu from "../../Component/Layout/UserMenu/UserMenu";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import toast from "react-hot-toast";

function Profile() {
  const [auth, setAuth] = useAuth();
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [phone, SetPhone] = useState("");
  const [address, SetAdress] = useState("");

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth.user;
    SetEmail(email);
    SetName(name);
    SetPhone(phone);
    SetAdress(address);
    // console.log(email, name, password, phone, address);
  }, [auth?.user]);
  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name, email, password, phone, address);
    // toast("Registered Successfully");
    try {
      const { data } = await axios.put("/api/profile-update", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Your-Profile"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="auth-form-container">
              <div className="login_name">
                <h2> USER PROFILE</h2>
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
                  disabled
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

                <button className="loginbutton">UPDATE</button>
              </form>
              {/* <button
                className="link-btn"
                onClick={() => props.onFormSwitch("Login")}
              >
                Already have an account?{" "}
                <span style={{ color: "#cf3231" }}>Login here.</span>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
