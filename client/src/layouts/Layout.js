import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Authentication from "../features/user/Authentication";
import Footer from "../components/Footer.js";

const Layout = ({ user, setUser, role, setRole }) => {
  console.log(role);
  return (
    <div>
      {/* <Authentication
        user={user}
        setUser={setUser}
        role={role}
        setRole={setRole}
      /> */}
      <Outlet />
      <Toaster />
      <Footer />
    </div>
  );
};

export default Layout;
