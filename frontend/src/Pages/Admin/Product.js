import React, { useState, useEffect } from "react";
import Layout from "../../Component/Layout/Layout";
import AdminMenu from "../../Component/Layout/AdminMenu/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
// import { get } from "mongoose";

function Product() {
  const [products, setProducts] = useState([]);

  //get all product
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting product");
    }
  };

  //LifeCycle Mehod
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"All Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center"> All Product List</h1>
            <div className="product-card">
              {products?.map((p) => (
                <Link
                  to={`/dashboard/admin/product/${p.slug}`}
                  key={p._id}
                  className="product-link"
                >
                  <div className="card" style={{ width: "200px" }} key={p._id}>
                    <img
                      src={`/api/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Product;
