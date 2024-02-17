import React, { useState, useEffect } from "react";
import AdminMenu from "../../Component/Layout/AdminMenu/AdminMenu";
import Layout from "../../Component/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/auth";
import moment from "moment";
import { Select } from "antd";
import { get } from "mongoose";
const { o } = Select;

function AdminOrder() {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Delivered",
    "Cancelled",
    "Shipped",
  ]);
  const [ChangeStatus, setChangeStatus] = useState("");
  const [orders, setOrder] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/all-orders");
      setOrder(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Admin-Order"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quality</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <option key={i} value={s}>
                              {s}
                            </option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div className="row mb-2 p-3 border flex-row">
                      <div className="col-md-4">
                        <img
                          src={`/api/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="100px"
                          height={"100px"}
                        />
                      </div>
                      <div className="col-md-8">
                        <h4>{p.name}</h4>
                        <p>{p.description.substring(0, 30)}...</p>
                        <p>Price: {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default AdminOrder;
