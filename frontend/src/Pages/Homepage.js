import React, { useEffect, useState } from "react";
import Layout from "../Component/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Price } from "../Component/Price";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/cart";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useWish } from "../Context/wish";
import Carausel from "../Component/Carausel/Carausel";

function Homepage() {
  const [cart, setCart] = useCart();
  const [wish, setWish] = useWish();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const [liked, setLiked] = useState(false);

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
      // setLiked(true);
    } else {
      // Product is already in the wishlist, so remove it
      const newWish = [...wish];
      newWish.splice(index, 1);
      setWish(newWish);
      localStorage.setItem("wish", JSON.stringify(newWish));
      toast.success("Removed from Your Wishlist");
      // setLiked(false);
    }
  };

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get all product
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTotal count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`/api/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadmore();
  }, [page]);

  //load more
  const loadmore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    //eslint-disable-next-line
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/product-filters/`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All product Best Offer "}>
      <Carausel />
      <div className="row">
        <div className="col-md-3 filter">
          <h4 className="text-center mt-5">Filter By Category</h4>
          <div className="d-flex flex-column ms-3">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* //Price Filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column ms-3">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Price?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="text-center mt-4">
            <button
              className="btn btn-secondary "
              onClick={() => window.location.reload()}
            >
              Reset Filter
            </button>
          </div>
        </div>
        <div className="col-md-9">
          {/* {JSON.stringify(checked, null, 4)} */}
          {JSON.stringify(radio, null, 4)}
          <h1 className="text-center">All Product</h1>
          <div className="product-card">
            {products?.map((p) => (
              <div className="card" key={p._id}>
                <FaHeart
                  className={isProductInWishlist(p._id) ? "liked" : "unliked"}
                  onClick={() => addToWishlist(p)}
                />
                <img
                  onClick={() => navigate(`/product/${p.slug}`)}
                  src={`/api/product-photo/${p._id}`}
                  className="card-img-top"
                  style={{ cursor: "pointer" }}
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
              // </Link>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <buton
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Loadmore"}
              </buton>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Homepage;
