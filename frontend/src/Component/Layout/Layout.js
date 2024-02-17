import React from "react";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import { Helmet } from "react-helmet";
// import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

function Layout({ children, title, description, keywords, author }) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Navbar />
      <main>
        <Toaster />
        {children}
      </main>

      <Footer />
    </div>
  );
}
Layout.defaultProps = {
  title: "Dial2shop",
  description: "Ecommerce Website",
  keywords:
    "Mobile, Women Fashion, Men Fashion, Clothes, Electronics, Furniture, Bags, Shoes, Accessories",
  author: "Prem Kumar Maurya",
};

export default Layout;
