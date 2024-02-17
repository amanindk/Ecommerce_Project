import React from "react";
import Layout from "../Component/Layout/Layout";
import { useAuth } from "../Context/auth";

function About() {
  const { auth } = useAuth();
  return (
    <Layout title={"Dial2shop About"}>
      <div>About {auth?.user?.name}</div>
    </Layout>
  );
}

export default About;
