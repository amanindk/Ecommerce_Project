import React from "react";
import { Link } from "react-router-dom";
function UserMenu() {
  return (
    <div>
      <div className="text-center">
        <div className="list-group">
          <h3>Dashboard</h3>
          <Link
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </Link>
          <Link
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Order
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserMenu;
