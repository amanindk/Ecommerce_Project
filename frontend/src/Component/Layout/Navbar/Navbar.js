import React, { useState } from "react";
import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dial2shop from "./Dail2shop.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../../../Context/auth";
import toast from "react-hot-toast";
import SearchInput from "../../Form/SearchInput";
import useCategory from "../../../hooks/useCategory";
import { useCart } from "../../../Context/cart";
import { useWish } from "../../../Context/wish";

function Navbarr() {
  const [cart] = useCart();
  const [wish] = useWish();
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  const [showMediaIcons, setShowMediaIcons] = useState(false);

  return (
    <>
      <Navbar expand="lg" className=" sticky-top  bg-body-tertiary">
        <Container fluid>
          <Link to="/">
            <img src={Dial2shop} alt="" style={{ height: "53px" }} />
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="my-2 mx-5 my-lg-0"
              style={{ maxHeight: "150px" }}
              navbarScroll
            >
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/categories"
                  data-bs-toggle="dropdown"
                >
                  CATEGORIES
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={`/categories`}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </Nav>

            <SearchInput />
            <div className="icon">
              <div className="heart" style={{ marginRight: "25px" }}>
                <Link to="/wishlist">
                  <FaRegHeart className="wishheart" />

                  {!wish.length ? (
                    <></>
                  ) : (
                    <>
                      <div className="wish_no">{wish?.length}</div>
                    </>
                  )}
                </Link>
              </div>
              <div className="buy">
                <Link to="/cart">
                  <IoCartOutline
                    style={{ color: "#ca3332", fontSize: "26px" }}
                  />
                  {!cart.length ? (
                    <></>
                  ) : (
                    <>
                      <div className="buy_no">{cart?.length}</div>
                    </>
                  )}
                </Link>
              </div>

              <div className="sign dropdown">
                <div className="dropbtn">
                  {" "}
                  {!auth.user ? (
                    <>
                      {" "}
                      <Link to="/register">
                        <FaRegUser
                          style={{ color: "#ca3332", fontSize: "22px" }}
                        />{" "}
                        <span>LOGIN</span>
                      </Link>
                    </>
                  ) : (
                    <>
                      {" "}
                      <Link to="/register">
                        <FaRegUser
                          style={{ color: "#ca3332", fontSize: "22px" }}
                        />{" "}
                        <span>{auth?.user?.name}</span>
                      </Link>
                    </>
                  )}
                </div>
                <div class="dropdown-content">
                  <div className="profile">
                    <div className="usericon">
                      <FaRegUser
                        style={{ color: "#ca3332", fontSize: "32px" }}
                      />
                    </div>
                    {!auth.user ? (
                      <>
                        {" "}
                        <Link to="/register" className="login">
                          <span>Login//Register</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        {" "}
                        <Link onClick={handleLogout} to="/register">
                          <span>LOGOUT</span>
                        </Link>
                      </>
                    )}
                  </div>
                  <Link
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link to="/dashboard/user/orders">My Order</Link>
                  <Link to="/cart">
                    My Cart{" "}
                    <span style={{ color: "#ca3332", fontSize: "18px" }}>
                      {!cart.length ? <></> : <>({cart?.length})</>}
                    </span>
                  </Link>
                  <Link to="/wishlist">
                    Wishlist{" "}
                    <span style={{ color: "#ca3332", fontSize: "18px" }}>
                      {!wish.length ? <></> : <>({wish?.length})</>}
                    </span>
                  </Link>
                  <Link
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    My Profile
                  </Link>
                  <Link to="/">My Feedback</Link>
                  <Link to="/">Help & Support</Link>
                </div>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <nav className="main-nav">
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }
        >
          <ul>
            <>
              {categories?.map((c) => (
                <div class="category_dropdown">
                  <Link
                    // to={() => navigate(`/category/${c.slug}`)}
                    to={`/category/${c.slug}`}
                    class="category_dropbtn"
                  >
                    {c.name}
                  </Link>
                  {/* <div class="category_dropdown-content">
                    <div className="dropdown_category-row">
                      {products?.map((p) => (
                        <div className="row_1">
                          <div className="head_cat">
                            <div>
                              <Link to={`/category/${c.slug}`}>
                                {" "}
                                {p.name.substring(0, 20)}...
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                  
                    </div>
                  </div> */}
                </div>
              ))}
            </>
          </ul>
        </div>

        {/* 3rd social media links */}
        <div className="social-media">
          {/* hamburget menu start  */}
          <div className="hamburger-menu">
            <Link to="/" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbarr;
