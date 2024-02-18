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

              <Link to="/about">About</Link>
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
                          <span>Login/Register</span>
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
            <li>
              <div class="category_dropdown">
                <Link class="category_dropbtn">Mobile & More</Link>
                <div class="category_dropdown-content">
                  <div className="dropdown_category-row">
                    <div className="row_1">
                      <p to="/">Smartphone&Tablet</p>
                      <div className="head_cat">
                        <Link to="/">IPhone</Link>
                        <Link to="/">I kall</Link>
                        <Link to="/">Realme</Link>
                        <Link to="/">Samsung</Link>
                        <Link to="/">Vivo</Link>
                        <Link to="/">Oppo</Link>
                        <Link to="/">Nokia</Link>
                      </div>
                    </div>
                    <div className="row_1">
                      <p to="/">Feature Phone</p>
                      <div className="head_cat">
                        <Link to="/">Nokia</Link>
                        <Link to="/">Redme</Link>
                        <Link to="/">Blackberry</Link>
                        <Link to="/">jio</Link>
                        <Link to="/">Motto</Link>
                        <Link to="/">Other</Link>
                      </div>
                    </div>
                    <div className="row-2">
                      <p to="/">Laptops</p>
                      <div className="head_cat">
                        <Link to="/">Dell</Link>
                        <Link to="/">HP</Link>
                        <Link to="/">Jio Mack</Link>
                        <Link to="/">Apple</Link>
                        <Link to="/">Lenovo</Link>
                        <Link to="/">Samsung</Link>
                      </div>
                    </div>
                    <div className="row_1">
                      <p to="/">Technology</p>
                      <div className="head_cat">
                        <Link to="/">Mouse</Link>
                        <Link to="/">keyboard</Link>
                        <Link to="/">CPU</Link>
                        <Link to="/">Wireless product</Link>
                        <Link to="/">Attendence Machine</Link>
                        <Link to="/">charger</Link>
                      </div>
                    </div>
                    <div className="row-2">
                      <p to="/">Storage Devices</p>
                      <div className="head_cat">
                        <Link to="/">Memory Card</Link>
                        <Link to="/">Pen Drive</Link>
                        <Link to="/">External Hard Disk</Link>
                      </div>
                      <p to="/">Best sellers Accessories</p>
                      <div className="head_cat">
                        <Link to="/">Power Bank </Link>
                        <Link to="/">Cases&Covers</Link>
                        <Link to="/">Adapters</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="category_dropdown">
                <Link class="category_dropbtn">Fashion</Link>
                <div class="category_dropdown-content">
                  <div className="dropdown_category-row">
                    <div className="row_1">
                      <p to="/">Men</p>
                      <div className="head_cat">
                        <Link to="/">Jackets</Link>
                        <Link to="/">Shirts</Link>
                        <Link to="/">Pents</Link>
                        <Link to="/">Jeans</Link>
                        <Link to="/">T-Shirts</Link>
                        <Link to="/">Cargos</Link>
                        <Link to="/">Trouser</Link>
                        <Link to="/">Men Shoes</Link>
                      </div>
                    </div>
                    <div className="row-2">
                      <p to="/">Women</p>
                      <div className="head_cat">
                        <Link to="/">Top</Link>
                        <Link to="/">Kurtas&Kurtis</Link>
                        <Link to="/">Sarrees</Link>
                        <Link to="/">Lehangas & Party</Link>
                        <Link to="/">Shoes</Link>
                        <Link to="/">Juti</Link>
                        <Link to="/">Jeans</Link>
                        <Link to="/">Formal Shoes</Link>
                      </div>
                    </div>
                    <div className="row-2">
                      <p to="/">Watches</p>
                      <div className="head_cat">
                        <Link to="/">Combo Watches</Link>
                        <Link to="/">Couple Watch</Link>
                        <Link to="/">Smart Watch</Link>
                        <Link to="/">Women Watch</Link>
                        <Link to="/">Men Watch</Link>
                        <Link to="/">Belt</Link>
                      </div>
                    </div>
                    <div className="row-2">
                      <p to="/">Clothes</p>
                      <div className="head_cat">
                        <Link to="/">Shocks</Link>
                        <Link to="/">Turban</Link>
                        <Link to="/">Maffar Scrap</Link>
                        <Link to="/">Gloves</Link>
                        <Link to="/">Jacket</Link>
                        <Link to="/">Winter Wear</Link>
                        <Link to="/"></Link>
                      </div>
                    </div>
                    <div className="row-2">
                      <p to="/">Beauty&Perfums</p>
                      <div className="head_cat">
                        <Link to="/">Skin Care</Link>
                        <Link to="/">Make-Up</Link>
                        <Link to="/">Hair Care</Link>
                        <Link to="/">Personal Care & Grooming</Link>
                        <Link to="/">Beauty Accessories</Link>
                        <Link to="/">Bath Essentials</Link>
                        <Link to="/">Oral Care</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="category_dropdown">
                <Link class="category_dropbtn">Cleaners</Link>
                <div class="category_dropdown-content">
                  <div className="dropdown_category-row">
                    <div className="row_1">
                      <p to="/">RGShine Cleaners</p>
                      <div className="head_cat">
                        <Link to="/">Hand Washer</Link>
                        <Link to="/">Dish Wash</Link>
                        <Link to="/">Disinfectant Cleaner</Link>
                        <Link to="/">Toilet Cleaner</Link>
                      </div>
                    </div>
                    <div className="row-2">
                      <p to="/">RGShine Freshner</p>
                      <div className="head_cat">
                        <Link to="/">Room Freshner</Link>
                        <Link to="/">Phenol</Link>
                        <Link to="/">Dish Wash Liquid</Link>
                        <Link to="/">Liquid Saop</Link>
                        <Link to="/">Dishwash Gell</Link>
                        <Link to="/">Lemon Grass</Link>
                        <Link to="/">Glass Cleaner</Link>
                      </div>
                    </div>
                    <div className="row-2">
                      <p to="/">Home Improvment</p>
                      <div className="head_cat">
                        <Link to="/">Brooms</Link>
                        <Link to="/">Dustbins</Link>
                        <Link to="/">Mops</Link>
                        <Link to="/">Scrubber</Link>
                        <Link to="/">Toilet Brush</Link>
                        <Link to="/">Clothes Brush</Link>
                      </div>
                    </div>
                    <div className="row-2">
                      <p to="/">Other</p>
                      <div className="head_cat">
                        <Link to="/">Wipper</Link>
                        <Link to="/">Cleaning Gloves </Link>
                        <Link to="/">Vacuum cleaner</Link>
                        <Link to="/">Dry Brush</Link>
                        <Link to="/">Cleaning Tool</Link>
                        <Link to="/">Plastic Broom Holder </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="category_dropdown">
                <Link class="category_dropbtn">Sports&More</Link>
                <div class="category_dropdown-content">
                  <div className="dropdown_category-row">
                    <div className="row_1">
                      <p to="/">Sports</p>
                      <div className="head_cat">
                        <Link to="/">Cricket Kit</Link>
                        <Link to="/">Football</Link>
                        <Link to="/">Carrom board</Link>
                        <Link to="/">Bat</Link>
                        <Link to="/">Hockey</Link>
                        <Link to="/">Sports Gloves</Link>
                        <Link to="/">Badminton</Link>
                        <Link to="/">Basketball</Link>
                      </div>
                    </div>
                    <div className="row-2">
                      <p to="/">Toys</p>
                      <div className="head_cat">
                        <Link to="/">Soft Toy</Link>
                        <Link to="/">Board Game</Link>
                        <Link to="/">Puzzles</Link>
                        <Link to="/">Learning & Education Toy</Link>
                        <Link to="/">Baby Toy</Link>
                        <Link to="/">Gifting Toy</Link>
                        <Link to="/"></Link>
                      </div>
                    </div>
                    <div className="row-2">
                      <p to="/">Food & Drinks</p>
                      <div className="head_cat">
                        <Link to="/">Nuts & Dry Fruits</Link>
                        <Link to="/">Cooking Essentials</Link>
                        <Link to="/">Breakfast Items</Link>
                        <Link to="/">jams,Honey</Link>
                        <Link to="/">Snacks Corner</Link>
                        <Link to="/">Gifting Toy</Link>
                        <Link to="/"></Link>
                      </div>
                    </div>
                    <div className="row-2">
                      <p to="/">Stationary</p>
                      <div className="head_cat">
                        <Link to="/">Pen & Pencils</Link>
                        <Link to="/">Notebook & Dairy</Link>
                        <Link to="/">Calculator</Link>
                        <Link to="/">Others</Link>
                      </div>
                    </div>
                    <div className="row-2">
                      <p to="/">Nutrition & Health Care</p>
                      <div className="head_cat">
                        <Link to="/">Masks</Link>
                        <Link to="/">Ayurvadic Supplements</Link>
                        <Link to="/">Vitamin Supplements</Link>
                        <Link to="/">Protein Supplements</Link>
                        <Link to="/">Health Drinks</Link>
                        <Link to="/">Home Medicine</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="category_dropdown">
                <Link class="category_dropbtn">Electronics</Link>
                <div class="category_dropdown-content">
                  <div className="dropdown_category-row">
                    <div className="row_1">
                      <p>Cameras & Accessories</p>
                      <div className="head_cat">
                        <Link to="/">DSLR</Link>
                        <Link to="/">Glass Cleaner</Link>
                        <Link to="/">Glass Cleaner</Link>
                        <Link to="/">Glass Cleaner</Link>
                        <Link to="/">Glass Cleaner</Link>
                        <Link to="/">Glass Cleaner</Link>
                        <Link to="/">Glass Cleaner</Link>
                      </div>
                    </div>
                    <div className="row_1">
                      <p to="/">Smartphone&Tablet</p>
                      <div className="head_cat">
                        <Link to="/">IPhone</Link>
                        <Link to="/">I kall</Link>
                        <Link to="/">Realme</Link>
                        <Link to="/">Samsung</Link>
                        <Link to="/">Vivo</Link>
                        <Link to="/">Oppo</Link>
                        <Link to="/">Nokia</Link>
                      </div>
                    </div>
                    <div className="row_1">
                      <p to="/">Feature Phone</p>
                      <div className="head_cat">
                        <Link to="/">Nokia</Link>
                        <Link to="/">Redme</Link>
                        <Link to="/">Blackberry</Link>
                        <Link to="/">jio</Link>
                        <Link to="/">Motto</Link>
                        <Link to="/">Other</Link>
                      </div>
                    </div>
                    <div className="row-2">
                      <p to="/">Laptops</p>
                      <div className="head_cat">
                        <Link to="/">Dell</Link>
                        <Link to="/">HP</Link>
                        <Link to="/">Jio Mack</Link>
                        <Link to="/">Apple</Link>
                        <Link to="/">Lenovo</Link>
                        <Link to="/">Samsung</Link>
                      </div>
                    </div>
                    <div className="row_1">
                      <p to="/">Technology</p>
                      <div className="head_cat">
                        <Link to="/">Mouse</Link>
                        <Link to="/">keyboard</Link>
                        <Link to="/">CPU</Link>
                        <Link to="/">Wireless product</Link>
                        <Link to="/">Attendence Machine</Link>
                        <Link to="/">charger</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="category_dropdown">
                <Link class="category_dropbtn">Home & Kitchen</Link>
                <div class="category_dropdown-content">
                  <div className="dropdown_category-row">
                    <div className="row_1">
                      <p to="/">Smartphone&Tablet</p>
                      <div className="head_cat">
                        <Link to="/">IPhone</Link>
                        <Link to="/">I kall</Link>
                        <Link to="/">Realme</Link>
                        <Link to="/">Samsung</Link>
                        <Link to="/">Vivo</Link>
                        <Link to="/">Oppo</Link>
                        <Link to="/">Nokia</Link>
                      </div>
                    </div>
                    <div className="row_1">
                      <p to="/">Feature Phone</p>
                      <div className="head_cat">
                        <Link to="/">Nokia</Link>
                        <Link to="/">Redme</Link>
                        <Link to="/">Blackberry</Link>
                        <Link to="/">jio</Link>
                        <Link to="/">Motto</Link>
                        <Link to="/">Other</Link>
                      </div>
                    </div>
                    <div className="row-2">
                      <p to="/">Laptops</p>
                      <div className="head_cat">
                        <Link to="/">Dell</Link>
                        <Link to="/">HP</Link>
                        <Link to="/">Jio Mack</Link>
                        <Link to="/">Apple</Link>
                        <Link to="/">Lenovo</Link>
                        <Link to="/">Samsung</Link>
                      </div>
                    </div>
                    <div className="row_1">
                      <p to="/">Technology</p>
                      <div className="head_cat">
                        <Link to="/">Mouse</Link>
                        <Link to="/">keyboard</Link>
                        <Link to="/">CPU</Link>
                        <Link to="/">Wireless product</Link>
                        <Link to="/">Attendence Machine</Link>
                        <Link to="/">charger</Link>
                      </div>
                    </div>
                    <div className="row-2">
                      <p to="/">Storage Devices</p>
                      <div className="head_cat">
                        <Link to="/">Memory Card</Link>
                        <Link to="/">Pen Drive</Link>
                        <Link to="/">External Hard Disk</Link>
                      </div>
                      <p to="/">Best sellers Accessories</p>
                      <div className="head_cat">
                        <Link to="/">Power Bank </Link>
                        <Link to="/">Cases&Covers</Link>
                        <Link to="/">Adapters</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
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
