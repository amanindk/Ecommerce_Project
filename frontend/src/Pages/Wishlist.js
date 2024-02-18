import React from "react";
import Layout from "../Component/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useWish } from "../Context/wish";
import { useAuth } from "../Context/auth";
import toast from "react-hot-toast";
import Heart from "../Component/Assets/Heart.jpg";
import { Link } from "react-router-dom";

function Wishlist() {
  const [wish, setWish] = useWish();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  //delete items
  const removeWishItem = async (pid) => {
    try {
      let myWish = [...wish];
      let index = myWish.findIndex((item) => item._id === pid);
      myWish.splice(index, 1);
      setWish(myWish);
      localStorage.setItem("wish", JSON.stringify(myWish));
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   getToken();
  // }, [auth?.token]);

  return (
    <Layout title={"Wishlist Page"}>
      <div className="container text-center">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">{`Hey ${
              auth?.token && auth?.user?.name
            }`}</h1>
            <h4 className="text-center">
              {wish?.length > 0 ? (
                `You have ${wish.length} items in  your Wishlist ${
                  auth?.token ? " " : "Please login to checkout "
                }`
              ) : (
                <>
                  <div className="text-center">
                    <h3>Your Wishlist is Empty</h3>
                    <div class="col-4 mx-auto">
                      <img
                        src={Heart}
                        alt=""
                        style={{ height: "200px" }}
                        class="img-fluid"
                      />
                    </div>
                    <Link to="/">
                      <button type="button" class="btn btn-danger m-2">
                        Continue Shopping
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 ">
            {wish?.map((p) => (
              <div className="row mx-auto p-3 border flex-row">
                <div className="col-md-4">
                  <img
                    src={`/api/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height={"200px"}
                  />
                </div>
                <div className="col-md-8">
                  <h4>{p.name}</h4>
                  <p>{p.description.substring(0, 100)}...</p>
                  <p>Price: {p.price}</p>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      removeWishItem(p._id);
                      toast.success("Remove from your Wishlist");
                    }}
                  >
                    Remove
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

export default Wishlist;
