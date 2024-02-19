import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import Layout from "../Component/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import { CiMoneyCheck1 } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { useCart } from "../Context/cart";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useWish } from "../Context/wish";

function ProductDetails() {
  const [cart, setCart] = useCart();
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  const [wish, setWish] = useWish();

  const isProductInWishlist = (productId) => {
    return wish.findIndex((item) => item._id === productId) !== -1;
  };

  const addToWishlist = (p) => {
    const index = wish.findIndex((item) => item._id === p._id);
    if (index === -1) {
      // Product is not in the wishlist, so add it
      setWish([...wish, p]);
      localStorage.setItem("wish", JSON.stringify([...wish, p]));
      toast.success("Added to Your Wishlist");
    } else {
      // Product is already in the wishlist, so remove it
      const newWish = [...wish];
      newWish.splice(index, 1);
      setWish(newWish);
      localStorage.setItem("wish", JSON.stringify(newWish));
      toast.success("Removed from Your Wishlist");
    }
  };

  //initail product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={product?.name}>
      <div className="Singleproduct_carddata">
        <div className="singleproduct_img">
          <img
            src={`/api/product-photo/${product._id}`}
            className="card-img-top text-center"
            alt={product.name}
            style={{ width: "200px", height: "200px" }}
          />
        </div>
        <div className="col-md-6 p-3">
          <h1 className="text-center">Product Details</h1>
          <h5>
            <b>{product.name}</b>
          </h5>
          <div className="singleproduct_rating">
            <span
              style={{
                color: "#DC9925",
                display: "flex",
                alignItems: "center",
              }}
            >
              {" "}
              <b>4.7</b>
              <FaStar style={{ marginLeft: "5px" }} />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaRegStar />
            </span>
          </div>
          <h6>
            <b>Description:</b>
            {product.description}
          </h6>
          <h6>
            <b>Price:</b>₹{product.price}
          </h6>
          <h6>
            <b>Category:</b>
            {product.category?.name}
          </h6>
          <h6>
            <CiMoneyCheck1 style={{ fontSize: "20px", color: "#0046ba" }} />{" "}
            Payment Option:(Credit Card , Debit Card , Net Banking , Wallets )
          </h6>
          <h6>
            <TbTruckDelivery style={{ fontSize: "20px" }} /> Free delivery
            Available
          </h6>

          <button
            className="btn btn-secondary ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to Cart");
            }}
          >
            Add Cart
          </button>
        </div>
      </div>
      <hr />
      <div className="row mx-3">
        <h3>Similar Products</h3>
        {relatedProducts.length < 1 && (
          <h6 className="text-center">No Similar Products Found</h6>
        )}
        <div className="container">
          <div className="product-card">
            {relatedProducts?.map((p) => (
              <div className="card" style={{ width: "220px" }} key={p._id}>
                <FaHeart
                  className={isProductInWishlist(p._id) ? "liked" : "unliked"}
                  onClick={() => addToWishlist(p)}
                />
                <img
                  src={`/api/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 20)}...
                  </p>
                  <p className="card-text">₹ {p.price}</p>
                  <button
                    className="btn btn-danger ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to Cart");
                    }}
                  >
                    Add Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetails;
