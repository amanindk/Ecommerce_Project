import React, { useEffect, useState } from "react";
import Layout from "../Component/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/cart";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useWish } from "../Context/wish";

function CategoryProduct() {
  const [cart, setCart] = useCart();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
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

  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(`/api/product-category/${params.slug}`);
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={category?.name}>
      <div className="container mt-3">
        <h3 className="text-center">Category: {category?.name}</h3>
        <h6 className="text-center">{products?.length} result</h6>
        <div className="row">
          {" "}
          <div className="product-card">
            {products?.map((p) => (
              <div className="border p-2 box-shadow" key={p._id}>
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
export default CategoryProduct;
