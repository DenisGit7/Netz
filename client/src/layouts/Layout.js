import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Nav from "../components/Nav.js";

const Layout = () => {
  return (
    <div>
      <Header title="Netz App" />
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
