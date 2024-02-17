import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCategory from "../../../hooks/useCategory";

function Footer() {
  const categories = useCategory();
  return (
    <>
      <div className="footer">
        <div className="logo_components">
          <div className="logo_details">
            <div className="logo">
              {/* <img src={rgshine_logo} alt="" style={{ height: "50px" }} /> */}
              <h4
                style={{
                  marginLeft: "7px",
                  color: "#cf3132",
                  fontWeight: "700",
                }}
              >
                DIAL2SHOP
              </h4>
            </div>
            <div className="companydetails">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet
                facere quis deserunt, totam non, eveniet quos pariatur dolor
                nihil ad quasi animi, labore exercitationem corrupti odio eos.
                Saepe, voluptate aliquam.
              </p>
            </div>
          </div>
          <div className="components">
            <div className="componentsname">
              <div className="footercompname">
                <h4>Company</h4>
              </div>
              <div className="footercomp_category">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/">Contact us</Link>
                  </li>
                  <li>
                    <Link to="/">Order</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="componentsname">
              <div className="footercompname">
                <Link className="footercompname" to={`/categories`}>
                  <h4>Category</h4>
                </Link>
              </div>
              <div className="footercomp_category">
                <ul>
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
              </div>
            </div>
            <div className="componentsname">
              <div className="footercompname">
                <h4>Network</h4>
              </div>
              <div className="footercomp_category">
                <ul>
                  <li>
                    <Link to="https://dialkro.in/">Dialkro</Link>
                  </li>
                  <li>
                    <Link to="https://www.facebook.com/profile.php?id=100086532162479">Digitalsol</Link>
                  </li>
                  <li>
                    <Link to="https://www.facebook.com/rudrakshgroup1/" >Rudrakash Group</Link>
                  </li>
                  <li>
                    <Link to="https://www.facebook.com/Rgshine11/">Rgshine</Link>
                  </li>
                  <li>
                    <Link to="https://dial24news.com/#">Dial24News</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="componentsname">
              <div className="footercompname">
                <h4>Social Media</h4>
              </div>
              <div className="footercomp_category">
                <ul>
                  <li>
                    <FaFacebookF className="footericon" />
                    <Link to="https://www.facebook.com/Rgshine11/">
                      Facebook
                    </Link>
                  </li>
                  <li>
                    <FaInstagram className="footericon" />
                    <Link to="https://www.instagram.com/rgshine11/?utm_source=ig_web_button_share_sheet&igshid=YzAwZjE1ZTI0Zg==">
                      Instagram
                    </Link>
                  </li>
                  <li>
                    <FaTwitter className="footericon" />
                    <Link to="">Twitter</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
