import React from "react";
import { Link } from "react-router-dom";

function AdminMenu() {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h3>Admin Panel</h3>
          <Link
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </Link>
          <Link
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </Link>
          <Link
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            Product
          </Link>
          <Link
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </Link>
          <Link
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            User
          </Link>
        </div>
      </div>
    </>
  );
}

export default AdminMenu;
