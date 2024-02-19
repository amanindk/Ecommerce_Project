import React from "react";
import Layout from "../Component/Layout/Layout";
import { useSearch } from "../Context/search";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useWish } from "../Context/wish";
import { useCart } from "../Context/cart";
import toast from "react-hot-toast";

function Search() {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [values, setValues] = useSearch();
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
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div>
          <h1 className="text-center">Search Results</h1>
          <h6 className="text-center">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found${values?.results.length}`}
          </h6>
          <div className="product-card">
            {values?.results.map((p) => (
              // <Link
              //   to={`/dashboard/admin/product/${p.slug}`}
              //   key={p._id}
              //   className="product-link"
              // >
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
              // </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Search;
