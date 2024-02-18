import React from "react";
import Layout from "../../Component/Layout/Layout";
import AdminMenu from "../../Component/Layout/AdminMenu/AdminMenu";

function Users() {
  return (
    <Layout title={"Users Dial2shop"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Users</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Users;