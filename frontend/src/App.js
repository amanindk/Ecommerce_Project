import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import About from "./Pages/About";
import Policy from "./Pages/Policy";
import Contact from "./Pages/Contact";
import Pagenotefound from "./Pages/Pagenotefound";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Dashboard from "./Pages/User/Dashboard";
import PrivateRoute from "./Component/Routes/Private";
import ForgorPassword from "./Pages/Auth/ForgorPassword";
import AdminRoute from "./Component/Routes/AdminRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import Users from "./Pages/Admin/Users";
import Orders from "./Pages/User/Orders";
import Profile from "./Pages/User/Profile";
import Product from "./Pages/Admin/Product";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import Search from "./Pages/Search";
import ProductDetails from "./Pages/ProductDetails";
import Categories from "./Pages/Categories";
import CategoryProduct from "./Pages/CategoryProduct";
import CartPage from "./Pages/CartPage";
import AdminOrder from "./Pages/Admin/AdminOrder";
import Wishlist from "./Pages/Wishlist";

function App() {
  const [currentForm, setCurrentForm] = useState("Login");
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  return (
    <>
      <Routes>
        <Route
          path="/register"
          element={
            currentForm === "Login" ? (
              <Login onFormSwitch={toggleForm} />
            ) : (
              <Register onFormSwitch={toggleForm} />
            )
          }
        />

        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Product />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrder />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="forgot-password" element={<ForgorPassword />} />
        <Route path="policy" element={<Policy />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Pagenotefound />} />
      </Routes>
    </>
  );
}

export default App;
